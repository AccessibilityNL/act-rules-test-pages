RouteBoxContent = function( )
{
}

RouteBoxContent.prototype.set = function( resp, req )
{
    var specs =  resp.routes[0].legs[0];

//    console.log(specs);
//    console.log(req.destination);

    this.mode = this.getMode( req.travelMode );
    this.destination = specs.end_address;
    //this.destination_latlng = req.destination.ob + "," + req.destination.pb;

   // console.log(this.destination_latlng)
    this.origin = specs.start_address;
    this.startlocation =  specs.start_location;

    this.title = "afstand:" + specs.distance.text + ", " + specs.duration.text + " " + this.mode.tag;
    this.text = "van:<br/>" + specs.start_address + "<br/>naar:<br/>" + specs.end_address;

//    if (destination instanceof Object)
//    {
//        this.text += destination.title + "<br/>" + destination.line_1 + "<br/>" + destination.line_2 ;
//    }
//    else
//    {
//        this.text += destination;
//    }
}
RouteBoxContent.prototype.getMode = function(m)
{
    var mode = '';
    for (var it in ROUTE_MODES)
    {
        if (ROUTE_MODES[it].mode == m)
        {
            mode = ROUTE_MODES[it];
            break;
        }
    }
    return mode;
}
RouteBoxContent.prototype.create = function()
{
    var content = this.getHeader();
    content += this.getContent();
    content += this.getFooter();

    return content;
}
RouteBoxContent.prototype.handleMoreButtonClick = function(elm)
{
    return false;
}
RouteBoxContent.prototype.getHeader = function()
{
    return "<div id='infoboxHeader'><strong>" + this.title + "</strong></div>";
}

RouteBoxContent.prototype.getContent = function()
{
    // content
    var content = "<div id='infoboxContent'>";

    // text
    content += "<div id='infoboxText'>" + this.text + "</div>";

    //end infobox Content
    content += '</div>';

    return content;
}

RouteBoxContent.prototype.getFooter = function()
{
    var url = MAPS_DIRECTIONS_URL + "saddr=" + this.origin + "&daddr=" + this.destination + this.mode.param;
    var footer = '<div id="infoboxFooter"><a target="_new" href="' + url +  '"  class="infoboxUrl">> uitgebreide routebeschrijving</a></div>';
    return footer;
}

RouteBoxContent.prototype.getOriginLocation = function()
{
    // marker for the start_location
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.startlocation.ob, this.startlocation.pb)
    });

    return marker;

}