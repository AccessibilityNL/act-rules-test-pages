var ace=ace||{};ace.mkt=ace.mkt||{},ace.mkt.Cookie=function(){"use strict";function a(a,c){var d=b(a);return null!==d?d:c}function b(a){try{for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(b))return e.substring(b.length,e.length)}}catch(f){}return null}function c(a,b,c,d){try{var e="";if(c){var f=new Date;f.setTime(f.getTime()+24*c*60*60*1e3),e="; expires="+f.toGMTString()}var g=a+"="+b+e+"; path=/;",h=window.location.hostname;if("localhost"!==h&&!0===d){var i=h.split(".");if(i.length>1){var j=i[i.length-1],k=i[i.length-2];(isNaN(j)||isNaN(k))&&(h="."+k+"."+j)}g+=" domain="+h+";"}document.cookie=g}catch(l){}}return{getCookieUrl:a,readCookie:b,writeCookie:c}}();var ace=ace||{};ace.mkt=ace.mkt||{},ace.mkt.CrossOriginMessenger=function(){"use strict";function a(a,b){return JSON.stringify({type:a,payload:b,source:k})}function b(a,b,c){a.postMessage(c,b)}function c(a,b,c){l.push({type:a,domain:e(b),callback:c})}function d(){l=[]}function e(a){return a.replace(/(^https:\/\/.*):443$/,"$1").replace(/(^http:\/\/.*):80$/,"$1")}function f(a){var b=g(a.data);h(b)&&i(b,a.origin)}function g(a){try{return JSON.parse(a)}catch(b){return}}function h(a){return a&&a.source===k}function i(a,b){for(var c=0;c<l.length;c++){var d=l[c];d.type===a.type&&j(d,b)&&d.callback(a)}}function j(a,b){return 0===b.indexOf(a.domain)}var k="ace.mkt.CrossOriginMessenger",l=[];return window.addEventListener("message",f,!1),{createMessage:a,sendMessage:b,addListener:c,clearAllListeners:d}}();var ace=ace||{};ace.mkt=ace.mkt||{},ace.mkt.Guid=function(){"use strict";function a(){return Math.guid()}function b(){return Math.guid().replace(/-/g,"")}return{guid:a,guidNoDashes:b}}();var ace=ace||{};ace.mkt=ace.mkt||{},ace.mkt.Helpers=function(){"use strict";function a(a){if("complete"===document.readyState)a();else if(window.addEventListener)window.addEventListener("load",a,!1);else if(window.attachEvent)window.attachEvent("onload",a);else{var b=window.onload;window.onload=function(){b&&b(),a()}}}function b(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(window.location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))}function c(){return window.location.origin?window.location.origin:window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")}function d(a){if(window.location.search.indexOf("utm_"))for(var b in a)a.hasOwnProperty(b)&&(a[b]=ace.mkt.Helpers.getParameterByName(b));return a}function e(){for(var a,b=document.getElementsByTagName("link"),c=0;a=b[c];c++)if("canonical"===a.getAttribute("rel"))return a.getAttribute("href")}function f(){var a=e();if(a)return a;var b=window.location.href,c=b.indexOf("#");return-1===c?b:b.slice(0,c)}function g(a){return decodeURIComponent(a).match(o)}function h(){return g(window.location.href)||g(document.referrer)}function i(a){window.location.href!==f()&&(a.url?a.actualUrl=a.url:a.actualUrl=window.location.href)}function j(a){return a.url=window.location.origin+p,a.path=p,a.search="",a}function k(a){return a.referrer=l(document.referrer)+p,a}function l(a){var b=document.createElement("a");return b.href=a,b.protocol+"//"+b.host}function m(a,b){return-1!==a.indexOf(b,a.length-b.length)}function n(a){return a.replace(/http(s|):\/\//g,"").split(/(\/|:)/g)[0]}var o=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,p="/path-contained-email-address";return window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")),{addActualUrl:i,addLoadEvent:a,getParameterByName:b,getBaseUrl:c,getUtms:d,urlWithoutPath:l,urlContainsEmail:g,addCleanedUrlAndPaths:j,addCleanedReferrer:k,emailAddressIsDetected:h,endsWith:m,hostnameFromUrl:n}}(),Math.trueRandom=function(){function a(){var a=4022871197,b=function(b){b=b.toString();for(var c=0;c<b.length;c++){a+=b.charCodeAt(c);var d=.02519603282416938*a;a=d>>>0,d-=a,d*=a,a=d>>>0,d-=a,a+=4294967296*d}return 2.3283064365386963e-10*(a>>>0)};return b.version="Mash 0.9",b}function b(){return function(b){var c=0,d=0,e=0,f=1;0==b.length&&(b=[+new Date]);var g=a();c=g(" "),d=g(" "),e=g(" ");for(var h=0;h<b.length;h++)c-=g(b[h]),c<0&&(c+=1),d-=g(b[h]),d<0&&(d+=1),(e-=g(b[h]))<0&&(e+=1);g=null;var i=function(){var a=2091639*c+2.3283064365386963e-10*f;return c=d,d=e,e=a-(f=0|a)};return i.uint32=function(){return 4294967296*i()},i.fract53=function(){return i()+1.1102230246251565e-16*(2097152*i()|0)},i.version="Alea 0.9",i.args=b,i}(Array.prototype.slice.call(arguments))}return b()}(),Math.guid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.trueRandom()|0;return("x"==a?b:3&b|8).toString(16)})};var ace=ace||{};ace.mkt=ace.mkt||{},ace.mkt.StorageManager=function(){"use strict";var a=/\d+#/,b=function(a,b){this.prefix=a,this.id=b,this.namespace=this.prefix+"."+this.id;try{this.localStorageSupported="localStorage"in window&&null!==window.localStorage}catch(c){}};return b.prototype={getPrefix:function(a){var b=1e3*(a||0);return b?+new Date+b+"#":""},getItem:function(b){if(!this.localStorageSupported)return null;var c=localStorage.getItem(this.namespace+"."+b),d=a.exec(c);return!0===d&&(c=c.replace(d[0],""),+new Date>d[0].replace("#",""))?(localStorage.removeItem(this.namespace+"."+b),null):c},contains:function(a){return!!this.getItem(a)},setItem:function(a,b,c){this.localStorageSupported&&(b=this.getPrefix(c)+b,localStorage.setItem(this.namespace+"."+a,b))},removeItem:function(a){this.localStorageSupported&&localStorage.removeItem(this.namespace+"."+a)}},{instance:b}}();var ace=ace||{};ace.mkt=ace.mkt||{},ace.mkt.MessageTypes={atlPathEstablished:"atlPathEstablished"};var ace=ace||{};ace.analytics=ace.analytics||{},ace.analytics.Properties={IFRAME_DOMAIN:"https://ace-cdn.atlassian.com",IFRAME_URI:"/stp/current/analytics/atl-path.html",COOKIE_DOMAIN:"atlassian.com"};var ace=ace||{};ace.analytics=ace.analytics||{},ace.analytics.Initializer=function(){"use strict";function a(a,b,c){ace.analytics.SegmentIO.init(a,b,c,!0)}function b(a){ace.analytics.SegmentIO.init(a,{},{},!1)}function c(){return window.analytics.ready.apply(window,arguments)}return{initAnalytics:b,initWithPageAnalytics:a,ready:c}}();var ace=ace||{};ace.analytics=ace.analytics||{},ace.analytics.Tracking=function(){"use strict";function a(a,b){analytics.track(a,b)}function b(a,b,c,d){window.analytics.page(a,b,c,d)}function c(a){try{var b,c,d;"INPUT"===a.target.tagName?b=""!==a.target.value?a.target.value:a.target.textContent:(b=a.target.textContent,""===b&&(b=a.target.parentNode.textContent),""===b&&(b=a.target.title),""===b&&(b=a.target["aria-label"]),""===b&&(b=a.target.className)),c=a.target.href||"",d=a.target.getAttribute("data-track-event")||"Clicked-Auto-CTA";var e=void 0!==b?b.toLowerCase().trim().replace(/ /g,"-"):"",f=void 0!==document.title?document.title.trim().replace(/\W+/g,"_"):"",g={category:f,label:e,href:c,_sio:ace.mkt.Cookie.readCookie("_sio")||"",_atl_path:ace.mkt.Cookie.readCookie("__atl_path")||""};if(a.target.dataset)for(var h in a.target.dataset)"track-event"!==h&&a.target.dataset.hasOwnProperty(h)&&(g[h]=a.target.dataset[h]);ace.analytics.Tracking.trackEvent(d,g)}catch(i){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(i)}}function d(){try{for(var a=document.querySelectorAll("button, input[type='submit']"),b=0;b<a.length;b++)a[b].addEventListener("click",c)}catch(d){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(d)}}function e(){try{for(var a=[],b=document.querySelectorAll("a[class*='button'], a[class*='btn'], a.cta, .external-link"),d=0;d<b.length;d++){var e=b[d];(e.offsetWidth>=50||-1!==e.className.indexOf("cta")||-1!==e.className.indexOf("external-link"))&&a.push(e)}for(var f=0;f<a.length;f++)a[f].addEventListener("click",c)}catch(g){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(g)}}function f(a,b){try{var c=void 0!==a.className?a.className:a.parentNode.className,d=void 0!==a.textContent?a.textContent:"",e=void 0!==document.title?document.title.replace(/\W+/g,"_").trim():"";ace.analytics.Tracking.trackEvent(b,{className:c,category:e,label:d,_sio:ace.mkt.Cookie.readCookie("_sio")||"",_atl_path:ace.mkt.Cookie.readCookie("__atl_path")||""})}catch(f){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(f)}}function g(){try{for(var a=document.querySelectorAll("div[class*='videoPlayButton'], .video-link, .video_link, .customer-story-video-link"),b=document.querySelectorAll("div[class='overlay'], .modal.video .close"),c=function(){f(this,"Opened Video")},d=function(){f(this,"Closed Video")},e=0;e<a.length;e++)a[e].addEventListener("click",c);for(var g=0;g<b.length;g++)b[g].addEventListener("click",d)}catch(h){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(h)}}return{autoTrackButtons:d,autoTrackLinks:e,autoTrackVideos:g,trackEvent:a,pageView:b}}();var ace=ace||{};ace.analytics=ace.analytics||{},ace.analytics.Identity=function(){"use strict";function a(a,b,c){a=void 0!==a&&a,b=void 0!==b?b:{},c=void 0!==c?c:{},a&&window.analytics.identify(a,b,c)}function b(){var a,b=ace.mkt.Helpers.emailAddressIsDetected();try{a=ace.mkt.Cookie.readCookie(j)}catch(g){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(g,"atl_path read cookie error in autoIdentify ")}var c=ace.mkt.Cookie.readCookie(k),e=decodeURIComponent(c);b&&(m.integrations={All:!1,"Google Analytics":!0},ace.mkt.Helpers.urlContainsEmail(window.location.href)&&ace.mkt.Helpers.addCleanedUrlAndPaths(l),ace.mkt.Helpers.urlContainsEmail(document.referrer)&&ace.mkt.Helpers.addCleanedReferrer(l));try{var f=decodeURIComponent(ace.mkt.Cookie.readCookie("optimizelyBuckets"));"null"!==f&&(l.optimizelyBuckets=JSON.parse(f))}catch(g){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(g,"error reading optimizelyBuckets cookie value ")}try{l.anonymous_id=window.analytics.user().anonymousId()}catch(g){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(g,"error reading window.analytics.user().anonymousId() in identify")}void 0!==a&&a?c&&(l.atl_path=a,ace.analytics.Identity.identify(e,l,m)):d(function(a){l.atl_path=a,ace.analytics.Tracking.trackEvent("atlpath",l,m),c&&ace.analytics.Identity.identify(e,l,m)})}function c(){var a;try{a=ace.mkt.Cookie.readCookie(j),!a&&ace.mkt.Helpers.endsWith(document.domain,ace.analytics.Properties.COOKIE_DOMAIN)&&(a=ace.mkt.Guid.guidNoDashes(),ace.mkt.Cookie.writeCookie(j,a,3650,!0))}catch(b){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(b,"error in findAtlPath")}return a}function d(a){var b=ace.analytics.Identity.findAtlPath();b?a(b):ace.analytics.Identity.callWithAtlPathFromIFrame(a)}function e(a){var b=!1,c=setTimeout(function(){b=!0,a("atlexception_iframe-timeout")},8e3);ace.mkt.CrossOriginMessenger.addListener(ace.mkt.MessageTypes.atlPathEstablished,ace.analytics.Properties.IFRAME_DOMAIN,function(d){var e=d.payload;clearTimeout(c),ace.mkt.Cookie.writeCookie(j,e,3650,!0),b||a(e)}),ace.mkt.Helpers.addLoadEvent(i)}function f(a){return ace.mkt.Helpers.endsWith(a,"atlassian.com")||ace.mkt.Helpers.endsWith(a,"atlassian.io")||ace.mkt.Helpers.endsWith(a,"atlassian.net")||ace.mkt.Helpers.endsWith(a,"hipchat.com")||ace.mkt.Helpers.endsWith(a,"sourcetreeapp.com")||ace.mkt.Helpers.endsWith(a,"bitbucket.org")||ace.mkt.Helpers.endsWith(a,"jira.com")||ace.mkt.Helpers.endsWith(a,"jira-dev.com")||ace.mkt.Helpers.endsWith(a,"127.0.0.1:9001")||ace.mkt.Helpers.endsWith(a,"127.0.0.1:8080")||ace.mkt.Helpers.endsWith(a,"codecademy.com")||ace.mkt.Helpers.endsWith(a,"offerpop.com")||ace.mkt.Helpers.endsWith(a,"stride.com")}function g(a){var b=ace.mkt.Helpers.getParameterByName("domain");if(b&&f(b)){var c=ace.mkt.CrossOriginMessenger.createMessage(ace.mkt.MessageTypes.atlPathEstablished,a);ace.mkt.CrossOriginMessenger.sendMessage(window.parent,b,c)}}function h(){g(c())}function i(){var a=document.createElement("IFRAME"),b=ace.analytics.Properties.IFRAME_DOMAIN+ace.analytics.Properties.IFRAME_URI+"?domain="+ace.mkt.Helpers.getBaseUrl();a.setAttribute("src",b),a.style.width="0px",a.style.height="0px",a.style.visibility="hidden",a.style.display="block",document.body.appendChild(a)}var j="__atl_path",k="__aid_user_id",l={},m={};return{autoIdentify:b,identify:a,callWithAtlPath:d,callWithAtlPathFromIFrame:e,transmitAtlPath:h,findAtlPath:c}}();var ace=ace||{};ace.analytics=ace.analytics||{},ace.analytics.SegmentIO=function(){"use strict";function a(a,c,e,f){ace.analytics.SegmentIO.wrapSegment(a);var g=ace.mkt.Helpers.emailAddressIsDetected(),h="/path-contained-email-address";"object"==typeof c&&null!==c||(c={}),"object"==typeof e&&null!==e||(e={}),c.atl_ajs_version=d,g&&(e.integrations={All:!1,"Google Analytics":!0},ace.mkt.Helpers.urlContainsEmail(window.location.href)&&ace.mkt.Helpers.addCleanedUrlAndPaths(c),ace.mkt.Helpers.urlContainsEmail(document.referrer)&&ace.mkt.Helpers.addCleanedReferrer(c)),ace.mkt.Helpers.addActualUrl(c),!0===f&&(b(c),ace.analytics.Tracking.pageView(null,null,c,e)),window.setTimeout(function(){var a=["www.atlassian.com","blogs.atlassian.com","confluence.atlassian.com","marketplace.atlassian.com","developer.atlassian.com","community.atlassian.com","my.atlassian.com","www.stride.com"];window.location.host&&a.indexOf(window.location.host)>-1&&(ace.analytics.Tracking.autoTrackButtons(),ace.analytics.Tracking.autoTrackLinks(),ace.analytics.Tracking.autoTrackVideos());try{ace.mkt.Cookie.writeCookie("_sio",window.analytics.user().anonymousId(),3650,!0),ace.analytics.Identity.autoIdentify()}catch(b){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(b,"error writing _sio/utm_params cookie")}},600),window.analytics.ready(function(){"undefined"!=typeof ga&&(ga("require","linker"),ga("linker:autoLink",["atlassian.com","bitbucket.org","hipchat.com","attendease.com","get.atlassian.com","eegeventsite.secure.force.com","atlassian.swoogo.com"]),g&&(ace.mkt.Helpers.urlContainsEmail(window.location.href)&&(ga("set","location",window.location.origin+h),ga("set","path",h)),ace.mkt.Helpers.urlContainsEmail(document.referrer)&&ga("set","referrer",ace.mkt.Helpers.hostnameFromUrl(document.referrer)+h)))})}function b(a){a=a||{};try{var b=ace.mkt.Cookie.readCookie("__atl_path"),c=ace.mkt.Cookie.readCookie("__utmz"),d=ace.mkt.Cookie.readCookie("_ga");b&&(a.context_atl_path=b),c&&(a.utmz=c),d&&(a.ga_clientid=d)}catch(e){"undefined"!=typeof Bugsnag&&Bugsnag.notifyException(e)}return a}function c(a){!function(){var b=window.analytics=window.analytics||[];if(!b.initialize){if(b.invoked)return void(window.console&&console.error&&console.error("Segment snippet included twice."));b.invoked=!0,b.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"],b.factory=function(a){return function(){var c=Array.prototype.slice.call(arguments);return c.unshift(a),b.push(c),b}};for(var c=0;c<b.methods.length;c++){var d=b.methods[c];b[d]=b.factory(d)}b.load=function(a){var b=document.createElement("script");b.type="text/javascript",b.id="analytics-js",b.async=!0,b.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+a+"/analytics.min.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},b.SNIPPET_VERSION="3.1.0",b.load(a)}}()}var d="1.0.0";return{init:a,wrapSegment:c}}();
//# sourceMappingURL=atl-analytics.min.js.map