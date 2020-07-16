var noMoreComments = false;
var pp_colorbox_lastFocus;
var pp_addthis_lastFocus;

function entsub() {
    if (window.event && window.event.keyCode == 13)
        login();
    else
        return true;}

function passComment(servername){
    pp_jquery(".comment_submitbutton").css("visibility","hidden");
    var commentername = document.getElementById('commentername').value;
    var commenteremail = document.getElementById('commenteremail').value;
    var comment = document.getElementById('comment').value;
    var reply_id = pp_pageData['reply_id'];
    var pagetype = pp_pageData['pagetype'];
    var pageid = pp_pageData['pageid'];
    var clientid = pp_pageData['clientid'];

    var location = "//" + servername + "services/commentservice.php";
    pp_jquery.ajax({ type: "POST", url: location, data: "pagetype=" + pagetype + "&pageid=" + pageid + "&clientid=" + clientid + "&commentername=" + commentername + "&commenteremail=" + commenteremail + "&comment=" + encodeURIComponent(comment) + "&reply_id=" + reply_id, cache: false,
        success: function(data){ commentReturn(data);},
        error: function(data){ alert("The comment service is not responding."); }
    });
}

var pp_ajax = {
    xhr : null,
    request : function (url,method, data,success,failure){
        if (!this.xhr){
            this.xhr = window.ActiveX ? new ActiveXObject("Microsoft.XMLHTTP"): new XMLHttpRequest();
        }
        var self = this.xhr;

        self.onreadystatechange = function () {
            if (self.readyState === 4 && self.status === 200){
                // the request is complete, parse data and call callback
                var response = JSON.parse(self.responseText);
                success(response);
            }else if (self.readyState === 4) { // something went wrong but complete
                failure();
            }
        };
        this.xhr.open(method,url,true);
        this.xhr.send();
    },
};

function showCookieInfo(nid,servername) {
    // Prevent duplicates
    removeCookieInfo();
    pp_ajax.request(servername + "/services/getcookiedata.php?nid=" + nid, "GET", null, function (data) {
        var cookieHTML =
                '<div id="pp-cookie-container__outer">' +
                    '<div class="pp-cookie-container__inner">' +
                        '<div class="pp-cookie-container">' +
                        '<button type="button" id="pp_cboxClose" onclick="removeCookieInfo()"><span class="pp-visually-hidden">Close</span></button>' +
                        '<div class="pp-cookie-data">' + data + '</div>' +
                    '</div>' +
                    '<div class="pp-cookie-overlay"></div>';
                '</div>';
            pp_jquery("body").append(cookieHTML).addClass('pp-overflow-hidden');
    }, function () {

    });
}

function removeCookieInfo() {
    pp_jquery('#pp-cookie-container__outer').remove();
    pp_jquery("body").removeClass('pp-overflow-hidden');
}

function addClassToOddRow (target) {
    var reactionsArray = pp_jquery(target);
    reactionsArray.each(function(i) {
        var reactionRowCount = i + 1;
        if (reactionRowCount % 2 === 0 && !pp_jquery(this).hasClass('is-even')) {
            pp_jquery(this).addClass('is-even');
        }
    });
}

function commentReturn(doc) {
    var approvalRequired = pp_pageData['approvalRequired'];
    var status = doc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
    if (status == "error") {
        pp_jquery(".comment_submitbutton").css("visibility","visible");
        var error = doc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
        document.getElementById('commenterror').innerHTML = error;
        pp_jquery('#commenterror').fadeIn(400).delay(5000).fadeOut(500);
    } else {

        document.getElementById('commentername').value = "";
        document.getElementById('commenteremail').value = "";
        document.getElementById('comment').value = "";

        pp_jquery('#commentpassed').fadeIn(400).delay(3000).fadeOut(400, function () {
            // RELOAD IF NO APPROVAL REQUIRED
            if (!approvalRequired) {
                window.location.reload();
            } else {
                pp_jquery(".comment_submitbutton").css("visibility","visible");
            }
        });
    }
}

