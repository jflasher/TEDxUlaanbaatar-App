Ti.include('../l10n.js');

// Read in data from local XML file
var XMLFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'schedule.xml');
var XMLText = XMLFile.read().text;
var doc = Ti.XML.parseString(XMLText);
var sessionNodes = doc.getElementsByTagName("session");
var data = [];	// Array for table data

// Figure out which language we're using
var langExt;
if (L10N.getLanguageDisplayName() == "English") {
	langExt = "en";
}
else {
	langExt = "mn";
}

for (var i = 0; i < sessionNodes.length; i++) {
	var sessionTitle = sessionNodes.item(i).getElementsByTagName("sessionTitle_" + langExt).item(0).text;
	// Create the section header
	var section = Titanium.UI.createTableViewSection({
		headerTitle:sessionTitle
	});
	
	// Determine how many topics we have and make rows for them
	var topicNodes = sessionNodes.item(i).getElementsByTagName("topic");
	if (topicNodes) {
		for (var j = 0; j < topicNodes.length; j++) {
			var topicTitle = topicNodes.item(j).getElementsByTagName("topicTitle_" + langExt).item(0).text;
			var row = Titanium.UI.createTableViewRow({title:topicTitle, selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE});
			section.add(row);
		}
	}
	
	// Add data to the table
	data.push(section);
}

var tableview = Titanium.UI.createTableView({
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundImage:'../images/background.png'
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);