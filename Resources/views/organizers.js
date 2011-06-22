Ti.include('../l10n.js');

// Try to make a coverflow
var view = Titanium.UI.createCoverFlowView({
    images:['../images/portraits/m-o.jpg',
    		'../images/portraits/naraa.jpg',
    		'../images/portraits/travis.jpg',
    		'../images/portraits/nick.jpg',
    		'../images/portraits/chris.jpg',
    		'../images/portraits/tuguldur.jpg',
    		'../images/portraits/uyanga.jpg',
    		'../images/portraits/neal.jpg',
    		'../images/portraits/batzorig.jpg',
    		'../images/portraits/joe.jpg'],
    backgroundColor:'#000'
});
// Add view to window
Titanium.UI.currentWindow.add(view);

// Create the name array
var names = ['Mend-Orshikh Amartaivan', 
			 'Naranmunkh Enkhtuya', 
			 'Travis Hellstrom',
			 'Narantuguldur Saijrakh',
			 'Chris Thompson',
			 'Tuguldur Turbat',
			 'Uyanga Vladimir',
			 'Neal Detert',
			 'Batzorig Regzen',
			 'Joe Flasher'	];

// Create the label that will hold the names
var nameLabel = Titanium.UI.createLabel({color:"#fff", 
										 font:{fontSize:28, fontWeight:"bold"},
										 minimumFontSize:16,
										 size:{width:(Titanium.UI.currentWindow.width - 40), height:30},
										 textAlign:"center",
										 top:10,
										 text:names[view.selected]
});
Titanium.UI.currentWindow.add(nameLabel);

// Add click event listener
view.addEventListener('click', function(e)
{
	// Create the window and load the view
	var url = "organizerDetailView.js";
	
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
	}
	
	// Set the new view values
    win.name = nameLabel.text;
    var text;
    
	switch(view.selected)
	{
	case 0:
	  text = _("m-o_detail");
	  break;
	case 1:
	  text = _("naraa_detail");
	  break;
	case 2:
	  text = _("travis_detail");
	  break;
	case 3:
	  text = _("nick_detail");
	  break;
	case 4:
	  text = _("chris_detail");
	  break;
	case 5:
	  text = _("tuguldur_detail");
	  break;
	case 6:
	  text = _("uyanga_detail");
	  break;
	case 7:
	  text = _("neal_detail");
	  break;
	case 8:
	  text = _("batzorig_detail");
	  break;
	case 9:
	  text = _("joe_detail");
	  break;	  	  	  	  	  	  	  
	default:
	  break;
	}
	win.text = text;
	
	// Open the new view	
	Titanium.UI.currentTab.open(win,{animated:true});
});

// Add change event listener
view.addEventListener('change', function(e)
{
	// Set the name on the label
	nameLabel.text = names[e.index];
});	