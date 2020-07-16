if(!window.wingsScriptLoaded){
    window.wingsScriptLoaded = true;

    //this is a copy from cookies.js
    var COOKIE_COUNTRY_CODE = "_country";
    var COOKIE_LANGUAGE_CODE = "_language";
    var COOKIE_ORIGIN_CODE = "_origin";
    var COOKIE_INFO_CODE = "_info";
    var COOKIE_ACK_CODE = "_cookie";
    var COOKIE_SSO_CODE = "NEW_SAS_SSO_LOGGEDIN";
    var COOKIE_DARK_SITE = "_crisis";
    var COOKIE_PATH = "/";
    var COOKIE_USER_PERSISTENCE = 63072000;
    var COOKIE_SESSION_PERSISTENCE = 0;
    var COOKIE_OAUTH_TOKEN = "LOGIN_AUTH";
    var COOKIE_PROFILE_ID = "PROFILE_ID";
    var COOKIE_CUSTOMER_DNA="_dna";
    var wingsCookiesUtil = {
        
        /** Setters **/

         writeCookie : function(cookieName, cookieValue, cookiePersistence){

            if(cookiePersistence == COOKIE_USER_PERSISTENCE){
                document.cookie =
                    cookieName + "=" + encodeURIComponent(cookieValue) +
                    "; max-age=" + cookiePersistence +
                    "; path=/" ;
            } else {
                        document.cookie =
                    cookieName + "=" + encodeURIComponent(cookieValue) +
                    "; path=/" ;
            }
        },   

         writeLanguageCookie : function(languageCode) {
            /*
            document.cookie =
                          COOKIE_LANGUAGE_CODE + "=" + encodeURIComponent(languageCode) +
                          "; max-age=" + COOKIE_USER_PERSISTENCE +
                          "; path=/" ;
                */
                //writeCookie(COOKIE_LANGUAGE_CODE, languageCode, COOKIE_USER_PERSISTENCE);
        },

         writeCountryCookie : function(countryCode){
            //writeCookie(COOKIE_COUNTRY_CODE, countryCode, COOKIE_USER_PERSISTENCE);
        },

         writeOriginCookie : function(originCode){
            this.writeCookie(COOKIE_ORIGIN_CODE, originCode, COOKIE_USER_PERSISTENCE);
        },

         saveInfoCookie : function(){
                this.writeCookie(COOKIE_INFO_CODE, "acknowledged", COOKIE_SESSION_PERSISTENCE);
        },

         writeAckCookie : function(){
            this.writeCookie(COOKIE_ACK_CODE, "acknowledged", COOKIE_USER_PERSISTENCE);
        },

         writeDarkSiteCookie : function(){
            this.writeCookie(COOKIE_DARK_SITE, "acknowledged", COOKIE_SESSION_PERSISTENCE);
        },

         writeCustomerDNACookie : function(customerDNA){
            this.writeCookie(COOKIE_CUSTOMER_DNA, customerDNA, COOKIE_USER_PERSISTENCE);
        },
        /*
         writeOAuthCookie : function(oauthToken){
            writeCookie(COOKIE_OAUTH_TOKEN, oauthToken, COOKIE_USER_PERSISTENCE);
        }
        */
        /** Getters **/

         getCountryCookie : function() {
            var cookie_string = this.getCookie(COOKIE_COUNTRY_CODE);
            return cookie_string;
        },

         getLanguageCookie : function() {
            var cookie_string = this.getCookie(COOKIE_LANGUAGE_CODE);
            return cookie_string;
        },

         getOriginCookie : function() {
            var cookie_string = this.getCookie(COOKIE_ORIGIN_CODE);
            
            // Added for backward compat: because user may disallow cookie
            if(cookie_string == null) {
                cookie_string = $(".countryName").attr("data-org-code");    
            }

            return cookie_string;
        },
         getInfoCookie : function() {
            var cookie_string = this.getCookie(COOKIE_INFO_CODE);
            return cookie_string;
        },

         getAckCookie : function() {
            var cookie_string = this.getCookie(COOKIE_ACK_CODE);
            return cookie_string;
        },

         getSSOCookie : function() {
            var cookie_string = this.getCookie(COOKIE_SSO_CODE);
            return cookie_string;
        },

         getDarkSiteCookie : function() {
            var cookie_string = this.getCookie(COOKIE_DARK_SITE);
            //alert(cookie_string);
            return cookie_string;
        },

         getOAuthCookie : function(){
            var cookie_string = this.getCookie(COOKIE_OAUTH_TOKEN);
            return cookie_string;
        },

         getProfileCookie : function() {
            var cookie_string = this.getCookie(COOKIE_PROFILE_ID);
            return cookie_string;
        },

          getCustomerDNACookie : function(){
            var cookie_string = this.getCookie(COOKIE_CUSTOMER_DNA);
            return cookie_string; 
        },

         getCookie : function ( cookie_name ){
                var re = new RegExp(cookie_name + "=([^;]+)");
                    var value = re.exec(document.cookie);
                    return (value != null) ? unescape(value[1]) : null;
        }
    }


    /* start of check-in widget */

    var wingsComponent = {
        init : function() {
            var thisObj = this;

            $(".checkin-reservation-wrapper")
            .each(
                function() {
                    var currObj = $(this);
                    var defaultOfferElem = null;

                    if(currObj.attr("render-flag") && currObj.attr("render-flag") == "true"){
                        console.log("rendered");
                        return;
                    }
                    currObj.attr("render-flag", "true");

                    var pnrNumber = window.psgPnrNo;// || "2XGD7B"; //TODO - remove

                    if(pnrNumber){
                        defaultOfferElem = currObj.find(".offer-sales-component");
                        currObj.find(".offer-sales-component").remove();
                        currObj = currObj.find(".reservation-component");
                    }else{
                        currObj.find(".reservation-component").remove();
                        currObj = currObj.find(".offer-sales-component");
                    }

                    var requestData = personalisationObjWings.getRequestData(currObj, null, pnrNumber);

                    var hasBgColor = currObj.attr("data-bgcolor");
                    var isTextBgColor = currObj.attr("data-textBgColor");
                    
                    
                    if(!hasBgColor || (hasBgColor && isTextBgColor)){
                        personalisationObjWings.setBackgroundImg(currObj.parent());
                        if(hasBgColor && isTextBgColor){
                            personalisationObjWings.setTextBgColor(currObj);
                        }
                    }

                    if (requestData) {

                        //personalisationObjWings.doPost(personalisationObjWings.offerServiceURL(), requestData, renderResponse);
                        personalisationObjWings.doPostRequest(personalisationObjWings.offerServiceURL(), requestData, renderResponse, handleError, currObj.attr("data-sync"));

                        function renderResponse(data) {
                            var offer = data.offerInfo[0];
                            personalisationObjWings.isDuplicateOfferCode(offer["offerCode"]);

                            if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                personalisationObjWings.getPersonalisationImgPath(offer["offerCode"], currObj);
                            }

                            currObj.find(".top-content h2").text(offer["shortTitle"]);
                            currObj.find(".top-content h2").attr('aria-label',offer["shortTitle"]);
                            //currObj.find(".top-content h4").text(offer["offerName"]);
                            currObj.find("a")[0].href = offer["cta"];
                            //currObj.find("a")[0].title = offer["shortTitle"];
                            currObj.find("a").attr('aria-label',offer["shortTitle"]);

                            var target = personalisationObjWings.getTarget(offer["offerProdType"]);
                            if(target){
                                currObj.find("a")[0].target = target;
                            }


                            if(hasBgColor && isTextBgColor){
                                personalisationObjWings.setTextBgColor(currObj);
                            }
                        };

                        function handleError() {
                            if(pnrNumber && defaultOfferElem){
                                currObj.replaceWith(defaultOfferElem);
                                currObj = defaultOfferElem;
                                currObj[0].style.display = 'block';

                                var hasBgColor = currObj.attr("data-bgcolor");
                                var isTextBgColor = currObj.attr("data-textBgColor");
                                
                                if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                    personalisationObjWings.setBackgroundImg(currObj.parent());
                                    if(hasBgColor && isTextBgColor){
                                        personalisationObjWings.setTextBgColor(currObj);
                                    }
                                }


                                var newRequestData = personalisationObjWings.getRequestData(currObj, "");

                                if(newRequestData){

                                    function renderFallBackResponse(data) {

                                        var offer = data.offerInfo[0];
                                        personalisationObjWings.isDuplicateOfferCode(offer["offerCode"]);

                                        if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                            personalisationObjWings.getPersonalisationImgPath(offer["offerCode"], currObj);
                                        }

                                        currObj.find(".top-content h2").text(offer["shortTitle"]);
                                        currObj.find(".top-content h2").attr('aria-label',offer["shortTitle"]);
                                        //currObj.find(".top-content h4").text(offer["offerName"]);
                                        currObj.find("a")[0].href = offer["cta"];
                                        //currObj.find("a")[0].title = offer["shortTitle"];
                                        currObj.find("a").attr('aria-label',offer["shortTitle"]);

                                        var target = personalisationObjWings.getTarget(offer["offerProdType"]);
                                        if(target){
                                            currObj.find("a")[0].target = target;
                                        }


                                        if(hasBgColor && isTextBgColor){
                                            personalisationObjWings.setTextBgColor(currObj);
                                        }
                                    };

                                    function handleFallBackError(){
                                    };

                                    personalisationObjWings.doPostRequest(personalisationObjWings.offerServiceURL(), newRequestData, renderFallBackResponse, handleFallBackError, currObj.attr("data-sync"));
                                }

                            }

                        }
                    }

            });
        }
    }

    /* start of check-in mobile widget */

    var wingsMobileComponent = {
        init : function() {
            $(".checkin-mobile-reservation-wrapper")
            .each(
                function() {
                    var currObj = $(this);
                    var defaultOfferElem = null;

                    if(currObj.attr("render-flag") && currObj.attr("render-flag") == "true"){
                        return;
                    }
                    currObj.attr("render-flag", "true");

                    var pnrNumber = window.psgPnrNo;// || "2XGD7B"; //TODO - remove
                    
                    if(pnrNumber){
                        defaultOfferElem = currObj.find(".offer-sales-component");
                        currObj.find(".offer-sales-component").remove();
                        currObj = currObj.find(".reservation-component");
                    }else{
                        currObj.find(".reservation-component").remove();
                        currObj = currObj.find(".offer-sales-component");
                    }

                    var requestData = personalisationObjWings.getRequestData(currObj, null, pnrNumber);

                    var hasBgColor = currObj.attr("data-bgcolor");
                    var isTextBgColor = currObj.attr("data-textBgColor");

                    if(!hasBgColor || (hasBgColor && isTextBgColor)){
                        personalisationObjWings.setBackgroundImg(currObj.parent());
                        if(hasBgColor && isTextBgColor){
                            personalisationObjWings.setTextBgColor(currObj);
                        }
                    }

                    if (requestData) {

                        //personalisationObjWings.doPost(personalisationObjWings.offerServiceURL(), requestData, renderResponse);
                        personalisationObjWings.doPostRequest(personalisationObjWings.offerServiceURL(), requestData, renderResponse, handleError, currObj.attr("data-sync"));

                        function renderResponse(data) {
                            var offer = data.offerInfo[0];
                            personalisationObjWings.isDuplicateOfferCode(offer["offerCode"]);

                            if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                personalisationObjWings.getPersonalisationImgPath(offer["offerCode"], currObj);
                            }

                            currObj.find(".top-content h2").text(offer["shortTitle"]);
                            //currObj.find(".top-content h4").text(offer["offerName"]);
                            currObj.find("a")[0].href = offer["cta"];
                            //currObj.find("a")[0].title = offer["shortTitle"];
                            currObj.find("a").attr('aria-label',offer["shortTitle"]);

                            var target = personalisationObjWings.getTarget(offer["offerProdType"]);
                            if(target){
                                currObj.find("a")[0].target = target;
                            }

                            if(hasBgColor && isTextBgColor){
                                personalisationObjWings.setTextBgColor(currObj);
                            }
                        };

                        function handleError() {
                            if(pnrNumber && defaultOfferElem){
                                currObj.replaceWith(defaultOfferElem);
                                currObj = defaultOfferElem;
                                currObj[0].style.display = 'block';

                                var hasBgColor = currObj.attr("data-bgcolor");
                                var isTextBgColor = currObj.attr("data-textBgColor");
                                
                                if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                    personalisationObjWings.setBackgroundImg(currObj.parent());
                                    if(hasBgColor && isTextBgColor){
                                        personalisationObjWings.setTextBgColor(currObj);
                                    }
                                }


                                var newRequestData = personalisationObjWings.getRequestData(currObj, "");

                                if(newRequestData){

                                    function renderFallBackResponse(data) {
                                        var offer = data.offerInfo[0];
                                        personalisationObjWings.isDuplicateOfferCode(offer["offerCode"]);

                                        if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                            personalisationObjWings.getPersonalisationImgPath(offer["offerCode"], currObj);
                                        }

                                        currObj.find(".top-content h2").text(offer["shortTitle"]);
                                        //currObj.find(".top-content h4").text(offer["offerName"]);
                                        currObj.find("a")[0].href = offer["cta"];
                                        //currObj.find("a")[0].title = offer["shortTitle"];
                                        currObj.find("a").attr('aria-label',offer["shortTitle"]);

                                        var target = personalisationObjWings.getTarget(offer["offerProdType"]);
                                        if(target){
                                            currObj.find("a")[0].target = target;
                                        }

                                        if(hasBgColor && isTextBgColor){
                                            personalisationObjWings.setTextBgColor(currObj);
                                        }
                                    };

                                    function handleFallBackError(){
                                    };

                                    personalisationObjWings.doPostRequest(personalisationObjWings.offerServiceURL(), newRequestData, renderFallBackResponse, handleFallBackError, currObj.attr("data-sync"));
                                }

                            }

                        }
                    }

            });
        }
    }


    /* start of common script for MMB banners */

    $(document).on("getOfferBanner", function(event, newOriginCode) {
        if(!personalisationObjWings.getCustomerIdFromCookie()){
            personalisationObjWings.callCustomerDna();
        } else {
            personalisationObjWings.renderedOfferCodes = [];
            wingsMobileComponent.init();
            wingsComponent.init();
        }

    });

    var personalisationObjWings = {
        renderedOfferCodes : [],


        localeHeader : function(){
            return (wingsCookiesUtil.getCookie(COOKIE_LANGUAGE_CODE) + '_' + wingsCookiesUtil.getCookie(COOKIE_COUNTRY_CODE));
        },

        offerServiceURL : function(){
            return (this.getApiHost()+"personalizedoffer/offers");
        },

        setBackgroundImg : function (currObj) {
            var imgObj = currObj.find(".offer-sales-swatch");
            var imageUrl = imgObj.attr("data-image-firstPart");
            var secondPart = imgObj.attr("data-image-secondPart");

            var viewportWidth = currObj.width();    

            if(secondPart == undefined || secondPart == null || secondPart == "") {
            }    else {
                imageUrl += ".img.";
                if(viewportWidth <= 320) {
                    imageUrl += "320.medium.";      
                } else if(viewportWidth <= 400) {
                    imageUrl += "400.medium.";      
                }  else if(viewportWidth <= 768) {
                    imageUrl += "768.medium.";      
                } else {
                    imageUrl += "1280.medium.";     
                }
                imageUrl += secondPart;
            } 

            var backgroundImgElem = currObj.find('.offer-background-img');
            if(!(backgroundImgElem[0] && backgroundImgElem[0].style && backgroundImgElem[0].style.backgroundSize  && backgroundImgElem[0].style.backgroundImage)){
                backgroundImgElem.css("background-image","url('" + imageUrl + "')");
                //backgroundImgElem.css("background-size", currObj.width() +"px "+ currObj.height()+ "px");
                backgroundImgElem.css("background-size", "cover");
                backgroundImgElem.css("background-position", "70% 50%");
            }
        },

        getRequestData : function (currObj, newOriginCode, pnr) {

            // var txnId = uniqueID();
            //var txnId = "";
            var channel = "Web";
            var customerId = this.getCustomerIdFromCookie();
            var strategy = (currObj.attr("data-strategy") == 'None' ? "" : (currObj.attr("data-strategy") || ""));
            var productType = (currObj.attr("data-productType") == 'None' ? "" : (currObj.attr("data-productType") || ""))
            var category = currObj.attr("data-programType") +';'+ strategy +';'+ productType;
            var maxOffers = currObj.attr("data-maxOffer") || "1";
            var themes = currObj.attr("data-theme") || "";
            var orgAirport = newOriginCode || wingsCookiesUtil.getCookie(COOKIE_ORIGIN_CODE);
            var market = wingsCookiesUtil.getCookie(COOKIE_COUNTRY_CODE);
            var tripType = currObj.attr("data-tripType") || "";

            if(!(customerId && category && category.indexOf(';') > 1)) {
                return null;
            }
            return {
                "transactionId": "",
                "channel" : channel,
                "customerId" : customerId,
                "pnr" : pnr,
                "category" : category,
                "maxOffers" : maxOffers,
                "themes" : themes,
                "orgAirport" : orgAirport,
                "market" : market,
                "tripType" : tripType,
                "language" : wingsCookiesUtil.getCookie(COOKIE_LANGUAGE_CODE)
            };
        },

        getCustomerIdFromCookie : function () {

            var dnaData=wingsCookiesUtil.getCookie(COOKIE_CUSTOMER_DNA);
            if(dnaData) {
                var dnaTokenArr=dnaData.split(',');
                var customerId=dnaTokenArr[2];

                return customerId;
            }
            return null;
        },

        getTarget : function (targetVal) {
            var sameWindowVals = ["Go", "Go-light", "Plus", "Business", "Plus and Business", "Go-light and Go", "Go-light, Go and Plus", "Meal", "X-bag", "Pre-seat"];

            var newWindowVals = ["Upgrade", "Hotel", "Transfer", "Car rental"]

            if(sameWindowVals.indexOf(targetVal) >= 0) {
                return "_top";
            } else if(newWindowVals.indexOf(targetVal) >= 0) {
                return "_blank";
            }
            return null;
        },

        getPersonalisationImgPath : function (offerCode, currObj) {
            /*if(offerCode && offerCode.indexOf(' ') >= 0) {
                var temp = offerCode.split(' ');
                offerCode = temp.join('');
            }*/
            
            if(offerCode) {
                offerCode = offerCode.replace(/[^a-zA-Z0-9 ]+/g, "").replace(/ /g,"-").toLowerCase();
            } else {
                return;
            }

            var url = '/bin/sas/searchAssetResults.'+offerCode+'.json';
            var data = "";
            
            var viewportWidth = currObj.width();
            var dimensions = '';
            if(viewportWidth <= 320) {
                dimensions += "400.250";      
            } else if(viewportWidth <= 768) {
                dimensions += "768.480";      
            } else {
                dimensions += "1280.800";     
            }

            this.doGet(url, data, function(data){

                var imageUrl = data.path;

                var imgPathPart1 = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
                var imgPathPart2 = imageUrl.substring(imageUrl.indexOf('.')+1);

                var adaptiveImgPath = [imgPathPart1, "reimage", dimensions, imgPathPart2];
                var backgroundImgElem = currObj.find(".offer-background-img");
                currObj.find(".offer-background-img").css("background-image","url('" + adaptiveImgPath.join('.') + "')");
                backgroundImgElem.css("background-image","url('" + adaptiveImgPath.join('.') + "')");
                backgroundImgElem.css("background-size", "cover");
                backgroundImgElem.css("background-position", "70% 50%");

            });
        },

        setTextBgColor : function (currObj) {
            var elems = ['h2'];
            var bgColor = currObj.attr("data-bgcolor");
            if(bgColor){
                elems.forEach(function(elem) {
                    var selectedElems = currObj.find(elem);
                    for(var i=0; i<selectedElems.length; i++) {
                        var txt = selectedElems[i].innerText;
                        if(selectedElems[i].innerHTML.indexOf('txtWithBgColor') < 0){
                            selectedElems[i].innerHTML="<span class='txtWithBgColor "+bgColor+"'>"+txt+"</span>"
                        }
                    }
                });
            }
        },

        isDuplicateOfferCode : function(offerCode) {
            if(this.renderedOfferCodes.indexOf(offerCode) > -1) {
                //return false;
            } else {
                this.renderedOfferCodes.push(offerCode);
                //return false;
            }
        },

        doGet : function(url, requestData, successCallBack) {
            var localeHeader = this.localeHeader();
            var thisObj = this;
            $.ajax({
                type: 'GET', 
                url: url,
                data : requestData,
                beforeSend : function(jqXHR, settings) {
                    jqXHR.setRequestHeader('Accept-Language', localeHeader);
                    jqXHR.setRequestHeader('Authorization', thisObj.getOAuthFromSession());
                },
                success : function(data, textStatus, jqXHR) {
                    successCallBack(data);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    // debugger;
                    console.log("Error fetching data for request : " +JSON.stringify(requestData) +", error thrown : "+ errorThrown);
                }
            });
        },

        doPostRequest : function(url, requestData, successCallBack, errorCallBack, syncFlag) {
            var cachedOffer = this.getOfferFromSession(requestData);
            if(cachedOffer && cachedOffer.offerInfo) {
                var translatedData = cachedOffer;
                for(var i=0; i<cachedOffer.offerInfo.length; i++){
                    var offer = cachedOffer.offerInfo[i]
                    translatedData.offerInfo[i] = this.applyInternationalization(offer);
                }
                
                successCallBack(translatedData);
                return;
            }

            if(syncFlag){
                this.doPostSync(url, requestData, successCallBack, errorCallBack);
            } else {
                this.doPost(url, requestData, successCallBack, errorCallBack);
            }
        },

        doPostSync : function(url, requestData, successCallBack, errorCallBack) {
            var localeHeader = this.localeHeader();
            var thisObj = this;
            $.ajax({
                type : "POST",
                url : url,
                async : false,
                contentType : "application/json",
                data : requestData,
                processData: false,
                beforeSend : function(jqXHR, settings) {
                    jqXHR.setRequestHeader('Accept-Language', localeHeader);
                    jqXHR.setRequestHeader('Authorization', thisObj.getOAuthFromSession());
                    var exclude = thisObj.renderedOfferCodes.join(',');
                    settings.data.exclude = exclude;
                    settings.data = JSON.stringify(settings.data);
                },
                success : function(data, textStatus, jqXHR) {
                    if(data.offerInfo) {
                        thisObj.storeOfferInSession(requestData, data);

                        var translatedData = data;
                        for(var i=0; i<data.offerInfo.length; i++){
                            var offer = data.offerInfo[i]
                            translatedData.offerInfo[i] = thisObj.applyInternationalization(offer);
                        }
                        
                        successCallBack(translatedData);
                    } else {
                        console.log("Error error in response : " +JSON.stringify(data));
                        if(errorCallBack) {
                            errorCallBack();
                        }
                    }
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    if(errorCallBack) {
                        errorCallBack();
                    }
                    // debugger;
                    console.log("Error fetching data for request : " +JSON.stringify(requestData) +", error thrown : "+ errorThrown);
                }
            });
        },

        doPost : function(url, requestData, successCallBack, errorCallBack) {
            var localeHeader = this.localeHeader();
            var thisObj = this;
            $.ajax({
                type : "POST",
                url : url,
                async : true,
                contentType : "application/json",
                data : JSON.stringify(requestData),
                beforeSend : function(jqXHR, settings) {
                    jqXHR.setRequestHeader('Accept-Language', localeHeader);
                    jqXHR.setRequestHeader('Authorization', thisObj.getOAuthFromSession());
                },
                success : function(data, textStatus, jqXHR) {
                    if(data.offerInfo) {
                        thisObj.storeOfferInSession(requestData, data);

                        var translatedData = data;
                        for(var i=0; i<data.offerInfo.length; i++){
                            var offer = data.offerInfo[i]
                            translatedData.offerInfo[i] = thisObj.applyInternationalization(offer);
                        }

                        successCallBack(translatedData);
                    } else {
                        console.log("Error error in response : " +JSON.stringify(data));
                        if(errorCallBack) {
                            errorCallBack();
                        }
                    }
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    if(errorCallBack) {
                        errorCallBack();
                    }
                    // debugger;
                    console.log("Error fetching data for request : " +JSON.stringify(requestData) +", error thrown : "+ errorThrown);
                }
            });
        },

        applyInternationalization: function(data) {

            if(data.shortTitle){
                data.shortTitle = this.translateOfferTitle(data.shortTitle);
            }

            if(data.mediumTitle){
                data.mediumTitle = this.translateOfferTitle(data.mediumTitle);
            }

            if(data.longTitle){
                data.longTitle = this.translateOfferTitle(data.longTitle);
            }

            if(data.destinationCity){
                data.destinationCity = this.translateCity(data.destinationCity);
            }

            if(data.originCity){
                data.originCity = this.translateCity(data.originCity);
            }

            var locale = 'en'; //this can be used to translate month rather than AEM transalate call
            if(data.homeboundDateOfTravel){
                var returnTravelDate = new Date(data.homeboundDateOfTravel);
                data.outboundDateOfTravelString = returnTravelDate.getDate() +" "+ this.translateMonth(returnTravelDate.toLocaleString(locale, { month: "short" }));
            }

            if(data.outboundDateOfTravel){
                var travelDate = new Date(data.outboundDateOfTravel);
                data.homeboundDateOfTravelString = travelDate.getDate() +" "+ this.translateMonth(travelDate.toLocaleString(locale, { month: "short" }));
            }

            return data;
        },

        translateOfferTitle:function(keyString){

            var key="title-";     
            keyString=keyString.trim().replace(/[^a-zA-Z0-9]+/g, "-");
            var keyLower=keyString.toLowerCase();       
            var keyValue=this.getDictFromSession(key+keyLower);

         return keyValue;

        },

        translateCity:function(keyMessage){

            var key="city-";
            keyString=keyMessage.trim().replace(/\s+/g, "-");
            var keyLower=keyString.toLowerCase();          
            var keyValue=this.getDictFromSession(key+keyLower);

            return keyValue;

        },

        translateMonth:function(month){

            var keyString="aem.marketing.vacPlanner.month-" + month.toLowerCase() + "-label";
            var keyValue=this.getDictFromSession(keyString);

            return keyValue;
        },
        
        storeOfferInSession: function(key, val){
            key = Object.values(key).sort().join().replace(/([ ,;])/g,'');
            if(!window.sessionStorage.bannerOffers){
                window.sessionStorage.setItem('bannerOffers', JSON.stringify({}));
            }
            var bannerOffers = JSON.parse(window.sessionStorage.bannerOffers);
            bannerOffers[key] = val;
            window.sessionStorage.setItem('bannerOffers', JSON.stringify(bannerOffers));
        },

        getOfferFromSession: function(key){
            if(window.sessionStorage.bannerOffers){
                key = Object.values(key).sort().join().replace(/([ ,;])/g,'');
                return JSON.parse(window.sessionStorage.bannerOffers)[key];
            } else {
                return null;
            }
            
        },

        getOAuthFromSession: function(){
            if(window.sessionStorage.OAUTH){
                return JSON.parse(window.sessionStorage.OAUTH)['access_token'];
            } else {
                return null;
            }
        },

        storeDictInSession: function(){
            var url = "/libs/cq/i18n/dict."+wingsCookiesUtil.getCookie(COOKIE_LANGUAGE_CODE)+".json";
            var keyName = "dict_"+wingsCookiesUtil.getCookie(COOKIE_LANGUAGE_CODE);

            this.doGet(url, "", function(data){
                if(!window.sessionStorage[keyName]){
                    window.sessionStorage.setItem(keyName, JSON.stringify(data));
                }
            });
        },

        getDictFromSession: function(key){
            var keyName = "dict_"+wingsCookiesUtil.getCookie(COOKIE_LANGUAGE_CODE);

            if(window.sessionStorage[keyName]){
                return JSON.parse(window.sessionStorage[keyName])[key] || key;
            } else {
                return key;
            }
            
        },

        getApiHost: function(){
			var apiPath = getWingsApiHost() || "https://api.flysas.com/";

            return apiPath;
        },

        clearOfferFromSession: function(){
            window.sessionStorage.setItem('bannerOffers', JSON.stringify({}));
        },

        callCustomerDna: function(){
            var customerDNAUrl=this.getApiHost()+"personalizedoffer/customerdna";
            var ssoCookie=wingsCookiesUtil.getSSOCookie();
            var ssoCookieArr=ssoCookie.split(',');
            var tokenArr=ssoCookieArr[0].split('=');
            var customerId=tokenArr[1];

            $.ajax({
                type: "POST",
                url: customerDNAUrl,
                data:JSON.stringify({
                    "transactionId": "",
                    "customerId": customerId
                }),
                contentType: "application/json",
                beforeSend : function(jqXHR, settings) {
                    jqXHR.setRequestHeader('Authorization', personalisationObjWings.getOAuthFromSession());
                },
                success: function(data) {
                    var pnr=data.upcomingBookingPnr || "";
                    var dnaDta=(data.tribe || "")+","+pnr+","+customerId;
                    wingsCookiesUtil.writeCustomerDNACookie(dnaDta);
                    $(document).trigger("getOfferBanner");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // debugger;
                    console.log("Personalisation : customer dna : Error fetching data : "+errorThrown+""+textStatus);
                }  
            });

        }

    };

    $( document ).on( "userSignedOut", function( event ) {
        personalisationObjWings.clearOfferFromSession();
    });

    personalisationObjWings.storeDictInSession();


    var ajaxTrackerFlag = true;
    $(document).ready(function() {
        if(document.cookie.indexOf("cq-authoring-mode")<0) {
            $( document ).ajaxStop(function() {
                if(ajaxTrackerFlag){
                    bannerTracker();
                    ajaxTrackerFlag = false;
                }
            });
        }
    });

    //banners related GTM tracking
    function bannerTracker(){

        var bannerSelectors=['.checkin-mobile-reservation-wrapper, .checkin-reservation-wrapper'];
        var elems = {};
        var sortedElements = [];
        var promotions = [];

        bannerSelectors.forEach(function(selector){
            var elemList = $(selector);
            Object.keys(elemList).forEach(function(index){
                if(parseInt(index) || parseInt(index) == 0){
                    var tempElem = elemList[index];
                    if(tempElem){
                        if(tempElem.offsetHeight == 0){
                            tempElem = $(tempElem).find('.inner')[0];
                        }

                        if(!elems[tempElem.offsetTop]){
                            elems[tempElem.offsetTop] = {};
                        }
                        elems[tempElem.offsetTop][tempElem.offsetLeft] = elemList[index];
                    }
                }
            });
        });

        var temp = Object.keys(elems)
        var sortedKeys = temp.map(function(val){
            return parseInt(val);
        });

        sortedKeys.forEach(function(index) {
            var childObj = elems[index];

            var temp = Object.keys(childObj)
            var sortedChildKeys = temp.map(function(val){
                return parseInt(val);
            });

            sortedChildKeys.forEach(function(childIndex) {
                var obj = {};
                var title = $(childObj[childIndex]).find("h2,h3,h4").first().text();
                if("undefined"===typeof title || 1>title.length){
                    title = "no text";
                }

                obj['campaignPropositionId'] = '';
                obj['campaignAssetId'] = '';

                obj['title'] = title;
                obj['elem'] = childObj[childIndex];
                var className = obj['elem'].className;
                if(className.indexOf('checkin-mobile-reservation-wrapper') >= 0){
                    obj['size'] = 'small';
                } else if(className.indexOf('checkin-reservation-wrapper') >= 0){
                    obj['size'] = 'medium';
                }

                obj['position'] = sortedElements.length + 1;

                var bannerName = "";
                if ($(obj['elem']).find('.inner').length > 0 ){
                    bannerName = $(obj['elem']).find('.inner').attr('data-banner-name');
                    bannerName = bannerName || "";
                }

                var href = "";
                if($(obj['elem']).find('a').length > 0){
                    href = $(obj['elem']).find('a')[0].href;
                    $(obj['elem']).find('a').on('click', onBannerClickCapture(obj));
                }

                if(href == "#" || href == "" || href == "#."){
                    href = window.location.origin + window.location.pathname;
                }
                if(href.indexOf('#') > 0){
                    href = href.substring(0, href.indexOf('#'));
                }

                obj['href'] = href;
                obj['manualName'] = bannerName;

                obj['propositionId'] = $(obj['elem']).attr('data-propositionId') || $(obj['elem']).find('.inner').attr('data-propositionId') || '';
                obj['assetId'] = $(obj['elem']).attr('data-assetId') || $(obj['elem']).find('.inner').attr('data-assetId') || '';
                
                //$(obj['elem']).on('click', onBannerClickCapture(obj));

                sortedElements.push(obj);

                var promoObj = {};
                promoObj['id'] = obj.href;
                promoObj['name'] = obj.title;
                promoObj['manualName'] = obj.manualName;
                promoObj['size'] = obj.size;
                promoObj['position'] = obj.position;
                promoObj['campaignPropositionId'] = obj.propositionId;
                promoObj['campaignAssetId'] = obj.assetId;
                promotions.push(promoObj);
            });
        });

        window.sasD360DataLayer = window.sasD360DataLayer || [];
        window.sasD360DataLayer.push({
            'event': 'promoView',
            'promotions': promotions
        });

    }

    function onBannerClickCapture(obj){
        return function(){
            window.sasD360DataLayer = window.sasD360DataLayer || [];
            window.sasD360DataLayer.push({
                'event': 'promoClick',
                'promotionClick.id': obj.href,
                'promotionClick.name': obj.title,
                'promotionClick.manualName': obj.manualName,
                'promotionClick.size': obj.size,
                'promotionClick.position': obj.position,
                'promotionClick.campaignPropositionId':obj.propositionId,
                'promotionClick.campaignAssetId':obj.assetId
            });
        }
    }

}


