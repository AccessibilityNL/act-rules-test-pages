// JavaScript
var Klimaat = ['klimaat','klimatologie','klimaatscenarios','klimaatverandering_en_broeikaseffect','klimaatmaatwerk','faq_klimaat','climatology'];
var Over_het_knmi = ['over_het_knmi','about_knmi'];
var Weer = ['weer','actueel','waarschuwingen_en_verwachtingen','neerslagradar','webcam','exp'];
var Faq = ['faq'];
var Seismologie = ['seismologie','seismology'];
var Research_weer = ['weather_research','weather_innovation'];
var Research_seismologie = ['seismology'];
var Research_klimaat = ['climate_research.html','climate_observations','climate_chemistry','climate_services','global_climate','regional_climate','biennal','colloquia'];
var Contact = ['contact'];
var Datacentrum = ['datacentrum','datacentre'];
var show_crumbpath;

function makeLogicalPath() {
//
// Bepaal een kruimelpad aan de hand van de directory van de 
// actuele pagina.
// 20040123, Bert van Dijk
//
padString = "";
hyperLink = "";
siteName = "";
oddSite = 0;
heelUrl = String(document.location);

// Strip eventuele parameters eraf

j = heelUrl.indexOf("?");
if ( j != -1) {
   heelUrl = heelUrl.substr(0,j);
}

// heelUrl = heelUrl.replace(/_/g," ");
urlDelen = heelUrl.split("/");
whichSite = urlDelen[2].split(".");

if (whichSite[0] != "www" && whichSite[0] != "www2" && whichSite[0] != "info" && whichSite[0] != "bvlwbo" && whichSite[0] != "www2-test") {
   oddSite = 1;
   siteName = urlDelen[2];
   urlDelen[2] = "www.knmi.nl";
}

// Bepaal de hyperlink van de document root
/*
hyperLink = urlDelen[0];

j = 1;
while (urlDelen[j] == "" || urlDelen[j].indexOf("knmi.nl") != -1) {
       hyperLink = hyperLink + "/" + urlDelen[j];
       j = j + 1;
}
*/
hyperLink = urlDelen[0]+'//'+urlDelen[2];
j=3;

// Bepaal het bijbehorende item in het kruimelpad en bouw de html
padString = "<div id=\"kruimelpad\"></div><a class='kalelink' href='" + hyperLink + "'>";

if (urlDelen[0] == "http:") {
    padString = padString + "Home</a>";
} else
    if (urlDelen[0] == "ftp:") {
        padString = padString + "FTP</a>";
    } else
        if (urlDelen[0] == "file:") {
            padString = "Lokaal"; 
        } else padString = padString + "?</a>";

// Als het niet een van onze websites is, maar een ander systeem, 
// dan zetten we ook een link daar naartoe in het pad

if (oddSite == 1) {
   padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
               "border=0 hspace=0 vspace=0 valign=middle> " +
               "<a class='kalelink' href='http://" + siteName + "/'>" + whichSite[0] +"</a>";
}


// Kijk of de laatste een filenaam of een lege string is; die moet niet in het pad.
// Sommige mensen zijn te lui om ".html" in te tikken; daarom wordt ook gecheckt
// of er misschien *geen* "/" aan het eind van de URL staat.

k = urlDelen.length;
if (j <= k) {
    if (urlDelen[k-1].indexOf(".") != -1 || urlDelen[k-1] == "" || 
        heelUrl.substr(heelUrl.length-1,1) != "/" ) {
        k = k-1;
    }
}
// Kijk of de laatste "urlDelen" een .html  of anker is of 
// heelUrl eindigt op een "/" : 
// dan moet het logische pad 1 element korter worden.

if (k<urlDelen.length)
  if ( heelUrl.substr(heelUrl.length-1,1) == "/" || urlDelen[k].substr(0,5) == "index" 
       || urlDelen[k].substr(0,1) == "#") k=k-1;

//alert(urlDelen[3]);
if (in_array(urlDelen[3],Klimaat)) { 
   //alert(urlDelen[4]);
   if (urlDelen[4] == "seismology") { 
      
      //padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
      //           "border=0 hspace = 0 vspace = 0 valign = middle> " +
      //           "<a class='kalelink' href='/seismologie/'>seismologie</a>";
   } else {
	  if (urlDelen[3] != "klimaat") { 
         padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/klimaat/'>klimaat</a>";
	  }
   }
//alert(j+"-"+k+"-"+urlDelen[3]);
}

//alert(urlDelen[3]);
if (in_array(urlDelen[3],Over_het_knmi)) { 
   if (urlDelen[4] == "seismology") { 
      // Uitzondering voor /research/seismology
      //padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
      //           "border=0 hspace = 0 vspace = 0 valign = middle> " +
      //           "<a class='kalelink' href='/seismologie/'>seismologie</a>";
   } else {
	  if (urlDelen[3] != "over_het_knmi") {
         padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/over_het_knmi/'>over het knmi</a>";
	  }
   }
//alert(j+"-"+k+"-"+urlDelen[3]);
}

//alert(urlDelen[3]);
if (in_array(urlDelen[3],Weer)) { 
   if (urlDelen[4] == "seismology") { 
      // Uitzondering voor /research/seismology
      //padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
      //           "border=0 hspace = 0 vspace = 0 valign = middle> " +
      //           "<a class='kalelink' href='/seismologie/'>seismologie</a>";
   } else {
	  if (urlDelen[3] != "weer") { 
         padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/weer/'>weer</a>";
	  }
   }
//alert(j+"-"+k+"-"+urlDelen[3]);
}

if (urlDelen[3] == "research") { 
   
   if (in_array(urlDelen[4],Research_weer)) { 
      padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/weer/'>weer</a>";
   } else {
	  if (in_array(urlDelen[4],Research_klimaat)) {
		 //alert(urlDelen[3]+" - "+urlDelen[4]+" - "+in_array(urlDelen[4],Research_weer));
		 padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/klimaat/'>klimaat</a>";
	  } else {
	     if (in_array(urlDelen[4],Research_seismologie)) {
		    //alert(urlDelen[3]+" - "+urlDelen[4]+" - "+in_array(urlDelen[4],Research_weer));
		    padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/seismologie/'>seismologie</a>";
	     }
	  }
	  /*
      padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='/klimaat/'>klimaat</a>";
	  */
   }
}

for (var i=j; i < k; i++) {

// Bepaal de hyperlink van het volgende item, en de bijbehorende html

     hyperLink = hyperLink + "/" + urlDelen[i];
     urlDelen[i] = urlDelen[i].replace(/_/g," ");
	 //alert("91: " + hyperLink +  " - " + urlDelen[i]);
     padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " +
                 "<a class='kalelink' href='" + hyperLink + "/'>" +
                 urlDelen[i] + "</a>";

}

// *** Sluit af met de naam van de huidige pagina, zonder suffix en zonder link
if ( heelUrl[heelUrl.length-1] == "/" ) {
  thispage = urlDelen[k].replace(/_/g," ");
}
else {
  thisindex = Math.min(urlDelen[k].indexOf("."),urlDelen[k].length);
  
  if (thisindex>0) {
    thispage = urlDelen[k].substring(0,thisindex);
    thispage = thispage.replace(/_/g," ");
  }
  else
    thispage = urlDelen[k].replace(/_/g," ");
}

//alert(thispage);

padString = padString + " <img src='/vinklude/images/pad_pijl.gif' " +
                 "border=0 hspace = 0 vspace = 0 valign = middle> " + thispage;
//alert(show_crumbpath+" - "+padString);
if (show_crumbpath == "No") padString = "<div id='kruimelpad'></div>";
//alert(padString);
return padString;
}

/*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			//arrReturnElements.push(oElement);
			var str = oElement.innerHTML;
			var look4 = 'href="http://';
			
			if (str.indexOf(look4) > -1) {
			   // Link naar http://
			   look4 = 'href="http://'+location.hostname;
			   if (str.indexOf(look4) == -1) {
				   // Geen link naar http://<location.hostname>
				   oElement.className = "menuextlink";
			       //oElement.style.backgroundColor = "#eeeeee";
			   }
			   //alert(str + " " + look4);
		    }
		}
	}
	return
	//return (arrReturnElements)
}

function in_array(needle, haystack) {
    for(var i in haystack) {
		//alert(i+"-"+haystack[i]+"-"+needle);
        if(haystack[i] == needle) return true;
    }
    return false;
}
