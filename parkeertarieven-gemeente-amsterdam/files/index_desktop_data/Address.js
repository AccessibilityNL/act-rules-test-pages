Address = function( data )
{
    this.line_1 = data.adres;
    
    this.line_2 = '';
    if (data.postcode != undefined )
    {
    	this.line_2 = data.postcode + " ";
    }
    this.line_2 += data.woonplaats;
}
