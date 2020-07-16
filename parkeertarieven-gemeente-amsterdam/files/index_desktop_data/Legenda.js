Legenda = function( holder,header, startclosed )
{
    this.holder = holder;
    this.header = header;

    this.open_pos = 0;
    this.closed_pos = 0;
    this.duration = 300;

    this.startclosed = (startclosed)?startclosed:false;

    this.close_button = $("#btn-close");
    this.reset_button = $("#btn-reset");

    this.close_button.click($.proxy(this.handleCloseButton, this));
    this.reset_button.click($.proxy(this.handleResetButton, this));

    this.isToggled = false;
    this.isOpen = false;
    this.viewportWidth = 0;
    this.checkboxes = {};
    this.options;
    this.numcheckboxes = 0;
    this.trafficLayer;
    this.amsterdamtraffic = [];
    this.amsterdamwerkzaamheden = [];

    this.inputfieldHint = 'Zoek adres, postcode';

    // hide reset button, we do not use it
    $("#btn-reset").hide();

    $('#functions').hide();

    this.geocoder;
}

Legenda.prototype.setOptions = function(param,defaults)
{
    if ( param )
    {
        this.options = param.split("-");
    }
    else
    {
        this.options = defaults.split("-");
    }
}
Legenda.prototype.addSearchBox = function()
{
    $('#functions').show();

    $('#functions').append('<div id="searchContainer"><form action="#" class="search"><input id="fld-search" name="zoekveld" type="text" value="Zoek adres, postcode" /><input name="zoek" id="btn-search" type="button" value="" /></form></div>');

    this.search_button = $('#btn-search');
    this.search_field = $('#fld-search');

    this.search_button.click($.proxy(this.geoSearch, this));
    this.search_field.keypress($.proxy(this.handleKeyPress, this))
    this.search_field.focus($.proxy(this.handleFieldFocus, this))
    this.search_field.blur($.proxy(this.handleFieldBlur, this))
}
Legenda.prototype.addTrafficCheckbox = function()
{
    $('#functions').show();

    // create ul
    var ul = document.createElement('ul');

    // create li
    var li = document.createElement('li');

    // add checkbox
  //  $(li).append( this.createCheckbox(CHECKBOX_TRAFFIC,CHECKBOX_TRAFFIC_TITLE,false) ) ;

    $(ul).append($(li));

    $('#functions').append($(ul));
}
Legenda.prototype.addCheckbox = function(id,name,checked)
{
//    <li>
//        <div class="holder-inner">
//            <div class="box"><input type="checkbox" id="hoofdnet" optionfor="hoofdnet"/></div>
//            <div class="label"><label class="checklabel" for="hoofdnet">Hoofdnet auto/bus</label></div>
//        </div>
//    </li>

    // count
    this.numcheckboxes++;

    // create li
    var li = document.createElement('li');

    if (!checked)
    {
        // do we have information about this in the options?
        checked = (this.options.indexOf( this.numcheckboxes.toString() ) >= 0);
    }

    // add checkbox html to li
    $(li).append( this.createCheckbox(id,name,checked) );

    // add li to menu
    $("#menu").append($(li));

    // save
    this.checkboxes[ id ] = $("#" + id);
}

Legenda.prototype.addItem = function(id,name)
{
//    <li>
//        <div class="holder-inner">
//            <div class="box"><input type="checkbox" id="hoofdnet" optionfor="hoofdnet"/></div>
//            <div class="label"><label class="checklabel" for="hoofdnet">Hoofdnet auto/bus</label></div>
//        </div>
//    </li>


    // create li
    var li = document.createElement('li');

    // add checkbox html to li
    $(li).append( this.createItem(id,name) );

    // add li to menu
    $("#menu").append($(li));

}

Legenda.prototype.addHeader = function(title)
{
//    <li>
//        <div class="holder-inner-title">
//            <div class="headlabel">Laadtype</div>
//        </div>
//    </li>

    // create li
    var li = document.createElement('li');

    // holder
    var divhld = document.createElement("div");
    $(divhld).addClass("holder-inner-title");

    // label
    var divlbl = document.createElement("div");
    $(divlbl).addClass("headlabel");
    $(divlbl).text(title);

    $(divhld).append($(divlbl));
    $(li).append($(divhld));

    // add li to menu
    $("#menu").append($(li));

}