function loadMoreComments(data) {
    var newElems = pp_jquery(data);
    var numElems = pp_jquery(data).filter('.reaction_div').length;

    if(numElems > 0) {
        var newTo = parseInt(pp_jquery('.reactions-to').html()) + numElems;
        pp_jquery('.reactions-to').html(newTo);
        pp_jquery('.preloader').before(newElems);
        pp_jquery('.preloader').fadeOut('fast').promise().done(function() {
            pp_jquery(newElems).fadeIn('slow');
        });
        addClassToOddRow('.reaction_div');
    } else {
        noMoreComments = true;
        pp_jquery('.reactions_pagination .showMore').fadeOut('fast');
        pp_jquery('.preloader').fadeOut('fast');
    }
}

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// show content after cookies are accepted
function loadLater(){
    pp_jquery.each((ppLoadLater), function(key, value) {
        pp_jquery('#' + key).append(pp_jquery(value));
    });
    ppLoadLater = {};
}

function us_dateformat() {

    pp_jquery('.pp_date_month').each(function () {
        if (!pp_jquery(this).text().match(/^s*$/)) {
            pp_jquery(this).insertBefore(pp_jquery(this).prev('.pp_date_day'));

            if(pp_jquery(".pp_date_day:has(span.pp_date_day_comma)").length == 0){
                pp_jquery('.pp_date_day').append('<span class=\"pp_date_day_comma\">,</span>');
            }

        }
    });

    pp_jquery('.pp-newsreel-slider-date-month').each(function () {
        if (!pp_jquery(this).text().match(/^s*$/)) {
            pp_jquery(this).insertBefore(pp_jquery(this).prev('.pp-newsreel-slider-date-day')).css('margin-right','3px');

            if(pp_jquery(".pp-newsreel-slider-date-day:has(span.pp_date_day_comma)").length == 0){
                pp_jquery('.pp-newsreel-slider-date-day').append('<span class=\"pp_date_day_comma\">,</span>');
            }

        }
    });

}

function show_rollout(){
    pp_jquery('#pp-download_options').css('display','block');
}

function showImageDownloadOptions(){
    pp_jquery('#pp-download_options').css('display','block').focus();
    pp_jquery('.pp_cb_item_button').attr('aria-expanded', 'true');
}

pp_jquery(document).mouseup(function (e)
{
    var container = pp_jquery("#pp-download_options");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }

});

// Colorbox remove overflow when Colorbox is open

pp_jquery(document).bind('pp_cbox_complete', function() {
    pp_jquery('body').addClass('pp-overflow-hidden');
}).bind('pp_cbox_closed', function() {
    pp_jquery('body').removeClass('pp-overflow-hidden');
});

// COLOR BOX ITEMS
var pp_timeout_imgview;

function loadAddThis() {
    addthis.toolbox('.addthis_toolbox');
}

function ppColorboxComplete() {

    var colorbox = pp_jquery('#colorbox');
    var colorboxTitle = pp_jquery('#pp_cboxTitle');

    // reset title-height for new calculation
    colorboxTitle.css("height", "auto");
    var currentTop = colorbox.css('top');
    currentTop = parseInt(currentTop, 10);
    var titleBoxHeight = colorboxTitle.outerHeight(true);
    var halfTitleHeight = titleBoxHeight / 2;

    var newTopColorbox = currentTop - halfTitleHeight;

    colorbox.css('top', newTopColorbox + 'px');

    if ((showAddthis == 1) && (cookiecontrol != 'declined')) {
        loadAddThis();
    }
    //parse all url's that were plain text , into HTML
    parseUrlDescription();

}

function setReleaseUrl(endpoint, uploadId, language, uploadType, clientId) {
    pp_jquery.ajax({
        url: endpoint + 'services/releaseurl.php?uploadId='+uploadId+'&language='+language+'&type='+uploadType+'&clientId='+clientId,
        type: 'GET',
        success: function(url) {
            if (url) {
                pp_jquery('#release-link-url-'+uploadId).attr('href', url).show();
            }
        }
    });
}

