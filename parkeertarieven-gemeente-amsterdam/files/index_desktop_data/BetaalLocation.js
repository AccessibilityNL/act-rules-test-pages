BetaalLocation = function( marker, icon )
{

    //console.log(data);
    this.title = "Betaalpunt";
    this.address = marker.geojsonProperties.OMS;
    this.marker = marker;
    this.icon = LAYERS_PUNTEN[TYPE_BETALEN].icon;
    this.id = LAYERS_PUNTEN[TYPE_BETALEN].id;
    this.puntnummer = marker.geojsonProperties.VERKOOP_PU;

    this.marker.parent = this;

    marker.setIcon(icon);
    google.maps.event.addListener(marker, "click", handleMarkerClick);
}

BetaalLocation.prototype.getTitle = function()
{
    return this.title;
}
BetaalLocation.prototype.getText = function()
{
    var txt = '<div id="betaalpuntwrapper"><div id="betaalpuntbordje"></div><div id="betaalpuntnummer">' + this.puntnummer + '</div></div>' + this.address ;

    return  txt;
}
BetaalLocation.prototype.getAddress = function()
{
    return {title:this.title, line_1: this.address , line_2: "Amsterdam"};
}
BetaalLocation.prototype.getIcons = function()
{
    return [this.icon];
}