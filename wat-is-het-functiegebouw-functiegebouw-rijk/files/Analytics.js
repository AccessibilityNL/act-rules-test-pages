define(['jquery'], function($) {
  function Analytics() {

    $(document).on('click', '.js-fgr-button-track > a', function () {
      _gaq.push(['_trackEvent', 'button', 'geklikt', 'Direct aan de slag met het Functiegebouw', 0, false]);
    });

    $(document).on('click', '.js-fgr-news-track  > a', function () {
      _gaq.push(['_trackEvent', 'link', 'geklikt', 'Meer nieuws', 0, false]);
    });

    $(document).on('click', '.js-fgr-cta-html-track > a', function () {
      _gaq.push(['_trackEvent', 'link', 'geklikt', 'Naar html weergave', 0, false]);
    });

    $(document).on('click', '.js-return-top-track', function () {
      _gaq.push(['_trackEvent', 'link', 'geklikt', 'Terug naar boven', 0, false]);
    });

    $(document).on('click', '.js-fgr-download-track', function (evt) {
      _gaq.push(['_trackEvent', 'pdf', 'gedownload', evt.currentTarget.href.split('downloads/')[1], 0, false]);
    });

    $(document).on('click', '.js-banner-track', function () {
      _gaq.push(['_trackEvent', 'button', 'geklikt', 'Naar het functiegebouw', 0, false]);
    });

    var maxScrolled = 0;
    var scrollStage = 0;
    var stage = [25, 50, 70, 80, 90];
    function trackScrollDepth() {
      var clientHeight = window.innerHeight || document.documentElement.clientHeight;
      var totalScrollableHeight = document.body.offsetHeight - clientHeight;
      var scrollPercentage = Math.ceil($(window).scrollTop() / (totalScrollableHeight / 100));
      if (scrollPercentage > maxScrolled) {
        maxScrolled = scrollPercentage;
      }
      $.each(stage, function (key, stage) {
        if (maxScrolled > stage && scrollStage < stage) {
          scrollStage = stage;
          _gaq.push(['_trackEvent', 'Scroll_diepte', 'hoe_ver_gescrollt', stage.toString(), 0, false])
        }
      });
    }

    $(window).on('scroll', trackScrollDepth);

  }

  return Analytics;
});
