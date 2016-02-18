//# Set up an autorun to keep the X-Auth-Token cookie up-to-date and
//# to update the subscription when the userId changes.
//Deps.autorun(function() {
//	var userId;
//	userId = Meteor.userId();
//	Meteor.subscribe('allData', userId);
//	return $.cookie('X-Auth-Token', Accounts._storedLoginToken());
//});


Meteor.startup(function() {

	myData.resumable.on('fileAdded', function (file) {
		Session.set(file.uniqueIdentifier, 0);
		return myData.insert({
			_id: file.uniqueIdentifier,
			filename: file.fileName,
			contentType: file.file.type
		}, function (err, _id) {
			if (err) {
				console.warn("File creation failed!", err);
				return;
			}
			return myData.resumable.upload();
		});
	});
	myData.resumable.on('fileProgress', function (file) {
		return Session.set(file.uniqueIdentifier, Math.floor(100 * file.progress()));
	});
	myData.resumable.on('fileSuccess', function (file) {
		return Session.set(file.uniqueIdentifier, void 0);
	});
	return myData.resumable.on('fileError', function (file) {
		console.warn("Error uploading", file.uniqueIdentifier);
		return Session.set(file.uniqueIdentifier, void 0);
	});
});