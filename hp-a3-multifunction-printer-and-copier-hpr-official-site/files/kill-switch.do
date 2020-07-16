













	
		
		
		
		
		

/***** Master Kill Switch Configuration For Services *****/
var fb_show = 0;
var addthis_show = 1;
var tweetfeed_show = 1;
var tweetbutton_show = 1;
var linkedin_show = 1;
var googleplus_show = 1;
var pinterestpin_show = 0;
var slideshare_embed_show = 1;

/***** Social Functions *****/

/* FaceBook Like functions */

/*This function creates a dynamic element iframe, it receives parent element to insert iFrame and jsp file url (with actual Facebook  html code)*/
function do_fb_like(fb_like_target_div_id, learn_more_class_to_use, learn_more_text, layout, show_faces, width, height, action, font, color) {
/*This event can be called from outside this js file, wire up insertIframe function with actual DOM elements*/
	window.addEvent('domready',function(){

		var url = 'http://www.facebook.com/plugins/like.php?';	
/*	var layout ='standard';
	var show_faces='false';
	var width='460';
	var height='48';
	var action='like';
	var font='verdana';
	var color='dark';
*/
		var parent_div = document.getElementById(fb_like_target_div_id);
//		insertIframe($$('.js_fb_like')[0],url,layout, show_faces,width,height,action,font,color);

		if (fb_show==1) {

			var href = location.href;
			var full_url = url + 'layout=' + layout +'&show_faces=' + show_faces +'&width='+ width +'&action=' + action + '&font=' + font + '&colorscheme='+ color +'&height=' + height +'&href='+ encodeURI(href);
			//parent.getElement('iframe').setProperties({'src':full_url});
			parent_div.innerHTML = '<iframe  allowtransparency="true" scrolling="no" frameborder="0" src="' + full_url + '" width="' + width + '" height="' + height + '" class="fb_like_page_iframe"></iframe><a href="http://www.facebook.com/help/?page=1068"  target="_blank" class="' + learn_more_class_to_use + '">' + learn_more_text + '</a>&nbsp;&rsaquo;';

		}
		else{
			//parent_div.destroy();
			$(parent_div).setStyle('display', 'none');
		}

	});
};
	       
	

	

	

	

	

	

	

	

	

