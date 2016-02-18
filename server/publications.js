
Meteor.publish('allData', function(clientUserId) {
	if (this.userId === clientUserId) {
		return myData.find({
			'metadata._Resumable': {
				$exists: false
			},
			'metadata._auth.owner': this.userId
		});
	} else {
		return [];
	}
});

