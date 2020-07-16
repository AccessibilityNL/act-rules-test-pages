ParkingTarief = function (data, id) {
    //console.log(data);
    this.id = id;
    this.description = data.description["0"];
    // geojson object
    this.location = data.location;
    this.tarieven = data.tarieven;
    //console.log(this.tarieven)
    //this.tarieven.sort( function (a, b){return (a > b) - (a < b);} );
    this.slots = new Array();

}

ParkingTarief.prototype.createPolygon = function(key)
{
    var style = DEFAULT_LAYER_STYLE;

    style.fillColor = LAYERS_TARIEVEN[key].fillColor;
    style.zIndex = LAYERS_TARIEVEN[key].zIndex;

    this.feature =  new GeoJSON(this.location, style);

    if (this.feature.length)
    {
        for (var i=0; i < this.feature.length; i++)
        {
            this.feature[i].parent = this;
            google.maps.event.addListener(this.feature[i], "click", handleTariefClick);
        }
    }
    else
    {
        // feature
        this.feature.parent = this;
        google.maps.event.addListener(this.feature, "click", handleTariefClick);
    }
}
ParkingTarief.prototype.getTitle = function()
{
    return "Tijden betaald parkeren";
}


ParkingTarief.prototype.getTarievenTabel = function()
{
    var data = {};
    // create empty internal table
    for (var d=0; d < WeekHelper.days_in_the_week.length; d++)
    {
        var day = WeekHelper.days_in_the_week[d];
        data[ day ] = {};

        for (var h=0; h < 24; h++ )
        {
            data[ day ][ h ] = {tarief:0,duur:0}  ;
        }
    }

    var selectedhours = {};

    // fill table with data for corresponding day + hour
    for (var duur in this.tarieven)
    {
        for (var tarief in this.tarieven[duur])
        {
            // bouw tabel op
            for (var timestr in this.tarieven[duur][tarief])
            {

                var times = timestr.split("-");
                var time_from = times[0] / 100;
                var time_to = times[1] / 100;

                var days = WeekHelper.createDayList(this.tarieven[duur][tarief][timestr]);

                for (var d = 0; d < WeekHelper.days_in_the_week.length; d++)
                {
                    var day = WeekHelper.days_in_the_week[d];

                    // is the current day in the list of days with tarieven?
                    if (days.indexOf(day) >= 0)
                    {
                        for (var h = 0; h < 24; h++)
                        {
                            // is the current hour between start and end hour?
                            if (h >= time_from && h < time_to)
                            {
                                data[ day ][ h ] = {tarief: tarief, duur: duur};

                                // save hour, so we know which hours to make dark in the header
                                selectedhours[h] = h;
                            }
                        }
                    }
                }
            }
        }
    }

    //console.log(data);
    // draw first table with hours
    var content = '<div class="tarievenheader"><table class="tarieventabel"><tr class="tarievenuren">';

    var t;
    for (var i=0; i < 25; i++)
    {
        t = i + 7;
        if (t > 23)
        {
           t = t - 24;
        }

        var ts = t;
        if (t < 10)
        {
            ts = "0" + t;
        }

        if (selectedhours[t] == t)
        {
            content += '<td class="darkhour"><div class="urencell">' + ts + '</div></td>';
        }
        else
        {
            content += '<td><div class="urencell">' + ts + '</div></td>';
        }
    }
    content += '</tr></table></div>';

    // second table with tarieven
    content += '<table class="tarieventabel">';

    // days trs
    for (var d = 0; d < WeekHelper.days_in_the_week.length; d++)
    {
        var day = WeekHelper.days_in_the_week[d];

        // vertical column with days
        content += '<tr><td class="daycell">' + day + '</td>';

        for (var i=0; i < 24; i++)
        {
            t = i + 7;
            if (t > 23)
            {
                t = t - 24;
            }

            //console.log( data[day][t]);
            if (data[ day ][ t ].tarief != 0)
            {
                //console.log(data[ day ][ t ].tarief + ":" + LAYERS_TARIEVEN[tarief].id )
                if (data[ day ][ t ].duur > 0)
                {
                    content += '<td class="tarief"><div class="tarievencell  ' + LAYERS_TARIEVEN[ data[ day ][ t ].tarief ].id + '"><div class="tarief-shade"></div></div></td>';
                }
                else
                {
                    content += '<td class="tarief"><div class="tarievencell  ' + LAYERS_TARIEVEN[ data[ day ][ t ].tarief ].id + '"></div></td>';
                }
            }
            else
            {
                content += '<td class="tarief"><div class="tarievencell"></div></td>';
            }

        }
        content += '</tr>';
    }
    content += "</table>";


    content += "<div class='tarief-icons'>";
    // add icons
    var icons = this.getIcons();

    for (var c=0; c < icons.length; c++)
    {
        content += '<div class="tarief-icon-desc"><div class="icon" id="' +  icons[c].icon  + '">';

        if (icons[c].duur > 0)
        {
            content += '<div class="icon-shade"></div>';
        }
        content +='</div><div class="tarief-desc">' + icons[c].desc + '</div></div>';

       // console.log(icons[c].desc);
    }
    content += "</div>";




    return content;
}


