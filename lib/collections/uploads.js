myData = FileCollection({
	resumable: true,
	http: [
		{
			method: 'get',
			path: '/:md5',
			lookup: function(params, query) {
				console.log("LOOKUP");

				return {
					md5: params.md5
				};
			}
		}
	]
});

