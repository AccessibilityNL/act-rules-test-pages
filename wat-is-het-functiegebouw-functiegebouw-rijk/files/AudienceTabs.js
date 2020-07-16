define(['jquery'], function($) {

  $.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
  }

  function AudienceTabs() {

    var $audienceTabs = $(".js-tab-item");
    var $tabsContent = $(".js-tab-content");

    $audienceTabs.on('click', handleTabClick);
    $audienceTabs.enterKey(handleTabClick);

    setTabActive($audienceTabs.first(), false);

    function handleTabClick(evt) {
      evt.preventDefault();
      var $tab = $(evt.currentTarget);
      setTabActive($tab, true);
    }

    function setTabActive($tab, focus) {
      var tabId = $tab.attr('data-id');
      hideAlltabs();
      $tab.addClass('is-active');
      $('[data-tab-id="' + tabId + '"]').addClass('is-active');
      if (focus) {
        $('[data-tab-id="' + tabId + '"]').find('a')[0].focus();
      }
    }

    function hideAlltabs() {
      $audienceTabs.removeClass('is-active');
      $tabsContent.removeClass('is-active');
    }
  }

  return AudienceTabs;
});
