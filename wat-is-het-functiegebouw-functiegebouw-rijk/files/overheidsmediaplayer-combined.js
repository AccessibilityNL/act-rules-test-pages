!function(t){t.extend(mejs.MepDefaults,{adFile:null,adSyncTolerance:.5}),MediaElementPlayer.prototype.buildaudiodescription=function(e,n,s,a){function i(){t('<audio preload="auto" height="0" id="'+e.id+'-ad" width="0"> <source src="'+e.options.adFile+'" type="audio/mp3" /></audio>').appendTo(e.container),u=new MediaElement(e.id+"-ad",{pluginWidth:0,pluginHeight:0,success:function(t){t.addEventListener("loadeddata",function(){o(),l()},!1)}})}function l(){$adBtn.hasClass("mejs-audiodescription-inactive")?($adBtn.addClass("mejs-audiodescription-active"),$adBtn.removeClass("mejs-audiodescription-inactive"),d=!0):($adBtn.addClass("mejs-audiodescription-inactive"),$adBtn.removeClass("mejs-audiodescription-active"),d=!1,u.stop())}function o(){a.addEventListener("play",function(){d&&u.play()},!1),a.addEventListener("pause",function(){d&&u.stop()},!1),a.addEventListener("timeupdate",function(){var t=0;null!==u&&(t=Math.abs(a.currentTime-u.currentTime),t>e.options.adSyncTolerance&&(d?(a.paused||u.play(),u.setCurrentTime(a.currentTime)):u.stop()))},!1)}if(e.isVideo&&e.options.adFile){var u=null,d=!1;$adBtn=t('<div class="mejs-button mejs-audiodescription-button mejs-audiodescription-inactive"><button></button></div>'),$adBtn.appendTo(n),$adBtn.on("click",function(t){t.preventDefault(),null===u?i():l()})}}}(jQuery),$.fn.collapsePanels=function(){return this.each(function(){function t(){e.find(".toggle").each(function(){$(this).addClass("close");var t=$(this).find("h2"),e=t.text();t.html('<a href="#">'+e+"</a>")}),e.find(".toggle h2 a").click(function(t){t.preventDefault(),$(this).parents("li").toggleClass("close").toggleClass("open")})}var e=$(this);t()})},$(".block-audio-video").collapsePanels(),$.fn.createPlayer=function(){var t={txt:[]},e=$.extend({},t);return this.each(function(){function t(){f.settings.txt.play=p.attr("data-playtxt")||"Afspelen",f.settings.txt.pauze=p.attr("data-pauzetxt")||"Pauzeer",f.settings.txt.enableAd=p.attr("data-enablead")||"Audio descriptie afspelen",f.settings.txt.disableAd=p.attr("data-disablead")||"Audio descriptie stoppen",f.settings.txt.enableCc=p.attr("data-enablecc")||"Ondertiteling aan",f.settings.txt.disableCc=p.attr("data-disablecc")||"Ondertiteling uit",f.settings.txt.volumeOn=p.attr("data-enablevolume")||"Geluid aan",f.settings.txt.volumeOff=p.attr("data-disablevolume")||"Geluid uit",f.settings.txt.enableFullscreen=p.attr("data-enablefullscreen")||"Schermvullende weergave openen",f.settings.txt.disableFullscreen=p.attr("data-disablefullscreen")||"Schermvullende weergave sluiten"}function n(t){f.settings.playButton=f.find(".mejs-playpause-button button"),f.settings.adButton=f.find(".mejs-audiodescription-button button"),f.settings.subButton=f.find(".mejs-captions-button button"),f.settings.volButton=f.find(".mejs-volume-button button"),f.settings.fullscreenButton=f.find(".mejs-fullscreen-button button"),s(),a(),i(),l(),o(),t.addEventListener("play",function(){s()},!1),t.addEventListener("playing",function(){s()},!1),t.addEventListener("pause",function(){s()},!1),f.settings.adButton.on("click",function(){a()}),f.settings.subButton.on("click",function(){i()}),f.settings.volButton.on("click",function(){l()}),f.settings.fullscreenButton.on("click",function(){o()})}function s(){f.settings.playButton.parent().hasClass("mejs-play")?(f.settings.playButton.attr({title:f.settings.txt.play,"aria-label":f.settings.txt.play}),f.settings.playButton.html(f.settings.txt.play)):(f.settings.playButton.attr({title:f.settings.txt.pauze,"aria-label":f.settings.txt.pauze}),f.settings.playButton.html(f.settings.txt.pauze))}function a(){f.settings.adButton.hasClass("inactive")?(f.settings.adButton.removeClass("inactive"),f.settings.adButton.attr({title:f.settings.txt.disableAd,"aria-label":f.settings.txt.disableAd}),f.settings.adButton.html(f.settings.txt.disableAd)):(f.settings.adButton.addClass("inactive"),f.settings.adButton.attr({title:f.settings.txt.enableAd,"aria-label":f.settings.txt.enableAd}),f.settings.adButton.html(f.settings.txt.enableAd))}function i(){f.settings.subButton.hasClass("inactive")?(f.settings.subButton.removeClass("inactive"),f.settings.subButton.attr({title:f.settings.txt.disableCc,"aria-label":f.settings.txt.disableCc}),f.settings.subButton.html(f.settings.txt.disableCc)):(f.settings.subButton.addClass("inactive"),f.settings.subButton.attr({title:f.settings.txt.enableCc,"aria-label":f.settings.txt.enableCc}),f.settings.subButton.html(f.settings.txt.enableCc))}function l(){f.settings.volButton.hasClass("inactive")?(f.settings.volButton.removeClass("inactive"),f.settings.volButton.attr({title:f.settings.txt.volumeOn,"aria-label":f.settings.txt.volumeOn}),f.settings.volButton.html(f.settings.txt.volumeOn)):(f.settings.volButton.addClass("inactive"),f.settings.volButton.attr({title:f.settings.txt.volumeOff,"aria-label":f.settings.txt.volumeOff}),f.settings.volButton.html(f.settings.txt.volumeOff))}function o(){f.settings.fullscreenButton.hasClass("fullscreen")?(f.settings.fullscreenButton.attr({title:f.settings.txt.disableFullscreen,"aria-label":f.settings.txt.disableFullscreen}),f.settings.fullscreenButton.html(f.settings.txt.disableFullscreen),f.settings.fullscreenButton.removeClass("fullscreen")):(f.settings.fullscreenButton.attr({title:f.settings.txt.enableFullscreen,"aria-label":f.settings.txt.enableFullscreen}),f.settings.fullscreenButton.html(f.settings.txt.enableFullscreen),f.settings.fullscreenButton.addClass("fullscreen"))}function u(){f.find("embed").length>0&&f.addClass("flash")}function d(){var t=-1,e=-1;p.mediaelementplayer({enableAutosize:!0,videoWidth:t,videoHeight:e,mode:"auto",plugins:["flash"],pluginPath:"assets/mediaelement/",flashName:"flashmediaelement.swf",features:["playpause","current","progress","duration","volume","tracks","audiodescription","fullscreen"],adFile:p.data("ad"),alwaysShowControls:!0,toggleCaptionsButtonWhenOnlyOne:!0,success:function(t){n(t),u()}})}function r(){var t=-1,e=-1;p.mediaelementplayer({enableAutosize:!0,videoWidth:t,videoHeight:e,mode:"auto",plugins:["flash"],pluginPath:$("body").attr("data-scriptpath")+"/shared-ro/mediaelement/",flashName:"flashmediaelement.swf",features:["playpause","volume","fullscreen"],type:"application/x-mpegURL",alwaysShowControls:!0,success:function(t){n(t),u()},error:function(){f.html(p.attr("data-noplugintxt"))}})}function c(){m.mediaelementplayer({enableAutosize:!0,mode:"auto",plugins:["flash"],pluginPath:"shared-ro/mediaelement/",flashName:"flashmediaelement.swf",features:["playpause","current","progress","duration","volume"],alwaysShowControls:!0,success:function(t){n(t)}})}function g(){f.settings=e,t(),p.length>0?f.hasClass("streaming")?r():d():m.length>0&&c()}var f=$(this),p=f.find("video"),m=f.find("audio");g()})},$(".block-audio-video").createPlayer();