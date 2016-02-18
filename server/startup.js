Meteor.startup(function () {
	return myData.allow({
		//insert: function(){return true},
		insert: function(userId, file) {
			var ref;

			console.log(JSON.stringify(file));  // TODO remove


			file.metadata = (ref = file.metadata) != null ? ref : {};
			file.metadata._auth = {
				owner: userId
			};
			return true;
		},
		remove: function(userId, file) {
			var ref, ref1;
			if (((ref = file.metadata) != null ? (ref1 = ref._auth) != null ? ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
				return false;
			}
			return true;
		},
		//read: function(){return true},
		read: function(userId, file) {
			var ref, ref1;

			console.log("READ CALLED", userId, '-', file);


			if (
				(
					(ref = file.metadata) != null ?
						(ref1 = ref._auth) != null ? ref1.owner : void 0
					: void 0
				) && userId !== file.metadata._auth.owner
			) {
				return false;
			}
			return true;
		},

		write: function(){return true}
	});

	//return myData.allow({
	//	insert: function(userId, file) {
	//		var ref;
	//		file.metadata = (ref = file.metadata) != null ? ref : {};
	//		file.metadata._auth = {
	//			owner: userId
	//		};
	//		return true;
	//	},
	//	remove: function(userId, file) {
	//		var ref, ref1;
	//		if (((ref = file.metadata) != null ? (ref1 = ref._auth) != null ? ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
	//			return false;
	//		}
	//		return true;
	//	},
	//	read: function(userId, file) {
	//		var ref, ref1;
	//		if (((ref = file.metadata) != null ? (ref1 = ref._auth) != null ? ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
	//			return false;
	//		}
	//		return true;
	//	},
	//	write: function(userId, file, fields) {
	//		var ref, ref1;
	//		if (((ref = file.metadata) != null ? (ref1 = ref._auth) != null ? ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
	//			return false;
	//		}
	//		return true;
	//	}
	//});


});
