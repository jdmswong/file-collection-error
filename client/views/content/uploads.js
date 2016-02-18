var shorten = function(name, w) {
	if (w == null) {
		w = 16;
	}
	if (w % 2) {
		w++;
	}
	w = (w - 2) / 2;
	if (name.length > w) {
		return name.slice(0, +w + 1 || 9e9) + '...' + name.slice(-w - 1);
	} else {
		return name;
	}
};

Template.uploads.onRendered(function() {
	myData.resumable.assignDrop($('.fileDrop'));
});

Template.uploads.onCreated(function () {
	this.subscribe('allData', Meteor.userId());
});

Template.uploads.helpers({
	dataEntries: function() {
		return myData.find({});
	},
	shortFilename: function(w) {
		var ref;
		if (w == null) {
			w = 16;
		}
		if ((ref = this.filename) != null ? ref.length : void 0) {
			return shorten(this.filename, w);
		} else {
			return "(no filename)";
		}
	},
	owner: function() {
		var ref, ref1;
		return (ref = this.metadata) != null ? (ref1 = ref._auth) != null ? ref1.owner : void 0 : void 0;
	},
	id: function() {
		return "" + this._id;
	},
	link: function() {
		return myData.baseURL + "/md5/" + this.md5;
	},
	uploadStatus: function() {
		var percent;
		percent = Session.get("" + this._id);
		if (percent == null) {
			return "Processing...";
		} else {
			return "Uploading...";
		}
	},
	formattedLength: function() {
		return numeral(this.length).format('0.0b');
	},
	uploadProgress: function() {
		var percent;
		return percent = Session.get("" + this._id);
	},
	isImage: function() {
		var types;
		types = {
			'image/jpeg': true,
			'image/png': true,
			'image/gif': true,
			'image/tiff': true
		};
		return (types[this.contentType] != null) && this.md5 !== 'd41d8cd98f00b204e9800998ecf8427e';
	},
	loginToken: function() {
		Meteor.userId();
		return Accounts._storedLoginToken();
	},
	userId: function() {
		return Meteor.userId();
	}
});


