var ppHeadlinesReel = (function (pp_jquery) {
    var mediaTabs = function () {
        var mediaTab = pp_jquery(".ppNews-b .ppNews-n li");
        var mediaItem = pp_jquery(".ppNews-b .ppNews-content .ppNews-item");
        var slideTimer;
        mediaTab.each(function (index) {
            pp_jquery("> a", this).mouseover(function () {
                clearTimeout(slideTimer);
                slideTimer = setTimeout(function () {
                    var indexOld = pp_jquery(".ppNews-b .ppNews-n li.ppCurrent").index();
                    if (indexOld != index) {
                        pp_jquery(mediaItem[indexOld]).css('display', 'none').attr({
                            'aria-hidden': 'true',
                            'tabindex': '-1'
                        }).stop(true);
                        pp_jquery(mediaItem[index]).css('display', 'block').attr({
                            'aria-hidden': 'false',
                            'tabindex': '0'
                        });
                        mediaTab.removeClass("ppCurrent");
                        pp_jquery(mediaTab[index]).addClass("ppCurrent");
                    }
                });
            });
        });
    }
    
    var init = function () {
        mediaTabs();
        pp_jquery('.ppNews-item').not(':first-child').hide();
        pp_jquery('.ppNews-item:first-child').attr({
            'aria-hidden': 'false',
            'tabindex': 0
        });
    }
    
    return {
        init: init
    }
})(pp_jquery);
