var map;
var marker_search_result;

var locations = new Object();
var tarieven = new Object();

var legenda;
var infoBox;
var infoBoxContent;

var clusterer;

//function screen_check()
//{
//    enquire.register("screen and (max-width:519px)", {
//
//        // OPTIONAL
//        // If supplied, triggered when a media query matches.
//        match : initialize_mobile,
//
//        // OPTIONAL
//        // If supplied, triggered when the media query transitions
//        // *from a matched state to an unmatched state*.
//        unmatch : initialize
//
//        // OPTIONAL
//        // If supplied, triggered once, when the handler is registered.
//        //setup : function() {},
//
//        // OPTIONAL, defaults to false
//        // If set to true, defers execution of the setup function
//        // until the first time the media query is matched
//        //deferSetup : true,
//
//        // OPTIONAL
//        // If supplied, triggered when handler is unregistered.
//        // Place cleanup code here
//        //destroy : function() {}
//
//    });
//}

function initialize()
{
	//console.log("INIT");

    $('.filter-day').ezMark({radioCls: 'ez-radio-light-gray', selectedCls: 'ez-checked-radio-light-gray'});
	$('.filter-time').ezMark({radioCls: 'ez-radio-dark-gray', selectedCls: 'ez-checked-radio-dark-gray'});

    $(window).resize(Utils.resize);

    map = new google.maps.Map(document.getElementById("map_canvas"), DEFAULT_MAP_OPTIONS);

    infoBox  = new InfoBox(new InfoBoxOptions(420,284));
    google.maps.event.addListener(map, 'click', function(event)
    {
        infoBox.close();

		if (lastPoly != null) {
    		  lastPoly.setOptions({strokeWeight: 1.0});
	    }
    });

	google.maps.event.addListener(infoBox, 'closeclick', function(event) {
        if (lastPoly != null) {
          lastPoly.setOptions({strokeWeight: 1.0});
        }
    });

    var urlParams = Utils.parseUrlParams();
    var defaults = "1-2";

    legenda = new Legenda($("#legenda"),$("#header"), (urlParams["hidemenu"] == "1"));
    legenda.geoSearchResult = handleGeoSearchResult;
    legenda.checkboxClicked = updatePunten;
    legenda.setOptions(urlParams["onpunten"],defaults);
    legenda.addTrafficCheckbox();
  //  legenda.addSearchBox();

    // add checkboxes for the punten
    for (var it in MENU_PUNTEN)
    {
        legenda.addCheckbox(MENU_PUNTEN[it].id,MENU_PUNTEN[it].titel, false);
    }

    var parts;
    var tariefdefaults = "1-2-3-4-5-6-7-8";
    if ( urlParams["on"] )
    {
        parts = urlParams["on"].split("-");
    }
    else
    {
        parts = tariefdefaults.split("-");
    }


    var chk;
    var index = 0;
    // add checkboxes for tarieven
    for (var tarief in LAYERS_TARIEVEN)
    {
        index++;

        chk = $('#' + LAYERS_TARIEVEN[tarief].id);
        if (parts.indexOf( index.toString() ) >= 0)
        {
            chk.attr('checked', "checked");
        }
        chk.ezMark({checkboxCls: 'ez-checkbox-' + LAYERS_TARIEVEN[tarief].color, checkedCls: 'ez-checked-' + LAYERS_TARIEVEN[tarief].color});
        chk.click(updateTarieven);
    }

    // activate radio's
    var radio;
    for (var i=0; i < RADIOS_TIME.length; i++)
    {
        radio = $("#" + RADIOS_TIME[i]);
        radio.click(updateTarieven);
    }
    for (var i=0; i < RADIOS_DAY.length; i++)
    {
        radio = $("#" + RADIOS_DAY[i]);
        radio.click(updateTarieven);
    }

    Utils.resize();

    var loc;
    if (urlParams["loc"]) {
      loc = urlParams["loc"].split("-");
      showLocation(loc[0],loc[1]);
    }

    updatePunten();

    // get tarieven
    $.getJSON( TARIEVEN ,handleJSONResultTarieven );
}

