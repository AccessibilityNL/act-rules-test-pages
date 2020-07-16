define([
  'jquery',
  // './modules/FgrVideoPlayerNew',
  './modules/SearchGroups',
  './modules/AudienceTabs',
  './modules/Analytics',
  'overheidsmediaplayer'],
  function ($,
    // FgrVideoPlayerNew,
    SearchGroups,
    AudienceTabs,
    Analytics,
    overheidsmediaplayer) {

    function FgrHomepage() {

      var videoSwitcher = {
        triggers: [],
        init: function () {
          this.triggers = $('.js-video-switcher [data-video]').on('click', $.proxy(this.handleClick, this));
          this.setActive($(this.triggers[0]));
        },
        setActive: function ($el) {
          this.setTriggerActive($el);
          this.showVideo($el.attr('data-video'));
        },
        handleClick: function (evt) {
          evt.preventDefault();
          var videos = $('.block-audio-video video');
          videos.each(function (index, node) {
            node.stop();
          });
          var $target = $(evt.currentTarget);
          this.setActive($target);
        },
        setTriggerActive: function ($el) {
          this.triggers.removeClass('active');
          $el.addClass('active');
        },
        showVideo: function (id) {
          $('.js-video-switcher-target').addClass('hidden');
          $('#' + id).removeClass('hidden');
        }
      }

      if ($('.js-fgr-homepage').length > 0) {
        // tabs fgr audience content
        AudienceTabs();

        // Search jobStructuregroups on homepage for deeplinking to detail page in flash/html application
        SearchGroups();

        videoSwitcher.init();

      }

      // Analytics event tracking (also tracks outside homepage)
      Analytics();
    }
    return FgrHomepage;
  }
);