function colorbox_image(imagemodule, shareUrl) {
    if (shareUrl !== undefined) {
        var cb_image_url = shareUrl;
    } else {
        var cb_image_url = document.URL;
    }

    pp_jquery('a.pp_cb_imagegallery_' + imagemodule).colorbox({
        rel:imagemodule,
        maxWidth:"75%",
        maxHeight:"75%",
        className: "pp_colorbox_gallery",
        current:"",
        fadeOut:0,
        fixed:true,
        transition:"none",
        title:function () {

            var title = pp_jquery(this).attr('data-title');
            var img_track_url = pp_jquery(this).attr('data-imgclick');
            var encoded_title = encodeURIComponent(title);
            var encoded_description = '';
            cb_image_description = pp_jquery(this).attr('data-description');
            if (cb_image_description){
                var div_cb_image_description = '<div class="pp_cb_item_description">' + cb_image_description + '</div>';
            }
            var copyright = pp_jquery(this).attr('data-copyright');
            if (copyright != ""){
                var copyright = '<div class="pp_cb_time_copyright">' + copyright + '</div>';
            }
            cb_image_sourcepath = pp_jquery(this).attr('data-sourcepath');
            var filename = pp_jquery(this).attr('data-filename');
            var uploadid = pp_jquery(this).attr('data-uploadid');
            var domain = pp_jquery(this).attr('data-domain');
            var uploadId = parseInt(pp_jquery(this).attr('data-attr-upload-id'));
            var language = pp_jquery(this).attr('data-attr-language');
            var uploadType = pp_jquery(this).attr('data-attr-upload-type');
            var clientId = pp_jquery(this).attr('data-attr-client-id');
            var endpoint = pp_jquery(this).attr('data-attr-endpoint');
            var content = '<div class="pp_cb_item_titlecontainer">';
            content += '<div class="pp_cb_item_title">' + title + '</div>';
            if (cb_image_description){
                content += div_cb_image_description;
                var encoded_description = " " + encodeURIComponent(cb_image_description);
            }

            content += '</div>';
            content += '<hr class="pp_cb_item_spacer">';
            content += '<div class="pp_cb_item_actionbuttons">';
            content += '<button type="button" class="pp_cb_item_button pp_cb_item_downloadbutton pp-transition" aria-haspopup="true" aria-expanded="false" aria-label="Download this item. Use the dropdown options to select the download quality" onClick="showImageDownloadOptions();">Download</button>';
            content += '<ul id="pp-download_options" aria-label="Choose download quality">';
            content += '<li><a href="https://client.presspage.com/services/downloadfile.php?f=' + filename + '&uid=' + uploadid + '&r=lo" onclick="pp_jquery(\'#pp-download_options\').fadeOut(200);">Low res</a></li>';
            content += '<li><a href="https://client.presspage.com/services/downloadfile.php?f=' + filename + '&uid=' + uploadid + '&r=hi" onclick="pp_jquery(\'#pp-download_options\').fadeOut(200);">High res (original)</a></li>';
            content += '</ul>';
            if (uploadId) {
                setReleaseUrl(endpoint, uploadId, language, uploadType, clientId);
                content += '<a target="_blank" href="" id="release-link-url-'+uploadId+'" style="display: none;">';
                content += '<div class="pp_cb_item_button pp_cb_item_downloadbutton pp-transition">';
                content += pp_jquery(this).attr('data-attr-release-button-text');
                content += '</div>';
                content += '</a>';
            }
            if (showAddthis == 1) {
                content += '<div class="pp_cb_shareus_container">';
                content += '<div class="addthis_toolbox addthis_default_style addthis_32x32_style">';
                content += '<a class="addthis_button_facebook" addthis:url="' + cb_image_sourcepath + '" addthis:title="' + encoded_title + encoded_description + " " + cb_image_url + '"></a>';
                content += '<a class="addthis_button_twitter"></a>';
                content += '<a class="addthis_button_linkedin" addthis:url="' + cb_image_sourcepath + '" addthis:title="' + encoded_title + encoded_description + " " + cb_image_url + '"></a>';
                if (cookiecontrol != 'declined') {
                    content += '<a href="#" onclick="window.open(\'http://www.pinterest.com/pin/create/button/?url=' + cb_image_url + '&media=' + cb_image_sourcepath + '&description=' + encoded_title + encoded_description + " " + cb_image_url + '\',\'Pinterest\',\'height=350,width=800,left=10,top=10,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes\');" data-pin-do="buttonPin" data-pin-config="none" data-pin-color="red" data-pin-height="28" title="Pinterest"><span class="at4-icon aticon-pinterest_share" style="text-align:center;background-color: rgb(200, 40, 40);margin: 0 2px;"><span class="pp_icon pp_icon_pinterest" style="font-size:22px;color:#ffffff;"></span></span></a>';
                }
                content += '<a class="addthis_button_compact" addthis:url="' + cb_image_sourcepath + '" addthis:title="' + encoded_title + encoded_description + " " + cb_image_url + '"></a>';
                content += '</div>';
                content += '</div>';
            }
            content += '</div>';
            if (copyright != ""){
                content += copyright;
            }

            // TEMP TRACKING OF IMAGE
            clearTimeout(pp_timeout_imgview); // clear pending timeout
            pp_timeout_imgview = setTimeout(function() { // schedule new timeout
                pp_jquery.get(img_track_url);
                TrackVisits.resourceClicked(TrackVisits.visitTypes.imageItemType, uploadid);
            }, 400);

            return content;
        },
        onOpen : function() {
            pp_colorbox_lastFocus = document.activeElement;
        },
        onClosed : function() {
            pp_colorbox_lastFocus.focus();
        },
        onComplete : function() {
            ppColorboxComplete();
        }
    });
}

