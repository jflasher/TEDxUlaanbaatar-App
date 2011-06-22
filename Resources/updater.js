//------------------------------------------------------------------------------
function UpdaterObject() {
//------------------------------------------------------------------------------
	var responsesRec = 0; // How many update responses have we received?
	var responsesNeeded;  // How many updates are we looking for?
	var base;	// URL base for updates
	var error = 0; // 1 if any errors during updating
	var numUpdates = 0;  // How many updates did we get?
	
	// Get the local version number
	this.localVersionForType = function(type) {
		// Read in data from local XML file
		var XMLFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, type + ".xml");
		var XMLText = XMLFile.read().text;
		var doc = Ti.XML.parseString(XMLText);
		var elements = doc.getElementsByTagName("version");
		return elements.item(0).text;
	};
	
	this.replaceFile = function(type, data) {
		Ti.API.info("Starting to update: " + type);
		var XMLFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, type + ".xml");
		XMLFile.write(data);
		Ti.API.info("Updated: " + type);
		numUpdates++;
	};
	
	this.checkNumUpdates = function() {
		if (responsesRec == responsesNeeded) {
				Ti.App.fireEvent('Updater.updatesFinished', {error:error, numUpdates:numUpdates});
		}
	};
	
	this.findUpdateForType = function(type) {
		// XML Test
		var updater = this;
		var client = Titanium.Network.createHTTPClient({timeout:5000});
		
		// Onload function
		client.onload = function(e) {
			var xml;
			if (this.responseXML == null) {
				if (this.resonseText == null) {
					xml = Ti.XML.parseString(this.responseData.toString());
				} else {
					xml = Titanium.XML.parseString(this.responseText);
				}
			} else {
			    xml = this.responseXML;
			}
					
		    doc = xml.documentElement;
		 
		    //Use the DOM API to parse the document
		    var elements = doc.getElementsByTagName("version");
		    var serverVersion = elements.item(0).text;
		    Ti.API.info("Type is: " + type);
		    Ti.API.info("Server version: " + serverVersion);
		    var localVersion = updater.localVersionForType(type);
			Ti.API.info("Local version: " + localVersion);
			
			// Check to see if server version is greater than the local version
			if (parseFloat(serverVersion) > parseFloat(localVersion)) {
				Ti.API.info("File should be updated");
				updater.replaceFile(type, this.responseData);
			}
			
			// If we've received responses for each update, fire off the event
			responsesRec++;
			updater.checkNumUpdates();
		};
		
		//Onerror function
		client.onerror = function(e) {
			Ti.API.info("Update error");
			error = 1;
			responsesRec++;
			updater.checkNumUpdates();
		};
		
		var address = base + type + ".xml";
		client.open('GET',address, async=false);
		client.send();
	};
	
	this.copyFilesToLocal = function(types) {
		for (var i = 0; i < types.length; i++) {
			var fromFile = Ti.Filesystem.getFile( Ti.Filesystem.resourcesDirectory, "data/" + types[i] + ".xml");
			var toFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, types[i] + ".xml");
			if (fromFile.exists() && (!toFile.exists())) {
			    toFile.write(fromFile.read());
			    Ti.API.info(types[i] + "copied to data dir.");
			}
		}
	};
	
	// Loop over all document types that can be updated
	this.findUpdates = function(types, URLBase) {
		// Check immediately for network and return with error if none
		if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
			Ti.App.fireEvent('Updater.updatesFinished', {error:1});
		}
		else {
			this.copyFilesToLocal(types);
			base = URLBase;
			responsesNeeded = types.length;
			
			for (var i = 0; i < types.length; i++) {
				this.findUpdateForType(types[i]);
			}
		}
	};
};

var Updater = new UpdaterObject(); // global object