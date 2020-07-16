;(function($){
	// validatiefilters met beter toegankelijke meldingen dan
	// de html5-validaties van de browser
	//
	
	
	var validatie={}
	
	// validatieregels
	// vorm: { <form:selector>, veld:selector, regel:($(veld),waarde) }
	validatie.regels=[
		{	veld :'input[required]',
			regel:function(veld,waarde){
				if(validatie.is.leeg(veld)){
					return validatie.meld(veld,'Het veld !label is niet ingevuld. Dit veld is verplicht.') }}
			},
		{	veld :'input[type="email"]',
			regel:function(veld,waarde){
				if(!validatie.is.leeg(veld) && !validatie.is.email(veld)){
					return validatie.meld(veld,'Het veld !label bevat geen geldig e-mailadres. Controleer of u het adres juist heeft ingevuld.') }}
			}
	]
	
	// validatiefilters
	validatie.is={}
	validatie.is.leeg=function(veld){ return !veld.val() } //
	validatie.is.email=function(veld){ return veld.val().match(/[a-z0-9_.+-]@([a-z0-9]+-?)*[a-z0-9]+\.[a-z0-9]/i) }
	
	// toon een melding direct onder het veld
	validatie.meld=function(veld,melding){
		var ballon=veld.next('.validatie-melding')
		if(!melding){ ballon.remove(); return true }
		if(!ballon.length){ 
			ballon=$('<div class="validatie-melding">').insertAfter(veld) }
		
		var label=veld.prev('label').text().replace(/\s+\*$/,'').replace(/^\*\s+/,'')
			if(label){ label='<em>'+label+'</em>' }
		ballon.html(melding.replace(/!label/,label))
		return false
	} // /meld
	
	// koppel de filters aan de velden
	validatie.koppel=function(context){
		for(var i in validatie.regels){
			var ri=validatie.regels[i]
			if(!ri.regel || !ri.veld){ console.log(0); continue }
			
			// zoek veld en formulier op
			var f,v
			if(ri.form && ri.veld){
				f=context.find(ri.form); if(!f.length){ continue }
				v=f.find(ri.veld); if(!v.length){ continue } }
			else{
				v=context.find(ri.veld); if(!v.length){ continue }
				f=v.parents('form'); if(!f.length){ continue } }
			
			// koppel specifiek per formulier
			$.each(f,function(){
				var rri=ri // aan lokale variabele binden voor closure
				
				var ff=$(this)
				var vv=ff.find(rri.veld)
				
				// html5-validatie uitschakelen
				ff.attr('novalidate','novalidate') 
				
				// per veld uitvoeren bij submit
				ff.submit(function(){
					var gelukt=true
					vv.each(function(){
						var vn=$(this)
						var antwoord=rri.regel.call(vn,vn,vn.val())
						if(antwoord==false){ gelukt=false }
					})
					return gelukt
				})
			})
			
		}
	} // /valideer
	
	
	
	Drupal.behaviors.haeghegroep_validaties={ attach:function(c,s){
		validatie.koppel($(c))
	}}
	
})(jQuery);