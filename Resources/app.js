Ti.include('l10n.js');
Ti.include('updater.js');

var loadingWin;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
	url:'views/guide.js',
	title:_('tab_guide'),
	barColor:'#111'
});

var tab1 = Titanium.UI.createTab({
	icon:'images/tabs/53-house.png',
    title:_('tab_guide'),
    window:win1
});

//
// create speakers tab and root window
//
var win2 = Titanium.UI.createWindow({
    url:'views/speakers.js',
    title:_('tab_speakers'),
    barColor:'#111'
});
var tab2 = Titanium.UI.createTab({
    icon:'images/tabs/112-group.png',
    title:_('tab_speakers'),
    window:win2
});


//
// create schedule tab and root window
//
var win3 = Titanium.UI.createWindow({
    url:'views/schedule.js',
    title:_('tab_schedule'),
    barColor:'#111'
});
var tab3 = Titanium.UI.createTab({
    icon:'images/tabs/11-clock.png',
    title:_('tab_schedule'),
    window:win3
});


//
// create videos tab and root window
//
var win4 = Titanium.UI.createWindow({
    url:'views/videos.js',
    title:_('tab_videos'),
    barColor:'#111'
});
var tab4 = Titanium.UI.createTab({
    icon:'images/tabs/45-movie-1.png',
    title:_('tab_videos'),
    window:win4
});

//
// create twitter tab and root window
//
var win5 = Titanium.UI.createWindow({
    url:'views/twitter.js',
    title:_('tab_twitter'),
    barColor:'#111'
});
var tab5 = Titanium.UI.createTab({
    icon:'images/tabs/23-bird.png',
    title:_('tab_twitter'),
    window:win5
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3); 
tabGroup.addTab(tab4); 
tabGroup.addTab(tab5);

tabGroup.addEventListener('open',function()
{
	// set background color back to white after tab group transition
	Titanium.UI.setBackgroundColor('#fff');
});

// Put up a modal window while we're checking for updates
loadingWin = Ti.UI.createWindow({backgroundImage:"images/Program.png", navBarHidden:true});
loadingWin.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
var actInd = Titanium.UI.createActivityIndicator({
    height:30,
    width:210,
    bottom:1,
    color:'#404347',
    font:{fontFamily:'Helvetica Neue', fontSize:14,fontWeight:'bold'},
    message:_("guide_updating"),
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
loadingWin.add(actInd);
actInd.show();

// Listen for when the updates are finished
Ti.App.addEventListener('Updater.updatesFinished', function(eventData) {
	// Update message
	if (eventData.error) {
		actInd.message = _("guide_updating_error");
	}
	else {
		if (eventData.numUpdates == 0) {
			actInd.message = _("guide_updating_noUpdates");
		}
		else {
			actInd.message = _("guide_updating_success");
		}
	}
	// Now fire the function to remove the view
	setTimeout(function()
	{
		tabGroup.setActiveTab(0); 
		// open tab group with a transition animation
		tabGroup.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});	
	},2500);
});

Ti.App.addEventListener('Guide.DidFinishLoad', function(e) {
	// Remove the loading window
	loadingWin.hide();
	loadingWin.close();
});

Updater.findUpdates(["speakers", "schedule", "sponsors", "videos"], "http://arssollertia.com/tedxub/");