function colorbox_video(videomodule){

    var videomodule = videomodule;
    pp_jquery('a.pp_popup_cb_' + videomodule).colorbox({
        rel:videomodule,
        iframe:function () {
            var iframe = true;
            var dataSource = pp_jquery(this).attr('data-dataSource');
            if (dataSource == 's3') {
                iframe = false;
            }
            return iframe;
        },
        html: function () {
            var dataSource = pp_jquery(this).attr('data-dataSource');
            if (dataSource == 's3') {
                html = '<video style="background-color: #000;" width="100%" height="100%" controls>'+
                    '<source src="' + pp_jquery(this).attr('data-videoHref') + '" type="video/mp4">'+
                    '<span class="pp-dn">Your browser does not support HTML5 video.</span>'+
                    '</video>';
            }

            return html;
        },
        width:"100%",
        height:"100%",
        maxWidth: 600,
        maxHeight: 450,
        className: "pp_colorbox-video",
        current:"",
        scrolling: false,
        fadeOut:0,
        fixed:true,
        dataSource:function () {
            var dataSource = pp_jquery(this).attr('data-dataSource');
            return dataSource;
        },
        transition:"none",
        href:function () {
            var videoHref = pp_jquery(this).attr('data-videoHref');
            if (videoHref.indexOf('?') === -1) {
                videoHref += '?';
            }
            videoHref = videoHref + '&autoplay=1';
            return videoHref;
        },
        title:function () {

            var videoTitle = pp_jquery(this).attr('data-videoTitle');
            var videoDescription = pp_jquery(this).attr('data-videoDescription');
            var filename = pp_jquery(this).attr('data-filename');
            var videoShare = pp_jquery(this).attr('data-videoShare');
            var videoid = pp_jquery(this).attr('data-videoid');
            var domain = pp_jquery(this).attr('data-domain');
            var dataSource = pp_jquery(this).attr('data-dataSource');

            var content = '<div class="pp_cb_item_titlecontainer">';
                content += '<div class="pp_cb_item_title">' + videoTitle + '</div>';
                if (videoDescription){
                    content += '<div class="pp_cb_item_description">' + videoDescription + '</div>';
                }
                content += '</div>';
                content += '<hr class="pp_cb_item_spacer">';
                if (dataSource == 's3') {
                    content += '<div class="pp_cb_item_actionbuttons">';
                    content += '<a href="https://client.presspage.com/services/downloadfile.php?f=' + filename + '&vid=' + videoid + '">';
                    content += '<div class="pp_cb_item_button pp_cb_item_downloadbutton pp-transition" onClick="show_rollout();">Download';
                    content += '</div>';
                    content += '</a>';
                }
                if (showAddthis == 1) {
                    content += '<div class="pp_cb_shareus_container">';
                    content += '<div class="addthis_toolbox addthis_default_style addthis_32x32_style">';
                    content += '<a class="addthis_button_twitter" addthis:url="' + videoShare + '" addthis:title="' + videoTitle + '"></a>';
                    content += '<a class="addthis_button_facebook" addthis:url="' + videoShare + '" addthis:title="' + videoTitle + '"></a>';
                    content += '<a class="addthis_button_linkedin" addthis:url="' + videoShare + '" addthis:title="' + videoTitle + '"></a>';
                    content += '<a class="addthis_button_google_plusone_share" addthis:url="' + videoShare + '" addthis:title="' + videoTitle + '"></a>';
                    content += '<a class="addthis_button_compact" addthis:url="' + videoShare + '" addthis:title="' + videoTitle + '"></a>';
                    content += '</div>';
                    content += '</div>';
                }
                content += '</div>';


            return content;

        },
        onOpen : function() {
            pp_colorbox_lastFocus = document.activeElement;
        },
        onClosed : function() {
            pp_colorbox_lastFocus.focus();
        },
        onComplete : function() {

            var dataSource = pp_jquery(this).attr('data-dataSource');
            ppColorboxComplete();
            if (dataSource == 's3') {
                pp_jquery('#pp_cboxWrapper video').get(0).play();
            }
        }
    });

}