Legenda.prototype.addIcon = function(id, title)
{
//    <li>
//        <div class="holder-inner">
//            <div id="iconparkeerplaats"/>
//            <div class="label">Gehandicaptenparkeerplaats</div>
//        </div>
//    </li>

    // create li
    var li = document.createElement('li');

    // holder
    var divhld = document.createElement("div");
    $(divhld).addClass("holder-inner");

    // icon
    var divicon = document.createElement("div");
    $(divicon).attr({"id":id});

    // label
    var divlbl = document.createElement("div");
    $(divlbl).addClass("label");
    $(divlbl).text(title);

    $(divhld).append($(divicon));
    $(divhld).append($(divlbl));
    $(li).append($(divhld));

    // add li to menu
    $("#menu").append($(li));
}

Legenda.prototype.createCheckbox = function(id,name,checked)
{
    // label
    var divlbl = document.createElement("div");
    $(divlbl).addClass("label");

    var lbl = document.createElement('label');
    $(lbl).addClass('checklabel');
    $(lbl).attr( {'for':  id  } );
		// BVB 24 05 2017 change text() to html() function
		$(lbl).html(name);

    $(divlbl).append($(lbl));

    // checkbox
    var divchk = document.createElement("div");
    $(divchk).addClass("box");

    var chk = document.createElement('input');
    $(chk).attr( {type:  'checkbox', id: id, optionfor: id  } );

    if (checked)
    {
        $(chk).attr({checked:"checked"});
    }

    $(divchk).append($(chk));

    // holder
    var divhld = document.createElement("div");
    $(divhld).addClass("holder-inner");

    $(divhld).append($(divchk));
    $(divhld).append($(divlbl));

    // styling
    $(chk).ezMark({checkboxCls: 'ez-checkbox-' + id, checkedCls: 'ez-checked-' + id});

    // action
    $(chk).click($.proxy(this.handleCheckboxClick, this,id));

    return $(divhld);
}


Legenda.prototype.createItem = function(id,name)
{
    /*
    <li>
        <div class="holder-inner">
            <div class="menu-item" id="twee"></div>
            <div class="menu-label">max. 2 weken parkeerduur</div>
        </div>
    </li>
    */

    // label
    var divlbl = document.createElement("div");
    $(divlbl).addClass("menu-label");
    $(divlbl).text(name);

    // menu-item
    var divitem = document.createElement("div");
    $(divitem).addClass("menu-item");
    $(divitem).attr("id",id);


    // holder
    var divhld = document.createElement("div");
    $(divhld).addClass("holder-inner");

    $(divhld).append($(divitem));
    $(divhld).append($(divlbl));

//    // styling
//    $(chk).ezMark({checkboxCls: 'ez-checkbox-' + id, checkedCls: 'ez-checked-' + id});

    return $(divhld);
}

Legenda.prototype.handleCheckboxClick = function(id)
{
    // click on a generic functions checkbox?
    if (id == CHECKBOX_TRAFFIC)
    {
        // handle it here
        this.toggleTrafficlayer( $("#" + id).is(':checked') );

       // this.toggleWerkzaamhedenLayer( $("#" + id).is(':checked') );
    }
    else
    {
        // pass to init.js
        this.checkboxClicked(id);
    }
}

Legenda.prototype.toggleWerkzaamhedenLayer = function(checked)
{
    if (this.amsterdamwerkzaamheden.length == 0)
    {
        $.getJSON( AMSTERDAM_WERKZAAMHEDEN_JSON ,$.proxy(this.handleWerkzaamhedenJSON, this) );
    }
    if (checked)
    {
        // this.trafficLayer.setMap(map);
        for (var i=0; i < this.amsterdamwerkzaamheden.length; i++)
        {
            this.amsterdamwerkzaamheden[i].setMap(map);
        }
    }
    else
    {
        // this.trafficLayer.setMap(null);
        for (var i=0; i < this.amsterdamwerkzaamheden.length; i++)
        {
            this.amsterdamwerkzaamheden[i].setMap(null);
        }
    }
}

