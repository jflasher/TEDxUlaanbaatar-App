Ti.include('../l10n.js');
Ti.include('../helper.js');

// Figure out which language we're using
var langExt;
if (L10N.getLanguageDisplayName() == "English") {
	langExt = "en";
}
else {
	langExt = "mn";
}

// Read in data from local XML file
var XMLFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'sponsors.xml');
var XMLText = XMLFile.read().text;
var doc = Ti.XML.parseString(XMLText);
var sponsorNodes = doc.getElementsByTagName("sponsor");
var views = [];	// Holder for each sponsor view

var yCenter = (Ti.UI.currentWindow.height - 64) * 0.5;

for (var i = 0; i < sponsorNodes.length; i++) {
	// Main view
	var view = Titanium.UI.createView({backgroundImage:'../images/background.png'});
	
	// Image
	var image = Ti.UI.createImageView({image:Helper.getFileForURL(sponsorNodes.item(i).getElementsByTagName("thumbnail").item(0).text),
									   height:100, width:320,
									   top:(yCenter - 50)
	});
		
	view.add(image);
	
	// Label
	var nameLabel = Titanium.UI.createLabel({font:{fontSize:28, fontWeight:"bold"},
											 minimumFontSize:16,
											 size:{width:(Titanium.UI.currentWindow.width - 40), height:30},
											 textAlign:"center",
											 top:(yCenter - 50 + image.height + 10),
											 text:sponsorNodes.item(i).getElementsByTagName("name").item(0).text});
	view.add(nameLabel);
	
	// Add the view to the array
	views.push(view);
}

var scrollView = Titanium.UI.createScrollableView({
    views:views,
    showPagingControl:true,
    pagingControlHeight:20
});

Ti.UI.currentWindow.add(scrollView);

// create scrollView event listener
scrollView.addEventListener('singletap', function(e)
{
	Ti.Platform.openURL(sponsorNodes.item(scrollView.currentPage).getElementsByTagName("link").item(0).text);
});