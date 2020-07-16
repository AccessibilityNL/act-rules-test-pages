InfoBoxOptions = function(w,h)
{
    var boxw = (w != undefined) ? w : INFOBOX_DEFAULT_WIDTH;
    var boxh = (h != undefined) ? h : INFOBOX_DEFAULT_HEIGHT;

    this.pixelOffset = new google.maps.Size(-(boxw/2), -(boxh+50));
    this.boxClass = "infobox";
    this.maxWidth = boxw;

    this.boxStyle = new Object();
    this.boxStyle.width = boxw + "px";
    this.boxStyle.height = boxh + "px";
    this.closeBoxMargin = "8px 8px 2px 2px";
    this.closeBoxURL = SHARED + "img/close.gif";
    this.infoBoxClearance = new google.maps.Size(10, 10);
}