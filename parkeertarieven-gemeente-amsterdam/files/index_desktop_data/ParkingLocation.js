ParkingLocation = function( data, markertypes )
{

    //console.log(data);
    this.title = data.title;
    this.type = data.type;
    this.url = data.url;
    this.urltitle = data.urltitle;
    this.location = new Location(data.Locatie);
    this.address = new Address( data );
    this.aantal = data.aantal;
    this.marker = undefined;
    this.icon = undefined;
    this.opmerkingen = data.opmerkingen;


    //console.log(this.type);
    if ( markertypes[this.type])
    {
        //console.log("create");
        this.marker = this.createMarker( this.location, markertypes[this.type].markerimage );
        this.icon = markertypes[this.type].icon;
        this.id = markertypes[this.type].id;

        this.marker.parent = this;
    }
}

ParkingLocation.prototype.createMarker = function(location,markerimage)
{
    var position = new google.maps.LatLng(location.latitude, location.longitude);

    var marker = new google.maps.Marker({
        position: position,
        icon: markerimage,
        zIndex: 0
    });

    google.maps.event.addListener(marker, "click", handleMarkerClick);

    return marker;
}

ParkingLocation.prototype.getTitle = function()
{
    return this.title;
}
ParkingLocation.prototype.getText = function()
{
    var adres = this.address.line_1 + "<br/>" + this.address.line_2;
    var aantal = '';
    var opmerkingen = '';
    var url = '';

    if (this.aantal)
    {
        aantal = "<br/><br/>aantal plaatsen: " + this.aantal;
    }
    if (this.opmerkingen)
    {
        opmerkingen = "<br/><br/>" + this.opmerkingen;
    }
    if (this.url)
    {
        var linkname = this.urltitle;
        if (this.urltitle.length > 60)
        {
            linkname = 'website';
        }
        url = '<br/><br/><a href="' + this.url + '" class="infoboxLink" target="_new">' + linkname + "</a>";
    }

    return  adres + aantal + opmerkingen + url;
}
ParkingLocation.prototype.getAddress = function()
{
    return {title:this.title, line_1: this.address.line_1 , line_2: this.address.line_2};
}
ParkingLocation.prototype.getIcons = function()
{
    return [this.icon];
}