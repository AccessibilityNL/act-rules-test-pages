InfoBoxContent = function( )
{
    this.currentMode = 'auto';
    this.inputfieldHint = 'adres, postcode';

    this.currentOrigin = this.inputfieldHint;
}

InfoBoxContent.prototype.set = function( title,text, icons, hasrouteplanner )
{
    this.title = title;
    this.text = text;
    this.icons = icons;
    this.hasrouteplanner = (hasrouteplanner != undefined) ? hasrouteplanner : false;
}
InfoBoxContent.prototype.create = function()
{
    var content = this.getHeader();
    content += this.getContent();
    content += this.getFooter();

    return content;
}
InfoBoxContent.prototype.update = function()
{
    var elm;
    for (var it in ROUTE_MODES)
    {
        //$("#" + this.buttons[i]).removeClass('active');
        elm =  document.getElementById(it);
        elm.className = "routebutton";
    }

    elm = document.getElementById(this.currentMode);
    elm.className = "routebutton active";

  //  document.getElementById("field").value = this.currentOrigin;
}
InfoBoxContent.prototype.handleRouteButtonClick = function(elm)
{
    this.currentMode = elm.id;
    this.update();
    return false;
}

InfoBoxContent.prototype.handleGoButtonClick = function()
{
    var inputfield = document.getElementById("field");
    if (inputfield.value.length > 0)
    {
        this.currentOrigin = inputfield.value;

        console.log(this.position);
        console.log(this.currentDestination)
        this.handleRouteRequest(inputfield.value, this.currentMode, this.position);
    }

    return false;
}
InfoBoxContent.prototype.handleKeyPress = function()
{
    if (window.event.keyCode ==13)
    {
        var inputfield = document.getElementById("field");
        if (inputfield.value.length > 0)
        {
            this.currentOrigin = inputfield.value;
            this.handleRouteRequest(inputfield.value, this.currentMode );
        }
        return false;
    }
}
InfoBoxContent.prototype.handleFieldFocus = function(e)
{
    var inputfield = document.getElementById("field");

    if ( inputfield.value == this.inputfieldHint )
    {
        inputfield.value = '';
    }
}
InfoBoxContent.prototype.handleFieldBlur = function(e)
{
    var inputfield = document.getElementById("field");

    if ( inputfield.value == "" )
    {
        inputfield.value = this.inputfieldHint;
    }
}
InfoBoxContent.prototype.handleRouteRequest = function(origin,mode)
{
      console.log("CALLBACK,override");
}
InfoBoxContent.prototype.getHeader = function()
{
    return "<div id='infoboxHeader'><strong>" + this.title + "</strong></div>";
}

InfoBoxContent.prototype.getContent = function()
{
    // content
    var content = "<div id='infoboxContent'>";

    // text
    content += "<div id='infoboxText'>" + this.text + "</div>";

    // icons
    content += "<div id='infoboxIcons'>";
    for (var i=0; i < this.icons.length; i++)
    {
         content += "<div class='icon' id='" +  this.icons[i]  + "'></div>";
    }
    content += "</div>";

    //end infobox Content
    content += '</div>';

    return content;
}

InfoBoxContent.prototype.getFooter = function()
{
    var footer = '<div id="infoboxFooter">';
    ;
    if (this.hasrouteplanner)
    {
         var linkfooter = '<div id="linkFooter" class="footers"><a href="#" onclick="infoBoxContent.showRoutePanel()" class="infoboxUrl">> routebeschrijving</a></div>';
         var routefooter = '<div class="footers" id="routeFooter"><label>Vertrek:</label><input id="field" name="field" type="text" onfocus="infoBoxContent.handleFieldFocus()" onblur="infoBoxContent.handleFieldBlur()" onkeypress="infoBoxContent.handleKeyPress()" value="' + this.currentOrigin+ '" />';

         for (var it in ROUTE_MODES)
         {
             routefooter += '<a class="routebutton" id="' + it + '" onclick="infoBoxContent.handleRouteButtonClick(this)">' + it + '</a>';
         }

         routefooter += '<a href="#" onclick="infoBoxContent.handleGoButtonClick()" class="infoboxUrl">> toon</a></div>';
        //<a class="routebutton" id="ov" onclick="infoBoxContent.handleRouteButtonClick(this)">ov</a><a class="routebutton" id="lopen" onclick="infoBoxContent.handleRouteButtonClick(this)">lopen</a><a class="routebutton" id="fiets" onclick="infoBoxContent.handleRouteButtonClick(this)">fiets</a><a href="#" onclick="infoBoxContent.handleGoButtonClick()" class="infoboxUrl">> toon</a></div>';

        footer += linkfooter + routefooter;
    }
    footer += "</div>";

    return footer;
}

InfoBoxContent.prototype.showRoutePanel = function()
{
    this.update();
    $("#routeFooter").slideDown( "fast", this.handleRouteDown );
    return false;
}
InfoBoxContent.prototype.handleRouteDown = function()
{
    $("#linkFooter").hide();
}