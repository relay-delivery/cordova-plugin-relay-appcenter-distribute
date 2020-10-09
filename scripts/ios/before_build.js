const fs = require('fs');
const homedir = require('os').homedir();
const { join: pathJoin } = require('path');

const derivedDataFullPath = pathJoin(homedir, 'Library/Developer/Xcode/DerivedData/');

function _oneTimeOnly(things, label) {
	if (!things || things.length === 0) {
		throw new Error(`cannot find any ${label} in '${projectRoot}'`);
	}
	
	if (things.length > 1) {
		throw new Error(`too many ${label}s in '${projectRoot}'`);
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
		const statResult = fs.statSync(p);
		itsThere = true;
	} catch (e) {
	}

	return itsThere;
}


module.exports = function(context) {
	const { projectRoot, plugin } = context.opts;

	const workspaces = fs.readdirSync(pathJoin(projectRoot, '/platforms/ios'))
		.filter(file => /\.xcworkspace$/i.test(file));

	const workspace = _oneTimeOnly(workspaces);

	const appName = workspace.replace(/\.xcworkspace$/, '');

	const regex = new RegExp(appName);
	const magicLocations = fs.readdirSync(derivedDataFullPath)
		.filter(file => regex.test(file));
	const magicLocation = _oneTimeOnly(magicLocations);

	const magicFullPath = pathJoin(derivedDataFullPath, magicLocation);

	const src = pathJoin(plugin.dir, 'src/ios/Vendor/AppCenterDistributeResources.bundle');
	

	fs.readdirSync(pathJoin(magicFullPath, 'build/Products/'))
		.forEach(dest => {
			_ensureDir(pathJoin(magicFullPath, 'Build/Products/', dest, 'AppCenter'));

			const fullDest = pathJoin(magicFullPath, 'Build/Products/', dest, 'AppCenter/AppCenterDistributeResources.bundle')

			let alreadyThere = _pathExists(fullDest);

			if (alreadyThere) return;

			console.log('creating appcenter destribute resource symlink: ', src, ' to ', fullDest);
			const result = fs.symlinkSync(src, fullDest);

		});
};
