/**
 * @author bente
 */

// zoomcontrol to the right when menu is as tall as the viewposrt
//DEFAULT_MAP_OPTIONS.zoomControlOptions.position = google.maps.ControlPosition.TOP_RIGHT;

var TARIEVEN =  PROXY  + BASE + "parkeren/deploy_data/tarieven.json";
var BETAALPUNTEN =  PROXY  + BASE + "parkeren/deploy_data/verkooppunt.json";


var DAYS = new Object();
DAYS["zo"] = 0;
DAYS["ma"] = 1;
DAYS["di"] = 2;
DAYS["wo"] = 3;
DAYS["do"] = 4;
DAYS["vrij"] = 5;
DAYS["za"] = 6;

var DEFAULT_LAYER_STYLE = {strokeColor: "#000000", strokeWeight: 1, strokeOpacity: 0.75, fillColor: "#f6f607", fillOpacity: 0.60, zIndex:1 };

var DAY_ALLE 	= "ma-zo";
var DAY_MA_VR 	= "ma-vr";
var DAY_ZA 		= "za";
var DAY_ZO 		= "zo";
var DAY_DO 		= "do";
var RADIOS_DAY = new Array(DAY_ALLE,DAY_MA_VR,DAY_ZA,DAY_ZO, DAY_DO);

var TIME_0 = "0-24";
var TIME_1 = "9-12";
var TIME_2 = "12-19";
var TIME_3 = "19-21";
var TIME_4 = "21-24";
var TIME_5 = "0-2";
var RADIOS_TIME = new Array(TIME_0,TIME_5,TIME_1,TIME_2,TIME_3,TIME_4);

var TARIEF_A 	= "1,30";
var TARIEF_B 	= "0,10";
var TARIEF_C 	= "1,40";
var TARIEF_D 	= "2,40";
var TARIEF_E 	= "3,00";
var TARIEF_F 	= "4,00";
var TARIEF_G 	= "5,00";
var MAX_DUUR 	= "maxduur";

var LAYERS_TARIEVEN = new Object();
LAYERS_TARIEVEN[TARIEF_A] = {id:"tarief-a", color:"yellow",         fillColor: "#f6f607", zIndex:10,  icon:"icon-tarief-130", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[TARIEF_B] = {id:"tarief-b", color:"light-orange",   fillColor: "#f99f1c", zIndex:11,  icon:"icon-tarief-combi", locationmarker:"location-tarief-5"};
//LAYERS_TARIEVEN[TARIEF_B] = {id:"tarief-b", color:"aubergine",   fillColor: "#621f41", zIndex:11,  icon:"icon-tarief-combi", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[TARIEF_C] = {id:"tarief-c", color:"dark-orange",    fillColor: "#f15c22", zIndex:12,  icon:"icon-tarief-140", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[TARIEF_D] = {id:"tarief-d", color:"red",            fillColor: "#ed1c24", zIndex:13,  icon:"icon-tarief-240", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[TARIEF_E] = {id:"tarief-e", color:"pink",           fillColor: "#ec008c", zIndex:14,  icon:"icon-tarief-3", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[TARIEF_F] = {id:"tarief-f", color:"blue",           fillColor: "#00a3e8", zIndex:15,  icon:"icon-tarief-4", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[TARIEF_G] = {id:"tarief-g", color:"purple",         fillColor: "#772b90", zIndex:16,  icon:"icon-tarief-5", locationmarker:"location-tarief-5"};
LAYERS_TARIEVEN[MAX_DUUR] = {id:"tarief-h", color:"aubergine",      fillColor: "#621f41", zIndex:100, icon:"icon-tarief-maxduur", locationmarker:"location-tarief-5"};

var LAYERS_PUNTEN = new Object();
LAYERS_PUNTEN[TYPE_PARKEERGARAGE] 		= {id:"parkeergarage", icon:"icon-parkeergarage", markerimage: MARKER_ICON_GARAGE};
LAYERS_PUNTEN[TYPE_COMM_PARKEERGARAGE]  = {id:"parkeergarage", icon:"icon-parkeergarage", markerimage: MARKER_ICON_GARAGE};
LAYERS_PUNTEN[TYPE_PENR]		        = {id:"penr", icon:"icon-penr", markerimage:MARKER_ICON_PENR};
LAYERS_PUNTEN[TYPE_BETALEN] 	        = {id:"betaalautomaat", icon:"icon-betaalpunt",markerimage:MARKER_ICON_BETAALPUNT};

var MENU_PUNTEN = new Object();
MENU_PUNTEN[TYPE_PARKEERGARAGE] 	= {titel:"Parkeergarage",id:"parkeergarage"};
MENU_PUNTEN[TYPE_PENR]		        = {titel:"P+R",id:"penr"};
MENU_PUNTEN[TYPE_BETALEN] 	        = {titel:"Parkeerautomaten",id:"betaalautomaat"};

var MARKER_ICON_GARAGE_MOBILE = new google.maps.MarkerImage("img/mobile-marker-parkeergarage.png", ICON_SIZE, ICON_ORIGIN, ICON_ANCHOR);
var MARKER_ICON_BETAALPUNT_MOBILE = new google.maps.MarkerImage("img/mobile-marker-betaalpunt.png", ICON_SIZE, ICON_ORIGIN, ICON_ANCHOR);

var LAYERS_PUNTEN_MOBILE = new Object();
LAYERS_PUNTEN_MOBILE[TYPE_PARKEERGARAGE] 		= {titel:"Parkeergarage",id:"parkeergarage", icon:"icon-parkeergarage", markerimage: MARKER_ICON_GARAGE_MOBILE};
LAYERS_PUNTEN_MOBILE[TYPE_BETALEN] 	        = {titel:"Betaalautomaten",id:"betaalautomaat", icon:"icon-betaalpunt",markerimage:MARKER_ICON_BETAALPUNT_MOBILE};


var CLUSTER_STYLE = [{
    url: '../img/marker-cluster.png',
    height: 38,
    width: 33,
    anchor: [6, 7],
    textColor: '#ffffff',
    textSize: 12
}];

var CLUSTER_GRID_SIZE = 30;
