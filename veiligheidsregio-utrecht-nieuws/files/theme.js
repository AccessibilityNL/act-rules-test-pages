/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

jQuery(function($) {

	var config = $('html').data('config') || {};

	// Social buttons
	$('article[data-permalink]').socialButtons(config);
    
    function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}
	jQuery("a.yt").each(function (index, value){
	
	var videoId = getId(jQuery(this).attr("href"));
	var iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/' 
    + videoId + '" frameborder="0" allowfullscreen></iframe>';
	jQuery(this).html(iframeMarkup);
 
});

});
