Ti.include('../l10n.js');

var yCenter = (Ti.UI.currentWindow.height - 44) * 0.5;

// Create a scroll view
var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:0,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true,
    backgroundImage:'../images/background.png'
});

// Holder view
var view = Ti.UI.createView({top:0, height:"auto", width:Titanium.UI.currentWindow.width});
scrollView.add(view);

// Add an image  that will sit behind the images but is seen on load
var logo = Ti.UI.createImageView({image:"../images/venue/bb_logo.png",
								  width:320, height:212,
								  top:(yCenter - 106)
});
view.add(logo);

// Rotate through images
var imageView = Ti.UI.createImageView({images:["../images/venue/bb1.jpg", "../images/venue/bb2.jpg", "../images/venue/bb3.jpg"],
									   width:320, height:212,
									   duration:4000,
									   repeatCount:50,
									   top:(yCenter - 106)
});
view.add(imageView);
imageView.start();

// // create scrollView event listener
// scrollView.addEventListener('singletap', function(e)
// {
	// Ti.Platform.openURL();
// });

// Add scroll view to window
Titanium.UI.currentWindow.add(scrollView);