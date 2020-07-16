WeekHelper = function () {}    ;


// static function!
WeekHelper.days_in_the_week = ["ma","di","wo","do","vrij","za","zo"];

WeekHelper.createDayList = function(daystr)
{
    // str can be in the formats ma-vrij or ma-wo,vrij,za or ma,di,wo

    var arr = daystr.split(",");
    var daylist = [];

    //console.log(daystr);

    for (var i=0; i < arr.length; i++)
    {
        if (arr[i].indexOf("-") >= 0)
        {
            // a from - to string, add all these days to the list
            var range = arr[i].split("-");
            var from = WeekHelper.days_in_the_week.indexOf(range[0]);
            var to = WeekHelper.days_in_the_week.indexOf(range[1]);

            for (var d = from; d <= to; d++)
            {
                daylist.push( WeekHelper.days_in_the_week[d] );
            }

        }
        else
        {
            // a single day, add it to the list
            daylist.push(arr[i]);
        }
    }
    //console.log("++")
    //console.log(daylist);
    return daylist;

}