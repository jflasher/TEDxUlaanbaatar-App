Ti.include('../l10n.js');
Ti.include('../helper.js');

// Read in data from local XML file
var XMLFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'speakers.xml');
var XMLText = XMLFile.read().text;
var doc = Ti.XML.parseString(XMLText);

//Use the DOM API to parse the document
var titleElements;
var descriptionElements;
var names = Array();
var images = Array();
var titles = Array();
var descriptions = Array();
var nameElements = doc.getElementsByTagName("name");
var thumbnailElements = doc.getElementsByTagName("thumbnail");

// Chose the title and description based on language
if (L10N.getLanguageDisplayName() == "English") {
	titleElements = doc.getElementsByTagName("talkTitle_en");
	descriptionElements = doc.getElementsByTagName("description_en");
}
else {
	titleElements = doc.getElementsByTagName("talkTitle_mn");
	descriptionElements = doc.getElementsByTagName("description_mn");
}
	
for(var i=0;i<nameElements.length;i++)
{
	names[i] = nameElements.item(i).text;
	titles[i] = titleElements.item(i).text;
	images[i] = Helper.getFileForURL(thumbnailElements.item(i).text);
	descriptions[i] = descriptionElements.item(i).text;
}
    		
var view = Titanium.UI.createCoverFlowView({
    images:images,
    backgroundColor:'#000'
});

// Add view to window
Titanium.UI.currentWindow.add(view);

// Create the label that will hold the names
var nameLabel = Titanium.UI.createLabel({color:"#fff", 
										 font:{fontSize:28, fontWeight:"bold"},
										 minimumFontSize:16,
										 size:{width:(Titanium.UI.currentWindow.width - 40), height:30},
										 textAlign:"center",
										 top:10,
										 text:names[view.selected]
});

// Create the label that will hold the titles
var titleLabel = Titanium.UI.createLabel({color:"#fff", 
										 font:{fontSize:20, fontWeight:"bold"},
										 minimumFontSize:12,
										 size:{width:(Titanium.UI.currentWindow.width - 40), height:30},
										 textAlign:"center",
										 top:nameLabel.height + 20,
										 text:titles[view.selected]
});

Titanium.UI.currentWindow.add(nameLabel);
Titanium.UI.currentWindow.add(titleLabel);

// Add click event listener
view.addEventListener('click', function(e)
{
	// Create the window and load the view
	var url = "speakerDetailView.js";
	
	if (Ti.Platform.name == "android") {
		win = Titanium.UI.createWindow({
			url:url
		});
	} 
	else {
		win = Titanium.UI.createWindow({
			url:url,
			backgroundColor:'#fff',
			barColor:'#111'
		});
		
	// Set the variables on the view
	win.name = nameLabel.text;
	win.text = descriptions[view.selected];
	
	Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// Add change event listener
view.addEventListener('change', function(e)
{
	// Set the name on the label
	nameLabel.text = names[e.index];
	titleLabel.text = titles[e.index];
});	