function pop_page(pagina, hoogte, breedte) {
//   var hoog = Math.min(hoogte, 500);
//   var breed = Math.min(breedte, 700);
   var breed = breedte;
   var hoog = hoogte;
   if (breed < 250) breed = 250;
   
   // 2013-10-17 A. Snijders
   // Speciaal voor gebruik bij bibliotheek-pagina's opent het nieuwe scherm met alle knoppen
   // en buttons, bij alle andere 'kaal'.
   var str = parent.location.href;
   var n = str.indexOf("bibliotheek/");
   if (n != -1) {
      var bigpic = window.open(pagina, 'page_window', 'toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1,copyhistory=1,width='+breed+',height='+hoog+'');
   } else {
      var bigpic = window.open(pagina, 'page_window', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,copyhistory=0,width='+breed+',height='+hoog+'');
   }
   bigpic.focus();
}

