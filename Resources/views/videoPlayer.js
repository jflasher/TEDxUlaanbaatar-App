var win = Titanium.UI.currentWindow;

dummyLandscapeWindow = Titanium.UI.createWindow({
		    width:1,
		    height:1,
		    top:0,
		    left:0,
		    orientationModes : [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
		});
		dummyLandscapeWindow.open();

var view = Ti.UI.createWebView({
    url:Ti.UI.currentWindow.videoURL
});

win.add(view);

win.addEventListener('close', function(e)
{
	dummyLandscapeWindow.close();
});