function deferred() {
	let resolve, reject;

	const promise = new Promise((innerResolve, innerReject) => {
		resolve = innerResolve;
		reject = innerReject;
	});

	return {
		promise,
		resolve,
		reject,
	};
}

function start(appId) {
	const d = deferred();

	window.cordova.exec(d.resolve, d.reject, 'RelayAppCenterDistribute', 'start', [ appId ]);

	return d.promise;
}

function checkForUpdate() {
	const d = deferred();

	window.cordova.exec(d.resolve, d.reject, 'RelayAppCenterDistribute', 'checkForUpdate', []);

	return d.promise;
}

module.exports = {
	checkForUpdate,
	start,
};