ParkingTarief.prototype.getIcons = function()
{
    var icon;
    var desc;
    var icons = [];


   console.log(this.id)

    for (var duur in this.tarieven)
    {
        //console.log(duur)
        for (var tarief in this.tarieven[duur])
        {
            //console.log(tarief)
            if (duur > 0)
            {
                icon = LAYERS_TARIEVEN[tarief].icon;
                desc = "per uur <br/>maximaal " + (duur/60) + " uur"
            }
            else
            {
                if (tarief == TARIEF_B)
                {
                    icon = LAYERS_TARIEVEN[TARIEF_B].icon;
                    desc = "Eerste 3 uur € 0,10 per uur. <br/>Alle uren daarna € 2,40 per uur ";
                }
                // BVB 13-06-2016, hack 1,30 uitzondering buikslotermeerplein
                //else if (tarief == TARIEF_A && this.description != "BP17B Basistarief TC7B") {
                // BVB 11-04-2017, hack: uitzondering op basis van ID voor flatrate midden-buikslotermeerplein
                else if (tarief == TARIEF_A && this.id == "T17F") {
                    icon = LAYERS_TARIEVEN[TARIEF_A].icon;
                    desc = "Eerste 3 uur € 1,30. <br/>Alle uren daarna € 1,30 per uur ";
                }
                else
                {
                    icon = LAYERS_TARIEVEN[tarief].icon;
                    desc = "per uur";
                }
            }
            if (icon)
            {
                icons.push({icon:icon, desc:desc, duur:duur});
            }
        }
    }
    return icons;
}

// BVB 22-11-2016 not used in desktop version, but still used in mobile version
ParkingTarief.prototype.getTarieven = function()
{
    var tarieven = [];
    for (var duur in this.tarieven)
    {
        for (var tarief in this.tarieven[duur])
        {
            if (duur > 0 && tarief == TARIEF_B)
            {
                tarieven.push(MAX_DUUR);
            }
            else
            {
                tarieven.push(tarief.split(",").join(""));
            }
        }
    }

    return tarieven;
}

// BVB 22-11-2016 not used in desktop version, but still used in mobile version
ParkingTarief.prototype.makeReadableTime = function( t )
{
    var str;
    t = String(t);

    if (t == 0)
    {
        t = "000";
    }
    if (t.length == 3)
    {
        str = t.substring(0,1) + ":" + t.substring(1,4);
    }
    else
    {
        str = t.substring(0,2) + ":" + t.substring(2,5);
    }
    return str;
}

// BVB 22-11-2016 not used in desktop version, but still used in mobile version
ParkingTarief.prototype.getText = function()
{
    var content = '<table border="0" width="230">';
    var header;
    var slotlist;
    var times;
    var days;
    var time_from;
    var time_to;

    for (var duur in this.tarieven)
    {
        for (var tarief in this.tarieven[duur])
        {
            tarief_duur = " €" + tarief + " per uur";

            if (duur > 0)
            {
                tarief_duur += " - maximaal " + (duur/60) + " uur";
            }
            else
            {
//                if (tarief == TARIEF_B)
//                {
//                    tarief_duur = "Eerste 3 uur € 0,10 per uur.</br>Alle uren daarna € 2,40 per uur ";
//                }

				if (tarief == TARIEF_B)
                {
                    desc = "Eerste 3 uur € 0,10 per uur. <br/>Alle uren daarna € 2,40 per uur ";
                }
                // BVB 13-06-2016, hack 1,30 uitzondering buikslotermeerplein
                //else if (tarief == TARIEF_A && this.description != "BP17B Basistarief TC7B") {
                // BVB 11-04-2017, hack: uitzondering op basis van ID voor flatrate midden-buikslotermeerplein
                else if (tarief == TARIEF_A && this.id == "T17F") {
                    desc = "Eerste 3 uur € 1,30. <br/>Alle uren daarna € 1,30 per uur ";
                }
                else
                {
                    desc = "per uur";
                }
            }

            header = "<tr><th colspan='2' align='left'>" + tarief_duur + "</th></tr>";
            slotlist = '';
            for (var timestr in this.tarieven[duur][tarief])
            {
                times = timestr.split("-");
                time_from = this.makeReadableTime(times[0]);//.substring(0,2) + ":" + times[0].substring(3,4);
                time_to =  this.makeReadableTime(times[1]);//.substring(0,2) + ":" + times[1].substring(3,4);

                days = [];
                if (typeof(this.tarieven[duur][tarief][timestr]) == "string")
                {
                    days = this.tarieven[duur][tarief][timestr].split("-");
                }

                if (days.length > 0)
                {
                    days_from = days[0];

                    if (days.length > 1)
                    {
                        days_to = days[1];
                    }
                    else
                    {
                        days_to = '';
                    }

                    slotlist += "<tr><td width='60'>" + days_from;
                    if (days_to != '')
                    {
                        slotlist += "-" + days_to;
                    }
                    slotlist += "</td><td width='120'>" + time_from + " uur - " + time_to + " uur</td></tr>";
                }
            }
            if (slotlist != '')
            {
                content += header + slotlist;
            }

        }
    }
    content += "</table>";
    return content;
}
    