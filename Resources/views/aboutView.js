// Create a scroll view
var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:0,
    scrollType:"vertical",
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false,
    backgroundImage:'../images/background.png'
});

// Create a imageView for the image
var width = (Ti.Platform.name == "android") ? 320 : Ti.UI.currentWindow.width;
var imageView = Titanium.UI.createImageView({image:Ti.UI.currentWindow.aboutImage,
										 width:width,
										 height:53,
										 top:10});
scrollView.add(imageView);

// Add the text
var label = Titanium.UI.createLabel({text:Ti.UI.currentWindow.aboutText,
								    top:(imageView.height + 20),
								    height:"auto",
								    width:(width-20)});
scrollView.add(label);

// Add scroll view to window
Titanium.UI.currentWindow.add(scrollView);