define(['jquery'], function($) {
  function SearchGroups() {
    function getJobStructureGroups() {
      var dfd = $.Deferred();

      var apiCall = $.ajax({
        url: '/api/v1/groups',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json'
      });

      apiCall.done(function (data) {
        dfd.resolve(data);
      });

      apiCall.fail(function () {
        dfd.reject();
      });

      return dfd.promise();
    }

    var searchJobStructureGroups = $('#search-jobStructureGroups')[0];
    if (typeof(searchJobStructureGroups) !== 'undefined' && searchJobStructureGroups !== null) {
      new Awesomplete(searchJobStructureGroups, {
        list: getGroupList()
      });
    }

    function getGroupList() {
      var data_arr = [];
      getJobStructureGroups().done(function(groups) {
        $.each(groups, function(index) {
          data_arr.push(groups[index].label);
        });
      });
      return data_arr;
    }

    window.addEventListener("awesomplete-selectcomplete", function() { // register api event
      var groupLabel =  $('.js-search-jobstructuregroup')[0].value;
      getJobStructureGroups().done(function(groups) {
        $.map(groups, function(group){
          if(group.label === groupLabel) {
            setFormAction(group.id);
            _gaq.push(['_trackEvent', 'functiegroep', 'ingevuld', groupLabel, 0, false]);
          }
        });
      });
    });

    $('.js-search-function-form').find('.btn-search').prop('disabled', true);

    function setFormAction(groupId) {
      var $formElement = $('.js-search-function-form');
      $formElement.find('.btn-search').prop('disabled', false);
      $formElement.attr('action', '/functiegebouw#/' + groupId);
      if(isMobileDevice()) {
        $formElement.attr('action', '/functiegebouw-html/functiegroep/' + groupId);
      }
    }

    function isMobileDevice() {
      var iDevices = ['iPad','iPhone', 'iPod'];
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }

      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return !!userAgent.match(/Android/i);
    }

  }

  return SearchGroups;
});