if(document.cookie.indexOf("cq-authoring-mode") >= 0) {
    $(document).on("ready", function(event) {
        Granite.I18n.setLocale(getLocale());
        personalisationObjWings.renderedOfferCodes = [];
        if(window.wingsComponent) wingsComponent.init();
        if(window.wingsMobileComponent) wingsMobileComponent.init();
        
        if(personalisationDialogReservationObj.programTypeList.length == 0){
            personalisationDialogObj.getReservationCategories();
        }
        if(personalisationDialogRecipientObj.programTypeList.length == 0){
            personalisationDialogObj.getRecipientCategories();
        }
        
        $('.checkin-mobile-reservation-wrapper').css('width','320px');
    });


    var personalisationDialogReservationObj = {
        programTypeList : [],

        strategyList : {},
        
        productTypeList : {},

        programFieldName : "./reservationProgramType", 

        strategyFieldName : "./reservationStrategy", 

        productTypeFieldName : "./reservationProductType",

        programLoadEvent : function(comp){ 
            personalisationDialogObj.programLoadEvent(comp, this);
        },


        programChangeEvent : function(comp,val) {
            personalisationDialogObj.programChangeEvent(comp, val, this);
        },

        strategyLoadEvent : function(comp) {
            personalisationDialogObj.strategyLoadEvent(comp, this);
        },

        strategyChangeEvent : function(comp,val) {
            personalisationDialogObj.strategyChangeEvent(comp, val, this);
        }
    };

    var personalisationDialogRecipientObj = {
        programTypeList : [],

        strategyList : {},
        
        productTypeList : {},

        programFieldName : "./programType", 

        strategyFieldName : "./strategy", 

        productTypeFieldName : "./productType",

        programLoadEvent : function(comp){ 
            personalisationDialogObj.programLoadEvent(comp, this);
        },


        programChangeEvent : function(comp,val) {
            personalisationDialogObj.programChangeEvent(comp, val, this);
        },

        strategyLoadEvent : function(comp) {
            personalisationDialogObj.strategyLoadEvent(comp, this);
        },

        strategyChangeEvent : function(comp,val) {
            personalisationDialogObj.strategyChangeEvent(comp, val, this);
        }
    };

    var personalisationDialogObj = {

        getReservationCategories : function(){
            var reservationCategoriesURL = personalisationObjWings.getApiHost()+"personalizedoffer/reservation/categories";
            //var reservationCategoriesURL = "https://apit.flysas.com/st4/personalizedoffer/reservation/categories";
            personalisationObjWings.doGet(reservationCategoriesURL, "", function(data){
                data.categories.forEach(function(item){
                    if(personalisationDialogReservationObj.programTypeList.indexOf(item.program) < 0){
                        personalisationDialogReservationObj.programTypeList.push(item.program);
                        personalisationDialogReservationObj.strategyList[item.program] = ['None'];
                    }

                    if(personalisationDialogReservationObj.strategyList[item.program].indexOf(item.strategy) < 0){
                        personalisationDialogReservationObj.strategyList[item.program].push(item.strategy);
                        personalisationDialogReservationObj.productTypeList[item.strategy] = ['None'];
                    }

                    if(personalisationDialogReservationObj.productTypeList[item.strategy].indexOf(item.productType) < 0){
                        personalisationDialogReservationObj.productTypeList[item.strategy].push(item.productType);
                    }
                });
            });
        },

        getRecipientCategories : function(){
            var recipientCategoriesURL=personalisationObjWings.getApiHost()+"personalizedoffer/recipient/categories";
            //var recipientCategoriesURL = "https://apit.flysas.com/st4/personalizedoffer/recipient/categories";
            personalisationObjWings.doGet(recipientCategoriesURL, "", function(data){
                data.categories.forEach(function(item){
                    if(personalisationDialogRecipientObj.programTypeList.indexOf(item.program) < 0){
                        personalisationDialogRecipientObj.programTypeList.push(item.program);
                        personalisationDialogRecipientObj.strategyList[item.program] = ['None'];
                    }

                    if(personalisationDialogRecipientObj.strategyList[item.program].indexOf(item.strategy) < 0){
                        personalisationDialogRecipientObj.strategyList[item.program].push(item.strategy);
                        personalisationDialogRecipientObj.productTypeList[item.strategy] = ['None'];
                    }

                    if(personalisationDialogRecipientObj.productTypeList[item.strategy].indexOf(item.productType) < 0){
                        personalisationDialogRecipientObj.productTypeList[item.strategy].push(item.productType);
                    }
                });
            });        
        },

        programLoadEvent : function(comp, obj){ 
            var dlg = comp.findParentByType("dialog");
            var contentData=CQ.HTTP.eval(CQ.HTTP.noCaching(dlg.path + '.infinity.json'));
            var programType = dlg.getField(obj.programFieldName);
            var programs = [];
            obj.programTypeList.forEach(function(item){
                var program = {};
                program['text'] = item;
                program['value'] = item;
                programs.push(program);
            });
            programType.setOptions(programs);

            var offerStrategy = dlg.getField(obj.strategyFieldName);
            var productType = dlg.getField(obj.productTypeFieldName)
            var val = programType.getValue();

            if(val == ""){
                if(contentData.programType){
                    val = contentData.programType;
                } else {
                    val = obj.programTypeList[0];
                }
                programType.setValue(val);
            }
            //programType.doLayout();

            if(obj.programTypeList.indexOf(val) >= 0){
                offerStrategy.show();
                var strategies = [];
                obj.strategyList[val].forEach(function(item){
                    var strategy = {};
                    strategy['text'] = item;
                    strategy['value'] = item;
                    strategies.push(strategy);
                });

                offerStrategy.setOptions(strategies);
                offerStrategy.doLayout();
            } else {
                offerStrategy.hide();
                offerStrategy.setValue('');
                productType.hide();
                productType.setValue('');
            }
        },

        programChangeEvent : function(comp,val, obj) {
            var dlg = comp.findParentByType("dialog");
            var offerStrategy = dlg.getField(obj.strategyFieldName);
            var productType = dlg.getField(obj.productTypeFieldName);

            if(obj.programTypeList.indexOf(val) >= 0){
                offerStrategy.show();
                offerStrategy.setValue('');
                productType.hide();
                productType.setValue('');

                var strategies = [];
                obj.strategyList[val].forEach(function(item){
                    var strategy = {};
                    strategy['text'] = item;
                    strategy['value'] = item;
                    strategies.push(strategy);
                });

                offerStrategy.setOptions(strategies);
                offerStrategy.doLayout();
                productType.doLayout();
            }else{
                offerStrategy.hide();
                offerStrategy.setValue('');
                productType.hide();
                productType.setValue('');
            }
        },

        strategyLoadEvent : function(comp, obj) {
            var dlg = comp.findParentByType("dialog");
            var offerStrategy = dlg.getField(obj.strategyFieldName);
            var offerProductType = dlg.getField(obj.productTypeFieldName);

            if(offerStrategy.value && offerStrategy.value != ""){
                offerProductType.show();
                var productTypes = [];
                obj.productTypeList[offerStrategy.value].forEach(function(item){
                    var productType = {};
                    productType['text'] = item;
                    productType['value'] = item;
                    productTypes.push(productType);
                });

                offerProductType.setOptions(productTypes);
                offerProductType.doLayout();

            } else {
                offerProductType.hide();
                offerProductType.setValue('');
            }
        },

         strategyChangeEvent : function(comp,val, obj) {
            var dlg = comp.findParentByType("dialog");
            var offerProductType = dlg.getField(obj.productTypeFieldName);

            if(Object.keys(obj.productTypeList).indexOf(val) > -1){
                offerProductType.show();

                var productTypes = [];
                obj.productTypeList[val].forEach(function(item){
                    var productType = {};
                    productType['text'] = item;
                    productType['value'] = item;
                    productTypes.push(productType);
                });

                offerProductType.setValue('');
                offerProductType.setOptions(productTypes);
                offerProductType.doLayout();

            } else {
                offerProductType.hide();
                offerProductType.setValue('');
            }
        }
    }
}