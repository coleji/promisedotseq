module.exports = factories => new Promise((resolve, reject) => {
	var results = [];

	var next = factories => {
		if (factories.length == 0) resolve(results);
		else factories[0]().then(ifResolved(factories.slice(1)), ifRejected)
	}

	function ifResolved(factories) {
		return result => {
			results.push(result);
			next(factories);
		}
	}

	function ifRejected(result) { reject(result); }

	next(factories);
})
