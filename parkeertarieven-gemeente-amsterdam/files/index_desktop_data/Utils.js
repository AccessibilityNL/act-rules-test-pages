//***
//
// Generic Utils
//
//***

var lastSize = 0;

Utils = function()
{
}

Utils.parseUrlParams = function()
{
    var params = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
        params[d(e[1])] = d(e[2]);

    return params;
}

Utils.toggleOptions = function(options,param, defaults)
{
    var parts;
    if ( param )
    {
        parts = param.split("-");
    }
    else
    {
        parts = defaults.split("-");
    }

    var index;
    for (var i=0; i < parts.length; i++)
    {
        index = parts[i] - 1;
        options[ index ].attr('checked', true);
    }
}

Utils.isArray = function(obj)
{
    return obj.constructor == Array;
}

Utils.resize = function()
{
    // prevent resize from firing all the time
    	
	//console.log("resize w:" + $(window).width() + ":" + lastSize );

	//console.log("resize w:" + $(window).width() + ":" + document.body.clientWidth );


	if (lastSize != $(window).width() )
	{
		lastSize = $(window).width();			

		$('#map_canvas').width( $(window).width() );


	    var h;
	    // map height can not be smaller than menu height, unless menu is hidden
	    if ( $(window).height() > legenda.getHeight() )
   	 	{
        	h = $(window).height();

    	}
	    else
    	{
        	h = legenda.getHeight();
	        // move zoom control to the right when the legenda spans the full viewport height
    	    map.setOptions( {zoomControlOptions: {position:google.maps.ControlPosition.TOP_RIGHT, style: google.maps.ZoomControlStyle.SMALL}} );

    	}
	    $('#map_canvas').height( h );

    	legenda.setViewport($(window).width(), h);
	    legenda.adjustToViewport();

	    map.setCenter(MAP_CENTER);
	}
}


//***
//
// MapUtils
//
//***



MapUtils = function()
{

}

MapUtils.createMarker = function(imgurl,position)
{
    var icon = new google.maps.MarkerImage(imgurl, ICON_SIZE, ICON_ORIGIN, ICON_ANCHOR);
    var marker = new google.maps.Marker({
        position: position,
        icon: icon,
        zIndex: google.maps.Marker.MAX_ZINDEX + 1
    });
    return marker;
}

MapUtils.showFeature = function(f,map)
{
    if (f.length)
    {
        // array of features
        for (var i=0; i < f.length; i++)
        {
            f[i].setMap(map);
        }
    }
    else
    {
        // feature
        f.setMap(map);
    }
}
MapUtils.hideFeature = function(f)
{
    if (f.length)
    {
        // array of features
        for (var i=0; i < f.length; i++)
        {
            f[i].setMap(null);
        }
    }
    else
    {
        // feature
        f.setMap(null);
    }
}

//***
//
// RouteUtils
//
//***


RouteUtils = function()
{

}

RouteUtils.handleRouteRequest = function(origin,mode, position)
{
    // desitination is location of the infoBox
    var request = {
        origin:origin,
        destination:infoBox.getPosition(),
        travelMode: ROUTE_MODES[mode].mode,
        region: 'nl',
        provideRouteAlternatives: false,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    if (this.directionsService == undefined)
    {
        this.directionsService  = new google.maps.DirectionsService();
    }
    this.directionsService.route(request, function(response, status)
    {
        RouteUtils.handleRouteResult(response, status, request, position);
    });
}
RouteUtils.handleRouteResult = function(response,status, request, position)
{
    if (status == google.maps.DirectionsStatus.OK)
    {
        if (this.directionsRenderer == undefined)
        {
            this.directionsRenderer = new google.maps.DirectionsRenderer();
            this.directionsRenderer.setMap(map);
        }

        this.directionsRenderer.setDirections(response);
        infoBox.close();

        // create new infobox at start of route
        RouteUtils.showRouteSpecs(response, request, position);
    }
}

RouteUtils.showRouteSpecs = function(resp, req, position)
{
    if(this.routeBoxContent == undefined)
    {
        this.routeBoxContent = new RouteBoxContent();
    }

    this.routeBoxContent.set(resp, req);

    infoBox.setContent( this.routeBoxContent.create() );

    infoBox.open(map, position );
}

//***
//
// SearchUtils
//
//***

SearchUtils = function()
{

}

SearchUtils.showSearchResult = function(status,results,showrouteplanner)
{

    if (showrouteplanner == undefined)
    {
        showrouteplanner = true;
    }
    if (status == google.maps.GeocoderStatus.OK)
    {
        // clear old marker
        if (marker_search_result) marker_search_result.setMap(null);

        var loc = results[0].geometry.location;

        //console.log(results[0]);

        dist = google.maps.geometry.spherical.computeDistanceBetween(loc, AMS_CENTER);

        var formaddr = results[0].formatted_address;
        if (formaddr == "Amsterdam, Nederland" || formaddr == "Amsterdam, The Netherlands" )
        {
            alert('Dit adres is niet gevonden in Amsterdam');
            return;
        }
        if (dist < 10000)
        {
            // move map a bit to the left
            var lat = results[0].geometry.location.lat()  ;
            var lng = results[0].geometry.location.lng() - .01;
            var latlng = new google.maps.LatLng(lat, lng);

            // zoom in
            map.setCenter(latlng);
            map.setZoom(14);

            marker_search_result = MapUtils.createMarker( IMAGE_SEARCH_RESULT,  results[0].geometry.location );

            google.maps.event.addListener(marker_search_result, "click", SearchUtils.handleMarkerSearchResultClick);

            marker_search_result.adres  = formaddr;
            marker_search_result.showrouteplanner = showrouteplanner;

            marker_search_result.setMap(map);
        }
        else
        {
            alert('Deze locatie ligt te ver buiten Amsterdam');
        }
    }
    else
    {
        alert("Geocode was not successful for the following reason: " + status);
    }
}

SearchUtils.handleMarkerSearchResultClick = function()
{
    if(infoBoxContent == undefined)
    {
        infoBoxContent = new InfoBoxContent();
        infoBoxContent.handleRouteRequest = RouteUtils.handleRouteRequest;
    }
    infoBoxContent.set("Adres",this.adres,[],this.showrouteplanner);

    infoBox.setContent( infoBoxContent.create() );
    // hack
    infoBox["currentDestination"] = this.adres;

    infoBox.open(map, this);
}


SearchableObject = function()
{
}

SearchableObject.prototype.lookup = function(key,value)
{
    var obj;

    for (var it in this)
    {
        obj = this[it];
        if (obj[key] == value)
        {
            return obj;
        }
    }
}

if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

clone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}