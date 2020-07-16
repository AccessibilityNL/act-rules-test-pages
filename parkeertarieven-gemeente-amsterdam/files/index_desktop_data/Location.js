Location = function(loc)
{
    var parsed = $.parseJSON( loc );

    if (parsed)
    {
        this.longitude = parsed.coordinates[0];
        this.latitude = parsed.coordinates[1];
    }
    else
    {
//		console.log("parsed is null");
    }
}