function clickDownloadColorbox(uploadid, download_track_url, fileUrl) {
    TrackVisits.resourceClicked(TrackVisits.visitTypes.downloadItemType, uploadid);
    pp_jquery.get(download_track_url);
    window.location = fileUrl;
}
function colorbox_file(filemodule){

    pp_jquery('a.pp-medialib__popup-file_' + filemodule).colorbox({
        rel:filemodule,
        href:function() {
            var itemImageUrl;
            if (pp_jquery(this).attr('data-backgroundimg')) {
                itemImageUrl = pp_jquery(this).attr('data-backgroundimg');
            } else {
                var itemExt = pp_jquery(this).attr('data-type');
                itemImageUrl = "/images/icons/icon_filetype_" + itemExt + ".png";
            }
            return itemImageUrl;
        },
        width:"360px",
        height:"360px",
        maxWidth:"75%",
        maxHeight:"75%",
        className: "pp_colorbox_file",
        current:"",
        fadeOut:0,
        fixed:true,
        transition:"none",
        title:function () {

            var title = pp_jquery(this).attr('data-title');
            var download_track_url = pp_jquery(this).attr('data-downloadclick');
            var fileUrl = pp_jquery(this).attr('href');
            var encoded_title = encodeURIComponent(title);
            var encoded_description = '';
            cb_file_description = pp_jquery(this).attr('data-description');
            if (cb_file_description){
                var div_cb_file_description = '<div class="pp_cb_item_description">' + cb_file_description + '</div>';
            }
            var uploadid = pp_jquery(this).attr('data-uploadid');

            var content = '<div class="pp_cb_item_titlecontainer">';
            content += '<div class="pp_cb_item_title">' + title + '</div>';
            if (cb_file_description){
                content += div_cb_file_description;
                var encoded_description = " " + encodeURIComponent(cb_file_description);
            }
            content += '</div>';
            content += '<hr class="pp_cb_item_spacer">';
            content += '<div class="pp_cb_item_actionbuttons">';
            content += '<button class="pp_cb_item_button pp_cb_item_downloadbutton pp-transition" onclick="clickDownloadColorbox(\'' + uploadid + '\',\'' + download_track_url + '\',\'' + fileUrl + '\');">Download</button>';
            if (showAddthis == 1) {
                content += '<div class="pp_cb_shareus_container">';
                content += '<div class="addthis_toolbox addthis_default_style addthis_32x32_style">';
                content += '<a class="addthis_button_twitter" addthis:url="' + fileUrl + '" addthis:title="' + encoded_title + encoded_description + '"></a>';
                content += '<a class="addthis_button_linkedin" addthis:url="' + fileUrl + '" addthis:title="' + encoded_title + encoded_description + " " + fileUrl + '"></a>';
                content += '<a class="addthis_button_google_plusone_share" addthis:url="' + fileUrl + '" addthis:title="' + encoded_title + encoded_description + '"></a>';
                content += '<a class="addthis_button_compact" addthis:url="' + fileUrl + '" addthis:title="' + encoded_title + encoded_description + '"></a>';
                content += '</div>';
                content += '</div>';
            }
            content += '</div>';

            return content;
        },
        onOpen : function() {
            pp_colorbox_lastFocus = document.activeElement;
        },
        onClosed : function() {
            pp_colorbox_lastFocus.focus();
        },
        onComplete : function() {
            ppColorboxComplete();
        }
    });
}

function parseUrlDescription(){

    function urlify(text) {

        var urlRegex = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
        return text.replace(urlRegex, function(url) {
            return '<a target="_blank" href="' + url + '">' + url + '</a>';
        })
    }

    var decription = pp_jquery('.pp_cb_item_description').text();
    pp_jquery('.pp_cb_item_description').html(urlify(decription));

}

/**
 * check if it is a valid phone
 */
function validateEmail(email)
{
    var emailTest = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailTest.test(email) !== false;
}

/**
 * check if it is a valid phone
 */
