!function(){"use strict";var e,t,s,a,n;s=new RegExp('"isCordova":true').test(localStorage.getItem("app-context.json")),a=new RegExp(/cordova=1/).test(document.location.search),a||s?(t=navigator.userAgent.match(/(Android)/)?"android":"ios",e=document.createElement("link"),e.rel="stylesheet",e.type="text/css",e.href="/static/css/styles."+t+".min.css","ios"===t&&(n=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/))&&(t+=parseInt(n[1],10)<=6?" ios-classic":""),document.documentElement.className+=" app "+t,document.head.appendChild(e)):document.documentElement.className+=" web"}();