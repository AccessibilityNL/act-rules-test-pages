
////////////
(function(){
////////////    
    // _st is not always, not correctly or not immediately available when previewing in the interface?
	var toJSON   =  ( _st ? _st.util.encodeJson : JSON.stringify );
	var fromJSON =  ( _st ? _st.util.decodeJson : JSON.parse     );
	
	var getSortedKeys = function( obj ){
	// returns a sorted array of keys from obj
		var keys = []; 
		for( var k in obj ) keys.push( parseInt( k, 10 ) );
		keys.sort();
		return keys;
	};
	
	var sameKeys = function( a, b ){
		return toJSON( getSortedKeys( a ) ) === toJSON( getSortedKeys( b ) );
	};
	
	var toPermissionObject = function( obj, pkey ){	
		var keys = getSortedKeys( obj );		
		var result = {};
		for( var i=0; i<keys.length; i++ ){
			result[ keys[i] ] = keys[i] <= pkey;
		}
		return result;		
		
	};
	
	var fromPermissionObject = function( obj ){
		var keys = getSortedKeys( obj );		
		var result;
		for( var i=0; i<keys.length; i++ ){
			if( obj[keys[i]] ) result = keys[i];
		}
		return "" + result;		
	};
	
	var parseItems = function( str ){
	// parse items by newlines, strip spaces, * and - from the lines
		var trimmer = /^[\s\uFEFF\xA0\*\-]+|[\s\uFEFF\xA0]+$/g;		
		var sx = str.split("\n");
		for( var i=0; i<sx.length; i++ ){
			sx[i] = sx[i].replace( trimmer, '' );
		}
		return sx;
	};

    var iframe_widget = function( title, id, template, cssText ){
        
		// Create iframe
		var iframe = document.createElement('iframe');
		var dimDiv = document.createElement('div');
		dimDiv.id = 'r42CookieBg';
		dimDiv.style.display = "block";
		
		if(navigator.userAgent.match(/iPhone/i)) { 
            iframe.className = "r42IphoneDetected";
		}
		iframe.className = id;
		iframe.style.cssText = cssText;
		
		//You can choose; option1: Cookiebar on the bottom.
		document.body.appendChild(iframe);
		
		if(!document.getElementById('r42CookieBg')) {
			document.body.appendChild(dimDiv);
		}
		
		//option2: Cookiebar on the top
		//document.body.insertBefore(iframe,document.body.childNodes[0]);

		var win = iframe.contentWindow;				
		var doc = win.document;	
		
		var includes = function(){
		  window.send = function( msg, arg ){
		    window.parent._stCookiePopup['send_' + msg]( arg );
		  };
		  window.redraw = function(){		
			window.parent._stCookiePopup.reconfigureView();
			document.body.innerHTML = window.parent._stCookiePopup.Mustache.render( window.template, window.parent._stCookiePopup.view );
		  };
		};	
		

		// Format the code to write to the iframe
		var nl = "\n";
		var wrappedCode = '<!DOCTYPE html>' + nl + '<head><title> Relay42 Cookie ' + title +  '</title>'
		                + '<style>' + nl + (window._stCookiePopup.config.css||"") + nl + '</style>'
		                + '<scri' + 'pt> window.template = ' + toJSON( template ) + '; (' + includes + ')();</sc' + 'ript>'
		                + '</head><body class="' + title + '">' 
		                + window._stCookiePopup.Mustache.render( template, window._stCookiePopup.view ) + '</body>';

		// Init function to be called from iframe
		doc.open();
		doc.write( wrappedCode );
		doc.close();
		
		return iframe;
	};

    var isEmptyObject = function( obj ){  
    // returns true if obj is like {}
        if( typeof obj !== "object" ) return true; 
        for ( var prop in obj ){ 
            if( obj.hasOwnProperty( prop ) ) return false; 
        } return true; 
    };

    var create_widget = function( tag, css ){
    // creates and appends a new dom node
        var widget = document.createElement( tag );
        widget.style.cssText = css;
        document.body.appendChild( widget );
        return widget;
    };
	


/* ST-COOKIE-POPUP */

    window._stCookiePopup = {};
    window._stCookiePopup.view = {};
	
	window._stCookiePopup.configure = function( cfg ){ 
        
		// clean up the config
        this.config =  fromJSON( toJSON( cfg ) );
		this.config.eventualPermissionObject = toPermissionObject( this.config.groups, this.config.eventualPermission );
		this.config.defaultPermissionObject  = toPermissionObject( this.config.groups, this.config.defaultPermission  );
		this.config.maxViews = parseInt( this.config.maxViews+"", 0 );					
		for( var k in this.config.items ) this.config.items[k] = parseItems( this.config.items[k] );
		
		// request current permission object		
        this.level = _st.cookiepermission.getCookiePreferences();
        
		// is permission set? is it set to the same set of group-numbers as exist today?
        if( sameKeys( this.level, this.config.groups ) ){
          this.permission = true;    			
        } else {
          this.permission = false;
          this.level = this.config.defaultPermissionObject;  
        }
        
		// request current popup view count
		this.views = _st.cookiepermission.getPopupViewCount();
		
		// do we have a maximum and is the number of views higher or equal to this maximum?
        if( !this.permission && (this.config.maxViews !== -1) && (this.views >= this.config.maxViews)  ){
            this.level = this.config.eventualPermissionObject;
            this.permission = true;
            _st.cookiepermission.setCookiePreferences( this.level );
			eval( this.config.onAutoAccept || "" );			
			_st.core.executeTags();
        }
		
		this.reconfigureView();
		
    };
	
	
	window._stCookiePopup.reconfigureView = function(){		
		
		// split permission items in two arrays
		this.view.items_yes = []; 
		this.view.items_no  = [];
		for( var k in this.config.items ){
			if( this.level[k] ) this.view.items_yes = this.view.items_yes.concat( this.config.items[k] );
			else                this.view.items_no  = this.view.items_no.concat( this.config.items[k] );  
		}
		
		// set level as a usable value
		this.view.level_no = fromPermissionObject( this.level );
		this.view.level_id = this.config.groups[ this.view.level_no ].groupId;
		this.view.level_name = this.config.groups[ this.view.level_no ].name;
		
		// provide groups as an array
		this.view.groups = [];
		for( var k in this.config.groups ){			
			this.view.groups.push( { number: k, name: this.config.groups[k].name, active: this.level[k], selected: this.view.level_no === k } );
		}
	};
    
    window._stCookiePopup.showIfNotSet = function(){
        if( !this.permission ) this.showPopup();
    };
    
/* EVENTS */    
	
	window._stCookiePopup.send_level = function( level ){
		if( level ) this.level = toPermissionObject( this.config.groups, level );		
	};
    
    window._stCookiePopup.send_popup_accept = function(){
        _st.cookiepermission.setCookiePreferences( this.level );
        this.permission = true;
        eval( this.config.onPopupAccept || "" );
        this.hideSettings();
        this.hidePopup();
        this.hideBlocker();
		_st.core.executeTags();
		};
	
	 window._stCookiePopup.send_popup_deny = function(){
        _st.cookiepermission.setCookiePreferences({1: true, 2: false, 3: false});
        this.permission = true;
        eval( this.config.onPopupClose || "" );
        this.hideSettings();
        this.hidePopup();
        this.hideBlocker();
		_st.util.setCookie('cookieConsentStatus','1', 365, 'nsinternational.nl');
		_st.util.setCookie('cookieConsentStatus',1, 365, 'trainbooking.com');
		 window.location.reload();
		};
    
    window._stCookiePopup.send_popup_close = function(){
        eval( this.config.onPopupClose || "" );
        this.hideSettings();
        this.hidePopup();
        this.hideBlocker();
    };
    
    window._stCookiePopup.send_popup_settings = function(){
       eval( this.config.onPopupSettings || "" );
       this.showSettings();   
    };
    
    window._stCookiePopup.send_settings_accept = function(){
        _st.cookiepermission.setCookiePreferences( this.level );
        this.permission = true;
        eval( this.config.onSettingsAccept || "" );
        this.hideSettings();
        this.hidePopup();
        this.hideBlocker();
		_st.core.executeTags();
    };
    
    window._stCookiePopup.send_settings_close = function(){
        eval( this.config.onCloseSettings || "" );
		this.hideBlocker();
        this.hideSettings();
    };
    
/* BLOCKER */

    var blocker;
    
    window._stCookiePopup.hideBlocker = function(){
        if( blocker ) document.body.removeChild( blocker );
        blocker = undefined;
    };
    window._stCookiePopup.showBlocker = function(){
        this.hideBlocker();
        blocker = create_widget("div",this.config.cssBlocker);
    };
    
/* POPUP */

    var popup;

    window._stCookiePopup.hidePopup = function(){
		if( popup ) { 
			document.body.removeChild( popup );
			if(document.getElementById("r42CookieBg")) {
				var bg = document.getElementById("r42CookieBg");
				bg.parentNode.removeChild(bg);
			}
		}

        popup = undefined;
    };
    window._stCookiePopup.showPopup = function(){
        eval( this.config.onShowPopup || '' );
        this.views = this.views + 1;  
        _st.cookiepermission.setPopupViewCount( this.views );
        this.hidePopup();
		
        popup = iframe_widget( 'popup', 'r42CookieBar', this.config.htmlPopup, this.config.cssPopup);  
		
		var r42PopupOriginalHeight = parseInt(popup.style.height, 10);
		var r42PopupAtBottom = parseInt(popup.style.bottom, 10) == 0;
		
		var resizeFunction = function() {
			if( popup ) {
				popup.style.height = Math.max(popup.contentDocument.body.offsetHeight, r42PopupOriginalHeight) + "px";

				try {
					var diff = (popup.offsetTop + popup.offsetHeight) - document.documentElement.clientHeight;
					if(diff > 0 && r42PopupAtBottom) {
						popup.style.bottom = diff + "px";
					}
				} catch(e) {
					// ignore
				}
			}
		};
			
		if(window.attachEvent) {
    		window.attachEvent('onresize', resizeFunction);
		} else if(window.addEventListener) {
    		window.addEventListener('resize', resizeFunction);
		}
		
		resizeFunction();
    };
    
/* SETTINGS */

    var settings;
    
    window._stCookiePopup.hideSettings = function(){
		if( settings ) { 
			document.body.removeChild( settings );
			//var bg = document.getElementById("r42CookieBg");
			//bg.parentNode.removeChild(bg);
		}
        settings = undefined;
    };
    window._stCookiePopup.showSettings = function(){
        eval( this.config.onShowSettings || '' ); 
        this.hideSettings();
        this.showBlocker();
        settings = iframe_widget( 'settings', 'r42CookieSettings', this.config.htmlSettings, this.config.cssSettings);
    };
    

/* jshint ignore:start */
// MUSTACHE
!function(e,t){t(e.Mustache={})}(window._stCookiePopup,function(e){function t(e){return"function"==typeof e}function n(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(e,t){return d.call(e,t)}function o(e){return!r(v,e)}function i(e){return String(e).replace(/[&<>"'\/]/g,function(e){return g[e]})}function s(t,r){function i(){if(_&&!m)for(;g.length;)delete v[g.pop()];else g=[];_=!1,m=!1}function s(e){if("string"==typeof e&&(e=e.split(y,2)),!f(e)||2!==e.length)throw new Error("Invalid tags: "+e);p=new RegExp(n(e[0])+"\\s*"),l=new RegExp("\\s*"+n(e[1])),h=new RegExp("\\s*"+n("}"+e[1]))}if(!t)return[];var p,l,h,d=[],v=[],g=[],_=!1,m=!1;s(r||e.tags);for(var U,E,j,T,C,S,V=new c(t);!V.eos();){if(U=V.pos,j=V.scanUntil(p))for(var P=0,A=j.length;A>P;++P)T=j.charAt(P),o(T)?g.push(v.length):m=!0,v.push(["text",T,U,U+1]),U+=1,"\n"===T&&i();if(!V.scan(p))break;if(_=!0,E=V.scan(x)||"name",V.scan(w),"="===E?(j=V.scanUntil(k),V.scan(k),V.scanUntil(l)):"{"===E?(j=V.scanUntil(h),V.scan(b),V.scanUntil(l),E="&"):j=V.scanUntil(l),!V.scan(l))throw new Error("Unclosed tag at "+V.pos);if(C=[E,j,U,V.pos],v.push(C),"#"===E||"^"===E)d.push(C);else if("/"===E){if(S=d.pop(),!S)throw new Error('Unopened section "'+j+'" at '+U);if(S[1]!==j)throw new Error('Unclosed section "'+S[1]+'" at '+U)}else"name"===E||"{"===E||"&"===E?m=!0:"="===E&&s(j)}if(S=d.pop())throw new Error('Unclosed section "'+S[1]+'" at '+V.pos);return u(a(v))}function a(e){for(var t,n,r=[],o=0,i=e.length;i>o;++o)t=e[o],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}function u(e){for(var t,n,r=[],o=r,i=[],s=0,a=e.length;a>s;++s)switch(t=e[s],t[0]){case"#":case"^":o.push(t),i.push(t),o=t[4]=[];break;case"/":n=i.pop(),n[5]=t[2],o=i.length>0?i[i.length-1][4]:r;break;default:o.push(t)}return r}function c(e){this.string=e,this.tail=e,this.pos=0}function p(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function l(){this.cache={}}var h=Object.prototype.toString,f=Array.isArray||function(e){return"[object Array]"===h.call(e)},d=RegExp.prototype.test,v=/\S/,g={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},w=/\s*/,y=/\s+/,k=/\s*=/,b=/\s*\}/,x=/#|\^|\/|>|\{|&|=|!/;c.prototype.eos=function(){return""===this.tail},c.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},c.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},p.prototype.push=function(e){return new p(e,this)},p.prototype.lookup=function(e){var n,r=this.cache;if(e in r)n=r[e];else{for(var o,i,s=this,a=!1;s;){if(e.indexOf(".")>0)for(n=s.view,o=e.split("."),i=0;null!=n&&i<o.length;)i===o.length-1&&null!=n&&(a="object"==typeof n&&n.hasOwnProperty(o[i])),n=n[o[i++]];else null!=s.view&&"object"==typeof s.view&&(n=s.view[e],a=s.view.hasOwnProperty(e));if(a)break;s=s.parent}r[e]=n}return t(n)&&(n=n.call(this.view)),n},l.prototype.clearCache=function(){this.cache={}},l.prototype.parse=function(e,t){var n=this.cache,r=n[e];return null==r&&(r=n[e]=s(e,t)),r},l.prototype.render=function(e,t,n){var r=this.parse(e),o=t instanceof p?t:new p(t);return this.renderTokens(r,o,n,e)},l.prototype.renderTokens=function(e,t,n,r){for(var o,i,s,a="",u=0,c=e.length;c>u;++u)s=void 0,o=e[u],i=o[0],"#"===i?s=this._renderSection(o,t,n,r):"^"===i?s=this._renderInverted(o,t,n,r):">"===i?s=this._renderPartial(o,t,n,r):"&"===i?s=this._unescapedValue(o,t):"name"===i?s=this._escapedValue(o,t):"text"===i&&(s=this._rawValue(o)),void 0!==s&&(a+=s);return a},l.prototype._renderSection=function(e,n,r,o){function i(e){return s.render(e,n,r)}var s=this,a="",u=n.lookup(e[1]);if(u){if(f(u))for(var c=0,p=u.length;p>c;++c)a+=this.renderTokens(e[4],n.push(u[c]),r,o);else if("object"==typeof u||"string"==typeof u||"number"==typeof u)a+=this.renderTokens(e[4],n.push(u),r,o);else if(t(u)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");u=u.call(n.view,o.slice(e[3],e[5]),i),null!=u&&(a+=u)}else a+=this.renderTokens(e[4],n,r,o);return a}},l.prototype._renderInverted=function(e,t,n,r){var o=t.lookup(e[1]);return!o||f(o)&&0===o.length?this.renderTokens(e[4],t,n,r):void 0},l.prototype._renderPartial=function(e,n,r){if(r){var o=t(r)?r(e[1]):r[e[1]];return null!=o?this.renderTokens(this.parse(o),n,r,o):void 0}},l.prototype._unescapedValue=function(e,t){var n=t.lookup(e[1]);return null!=n?n:void 0},l.prototype._escapedValue=function(t,n){var r=n.lookup(t[1]);return null!=r?e.escape(r):void 0},l.prototype._rawValue=function(e){return e[1]},e.name="mustache.js",e.version="2.0.0",e.tags=["{{","}}"];var _=new l;e.clearCache=function(){return _.clearCache()},e.parse=function(e,t){return _.parse(e,t)},e.render=function(e,t,n){return _.render(e,t,n)},e.to_html=function(n,r,o,i){var s=e.render(n,r,o);return t(i)?void i(s):s},e.escape=i,e.Scanner=c,e.Context=p,e.Writer=l});
/* jshint ignore:end */
////
})();
/////
_stCookiePopup.configure({"maxViews":"-1","defaultPermission":3,"eventualPermission":3,"groups":{"1":{"name":"Noodzakelijk en statistiek","groupId":"102d9d6b-64c8-413c-a874-0df8c4b39207"},"2":{"name":"Functioneel","groupId":"be22cb54-d9f9-4675-877b-9c1947036dd4"},"3":{"name":"Marketing","groupId":"9ca895ff-2294-4248-ad17-979ec2a2d54d"}},"items":{"1":"","2":"","3":"","never":""},"onShowPopup":"//_st.counter.call('6');\nga('send', 'event', 'Cookiebar', 'Shown',{'nonInteraction': 'true'});\n","onPopupAccept":"//_st.counter.call('4');\n\nga('send', 'event', 'Cookiebar', 'Accepted', '1|2|3', {\n\t'dimension21': '1|2|3'\n});\n\n// R42 Engagement\n\n\nvar cDomain = document.location.hostname.split('www.')[1] || '.nsinternational.nl';\n\n_st.tracking.sendEngagement('CookieAccept', {'accepted': 'yes', 'level': '1|2|3'});\n_st.tracking.sendEngagement('cookieConsentStatus', {'accepted': 'yes', 'level': '1|2|3'});\n_st.util.setCookie('cookieConsentStatus','1|2|3', 365);\n_st.util.setCookie('cookiePref', '1|2|3', 365);\n_st.event.publish('cookieConsent', 'consentGiven');\nwindow.location.reload();","onPopupSettings":"","onPopupClose":"//_st.counter.call('4');\n\nga('send', 'event', 'Cookiebar', 'Declined', '1', {\n\t'dimension21': '1',\n\t'nonInteraction': true\n});\n\n\n// R42 Engagement\n_st.tracking.sendEngagement('CookieAccept', {'accepted': 'no', 'level': '1'});\n_st.tracking.sendEngagement('cookieConsentStatus', {'accepted': 'no', 'level': '1'});\n_st.util.setCookie('cookieConsentStatus','1', 365);\n_st.util.setCookie('cookiePref', '1', 365); ","onShowSettings":"","onSettingsAccept":"_st.counter.call('14');\n\nvar level = this.level;\nvar levelFormatted = [];\nfor (var x in level) {\n\tif (level[x] === true) {\n    \tlevelFormatted.push(x);\n\t}\n}\n\nvar levelFormattedSwitch;\nswitch(levelFormatted.join('|')) {\n    case '1':\n        _st.counter.call('15');\n        break;\n    case '1|2':\n        _st.counter.call('16');\n        break;\n    case '1|2|3':\n        _st.counter.call('17');\n        break;\n}\n\nga('send', 'event', 'Cookiebar', 'Accepted', levelFormatted.join('|'), {\n\t'dimension21': levelFormatted.join('|')\n});\n\n_st.util.setCookie('cookieConsentStatus','1', 365, 'nsinternational.nl');\n_st.util.setCookie('cookieConsentStatus',1, 365, 'trainbooking.com');\n\n\n// R42 Engagement\n_st.tracking.sendEngagement('CookieAccept', {'accepted': 'yes', 'level': levelFormatted.join('|')});","onSettingsClose":"","onAutoAccept":"","htmlPopup":"<p class =\"cookieText\">\nThe NS Group N.V. websites use cookies and other similar technologies. NS uses functional and analytical cookies to offer an optimal user experience on its websites. In addition, NS and third parties use tracking cookies, which can collect information about you and follow your internet activity within our website, and possibly outside our website as well. This information can be used to customise advertisements to your interests or profile. Click on ‘Agree’ or ‘Do not agree’ to accept or refuse tracking cookies. You may revoke your approval at any time. For more information, please visit <a href=\"http://www.ns.nl/cookiebeleid\" target=\"_blank\">ns.nl/cookiebeleid</a>.\n</p>\n\n<a class='button accept'   href='javascript:send(\"popup_accept\")'>Agree</a> \n<a class='button cancel' href='javascript:send(\"popup_deny\")'>Not Agree</a>\n<div class=\"clearContent\"></div>\n","htmlSettings":"<a class='popup-close' href='javascript:send(\"settings_close\")'><span class=\"icon\"></span></a>\n<div class='scroll'>\n\t\n\t<h1>Cookie instellingen</h1>\n\n\t<h2>Kies uw gewenste instelling</h2>\n\t{{#groups}}\n\t<div class='keuze'>\n\t\t<input type=\"radio\" id=\"keuze{{number}}\" name='keuze' {{#selected}}checked{{/selected}} onchange='send(\"level\", {{number}}); redraw();'><label for=\"keuze{{number}}\">{{name}}</label>\n\t</div>\t\t\t\n\t{{/groups}}\n\n\n\t<div class='groups'>\n\t\t<h2>Voor <i>{{level_name}}</i> plaatsen wij de volgende cookies:</h2>\n\t\t<ul>\n\t\t\t{{#items_yes}}\t\n\t\t\t\t<li>{{.}}</li>\t\t\n\t\t\t{{/items_yes}}\n\t\t<ul>\n\t</div>\t\n</div>\n\n\n<div class='buttons'>\n\t<a class='button save' href='javascript:send(\"settings_accept\")'>Opslaan</a>\n\t<a class='button cancel' href='javascript:send(\"settings_close\")'>Annuleren</a>\n</div>","cssPopup":"position: fixed; top: 100px; right:0; left:0; margin-left: auto; margin-right: auto; width: 550px; height: 140px; border: 0px none; background-color: #fff; z-index: 7777777;  color: #060922;","cssSettings":"position: fixed; top: 100px; right:0; left:0; margin-left: auto;  margin-right: auto; width: 550px; height: 490px; border: 0px none; background-color: white; z-index: 999999999; box-shadow: 5px 5px 5px rgba(0,0,0,0.5); color: #060922;","cssBlocker":"position: fixed; top: 50%; left: 50%; margin-top: -175px; margin-left: -250px;  border: 0px none; background-color: white; z-index: 999999999;","css":"body { margin: 0; padding: 0; line-height: 21px; font-size: 0.8rem; color: #060922; font-family: \"NS Sans\",\"Segoe UI\",Myriad,Verdana,sans-serif;}\n\na.button { display: inline-block; text-align: center; text-decoration: none; color: #060922; padding: 10px 15px; font-weight: normal; box-shadow: 0 -0.125rem 0 #e6e6e8 inset; }\n\nbody.popup { padding: 20px 20px 15px 20px; height: auto; }\nbody.popup .clearContent { height: auto; clear: both; }\nbody.popup p { width: 100%; margin: 0; float: left; text-align: justify; margin-bottom: 20px; }\nbody.popup a { color: #060922; }\n\nbody.popup .button { font-size: 1.0rem; }\n\n@media only screen and (max-device-width: 480px) {\n\tbody.popup .button { font-size: 0.7rem; }\n\tbody.popup .button.accept { float: right; padding: 10px 10px; margin-right: 15px !important; }\n\ta.button.settings, a.button.cancel {height: 30px; line-height: 30px; float: right; margin-right:20px; padding: 10px 10px; background-color: #E6E6E8;box-shadow: 0 -.125rem 0 #B4B4BC inset; color: #070721;}\n\t\n\t/* Iphone resize fix */\n\thtml {\n        -webkit-text-size-adjust: none; \n    }\n\t\n}\n\nbody.popup .button.accept { float: right; margin-right: 20px; margin-bottom: 8px; background-color:#f52d70; min-width:24%;}\na.button.accept, a.button.save {float: left; height: 30px; line-height: 30px; background-color: #0079d3; box-shadow: 0 -.125rem 0 #005ca0 inset; color: white }\na.button.accept:hover, a.button.save:hover {   }\n\na.button.settings, a.button.cancel { height: 30px; line-height: 30px;  float: right; margin-right:20px; margin-top: 0px; background-color: #E6E6E8; box-shadow: 0 -.125rem 0 #B4B4BC inset; color: #070721;}\na.button.settings:hover, a.button.cancel:hover { text-decoration: none }\n\nbody.settings { padding: 2px; }\nbody.settings a.button.cancel { color: #333; background-color: #E6E6E8;}\nbody.settings p { padding: 0px 20px 10px 20px; font-size: 14px; margin: 0 }\nbody.settings ul { margin: 0px 20px 10px 20px; font-size: 1.0rem; padding: 0; list-style-type: none; }\n\nbody.settings a.popup-close { display: block; position: absolute; top: 15px; right: 15px; height: 35px; width: 35px; z-index: 10000; }\nbody.settings a.popup-close .icon {\n\tdisplay: block;\n\ttext-align: left;\n\twidth: 100%;\n\theight: 100%;\n    background-image: url(\"data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2235px%22%20height%3D%2235px%22%20viewBox%3D%220%200%2035%2035%22%20enable-background%3D%22new%200%200%2035%2035%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%20%3Cg%3E%20%20%3Cpath%20d%3D%22M24.5%2C25c-0.128%2C0-0.256-0.049-0.354-0.146l-14-14c-0.195-0.195-0.195-0.512%2C0-0.707s0.512-0.195%2C0.707%2C0l14%2C14%20%20%20c0.195%2C0.195%2C0.195%2C0.512%2C0%2C0.707C24.756%2C24.951%2C24.628%2C25%2C24.5%2C25z%22%2F%3E%20%3C%2Fg%3E%3C%2Fg%3E%3Cg%3E%20%3Cg%3E%20%20%3Cpath%20d%3D%22M10.5%2C25c-0.128%2C0-0.256-0.049-0.354-0.146c-0.195-0.195-0.195-0.512%2C0-0.707l14-14c0.195-0.195%2C0.512-0.195%2C0.707%2C0%20%20%20s0.195%2C0.512%2C0%2C0.707l-14%2C14C10.756%2C24.951%2C10.628%2C25%2C10.5%2C25z%22%2F%3E%20%3C%2Fg%3E%3C%2Fg%3E%3Cstyle%20type%3D%22text%2Fcss%22%3Ecircle%2C%20ellipse%2C%20line%2C%20path%2C%20polygon%2C%20polyline%2C%20rect%2C%20text%20%7B%20fill%3A%20%230079d3%3B%20%7D%3C%2Fstyle%3E%3C%2Fsvg%3E\");\n}\n\nh1 { font-size: 1.4rem; color: #003082; padding: 15px 20px 0px 20px;  margin: 10px 0 10px 0; margin-bottom: 15px; font-weight: normal; }\n.buttons { position: absolute; bottom: 0; left: 0; right: 0; text-align: left; padding: 1em 1em; background-color: #fff }\n.buttons a.button { margin-left: 20px; float: right; font-size: 1.0rem }\n\n.scroll { position: absolute; top: 0; bottom: auto; width: 98%; overflow: auto; height:auto;}\n.keuze { cursor: pointer; margin-left: 20px; margin-bottom: 10px }\n.keuze label { cursor: pointer; padding-left: 10px; }\n.keuze:hover label { text-decoration: underline;}\n.keuze label:hover { text-decoration: underline; }\n\nh2 { font-size: 1.1rem; color: #0079d3; padding: 15px 20px 0px 20px; font-weight: normal; }\n.groups { background-color: #f2f2f3; padding-bottom: 5px; margin: 0 9px 0 20px; }\n.groups h2 { color: #060922; font-size: 1.1rem; }\n\n.groups li { \n\tpadding-left: 0;\n\tmargin-left: 0;\n\tpadding-bottom: 10px;\n}\n\n.groups li:before {\n    content: \"■ \";\n    color: #0079d3;\n\tfont-size: 0.8rem;\n\tmargin-right: 15px;\n}\n\n@media only screen and (max-device-width: 480px) {\n\n\tbody.popup p {\n\t\ttext-align: left;\n\t\tfont-size: 0.7rem;\n\t\theight: auto;\n\t}\n\n\t\t\n}"});
