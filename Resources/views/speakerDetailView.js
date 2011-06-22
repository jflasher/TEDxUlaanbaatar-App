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

// Create a label for the name
var nameLabel = Titanium.UI.createLabel({text:Ti.UI.currentWindow.name,
										 textAlign:"center",
										 font:{fontSize:28, fontWeight:"bold"},
										 height:"auto",
										 width:(Titanium.UI.currentWindow.width - 20),
										 top:10});
view.add(nameLabel);

// Add the text
var detailLabel = Titanium.UI.createLabel({text:Ti.UI.currentWindow.text,
								    top:(nameLabel.height + 20),
								    height:"auto",
								    width:(Titanium.UI.currentWindow.width - 20)});
view.add(detailLabel);

// Add scroll view to window
Titanium.UI.currentWindow.add(scrollView);