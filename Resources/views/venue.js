Ti.include('../l10n.js');

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
								  top:0
});
view.add(logo);

// Rotate through images
var imageView = Ti.UI.createImageView({images:["../images/venue/bb1.jpg", "../images/venue/bb2.jpg", "../images/venue/bb3.jpg"],
									   width:320, height:212,
									   duration:4000,
									   repeatCount:50,
									   top:0
});
view.add(imageView);
imageView.start();

// Create the scrollableView
//var view1 = Titanium.UI.createImageView({image:"../images/venue/bb1.jpg", width:320, height:212});
//var view2 = Titanium.UI.createImageView({image:"../images/venue/bb2.jpg", width:320, height:212});
//var view3 = Titanium.UI.createImageView({image:"../images/venue/bb3.jpg", width:320, height:212});
//var scrollableView = Titanium.UI.createScrollableView({
//    views:[view1,view2,view3]
//});
//view.add(scrollableView);

// Add the text
var label = Titanium.UI.createLabel({text:_("venue_about"),
								    top:(imageView.height + 10),
								    height:"auto",
								    width:(Titanium.UI.currentWindow.width - 20)});
view.add(label);

// Add scroll view to window
Titanium.UI.currentWindow.add(scrollView);