function showLocation(lat,lng) {
  // var lat = results[0].geometry.location.lat()  ;
  // var lng = results[0].geometry.location.lng() - .01;
  var latlng = new google.maps.LatLng(lat, lng);

  // zoom in
  map.setCenter(latlng);
  map.setZoom(14);

  marker_search_result = MapUtils.createMarker( IMAGE_SEARCH_RESULT,  latlng );

  //google.maps.event.addListener(marker_search_result, "click", SearchUtils.handleMarkerSearchResultClick);

  //marker_search_result.adres  = formaddr;
  //marker_search_result.showrouteplanner = showrouteplanner;

  marker_search_result.setMap(map);
}

function handleGeoSearchResult(results,status)
{
    SearchUtils.showSearchResult(status,results);
}

function updatePunten()
{
    infoBox.close();

    var checkboxes = legenda.getCheckboxes();

    for (var key in checkboxes)
    {
        if (locations[key])
        {
            if (key == TYPE_BETALEN)
            {
                if (!clusterer)
                {
                    clusterer = new MarkerClusterer(map, [], {styles: CLUSTER_STYLE});
                    clusterer.setGridSize(CLUSTER_GRID_SIZE);
                }
                if ( checkboxes[ key ].is(':checked'))
                {
                    for (var i=0; i < locations[key].length; i++)
                    {
                        // add marker to clusterer
                        clusterer.addMarker(locations[key][i].marker);
                    }
                }
                else
                {
                    clusterer.clearMarkers();
                }
            }
            else
            {
                for (var i=0; i < locations[key].length; i++)
                {
                    if ( checkboxes[ key ].is(':checked'))
                    {
                        // turn on
                        MapUtils.showFeature(locations[key][i].marker,map);
                    }
                    else
                    {
                        // turn off
                        MapUtils.hideFeature(locations[key][i].marker);
                    }
                }
            }
        }
        else
        {
            if (key == TYPE_BETALEN)
            {
                loadBetaalpunten();
            }
            else
            {
                loadPunten();
            }
        }
    }
}
function updateTarieven()
{
	// parkeertarieven
	var t;
	var areas;
    var chk;
	for (var tarief in LAYERS_TARIEVEN)
	{
		areas = tarieven[ tarief ];

		if (areas)
		{
            chk = $('#' + LAYERS_TARIEVEN[tarief].id);
			if ( chk.is(':checked'))
			{
				// turn on areas for this tarief
				for (var i=0; i < areas.length; i++ )
				{
					t = areas[i];

					if (t.feature != null)
					{
						if (isInFilters(t) )
						{
                            MapUtils.showFeature(t.feature,map);
						}
						else
						{
                            MapUtils.hideFeature(t.feature);
						}
					}
					else
					{
	//					console.log(t);
					}
				}
			}
			else
			{
				// turn off areas for this tarief
				for (var i=0; i < areas.length; i++ )
				{
					t = areas[i];
                    MapUtils.hideFeature(t.feature);
				}
			}
		}
	}
}

function isInFilters(t)
{
	var inTimeFilter = false;
	var inDayFilter = false;
	var inBothFilters = false;

	var slot;
    //console.log(t.slots)
	for (var i=0; i < t.slots.length; i++)
	{
		slot = t.slots[i];

		inTimeFilter = false;
		inDayFilter = false;
		result = false;

        var id;
        for (var j=0; j < RADIOS_TIME.length; j++)
        {
            id = RADIOS_TIME[j];
          //  console.log(id)
            if ($('#' + id).is(':checked'))
            {
                if (slot.timefilters[id] )
                {
                    inTimeFilter = true;
                    break;
                }
            }
        }
        for (var j=0; j < RADIOS_DAY.length; j++)
        {
            id = RADIOS_DAY[j];

            if ($('#' + id).is(':checked'))
            {

                if (slot.dayfilters[id] )
                {
                    inDayFilter = true;
                    break;
                }
            }
        }
		inBothFilters = (inTimeFilter && inDayFilter);
		if (inBothFilters)
		{
			break;
		}

	}

	return (inBothFilters);
}

