Ti.include('../l10n.js');

// Read in data from local XML file
var XMLFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'videos.xml');
var XMLText = XMLFile.read().text;
var doc = Ti.XML.parseString(XMLText);
var videoNodes = doc.getElementsByTagName("video");
var data = [];	// Array for table data

// Figure out which language we're using
var langExt;
if (L10N.getLanguageDisplayName() == "English") {
	langExt = "en";
}
else {
	langExt = "mn";
}

// create table view
var tableview = Titanium.UI.createTableView({
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundImage:'../images/background.png'
});

for (var i = 0; i < videoNodes.length; i++) {
	var url = videoNodes.item(i).getElementsByTagName("url").item(0).text;
    var videoTitle = Titanium.UI.createLabel({
        text:videoNodes.item(i).getElementsByTagName("title_" + langExt).item(0).text,
        textAlign:'left',
        left:50,
        height:'auto',
        width:'auto'
    });
	
	// Make the row
	var row = Titanium.UI.createTableViewRow({url:url,
											  height:'auto',
											  layout:'vertical',
											  leftImage:"../images/playButton.png"
	});
	
	// Make two fake labels, just to put some space in the row
    var spacer = Titanium.UI.createLabel({
        height:5,
        width:'auto'
    });
    row.add(spacer);
	row.add(videoTitle);
	row.add(spacer);
	
	// Add data to the table
	tableview.appendRow(row);
}

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.url)
	{
		var win = Titanium.UI.createWindow({
			url:"videoPlayer.js",
			title:e.rowData.title
		});
		win.videoURL = e.rowData.url;
		win.hideTabBar();
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

Ti.UI.currentWindow.addEventListener('open', function(e)
{
	Ti.UI.currentWindow.showTabBar();
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);