Legenda.prototype.toggleTrafficlayer = function(checked)
{
//    if (this.trafficLayer == undefined)
//    {
//        this.trafficLayer = new google.maps.TrafficLayer();
//    }
    if (this.amsterdamtraffic.length == 0)
    {
        $.getJSON( AMSTERDAM_TRAFFIC_JSON ,$.proxy(this.handleTrafficJSON, this) );
    }
    if (checked)
    {
       // this.trafficLayer.setMap(map);
        for (var i=0; i < this.amsterdamtraffic.length; i++)
        {
            this.amsterdamtraffic[i].setMap(map);
        }
    }
    else
    {
       // this.trafficLayer.setMap(null);
        for (var i=0; i < this.amsterdamtraffic.length; i++)
        {
            this.amsterdamtraffic[i].setMap(null);
        }
    }
}
Legenda.prototype.handleWerkzaamhedenJSON = function(data)
{
    var collection = new GeoJSON(data,{strokeColor: "#ff0000", strokeWeight: 5, strokeOpacity: 1.0, zIndex:13 } );
    console.log(collection.length)
    var f;
    for (var i=0; i < collection.length; i++)
    {
        f = collection[i];
        console.log(f)

       // f.strokeColor = f.geojsonProperties.COLOR;
        f.setMap(map);
        this.amsterdamwerkzaamheden.push(f);
    }
}
Legenda.prototype.handleTrafficJSON = function(data)
{
    var collection = new GeoJSON(data,{strokeColor: "#000000", strokeWeight: 3, strokeOpacity: 1.0 });
    var f;
    for (var i=0; i < collection.length; i++)
    {
        f = collection[i];
        f.strokeColor = f.geojsonProperties.COLOR;
        f.setMap(map);
        this.amsterdamtraffic.push(f);
    }
}
Legenda.prototype.checkboxClicked = function()
{
    // callback, override
    console.log("click");
}
Legenda.prototype.getCheckboxes = function()
{
    return this.checkboxes;
}
Legenda.prototype.isChecked = function(id)
{
    return this.checkboxes[id].is(':checked');
}
Legenda.prototype.setViewport = function(w,h)
{
    this.open_pos = h - this.holder.height() ;
    this.closed_pos = h - this.header.height();

    this.viewportHeight = h;
    this.viewportWidth = w;
}
Legenda.prototype.toggle = function()
{
    var pos = 0;
    if ( this.holder.position().top == this.open_pos )
    {
        pos = this.closed_pos;
    }
    else
    {
        pos = this.open_pos;
    }
    this.holder.animate({top:pos},this.duration,$.proxy(this.handleToggleComplete, this));
    this.isToggled = true;
}
Legenda.prototype.geoSearch = function()
{
    var address = $("#fld-search").val() ;

    if (address != this.inputfieldHint && address != '' )
    {
        address += ", Amsterdam";

        if (this.geocoder == undefined)
        {
            this.geocoder = new google.maps.Geocoder();
        }
        this.geocoder.geocode( { 'address': address, region:'NL' }, $.proxy(this.geoSearchResult, this));
    }
}
Legenda.prototype.geoSearchResult = function(results, status)
{
    // callback, override
}
Legenda.prototype.handleKeyPress = function(e)
{
    if(e.which == 13)
    {
        this.geoSearch();
        return false;
    }
}
Legenda.prototype.handleFieldFocus = function(e)
{
    if ( $("#fld-search").val() == this.inputfieldHint )
    {
        $("#fld-search").val('');
    }
}
Legenda.prototype.handleFieldBlur = function(e)
{
    if ( $("#fld-search").val() == "" )
    {
        $("#fld-search").val(this.inputfieldHint);
    }
}
Legenda.prototype.handleCloseButton = function()
{
    this.toggle();
}
Legenda.prototype.handleToggleComplete = function()
{
    if(this.close_button.hasClass('expanded'))
    {
        this.close_button.addClass('collapsed').removeClass('expanded');
        this.isOpen = false;
    }
    else
    {
        this.close_button.addClass('expanded').removeClass('collapsed');
        this.isOpen = true;
    }
}
Legenda.prototype.close = function()
{
    this.holder.css("top",this.closed_pos ) ;
    this.close_button.addClass('collapsed').removeClass('expanded');
    this.isOpen = false;
}
Legenda.prototype.open = function()
{
    this.holder.css("top",this.open_pos ) ;
    this.close_button.addClass('expanded').removeClass('collapsed');
    this.isOpen = true;
}
Legenda.prototype.getHeight = function()
{
    return this.holder.height();
}
Legenda.prototype.adjustToViewport = function()
{
    if (!this.isToggled)
    {
        // only when not toggled by user
        if (this.viewportWidth < MOBILE_VIEWPORT_WIDTH)
        {
            this.close();
        }
        else
        {
            if (this.startclosed)
            {
                this.close();
            }
            else
            {
                this.open();
            }
        }
    }
    else
    {
        if (this.isOpen)
        {
            this.open();
        }
        else
        {
            this.close();
        }
    }
}