function validatePhone(phone)
{
    var phoneTest = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    return phoneTest.test(phone) !== false;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
function validateRequiredField(value)
{
    return value !== "";
}

/**
 *
 * @param $elem
 * @returns {boolean}
 */
function validateRequiredRadioAndCheckbox($elem)
{
    // first get this element's name
    var elemName = $elem.attr('name');
    // now find all elements with the same name and no value
    var allSiblings = pp_jquery('input[name="' + elemName + '"]:checked');

    return (allSiblings.length >= 1);
}

/**
 * Execute the validation check and submit if valid
 */
function processForm(e) {

    // reset all form errors
    pp_jquery('.form_error_title').text("");

    var formIsValid = true;
    pp_jquery('#formfeedback input, #formfeedback textarea,  #formfeedback select').each(function () {

        var inputValue = pp_jquery(this).val();
        var inputType  = pp_jquery(this).attr('type') ? pp_jquery(this).attr('type') : pp_jquery(this).prop('nodeName');
        var inputLabel = pp_jquery(this).closest('.formitem_wrapper').find('.td_form_title > label').text().replace(': *', '');

        if (pp_jquery(this).hasClass('form_input_required')) {
            switch(inputType){
                // upper case (nodeName)
                case "TEXTAREA":
                case "SELECT":
                case "text":
                default:
                    if(!validateRequiredField(inputValue)) {
                        formIsValid = false;
                        pp_jquery(this).prev('.form_error_title').append('<strong>' + errorTexts.required + '</strong><br />').show();
                    }
                    break
                case "radio":
                case "checkbox":
                    if(!validateRequiredRadioAndCheckbox(pp_jquery(this))) {
                        formIsValid = false;
                        // don't append, it's multiple checkboxes
                        pp_jquery(this).closest('.formitem_wrapper').find('.form_error_title').html('<strong>' + errorTexts.required + '</strong><br />').show();
                    }
                    break;
            }
        }

        // Check for phone and e-mail validations.
        // Only if the value isn't empty
        if(inputValue.trim() != '') {
            if (pp_jquery(this).hasClass('form_input_phone') && !validatePhone(inputValue)) {
                pp_jquery(this).prev('.form_error_title').append('<strong>' + errorTexts.phone + '</strong><br />').show();
                formIsValid = false;

            }
            if (pp_jquery(this).hasClass('form_input_email') && !validateEmail(inputValue)) {
                pp_jquery(this).prev('.form_error_title').append('<strong>' + errorTexts.email + '</strong><br />').show();
                formIsValid = false;

            }
        }

    });
    // all good? let's GO!
    if(formIsValid) {
        return true;
    }
    // nope, cancel event
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
    return false;
}

/**
 * limits the amount of characters inside a text input or textarea blocking the user to input more
 * @param  inputType jQuery Object of a text input or textarea
 * @param  maxChar amount we want to limit the user
 * @return True
 */
function inputCharCountValidation(targetInput, maxChar) {
    var inputVal = targetInput.val();
    var inputCharAmount = inputVal.length;

    if (inputCharAmount >= maxChar) {
        inputVal = inputVal.substring(0, maxChar);
        targetInput.val(inputVal);
    }
}


pp_jquery(document).ready(function ($) {

    var nextCommentsPage = $('.reactions_pagination .showMore').data('nextpage');
    var commentsPerPage  = $('.reactions_pagination .showMore').data('perpage');

    //Custom form module
    $('#formfeedback form').on('submit', processForm);

    $('#commentblock .comment_form_title textarea').on('keyup focusout', function() {
        inputCharCountValidation($(this), 10000);
    });

    $('#commentblock .comment_form_title #commenteremail').on('keyup focusout', function() {
        inputCharCountValidation($(this), 96);
    });

    $('#commentblock .comment_form_title #commentername').on('keyup focusout', function() {
        inputCharCountValidation($(this), 64);
    });

    $('.reactions_pagination .showMore').click(function(e) {
        e.preventDefault();

        if(!noMoreComments) {
            var endpoint = "//" + $(this).data('path') + "services/commentservice.php";
            $('.preloader').show();
            $.get(
                endpoint,
                {
                    next: nextCommentsPage,
                    from: 'newsroom',
                    pageId: $(this).data('pageid'),
                    pageType: $(this).data('pagetype'),
                    clientId: $(this).data('clientid')
                },
                loadMoreComments,
                'html'
            );
            nextCommentsPage++;
        }

    });
    
    //save last focussed element before opening addthis modal.
    $('.addthis_button_more').on('click', function() {
        pp_addthis_lastFocus = document.activeElement;
    });

});

