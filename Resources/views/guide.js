Ti.include('../l10n.js');

var ACTION_LANGUAGE = 0;
var ACTION_ABOUT = 1;
var ACTION_VENUE = 2;
var ACTION_SPONSORS = 3;
var ACTION_ORGANIZERS = 4;

// For the about section
var aboutImage;
var aboutText;

var win; // The new window we will create

// Functon to create a new window
function createWindow(url, title) {
	if (Ti.Platform.name == "android") {
		win = Titanium.UI.createWindow({
			url:url,
			title:title
		});
	} 
	else {
		win = Titanium.UI.createWindow({
			url:url,
			title:title,
			backgroundColor:'#fff',
			barColor:'#111'
		});
	}
}

// create table view data object
var data = [
	{title:_('guide_about_ted'), hasChild:true, action:ACTION_ABOUT, detail:'aboutted'},
	{title:_('guide_about_tedx'), hasChild:true, action:ACTION_ABOUT, detail:'abouttedx'},
	{title:_('guide_about_tedxub'), hasChild:true, action:ACTION_ABOUT, detail:'abouttedxub'},
	{title:_('guide_venue'), hasChild:true, action:ACTION_VENUE},
	{title:_('guide_organizers'), hasChild:true, action:ACTION_ORGANIZERS},
	{title:_('guide_sponsors'), hasChild:true, action:ACTION_SPONSORS}
];

// Create the language selection row
if (L10N.getLanguageDisplayName() == "English") {
	var tableRow = Titanium.UI.createTableViewRow({title:_('guide_language'), hasChild:false, rightImage:'../images/enFlag.png', action:ACTION_LANGUAGE});
}
else {
	var tableRow = Titanium.UI.createTableViewRow({title:_('guide_language'), hasChild:false, rightImage:'../images/mnFlag.png', action:ACTION_LANGUAGE});
}
data.push(tableRow);

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundImage:'../images/background.png'
});

// Flip the language from Mongolian to English
function changeLanguage() {
	if (L10N.getLanguageDisplayName() == "English") {
		// Change language
		L10N.setPreferredLanguage("mn");
		
		// Show dialog
        Ti.UI.createAlertDialog({
           title:"New Language Selected",
           message:"Mongolian is now the selected language. Please restart the app to complete the change."
        }).show();		
	} else {
		// Change language
		L10N.setPreferredLanguage("en");
		
		// Show dialog
        Ti.UI.createAlertDialog({
           title:"New Language Selected",
           message:"English is now the selected language. Please restart the app to complete the change."
        }).show();		
	}
}

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// Show the language picker
	if (e.rowData.action == ACTION_LANGUAGE) {
		changeLanguage();
	} else {
		if (e.rowData.action == ACTION_ABOUT) {
			if (e.rowData.detail == "aboutted") {
				// aboutImage = "../images/ted_logo.png";
				aboutText = _("guide_about_ted_text");
			} else if (e.rowData.detail == "abouttedx") {
				// aboutImage = "../images/tedx_logo.png";
				aboutText = _("guide_about_tedx_text");
			} else if (e.rowData.detail == "abouttedxub") {
				// aboutImage = "../images/tedxulaanbaatar.png";
				aboutText = _("guide_about_tedxub_text");
			}
			
			createWindow("aboutView.js", e.rowData.title);
			
			// Set the variables for the view
			win.aboutImage = aboutImage;	
			win.aboutText = aboutText;
		} else if (e.rowData.action == ACTION_VENUE) {
			createWindow("venue.js", e.rowData.title);
		} else if (e.rowData.action == ACTION_ORGANIZERS) {
			createWindow("organizers.js", e.rowData.title);
		} else if (e.rowData.action == ACTION_SPONSORS) {
			createWindow("sponsors.js", e.rowData.title);
		}
		
		// Open the newly created window
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

//
// Add event listeners
//

// Fire off finished load event
Ti.App.fireEvent('Guide.DidFinishLoad', {});