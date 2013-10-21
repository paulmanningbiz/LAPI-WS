//*******************************************************************************
// Name:		Server.js
// Desc:		Provide Components for Landing Page Content used by Magnolia
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

app.get		('/Page', 						    Page.findPage);
app.get		('/Page/:AlphaKey', 				Page.findAlphaKey);
app.get		('/Page/:AlphaKey/:Code',		    Page.findCategory);

console.log('Getting WTG');

app.get		('/WTG', 							WTG.findWTG);
app.get		('/WTG/:AlphaKey', 					WTG.findAlphaKey);
app.get		('/WTG/:AlphaKey/:Code',   		    WTG.findCategory);

console.log('Getting Horizontal Navigation');

app.get		('/HN', 							HN.findHN);
app.get		('/HN/:AlphaKey', 					HN.findAlphaKey);
app.get		('/HN/:AlphaKey/:Code', 		    HN.findCategory);

app.listen(config.server.Port);
console.log('Listening on port ' + config.server.Port);