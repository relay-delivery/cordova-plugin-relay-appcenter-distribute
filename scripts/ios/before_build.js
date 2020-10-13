const fs = require('fs');
const homedir = require('os').homedir();
const { join: pathJoin } = require('path');

const derivedDataFullPath = pathJoin(homedir, 'Library/Developer/Xcode/DerivedData/');
const POSSIBLE_PRODUCTS = [
	'Debug-iphonesimulator',
];

function _oneTimeOnly(things, label, location) {
	if (!things || things.length === 0) {
		console.error(`cannot find any ${label} in '${location}'`);
		return false;
	}
	
	if (things.length > 1) {
		console.error(`too many ${label}s in '${location}'`);
		return false;
	}

	return things.filter(Boolean)[0];
}

function _ensureDir(dirrr) {
	try {
		fs.mkdirSync(dirrr);
	} catch (e) {

	}

	return true;
}

function _pathExists(p) {
	let itsThere = false;
	try {
		fs.statSync(p);
		itsThere = true;
	} catch (e) {

	}

	return itsThere;
}


module.exports = function(context) {
	const { projectRoot, plugin } = context.opts;

	const workspaces = fs.readdirSync(pathJoin(projectRoot, '/platforms/ios'))
		.filter(file => /\.xcworkspace$/i.test(file));

	const workspace = _oneTimeOnly(workspaces, 'workspace', projectRoot);
	if (!workspace) {
		console.error('cannot find workspace');
		return false;
	}

	const appName = workspace.replace(/\.xcworkspace$/, '');

	const regex = new RegExp(appName);
	const magicLocations = fs.readdirSync(derivedDataFullPath)
		.filter(file => regex.test(file));
	const magicLocation = _oneTimeOnly(magicLocations, 'magic location', derivedDataFullPath);
	if (!magicLocation) {
		console.error('cannot find magic location');
		return false;
	}
	

	const magicFullPath = pathJoin(derivedDataFullPath, magicLocation);

	const src = pathJoin(plugin.dir, 'src/ios/Vendor/AppCenterDistributeResources.bundle');
	

	fs.readdirSync(pathJoin(magicFullPath, 'Build/Products/')).concat(POSSIBLE_PRODUCTS)
		.forEach(dest => {
			_ensureDir(pathJoin(magicFullPath, 'Build/Products/', dest));
			_ensureDir(pathJoin(magicFullPath, 'Build/Products/', dest, 'AppCenter'));

			const fullDest = pathJoin(magicFullPath, 'Build/Products/', dest, 'AppCenter/AppCenterDistributeResources.bundle');

			let alreadyThere = _pathExists(fullDest);

			if (alreadyThere) return;

			console.log('creating appcenter destribute resource symlink: ', src, ' to ', fullDest);
			fs.symlinkSync(src, fullDest);

		});

};
