//------------------------------------------------------------------------------
function HelperObject() {
//------------------------------------------------------------------------------
	// Look locally for a file pointed to by a URL. Return FILE if it's available
	// and return URL if it's not and cache the data locally for later use.
	this.getFileForURL = function(URL) {
	// Determine the file name
	var array = URL.split("/");
	var fileName = array[(array.length - 1)];
	
	// 1. Return file from images dir if it exists
	// 2. Return file from data dir if it exists
	// 3. Return URL and copy file to data dir if it does not exist

	// Get the file in the images dir
	var imagesFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "images/" + fileName);
	var imagesFileExists = imagesFile.exists();
	if (imagesFileExists == true) {
		return imagesFile;
	}
	
	// Get the local file in the data dir
	var dataDirFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,fileName);
	var dataDirFileExists = dataDirFile.exists();
	if (dataDirFileExists == true) {
		return dataDirFile;
	}		
	
	// If we still don't have a file, resort to the URL
	// Create a connection and load the data and save it
	var client = Titanium.Network.createHTTPClient({timeout:10000});

	// Onload function
	client.onload = function(e) {
		dataDirFile.write(this.responseData);
		Ti.API.info("Saved remote file for " + fileName);
	};
	client.open('GET',URL);
	client.send();
	return URL;		
	};
};

var Helper = new HelperObject(); // global object