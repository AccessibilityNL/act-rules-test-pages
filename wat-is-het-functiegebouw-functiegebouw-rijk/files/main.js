require(['config'], function (config) {
	var withConfig = require.config(config.requireJsConfig);
	withConfig([
		'jquery',
		'modules/Application',
		'modules/AccessibleTabs',
		'FgrHomepage'
	], function ($, Application, AccessibleTabs, FgrHomepage) {
		$(function () {
			new Application();
			new AccessibleTabs();
      new FgrHomepage();
		});

    $(function () {
      $(".storingsmelding .skipNotice").on("click", function (e) {
        e.preventDefault();
        var storingsmelder = this.parentNode;
        SetCookie('notification' + storingsmelder.id, "", 100);
        $(storingsmelder).hide();
      });
    });

    function SetCookie(cookieName,cookieValue,nDays) {
      var today = new Date();
      var expire = new Date();
      if (nDays==null || nDays==0) nDays=1;
      expire.setTime(today.getTime() + 3600000*24*nDays);
      document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
    }

  });
});
