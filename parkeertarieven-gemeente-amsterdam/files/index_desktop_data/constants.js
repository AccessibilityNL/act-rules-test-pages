/**
 * @author bente
 */

var MOBILE_VIEWPORT_WIDTH = 519;

// icons
var ICON_SIZE 	= new google.maps.Size(32,33);
var ICON_ORIGIN = new google.maps.Point(0,0);
var ICON_ANCHOR = new google.maps.Point(26,29);

var IMAGE_SEARCH_RESULT = SHARED + 'img/marker-rood.png';

// map defaults
var MAP_CENTER = new google.maps.LatLng(52.37182636, 4.86);
var AMS_CENTER = new google.maps.LatLng(52.378412, 4.904108);

var DEFAULT_ZOOM = 12;

var DEFAULT_MAP_OPTIONS =
{
    zoom: DEFAULT_ZOOM,
    maxzoom: 14,
    center: MAP_CENTER,
    panControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl:true,
    zoomControlOptions: {position:google.maps.ControlPosition.TOP_LEFT, style: google.maps.ZoomControlStyle.SMALL},
    styles:[{featureType: "poi.business", stylers: [ { visibility: "off" } ]}]
};

// infobox
var INFOBOX_DEFAULT_WIDTH = 360;
var INFOBOX_DEFAULT_HEIGHT = 180;

// routeplanner
var ROUTE_MODES = new Object();
ROUTE_MODES['auto']  = {mode:google.maps.TravelMode.DRIVING,tag:"met de auto",param:""};
ROUTE_MODES['lopen'] = {mode:google.maps.TravelMode.WALKING,tag:"te voet",param:"&dirflg=w"};
ROUTE_MODES['fiets'] = {mode:google.maps.TravelMode.BICYCLING,tag:"op de fiets",param:"&dirflg=b"};
ROUTE_MODES['ov']    = {mode:google.maps.TravelMode.TRANSIT,tag:"met ov",param:"&dirflg=r"};

var MAPS_DIRECTIONS_URL = 'http://maps.google.nl/maps?';

// traffic
var AMSTERDAM_TRAFFIC_JSON = SHARED + "verkeersdata.php";
var CHECKBOX_TRAFFIC = "traffic";
var CHECKBOX_TRAFFIC_TITLE = "Actuele verkeersdrukte";
var AMSTERDAM_WERKZAAMHEDEN_JSON = SHARED + 'wegwerkzaamheden.php';