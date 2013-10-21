//*******************************************************************************
// Name:		Server.js
// Desc:		Provide Components for each Landing Page Content API for Magnolia
// Author:	    Paul Manning
// Date:		23.05.2013
//*******************************************************************************

var config  = require('./config');
var express = require('express');
var app 	= express();
var url 	= require("url");

app.use(express.bodyParser());

Page	    = require('./content/ExportPage');
WTG     	= require('./content/ExportWTG');
HN      	= require('./content/ExportHN');
app.configure
(
	function () 
	{
		app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
		app.use(express.bodyParser());
	}
);
 
console.log('Getting Page');

app.get		('/Page', 						    Page.findAllPages);
app.get		('/Page/:AlphaKey', 				Page.findPageAlphaKey);
app.get		('/Page/:AlphaKey/:Code',		    Page.findPageCode);
app.post	('/Page/',						    Page.addPage);
app.put		('/Page/:AlphaKey', 				Page.updatePage);
app.delete	('/Page/:AlphaKey', 				Page.deletePage); 

console.log('Getting WTG');

app.get		('/WTG', 							WTG.findAllWTG);
app.get		('/WTG/:AlphaKey', 					WTG.findWTGAlphaKey);
app.get		('/WTG/:AlphaKey/:Category',   		WTG.findWTGCategory);
app.post	('/WTG', 							WTG.addWTG);
app.put		('/WTG/:AlphaKey', 					WTG.updateWTG);
app.delete	('/WTG/:AlphaKey',					WTG.deleteWTG);

console.log('Getting Horizontal Navigation');

app.get		('/HN', 							HN.findAllHN);
app.get		('/HN/:AlphaKey', 					HN.findHNAlphaKey);
app.get		('/HN/:AlphaKey/:Category', 		HN.findHNCategory);
app.post	('/HN', 							HN.addHN);
app.put		('/HN/:AlphaKey', 					HN.updateHN);
app.delete	('/HN/:Alphakey', 					HN.deleteHN);

app.listen(config.server.Port);
console.log('Listening on port ' + config.server.Port);