function handleMarkerClick()
{
    if(infoBoxContent == undefined)
    {
        infoBoxContent = new InfoBoxContent();
        infoBoxContent.handleRouteRequest = RouteUtils.handleRouteRequest;
    }
    infoBoxContent.set(this.parent.getTitle(),this.parent.getText(),this.parent.getIcons(),true);

    infoBox.setContent( infoBoxContent.create() );

    // hack
    //infoBox["currentDestination"] = this.parent.getAddress();

    infoBox.open(map, this);
}

var lastPoly = null;
function handleTariefClick(e)
{
	if (lastPoly != null) {
      lastPoly.setOptions({strokeWeight: 1.0});
    }
    this.setOptions({strokeWeight: 3.0});
    lastPoly = this;

    if(infoBoxContent == undefined)
    {
        infoBoxContent = new InfoBoxContent();
        infoBoxContent.handleRouteRequest = RouteUtils.handleRouteRequest;
    }
    infoBoxContent.set(this.parent.getTitle(),this.parent.getTarievenTabel(),[],false);

    infoBox.setPosition(e.latLng);
    infoBox.setContent( infoBoxContent.create() );

    infoBox.open(map);
}

function loadBetaalpunten()
{
    $.getJSON( BETAALPUNTEN ,handleJSONResultBetalen );
}
function loadPunten()
{
    $.getJSON( POINTS ,handleJSONResultPoints );
}

function handleJSONResultBetalen(data)
{
    locations[TYPE_BETALEN] = new Array();

    var collection = new GeoJSON(data);
//    clusterer = new MarkerClusterer(map);
//    clusterer.setStyle(CLUSTER_STYLE)


    var p;
    var feature;

    for (var i=0; i < collection.length; i++)
    {
        feature = collection[i][0];

        p = new BetaalLocation(feature,LAYERS_PUNTEN[TYPE_BETALEN].markerimage);

        locations[TYPE_BETALEN].push(p);
    }
    updatePunten();
}
function handleJSONResultPoints(data)
{
    var locs = data.parkeerlocaties;

    var o;
    for (var i=0 ; i < locs.length; i++)
    {
        o = new ParkingLocation(locs[i].parkeerlocatie,LAYERS_PUNTEN);

        if (o.id != undefined)
        {
            if (!locations[o.id])
            {
                locations[o.id] = new Array();
            }
            locations[o.id].push( o );
        }
    }

    updatePunten();
}

function handleJSONResultTarieven(data)
{
    var max = 4;
    var cnt = 0;

    tarieven[MAX_DUUR]= new Array();

    var p;
    var tmp;

    for (var it in data)
    {
        tmp = new ParkingTarief(data[it], it);

        // create associative array with all the tarieven, their markers and day/time slots
        var tarieven_all = tmp.tarieven;
        //console.log(tmp.description);
        for (var max_duur in tarieven_all)
        {
            var tarievenlijst = tarieven_all[max_duur];

            for (var tarief in tarievenlijst)
            {
                if (tmp.location != null)
                {
                    p = new ParkingTarief(data[it], it);

                    if (max_duur == 0)
                    {
                        p.createPolygon(tarief);
                    }
                    else
                    {
                        p.createPolygon(MAX_DUUR);
                    }

                    var slot;
                    for (var time in tarievenlijst[tarief])
                    {
                        slot = new DayTimeSlot( time, tarievenlijst[tarief][time], tarief )	;

                        p.slots.push( slot )
                    }
                    //console.log(p.slots);
                    if (max_duur == 0)
                    {
                        if (!tarieven[ tarief ] )
                        {
                            tarieven[ tarief ] = new Array();
                        }
                        tarieven[ tarief ].push( p );
                    }
                    else
                    {
                        tarieven[ MAX_DUUR ].push( p )
                    }
                }
            }
        }
    }
    updateTarieven();
}
