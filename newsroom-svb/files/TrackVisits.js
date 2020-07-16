TrackVisits = (function(pp_jquery) {

    var visitTypes = {
        'releasePageType': 'release',
        'releaseItemType' : 'release',
        'newsroomPageType' : 'newsroom',
        'newsroomItemType' : 'newsroom',
        'imageItemType' : 'displayimage',
        'downloadItemType': 'downloadfile',
    };

    var commonRequestData = {};
    var apiUrl = '';
    var persistEndpoint = 'track-visits';

    var init = function(data,dynamicData,pageTypeId, url) {
        pp_jquery.extend(true, commonRequestData, data, dynamicData);
        commonRequestData.trackVisits_pageType = pageTypeId;
        apiUrl = url;
    };

    var pageLoaded = function(itemTypeId) {
        var requestData = {};
        pp_jquery.extend(true, requestData, commonRequestData, {trackVisits_itemType : itemTypeId, trackVisits_itemId : commonRequestData.trackVisits_pageId});
        _persist(requestData);
    }

    var resourceClicked = function(itemTypeId,resourceId) {
        var requestData = {};
        pp_jquery.extend(true, requestData, commonRequestData, {trackVisits_itemType : itemTypeId, trackVisits_itemId : resourceId});
        _persist(requestData);
    }

    var _persist = function(requestData) {
        var url = apiUrl + persistEndpoint;

        pp_jquery.ajax({
            cache: false,
            type: "POST",
            data: {'data' : requestData},
            crossDomain : true,
            url: url,
            success: function(responseData) {
                //No action is required on success for now
            },
            error: function(jqXHR, textStatus) {
                //console.log(textStatus);
            }
        });

    };

    return {
        visitTypes: visitTypes,
        init: init,
        pageLoaded : pageLoaded,
        resourceClicked : resourceClicked
    };
})(pp_jquery);
