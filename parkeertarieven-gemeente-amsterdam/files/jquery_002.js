(function($){var _options={};var _container={};var _autoIntervalArray=[];var _easingEquation;$.fn.jBreadCrumb=function(options){_options=$.extend({},$.fn.jBreadCrumb.defaults,options);return this.each(function(){_container=$(this);setupBreadCrumb();});};function setupBreadCrumb(){if(typeof($.easing)=='object'){_easingEquation='easeOutQuad';}else{_easingEquation='swing';}
_breadCrumbElements=$(_container).find('li');if($(_container).find('.crumb-wrapper').length==0){$(_container).find('ul').wrap('<div class="crumb-wrapper" style="overflow:hidden; position:relative;  width: '+$(_container).css("width")+';"><div>');$(_container).find('ul').width(5000);}
else{$(_container).find('.crumb-wrapper').css("width",$(_container).css("width"));$(_container).find('ul').width(5000);}
if(_breadCrumbElements.length>0){$(_breadCrumbElements[_breadCrumbElements.length-1]).addClass('last');$(_breadCrumbElements[0]).addClass('first');if(_breadCrumbElements.length>_options.minimumCompressionElements){compressBreadCrumb(_breadCrumbElements);$(_container).addClass("initialized");}}}
function compressBreadCrumb(_breadCrumbElements){var finalElement=$(_breadCrumbElements[_breadCrumbElements.length-1]);if($(finalElement).width()>_options.maxFinalElementLength){if(_options.beginingElementsToLeaveOpen>0){_options.beginingElementsToLeaveOpen--;}
if(_options.endElementsToLeaveOpen>0){_options.endElementsToLeaveOpen--;}}
if($(finalElement).width()<_options.maxFinalElementLength&&$(finalElement).width()>_options.minFinalElementLength){if(_options.beginingElementsToLeaveOpen>0){_options.beginingElementsToLeaveOpen--;}}
var itemsToRemove=_breadCrumbElements.length-1-_options.endElementsToLeaveOpen;$(_breadCrumbElements[_breadCrumbElements.length-1]).css({background:'none'});$(_breadCrumbElements).each(function(i,listElement){if(i>_options.beginingElementsToLeaveOpen&&i<itemsToRemove&&!_container.hasClass("initialized")){$(listElement).find('a').wrap('<span></span>').width($(listElement).find('a').width()+10);$(listElement).append($('<div class="'+_options.overlayClass+'"></div>').css({display:'block'})).css({background:'none'});var options={id:i,width:$(listElement).width(),listElement:$(listElement).find('span'),isAnimating:false,element:$(listElement).find('span')};$(listElement).data("width",$(listElement).width());$(listElement).bind('mouseover',options,expandBreadCrumb).bind('mouseout',options,shrinkBreadCrumb).bind('click',options,clickBreadCrumb).find("a").bind('click',options,clickBreadCrumb);listElement.autoInterval=setInterval(function(){clearInterval(listElement.autoInterval);$(listElement).find('span').animate({width:_options.previewWidth},_options.timeInitialCollapse,_options.easing);},(150*(i-2)));}});}
function clickBreadCrumb(e){if($(this).is("li.item")&&$(this).children("span").first().width()==_options.previewWidth){return expandBreadCrumb(e);}
else if($(this).is("a")&&$(this).parent("span").width()==_options.previewWidth){return expandBreadCrumb(e);}
else if($(this).is("li.item")){document.location=$(this).find("a").attr("href");return true;}
else{return true;}}
function expandBreadCrumb(e){var elementID=e.data.id;var originalWidth=e.data.width;$(e.data.element).stop();$(e.data.element).animate({width:originalWidth},{duration:_options.timeExpansionAnimation,easing:_options.easing,queue:false});return false;}
function shrinkBreadCrumb(e){var elementID=e.data.id;$(e.data.element).stop();$(e.data.element).animate({width:_options.previewWidth},{duration:_options.timeCompressionAnimation,easing:_options.easing,queue:false});return false;}
$.fn.jBreadCrumb.defaults={maxFinalElementLength:240,minFinalElementLength:120,minimumCompressionElements:4,endElementsToLeaveOpen:1,beginingElementsToLeaveOpen:1,timeExpansionAnimation:800,timeCompressionAnimation:500,timeInitialCollapse:600,easing:_easingEquation,overlayClass:'chevronOverlay',previewWidth:24};})(jQuery);