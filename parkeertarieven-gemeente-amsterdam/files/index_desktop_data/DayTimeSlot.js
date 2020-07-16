DayTimeSlot = function( timestr, daystr, tarief )
{
	this.DAYS_MA_VR = ["ma","di","wo","do","vr"];
    this.DAYS_ZA = ["za"];
    this.DAYS_ZO = ["zo"];
    this.DAYS_DO = ["do"];

    var times = timestr.split("-");

    var days = WeekHelper.createDayList(daystr);
//    if (typeof(daystr) == "string")
//    {
//	    days = daystr.split("-");
//    }
//

//    console.log(daystr)
//	if (days.length == 1)
//	{
//		this.from_day = DAYS[days[0]];
//		this.to_day = DAYS[days[0]];
//	}
//	else
//	{
//		this.from_day = DAYS[days[0]];
//		this.to_day = DAYS[days[1]];
//	}
//    //console.log(this.from_day + ":" + this.to_day);

	this.dayfilters = new Object();
	this.dayfilters[DAY_ALLE] = true;
//	this.dayfilters[DAY_MA_VR] = (this.from_day == DAYS["ma"] && this.to_day >= DAYS["vrij"] || this.from_day == DAYS["ma"] && this.to_day == DAYS["zo"]);
//	this.dayfilters[DAY_ZA] = (this.from_day == DAYS["za"] || this.to_day == DAYS["za"] || (this.from_day < DAYS["za"]) && this.to_day > DAYS["za"] || this.from_day == DAYS["ma"] && this.to_day == DAYS["zo"]);
//	this.dayfilters[DAY_ZO] = (this.from_day == DAYS["zo"] || this.to_day == DAYS["zo"] || (this.from_day < DAYS["zo"]) && this.to_day > DAYS["zo"]);
//	this.dayfilters[DAY_DO] = (this.from_day == DAYS["do"] || this.to_day == DAYS["do"] || (this.from_day < DAYS["do"]) && this.to_day > DAYS["do"] || this.from_day == DAYS["ma"] && this.to_day == DAYS["zo"]);

    this.dayfilters[DAY_MA_VR]  = this.isInDayRange(days,this.DAYS_MA_VR);
    this.dayfilters[DAY_ZA]     = this.isInDayRange(days,this.DAYS_ZA);         //(this.from_day == DAYS["za"] || this.to_day == DAYS["za"] || (this.from_day < DAYS["za"]) && this.to_day > DAYS["za"] || this.from_day == DAYS["ma"] && this.to_day == DAYS["zo"]);
    this.dayfilters[DAY_ZO]     = this.isInDayRange(days,this.DAYS_ZO);         //(this.from_day == DAYS["zo"] || this.to_day == DAYS["zo"] || (this.from_day < DAYS["zo"]) && this.to_day > DAYS["zo"]);
    this.dayfilters[DAY_DO]     = this.isInDayRange(days,this.DAYS_DO);         //(this.from_day == DAYS["do"] || this.to_day == DAYS["do"] || (this.from_day < DAYS["do"]) && this.to_day > DAYS["do"] || this.from_day == DAYS["ma"] && this.to_day == DAYS["zo"]);

    //console.log(this.dayfilters)
	this.timefilters = new Object();
	this.timefilters[TIME_0] = true;
	this.timefilters[TIME_1] = this.isInTimeRange(times, 900, 1200);
	this.timefilters[TIME_2] = this.isInTimeRange(times, 1200, 1900);
	this.timefilters[TIME_3] = this.isInTimeRange(times, 1900, 2100);
	this.timefilters[TIME_4] = this.isInTimeRange(times, 2100, 2400);
    this.timefilters[TIME_5] = this.isInTimeRange(times, 000, 200);

	this.tarief = tarief;
	
	this.icon = LAYERS_TARIEVEN[tarief].icon ; //TARIEVEN_ICONS[this.tarief];


}

DayTimeSlot.prototype.isInDayRange = function(days, range)
{
    var found = false;
    for (var i = 0; i < days.length; i++)
    {
        found =  (range.indexOf(days[i]) >= 0);

        if (found) break;
    }
    return found;
}
DayTimeSlot.prototype.isInTimeRange = function(times, lower_limit, upper_limit)
{
	var bool = false;

    var from_time = Number(times[0]);
    var to_time = Number(times[1]);

	//console.log("check l:" + lower_limit + ", u:" + upper_limit + " to f:" + from_time + ", t:" + to_time)
	//if (from_time >= lower_limit && to_time <= upper_limit )
	if (lower_limit >= from_time && upper_limit <= to_time )
	{
		// tijden vallen in de range
		// bv tijden: from:9-to:12  range: lower:9 upper:24		
		bool = true;
		//console.log('in range');
	}
	//else if (from_time >= lower_limit && from_time < upper_limit  ) 
	else if (lower_limit < from_time && upper_limit <= to_time && upper_limit > from_time )
	{
		// parkeertijden overlappen aan begin
		// bv tijden: from:900-to:1900 to lower:900-upper:1200		
		bool = true;
		//console.log('overlap begin');
	}
	//else if (to_time > lower_limit && to_time < upper_limit )
	else if (lower_limit > from_time && upper_limit > to_time && lower_limit < to_time)
	{
		// parkeertijden overlappen aan het einde
		// bv tijden: check from:900-to:2100 to lower:1200-upper:1900

		bool = true;
		//console.log('overlap einde');
	}
	return bool;
}
