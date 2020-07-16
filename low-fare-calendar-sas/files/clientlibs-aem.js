/******* Start of search functionality ****/
	$(document).ready(function() {

	    var suggestionUrl = "/bin/sas/searchSuggestions";
	    var resultsUrl = "/bin/sas/searchResults";
	    
		var searchOverlay = $("#searchOverlayParent");
		
		var heightSearchOverlay=$("#searchOverlayParent .overlaySearchContainer").height();
		
		var searchTextBase = $("#searchTextBase");
		var searchClose = $("#searchClose");
		var searchText = searchOverlay.find("#searchText");

        var objNoResults=searchOverlay.find('.resultsList .noResult'); 
        var objResultsLoadImg = searchOverlay.find('.resultsList .loaderImg');
        var objSuggestionsLoadImg = searchOverlay.find('.suggestionsList .loaderImg');

		$(".errorSearchBox #searchTextBase").on("click", function(e){
			searchOverlay = $(".errorSearchBox #searchOverlayParent");
			heightSearchOverlay=$(".errorSearchBox #searchOverlayParent .overlaySearchContainer").height();
			searchTextBase = $(".errorSearchBox #searchTextBase");
			searchClose = $(".errorSearchBox #searchClose");
			searchText = searchOverlay.find("#searchText");
            objNoResults=searchOverlay.find('.resultsList .noResult'); 
            objResultsLoadImg = searchOverlay.find('.resultsList .loaderImg');
            objSuggestionsLoadImg = searchOverlay.find('.suggestionsList .loaderImg');

            $(".errorSearchBox").css("opacity","1");
            e.stopPropagation();

            initSearchBox();
		});

		$("#searchTextBase").on("click", function(){
			searchOverlay = $("#searchOverlayParent");
			heightSearchOverlay=$("#searchOverlayParent .overlaySearchContainer").height();
			searchTextBase = $("#searchTextBase");
			searchClose = $("#searchClose");
			searchText = searchOverlay.find("#searchText");
            objNoResults=searchOverlay.find('.resultsList .noResult'); 
            objResultsLoadImg = searchOverlay.find('.resultsList .loaderImg');
            objSuggestionsLoadImg = searchOverlay.find('.suggestionsList .loaderImg');

            initSearchBox();
		});

        $(document).click(function(){ 
			if($("body").hasClass("modal-open")){
                $(".errorSearchBox").css("opacity","1");
            } else {
                $(".errorSearchBox").css("opacity","0.8");
            }
        });

        // To fix the defect of Search result lazy load on different browser resolution(50%-125%) 
       	var searchBoxContainerHeight=134;
		var avgSearchItemHeight=110;
       	var checkBatchSize=(heightSearchOverlay-searchBoxContainerHeight)/avgSearchItemHeight;

		var batchSize = Math.round(checkBatchSize)+1;

		//var batchSize=5;
	    var xResults = 0; 
	    var yResults = xResults + batchSize; 

	    var xSuggestions = 0; 
	    var ySuggestions = xSuggestions + batchSize; 

	    function searchInit() {
	        // Common search overlay initializations
	        searchOverlay.find('.overlaySearchContainer').off("scroll");
	        searchOverlay.find('.overlaySearchContainer').on("scroll");

			suggestionsInit();			
			resultsInit();			
			faqInit();	        
	    }

		function faqInit() {
			searchOverlay.find(".faqContainer > .faqPlaceHolder").trigger("initialize");			
		}

		function resultsInit() {
			// Hide the results area and remove all search results
	        searchOverlay.find(".resultsItem").remove();
	        searchOverlay.find(".resultsHolder").hide();
            searchOverlay.find(".faqContainer").hide();

			objResultsLoadImg.find("img").hide();
			objResultsLoadImg.find("span").hide();
            objNoResults.find("span").hide(); 
		}

		function suggestionsInit() {
			// Hide the suggestions area and empty the suggestions list
			searchOverlay.find('.suggestionsHolder .suggestionTitle').addClass('hide-element');
			searchOverlay.find(".suggestionsItem").remove();
			searchOverlay.find(".suggestionsHolder").hide();

			objSuggestionsLoadImg.find("img").hide();
			objSuggestionsLoadImg.find("span").hide();			
		}

	    function showOverlaySearch(searchTerm) {
            // Initialize a few things
	        //searchOverlay.css("margin-top", $(window).scrollTop());
            searchOverlay.css("margin-top", "0px");
            searchText.val((searchTerm == null) ? "" : searchTerm);
	        searchInit();

	        searchOverlay.show();
	        //searchOverlay.find("#searchText").focus();
	        $("body").toggleClass("modal-open");
	    }


	    ////// Showing search suggestions 

	    function keyUpHandler(event) {
            var term = searchText.val();
			if (term == "") {
				searchOverlay.find(".search-btn").css("background-color","#E1E2E9");
			} else {
				searchOverlay.find(".search-btn").css("background-color","#0069c3");
			}  

	        searchInit();	

            searchOverlay.find(".suggestionsHolder").show();
            searchOverlay.find('.suggestionsHolder .suggestionTitle').removeClass('hide-element');
            objSuggestionsLoadImg.show();
            objSuggestionsLoadImg.find("img").show();
            var term = searchText.val();
            var country = getCountryCode();
            var language = getLanguageCode();
            
            if (term == "") {
                suggestionsInit();
            } else {
                $.ajax({
                    type: "GET",
                    data:
                    {
                        "countryCode": country,
                        "languageCode": language,
                        "fulltext": term
                    },
                    url: suggestionUrl,
                    contentType: "application/json",
                    success: suggestionsHandler
                });
                
            }
	    }

	    function suggestionsHandler(data) {
	        var tempData = data;
	        var json = tempData;//.suggestions;	// Arnab
	        xSuggestions = 0;
	        ySuggestions = xSuggestions + batchSize;
	        populateSuggestions(json);
	    }

	    function populateSuggestions(json) {
            // Get a handle to the suggestions place holder
	        var objUl = searchOverlay.find('.suggestionsList');

	        searchOverlay.find(".suggestionsHolder .suggestionTitle").removeClass('hide-element');

			objSuggestionsLoadImg.find('img').hide();

			if(json.length == 0){

                objSuggestionsLoadImg.find('span').show();

            }else if (ySuggestions >= json.length + batchSize) {

	            objSuggestionsLoadImg.find('span').show();

                $(".overlaySearchContainer").unbind(); 

	        } else {

	            // Iterate over the JSON to prepare the suggestion items

	            $.each(json.slice(xSuggestions, ySuggestions), function(key, val) {
	                var objLi = $('<li class="suggestionsItem"></li>');
	                var objAnchor = $('<a></a>');

                    objAnchor.html(val.term);

	                objLi.append(objAnchor);
	                objUl.find(".loaderImg").before(objLi);
	            });
                searchOverlay.find(".suggestionsItem").on("click", suggestionItemSearch);

	            xSuggestions = xSuggestions + batchSize;
	            ySuggestions = ySuggestions + batchSize;

	            //highlightSearch();		// Arnab: Need to check how this works with AEM


                if(json.length > batchSize){
	            	scrollSuggestionView(json);
                }

	        }
	    }

	    //on scroll down to show the load image 
	    function scrollSuggestionView(json) {
            $(".overlaySearchContainer").bind({'mousewheel DOMMouseScroll onmousewheel touchmove scroll': 
                function(e) {

                //Determine Direction
                    if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
                    //Up
                        //console.log("up");

                    } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
                    //Up
                        //console.log("up");

                    } else {
                    //Down
                        //console.log("down");
                        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                            objSuggestionsLoadImg.find('img').show();
                            objSuggestionsLoadImg.find('span').hide();
                            window.setTimeout(function() {
                                populateSuggestions(json);
                            }, 1000);

	            		}
                    }
                 }
            });
	    }

	    ////// End of Showing search suggestions 



	    ////// Showing search results 

	    function showResults() {
	        searchInit();

	        var term = searchText.val();
            var country = getCountryCode();
        	var language = getLanguageCode();
	        if (term != "") {
	            // Show the search area
	            searchOverlay.find(".resultsHolder").show();
                objResultsLoadImg.show();
                objResultsLoadImg.find("img").show();

	            // Call CMS search
	            $.ajax({
	                type: "GET",
	                  data: 
                     {
                            "countryCode": country,
                            "languageCode": language,
                            "fulltext": term
            		  },
	                url: resultsUrl,
	                contentType: "application/json",
	                success: resultsHandler
	            });

	            // Call FAQ 
	            // Trigger event on the faqPlaceHolder passing the term as parameter
				searchOverlay.find(".faqContainer > .faqPlaceHolder").trigger("search", [term]);

	        }
	    }

		function tagSearch(e) {
			// Get the tag item
			var tagItem = $(this);

			// Change search text
			searchText.val(tagItem.text());

            showResults();
		} 

        function suggestionItemSearch(e) {
			// Get the suggestion item
			var suggestionItem = $(this);

			// Change search text
			searchText.val(suggestionItem.find("a").text());

            showResults();
		} 


	    function resultsHandler(data) {
	        var tempData = data;
	        var json = tempData.hits;
            var count=tempData.totalMatches; 
	        xResults = 0;
	        yResults = xResults + batchSize;
	        if(count<=0){
                //console.log("matches is :"+count);
				objNoResults.find("span").show();
                objResultsLoadImg.find("img").hide();
            }
            else{
				populateResults(json);
            } 
	    }

	    // this function ought to be called for infinite scroll as well
	    function populateResults(json) {
            var objUlDummy = $('<ul></ul>');

            objResultsLoadImg.find('img').hide();
            if(json.length == 0){

            } else if (yResults >= json.length + batchSize) {

                objResultsLoadImg.find('span').show();
				$(".overlaySearchContainer").unbind(); 

	        } else {

	            // Iterate over the JSON to prepare the result items

	            $.each(json.slice(xResults, yResults), function(key, val) {
	                var objLi = $('<li class="resultsItem"></li>');
	                var objDiv = $('<div class="searchInfoHead"></div>');
	                var objAnchor = $('<a class="searchInfoTitle"></a>');
	                var objPara = $('<div class="searchResult"></div>');	
	                var objDivtags = $('<div class="tagLink"><span class="tags">Tags</span></div>');

					objDiv.text(val.category);
	                objAnchor.text(val.title);
	                objAnchor.attr("href", val.link);
                    objAnchor.attr("aria-label", val.title);
	                objPara.html(val.excerpt);		

	                objLi.append(objDiv);
	                objLi.append(objAnchor);
	                objLi.append(objPara);

	                var len = $.map(val.tags, function(n, i) {
	                    return i;
	                }).length;
	                var i = 1;
	                $.each(val.tags, function(key, val) {
                        var objTagAnchor = $('<a href="javascript:;" class="tagTitle"></a>');

	                    objTagAnchor.text(key);
						objTagAnchor.attr("data-tag-id",val);
                        objTagAnchor.attr("aria-label",key);

						objDivtags.append(objTagAnchor);
	                    if (i < len) {
	                        objDivtags.append(", ");
	                    }
	                    objLi.append(objDivtags);

	                    i++;
	                });
	                objUlDummy.append(objLi);

	            });

				// Increase the start and end index
	            xResults = xResults + batchSize;
	            yResults = yResults + batchSize;

	            //highlightSearch();
                if(json.length > batchSize){
	            	scrollResultView(json);
                }
	        }



			// Insert the html prepared above 
	        if (searchOverlay.find("li[class=\"resultsItem\"]").length <= 0) {
	            // if no resultsItem exist, after the faqContainer 
	            searchOverlay.find(".faqContainer").after(objUlDummy.html());
	        } else {
				// else after the last resultsItem
	            var ele = searchOverlay.find("li[class=\"resultsItem\"]").last();
	            ele.after(objUlDummy.html());
	        }

			// register click event on the tags
			searchOverlay.find(".tagTitle").on("click", tagSearch);

	    }

		//on scroll down to show the load image 
	    function scrollResultView(json) {
             $(".overlaySearchContainer").bind({'mousewheel DOMMouseScroll onmousewheel touchmove scroll': 
                function(e) {

                //Determine Direction
                    if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
                    //Up
                        //console.log("up");

                    } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
                    //Up
                        //console.log("up");

                    } else {
                    //Down
                        //console.log("down");
                        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                            objResultsLoadImg.find('img').show();
                            objResultsLoadImg.find('span').hide();
                            window.setTimeout(function() {
                                populateResults(json);
                            }, 1000);

                        }
                    }
                 }
            });

	    }



	    ////// End of Showing search results 




	    //to find the related content in displayed result 
	    function highlightSearch() {
	        var ul = $(".suggestionsList");
	        $(ul).find("li a").each(function() {
	            applyHighlight(searchText.val(), $(this), "searchHighlight");
	        });
	        $(ul).find("li p").each(function() {
	            applyHighlight(searchText.val(), $(this), "searchHighlight");
	        });
	    }


	    //to highlight the related content in displayed result 
	    function applyHighlight(word, element, className) {
	        var regex = new RegExp(word, "i");
	        var pageText = element.text().replace("<span>", "").replace("</span>");
	        var searchedText = word;
	        var theRegEx = new RegExp("(" + searchedText + ")", "igm");
	        newHtml = pageText.replace(theRegEx, '<span class="' + className + '">$1</span>');
	        if (element.text().search(regex) < 0) {
	            //do nothing
	        } else {
	            element.html(newHtml);
	        }
	    }


	    function closeOverlaySearch() {
	        searchOverlay.hide();
	        $("body").removeClass("modal-open");
            $(".errorSearchBox").css("opacity","0.8");
	    }


		var timer = 0;

        function showOverlayFromBase() {
			showOverlaySearch(searchTextBase.val());
           	searchTextBase.val("");
            showResults();
        } 
        function searchInputText(){
            searchTextBase.keyup(function() {
				var keycode = (event.keyCode ? event.keyCode : event.which);
                if(searchTextBase.val() != ""){
                    if (keycode == '13') {
                    	showOverlayFromBase();
                	} 
                }    
            });

            searchTextBase.parent().next().find(".search-btn").click(function() {
				if (searchTextBase.val() != "") {
                	showOverlayFromBase();
                } 
			});
	        searchClose.click(closeOverlaySearch);
            searchText.keyup(function() {
				var keycode = (event.keyCode ? event.keyCode : event.which);
                if(searchText.val() != ""){
                    if (keycode == '13') {
                        showResults();
                    } 
                }   
            });
            searchOverlay.find(".search-btn").click(showResults);
        }		

	    function initSearchBox() {
	        // Open search overlay
            // Change - in lieu of search suggestions, initial search box to accept search term
	        //$('.input-group .overlaySearchInput').on('click', showOverlaySearch);
            searchTextBase.keyup(function() {
				var keycode = (event.keyCode ? event.keyCode : event.which);
                if(searchTextBase.val() != ""){
                    //Activate search button
                    if (keycode == '13') {
                    	showOverlayFromBase();
                	} 
                }    
            });

            searchTextBase.parent().next().find(".search-btn").click(function() {
				if (searchTextBase.val() != "") {
                	showOverlayFromBase();
                } 
			});


	        // Close search overlay
	        searchClose.click(closeOverlaySearch);


	        // Show suggestions on keyup
			// Commented - Suggestions not needed for now
	        searchText.keyup(function() {
				var keycode = (event.keyCode ? event.keyCode : event.which);
                if(searchText.val() != ""){
                    if (keycode == '13') {
                    //    clearTimeout(timer);
                        showResults();
                    } /*else {
                        delay(function(){
                            keyUpHandler();
                        }, 1000 );
                    }    */
                }   
            });


	        // Show results on search btn
	        searchOverlay.find(".search-btn").click(showResults);
	    }

		//init();
		searchInputText();

        var delay = (function(){
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })();
	});
/******* End of search functionality ****/
/*** Start of FAQ ***/
//$(document).ready(function() {
$( document ).on( "loadCMS", function( event ) {    
    var width = $(window).width();
	var faqUrl = "/bin/sas/getFaq";

    if (width < 768) {
        isMobileView = true;
    } else {
        isMobileView = false;
    }

	var batchSize = 10;

    function showOverlayFAQ(e) {

        var faqOverlay = $(this).closest(".faqPlaceHolder").parent().find(".overlayFAQ");

        faqInit(faqOverlay.find(".faqPlaceHolder"));

		faqOverlay.show();

        var term = $(this).closest(".faqPlaceHolder").attr("data-term");
        faqOverlay.find(".faqPlaceHolder").trigger("search", [term]);
    }

	function faqInit(faqPlaceHolder) {
        // initialize batch variables for this placeholder
        batchStrt = 0;
        batchEnd = batchStrt + batchSize;
        faqPlaceHolder.data("batchStrt",batchStrt);
        faqPlaceHolder.data("batchEnd",batchEnd);

        // clear any existing list and labels
        faqPlaceHolder.find(".faqItem").remove();
        faqPlaceHolder.find(".faqHeading label").hide();

        // loade image area
        faqPlaceHolder.find(".loaderImg *").hide();
        faqPlaceHolder.find(".loaderImg").show();
		faqPlaceHolder.find(".noSearch span").css("display","none"); 
        // unbind scroll
        $(document).unbind("mousewheel scroll",scrollHandler);
        faqPlaceHolder.closest('.overlayFAQContainer').off("scroll");
	}

    function closeOverlayFAQ(e) {
        $(this).closest(".overlayFAQ").hide();
    }

    function initFaqOverlay() {
        // Associate a FAQ overlay generation event with the corresponding See All results link
        $(".faqPlaceHolder span.link a").click(showOverlayFAQ);

        // Close search overlay
        $(".overlayFAQ span.icon-cancel").click(closeOverlayFAQ);
    }

	$(".faqPlaceHolder").on("initialize", function(event) {
        // The placeholder on which it was called 
        var faqPlaceHolder = $(this); 

        faqInit(faqPlaceHolder);
    });


    // Create a listener for the search event on faqPlaceHolders
    $(".faqPlaceHolder").on("search", function(event, term, tagID, tagTitle) {
        // The placeholder on which it was called 
        var faqPlaceHolder = $(this); 

        // Initialize the area
        faqInit(faqPlaceHolder);

		// Store the term for use later
        faqPlaceHolder.attr("data-term", term); 

 		var country = getCountryCode();
        var language = getLanguageCode();  

		$.ajax({
            type: "GET",
            data:
            {
                "countryCode": country,
                "languageCode": language,
                "fulltext": term,
                "tagID" : tagID
            },
            url: faqUrl,
            contentType: "application/json",
            beforeSend: function( xhr ) {
            	faqPlaceHolder.find(".loaderImg img").show();
          	},
            success: function(data) {
               // debugger;
                // hide image as response has been received
        		faqPlaceHolder.find(".loaderImg img").hide();

                if(data.totalMatches > 0){
					//faqPlaceHolder.show();
                    faqPlaceHolder.closest(".faqContainer").show();
                    faqPlaceHolder.find(".faqHeading label").show();

                    showFaq(data, faqPlaceHolder);
                }  else {

                    //console.log("total when 0:"+data.totalMatches);

                    faqPlaceHolder.closest(".faqContainer").hide();	
                    faqPlaceHolder.find(".faqHeading label").hide();
                    faqPlaceHolder.find(".noSearch span").css("display","block"); 
                   //	faqPlaceHolder.find(".loaderImg p").show(); 

                    // TODO: show no results have been received
                } 

                faqPlaceHolder.closest(".cms-faq-wrapper").trigger( "faqFetched", [ data, term, tagID, tagTitle ] );
            }
        });	

    });



    function showFaq(data, faqPlaceHolder) {

		var json = data;

        // max number of allowed items
        var n = 99999; 
        if (isMobileView) {
            n = faqPlaceHolder.attr("data-items-mobile");
        } else {
            n = faqPlaceHolder.attr("data-items-desktop");
        }

        // actual max that can be displayed
        var total = json.totalMatches;
        //console.log("total : ->"+total);
        if(total<=0){
            //console.log("when no. of data is : "+total);
			faqPlaceHolder.find(".loaderImg span").show(); 
        }
        if (total > n) {	

            total = n;
            faqPlaceHolder.find("span.link").css("display","block");
        } else {				
            faqPlaceHolder.find("span.link").css("display","none");
        }


        // evaluate batch
        var startIdx = faqPlaceHolder.data("batchStrt");
        var endIdx = faqPlaceHolder.data("batchEnd");
        //console.log("start : " + startIdx + " :: end : " + endIdx);

        if(startIdx >= total) {
			//console.log("ignore");
            return;
        }    

        if(total <= endIdx) {
            //console.log("total2:->"+total);
            endIdx = total;
			faqPlaceHolder.find(".loaderImg span").show(); 	
            faqPlaceHolder.find(".loaderImg img").hide();
        } 

        $.each(json.hits.slice(startIdx, endIdx), function(index, value) {
			 //Added class collapsed for click-able cells instead of links
			var faqId = value.link;
			
            var row = '<li class="faqItem collapsed"><a href=\"' + value.link + '\" aria-label="'+value.title+'" >' + value.title + '</a></li>';
            faqPlaceHolder.find(".faqList .loaderImg").before(row);            
        });
		 // Register the click event on each FAQ item
        //faqPlaceHolder.find(".faqItem.collapsed").click(showFaqAnswer);//Added class collapsed for click-able cells instead of links


		endIdx = faqPlaceHolder.data("batchEnd");
        startIdx = startIdx + batchSize;
        endIdx = endIdx + batchSize;
        faqPlaceHolder.data("batchStrt",startIdx);
        faqPlaceHolder.data("batchEnd",endIdx);

        if(total + batchSize > endIdx) {
			faqPlaceHolder.find(".loaderImg img").show();     
            faqPlaceHolder.find(".loaderImg span").hide();

            scrollFaqView(data, faqPlaceHolder);
        } 
        if(total<=0){
			//faqPlaceHolder.find(".loaderImg img").show();     
            faqPlaceHolder.find(".loaderImg span").show();
        }

    }

    function scrollHandler(e){
		//console.log("Window");
        //Determine Direction
        if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
            //console.log("up");
        } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
            //console.log("up");
        } else {
            //console.log("down");
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                
            	window.setTimeout(function() {
                showFaq(e.data.faqListJson, e.data.faqPlaceHolder);
            	}, 1000);

       		}

        }
    }


    function scrollFaqView(faqListJson, faqPlaceHolder) {

        // For FAQ Overlay
       	faqPlaceHolder.closest('.overlayFAQContainer').on("scroll", function() {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                window.setTimeout(function() {
                    showFaq(faqListJson, faqPlaceHolder);
                }, 1000);
            }
        });


		// For FAQ Page
        $(document).bind("mousewheel scroll",
			{
            	"faqListJson": faqListJson,
                "faqPlaceHolder": faqPlaceHolder
            },			
            scrollHandler);
    }

	

    

    initFaqOverlay();

});

var cityNamenew;
var articleCount;
var typeOfArticle;
var tagtitle;
var language;
var liItems;

$(document).ready(function() {
    if($(".sastravel").length){

var cityName = $(".travellerinfo").attr("data-tag");

        if(cityName.startsWith("aem")){
            cityName = cityName.replace(/["]+/g, '');
            cityName = Granite.I18n.get(cityName);
        }
        //var cityName = $(".travellerinfo").attr("data-tag"); 
        cityNamenew = cityName.toLowerCase();
        articleCount = $(".travellerinfo").attr("data-articleCount"); 
        typeOfArticle = $(".travellerinfo").attr("data-typeOfArticle"); 
        tagtitle = $(".travellerinfo").attr("data-tagtitle");
        language = $(".travellerinfo").attr("data-language");

//debugger;

initSasTraveller();

function initSasTraveller(){
var beforeUrl = "https://scandinaviantraveler.com/en/api/tags/";
            var url = beforeUrl + cityNamenew;


            $.ajax(url,{
                'data': JSON.stringify({ 
                    
                    "language":language,
                    "typeOfArticle":typeOfArticle,
                    "articleCount" : articleCount,
            
                }), 
                'type': 'POST',
                'processData': false,

                'contentType': 'application/json', //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
                'success': function(response){
                     //console.log(response);
                     var obj = JSON.parse(response);

                    if(tagtitle){
                        document.getElementById("heading").innerHTML = tagtitle;
                     }
                    else{
                        document.getElementById("heading").innerHTML = obj.tagName;
                     }   
                     $('.travellerinfo').addClass('col-md-12 col-xs-12');
                        
                    for (i=0;i<articleCount;i++) {
    
                         liItems = '<li class= "small-banner col-md-4 col-sm-4  col-xs-12" ><div class="inner inner-bottom-text bg-grey-2 travelimg"></div><span class="text-left articleurl"><a  id="articleanchor"></a></span></li>';
    
    
                         $('ul.items').append(liItems);
                            
                     } 
                    var list = 0;//for adding img tag in each li div
                                     $(".travelimg").each(function(list) {
                        $(this).addClass("travelimg"+(list));
                                         list++;
                        }); 
                    for (i=0;i<articleCount;i++) {
                        
                        $("#articleanchor").attr("id","articleanchor"+i+"");
                        
                        var imageurl = obj.items[i];
                        if ($(window).width() <= 320) {
                            var imgurl4 = imageurl.images.mobile.small;
                        }
                        else if($(window).width() > 320 && $(window).width() <= 768  ){
                            
                            var imgurl4 = imageurl.images.tablet.small;
                            
                        }
                        else{
                            var imgurl4 = imageurl.images.desktop.small;
                            
                        }
                        var articlelink = imageurl.url;
                        var articlelinktext = imageurl.title;
                        
                        var imgObj = $("<img class='articleImage' src='" + imgurl4 + "' alt='ArticleImage'/>")
                        
                        $(".travelimg"+i+"").append(imgObj);
                        var link = $("#articleanchor"+i+"");
                        link.attr("href",articlelink);
                        link.text(articlelinktext);
                        
                    }

                    
                },
                
            });



}

}
});
/*** Start of generic page ebzero **/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

	//var ebZeroMember = $(".cms-infopage-wrapper").attr("data-ebZero");
	var iframeInterval;
	var ebZero;

	function getEbZero(){
		ebZero = window.isEbZero;
		if(ebZero != undefined && ebZero != null && ebZero != false){
			clearInterval(iframeInterval);
			hideIframe(ebZero);
		}
	}

	function hideIframe(ebZero){
       if (ebZero) {
    // the variable is defined
			var ebZeroMember = $(".cms-infopage-wrapper").attr("data-ebZero");
			if(ebZeroMember){
				$(".cms-infopage-wrapper .sso-iframe").each(function() {
						$(this).css("display","none");
				});
			}
		} else {
			showIframe();
		}
    }


	function showIframe(){
	   $(".cms-infopage-wrapper .sso-iframe").each(function() {
		  $(this).css("display","block");
		});
    }

    function initGenericPage(){
        var ssoCookie = getSSOCookie();
		if(ssoCookie != null){ 
            iframeInterval = setInterval(getEbZero, 100);
        } else {
			showIframe();
        }
    }

	if($(".sso-iframe").length){
		initGenericPage();
	}

    $( document ).on( "userSignedIn", function( event ) {
        if($(".sso-iframe").length){
			iframeInterval = setInterval(getEbZero, 100);
		}
    });


    $( document ).on( "userSignedOut", function( event ) {
		if($(".sso-iframe").length){
			showIframe();
		}
    });

 }); 
/*** End of generic page ebzero **/
/****************************** Start of FAQ Page Template **********************************/

/****************************** End of FAQ Page Template **********************************/
/****************************** Start of FAQ GTM code **********************************/

var faqAjaxTrackerFlag = true;
var faqParentPageName = "/faq/";

$(window).on('load', function (e) {
    if(faqAjaxTrackerFlag){
        faqTracker();
        faqAjaxTrackerFlag = false;
    }
});


//Header related GTM tracking
function GTMtrackInteraction(category,action,label)
{
    window.sasD360DataLayer = window.sasD360DataLayer || [];
    window.sasD360DataLayer.push({
        'event':'interaction',
        'interaction.category':category,
        'interaction.action':action,
        'interaction.label':label
    });
}

function faqTracker(){

    var faqList = $('#faqList #faqAccordion .accordionContent li a');

    for(var x=0; x<faqList.length; x++)(function(x){ 
        $(faqList[x]).on("click",function(event){
            var questionId = $(this).attr('questionId') || "no id";
            var href = $(this).attr('href');
            var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
            var heading = path.substring(0, path.indexOf('/'));
            if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
            	heading = "no heading";
            }
            var question = $(this).text();
            GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question, 'Opened | FAQ List');
        });
    })(x);

    var topQuesList = $('#faqSidebar .sectionContent li a');

    for(var x=0; x<topQuesList.length; x++)(function(x){
        $(topQuesList[x]).on("click",function(event){
        	var questionId = $(this).attr('questionId') || "no id";
            var href = $(this).attr('href');
            var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
            var heading = path.substring(0, path.indexOf('/'));
            if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
            	heading = "no heading";
            }
            var question = $(this).text();
            GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question, 'Opened | Top Question');
        });
    })(x);

    var relatedQuesList = $('#faq-answer a');

    for(var x=0; x<relatedQuesList.length; x++)(function(x){
        if($(relatedQuesList[x]).attr('href') && $(this).attr('href').indexOf(faqParentPageName) >= 0){
            $(this).on("click",function(event){
                var href = $(this).attr('href');
                var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
                var heading = path.substring(0, path.indexOf('/'));
                if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
	            	heading = "no heading";
	            }
                var question = $(this).text();
                GTMtrackInteraction('FAQ', 'no id|' + heading +'|'+ question, 'Opened | Related Question');
            });
        }
    })(x);

    $('#feedback-ok').on("click",function(event){
        var href = $('.cms-wrapper.cms-faqpage-wrapper').attr('data-faq-id');
        var questionId = $('.cms-wrapper.cms-faqpage-wrapper .leftSection').attr('questionId') || "no id";
        var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
        var heading = path.substring(0, path.indexOf('/'));
        if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
        	heading = "no heading";
        }
        var question = $('.page-title h1').text();
        GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question, 'Upvote');
    });

    $('#feedback-cancel').on("click",function(event){
        var href = $('.cms-wrapper.cms-faqpage-wrapper').attr('data-faq-id');
        var questionId = $('.cms-wrapper.cms-faqpage-wrapper .leftSection').attr('questionId') || "no id";
        var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
        var heading = path.substring(0, path.indexOf('/'));
        if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
        	heading = "no heading";
        }
        var question = $('.page-title h1').text();
        GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question,'Downvote');
    });
}

/****************************** End of FAQ GTM code **********************************/
$( document ).on( "loadCMS", function( event ) {    
	if($('.cms-faqpage-wrapper').length){
		var faqItem = $('.cms-faqpage-wrapper');
		var faqId = faqItem.attr('data-faq-id');

		/*function incrementViewCount(faqId) {
			$.ajax({
				type: "POST",
				data: {
					"action": "viewed"
				},
				url: faqId + "/_jcr_content.stats.html",
				success: function(data) {
					//console.log("view count increased");
				}
			});
		}
		
		incrementViewCount(faqId);*/

		/** Start of FAQ Feedback **/
		$('.faq-feedback .btn').on('click', function() {

			//$(this).closest('.faq-feedback').find('input').attr('disabled', true);

			//$(this).closest('.feedback-ack').show();
			//$(this).closest('.useful-info').hide();

			$(".faq-feedback").find(".useful-info").hide();
			$(".faq-feedback").find(".feedback-ack").show();

			/*$.ajax({
				type: "POST",
				data: {
					"action": $(this).attr('data-tkey')
				},
				url: faqId + "/_jcr_content.stats.html",
				success: function(data) {
	//console.log("action count increased");
				}
			});*/


		});
		/** End of FAQ Feedback **/
	}
});
/****************************** Start of FAQ GTM code **********************************/

var faqAjaxTrackerFlag = true;
var faqParentPageName = "/faq/";

$(window).on('load', function (e) {
    if(faqAjaxTrackerFlag){
        faqTracker();
        faqAjaxTrackerFlag = false;
    }
});


//Header related GTM tracking
function GTMtrackInteraction(category,action,label)
{
    window.sasD360DataLayer = window.sasD360DataLayer || [];
    window.sasD360DataLayer.push({
        'event':'interaction',
        'interaction.category':category,
        'interaction.action':action,
        'interaction.label':label
    });
}

function faqTracker(){

    var faqList = $('#faqList #faqAccordion .accordionContent li a');

    for(var x=0; x<faqList.length; x++)(function(x){ 
        $(faqList[x]).on("click",function(event){
            var questionId = $(this).attr('questionId') || "no id";
            var href = $(this).attr('href');
            var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
            var heading = path.substring(0, path.indexOf('/'));
            if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
            	heading = "no heading";
            }
            var question = $(this).text();
            GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question, 'Opened | FAQ List');
        });
    })(x);

    var topQuesList = $('#faqSidebar .sectionContent li a');

    for(var x=0; x<topQuesList.length; x++)(function(x){
        $(topQuesList[x]).on("click",function(event){
        	var questionId = $(this).attr('questionId') || "no id";
            var href = $(this).attr('href');
            var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
            var heading = path.substring(0, path.indexOf('/'));
            if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
            	heading = "no heading";
            }
            var question = $(this).text();
            GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question, 'Opened | Top Question');
        });
    })(x);

    var relatedQuesList = $('#faq-answer a');

    for(var x=0; x<relatedQuesList.length; x++)(function(x){
        if($(relatedQuesList[x]).attr('href') && $(this).attr('href').indexOf(faqParentPageName) >= 0){
            $(this).on("click",function(event){
                var href = $(this).attr('href');
                var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
                var heading = path.substring(0, path.indexOf('/'));
                if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
	            	heading = "no heading";
	            }
                var question = $(this).text();
                GTMtrackInteraction('FAQ', 'no id|' + heading +'|'+ question, 'Opened | Related Question');
            });
        }
    })(x);

    $('#feedback-ok').on("click",function(event){
        var href = $('.cms-wrapper.cms-faqpage-wrapper').attr('data-faq-id');
        var questionId = $('.cms-wrapper.cms-faqpage-wrapper .leftSection').attr('questionId') || "no id";
        var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
        var heading = path.substring(0, path.indexOf('/'));
        if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
        	heading = "no heading";
        }
        var question = $('.page-title h1').text();
        GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question, 'Upvote');
    });

    $('#feedback-cancel').on("click",function(event){
        var href = $('.cms-wrapper.cms-faqpage-wrapper').attr('data-faq-id');
        var questionId = $('.cms-wrapper.cms-faqpage-wrapper .leftSection').attr('questionId') || "no id";
        var path = href.substring(href.indexOf(faqParentPageName) + faqParentPageName.length);
        var heading = path.substring(0, path.indexOf('/'));
        if(path.indexOf('/') < 0 || (path.indexOf('/')+1) == path.length || !heading){
        	heading = "no heading";
        }
        var question = $('.page-title h1').text();
        GTMtrackInteraction('FAQ', questionId +'|'+ heading +'|'+ question,'Downvote');
    });
}

/****************************** End of FAQ GTM code **********************************/
/*** Start of sso-iframe ***/

$(document).ready(function(){
//$( document ).on( "loadCMS", function( event ) {  

    var ssoRedirectPrefix = '/bin/sso/redirect?redirectUrl=';

    function initSSOIframe() {

        // Check if SSO cookie is available
        var ssoCookie = getSSOCookie();

		$('.sso-iframe').each(function(  ){
            var iframeSrc = $(this).find("iframe").attr('src');
            var object=$(this).find(".cms-sso-iframe");
             if(ssoCookie != null || object.hasClass('cms-sso-iframe-anonymous')){ 
                $(this).find(".cms-sso-iframe").addClass('cms-loading-image');
                $(this).find(".cms-sso-iframe").show();
                $(this).find(".cms-sso-message").hide();
             } else {
				$(this).find(".cms-sso-iframe").hide();
                $(this).find(".cms-sso-message").show();
             }
        });

        $('.sso-iframe iframe').on('load', function () {
            $(this).closest('.cms-sso-iframe').removeClass('cms-loading-image');

              if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
               $(".aem-iframe").css("overflow","scroll");
               $(".aem-iframe").css("-webkit-overflow-scrolling","touch");
              }
        });

    }

    initSSOIframe();


    // On User Sign In
    $( document ).on( "userSignedIn", function( event ) {
        // Reload iframe
        $('.sso-iframe iframe').each(function(  ){
            var iframeSrc = $(this).attr('src');
            if(iframeSrc.indexOf(ssoRedirectPrefix) >= 0 ) {
            	$(this).closest('.cms-sso-iframe').addClass('cms-loading-image');
                $(this).attr("src",iframeSrc + "");
            }   
        });

        // Show iframe, hide message
        initSSOIframe();
    });


    // On User Sign Out
    $( document ).on( "userSignedOut", function( event ) {
		//console.log('CMS iframe actions on logout');

        // Reload iframe with logout criteria
 		$('.sso-iframe iframe').each(function(  ){
            var iframeSrc = $(this).attr('src');
            //console.log('Iframe src : ' + iframeSrc);
            
            if(iframeSrc.indexOf(ssoRedirectPrefix) >= 0 ) {
                var encodedUrl = iframeSrc.replace(ssoRedirectPrefix, ""); 
                //console.log('Encoded URL : ' + encodedUrl);

                var decodedUrl = decodeURIComponent(encodedUrl);
                //console.log('Decoded URL : ' + decodedUrl);

                if(decodedUrl.indexOf('?') < 0){
                    decodedUrl += '?';
                } else {
                    decodedUrl += '&';
                }
                decodedUrl += 'logout=true';
                //console.log('Decoded URL appended : ' + decodedUrl);

                encodedUrl = encodeURIComponent(decodedUrl);
                //console.log('Encoded URL recreated: ' + encodedUrl);

                $(this).attr('src',ssoRedirectPrefix + encodedUrl);
                //console.log('Iframe src: ' + $(this).attr('src'));
            }
        });


        // Hide iframe, show message
        initSSOIframe();
    });


});
/*** End of sso-iframe ***/
/****************************** Start of Navigation redirect dropdown **********************************/
$(document).on("loadCMS", function(event) {

	function initRedirectDropdown() {

		$(".redirect-dropdown .dropdown-menu li").on("click", selectListValue);

		$('.redirect-dropdown button').on("click", showDropdown);
		$(document).on('click', hideDropdownValue);

	}

	function showDropdown(event) {
		var object = $(this).closest(".redirect-dropdown");
		var alreadyActive = false;
		if (object.hasClass('active')) {

			alreadyActive = true;
		}
		hideDropdownValue();
		//$(this).closest(".redirect-dropdown").find("ul").toggle();
		if (!alreadyActive) {
			$(this).closest(".redirect-dropdown").addClass('active');
		}
		event.stopPropagation();
	}

	function hideDropdownValue() {

		//$('.redirect-dropdown').find("ul").hide();
		$(".redirect-dropdown").removeClass('active');
	}

	function selectListValue(event) {
		/*redirectDropdownVal = $(this).find('a').text();
        $(redirectDropdownSelection).text(redirectDropdownVal);*/
		var navigationLink = $(this).attr('data-link');
		window.location.href = navigationLink;
		return;
	}

	initRedirectDropdown();
});



/****************************** End of Navigation redirect dropdown **********************************/
/*** Start of menu **/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

	var menuInterval;
	var ebZero;

	function getEbZero(){
		ebZero = window.isEbZero;
		if(ebZero != undefined && ebZero != null && ebZero != false){
			clearInterval(menuInterval);
			hideMenu(ebZero);
		}
	}

	function hideMenu(ebZero){
		if (ebZero) {
           $("div.menuTilteList ul.subMenu li ").each(function() {
				var ebZeroMember = $(this).attr("data-ebZero");
				if(ebZeroMember){
					$(this).css("display","none");
				} 
			});
		} else {
			showMenu();
		}
    }


	function showMenu(){
		$("div.menuTilteList ul.subMenu li ").each(function() {
			$(this).css("display","list-item");
		});
    }

    function initMenu(){
        var ssoCookie = getSSOCookie();
		if(ssoCookie != null){ 
            menuInterval = setInterval(getEbZero, 100);
        } else {
			showMenu();
        }
    }

    initMenu();

    $( document ).on( "userSignedIn", function( event ) {
        menuInterval = setInterval(getEbZero, 100);
	});


    $( document ).on( "userSignedOut", function( event ) {
		showMenu();
    });

}); 
/*** End of menu **/
/****************************** Start of Links-on-the-page  **********************************/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

    function initAnchorList() {

		populateAnchorLinks();

    }

    function anchorDropdown() {
        $('.anchorList').css("display", "block !important").toggle();
    }

    function populateAnchorLinks() {
        $('nav#bookmarkSidebar>ul#anchorLinks').html('');

        var anchors = $('.cms-wrapper a[name],.cms-wrapper a[id], .cms-wrapper a[name]:not( a[name])');
        if(anchors.length > 0) {
			// If there are anchors on the page

            for(var i=0; i<anchors.length; i++) {
                var str = anchors[i].parentElement.textContent;
				//console.log(str);
                var index = 0;
                //console.log(anchors[i].parentElement.textContent);
                //console.log(anchors[i].id);

				/*
                var numberOfChars = 1000;
                if(str.length>numberOfChars){
                    str = str.substr(0,numberOfChars) + "...";
                }
                str = str.substring(0,1)+str.substring(1).toLowerCase();
                */	


                if($(anchors[i]).parent().parent().hasClass("text")){

                    if(anchors[i].name != ""){
                        $('nav#bookmarkSidebar>ul#anchorLinks').append('<li id="'+i+'"><a role="link" href="#'+anchors[i].name+'" aria-label="'+str+'">'+str+'</a></li>');
                    }
                    else{
                        $('nav#bookmarkSidebar>ul#anchorLinks').append('<li id="'+i+'"><a role="link" href="#'+anchors[i].id+'" aria-label="'+str+'">'+str+'</a></li>');
    
                    }

                }
                /*if( ){


					$('nav#bookmarkSidebar>ul#anchorLinks').append('<li class="'+i+'"><a role="link" href="#'+anchors[i].name+'" aria-label="'+str+'">'+str+'</a></li>');
                }

                else{

                    $('nav#bookmarkSidebar>ul#anchorLinks').append('<li class="'+i+'"><a role="link" href="#'+anchors[i].id+'" aria-label="'+str+'">'+str+'</a></li>');

                }*/

               /*if(anchors[i].id != null && anchors[i].id != undefined ){

                	$('nav#bookmarkSidebar>ul#anchorLinks').append('<li id="'+i+'"><a role="link" href="#'+anchors[i].id+'" aria-label="'+str+'">'+str+'</a></li>');
                 }*/



                if(i==0){
                    $('.selectedAnchorValue').text(str);
                }
            }

            if ($(window).width() <= 767) {		// Mobile

                var diva = document.getElementById("anchorHolder");
                var divb = document.getElementById("anchorWidget");
                if(diva != null){
                    diva.appendChild(divb);        
                }
				$('.anchorDropdown').css('display', 'none');
                $('.anchorDropdown').on('click', anchorDropdown);
                $('#anchorHolder').css('margin-bottom', '30px'); // to offset for the anchor drop down

                $('.anchorList li a').click( function (event) {
                    //console.log('clicked');
                    anchorDropdown();
                    $('.selectedAnchorValue').text($(this).text());
                });

            } else {			// Desktop
            	$('.anchorHeader').css('display', 'block');
            }




        }    
    };


	initAnchorList();
    /*
	var urlArray = $(location).attr('href').split("/");
    var country = $(location).attr('href').split("/")[urlArray.length-1];
    if(country != ""){
		 $("html, body").animate({ 
        		scrollTop: $('a[name='+country+']').offset().top 
   		 }, 1000);

    }
	*/
 });
/****************************** End of Links-on-the-page  **********************************/
/*** Start of Back to top **/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

	function initBackToTop() {
		checkMobile();
        registerEvents();			
    }

	function checkMobile(){
		if ($(window).width() > 767) {
			$(window).scroll(function(){		
				if($(document).scrollTop()<=100){
					$('.backToTop').removeClass('displayBlock');
				}
				else{
					$('.backToTop').addClass('displayBlock');
				}
				/*Added for CMS-551*/
				if($(document).scrollTop()>($(document).height()*0.88)){ 
					$('.backToTop').css("position","absolute");
				} else {
					$('.backToTop').css("position","fixed");
				}	
				/*End: CMS-551*/				
			});
		} 
	}

    function scrollTop() {
        $('html, body').animate({
            scrollTop: 0
        }, "fast");
      //added for focussing to breadcrumb link while keyenter on gototop link
        setTimeout(function(){ 
            
			  $('.breadcrumb li:first-child a').attr('tabindex','0'); 
			   $('.breadcrumb li:first-child a').focus();  
		},500); 
    }

	function registerEvents() {
		$('.backtoTop').on('click', scrollTop);
	}

	 initBackToTop();		
});		
/*** End of Back to top **/
/*** Start of vacation planner ***/
var updatedestlist = [];
var neworgCity, oldorgCity;
var originData;
Granite.I18n.setLocale(getLocale());
var API_OFFERS_LOWPRICE = "offers/flightproduct/lowestFare"; // lpc url 
var API_OFFERS_FLEXPRICER = "offers/flightproducts"; //added
var lpcQueryString;
var monthArray = [Granite.I18n.get("aem.marketing.vacPlanner.month-jan-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-feb-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-mar-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-apr-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-may-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-jun-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-jul-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-aug-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-sep-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-oct-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-nov-label").substring(0, 3),
    Granite.I18n.get("aem.marketing.vacPlanner.month-dec-label").substring(0, 3)
];
var browser = navigator.userAgent.toLowerCase();
var MIN_PRICE = 999999999;
var MAX_PRICE = 0;
//var selectedMaxPrice;
var NO_PRICE_TEXT = ''; //Granite.I18n.get('aem.marketing.vacPlanner.fetch-price-label');
var isMouseDownOnSlider = false;
var jsonData;
var removeStickyBar = false;
var destSet;
var orgSet;
var onPageLoad = false;

//$('.div-lpc-wrapper .dropdown-toggle').dropdown(); //removed from here placed in top
var origBtn = $('#vocationPlannerOrigButton');
var destBtn = $('#vocationPlannerDestButton');
var orgDD = $('#vocationPlannerOriginDropDown');
var destDD = $('#vocationPlannerDestDropDown');
var orgSeletion = $("#vocationPlannerOriginSelection");
var destSelection = $("#vocationPlannerDestSelection");
var div_top;
//Added to prevent default bootstrap dropdown behaviour.
var origVal = $('#vocationPlannerOriginSelection').text();
var destVal = $('#vocationPlannerDestSelection').text();
//alignDD(origVal,destVal);


// Arnab: Added for AEM integration
var baseURL = getApiHost() + API_OFFERS_LOWPRICE;
var flexpricerURL = getApiHost() + API_OFFERS_FLEXPRICER;
var lpcOrigin = "";
var lpcOriginCity = "";
var lpcOriginAirport = "";
var lpcDestList = "";
var startDate = "";
var endDate = "";
var tripType = "";
var terms = "";
var pos = "";
var currCode = "";
var currObj = $(".div-lpc-wrapper");
var prefix = currObj.attr("data-prefix") || "";
var precision = currObj.attr("data-precision") || 0;
var decimal = currObj.attr("data-decimal") || "";
var thousand = currObj.attr("data-thousand") || "";
var suffix = currObj.attr("data-suffix") || "";
var enable = currObj.attr("data-enable") || false;

var customOrgAdded = $("#originSelect").attr("data-addOrigin");
var orgSetData = $("#originSelect").attr("data-originset");
var orgNameSet = [];
var orgCodeSet = [];
var preferredOriginCodes = $("#originSelect").attr("data-preferredOriginCodes") || "";
var preferredOriginNames = $("#originSelect").attr("data-preferredOriginNames") || "";

//console.log(" prefix : "+prefix+" precision : "+precision+" decimal : "+decimal+" thousand : "+thousand+" suffix : "+suffix+" enable : LPC: "+enable);

var localeHeader = getLanguageCode() + '_' + getCountryCode();
// Declaring function pad and getFormattedDateForApi 
function pad(s) {
    return (s < 10) ? '0' + s : s;
}


function getFormattedDateForApi(d) {

    var formattedDate = d.getFullYear() + '' + pad(d.getMonth() + 1) + '' + pad(d.getDate());
    return formattedDate.concat("0000");
}

function initialize(newOriginCode) {

	//---CMS-573
    if (window.location.href.indexOf("?") > -1) {
    //console.log("found it");
    var location = window.location.href;
    var currentlocn = String(location);
    var resolvedlocn = currentlocn.replace(/&/g, "%26");


        if (window.location.href.indexOf('city=') > -1) {
          $.urlParam = function(name){

                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(resolvedlocn);
            
                return results[1] || 0;
        	}

            var destinationcity = $.urlParam('city');
            //console.log(decodeURIComponent($.urlParam('city')));
            var usergivenDest =decodeURIComponent($.urlParam('city'));

            var exists = $('#vocationPlannerDestDropDown li').filter(function(){ return $(this).find("a").text() == usergivenDest; }).length;
			if(exists){
    			//console.log(exists);
                var destSet = $( "#vocationPlannerDestDropDown li" )
          		.filter(function() {
            	return $(this).find("a").text() === usergivenDest ;
               })

			}
            else{
				//console.log("does not exists");
                var destSet = $("#vocationPlannerDestDropDown li:first");
            }


		}
	else {
		var destSet = $("#vocationPlannerDestDropDown li:first");


// $("#vocationPlannerDestSelection").text(destSet.find("a").text());
	}


	} else {
		var destSet = $("#vocationPlannerDestDropDown li:first");

// $("#vocationPlannerDestSelection").text(destSet.find("a").text());
	}

$("#vocationPlannerDestSelection").text(destSet.find("a").text());
	/* if (window.location.href.indexOf("?") > -1) {

    }*/

	//Added for AC-226
	$("#destButton").attr("aria-expanded",false);	
	
	var l= 1;
    $("#vocationPlannerDestDropDown li").each(function(){
		$(this).find("a").attr("aria-label",$(this).find("a").text()+" "+l+" of "+$("#vocationPlannerDestDropDown li").length);
        l++;
    });
	//End: AC-226	

	lpcOrigin = newOriginCode || getOriginCookie() || defaultOriginCode;
    lpcDestList = destSet.attr("data-dest-list");
   // console.log(lpcDestList);


    startDate = new Date();
    endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 365,
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds());
    tripType = destSet.attr("data-trip-type");
    //terms = destSet.attr("data-dest-terms");
    if (tripType == 'O') {
        terms = Granite.I18n.get("aem.marketing.campaign.one-way-label");
    } else if (tripType == 'R') {
        terms = Granite.I18n.get("aem.marketing.campaign.return-from-label");
    }

    pos = getPOS();

}
// Arnab: End of addition for AEM integration

//$(document).ready(function() {
$(document).on("loadCMS", function(event) {	//Changed to document.on("loadCMS") for CMS-484
    //console.log("inside loadCMS");
	// Arnab: If added to ensure that initialization happens only if page contains Vac Planner  
    if($( ".div-lpc-wrapper" ).length){
		//  dropdown function  
		$('.div-lpc-wrapper .dropdown-toggle').dropdown();


		//END of addition to trigger the origin change function
		
		if(customOrgAdded){
            var orgSetArr = orgSetData.split(",");
            for(var org=0; org<orgSetArr.length; org++){
                if(orgSetArr[org].lastIndexOf("(") != -1 && orgSetArr[org].lastIndexOf("(") != -1){
                    var orgNameSetObj = orgSetArr[org].slice(0,orgSetArr[org].lastIndexOf("("));
                    var orgCodeSetObj = orgSetArr[org].slice(orgSetArr[org].lastIndexOf("(")+1,orgSetArr[org].lastIndexOf(")"));
                    if(orgNameSetObj != "" && orgCodeSetObj != ""){
						orgNameSet.push(orgNameSetObj);
						orgCodeSet.push(orgCodeSetObj);
                    }
                }
			}
            if(orgCodeSet.length){
                onPageLoad = true;
	            initVacPlanner(orgCodeSet[0]);
            } else {
                customOrgAdded = false;
            }
		}
        //if(originData == undefined){

		$(document).on("originChange", function(event, newOriginCode) {

			if(!customOrgAdded){
                onPageLoad = true;
				initVacPlanner(newOriginCode); //calling initVacPlanner function
			}

		});
    // }
		//init();

		//ADDED to trigger the origin change function 
		//$(document).trigger("originChange");	commented for CMS-484
		
		$(".div-lpc-wrapper #originSelect .btn").on("click", function() {

			//console.log("toggle function for origin!");		
			$(orgDD).removeClass('hide-element');
		});

		//$(".div-lpc-wrapper #destSelect .btn .icon-down").on("click", function() {
		$(".div-lpc-wrapper #destSelect .btn").on("click", function() {

			//console.log("toggle function for dest!");
			$(destDD).removeClass('hide-element');
		});
	} // Arnab : End of if	


destBtn.mouseover(function() {
    $(destBtn).addClass('bg-color');
});

if (browser.indexOf("chrome") > 0 || browser.indexOf("mobile") > 0) {
    $(orgDD).addClass('hide-element');
    $(destDD).addClass('hide-element');
}

//Copied to customlibs1.html
//var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
//var isIE = /*@cc_on!@*/false || !!document.documentMode;

if(isIE){
	$(".div-lpc-wrapper #originSelect .btn").on("click", function() {

		// console.log("toggle function for origin!");		
		$(orgDD).removeClass('hide-element');
	});

	//$(".div-lpc-wrapper #destSelect .btn .icon-down").on("click", function() {
	$(".div-lpc-wrapper #destSelect .btn").on("click", function() {

		//console.log("toggle function for dest!");
		$(destDD).removeClass('hide-element');
	});
}



$("#vocationPlannerDestDropDown li a").on("click", function() {
    destVal = $(this).text();
    //origVal = $('#vocationPlannerOriginSelection').text();
    //alignDD(origVal,destVal);
    var ele = $("#destinationDD");
    $("#vocationPlannerDestSelection").text(destVal);
	//Added for AC-226
	$("#updateselect").html('You have selected '+destVal);	
	$("#destButton").attr("aria-expanded",false);
	//End: AC-226
	
    if (browser.indexOf("chrome") > 0 || browser.indexOf("mobile") > 0) {
        $(destDD).addClass('hide-element');
    }

    // Arnab: Added to get the destination details
    var liItem = $(this).parent();
    lpcDestList = liItem.attr("data-dest-list");
    tripType = liItem.attr("data-trip-type");
    //terms = liItem.attr("data-dest-terms");
    if (tripType == 'O') {
        terms = Granite.I18n.get("aem.marketing.campaign.one-way-label");
    } else if (tripType == 'R') {
        terms = Granite.I18n.get("aem.marketing.campaign.return-from-label");
    }
    // Arnab: End of addition
	//onPageLoad = false; //to prevent duplicate call on changing destination from dropdown
    getData();
});


// Added for slider
$('*').on("mouseup", function(event) {

    // REMOVED For The Smooth Funtioning Of UI-SLIDER : CMS-381
    // event.stopPropagation();
    if (isMouseDownOnSlider) {
        var currentSliderValueTemp = $("#amount").val();
        var currentSliderValue = parseInt(currentSliderValueTemp.substring(0, currentSliderValueTemp.indexOf(" ")));
        var rowlen = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td').length;

        $(".div-lpc-wrapper #lpcMatixTable tr[id^=\"dest_\"]").find('td').each(function() {

            var colPriceValue = parseInt($(this).attr('data-attr'));
            if (colPriceValue > currentSliderValue) {
                $(this).find("span").hide();
            } else {
                $(this).find("span").show();
            }
        });

        isMouseDownOnSlider = false;
    }

});
$(".div-lpc-wrapper .sliderDiv").on("mousedown", function() {
    isMouseDownOnSlider = true;
});
//ADDED For The Smooth Funtioning Of UI-SLIDER : CMS-381
$(".div-lpc-wrapper .sliderDiv").on("mouseup", function() {
    isMouseDownOnSlider = false;
});

$('#slider-range-min').on('keydown',function(e){
    if(e.which == 37 || e.which == 38 || e.which == 39 || e.which ==40){
        $("#amountacc").html($("#amount").val());
        var currentSliderValueTemp = $("#amount").val();
        var currentSliderValue = parseInt(currentSliderValueTemp.substring(0, currentSliderValueTemp.indexOf(" ")));
        var rowlen = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td').length;
        
        $(".div-lpc-wrapper #lpcMatixTable tr[id^=\"dest_\"]").find('td').each(function() {
            
            var colPriceValue = parseInt($(this).attr('data-attr'));
            if (colPriceValue > currentSliderValue) {
                $(this).find("span").hide();
            } else {
                $(this).find("span").show();
            }
        });
    }
});



function registerSwipeEvents() {
    var table = $(".div-lpc-wrapper #lpcMatixTable");
    var col = $('.div-lpc-wrapper #matrixMonthList th');
    $(table).on("swipeleft", function() {
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }
        var width = $(window).width();
        var priceRowLength = $('#lpcMatixTable tr[id^="dest_"]').length;
        if ($(table)) {
            if (width >= 320 && width <= 568) {
                var startIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):first')[0].id);

                var endIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):last')[0].id);

                if ($(col) && endIndex < 10) {
                    $(col[startIndex]).addClass('hide-element');
                    $(col[endIndex]).addClass('hide-element');
                    $(col[endIndex + 1]).removeClass('hide-element');
                    $(col[endIndex + 2]).removeClass('hide-element');
                }
                var priceStartIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):first')[0].id;
                var priceStartIndex = parseInt(priceStartIndexTemp.substr(priceStartIndexTemp.lastIndexOf("_") + 1));

                var priceEndIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):last')[0].id;
                var priceEndIndex = parseInt(priceEndIndexTemp.substr(priceEndIndexTemp.lastIndexOf("_") + 1));

                if ($('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"]') && priceEndIndex < 10) {
                    for (var i = 0; i < priceRowLength; i++) {
                        var priceRow = $('#dest_' + i + ' td');
                        $(priceRow[priceStartIndex]).addClass('hide-element');
                        $(priceRow[priceEndIndex]).addClass('hide-element');
                        $(priceRow[priceEndIndex + 1]).removeClass('hide-element');
                        $(priceRow[priceEndIndex + 2]).removeClass('hide-element');
                    }
                }

            }
            if (width >= 569 && width <= 767) {
                var startIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):first')[0].id);
                var endIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):last')[0].id);
                if ($(col) && endIndex < 9) {
                    $(col[startIndex]).addClass('hide-element');
                    $(col[startIndex + 1]).addClass('hide-element');
                    $(col[endIndex]).addClass('hide-element');
                    $(col[endIndex + 1]).removeClass('hide-element');
                    $(col[endIndex + 2]).removeClass('hide-element');
                    $(col[endIndex + 3]).removeClass('hide-element');
                }

                var priceStartIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):first')[0].id;
                var priceStartIndex = parseInt(priceStartIndexTemp.substr(priceStartIndexTemp.lastIndexOf("_") + 1));

                var priceEndIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):last')[0].id;
                var priceEndIndex = parseInt(priceEndIndexTemp.substr(priceEndIndexTemp.lastIndexOf("_") + 1));

                if ($('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"]') && priceEndIndex < 9) {
                    for (var i = 0; i < priceRowLength; i++) {
                        var priceRow = $('#dest_' + i + ' td');
                        $(priceRow[priceStartIndex]).addClass('hide-element');
                        $(priceRow[priceStartIndex + 1]).addClass('hide-element');
                        $(priceRow[priceEndIndex]).addClass('hide-element');
                        $(priceRow[priceEndIndex + 1]).removeClass('hide-element');
                        $(priceRow[priceEndIndex + 2]).removeClass('hide-element');
                        $(priceRow[priceEndIndex + 3]).removeClass('hide-element');
                    }
                }
            }
            if (width >= 768 && width <= 1023) {
                var startIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):first')[0].id);
                var endIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):last')[0].id);
                if ($(col) && endIndex < 8) {
                    $(col[startIndex]).addClass('hide-element');
                    $(col[startIndex + 1]).addClass('hide-element');
                    $(col[startIndex + 2]).addClass('hide-element');
                    $(col[endIndex]).addClass('hide-element');
                    $(col[endIndex + 1]).removeClass('hide-element');
                    $(col[endIndex + 2]).removeClass('hide-element');
                    $(col[endIndex + 3]).removeClass('hide-element');
                    $(col[endIndex + 4]).removeClass('hide-element');
                }
                var priceStartIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):first')[0].id;
                var priceStartIndex = parseInt(priceStartIndexTemp.substr(priceStartIndexTemp.lastIndexOf("_") + 1));

                var priceEndIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):last')[0].id;
                var priceEndIndex = parseInt(priceEndIndexTemp.substr(priceEndIndexTemp.lastIndexOf("_") + 1));

                if ($('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"]') && priceEndIndex < 8) {
                    for (var i = 0; i < priceRowLength; i++) {
                        var priceRow = $('#dest_' + i + ' td');
                        $(priceRow[priceStartIndex]).addClass('hide-element');
                        $(priceRow[priceStartIndex + 1]).addClass('hide-element');
                        $(priceRow[priceStartIndex + 2]).addClass('hide-element');
                        $(priceRow[priceEndIndex]).addClass('hide-element');

                        $(priceRow[priceEndIndex + 1]).removeClass('hide-element');
                        $(priceRow[priceEndIndex + 2]).removeClass('hide-element');
                        $(priceRow[priceEndIndex + 3]).removeClass('hide-element');
                        $(priceRow[priceEndIndex + 4]).removeClass('hide-element');
                    }
                }
            }
        }

    });

    $(".div-lpc-wrapper #lpcMatixTable").on("swiperight", function() {
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }
        var width = $(window).width();
        var priceRowLength = $('#lpcMatixTable tr[id^="dest_"]').length;
        if ($(table)) {
            if (width >= 320 && width <= 568) {
                var startIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):first')[0].id);
                var endIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):last')[0].id);
                var rowLength = $('.div-lpc-wrapper #matrixMonthList th').length;
                if ($(col) && startIndex > 1) {
                    $(col[startIndex]).addClass('hide-element');
                    $(col[endIndex]).addClass('hide-element');
                    $(col[startIndex - 1]).removeClass('hide-element');
                    $(col[startIndex - 2]).removeClass('hide-element');
                }
                var priceStartIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):first')[0].id;
                var priceStartIndex = parseInt(priceStartIndexTemp.substr(priceStartIndexTemp.lastIndexOf("_") + 1));

                var priceEndIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):last')[0].id;
                var priceEndIndex = parseInt(priceEndIndexTemp.substr(priceEndIndexTemp.lastIndexOf("_") + 1));

                if ($('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"]') && priceStartIndex > 1) {
                    for (var i = 0; i < priceRowLength; i++) {
                        $($('#dest_' + i + ' td')[priceStartIndex]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceEndIndex]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 1]).removeClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 2]).removeClass('hide-element');
                    }
                }
            }
            if (width >= 569 && width <= 767) {
                var startIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):first')[0].id);
                var endIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):last')[0].id);
                if ($(col) && startIndex > 2) {
                    $(col[startIndex]).addClass('hide-element');
                    $(col[startIndex + 1]).addClass('hide-element');
                    $(col[endIndex]).addClass('hide-element');
                    $(col[startIndex - 1]).removeClass('hide-element');
                    $(col[startIndex - 2]).removeClass('hide-element');
                    $(col[startIndex - 3]).removeClass('hide-element');
                }
                var priceStartIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):first')[0].id;
                var priceStartIndex = parseInt(priceStartIndexTemp.substr(priceStartIndexTemp.lastIndexOf("_") + 1));

                var priceEndIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):last')[0].id;
                var priceEndIndex = parseInt(priceEndIndexTemp.substr(priceEndIndexTemp.lastIndexOf("_") + 1));

                if ($('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"]') && priceStartIndex > 2) {
                    for (var i = 0; i < priceRowLength; i++) {
                        $($('#dest_' + i + ' td')[priceStartIndex]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex + 1]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceEndIndex]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 1]).removeClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 2]).removeClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 3]).removeClass('hide-element');
                    }
                }
            }
            if (width >= 768 && width <= 1023) {
                var startIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):first')[0].id);
                var endIndex = parseInt($('.div-lpc-wrapper #matrixMonthList th:not(.hide-element):last')[0].id);
                if ($(col) && startIndex > 3) {
                    $(col[startIndex]).addClass('hide-element');
                    $(col[startIndex + 1]).addClass('hide-element');
                    $(col[startIndex + 2]).addClass('hide-element');
                    $(col[endIndex]).addClass('hide-element');
                    $(col[startIndex - 1]).removeClass('hide-element');
                    $(col[startIndex - 2]).removeClass('hide-element');
                    $(col[startIndex - 3]).removeClass('hide-element');
                    $(col[startIndex - 4]).removeClass('hide-element');
                }
                var priceStartIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):first')[0].id;
                var priceStartIndex = parseInt(priceStartIndexTemp.substr(priceStartIndexTemp.lastIndexOf("_") + 1));

                var priceEndIndexTemp = $('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"] td:not(.hide-element):last')[0].id;
                var priceEndIndex = parseInt(priceEndIndexTemp.substr(priceEndIndexTemp.lastIndexOf("_") + 1));

                if ($('.div-lpc-wrapper #lpcMatixTable tr[id^="dest_"]') && priceStartIndex > 3) {
                    for (var i = 0; i < priceRowLength; i++) {
                        $($('#dest_' + i + ' td')[priceStartIndex]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex + 1]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex + 2]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceEndIndex]).addClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 1]).removeClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 2]).removeClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 3]).removeClass('hide-element');
                        $($('#dest_' + i + ' td')[priceStartIndex - 4]).removeClass('hide-element');
                    }
                }
            }
        }
    });

}

//Added so that view can resize itself as per viewport.
$(window).resize(function() {
	// If condition added to ensure that initialization happens only if page contains Vac Planner  
    if($( ".div-lpc-wrapper" ).length){
		initMobile();
		origVal = $('#vocationPlannerOriginSelection').text();
		destVal = $('#vocationPlannerDestSelection').text();
		//alignDD(origVal,destVal);
	} //End of If
});

//Method to align both dropdowns properly, whenever viewport changes.
function alignDD(origVal, destVal) {
    var eleDest = $("#destinationDD");
    var eleOrg = $("#originDD");
    if (destVal.length >= 15 || origVal.length >= 15) {
        $(eleDest).removeClass('pull-right');
        $(eleDest).addClass('dest-long');
        $(eleOrg).addClass('org-long');
    } else {
        $(eleDest).removeClass('dest-long');
        $(eleDest).addClass('pull-right');
        $(eleOrg).removeClass('org-long');
    }
}
//Method to arrange matrix look as per viewport.
function initMobile() {
    var width = $(window).width();
    var table = $(".div-lpc-wrapper #lpcMatixTable");
    if ($('.div-lpc-wrapper #lpcMatixTable tr').find('td.hide-element')) {
        $($('.div-lpc-wrapper #lpcMatixTable tr').find('td.hide-element')).removeClass('hide-element');
    }
    if ($('.div-lpc-wrapper #lpcMatixTable th')) {
        $($('.div-lpc-wrapper #lpcMatixTable').find('th.hide-element')).removeClass('hide-element');
    }
    if ($(table)) {
        for (var x = 0; x < ($(".div-lpc-wrapper #lpcMatixTable")[0].rows.length); x++) {
            for (var k = 0; k < ($(".div-lpc-wrapper #lpcMatixTable")[0].rows[x].cells.length); k++) {
                if (width >= 320 && width <= 568) {
                    if (k >= 2) {
                        var cell = $(".div-lpc-wrapper #lpcMatixTable")[0].rows[x].cells[k];
                        var $cell = $(cell);
                        //$cell.addClass('hide-element');	Commented for months not coming properly in mobile view
                    }
                }
                if (width >= 569 && width <= 767) {
                    if (k >= 3) {
                        var cell = $(".div-lpc-wrapper #lpcMatixTable")[0].rows[x].cells[k];
                        var $cell = $(cell);
                        //$cell.addClass('hide-element');	Commented for months not coming properly in mobile view
                    }
                }
                if (width >= 768 && width <= 1023) {
                    if (k >= 4) {
                        var cell = $(".div-lpc-wrapper #lpcMatixTable")[0].rows[x].cells[k];
                        var $cell = $(cell);
                        //$cell.addClass('hide-element');	Commented for months not coming properly in mobile view
                    }
                }
            }
        }
    }

    registerSwipeEvents();
}

//Method to make month header sticky upon scroll.
$(function() {
	// If condition added to ensure that initialization happens only if page contains Vac Planner  
    if($( ".div-lpc-wrapper" ).length){
		$(window).scroll(sticky_relocate);
		sticky_relocate();
	} // End of If
});

function hideLoading() {
    $('.ui-loader').addClass('hide');
}
//Method to create LPC Matrix.
function createTable() {
    if ($("#LPCTable")) {
        $("#LPCTable").html('<table class="table table-condensed table-responsive " id="LPCmatrix"><tr id="matrixRow"><td class="destCityCol"><table class="table" id="destListTable" class="destListCol"></table></td>' +
            '<td class="matrix-lpc-wrapper"><table class="table" id="lpcMatixTable"><tr class="lpc-matrix-label" id="matrixMonthList"></tr></table></td>' +
            '</tr></table>');
    }
}
/**Method to get month list starting from current month **/
function getMonthList() {
    var today = new Date();
    var aMonth = today.getMonth();
    var i;
    var matrixMnthList = $(".div-lpc-wrapper #matrixMonthList");
    for (i = 0; i < 12; i++) {
        var monthRow = '<th class="label-month-lpc-wrapper" id=\"' + i + '\">' + monthArray[aMonth] + '</th>';
        if ($(matrixMnthList)) {
            $(matrixMnthList).append(monthRow);
        }
        aMonth++;
        if (aMonth > 11) {
            aMonth = 0;
        }
    }
}
/**Method to stick month list bar on scroll **/
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top;
    if($('#stickyDiv').offset()){
    	div_top = $('#stickyDiv').offset().top;
    }
    var h = $('.lpcHeading').height() + $('.lpcTopHeader').height() + $('.lpcDataTbl').height();
    if (h > window_top) {
        if (window_top > div_top) {
            $('.div-lpc-wrapper .label-month-lpc-wrapper').addClass('stick-month-lpc-wrapper');
            $('.div-lpc-wrapper .blank-col').addClass('stick-blank-lpc-wrapper label-month-lpc-wrapper');
            $('.div-lpc-wrapper #matrixMonthList').addClass('stick-lpc-wrapper');

        } else {
            $('.div-lpc-wrapper .label-month-lpc-wrapper').removeClass('stick-month-lpc-wrapper');
            $('.div-lpc-wrapper .blank-col').removeClass('stick-blank-lpc-wrapper label-month-lpc-wrapper');
            $('.div-lpc-wrapper #matrixMonthList').removeClass('stick-lpc-wrapper');
            //collide = false;
        }
    } else {
        checkCollision();
    }
}
/**Method to get data from json **/
function getData() {

    var formatStartDate = getFormattedDateForApi(startDate);
    var formatEndDate = getFormattedDateForApi(endDate);

    lpcOriginCity = "";
    
    $.ajax({
        url: baseURL,
        data: {
            "from": lpcOrigin,
            "to": lpcDestList,
            "startDate": formatStartDate,
            "endDate": formatEndDate,
            "paxType": "ADT",
            "displayType": "MONTHLY",
            "pos": pos,
            "tripType": tripType
        },
        beforeSend: function(jqXHR, settings) {
            //$(".div-lpc-wrapper .lpcDataTblWrap").hide();
            $(".div-lpc-wrapper .vpLoader").show();
            //jqXHR.setRequestHeader('Authorization', oauthToken);
            jqXHR.setRequestHeader('Accept-Language', localeHeader);
            //return true;
        },
        complete: function() {
            $(".div-lpc-wrapper .vpLoader").hide();
            $(".div-lpc-wrapper .lpcDataTblWrap").hide();
            $(".div-lpc-wrapper .lpcDataTblWrap").fadeIn('slow');
        },
        success: function(data, textStatus, jqXHR) {

            var finalPrice = "";
            MIN_PRICE = 999999999;
            MAX_PRICE = 0;

            jsonData = data;
            if ($('[id^=destination_]')) {
                $('[id^=destination_]').remove();
            }
            if ($('[id^=dest_]')) {
                $('[id^=dest_]').remove();
            }
            if ($(".div-lpc-wrapper .blank-col")) {
                $(".div-lpc-wrapper .blank-col").remove();
            }

            $(".div-lpc-wrapper #destListTable").append('<tr><td class="blank-col">&nbsp;</td></tr>');


			var j=0;
            var today = new Date();
            var accessMonth = today.getMonth();
            for (var key in data.searchResponse) {

				//console.log(data.searchResponse[key].destinationCity.name);

				updatedestlist.push(data.searchResponse[key].destinationCity.name);

            }
            // console.log(updatedestlist);
            updatedestlist = updatedestlist.sort();
           // console.log(updatedestlist);
           // function to sort the destination set -cms-608
            data.searchResponse.sort(function(a, b){
                var nameA=a.destinationCity.name.toLowerCase(), nameB=b.destinationCity.name.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            //console.log(data.searchResponse);

            for (var key in data.searchResponse) {

                if (lpcOriginCity == "") {
                    lpcOriginCity = data.searchResponse[key].originCity.name;
                    lpcOriginAirport = data.searchResponse[key].originAirport.name;

                    if(neworgCity == undefined){
						$(".lpcTableDiv").find("h4").text(oldorgCity + ' ● ' + terms);
                    }
                    else $(".lpcTableDiv").find("h4").text(neworgCity + ' ● ' + terms);
                }





                var row = '<tr role="menuitem" aria-label="'+data.searchResponse[key].destinationCity.name+ ( key==0?' Press down arrow key for city selection and tab key respective lowest prices':'')+'" tabindex="0" id=\"destination_' + data.searchResponse[key].destinationCity.code + '\" class="dest-city dest_'+j+'">' +
                    '<td class="dest-city-cell">' + data.searchResponse[key].destinationCity.name + '</td>' +
                    '</tr>';




                $(".div-lpc-wrapper #destListTable").append(row);
                $(".div-lpc-wrapper #lpcMatixTable").append('<tr id=\"dest_' + key +
                    '\" class="add-bottom-border" data-destination-airport=\"' + data.searchResponse[key].destinationAirport.name +
                    '\" data-destination-city=\"' + data.searchResponse[key].destinationCity.name +
                    '\" data-destination-code=\"' + data.searchResponse[key].destinationAirport.code + '\">');
                var i = 0;
                for (var cost in data.searchResponse[key].flightProducts) {
                     var lastid='';
                            if(cost == 11){
                                lastid = 'lastitem';
                            }else{
                                lastid = '';
                            }
                    if (i < 12) {
                        currCode = data.searchResponse[key].currency || '';
                        var outBoundDate = data.searchResponse[key].flightProducts[cost].outBoundDate;
                        var inBoundDate = data.searchResponse[key].flightProducts[cost].inBoundDate;
                        var lowestCost = data.searchResponse[key].flightProducts[cost].lowestPrice.totalPrice;
                        if (lowestCost != "NA") {
                            lowestCost = parseInt(lowestCost.split('.')[0]);
                            if (MIN_PRICE > lowestCost) {
                                MIN_PRICE = lowestCost;
                            }
                            if (MAX_PRICE < lowestCost) {
                                MAX_PRICE = lowestCost;
                            }
                        }

                        //Changes for Slider - start
                        if (lowestCost == "NA") {
                            var firstOfTheMonth = new Date(today);
                            if (i > 0) {
                                firstOfTheMonth.setDate(1);
                                firstOfTheMonth.setMonth(firstOfTheMonth.getMonth() + i); // It should wrap to next year
                            }
                            var formattedFirst = getFormattedDateForApi(firstOfTheMonth);

                            var lastOfTheMonth = new Date(firstOfTheMonth);
                            lastOfTheMonth.setDate(1);
                            lastOfTheMonth.setMonth(firstOfTheMonth.getMonth() + 1); // First of next month
                            lastOfTheMonth.setDate(lastOfTheMonth.getDate() - 1); // A day previous to that
                            if (i == 11) {
                                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                                var maxLimit = 358;
                                var diffDays = Math.round(Math.abs((lastOfTheMonth.getTime() - today.getTime()) / (oneDay))) - maxLimit;
                                if (diffDays > 0) {
                                    lastOfTheMonth.setDate(lastOfTheMonth.getDate() - diffDays);
                                }
                            }
                            var formattedLast = getFormattedDateForApi(lastOfTheMonth);

                            lowestCost = NO_PRICE_TEXT;

                            var priceRow = '<td aria-label="Lowest Price for '+ monthArray[accessMonth]+' is not available. Referesh button." tabindex="0" class=\"price-list-heading-lpc-wrapper blank-price '+lastid+'\" id=\"dest_' + key + '_' + cost + '\" data-attr=\"-1\" data-first="' + formattedFirst + '" data-last="' + formattedLast + '" data-outbound-date=\"' + outBoundDate + '" data-inbound-date=\"' + inBoundDate + '"><span>' + lowestCost + '</span></td>';
                        } else {

                            if (enable) {
                                // alert("LPC: currFormat : enabled"+enable);
                                finalPrice = accounting.formatMoney(lowestCost, prefix, precision, thousand, decimal) + suffix;
                                //console.log("formattedPrice : LPC : inside ajax call: currency formatter enabled "+finalPrice);

                            } else {
                                //alert("LPC: currFormat : disabled"+enable);
                                finalPrice = Math.round(lowestCost) + ":-";
                                //console.log("formattedPrice : LPC : inside ajax call: currency formatter disabled"+finalPrice);
                            }


                            var priceRow = '<td aria-label="Lowest Price for '+ monthArray[accessMonth]+' is '+lowestCost+'" tabindex="0" class=\"price-list-heading-lpc-wrapper valid-price '+lastid+'\" id=\"dest_' + key + '_' + cost + '\" data-attr=\"' + lowestCost + '" data-outbound-date=\"' + outBoundDate + '" data-inbound-date=\"' + inBoundDate + '"><span>' + finalPrice + '</span></td>';

                        }

                        //Changes for Slider - end
                        $(".div-lpc-wrapper #dest_" + key).append(priceRow);
                    }

                                   accessMonth++;
                                if (accessMonth > 11) {
                                    accessMonth = 0;
                                }


                    i = i + 1;
                }





                $(".div-lpc-wrapper #lpcMatixTable").append('</tr>');

				j=j+1;

               


            }



             $(".dest-city").on("keydown", function(e){
                    if(e.which==9 && !e.shiftKey){

                        var focusId=(e.currentTarget.className).split(' ')[1];
                        //console.log(focusId);
                        setTimeout(function(){$("#"+focusId+" td:first-child").focus();},100);
                         e.preventDefault();
                    }
                 if(e.which==40) {
                     if((e.currentTarget.className).split(' ')[1].split("_")[1]!=(data.searchResponse.length - 1)){
						var nextDownFocusId=Number((e.currentTarget.className).split(' ')[1].split("_")[1]) + 1;

                        setTimeout(function(){$(".dest_"+nextDownFocusId).focus();},100);
                         e.preventDefault();
                     }
                 }
                 if(e.which==38){
                     if((e.currentTarget.className).split(' ')[1].split("_")[1]!=0){
                     var nextUpFocusId=Number((e.currentTarget.className).split(' ')[1].split("_")[1]) - 1;

                        setTimeout(function(){$(".dest_"+nextUpFocusId).focus();},100);
                         e.preventDefault();
                     } 

                   }
                  if(e.which==9 && e.shiftKey)
                       {

                            e.preventDefault();
                        }


                });
            $(".add-bottom-border td:first-child").on("keydown",function(e){

        if(e.which==9 && e.shiftKey)
        {
            var idVal=(e.currentTarget.id).split("_")[0]+"_"+(e.currentTarget.id).split("_")[1];
            $("."+idVal).focus();
            e.preventDefault();
        }
    });

            $(".lastitem").on("keydown", function(e){
                    if(e.which==9){
						var x=Number((e.currentTarget.id).split('_')[1])+1;
                        var lastFocusId=(e.currentTarget.id).split('_')[0]+"_"+x;

                        setTimeout(function(){$("."+lastFocusId).focus();},100);
                         e.preventDefault();
                    }
                });

            // Register flex pricer handler
            $('.price-list-heading-lpc-wrapper.blank-price').on('click', callFlexPricer);

            // Register show calendar handler 
            $('.price-list-heading-lpc-wrapper.valid-price').on('click keydown', showCalendar);


            if (MIN_PRICE == 999999999) {
                MIN_PRICE = 0;
            }
            jsondataNew = jsonData; 
            var min = MIN_PRICE;
            var max = MAX_PRICE;
            showSlider(MIN_PRICE, MAX_PRICE, jsonData); //Changes for Slider 

            setTimeout(initMobile, 20);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown);
        }
    });
}

//Method to implement price slider.
function showSlider(minPrice, maxPrice, json) {



    //var $slide = $(".div-lpc-wrapper #slider-range-min").slider({
    $(".div-lpc-wrapper #slider-range-min").slider({
        range: "min",
        value: maxPrice, //selectedMaxPrice,
        min: minPrice,
        max: maxPrice,
        slide: function(event, ui) {
            //selectedMaxPrice = ui.value;
            $("#amount").val(ui.value + " " + currCode);
        }
    });


    $("#amount").val($("#slider-range-min").slider("value") + " " + currCode);
    $("#minRange").text(minPrice + " " + currCode);
    $("#maxRange").text(maxPrice + " " + currCode);


}

// Method to check if two divs are colliding. Used to make month header unsticky, once its past the matrix.
function collision($div1, $div2) {
    var x1 = 0,
        y1 = 0,
        h1 = 0,
        w1 = 0,
        b1 = 0,
        r1 = 0,
        x2 = 0,
        y2 = 0,
        h2 = 0,
        w2 = 0,
        b2 = 0,
        r2 = 0;
    x1 = $div1.offset().left;
    y1 = $div1.offset().top;
    h1 = $div1.outerHeight(true);
    w1 = $div1.outerWidth(true);
    b1 = y1 + h1;
    r1 = x1 + w1;
    x2 = $div2.offset().left;
    y2 = $div2.offset().top;
    h2 = $div2.outerHeight(true);
    w2 = $div2.outerWidth(true);
    b2 = y2 + h2;
    r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}
// Method to make month header unsticky.
function checkCollision() {

    var stickyDiv = $('.div-lpc-wrapper .label-month-lpc-wrapper');
    var collideDiv = $('.div-lpc-wrapper .collide-row');
    var collide;
    if($(collideDiv).length && $(stickyDiv).length){
     collide = collision($(collideDiv), $(stickyDiv));
    }
    if (collide) {
        $('.div-lpc-wrapper .label-month-lpc-wrapper').removeClass('stick-month-lpc-wrapper');
        $('.div-lpc-wrapper .blank-col').removeClass('stick-blank-lpc-wrapper label-month-lpc-wrapper');
        $('.div-lpc-wrapper #matrixMonthList').removeClass('stick-lpc-wrapper');
    }
}

function initVacPlanner(newOriginCode) { //declaring initVacPlanner function
 if (onPageLoad) {
    createTable();
    getMonthList();

    //Origin picker in vacation planner: CMS-282
    onPageLoad = false;
	if(!customOrgAdded){
		newOriginCode = newOriginCode || getOriginCookie() || defaultOriginCode;
	}
	populateOrigin();
	destSet = $("#vocationPlannerDestDropDown li:first");
	$("#vocationPlannerDestSelection").text(destSet.find("a").text());

    orgSet = $("#vocationPlannerOriginDropDown li[data-value='" + newOriginCode + "']");
    $("#vocationPlannerOriginSelection").text(orgSet.find("a").text());
	var orgCity = $("#vocationPlannerOriginSelection").text();
     //console.log(orgCity);
    oldorgCity = orgCity ;

	//End of adition origin picker in vacation planner: CMS-282

    initialize(newOriginCode); // Arnab

    getData();
    $(".vacation-planner").show();

    setTimeout(initMobile, 50);
 }
    //setTimeout(hideLoading, 50);		// Arnab - commented
}

// Arnab: Added for AEM integration


function callLPC(tdItem) {
    var trItem = tdItem.closest("tr");
    var dest = trItem.attr("data-destination-code");
    var org = lpcOrigin;
    var type = tripType;

    var formatStartDate = tdItem.attr("data-first");
    var formatEndDate = tdItem.attr("data-last");

    //console.log("For LPC : Orig:" + org +" : Dest:"+ dest +" : Type:"+ type +" : StartDate:"+ formatStartDate +" : EndDate:"+formatEndDate);

    $.ajax({
        url: baseURL,
        data: {
            "from": lpcOrigin,
            "to": dest,
            "startDate": formatStartDate,
            "endDate": formatEndDate,
            "paxType": "ADT",
            "displayType": "MONTHLY",
            "pos": pos,
            "tripType": tripType
        },
        beforeSend: function(jqXHR, settings) {
            //console.log("API call : token : " + oauthToken);
            // jqXHR.setRequestHeader('Authorization', oauthToken);
            jqXHR.setRequestHeader('Accept-Language', localeHeader);
            //return true;
        },
        success: function(data, textStatus, jqXHR) {
            //alert("insucces!!");
            var formattedPrice = "";

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var val = data[key];
                    for (var i = 0; i < val.length; i++) {
                        if (val[i].flightProducts != undefined && !isNaN(val[i].flightProducts[0].lowestPrice.totalPrice)) {
                            tdItem.attr("data-outbound-date", val[i].flightProducts[0].outBoundDate);
                            tdItem.attr("data-inbound-date", val[i].flightProducts[0].inBoundDate);

                            var totalPrice = val[i].flightProducts[0].lowestPrice.totalPrice;
                            tdItem.attr("data-attr", totalPrice);
                            if (enable) {
                                // alert("LPC: currFormat : enabled"+enable);
                                formattedPrice = accounting.formatMoney(totalPrice, prefix, precision, thousand, decimal) + suffix;
                                //console.log("formattedPrice : LPC : inside ajax call: currency formatter enabled "+formattedPrice);

                            } else {
                                //alert("LPC: currFormat : disabled"+enable);
                                formattedPrice = Math.round(totalPrice) + ":-";
                                // console.log("formattedPrice : LPC : inside ajax call: currency formatter disabled"+formattedPrice);
                            }

                            var spanItem = '<span>' + formattedPrice + '</span>';
                            tdItem.html(spanItem);
                            /*if(totalPrice > selectedMaxPrice && selectedMaxPrice != 0){
									tdItem.find("span").css("display","none");
                                }*/

                            tdItem.removeClass("blank-price");
                            tdItem.addClass("valid-price");

                            tdItem.on('click', showCalendar);

                            var lowestCost = totalPrice;

                            if (lowestCost != "NA") {
                                lowestCost = parseInt(lowestCost.split('.')[0]);
                                if (lowestCost < MIN_PRICE || (MIN_PRICE == 0 && MAX_PRICE == 0)) {
                                    MIN_PRICE = lowestCost;
                                }
                                if (lowestCost > MAX_PRICE || (MIN_PRICE == 0 && MAX_PRICE == 0)) {
                                    MAX_PRICE = lowestCost;
                                }
                            }
                        } else if (val[i].flightProducts != undefined) {
                            var spanItem = '<span>N/A</span>';
                            tdItem.html(spanItem);
                            tdItem.removeClass("blank-price");
                        } else {
                            console.log("Vacation Planner Campaign : Unable to process API response");
                        }
                    }


                    // Repaint Slider
                    // showSlider(MIN_PRICE, MAX_PRICE, null); 


                    // And re evaluate which prices to show
                    $(".div-lpc-wrapper #lpcMatixTable tr[id^=\"dest_\"]").find('td').each(function() {

                        var colPriceValue = parseInt($(this).attr('data-attr'));
                        if (colPriceValue > MAX_PRICE) {
                            $(this).find("span").hide();
                        } else {
                            $(this).find("span").show();
                        }
                    });

                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown);
        }
    });

}


function callFlexPricer(e) {
    var tdItem = $(this);

    var trItem = $(this).closest("tr");
    var dest = trItem.attr("data-destination-code");

    var org = lpcOrigin;
    var type = tripType;

    var formatStartDate = tdItem.attr("data-first");
    //console.log("Start date : " + formatStartDate);
    var today = new Date();
    //console.log("Today : " + today);
    var date = today;
    date.setFullYear(formatStartDate.substring(0, 4));
    date.setMonth(formatStartDate.substring(4, 6) - 1);
    date.setDate(formatStartDate.substring(6, 8));
    //console.log("Date : " + date);
    if (date.getMonth() == today.getMonth()) {
        if (date.getDate() > 15) {
            date = today;
        } else {
            date.setDate(15);
        }
    }
    formatStartDate = getFormattedDateForApi(date);


    // Show the loader icon
    var loaderImg = '<img style="opacity:0.75;margin:auto;text-align:center;" src="/etc/designs/flysas/clientlibs-aem/images/loading-spinner-grey.gif"/>';
    tdItem.find('span').html(loaderImg);
    tdItem.removeClass("blank-price");
    tdItem.unbind("click"); // So that user cannot continuously click and invoke FlexPricer          

    var queryParameters;
    if (type == 'O') {
        queryParameters = {
            "outDate": formatStartDate,
            "bookingFlow": "REVENUE",
            "displayType": "CALENDAR",
            "lng": "GB",
            "pos": pos,
            "channel": "web",
            "from": lpcOrigin,
            "to": dest
        };
    } else if (type == 'R') {
        queryParameters = {
            "outDate": formatStartDate,
            "inDate": formatStartDate,
            "bookingFlow": "REVENUE",
            "displayType": "CALENDAR",
            "lng": "GB",
            "pos": pos,
            "channel": "web",
            "from": lpcOrigin,
            "to": dest
        };
    }
    // changed api call
    $.ajax({
        url: flexpricerURL,
        data: queryParameters,
        beforeSend: function(jqXHR, settings) {

        },
        success: function(data, textStatus, jqXHR) {
            if (data.errors == null) {
                // Call LPC API for that cell
                //callLPC(tdItem);
                setTimeout(
                    function() {
                        callLPC(tdItem);
                    },
                    5000);
            } else {
                // 
                tdItem.find('span').empty();
                tdItem.addClass("blank-price");
                tdItem.bind("click");
                console.log(data.errors);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + errorThrown);
        }
    });



}

function showCalendar(e) {
    // added enter and space keydowfunctionlity
    if(e.type == 'click' || e.which == 13 || e.which == 32){
        // Excute the function.

    var tdItem = $(this);
    var outbound = tdItem.attr("data-outbound-date");
    var inbound = tdItem.attr("data-inbound-date");
    if (inbound == "undefined" || inbound == null) {
        var outDate = new Date(outbound);
        var inDate = new Date(outbound);
        inDate.setDate(outDate.getDate() + 7);
        inbound = inDate.getFullYear() + '-' + pad(inDate.getMonth() + 1) + '-' + pad(inDate.getDate()) + 'T00:00:00.000Z';
    }
    var price = tdItem.attr("data-attr");

    var trItem = $(this).closest("tr");
    var dest = trItem.attr("data-destination-code");
    var destCity = trItem.attr("data-destination-city");
    var destApt = trItem.attr("data-destination-airport");

    var org = lpcOrigin;
	var type = destSet.attr("data-trip-type");
	

		var tripType = 'RT';
		window.location.href = "/lowpricecalendar?search=" + tripType + "_" + org + "-" + dest + "-" + getFormattedDateForUI(outbound) + "-" + getFormattedDateForUI(inbound) + "_a1c0i0y0_REV";

    }
}


// Arnab: End of addition for AEM integration

//Origin picker in vacation planner: CMS-282

function populateOrigin() {

    var selectedCode = getCountryCode();

	$("#vocationPlannerOriginDropDown").empty(); 

	//Added for AC-226
    var k=1;
	if(customOrgAdded){
		for(var i=0; i<orgNameSet.length; i++){
            $("#vocationPlannerOriginDropDown").append('<li class="origin-dd-row" data-value=' + orgCodeSet[i] + '>' + '<a href="javascript:" aria-label="' +orgNameSet[i] +' '+k+' of '+ orgNameSet.length +'">' + orgNameSet[i] + '</a>' + '</li>');
			k++;
		}
	} else {
		if(preferredOriginCodes != null && preferredOriginCodes != undefined && preferredOriginNames != null && preferredOriginNames != undefined){
            var preferredOriginCodesArr = preferredOriginCodes.split(",");
            var preferredOriginNamesArr = preferredOriginNames.split(",");
            if(preferredOriginCodesArr.length == preferredOriginNamesArr.length){
                for(var i=0; i<preferredOriginCodesArr.length; i++) {
                    //Added for AC-226
                    $("#vocationPlannerOriginDropDown").append('<li class="origin-dd-row" data-value=' + preferredOriginCodesArr[i] + '>' + '<a href="javascript:" aria-label="'+ preferredOriginNamesArr[i].replace(/-/g, ",") +' '+k+' of '+ preferredOriginNamesArr.length+'">' + preferredOriginNamesArr[i].replace(/-/g, ",") + '</a>' + '</li>');
                    k++;
                    //End: AC-226
                }
            }
        }
	}
	$("#vocationPlannerOriginDropDown li a").on("click", function() {

        var currentOrigin = getOriginCookie() || defaultOriginCode;
        
        origVal = $(this).text();
        var selectedOriginCode = $(this).parent().attr('data-value');
        
        //destVal = $('#vocationPlannerDestSelection').text();
        //alignDD(origVal,destVal);
        $(orgSeletion).text(origVal);
        
        if (browser.indexOf("chrome") > 0 || browser.indexOf("mobile") > 0) {
            $(orgDD).addClass('hide-element');
        }
        //Added for AC-226
        $("#vocationPlannerOrigButton").attr("aria-expanded", false);
        $("#updateselect").html('You have selected '+origVal);	
        //End: AC-226
        
        if (!customOrgAdded && currentOrigin != selectedOriginCode) {
            
            $(".countryName").text(origVal);
			neworgCity = origVal;
            
            $(".countryName").attr("data-org-code", selectedOriginValue);
            
            writeOriginCookie(selectedOriginCode);


            $(document).trigger("originChange", [selectedOriginCode]);
            
            
        } else if(customOrgAdded){
            onPageLoad = true; 
            initVacPlanner(selectedOriginCode);
        }
      //  getData();
    });
}
//End of adition origin picker in vacation planner: CMS-282

});
/*** End of vacation planner **/


/*** Start of marketing banner **/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {
	$(".bannerWrap").each( function( ) {
        var parent1 = $(this).parent();
        var child1 = $(this).find("[class*=Banner]");
		/*if($(this).attr("data-display")){
			parent1.addClass("hideBanner");
		} else {*/
			if(parent1.hasClass("swatch")){
				if( parent1.closest(".cms-homepage-wrapper").length > 0 ) { /*Fix for CMS-438*/
					/*parent1.css("margin-top","10px");*/
					parent1.css("margin-bottom","20px");
				} /*End of Fix for CMS-438*/
				 /*parent1.css("max-width",child1.css("max-width"));*/
				parent1.css("width","100%");
				parent1.css("display","block");
			}
			var grandParent = parent1.parent();

			if(grandParent.hasClass("image")){
				grandParent.css("margin-bottom","0px");
			}

			//Resize to mobile for large banners
			if ($(window).width() <= 767) {
				if($(this).find(".multiple-destination-campaign").length > 0){
					realignCampaignsForMobile($(this).find('.largeBanner')); 
				}
			}

            //accessibility
            if($(this).hasClass('cta')){
                $(this).find('a').attr('aria-label',$(this).find('a').text().trim());
            }

			$(this).show();	
		//}
    });

    function realignCampaignsForMobile(largeBannerObj) {

        var xHeight = largeBannerObj.height();

        largeBannerObj.after( "" );

        // For each multi destn block in the banner..
        largeBannerObj.find(".multiple-destination-campaign").each(function(index) {
            if(index > 0) {
            	$(this).find(".campaignLabel").hide();
            }
            largeBannerObj.parent().append(($(this).html()));
            $(this).remove();
        });

        var closestSwatch = largeBannerObj.closest(".swatch");
        closestSwatch.css("background-size", "auto " + (xHeight+16) + "px");
        closestSwatch.css("background-repeat", "no-repeat");
    }


	//var target;
   	function initBanner() {
        //alert('Inside Init');
        registerEvents();
    }



    /******************************For ToolTip**************************************/

    function registerEvents() {
        //alert('Inside banner');
		$(".fareConditions").on('click',showTooltip);
		$(".fareCondtionTooltip .icon-close").on('click',hideTooltip);
	}
	function showTooltip(event){

		var target = $(event.currentTarget);

        target.closest(".fareCondtionTooltip").find(".errorInfo").show();
        //target.closest(".bannerWrap").find(".errorInfo").show();
		/*$('.fareCondtionTooltip .errorInfo').not('.'+target.errorInfo).hide();		
		$('.'+target).show();*/		
	}
	function hideTooltip(event){
		var target = $(event.currentTarget).parent().hide();
	}


    /******************************For Banner titles in H1.. h4 **************************************/
	$(".bannerWrap h1, .bannerWrap h2, .bannerWrap h3, .bannerWrap h4, .bannerWrap span.priceValue").each( function( ) {
		var bannerDiv = $(this).closest(".bannerWrap");
		var bkColor = bannerDiv.attr("data-highlight-color");

		if(bkColor != null && bkColor != ""){
			//$(this).css("background-color",bkColor);
                $(this).addClass(bkColor);
                $(this).css("display","inline-block");
                $(this).css("line-height","110%");
				$(this).css('cssText', $(this).attr('style')+'color:#fff !important;');/****************added for cms-610*************/
                $(this).css('cssText', $(this).attr('style')+'padding:10px !important;');

		} 

        //accessibility
        if(!$(this).attr('aria-label') && !bannerDiv.hasClass('cta')){
            $(this).attr('aria-label',$(this).text().trim());
        }
	});

   	initBanner();

 }); 
/*** End of marketing banner **/
/*** Start of red circle in banner **/
//$(document).ready(function($) {
$(document).on("loadCMS", function(event) {

    function initBannerFlashMsg() {

        $(".flashMessage").each(function() {
            var circleDiv = $(this).closest(".flashMessage");
            var circleColor = circleDiv.attr("data-countdown-color");

            if (circleColor != null && circleColor != "") {

                $(this).addClass(circleColor);
            }

        });

        $(".flashMessage .notimer").each(function() {
            $(this).closest('.flashMessage').css("display", "table");


        });

        $(".flashMessage .timer").each(function() {

				var currObj = $(this);

				var expDateTime = $(this).attr("data-expiryDateTime");
				var expDate;
				var expTime;
				if(expDateTime != null && expDateTime != undefined) {
					expDate = expDateTime.substring(0, expDateTime.indexOf(" "));
					expTime = expDateTime.substring(expDateTime.indexOf(" ")+1);



					var blockDays = $(this).attr("data-blockDays");
					var blockHours = $(this).attr("data-blockHours");
					var blockMinutes = $(this).attr("data-blockMinutes");
					var blockSeconds = $(this).attr("data-blockSeconds");


					var hours = Number(expTime.match(/^(\d+)/)[1]);
					var minutes = Number(expTime.match(/:(\d+)/)[1]);
					var AMPM = expTime.match(/\s(.*)$/)[1];

					if(AMPM == "PM" && hours<12) 
						hours = hours+12;
					if(AMPM == "AM" && hours==12) 
						hours = hours-12;

					var sHours = hours.toString();
					var sMinutes = minutes.toString();

					if(hours<10) 
						sHours = "0" + sHours;
					if(minutes<10) 
						sMinutes = "0" + sMinutes;
					var timeStr = sHours + ":" + sMinutes;	

					var date_future_client_time;
					if(expDate == undefined) {

						date_future_client_time = new Date();
					} else {

						var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
						if(mmddyyFormat.test(expDate)){
							var match = mmddyyFormat.exec(expDate);
							var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];

							date_future_client_time = new Date(dateStr + 'T' + timeStr + 'Z');
						} else {

							date_future_client_time = new Date(expDate);
						}
					}

					var date_future_utc_time = createDateAsUTC(date_future_client_time);

					var date_future = date_future_utc_time.getTime();

					var date_now_client_time = new Date();

					var date_now_utc_time = convertDateToUTC(date_now_client_time);

					var date_now = date_now_client_time.getTime();

					var calculateCountDown = setInterval(function() {

						if (date_future > date_now) {

							seconds = Math.floor((date_future - (date_now)) / 1000);
							minutes = Math.floor(seconds / 60);
							hours = Math.floor(minutes / 60);
							days = Math.floor(hours / 24);

							hours = hours - (days * 24);
							minutes = minutes - (days * 24 * 60) - (hours * 60);
							seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

							if (days < 10) {
								days = "0" + days;
							}
							if (hours < 10) {
								hours = "0" + hours;
							}
							if (minutes < 10) {
								minutes = "0" + minutes;
							}

							if (seconds < 10) {
								seconds = "0" + seconds;
							}


							if (blockDays == "true") {

								if (blockHours == "true") {

									if (blockMinutes == "true") {

										if (blockSeconds == "true") {

										} else {
											currObj.text(seconds);
										}

									} else if (blockSeconds == "true") {
										currObj.text(minutes);
									} else {

										currObj.text(minutes + " : " + seconds);

									}


								} else if (blockMinutes == "true") {
									if (blockSeconds == "true") {
										currObj.text(hours);
									} else {
										currObj.text(hours + " : " + seconds);
									}

								} else if (blockSeconds == "true") {

									currObj.text(hours + " : " + minutes);

								} else {
									currObj.text(hours + " : " + minutes + " : " + seconds);
								}
							} else if (blockHours == "true") {

								if (blockMinutes == "true") {

									if (blockSeconds == "true") {
										currObj.text(days);
									} else {
										currObj.text(days + " : " + seconds);
									}
								} else if (blockSeconds == "true") {
									currObj.text(days + " : " + minutes);
								} else {
									currObj.text(days + " : " + minutes + " : " + seconds);
								}
							} else if (blockMinutes == "true") {

								if (blockSeconds == "true") {
									currObj.text(days + " : " + hours);
								} else {
									currObj.text(days + " : " + hours + " : " + seconds);
								}

							} else if (blockSeconds == "true") {

								currObj.text(days + " : " + hours + " : " + minutes);
							} else {
								currObj.text(days + " : " + hours + " : " + minutes + " : " + seconds);
							}


							currObj.closest('.flashMessage').css("display", "table");
							//accessibility
							currObj.attr('aria-label', currObj.text());
						} else {
							currObj.closest('.flashMessage').hide();

							clearInterval(calculateCountDown);
							return;
						}

						date_now = date_now + 1000;
					}, 1000);

				}
			
        });

    }




    initBannerFlashMsg();
});
/*** End of red circle in banner **/
// Start of single destination hero campaigns **/
$(document).on("originChange", function(event, newOriginCode) {
	initSingleHero(newOriginCode);  //calling initSingleHero funtion
});

function initSingleHero(newOriginCode) { //declaring initSingleHero funtion

	var API_OFFERS_LOWPRICE = "offers/flightproduct/lowestFare";  // lpc url 
	var baseURL = getApiHost() + API_OFFERS_LOWPRICE;
	var localeHeader = getLanguageCode() + '_'+ getCountryCode();

	$(".heroCampaignWrap").each(function() {

		var currObj = $(this);

		var origName = $(this).attr("data-origName") || newOriginCode || getOriginCookie() || defaultOriginCode;

		//var baseURL = $(this).attr("data-base-url");
		var campaignTitle = $(this).attr("data-campaign-title");
		var campaignLabel = $(this).attr("data-campaign-label");
		var destName = $(this).attr("data-destName");
		var tripType = $(this).attr("data-tripType");


		var prefix = currObj.attr("data-prefix") || "";
		var precision = currObj.attr("data-precision") || 0;
		var decimal = currObj.attr("data-decimal") || "";
		var thousand = currObj.attr("data-thousand") || "";
		var suffix = currObj.attr("data-suffix") || "";
		var enable = currObj.attr("data-enable")|| false;

		//console.log(" prefix : "+prefix+" precision : "+precision+" decimal : "+decimal+" thousand : "+thousand+" suffix : "+suffix+" enable : single dest: "+enable);


		var pos = getPOS();

		var today = new Date();
		var x = $(this).attr("data-startDate");
		var startDate;
		if(x == undefined) {
			startDate = today;
		} else{ 
			var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
			if(mmddyyFormat.test(x)){
				var match = mmddyyFormat.exec(x);
				var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];
				startDate = new Date(dateStr);
			}
			else {
				startDate = new Date(x);

			}
			if(startDate < today) {
				startDate = today;
			} 
		}

		var formatStartDate = getFormattedDateForApi(startDate);

		var y = $(this).attr("data-endDate");
		var endDate;
		if(y == undefined) {
			endDate = new Date(startDate);
			//endDate.setDate(startDate.getDate() + 90); 
		} else{
			var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
			if(mmddyyFormat.test(y)){
				var match = mmddyyFormat.exec(y);
				var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];
				endDate = new Date(dateStr);
			}
			else {
				endDate = new Date(y);
			}
		}
		if(endDate <= startDate) {
			endDate.setDate(startDate.getDate() + 90);
		}
		
		var formatEndDate = getFormattedDateForApi(endDate);


		currObj.css("display","none");


	if(destName!=undefined && tripType!=undefined){
		$.ajax({
			url: baseURL,
			data: { 
				"from":origName,
				"to":destName,
				"startDate":formatStartDate,
				"endDate":formatEndDate,
				"paxType":"ADT",
				"displayType":"DAY",
				"pos":pos,
				"tripType":tripType
			} ,    
			beforeSend: function (jqXHR, settings) {
				//console.log("API call : token : " + oauthToken);
				//jqXHR.setRequestHeader('Authorization', oauthToken);
				jqXHR.setRequestHeader('Accept-Language', localeHeader);
				//return true;
			},
			success: function(data, textStatus, jqXHR) {
				var items = "";
				var cityClassName = "";
				var formattedPrice="";
				var validPrice = false;
				for (var key in data){
					if(data.hasOwnProperty(key)){
						var val = data[key];
						for(var i=0; i<val.length;i++){ // Per searchResponse

							// Defaults, if no price is returned
							var outBoundDate = today.toISOString();	// today
							var tempDay = new Date(); tempDay.setDate(today.getDate() + 7);
							var inBoundDate = tempDay.toISOString();	//  + 7 days
							formattedPrice = "";
							var totalPrice = 0;

							if(val[i].flightProducts!= undefined && !isNaN(val[i].flightProducts[0].lowestPrice.totalPrice)){

								validPrice = true;

								if(enable){
									formattedPrice = accounting.formatMoney(val[i].flightProducts[0].lowestPrice.totalPrice, prefix, precision, thousand, decimal) + suffix;
								}
								else{
									formattedPrice=Math.round(val[i].flightProducts[0].lowestPrice.totalPrice) +' '+val[i].currency;
								}

								outBoundDate = val[i].flightProducts[0].outBoundDate;	
								inBoundDate = val[i].flightProducts[0].inBoundDate;	
								totalPrice = val[i].flightProducts[0].lowestPrice.totalPrice;

							}
							else {
								// console.log("Single Hero Campaign : Unable to process API response");
							}

							currObj.find('.bannerDetailsWrapper .leftContent span.origin_label').html(val[i].originCity.name);
                            currObj.find('.bannerDetailsWrapper .leftContent span.origin_label').attr('aria-label',val[i].originCity.name);
							cityClassName =val[i].destinationCity.name;

							items = formattedPrice;
							currObj.find('.heroCampaignBtn').attr("data-attr-org",val[i].originAirport.code);
							currObj.find('.heroCampaignBtn').attr("data-attr-org-city",val[i].originCity.name);
							currObj.find('.heroCampaignBtn').attr("data-attr-org-airport",val[i].originAirport.name);
							currObj.find('.heroCampaignBtn').attr("data-attr-dest",val[i].destinationAirport.code);
							currObj.find('.heroCampaignBtn').attr("data-attr-dest-city",val[i].destinationCity.name);
							currObj.find('.heroCampaignBtn').attr("data-attr-dest-airport",val[i].destinationAirport.name);
							currObj.find('.heroCampaignBtn').attr("data-attr-type",tripType);
							currObj.find('.heroCampaignBtn').attr("data-attr-outbound",outBoundDate);
							currObj.find('.heroCampaignBtn').attr("data-attr-inbound",inBoundDate);
							currObj.find('.heroCampaignBtn').attr("data-attr-price",totalPrice);
							
							if(i==0){
								currObj.css("display","block");
								currObj.find(".heroCampaignButton").attr("title",val[i].destinationCity.name + " " + formattedPrice);
							}

						}
					}
				}
				currObj.find(".priceValue").html(items);
                currObj.find(".priceValue").attr('aria-label',items);

				if(campaignTitle == undefined || campaignTitle == ''){
					campaignTitle = cityClassName;
				}
				currObj.find("h2").html(campaignTitle);
                currObj.find("h2").attr('aria-label',campaignTitle);

				if(campaignLabel != ''){
					currObj.find('.bannerDetailsWrapper .leftContent span.camp_label').html(campaignLabel);
                    currObj.find('.bannerDetailsWrapper .leftContent span.camp_label').attr('aria-label',campaignLabel);
				}
				if(!validPrice){
					currObj.find('.bannerDetailsWrapper .leftContent span.camp_label').html("");
					currObj.find(".priceValue").closest(".rightContent").parent().html("");
				}


			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Single Hero Campaign : Error : " + errorThrown);
			}             
		});
	}


	});

}
/*** End of single destination hero campaigns **/
// Start of single destination campaigns **/
$(document).on("originChange", function(event, newOriginCode) {
	initSingleDesti(newOriginCode);  //calling initSingleDesti funtion
});

function initSingleDesti(newOriginCode) {  //declaring initSingleDesti funtion

	var API_OFFERS_LOWPRICE = "offers/flightproduct/lowestFare";  // lpc url 
	var baseURL = getApiHost() + API_OFFERS_LOWPRICE;
	var localeHeader = getLanguageCode() + '_'+ getCountryCode();

	$(".singleDestinationList").each(function() {

		var currObj = $(this);

		var origName = $(this).attr("data-origName") || newOriginCode || getOriginCookie() || defaultOriginCode;
        
		//var baseURL = $(this).attr("data-base-url");
		var campaignTitle = $(this).attr("data-campaign-title");
		var campaignLabel = $(this).attr("data-campaign-label");
		var destName = $(this).attr("data-destName");
		var tripType = $(this).attr("data-tripType");

		var prefix = currObj.attr("data-prefix") || "";
		var precision = currObj.attr("data-precision") || 0;
		var decimal = currObj.attr("data-decimal") || "";
		var thousand = currObj.attr("data-thousand") || "";
		var suffix = currObj.attr("data-suffix") || "";
		var enable = currObj.attr("data-enable")|| false;

		//console.log(" prefix : "+prefix+" precision : "+precision+" decimal : "+decimal+" thousand : "+thousand+" suffix : "+suffix+" enable : single dest: "+enable);

		var pos = getPOS();

		var today = new Date();
		var x = $(this).attr("data-startDate");
	   
		var startDate;
		if(x == undefined) {
			startDate = today;
		} else{ 
			var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
			if(mmddyyFormat.test(x)){
				var match = mmddyyFormat.exec(x);
				var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];
				startDate = new Date(dateStr);
			}
			else {
				startDate = new Date(x);

			}
			if(startDate < today) {
				startDate = today;
			} 
		}

		var formatStartDate = getFormattedDateForApi(startDate);

		var y = $(this).attr("data-endDate");
		var endDate;
		if(y == undefined) {
			endDate = new Date(startDate);
			//endDate.setDate(startDate.getDate() + 90); 
		} else{
			var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
			if(mmddyyFormat.test(y)){
				var match = mmddyyFormat.exec(y);
				var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];
				endDate = new Date(dateStr);
			}
			else {
				endDate = new Date(y);
			}
		}
		if(endDate <= startDate) {
			endDate.setDate(startDate.getDate() + 90);
		}

		var formatEndDate = getFormattedDateForApi(endDate);


		var closestBanner = $(this).closest('.bannerWrap');
		closestBanner.find('.campaignWrap').css("display","none");



	if(destName!=undefined && tripType!=undefined){
		$.ajax({
			url: baseURL,
			data: { 
				"from":origName,
				"to":destName,
				"startDate":formatStartDate,
				"endDate":formatEndDate,
				"paxType":"ADT",
				"displayType":"DAY",
				"pos":pos,
				"tripType":tripType,

			} ,    
			beforeSend: function (jqXHR, settings) {
				//console.log("API call : token : " + oauthToken);
				//jqXHR.setRequestHeader('Authorization', oauthToken)
				jqXHR.setRequestHeader('Accept-Language', localeHeader);
				//return true;
			},
			success: function(data, textStatus, jqXHR) {


				var items = "";
				var cityClassName = "";
				var formattedPrice="";
				var fP="";
				var validPrice = false;
				for (var key in data){
					if(data.hasOwnProperty(key)){
						var val = data[key];
						for(var i=0; i<val.length;i++){	// Per searchResponse

							// Defaults, if no price is returned
							var outBoundDate = today.toISOString();	// today
							var tempDay = new Date(); tempDay.setDate(today.getDate() + 7);
							var inBoundDate = tempDay.toISOString();	//  + 7 days
							formattedPrice = Granite.I18n.get("aem.commons.book-label"); // "BOOK"
							var totalPrice = 0;

							if(val[i].flightProducts!= undefined && !isNaN(val[i].flightProducts[0].lowestPrice.totalPrice)){

								validPrice = true;

								if(enable){
									formattedPrice = accounting.formatMoney(val[i].flightProducts[0].lowestPrice.totalPrice, prefix, precision, thousand, decimal) + suffix;
								}else{
									formattedPrice =Math.round(val[i].flightProducts[0].lowestPrice.totalPrice) +' ' +val[i].currency;
								}
								outBoundDate = val[i].flightProducts[0].outBoundDate;	
								inBoundDate = val[i].flightProducts[0].inBoundDate;	
								totalPrice = val[i].flightProducts[0].lowestPrice.totalPrice;

							} else{
								//console.log("Single destinations : Unable to process API response");
							}

							cityClassName =val[i].destinationCity.name;

							items = '<li onClick="onCampaignClick(this,event)" title="' + val[i].destinationCity.name + ' ' + formattedPrice + '" ' +
                                			'aria-label="' + val[i].destinationCity.name + ' ' + formattedPrice + '" ' +
											'" data-attr-org-airport="' + val[i].originAirport.name +
											'" data-attr-org="' + val[i].originAirport.code +
											'" data-attr-org-city="' + val[i].originCity.name +
											'" data-attr-dest-airport="' + val[i].destinationAirport.name +
											'" data-attr-dest="' + val[i].destinationAirport.code +
											'" data-attr-dest-city="' + val[i].destinationCity.name +
											'" data-attr-type="'+ tripType +
											'" data-attr-outbound="'+ outBoundDate +
											'" data-attr-inbound="'+ inBoundDate +
											'" data-attr-price="'+ totalPrice +
											'"><div class="priceValue">' + formattedPrice + '</div></li>';

							if(i==0){
								closestBanner.find('.campaignWrap').css("display","block");
								var labelWithOrg = Granite.I18n.get("aem.marketing.campaign.one-way-label");
								if(tripType == 'R') {
									labelWithOrg = Granite.I18n.get("aem.marketing.campaign.return-from-label");
								}
								closestBanner.find('.singleDestinationList .pull-left p').text(labelWithOrg);
                                closestBanner.find('.singleDestinationList .pull-left p').attr("aria-label",labelWithOrg);
							}
						}
					}
				}
				currObj.find(".singledestinationDetails").html(items);

				currObj.closest(".campaignWrap").click(function(event) {
					$(this).find("singledestinationDetails li").triggerHandler("click");
					return false;
				});


				if(campaignTitle == undefined || campaignTitle == ''){
					campaignTitle = cityClassName;
				}

				var bkColor = closestBanner.attr("data-highlight-color");
				//console.log(bkColor);
				//console.log(campaignTitle);


				if(closestBanner.find('.smallBanner').length > 0){
                    closestBanner.find('.topContent1').html('<div class="text"><h3 aria-label="'+campaignTitle+'">' + campaignTitle + '</h3></div>');

					if(bkColor != null && bkColor != ""){
						closestBanner.find('.topContent1 .text h3').addClass(bkColor);
						closestBanner.find('.topContent1 .text h3').attr('style','padding:10px !important');

					}
					closestBanner.find('.topContent1 .text h3').css({'word-wrap': 'normal','display':'inline-block','line-height':'110%'});


				} else {
					closestBanner.find('.topContent1').html('<div class="text"><h2 style="word-wrap:normal;display:inline-block;line-height:110%;padding:10px !important" aria-label="'+campaignTitle+'">' + campaignTitle + '</h2></div>');
					if(bkColor != null && bkColor != ""){
						closestBanner.find('.topContent1 .text h2').addClass(bkColor);
					}

				}


				closestBanner.find('.topContent1 .text').css("text-align", "center");



				if(campaignLabel != ''){
					closestBanner.find('.singleDestinationList .pull-left p').html(campaignLabel);
                    closestBanner.find('.singleDestinationList .pull-left p').attr('aria-label',campaignLabel);
				}
				if(!validPrice){
					closestBanner.find('.singleDestinationList .pull-left p').html("");
                    closestBanner.find('.singleDestinationList .pull-left p').attr('aria-label',"");
				}




			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Single destinations : Error fetching data : "+errorThrown);
			}             
		});
	}


	});

}

$(document).on("originChange", function(event, newOriginCode) {
	initMultiDesti(newOriginCode); //calling initMultiDesti funtion
});
function initMultiDesti(newOriginCode) { //declaring initMultiDesti funtion
	
	var API_OFFERS_LOWPRICE = "offers/flightproduct/lowestFare"; // lpc url 
    var baseURL = getApiHost() + API_OFFERS_LOWPRICE;
    var localeHeader = getLanguageCode() + '_'+ getCountryCode();
	
	$(".multipleDestinationList").each(function() {
		var currObj = $(this);

		var origName = $(this).attr("data-origName") || newOriginCode || getOriginCookie() || defaultOriginCode;
        
		//var baseURL = $(this).attr("data-base-url");
		var campaignLabel = $(this).attr("data-campaign-label");
		var destName = $(this).attr("data-destName");
		var tripType = $(this).attr("data-tripType");

		var prefix = currObj.attr("data-prefix") || "";
		var precision = currObj.attr("data-precision") || 0;
		var decimal = currObj.attr("data-decimal") || "";
		var thousand = currObj.attr("data-thousand") || "";
		var suffix = currObj.attr("data-suffix") || "";
		var enable = currObj.attr("data-enable")|| false;

		//console.log(" prefix : "+prefix+" precision : "+precision+" decimal : "+decimal+" thousand : "+thousand+" suffix : "+suffix+" enable : single dest: "+enable);


		var pos = getPOS();

		var today = new Date();
		var x = $(this).attr("data-startDate");

		var startDate;
		if(x == undefined) {
			startDate = today;
		}else{ 
			var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
			if(mmddyyFormat.test(x)){
				var match = mmddyyFormat.exec(x);
				var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];
				startDate = new Date(dateStr);
			}
			else {
				startDate = new Date(x);

			}
			if(startDate < today) {
				startDate = today;
			} 
		}

		var formatStartDate = getFormattedDateForApi(startDate);

		var y = $(this).attr("data-endDate");

		var endDate;
		if(y == undefined) {
			endDate = new Date(startDate);
			//endDate.setDate(startDate.getDate() + 90); 
		} else{
			var mmddyyFormat =  /(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
			if(mmddyyFormat.test(y)){
				var match = mmddyyFormat.exec(y);
				var dateStr = '20' + match[3] + '-' + match[1] + '-' + match[2];
				endDate = new Date(dateStr);
			}
			else {
				endDate = new Date(y);
			}
		}
		if(endDate <= startDate) {
			endDate.setDate(startDate.getDate() + 90);
		}
		var formatEndDate = getFormattedDateForApi(endDate);


		var closestCampaignWrap = $(this).closest('.campaignWrap');
		closestCampaignWrap.css("display", "none");

		//console.log("baseURL::"+baseURL+" from "+origName+" to "+destName+" startDate "+formatStartDate+" endDate "+formatEndDate+" paxType : ADT  pos "+pos+" tripType "+tripType);

	if(destName!=undefined && tripType!=undefined){
		
		$.ajax({
			url: baseURL,
			data: { 
				"from": origName,
				"to": destName,
				"startDate": formatStartDate,
				"endDate": formatEndDate,
				"paxType": "ADT",
				"displayType": "DAY",
				"pos": pos,
				"tripType": tripType
			} ,    
			beforeSend: function (jqXHR, settings) {
				//console.log("API call : token : " + oauthToken);
				//jqXHR.setRequestHeader('Authorization', oauthToken);
				jqXHR.setRequestHeader('Accept-Language', localeHeader);
				//return true;
			},
			success: function(data, textStatus, jqXHR) {

				var items = "";
				var formattedPrice="";
				var validPrice = false;
				var originCity = "";
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						var val = data[key];
						for (var i = 0; i < val.length; i++) {		// Per searchResponse

							originCity = val[i].originCity.name;

							// Defaults, if no price is returned
							var outBoundDate = today.toISOString();	// today
							var tempDay = new Date(); tempDay.setDate(today.getDate() + 7);
							var inBoundDate = tempDay.toISOString();	//  + 7 days
							formattedPrice = Granite.I18n.get("aem.commons.book-label"); //"BOOK"
							var totalPrice = 0;


							if (val[i].flightProducts!= undefined && !isNaN(val[i].flightProducts[0].lowestPrice.totalPrice)) {

								validPrice = true;

								if(enable){
									formattedPrice = accounting.formatMoney(val[i].flightProducts[0].lowestPrice.totalPrice, prefix, precision, thousand, decimal) + suffix;
								}
								else{
									formattedPrice = Math.round(val[i].flightProducts[0].lowestPrice.totalPrice) + ' ' + val[i].currency;
								}

								outBoundDate = val[i].flightProducts[0].outBoundDate;	
								inBoundDate = val[i].flightProducts[0].inBoundDate;	
								totalPrice = val[i].flightProducts[0].lowestPrice.totalPrice;
							}
							else
							{
							 // console.log("Multiple destinations : Unable to process API response");
							}

							var item = '<li role="link" tabindex="0" onClick="onCampaignClick(this, event)" title="' + val[i].destinationCity.name + ' ' + formattedPrice + '" ' +
							'aria-label="' + val[i].destinationCity.name + ' ' + formattedPrice + '" ' +
									'" data-attr-org-airport="' + val[i].originAirport.name +
									'" data-attr-org="' + val[i].originAirport.code +
									'" data-attr-org-city="' + val[i].originCity.name +
									'" data-attr-dest-airport="' + val[i].destinationAirport.name +
									'" data-attr-dest="' + val[i].destinationAirport.code +
									'" data-attr-dest-city="' + val[i].destinationCity.name +
									'" data-attr-type="' + tripType +
									'" data-attr-outbound="' + outBoundDate +
									'" data-attr-inbound="' + inBoundDate +
									'" data-attr-price="' + totalPrice +
									'"><div class="pull-left destinationValue">' + val[i].destinationCity.name 
									+ '</div><div class="pull-right priceValue">' + formattedPrice 
									+ '</div></li>';

							items += item;
							
							if (i == 0) {
								closestCampaignWrap.css("display", "block");
								var labelWithOrg = Granite.I18n.get("aem.marketing.campaign.one-way-label");
								if(tripType == 'R') {
									labelWithOrg = Granite.I18n.get("aem.marketing.campaign.return-from-label");
								}
								//labelWithOrg = ' ● ' + labelWithOrg;	/*commented for CMS-554*/
								//closestCampaignWrap.find('.campaignLabel p').text(labelWithOrg);
								/*Added for CMS-530*/
								closestCampaignWrap.find('.campaignLabel p').remove();
								var originCityObj = $("<p class='originCity' aria-label='"+originCity+"'>" + originCity + "</p>");;
								var labelWithOrgObj = $("<p class='labelWithOrg' aria-label='"+labelWithOrg+"'>" + labelWithOrg + "</p>");
								closestCampaignWrap.find('.campaignLabel').append(originCityObj, labelWithOrgObj, $("<div class='clear'></div>"));
								/*End: CMS-530*/
							}
						}
					}
				}

				currObj.find(".destinationDetails").html(items);

				if (campaignLabel != '') {
					closestCampaignWrap.find('.campaignLabel p.labelWithOrg').html(campaignLabel);
					closestCampaignWrap.find('.campaignLabel p.labelWithOrg').attr('aria-label',campaignLabel);
				}

				if(!validPrice){
					 closestCampaignWrap.find('.campaignLabel p.labelWithOrg').text("");
				}    
			},
			error: function(jqXHR, textStatus, errorThrown) {
				//debugger;
				console.log("Multiple destinations : Error fetching data : "+errorThrown);
			}             
		});
	}


	});
}
/*** End of multi destination campaigns **/
//$(document).on("loadCMS", function(event) {
var ebZero;
$(document).ready(function() {
	$(".mcpComponent").each(function() {
		var firstunlocklimit = parseInt(document.getElementById("firstunlocked").innerHTML);
		var secondunlocklimit = parseInt(document.getElementById("secondunlocked").innerHTML);
		var thirdunlocklimit = parseInt(document.getElementById("thirdunlocked").innerHTML);
		if(ebZero != undefined && ebZero != null && ebZero != false){

				  mcpebpoints();


		}	

		
			initMCP();


			$( document ).on( "userSignedIn", function( event ) {
				setTimeout(getEbZero, 300);

			});
			
			
			function getEbZero(){
				ebZero = window.isEbZero;
				if(ebZero != undefined && ebZero != null && ebZero != false){

				  mcpebpoints();


				}
				else
				{
					
					hideInptButtn();
					getUserEbPoints();	

				}
			}



			
			/*$( document ).on( "userSignedIn", function( event ) {
				hideInptButtn();
				getUserEbPoints();
			});*/

        function mcpebpoints(){

			showInptButtn();
				
				document.getElementById('bonusPointInput').value = null;
				$('#bonusPointInput').removeClass("has-content");
				document.getElementById("entered").innerHTML = "";
				document.getElementById("nextlevel").innerHTML="";
				document.getElementById("percent").innerHTML="";
				$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0); 
				$(".progressVal.pull-right").css("display","none");

				$(".ptsNextLevel").css("display","none");
				$(".progressVal").css("display","none");
				$('#firstunlock').removeClass('active');
				$('#secondunlock').removeClass('active');
				$('#thirdunlock').removeClass('active');
				$('#fourthunlock').removeClass('active');
				
				getCustomPoints();

        }



			$( document ).on( "userSignedOut", function( event ) {
				mcpebpoints();
				
			})
		

		function initMCP(){
			var ssoCookie = getSSOCookie();
			if(ssoCookie != null){ 
				hideInptButtn();
				getUserEbPoints();
			} else {
				showInptButtn();
				getCustomPoints();
			}
		}

		function hideInptButtn(){
			$('.bonusPointWrap').css("display","none");
		}
		function showInptButtn(){
			$('.bonusPointWrap').css("display","block");
		}
		
		function getUserEbPoints(){
			var url = getApiHost() + "customer/euroBonus/accountinformation";
			var customerSessionId = getProfileCookie();
			var oAuthAccessToken = getOAuthCookie();;
			
			$.ajax({
				url: url,
				data: { 
					"customerSessionId":customerSessionId,
					"pageNumber":"1",
				} ,    
				beforeSend: function (jqXHR, settings) {
					//console.log("API call : token : " + getOAuthCookie());
					jqXHR.setRequestHeader('Authorization', oAuthAccessToken)
					//jqXHR.setRequestHeader('Accept-Language', localeHeader);
					//return true;
				},
				method: "GET",
				success: function(data, textStatus, jqXHR) {
					var nonMCPPoints = "";
					for (var key in data){
						if(key == "euroBonus"){
							var val = data[key];
							nonMCPPoints = val.nonMCPPoints;
							var test = nonMCPPoints!="";
							var currentCount = parseInt(nonMCPPoints);
				
							checkPoints(nonMCPPoints, test);
							progressBar(currentCount, test)
						}
					} 
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("MCP : Error fetching data : "+errorThrown);
					 mcpebpoints();
				}             
			});
		}
		
		function getCustomPoints(){
			$("#cmsCalcBtn").on('click', function() {
				var source = document.getElementById('bonusPointInput');
				var enteredPoints = source.value;
				var test = $('#bonusPointInput').val()!="";
				var currentCount = parseInt($('#bonusPointInput').val());

				checkPoints(enteredPoints, test);
				progressBar(currentCount, test)
			});
		
			$("#bonusPointInput").bind("keyup", function(e) {
			  // $('label[for="bonusPointText"]').hide();
				if ($('#bonusPointInput').val()!="") {
					$('#bonusPointInput').addClass("has-content");
				}
			});
		}
		



		function checkPoints(enteredPoints, test){
			var texthighlightfirst;
			var texthighlightsecond;
			var texthighlightthird;
			var texthighlightfourth;
		
			$('#firstunlock').removeClass('active');
			$('#secondunlock').removeClass('active');
			$('#thirdunlock').removeClass('active');
			$('#fourthunlock').removeClass('active');

			switch (true){
				case enteredPoints >=0 && enteredPoints < firstunlocklimit:
					texthighlightfirst = document.getElementById("firstunlock");
					break;
				case enteredPoints >= firstunlocklimit && enteredPoints < secondunlocklimit:
					texthighlightfirst = document.getElementById("firstunlock");
					texthighlightsecond = document.getElementById("secondunlock");
					break;
				case enteredPoints >= secondunlocklimit && enteredPoints < thirdunlocklimit :
					texthighlightfirst = document.getElementById("firstunlock");
					texthighlightsecond = document.getElementById("secondunlock");
					texthighlightthird = document.getElementById("thirdunlock");
					break;
				case enteredPoints >= thirdunlocklimit :
					texthighlightfirst = document.getElementById("firstunlock");
					texthighlightsecond = document.getElementById("secondunlock");
					texthighlightthird = document.getElementById("thirdunlock");
					texthighlightfourth = document.getElementById("fourthunlock");
					break;


			}
			if(texthighlightfirst && test) {
			   $('#firstunlock').addClass( "active" );
			}
			if(texthighlightsecond && test) {
				$('#secondunlock').addClass( "active" );        
			}
			if(texthighlightthird && test) {
				$('#thirdunlock').addClass( "active" );
			}
			if(texthighlightfourth && test) {
				$('#fourthunlock').addClass( "active" );
			}
		}


		function getNextHighestNumber(arr,value) {
			var i = arr.length;
			while (arr[--i] > value);
			return arr[++i]; 
		}
		
		function toInteger(number){
			return Math.round(
				Number(number)
			  ); 
		}

		function progressBar(currentCount, test){
			$(".progress").css("display","block");
			$(".progressVal.pull-right").css("display","block");
			$(".ptsNextLevel").css("display","block");
			$(".progressVal").css("display","block");
			document.getElementById("nextlevel").innerHTML="";
			document.getElementById("percent").innerHTML="";
			$('.progress-bar').css('width', '0%');
			$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0); 

			Granite.I18n.setLocale(getLocale());
			var points = Granite.I18n.get('aem.marketing.mcpComponent.bonus-points-suffixone');
			var pointstwo = Granite.I18n.get('aem.marketing.mcpComponent.bonus-points-suffixtwo');
			var pointsnextlevel = Granite.I18n.get('aem.marketing.mcpComponent.bonus-points-suffixnextlevel');
			if (currentCount < thirdunlocklimit) {
				var limits = [firstunlocklimit,secondunlocklimit,thirdunlocklimit];
				limits.push(currentCount);
				limits.sort(function(a, b){return a-b});
			   
				var nextlevel = getNextHighestNumber(limits,currentCount);
				if (currentCount == 0) {
					var nextlevel = 50000;
				}
				var progress = (currentCount / nextlevel) * 100;
				progress = toInteger(progress);
				var more = 100 - progress;
				var morepoints = nextlevel-currentCount;
				var currentCountStr = currentCount.toLocaleString();
                var morepointsStr = morepoints.toLocaleString();
                if(currentCountStr.lastIndexOf(".") != -1){
                	document.getElementById("entered").innerHTML = currentCountStr.replace(",", " ").substring(0, currentCountStr.lastIndexOf(".")) +" "+points;
                } else {
                    document.getElementById("entered").innerHTML = currentCountStr.replace(",", " ") +" "+points;
                }
                if(morepointsStr.lastIndexOf(".") != -1){
	                document.getElementById("nextlevel").innerHTML = morepointsStr.replace(",", " ").substring(0, morepointsStr.lastIndexOf("."))+" "+ pointstwo +" <span>"+pointsnextlevel+"</span>";
                } else {
                    document.getElementById("nextlevel").innerHTML = morepointsStr.replace(",", " ")+" "+ pointstwo +" <span>"+pointsnextlevel+"</span>";
                }
				document.getElementById("percent").innerHTML = progress +"%";

				$('.progress-bar').css('width', progress + '%');
				// then you start to listen the change of the current count input
				$('#bonusPointInput').on('change', function(e) {
					currentCount = $(e.target).val();
					progress = (currentCount / nextlevel) * 100;
					// and change it accordingly

					$('.progress-bar').css('width', progress + '%');
				});
			} else if(test) {
				var currentCountStr = currentCount.toLocaleString();
                if(currentCountStr.lastIndexOf(".") != -1){
	                document.getElementById("entered").innerHTML = currentCountStr.replace(",", " ").substring(0, currentCountStr.lastIndexOf(".")) +" "+points;
                } else {
                    document.getElementById("entered").innerHTML = currentCountStr.replace(",", " ") +" "+points;
                }
				$(".progress").css("display","none");
				document.getElementById("nextlevel").innerHTML="";
				document.getElementById("percent").innerHTML="";
				$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0); 
				$(".progressVal.pull-right").css("display","none");

				$(".ptsNextLevel").css("display","none");
				$(".progressVal").css("display","none");
			}
		}
	});
 });
/*** Start of campaign **/
var lpcQueryString; 
// This mechanism is for the campaigns which need to act on 2 events - oauth as well as loadCms
var loadCmsDeferred = $.Deferred();
$(document).on("loadCMS", function(event) {
    loadCmsDeferred.resolve();
	triggerOriginChange();	
});

// When both events are over trigger for the campaigns
$.when(cmsOuthDeferred, loadCmsDeferred).done(function (arg1, arg2) {   
    //triggerOriginChange(); //to trigger origin chage
    //setTimeout(triggerOriginChange, 500);
});

function triggerOriginChange() {
	$(document).trigger( "originChange");	
}    

function onCampaignClick(param, event){

    var org = param.getAttribute("data-attr-org");
    var orgCity = param.getAttribute("data-attr-org-city");
    var orgApt = param.getAttribute("data-attr-org-airport");
    var dest = param.getAttribute("data-attr-dest");
    var destCity = param.getAttribute("data-attr-dest-city");
    var destApt = param.getAttribute("data-attr-dest-airport");
    var type = param.getAttribute("data-attr-type");
    var outbound = param.getAttribute("data-attr-outbound");
    var inbound = param.getAttribute("data-attr-inbound");
    if(inbound == "undefined" || inbound == null){
        var outDate = new Date(outbound);
        var inDate = new Date(outbound);
        inDate.setDate(outDate.getDate() + 7); 
		inbound = inDate.getFullYear() + '-' + pad(inDate.getMonth() + 1) + '-' + pad(inDate.getDate()) + 'T00:00:00.000Z';
    }    

    var price = param.getAttribute("data-attr-price");
	
	var channel = ($(document).width() <= 768) ? "mow" : "web";

    //console.log(org+":"+dest+":"+type+":"+outbound+":"+inbound+":"+price);

	/*if(type == 'O'){
		var tripType = 'OW';
		window.location.href = "/lowpricecalendar?search=" + tripType + "_" + org + "-" + dest + "-" + getFormattedDateForUI(outbound) + "_a1c0i0y0_REV";
	} else if(type == 'R'){*/
		var tripType = 'RT';
		window.location.href = "/lowpricecalendar?search=" + tripType + "_" + org + "-" + dest + "-" + getFormattedDateForUI(outbound) + "-" + getFormattedDateForUI(inbound) + "_a1c0i0y0_REV";
	//} 


    // Stop event propagation
    if (event){
		event.stopPropagation();
        event.preventDefault();
    } else if(window.event){
        window.event.cancelBubble = true;
        //window.event.preventDefault();
    }
}

function pad(s) {
    return (s < 10) ? '0' + s : s;
}

function getFormattedDateForApi(d) {

    var formattedDate = d.getFullYear() + '' + pad(d.getMonth() + 1) + '' + pad(d.getDate());
    return formattedDate.concat("0000");
}

function getFormattedDateForUI(dateStr){
    if(dateStr == null){
        return null;
    }    
    var date = new Date(dateStr);
    var str = date.getFullYear().toString() + (date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1).toString() + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()).toString();
    return str;
}

/*** End of campaign **/
/*** Start of layout takeOver **/
$( document ).on( "loadCMS", function( event ) { 

    var url = "/labs/barwidget/?lng=" + getLanguageCode() +"&prefix=" + getExternalizedRootPage();
	$(".cms-explorepage-wrapper").closest("body").find( ".takeOverWrap #cep-container" ).load(url);


 	/******************************For Highlighting takeOverDiv titles in H1.. h4 **************************************/
	$(".takeOverEditorialContent h1, .takeOverEditorialContent h2, .takeOverEditorialContent h3, .takeOverEditorialContent h4, .takeOverEditorialContent span.priceValue").each( function( ) {

		var takeOverDiv = $(this).closest(".takeOverEditorialContent");

		$(this).closest(".takeOverEditorialContent").find("h2").attr("tabindex", 0);
        $(this).closest(".takeOverEditorialContent").find("h2").focus();
		var bkColor = takeOverDiv.attr("data-highlight-color");

		if(bkColor != null && bkColor != ""){
                $(this).addClass(bkColor);
                $(this).css("display","inline-block");
                $(this).css("line-height","110%");
				$(this).css('cssText', $(this).attr('style')+'color:#fff !important;');
                $(this).css('cssText', $(this).attr('style')+'padding:10px !important;');

		} 
        //accessibility
        if(!$(this).attr('aria-label')){
            $(this).attr('aria-label',$(this).text().trim());
        }
	}); 

    $(".takeOverEditorialContent p").each( function( ) {
        //accessibility
        if(!$(this).attr('aria-label')){
            $(this).attr('aria-label',$(this).text().trim());
        }
    });
});
/*** End of layout takeOver **/
/*** Start of tab control **/
//jQuery(function ($) {
$( document ).on( "loadCMS", function( event ) {

    var isWCMEdit = false,
        isClassicUIAuthor  = ("CQ" in window && "WCM" in CQ && typeof CQ.WCM.getTopWindow != "undefined"),
        CQTop = isClassicUIAuthor ? CQ.WCM.getTopWindow().CQ : null;

    $(".tabctrl").each(function () {
        var tabctrl   = $(this);

        // Called when clicking on a tab link
        function switchTab() {
            var link       = $(this),
                newItem    = link.closest("li"),
                oldItem    = tabctrl.find(".tabctrl-header li.active"),
                newContent = tabctrl.find(link.attr("href")),
                oldContent = tabctrl.find(".tabctrl-content:visible");

            if (!newItem.is(oldItem)) {
                oldItem.removeClass("active");
                newItem.addClass("active");
                newItem.attr("aria-selected", "true");
                oldItem.attr("aria-selected", "false");

                if (isWCMEdit) {
                    oldContent.hide();
                    newContent.show();
                    toggleEditables(false, oldContent.attr("data-path"));
                    toggleEditables(true, newContent.attr("data-path"));
                } else {
                    //oldContent.fadeOut();
                    //newContent.fadeIn();
                    oldContent.hide();
                    newContent.show();
                 /*   tabctrl.find(".tabctrl-container").animate({"height": newContent.height()});
                    tabctrl.find(".tabctrl-container").animate({"height": newContent.height()}, function() {
                        $(this).css("height", "auto");
                    });*/
                    //tabctrl.find(".tabctrl-container").height(newContent.height());
                    //tabctrl.find(".tabctrl-container").css("min-height",newContent.height());

                }
            }
            return false;
        }

        function setTabHeight() {
            if (isWCMEdit) {
                tabctrl.find(".tabctrl-container").css("height", "auto");
                tabctrl.find(".tabctrl-content:hidden").each(function () {
                    if (isClassicUIAuthor) {
                        toggleEditables(false, $(this).attr("data-path"));
                    }
                });
            } else {
                tabctrl.find(".tabctrl-container").height(tabctrl.find(".tabctrl-content:visible").height());
            }
        }

        function updateWCM() {
            setTimeout(function () {
                if (CQTop) {
                    isWCMEdit = CQTop.WCM.isEditMode();
                }

                setTabHeight();
            }, 1);
        }

        // Initialization
        tabctrl.find(".tabctrl-header a").bind("click.tabctrl", switchTab);
        tabctrl.find(".tabctrl-header li:first").addClass("active");
        tabctrl.find(".tabctrl-header li:first").attr("aria-selected", "true");
        tabctrl.find(".tabctrl-content:gt(0)").hide();
        tabctrl.find(".tabctrl-container").animate({"height": tabctrl.find(".tabctrl-content:first").height()}, function() {
            $(this).css("height", "auto");
        });

        $( document ).ready(function() {
                
                var hash = $.trim( window.location.hash );
                        if (hash) 
                             {
                                  //console.log("hash is there ",String(hash));
                                  var b = String(hash);
                                  var res = b.replace("#/", "#");
                                   $('.tabctrl-header a[href$="'+res+'"]').click();
                                  //var href = window.location.href;
                                  //var evt = document.createEvent("MouseEvents");
                                 // evt.initMouseEvent("click", true, true, window,
                                  //0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                 // var a = document.getElementById(res);
                                  // console.log("the ", a);
                                  // a.dispatchEvent(evt);  
    
    
                            }
          });

        if (isClassicUIAuthor) {
            if (CQTop) {
                CQTop.WCM.on("wcmmodechange", updateWCM);
                CQTop.WCM.on("sidekickready", updateWCM);
            }

            CQ.WCM.on("editablesready", updateWCM);
        } else {
            setTabHeight();
        }
    });

    // Shows/Hides the ClassicUI component widgets
    // The optional filter argument offers the possibility to limit the effect
    // only to the components below the provided content path
    function toggleEditables(show, filter) {
        filter = filter && filter.replace("/_jcr_content/", "/jcr:content/");
        var editables = CQ.WCM.getEditables();
        for (var path in editables) {
            if (!filter || path.indexOf(filter) == 0) {
                var editable = editables[path],
                    placeholder = editable.getInlinePlaceholder();

                editable[show ? "show" : "hide"]();

                if (placeholder) {
                    placeholder.setWidth("auto");
                }
            }
        }
    }

});
/*** End of tab control **/
/*** Start of swatch container **/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) { 

	$( window ).resize(function() {
          initImages();  //calling initImages funtion
    });

    function initImages() { //declaring initImages funtion

		var viewportWidth = $( window ).width();

        $( ".swatch" ).each(function( index ) {

            viewportWidth = $( this ).width();		// Choose image resolution based on container width rather than screen width
            //console.log("Container width: " + viewportWidth);

            var imageUrl = $( this ).attr("data-image-firstPart");

            if($( this ).attr("data-image-secondPart") == undefined || $( this ).attr("data-image-secondPart") == null
				|| $( this ).attr("data-image-secondPart") == "") {
            }    else {
				imageUrl += ".img.";
                if(viewportWidth < 320) {
                    imageUrl += "320.low." + $( this ).attr("data-image-secondPart");
                } else if(viewportWidth < 768) {
                    imageUrl += "768.medium." + $( this ).attr("data-image-secondPart");
                } else {
                    imageUrl += "full.high." + $( this ).attr("data-image-secondPart");
                }
            } 
			
			//Added for CMS-450
			/*var viewportHeight = $( this ).height()
            if($( this ).attr("data-image-dampath") == undefined || $( this ).attr("data-image-dampath") == null
				|| $( this ).attr("data-image-dampath") == "") {
            } else {
				imageUrl = $( this ).attr("data-image-damPath") + "/jcr:content/renditions/cq5dam.thumbnail.";
                if(viewportWidth <= 358 && viewportHeight <= 180) {
                    imageUrl += "358.180";		
                } else if(viewportWidth <= 358 && viewportHeight <= 376) {
                    imageUrl += "358.376";		
                }  else if(viewportWidth <= 1104 && viewportHeight <= 180) {
                    imageUrl += "1104.180";		
                } else {
                    imageUrl += "1349.452";		
                }
                imageUrl += ".png";
            }*/
			//End: Added for CMS-450

            if($( this ).hasClass("partner")){

                var imgObj = $("<img class='partnerImage' height='auto' src='" + imageUrl + "' alt='Partner'/>")
                $( this ).find(".partnerImage").remove();
				$( this ).append(imgObj);

                $( this ).find(".bannerWrap").css("position","initial");
            } else {

				if($(window).width() <= 767 && ( 
                   ($(this).find(".largeBanner").next() != null && $(this).find(".largeBanner").next().hasClass("campaignWrap")) ||
                    ($(this).find(".largeBanner .multiple-destination-campaign").length > 0)
                )){
                    $( this ).css("background-position","50% 0%");
                } else {
                    $( this ).css("background-position","50% 50%");	
                }    
				//added to load the background image
                if($(this).css('background-image') === 'none'){
                	$( this ).css("background-image","url('" + imageUrl + "')");
                }
				// $( this ).attr("data-bg", imageUrl);
                 //end of addition to load the background image


           	}   
        });

        $(".swatch.partner .partnerImage").on('load', function() {
            var imgObj= $(this);
            if($(window).width() <= 767) {
                imgObj.attr("width",(imgObj.width()*1.3));
                imgObj.closest(".swatch-container").css("overflow", "hidden");
            }    
            imgObj.closest(".partner").height(imgObj.height());
        });
    }

    initImages();  //calling initImages funtion


}); 
/*** End of swatch container **/    
/****************************** Start of partner landing **********************************/
$(document).ready(function($) {
//$( document ).on( "loadCMS", function( event ) {

	var partnerLandingJson;
	var partnerDetails = [];
    var partnerLandingUrl = "/bin/sas/getPartners";

    var categoryValue = 'all';
    var partnerValue = 'all';
    var earnSpendValue = 'all';
    var partnerLandingGridLimit = 12;

	var objUl = $('<ul class="LandingPartnerBind" id="LandingPartnerBind"></ul>');

	function initPartnerLanding() {
        var plObj=$(".partnerLandingInfo");
        if(plObj.length){
            getLandingPartner(partnerLandingUrl); 
            registerPartnerEvents();	
        }
    }
	
	// Initial call for all partners and all categories
	function getLandingPartner(url){
		var country = getCountryCode();
		var language = getLanguageCode();
        var earnSpendType = $('#earnSpendSpanType').attr('data-attr-value');

		// Loading UX
        $(".partnerLandingInfo .gridViewBind").hide();
        $('.viewMore').css('display','none');
        $(".partnerLandingInfo .plLoader").show();

        $.ajax({
			type: "GET", 
			url: url,
            data:{
				"countryCode": country,
				"languageCode": language,
				"category": categoryValue,
				"partner": partnerValue,
				"type" : earnSpendType
            },
			success: showLandingData
		});
	}
	
	
	//Success Function of Json
	function showLandingData(data){		
		// Grid UX
        $(".partnerLandingInfo .plLoader").hide();
        $(".partnerLandingInfo .gridViewBind").fadeIn('slow');
		//$('.gridViewBind').html(objUl);	//added in showLanding() for CMS-534

		// Process JSON
		var stringData = JSON.stringify(data);
		var tempData = $.parseJSON(stringData);
		if(tempData.partners) {
			partnerLandingJson = tempData.partners;
			extractDetails();
			
			// Check if parameters exist
			if(getParameterByName('category')) {
				processCategoryOption(getParameterByName('category'));
			}
			if(getParameterByName('partner')) {
				processPartnerOption(getParameterByName('partner'));
			}			
		}
	}
	
	// Filter which items need to be shown
	function extractDetails(){
		
		partnerDetails = [];
		
		for(var i = 0; i < partnerLandingJson.length; i++){
			var include = false;			
			if(categoryValue == 'all' && partnerValue == 'all') {
				include = true;
				processTags(partnerLandingJson[i].tags);
			} else if(partnerLandingJson[i].tags){
				var tags = partnerLandingJson[i].tags.substring(partnerLandingJson[i].tags.indexOf(',')+1);
				var tagItems = tags.split(',');
				for(var item=0; item < tagItems.length; item++){	
					if(	partnerValue != 'all' && partnerValue == tagItems[item].toString()	) {
						include = true;
						break;
					} else if( partnerValue == 'all' && categoryValue != 'all' && categoryValue == tagItems[item].toString()) {
						include = true;
						processTags(partnerLandingJson[i].tags);
						break;
					}
				}
			}
			
			if(include) {
				var request =
				{
					"title": partnerLandingJson[i].title,
					"description": partnerLandingJson[i].description,
					"link": partnerLandingJson[i].link,
					"imagePath": partnerLandingJson[i].imagePath,
					"isCampaign": partnerLandingJson[i].isCampaign,
					"isNew": partnerLandingJson[i].isNew,
					"tags" : partnerLandingJson[i].tags
				}
				partnerDetails.push(request);
			}
		}

		// Display grid
		if(partnerDetails.length > 0) {
			var applicableEndRange = partnerDetails.length;
			if($(window).width() > 767 && applicableEndRange > partnerLandingGridLimit) {	
				applicableEndRange = partnerLandingGridLimit;
				
				$('#viewMoreLink').show();
				$('#viewLessLink').hide();
				$('.viewMore').css('display','block');
			} else {
				$('.viewMore').css('display','none');
			}
			showLanding(0, applicableEndRange, false);	
		} else {	//Added for CMS-534
			showNoPartnerMsg();
		}
	}

	/*Show message when no partner is available*/
	function showNoPartnerMsg(){
        $('.viewMore').css('display','none');
		objUl.empty();
		var objMsg = $('<div class="noPartner"></div>');
		var noPartnerMsg = Granite.I18n.get("aem.information.partner-landing.noPartner-label");
		objMsg.append('<p class="noPartnerMsg">' + noPartnerMsg + '</p>');
		$('.gridViewBind').html(objMsg);
        $('.gridViewBind').css('min-height','300px');
	}

	// Binding the List in GridView
	function showLanding(startRange, endRange, isAppend){
		
		if(startRange <= endRange) {
			if(!isAppend){
				objUl.empty();
			}	
			
			var partnerDetailsForGrid = partnerDetails.slice(startRange, endRange);
			
			// Create each tile
			$.each(partnerDetailsForGrid, function( key, val ) {

				var findOutMore = Granite.I18n.get("aem.information.partner-landing.findOutMore-label");

				var objLi = $('<li class="col-lg-3 col-sm-4 col-xs-12"></li>');			
				var objDiv = $('<div class="pointsDetails"></div>');	
				var objDivBgWhite = $('<div class="bgWhite1"></div>'); 
				var objImg = $('<img>');
				var objHeading = $('<h3></h3>');
				var objPara = $('<p></p>');
				var objAnchor = $('<a class="findOutMore" title="' + findOutMore + '" href="javascript:">' + findOutMore + '</a>');	

				var gridDiv;
				var objDivNew = $('<div class="newPartner">' + Granite.I18n.get("aem.information.partner-landing.new-label") + '</div>');	

				objHeading.text(val.title);
				objImg.attr("src", val.imagePath);
                objImg.attr("alt", "image");
				objAnchor.attr("href", val.link);
				objAnchor.attr("target", "_blank");
				objPara.text(val.description);
				if(val.isCampaign == "true") {
					var objCampaign = $('<div class="campaign">' + Granite.I18n.get("aem.information.partner-landing.campaign-label") + '</div>');	
					objDivBgWhite.append(objCampaign);
					objDivBgWhite.append(objImg);           
					objDivBgWhite.append(objHeading);
					objDivBgWhite.append(objPara);
					objDivBgWhite.append(objAnchor);
					objLi.append(objDivBgWhite);
					gridDiv = objDivBgWhite;
				} else {
					objDiv.append(objImg);          
					objDiv.append(objHeading);
					objDiv.append(objPara);
					objDiv.append(objAnchor);
					objLi.append(objDiv);
					gridDiv = objDiv;
				}

				if(val.isNew == "true") {
					gridDiv.append(objDivNew);
				}

				objUl.append(objLi);
				$('.gridViewBind').html(objUl);		//added for CMS-534
			});
		}
	}

	
    function processTags(tags){
		//split commma separated tags and iterate over them
        tags = tags.substring(tags.indexOf(',')+1);
        var tagItems = tags.split(',');
        for(var item = 0; item < tagItems.length;item++){
			if(tagItems[item].toString().indexOf("flysas:eurobonus/partner/") == 0){ // CMS-408 fix added
				var calculatedClassName = tagItems[item].toString().replace(/\//g , "-").replace(/:/g , "-");
				var partnerClassName = '.partnerOption li.' + calculatedClassName;
				$(partnerClassName).show();
			}
    	}
    }
	

	function registerPartnerEvents() {
		$('.dropdown').on("click keydown", showOption);
		$('.backtoTop').on('click', scrollTop);
		$('.categoryOption li').on('click',selectCategoryOptionValue);
		$('.partnerOption li').on('click',selectPartnerOptionValue);
		$(document).on('click',hideDropdownValue);
		$('.viewMore').on('click',  viewMoreHandler);
	}

	//When click is triggered in documnet :to close the opened dropdown Value
	function hideDropdownValue() {
		$('.categoryOption,.partnerOption').hide();		
	}
	
	// On Click of Viewmore link 
	function viewMoreHandler(event){
		var target = $(event.currentTarget).find('a:visible').attr('id');
		if(target === "viewMoreLink") {
			showLanding(partnerLandingGridLimit, partnerDetails.length, true);	
			$('#viewMoreLink').hide();
			$('#viewLessLink').show();
		} else {
			viewLessItems();
			$('#viewMoreLink').show();
			$('#viewLessLink').hide();		
		}
	}
	
	// On Click of Viewless link 
	function viewLessItems(){
		$('#LandingPartnerBind').find("li").slice(partnerLandingGridLimit, partnerDetails.length).remove();
		scrollTop();
	}

	//Dropdown List show function in Category and Partner
	function showOption(event) {
		if(event.type == 'click' || event.which == 13){
			var target= $(event.currentTarget).attr('id');
			if(target === "category"){
				event.stopPropagation();
				$('.categoryOption').toggle();	
				$('.partnerOption').hide();

	            //accessiblity
	            if($('.categoryOption').css('display') == "block"){
					this.setAttribute('aria-expanded','true');
	                $('.categoryOption').attr('aria-hidden', 'false');
					$('.categoryOption li a')[0].focus();
	            } else {
					this.setAttribute('aria-expanded','false');
	                $('.categoryOption').attr('aria-hidden', 'true');
	            }
				$('.partnerOption').attr('aria-hidden', 'true');
	            $('#partner').attr('aria-expanded','false');

			} else {
				event.stopPropagation();
				$('.partnerOption').toggle();
				$('.categoryOption').hide();

	            //accessiblity
	            if($('.partnerOption').css('display') == "block"){
					this.setAttribute('aria-expanded','true');
	                $('.partnerOption').attr('aria-hidden', 'false');
					$('.partnerOption li a')[0].focus();
	            } else {
					this.setAttribute('aria-expanded','false');
	                $('.partnerOption').attr('aria-hidden', 'true');
	            }
				$('.categoryOption').attr('aria-hidden', 'true');
	            $('#category').attr('aria-expanded','false');
			}
		}
	}
	
	//Scroll Top function
	function scrollTop() {
		$('html, body').animate({
			scrollTop: $('.partner-landing').offset().top
		}, "slow");
	}
	
	//Binding the selected Value in Category Drop down
	function selectCategoryOptionValue(event) {	
		var text = $(event.currentTarget).text();
        var value = $(event.currentTarget).attr('data-attr-value');
		processCategoryOption(value, text);

         //accessiblity
         $('#category').attr('aria-expanded','false');
         $('.categoryOption').attr('aria-hidden', 'true');

	}
	function processCategoryOption(value, text) {
		if(value != categoryValue){
			if(!text){
				text = $('.categoryOption').find("li[data-attr-value='" + value + "']").text();
			}
			if(text && text != ""){
				$('.categoryValue').text(text);
				categoryValue = value;
				
				// Set partner value to all
				$('.partnerValue').text($('.partnerOption').find("li[data-attr-value='all']").text());	
				partnerValue = 'all';
				$('.partnerOption li').hide();
				$('.partnerOption li.li-All').show();
				
				//accessibility
				$('.categoryValue').attr('aria-live','assertive');
				$('.partnerValue').attr('aria-live','assertive');

				extractDetails();
			}
        }
	}
	
	//Binding the selected Value in Partner Drop down
	function selectPartnerOptionValue(event) {	
		var text = $(event.currentTarget).text();
        var value =  $(event.currentTarget).attr('data-attr-value');
		processPartnerOption(value, text);

        //accessiblity
        $('#partner').attr('aria-expanded','false');
        $('.partnerOption').attr('aria-hidden', 'true');

	}
	function processPartnerOption(value, text) {
		if(value != partnerValue){
			if(!text){
				text = $('.partnerOption').find("li[data-attr-value='" + value + "']").text();
			}
			if(text && text != ""){
				$('.partnerValue').text(text);
				partnerValue = value;
				extractDetails();

				//accessibility
				$('.partnerValue').attr('aria-live','assertive');
			}
        }
	}

	
	// Init
	initPartnerLanding();		

    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});		
/****************************** End of partner landing **********************************/
/****************************** Start of page-icon  **********************************/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {


    function initPageIcon() {

        checkMobile();

    }

    function checkMobile(){
		if ($(window).width() <= 767) {		// Mobile
            var diva = document.getElementById("iconHolder");
            var divb = document.getElementById("pageIcon");
            if(diva != null){
                diva.appendChild(divb);  
            }
        }
    }    


	initPageIcon();

 });


/****************************** End of page-icon  **********************************/
/****************************** Start of InfoBox  **********************************/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

    function initInfoBox() {
        var info_cookie = getInfoCookie();
        
            $('.infoBoxWrap').show();
             $('.infoBoxWrap .close').on('click', acknowledeInfo);
        

    }

	function acknowledeInfo() {
        $('.infoBoxWrap').css("display", "none !important").toggle();
        saveInfoCookie();
    }

    initInfoBox();
 });
/****************************** End of InfoBox  **********************************/
$( document ).on( "loadCMS", function( event ) { 
    $(".infoBannerWrap").each( function( ) {
        var parent1 = $(this).parent();
        if(parent1.hasClass("swatch")){
            parent1.css({"margin-top":"10px","margin-bottom":"10px"});
            parent1.addClass($(this).attr("data-roundcorner"));
        }
    });
});
/****************************** Start of Cookie Notification  **********************************/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

    function initCookieNotification() {
		var ack_cookie = getAckCookie();
        //alert(ack_cookie);
        if(ack_cookie == null){
            $('.cookieBoxWrap').show();
            $('.cookieBoxWrap .close1').on('click', acknowledgeCookie);
        }    
        $('.cookieBoxWrap.authorMode').show();		// To be shown in author mode at all times
    }

	function acknowledgeCookie() {
        //$('.cookieBoxWrap').css("display", "none !important").toggle();
        $('.cookieBoxWrap').hide();
        writeAckCookie();
    }

    initCookieNotification();
 });
/****************************** End of Cookie Notification  **********************************/
$( document ).on( "loadCMS", function( event ) {

	//Added for OCP-1758
	//$(window).load(function(){
		$("#newsletter-holder").delay(500).show();
    //});
	
    function showNewsletter(){
        //console.log("inside showNewsletter");
		$(".topFooterLinks").find("#newsletter-link").show();
        //$(".topFooterLinks").find("li").css("padding-right","80px");
        $(".topFooterLinks").find("#newsletter-link").find("a").attr("href","#/profile?userAction=NewsLetter");
    }

    function hideNewsletter(){
        //console.log("inside hideNewsletter");
    	$(".topFooterLinks").find("#newsletter-link").hide();
        //$(".topFooterLinks").find("li").css("padding-right","100px");
    }

    function initNewsletter(){
        var ssoCookie = getSSOCookie();
		//console.log("inside init");
        if(ssoCookie != null){ 
            hideNewsletter();
        } else {
			showNewsletter();
        }
    }

    initNewsletter();

    $( document ).on( "userSignedIn", function( event ) {
        hideNewsletter();
    });
    $( document ).on( "userSignedOut", function( event ) {
	    showNewsletter();
    });
});
/* Start of text ebzero */
$( document ).on( "loadCMS", function( event ) {

	var footerInterval;
	var ebZero;

	function getEbZero(){
		ebZero = window.isEbZero;
		if(ebZero != undefined && ebZero != null && ebZero != false){
			clearInterval(footerInterval);
			hideRegisterMissingPoints(ebZero);
		}
	}
	
    function showRegisterMissingPoints(){
        $(".footerToggleContent").find("#reg-missing-points").css("display","list-item");
    }

    function hideRegisterMissingPoints(ebZero){
        if(ebZero){
			$(".footerToggleContent").find("#reg-missing-points").css("display","none");
        } else {
			showRegisterMissingPoints();
		}
    }

    function initEbMember(){
        var ssoCookie = getSSOCookie();
		if(ssoCookie != null){ 
            footerInterval = setInterval(getEbZero, 100);
        } else {
			showRegisterMissingPoints();
        }
    }
	
	if($(".footerToggleContent #reg-missing-points").length){
		initEbMember();
	}
    
	$( document ).on( "userSignedIn", function( event ) {
		if($(".footerToggleContent #reg-missing-points").length){
			footerInterval = setInterval(getEbZero, 100);
		}
	});
	$( document ).on( "userSignedOut", function( event ) {
		if($(".footerToggleContent #reg-missing-points").length){
			showRegisterMissingPoints();
		}
	});
    
});
/* End of text ebzero */
/****************************** Start of ShowHide  **********************************/
$(document).ready(function($) {
	$(document).trigger("loadShowHide");
    });
$( document ).on( "loadShowHide", function( event ) {
	
	//accessibility
    $(".show-more a").each(function(){
        var id=Math.random();
        $(this).attr('aria-controls',id);
        $(this).parent().next("div.text-content").attr('id',id);
    });

    $(".show-more a").on("click", function() {
        var _link = $(this);
        var _content = _link.parent().next("div.text-content");
        var _linkText = _link.text();
    
        _content.toggleClass("no-text, show-text");

		//accessibility
        if(_content.hasClass('show-text')){
			_content.attr('aria-hidden','false');
            _link.attr('aria-expanded','true');

            if(_content.find(':focusable') && _content.find(':focusable').length > 0){
            	$(_content.find(':focusable')[0]).focus();
            }

        } else {
            _content.attr('aria-hidden','true');
            _link.attr('aria-expanded','false');
        }
    
        _link.find("span").toggleClass("collapsed, expanded");
    
    
        return false;
    });
 });
/****************************** End of ShowHide  **********************************/
/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

 /*
 * To resolve conflict with booking code function datepicker() is customised as datepickerNew();
 */
 
 
(function( $ ) {

	var $window = $(window);

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
	}


	// Picker object

	var Datepicker = function(element, options) {
		var that = this;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if(this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if(this.isInline) {
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		} else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
			this.picker.find('.prev i, .next i')
						.toggleClass('icon-arrow-left icon-arrow-right');
		}


		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if(this.isInline) {
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]) {
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch(o.startView){
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode) {
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity) {
				if (!!o.startDate) {
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				} else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity) {
				if (!!o.endDate) {
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				} else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch(plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ev; i<evs.length; i++){
				el = evs[i][0];
				ev = evs[i][1];
				el.on(ev);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev; i<evs.length; i++){
				el = evs[i][0];
				ev = evs[i][1];
				el.off(ev);
			}
		},
		_buildEvents: function(){
			if (this.isInput) { // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')) {  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					mousedown: $.proxy(function (e) {
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)) {
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.date,
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				format: $.proxy(function(altformat){
					var format = altformat || this.o.format;
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(e) {
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			this._attachSecondaryEvents();
			if (e) {
				e.preventDefault();
			}
			this._trigger('show');
		},

		hide: function(e){
			if(this.isInline) return;
			if (!this.picker.is(':visible')) return;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this._trigger('hide');
		},

		remove: function() {
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput) {
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc){
			return new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDate: function() {
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function() {
			return this.date;
		},

		setDate: function(d) {
			this.setUTCDate(this._local_to_utc(d));
		},

		setUTCDate: function(d) {
			this.date = d;
			this.setValue();
		},

		setValue: function() {
			var formatted = this.getFormattedDate();
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').val(formatted).change();
				}
			} else {
				this.element.val(formatted).change();
			}
		},

		getFormattedDate: function(format) {
			if (format === undefined)
				format = this.o.format;
			return DPGlobal.formatDate(this.date, format, this.o.language);
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
						if(this.isInline) return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var zIndex = parseInt(this.element.parents().filter(function() {
							return $(this).css('z-index') != 'auto';
						}).first().css('z-index'))+10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto') {
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto') {
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update) return;

			var oldDate = new Date(this.date),
				date, fromArgs = false;
			if(arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
				date = arguments[0];
				if (date instanceof Date)
					date = this._local_to_utc(date);
				fromArgs = true;
			} else {
				date = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
				delete this.element.data().date;
			}

			this.date = DPGlobal.parseDate(date, this.o.format, this.o.language);

			if (fromArgs) {
				// setting date by clicking
				this.setValue();
			} else if (date) {
				// setting date by typing
				if (oldDate.getTime() !== this.date.getTime())
					this._trigger('changeDate');
			} else {
				// clearing date
				this._trigger('clearDate');
			}

			if (this.date < this.o.startDate) {
				this.viewDate = new Date(this.o.startDate);
				this.date = new Date(this.o.startDate);
			} else if (this.date > this.o.endDate) {
				this.viewDate = new Date(this.o.endDate);
				this.date = new Date(this.o.endDate);
			} else {
				this.viewDate = new Date(this.date);
				this.date = new Date(this.date);
			}
			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
			html = '<tr>';
			if(this.o.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7) {
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12) {
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){ return d.valueOf(); });
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				currentDate = this.date.valueOf(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() == year && date.getUTCMonth() < month)) {
				cls.push('old');
			} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() == year && date.getUTCMonth() > month)) {
				cls.push('new');
			}
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() == today.getFullYear() &&
				date.getUTCMonth() == today.getMonth() &&
				date.getUTCDate() == today.getDate()) {
				cls.push('today');
			}
			if (currentDate && date.valueOf() == currentDate) {
				cls.push('active');
			}
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
				cls.push('disabled');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) != -1){
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				currentDate = this.date && this.date.valueOf(),
				tooltip;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
						.text(dates[this.o.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(dates[this.o.language].today)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
						.text(dates[this.o.language].clear)
						.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getUTCDay() == this.o.weekStart) {
					html.push('<tr>');
					if(this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() == this.o.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date && this.date.getUTCFullYear();

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear && currentYear == year) {
				months.eq(this.date.getUTCMonth()).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 ? ' old' : i == 10 ? ' new' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function() {
			if (!this._allow_update) return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode) {
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e) {
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length == 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
								switch(this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn == 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this._trigger('changeDate');
								this.update();
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')) {
							this.viewDate.setUTCDate(1);
							if (target.is('.month')) {
								var day = 1;
								var month = target.parent().find('span').index(target);
								var year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1) {
									this._setDate(UTCDate(year, month, day,0,0,0,0));
								}
							} else {
								var year = parseInt(target.text(), 10)||0;
								var day = 1;
								var month = 0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2) {
									this._setDate(UTCDate(year, month, day,0,0,0,0));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							var day = parseInt(target.text(), 10)||1;
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth();
							if (target.is('.old')) {
								if (month === 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month == 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day,0,0,0,0));
						}
						break;
				}
			}
		},

		_setDate: function(date, which){
			if (!which || which == 'date')
				this.date = new Date(date);
			if (!which || which  == 'view')
				this.viewDate = new Date(date);
			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component){
				element = this.element.find('input');
			}
			if (element) {
				element.change();
			}
			if (this.o.autoclose && (!which || which == 'date')) {
				this.hide();
			}
		},

		moveMonth: function(date, dir){
			if (!dir) return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag == 1){
				test = dir == -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){ return new_date.getUTCMonth() == month; }
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){ return new_date.getUTCMonth() != new_month; };
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i<mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){ return new_month != new_date.getUTCMonth(); };
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode == 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, day, month,
				newDate, newViewDate;
			switch(e.keyCode){
				case 27: // escape
					this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation) break;
					dir = e.keyCode == 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
						this._trigger('changeYear', this.viewDate);
					} else if (e.shiftKey){
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
						this._trigger('changeMonth', this.viewDate);
					} else {
						newDate = new Date(this.date);
						newDate.setUTCDate(this.date.getUTCDate() + dir);
						newViewDate = new Date(this.viewDate);
						newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation) break;
					dir = e.keyCode == 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
						this._trigger('changeYear', this.viewDate);
					} else if (e.shiftKey){
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
						this._trigger('changeMonth', this.viewDate);
					} else {
						newDate = new Date(this.date);
						newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
						newViewDate = new Date(this.viewDate);
						newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 13: // enter
					this.hide();
					e.preventDefault();
					break;
				case 9: // tab
					this.hide();
					break;
			}
			if (dateChanged){
				this._trigger('changeDate');
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component){
					element = this.element.find('input');
				}
				if (element) {
					element.change();
				}
			}
		},

		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			/*
				vitalets: fixing bug of very special conditions:
				jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.
				Method show() does not set display css correctly and datepicker is not shown.
				Changed to .css('display', 'block') solve the problem.
				See https://github.com/vitalets/x-editable/issues/37

				In jquery 1.7.2+ everything works fine.
			*/
			//this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){ return i.jquery ? i[0] : i; });
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){ return $(i).data('datepicker'); });
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){ return i.date; });
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){ return d.valueOf(); });
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i == -1) return;

			if (new_date < this.dates[i]){
				// Date being moved earlier/left
				while (i>=0 && new_date < this.dates[i]){
					this.pickers[i--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[i]){
				// Date being moved later/right
				while (i<l && new_date > this.dates[i]){
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])'),
			prefix = new RegExp('^' + prefix.toLowerCase());
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, function(_,a){ return a.toLowerCase(); });
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]) {
			lang = lang.split('-')[0]
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepickerNew; 
	$.fn.datepickerNew = function ( option ) {
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return,
			this_return;
		this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs){
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				}
				else{
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepickerNew.defaults = {
		autoclose: false,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	};
	var locale_opts = $.fn.datepickerNew.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepickerNew.Constructor = Datepicker;
	var dates = $.fn.datepickerNew.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language) {
			if (date instanceof Date) return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
				var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					part, dir;
				date = new Date();
				for (var i=0; i<parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch(part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			var parts = date && date.match(this.nonpunctuation) || [],
				date = new Date(),
				parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){ return d.setUTCFullYear(v); },
					yy: function(d,v){ return d.setUTCFullYear(2000+v); },
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v<0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() != v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){ return d.setUTCDate(v); }
				},
				val, filtered, part;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length != fparts.length) {
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			if (parts.length == fparts.length) {
				for (var i=0, cnt = fparts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)) {
						switch(part) {
							case 'MM':
								filtered = $(dates[language].months).filter(function(){
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(function(){
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				for (var i=0, _date, s; i<setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [],
				seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++) {
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepickerNew.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepickerNew.noConflict = function(){
		$.fn.datepickerNew = old;
		return this;
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker')) return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function(){
		//$('[data-provide="datepicker-inline"]').datepicker();
			$('[data-provide="datepicker-inline"]').datepickerNew();
        
	});

}( window.jQuery ));

/****************************** Start of Forms  **********************************/
$(document).ready(function($){
//$( document ).on( "loadCMS", function( event ) {

    Granite.I18n.setLocale(getLocale()); 

	var value,selectedValue,errorMsg ;
	var aemInput = $('.form-field-text');

	var REQUIRED_MSG = Granite.I18n.get("aem.forms.form-field.mandatory");
	var SIZE_EXCEEDED_MSG=Granite.I18n.get("aem.forms.form-field.size-exceeded");

	var dropdownIsClicked = false;

	function initForms() {

        	// General
		$('.form-row').on( "focusin", handleMouseOver );
		$('.form-row').on( "focusout", handleMouseOut );
		
		// Drop downs

		$('.form-row').on( "mousedown", function(event){dropdownIsClicked = true;} );

		$('.dropdown .form-row').on( "click", showDropdown );
		$(document).on('click',hideDropdownValue);
		$('.dropdown-list li').on("click keydown", selectListValue );
		$('.dropdown-list li').attr('tabindex','0');
		$('.dropdown-list li').on("focus", selectListItem );

		//icon-close		
		aemInput.on('keyup',inputkeyup);
		$(".section .icon-close").on('click',closeIconClick);
		
		// Date picker
		$('.section .datePicker').on("click", showDatePicker );

        $(".cms-wrapper .form").each(function(i){
            var failMsg = '<div class="cms-generic-form-failure alert fade in bgHightlightRed">' + $(this).find(".cms-generic-form-failure").html() + '</div>';
            //console.log(failMsg );
            $(this).data("errorNotificationHolder", failMsg);
		});

	}

	// General
	aemInput.each(function(event){		
		value = $(this).val();	
		if(value!== "") {
		   $(this).addClass('has-content');
		}
		else {
			$(this).removeClass('has-content');
		}		
	});

	// General
	function handleMouseOver(event) {
		if ($(event.currentTarget).hasClass('showDatePicker')){
			showDatePicker(event);//Bug fix for DatePicker
		}
		$(event.currentTarget).closest(".section").not(".radio,.checkbox").addClass("focus");

		hideDropdownValue(event);
		if($(event.currentTarget).parent().hasClass('dropdown') && !dropdownIsClicked){
			showDropdown(event);
		}
	}
	
	// General
	function handleMouseOut(event) {
		$(event.currentTarget).closest(".section").removeClass("focus");
		value = $(event.currentTarget).find("*[name]").val();
		if (value !== "") {
			$(this).closest(".section").find(".form-field-text").addClass('has-content');
		} else {
			$(this).closest(".section").find(".form-field-text").removeClass('has-content');
		}		
		$(event.currentTarget).closest(".section").find(".form-row-description").hide();

    }

    //icon-close
	/************************on keyup adding the close-icon ************************/
	function inputkeyup(event) {
		value = $(event.currentTarget).val().length;
        //console.log(value);
		if (value > 0) {			
			$(event.currentTarget).closest(".section").find('span').not('.icon-down').show();
			$(event.currentTarget).closest(".section").find(".form-row-description").hide();
		} else {			
			$(event.currentTarget).closest(".section").find('span').not('.icon-down').hide();
		}	
	}
	
	/************************on clicking removing the close-icon , making text-field empty and remove highlighted************************/
	function closeIconClick(event){
		$(event.currentTarget).closest(".section").find('input').val('').removeClass('has-content');
        $(event.currentTarget).hide();
	}


	// Dropdown
	function showDropdown(event){
		dropdownIsClicked = false;
		if(event.type == 'click'){
			$(event.currentTarget).closest(".section").find('.dropdown-list').toggle();
		} else {
			$(event.currentTarget).closest(".section").find('.dropdown-list').show();
		}
		$(event.currentTarget).closest(".section").find('li.focus').removeClass("focus");
		$(event.currentTarget).attr('aria-expanded','true');
		event.stopPropagation();
	}

	// Dropdown
	function selectListValue(event){
		if(event.type == 'click' || event.which == 13){
			selectedValue = $(event.currentTarget).text();
			$(event.currentTarget).closest(".section").find(".form-field-text").addClass('has-content');
			$(event.currentTarget).closest(".section").find('.form-field-text').val(selectedValue);
			$(event.currentTarget).closest(".section").find('.dropdown-list').hide();
		}
	}

	// Dropdown
	function selectListItem(event) {
        $(event.currentTarget).closest(".section").find('li.focus').removeClass("focus");
        $(event.currentTarget).addClass("focus");
		event.stopPropagation();
	}

	// Dropdown
	function hideDropdownValue(event) {
		$('.dropdown .form-row').each(function(){
			if($(this).attr('aria-expanded')){
				$(this).attr('aria-expanded','false');
			}
		})
		$('.dropdown-list').hide();
	}

	// to show date-picker 
	function showDatePicker(event) {
        $('.datepicker').addClass('formdatepicker');
		// DatepickerNew is the customised date-picker method.
		//Bug fix - Start
		$(event.target).datepickerNew(
			{
				format: "yyyy-mm-dd",
				weekStart: 1,
				"autoclose": true
				//todayHighlight: true
			}
		).datepickerNew("show");
		//Bug fix - end
		$('.table-condensed td.day').on("click",addHasContent);		
		$('.prev').text("<");
		$('.next').text(">");
		$('.prev,.next').on("click",addHasContent);
	}

	function addHasContent(){
		$(".datePicker.form-field-text").addClass('has-content');
	}

    function submitForm(event){
		$(event.currentTarget).closest(".cms-generic-form").submit();
    }

    //Validation
    function validateInput(formObj) {

		var success = true;

        // Check for input fields
		$(formObj).find(".section input").each(function(i){

			var descObj = $(this).closest(".section").find(".form-row-description");


            // check for required
			var flag=$(this).attr("required");
			if(typeof flag !== typeof undefined && flag !== false) {
                if($(this).attr("type")=="radio"|| $(this).attr("type")=="checkbox") {
					var rname=$(this).attr('name');
					if($('input[name="' + rname + '"]:checked').length<1)
					{
                        descObj.html(getErrorToolTip(REQUIRED_MSG));
                        descObj.show();
						success=false;
					}
				} else if($(this).val() == null || $(this).val()=="") {
                    descObj.html(getErrorToolTip(REQUIRED_MSG));
                    descObj.show();
                   	success=false;
				}
			}	


            var pattern =  $(this).closest(".form-row").attr("data-regex"); 
            if(!($(this).val()).match(pattern))
            {
            	var msg = $(this).closest(".form-row").attr("data-failMsg");
            	descObj.html(getErrorToolTip(msg));
                descObj.show();
                success=false;
            } 
		});


		// Check for text area
        $(formObj).find(".section textarea").each(function(i){

            var descObj = $(this).closest(".section").find(".form-row-description");

            // check for required
            var tflag=$(this).attr("required");
			if(typeof tflag !== typeof undefined && tflag !== false) {
                if($(this).val()=="") {
                    descObj.html(getErrorToolTip(REQUIRED_MSG));
                    descObj.show();
					success=false;
                }
            }
        });

		//check for attachment
         $(formObj).find(".section input[name='attachment']").each(function(i){
			 var file_size=$(this)[0].files[0].size;
             var max_size=2097152; //in bytes (Max size allowed is 2MB)
             var descObj = $(this).closest(".section").find(".form-row-description");
             if(file_size>max_size){
					descObj.html(getErrorToolTip(SIZE_EXCEEDED_MSG));
                    descObj.show();
					success=false;
             }
        });


        // Scroll to first error description
        var descToScroll;
        var valToScroll = 999999999999999;
        $(formObj).find(".section .form-row-description").each(function(i){
            var errorDesc = $(this);
            if(errorDesc.css('display') == 'block') {
                if(errorDesc.offset().top < valToScroll) {
                    valToScroll = errorDesc.offset().top;
					descToScroll = errorDesc;
                }    
            }
		});
        if(descToScroll) {
           scrollIntoView(descToScroll);
        }    


		return success;
	}	

    $(".cms-wrapper .cms-generic-form").submit(function(e){
		//console.log(".cms-wrapper .cms-generic-form submit");

        var formObj = $(this);
		formObj.parent().find(".cms-generic-form-success").hide();
        formObj.parent().find(".cms-generic-form-failure").hide();

		if(validateInput(formObj)) {
        	var formURL = "/bin/sas/processFormData";
        	var formData = new FormData(this);

            // Show overlay and then call the processor
            formObj.closest(".form").find(".formSubmitOverlay").show();
            formObj.closest(".form").find(".formSubmitOverlay").height(formObj.closest(".form").height());

            $.ajax({
                url: formURL,
                type: 'POST',
                data:  formData,
                mimeType:"multipart/form-data",
                contentType: false,
                cache: false,
                processData:false,
        		success: function(data, textStatus, jqXHR)
        			{
            			// Do not Remove overlay but remove just the loading icon
                        formObj.closest(".form").find(".formSubmitOverlay").find("img").hide();

            			formObj.closest(".form").find(".cms-generic-form-success").show();

                        // Do not hide form
                        //formObj.closest(".form").find("form").hide();
        			},
         		error: function(jqXHR, textStatus, errorThrown) 
         			{
                        console.log("Error"+errorThrown);

                        // Remove overlay
                        formObj.closest(".form").find(".formSubmitOverlay").hide();


						formObj.closest(".form").find(".cms-generic-form-failure").remove();
                        var errorNot = formObj.closest(".form").data("errorNotificationHolder");
                        formObj.closest(".form").find(".cms-generic-form-success").after(errorNot);
						formObj.closest(".form").find(".cms-generic-form-failure").show();
         			}             
        	});
		}
        e.preventDefault(); //Prevent Default action. 
        //e.unbind();

    }); 

    function scrollIntoView(descObj) {

        $('html, body').animate({
            scrollTop: descObj.offset().top - 100
        }, 1000);

    }    

    function getErrorToolTip(message){
		var htmlSnippet = '<div class="errorInfo"><span class="errorInfoarrow"></span><span class="errorInfo-hider"></span><span>' + message + '</span></div>';
        return htmlSnippet;
    }

	initForms();
});


//for accessibility
$(document).ready(function(){

	//radio
	$('.section.radio input[type=radio]').each(function(){
		$(this).closest('.section.radio').attr('role','radiogroup');
		
		if($(this).is(':checked')){
			$(this).attr('aria-checked','true');
		}else{
			$(this).attr('aria-checked','false');
		}
		
		$(this).change(function(){
			if($(this).is(':checked')){
				$(this).attr('aria-checked','true');
				var radioName = $(this).attr('name');
				$('input[name='+radioName+']').each(function(){
					if(!$(this).is(':checked')){
						$(this).attr('aria-checked','false');
					}
				});
			}
		});
	});

	//checkbox
	$('.section.checkbox input[type=checkbox]').each(function(){
		$(this).closest('.section.checkbox').attr('role','checkboxgroup');

		if($(this).is(':checked')){
			$(this).attr('aria-checked','true');
		}else{
			$(this).attr('aria-checked','false');
		}
		
		$(this).change(function(){
			if($(this).is(':checked')){
				$(this).attr('aria-checked','true');
			}else{
				$(this).attr('aria-checked','false');
			}
		});
	});

	//dropdown
	$('.section.dropdown .form-row').each(function(){
		$(this).attr('aria-expanded','false');
		$(this).click(function(){
			if($(this).closest('.dropdown').find('.dropdown-list').is(':visible')){
				$(this).attr('aria-expanded','true');
			} else {
				$(this).attr('aria-expanded','false');
			}
		});
	});

});
/****************************** End of Forms  **********************************/
/** Start of faq accordian **/
$( document ).ready(function( event ) {
		if($('#faqAccordion').length){
		var icons = {
		  header: "icon-down",
		  activeHeader: "icon-up"
		};
		$(function() {
			$("#faqAccordion").accordion({
				collapsible: true,
				icons: icons
			});
		});
		
		$(function () {
			$('.expandListDivLess').hide();	

			$('#faqAccordion .accordionContent.ui-accordion-content-active').each(function(){
				if($(this).find('li').length>5){
					$(this).find('.expandListDiv').show();
					$(this).find('.expandListDivLess').hide();	
				} else if($(this).find('li').length<=5){
					$(this).find('.expandListDiv').hide();
					$(this).find('.expandListDivLess').hide();	
				}
			});

			$('.expandListBtn').click(function () {
				$('.accordionContent.ui-accordion-content-active li:hidden').show();			
				$('.expandListDiv').hide();
				$('.expandListDivLess').show();			
			});
			$('.expandListBtnLess').click(function () {
				$('#faqAccordion .accordionContent.ui-accordion-content-active ul li:nth-child(n+6)').css('display', 'none');			
				$('.expandListDivLess').hide();			
				$('.expandListDiv').show();
			});		
			 $('.accordionHeader').click(function () {
				$('#faqAccordion .accordionContent.ui-accordion-content-active ul li:nth-child(n+6)').css('display', 'none');
				
				$('#faqAccordion .accordionContent.ui-accordion-content-active').each(function(){
					if($(this).find('li').length>5){
						$(this).find('.expandListDiv').show();
						$(this).find('.expandListDivLess').hide();	
					} else if($(this).find('li').length<=5){
						$(this).find('.expandListDiv').hide();
						$(this).find('.expandListDivLess').hide();	
					}
				});
			}); 
			
		});	
	}
});
/** Start of faq accordian **/
/*** Start of destination list ***/

//$(document).ready(function(){
$( document ).on( "loadCMS", function( event ) {
	if($('#destination-list').length){
		var viewportWidth = $(window).width();
		var viewportHeight = $(window).height();
		
		if(viewportWidth >= 768){ 
			$('.allDestination').addClass('desktop');
			$('.grid').masonry({
				// options
				itemSelector: '.grid-item',
				//		  fitWidth: true,
				//columnWidth: 95,
				columnWidth: '.grid-item',
				percentPosition: true
			});
		}	else	{
			$('.allDestination').addClass('mobile');
		}

		// First Hierarchy to Second Hierarchy

		$('.mobile .grid-container .grid-item').on('click',function(e){
			if( $('.grid-container').is(':visible') ){
				var obj = $(this).clone(true);
				//console.log(this,e);
				$('.grid-container').addClass('hide');
				$overlay = $("<div class='continentOverlay'>"+
								"<ul class='overlayCat'>"+
								"</ul>"+
							"</div>");
				$('.destinations-list').append($overlay);  
				$('.continentOverlay .overlayCat').append(obj);
				$('.continentOverlay ul li').find( "h4" ).prepend('<span class="backBtn icon icon-left-open"></span>');			
				//$('.grid-item').off('click');
				$("body").addClass("modal-open");

                /*Added for CMS-591*/
                $('.destinations-list .grid-childOne-ul li').each(function(){
                    $(this).find('h6.destSubCat a').replaceWith($(this).find('h6.destSubCat a').text());
                });

				$('.continentOverlay .destCat').on('click',function(e){
					$(this).parents('.continentOverlay').remove();
					$('.grid-container').removeClass('hide');
					$("body").removeClass("modal-open");
				});	
			}
		});


		// Second Hierarchy to Third Hierarchy

		//$('.mobile .destSubCat').on('click',function(e){
		$(document).on('click', '.mobile .destSubCat', function(){

			if($('.continentOverlay').is(':visible')) {

				var obj = $(this).parent().clone(true);
				$('.continentOverlay ').addClass('hide');
				$overlay = $("<div class='countryOverlay'>"+
								"<ul class='overlaysubCat'>"+
								"</ul>"+
							"</div>");

				$objLegend = $("<li class='mobLegend'>"+
								"<label class='direct'><span class='iconSet-1 direct-icon'></span>" + Granite.I18n.get('aem.destination.destination-list.legend1') + "</label>"+
								"<label class='seasonal'><span class='iconSet-1 seasonal-icon'></span>" + Granite.I18n.get('aem.destination.destination-list.legend2') + "</label>"+
								"</li>");

				$('.destinations-list').append($overlay);
				$('.countryOverlay .overlaysubCat').append(obj);			
				$('.countryOverlay ul li').find( "h6" ).prepend('<span class="backBtn icon icon-left-open"></span>');

                /*Fix for CMS-516*/
                var gridChildTwoUlObj = $('.countryOverlay ul li').find( ".grid-childTwo-ul" );
                var directIcon = gridChildTwoUlObj.find(".direct-icon").length;
                var seasonalIcon = gridChildTwoUlObj.find(".seasonal-icon").length;
                if(directIcon>0 || seasonalIcon>0){
                    gridChildTwoUlObj.prepend($objLegend);
                    if(directIcon > 0){
                        gridChildTwoUlObj.find(".mobLegend .direct").css("display","inline-block");
                    }
                    if(seasonalIcon > 0){
                        gridChildTwoUlObj.find(".mobLegend .seasonal").css("display","inline-block");
                    }
                }

                $('.countryOverlay .destSubCat').on('click',function(e){
					$(this).parents('.countryOverlay').remove();
					$('.continentOverlay ').removeClass('hide');

				});
			}

		});

		// Adding Go Buttons
		$('.grid-container').find('h4.destCat').append('<span class="goBtn icon icon-right-open"></span>');
		$('.grid-childOne-ul').find('h6.destSubCat').append('<span class="goBtn icon icon-right-open"></span>');
		
		//Added for CMS-516
		if($('.grid-container').find('.direct-icon').length){
			$('.allDestination').find('.direct').css("display","inline-block");
		}

		if($('.grid-container').find('.seasonal-icon').length){
			$('.allDestination').find('.seasonal').css("display","inline-block");
		}
	}
});
/*** End of destination list ***/
/*********** Start of CTA Link *********/
//$(document).ready(function($) {
$( document ).on( "loadCMS", function( event ) {

    $('.cms-login').each(function(  ){
		$(this).attr("href","/login");
	});
	/*
    $( ".cms-login" ).on( "click", function( event ) {

        window.location.href="#/profile?userAction=Login";
        return;
    });
	*/

    $('.cms-register').each(function(  ){
		$(this).attr("href","/register");
	});
    /*
    $( ".cms-register" ).on( "click", function( event ) {

        window.location.href="#/profile?userAction=Register";
        return;
    });
	*/

    $('.cms-ebDashboard').each(function(  ){
		/* Fix for CMS-461 */
		$(this).attr("href",getExternalizedRootPage()+"/profile/#/profile?userAction=Eurobonus");
	});
	/*
	$( ".cms-ebDashboard" ).on( "click", function( event ) {

        window.location.href="#/profile?userAction=Eurobonus";
        return;
    }); 
	*/
	/*
    $( ".cms-protected" ).on( "click", function( event ) {
		validateUser($( this ).attr("data-href"));
    });

	function validateUser(url){
		$( document ).on( "userSignedIn", function( event ) {
            console.log("Received login complete notification : " + window.cmsUrl);
        	if(window.cmsUrl != null){
				window.location.href = window.cmsUrl;
            }
    	});

		var SSOCodeFromCookie = getSSOCookie();
        if(SSOCodeFromCookie!=null){
        	window.location.href = url;
       	}else{
        	window.cmsUrl = url;
            //$(document).trigger( "signInUser");

            console.log("About to invoke login");
       		$("#ocpWidget_login").triggerHandler("click");
        }

  	}
	*/
 });
/*********** End of CTA Link *********/
$(document).on("loadCMS", function(event) {
    $("#feedback").each(function(){
		var pagepath = $("#feedback").attr("data-ajax-path");

		var pageViewUrl = "/bin/sas/pageviews";
		var impression = "/libs/wcm/stats/tracker.js"
		$.ajax({
				type: "GET",
				data:
				{
					"path": pagepath,


				},
				url: impression,
				contentType: "application/json",

				success: function(data) {
				 //console.log("the impression is increased",data);
				}
			});

		if($(document).width() >= 768){


			$('.feedback .btn').css("display","block");

		}

		var noofdays = 30;


	   // console.log("the current page path is",pagepath);
		$.ajax({
            type: "GET",
            data:
            {
                "pagepath": pagepath,
                "noofdays": noofdays,

            },
            url: pageViewUrl,
            contentType: "application/json",

            success: function(data) {
             var maxviews = parseInt($("#feedback").attr("data-views-count"));
            // var runmode = document.getElementById("runmode").innerHTML;
            // console.log("The views count is",data.pageviews);
            //    console.log("the max views",maxviews);
             if (data.pageviews <= maxviews )
                 {
                  $('.feedback .btn').css("display","none");
                 }

            }
        });
	});
});
var align;

//console.log("cta");
$(document).ready(function(){
 $(".btn.cmsBtn.btn-block").each(function() {
	var bkColor = $(this).attr("data-bgColor");
	align = $(this).attr("data-align");
    $(this).addClass(bkColor);


     if(align == "left"){
//console.log("cta left ");

    	$(this).css({'margin-left': '0px'});
     }

     else if (align == "right"){
     	$(this).css({'margin-right': '0px'});


     }

 });

});
/* start of reservation small widget */

var reservationOfferSmallComponent = {
    initReservationOfferSmall : function() {
        $(".reservation-small-wrapper")
        .each(
            function() {
                var currObj = $(this);
                var defaultOfferElem = null;

                var pnrNumber = personalisationObj.getPnrFromCookie();

                if(pnrNumber){
                    defaultOfferElem = currObj.find(".offer-sales-small-component");
                    currObj.find(".offer-sales-small-component").remove();
                    currObj = currObj.find(".reservation-small-component");
                }else{
                    currObj.find(".reservation-small-component").remove();
                    currObj = currObj.find(".offer-sales-small-component");
                }

                var requestData = personalisationObj.getRequestData(currObj, null, pnrNumber);

                if(!requestData && pnrNumber && defaultOfferElem){
                    currObj.replaceWith(defaultOfferElem);
                    currObj = defaultOfferElem;
                }

                var hasBgColor = currObj.attr("data-bgcolor");
                var isTextBgColor = currObj.attr("data-textBgColor");

                if(!hasBgColor || (hasBgColor && isTextBgColor)){
                    personalisationObj.setBackgroundImg($(this));
                    if(hasBgColor && isTextBgColor){
                        personalisationObj.setTextBgColor(currObj);
                    }
                }

                if (requestData) {

                    function renderResponse(data) {
                        var offer = data.offerInfo[0];
                        personalisationObj.isDuplicateOfferCode(offer["offerCode"]);

                        if(!hasBgColor || (hasBgColor && isTextBgColor)){
                            personalisationObj.getPersonalisationImgPath(offer["offerCode"], currObj);
                        }

                        currObj.find(".top-content h2").text(offer["shortTitle"]);
                        currObj.find(".top-content h4") && currObj.find(".top-content h4").text(offer["destinationCity"]);

                        var elem = currObj.find("a");
                        elem[0].title = offer["shortTitle"];

                        if(currObj.find(".bottom-content") && currObj.find(".bottom-content").length > 0){

                            var journey = offer["departureAirport"]+" - "+offer["arrivalAirport"];

                            var travelDate = new Date(offer["outboundDateOfTravel"]);
                            var dateString = offer["outboundDateOfTravelString"];
                            var returnDateString = offer["homeboundDateOfTravelString"];

                            if(personalisationObj.getReservationProductTypeFlag(offer['offerProdType'])) {
                                journey = offer["destinationCity"];
                                dateString += " - "+returnDateString;
                            } else {
                                if(travelDate < new Date()){
                                    journey = offer["arrivalAirport"]+" - "+offer["departureAirport"];
                                    dateString = returnDateString;
                                }
                            }

                            currObj.find(".bottom-content h4")[0].innerHTML = journey;
                            currObj.find(".bottom-content h4")[1].innerHTML = dateString;

                            elem[0].href = offer["cta"];

                            var target = personalisationObj.getTarget(offer["offerProdType"]);
                            if(target){
                                elem[0].target = target;
                            }
                        } else {
                            
                            $(elem).click(function(event){personalisationObj.onOfferClick(event,offer);});
                        }


                        if(hasBgColor && isTextBgColor){
                            personalisationObj.setTextBgColor(currObj);
                        }
                    };

                    function handleError(){
                        if(pnrNumber && defaultOfferElem){
                            currObj.replaceWith(defaultOfferElem);
                            currObj = defaultOfferElem;
                            var hasBgColor = currObj.attr("data-bgcolor");
                            var isTextBgColor = currObj.attr("data-textBgColor");
                            
                            if(!hasBgColor || (hasBgColor && isTextBgColor)){
                                personalisationObj.setBackgroundImg(currObj.parent());
                                if(hasBgColor && isTextBgColor){
                                    personalisationObj.setTextBgColor(currObj);
                                }
                            }
                        }
                    };

                    personalisationObj.doPostRequest(personalisationObj.offerServiceURL(), requestData, renderResponse, handleError, currObj.attr("data-sync"));

                }
        });
    }
}
/* start of reservation widget */

var reservationOfferComponent = {

	initReservationOffer : function() {
		var thisObj = this;

		$(".reservation-wrapper")
			.each(
				function() {
					var currObj = $(this);
					var defaultOfferElem = null;

	                var pnrNumber = personalisationObj.getPnrFromCookie();

	                if(pnrNumber){
	                	defaultOfferElem = currObj.find(".offer-sales-component");
	                    currObj.find(".offer-sales-component").remove();
	                    currObj = currObj.find(".reservation-component");
	                }else{
						currObj.find(".reservation-component").remove();
	                    currObj = currObj.find(".offer-sales-component");
	                }

	                var requestData = personalisationObj.getRequestData(currObj, null, pnrNumber);

	                if(!requestData && pnrNumber && defaultOfferElem){
	                    currObj.replaceWith(defaultOfferElem);
	                    currObj = defaultOfferElem;
	                }

	                var hasBgColor = currObj.attr("data-bgcolor");
	                var isTextBgColor = currObj.attr("data-textBgColor");
	                
	                if(!hasBgColor || (hasBgColor && isTextBgColor)){
	                    personalisationObj.setBackgroundImg($(this));
	                    if(hasBgColor && isTextBgColor){
	                        personalisationObj.setTextBgColor(currObj);
	                    }
	                }

					if (requestData) {

						function renderResponse(data) {

							var offer = data.offerInfo[0];
                        	personalisationObj.isDuplicateOfferCode(offer["offerCode"]);

				            if(!hasBgColor || (hasBgColor && isTextBgColor)){
	                            personalisationObj.getPersonalisationImgPath(offer["offerCode"], currObj);
	                        }
	                        
							if( pnrNumber ) {

                                personalisationObj.setReservationView( currObj, offer);

							} else { 
								
								personalisationObj.setSingleOfferView( currObj, offer);

							}

	                        if(hasBgColor && isTextBgColor){
	                            personalisationObj.setTextBgColor(currObj);
	                        }
						};

						function handleError(){
	                        if(pnrNumber && defaultOfferElem){
	                            currObj.replaceWith(defaultOfferElem);
	                            currObj = defaultOfferElem;
	                        	var hasBgColor = currObj.attr("data-bgcolor");
				                var isTextBgColor = currObj.attr("data-textBgColor");
				                
				                if(!hasBgColor || (hasBgColor && isTextBgColor)){
				                    personalisationObj.setBackgroundImg(currObj.parent());
				                    if(hasBgColor && isTextBgColor){
				                        personalisationObj.setTextBgColor(currObj);
				                    }
				                }

	                        }
	                    };

						personalisationObj.doPostRequest(personalisationObj.offerServiceURL(), requestData, renderResponse, handleError, currObj.attr("data-sync"));
	                    
					}
		});
	}
}
/* start of small offer widget */

var offerSalesSmallComponent = {
	initOfferSalesSmall : function(newOriginCode) {
		$(".offer-sales-small-wrapper")
		.each(
			function() {
				var currObj = $(this);

				var requestData = personalisationObj.getRequestData(currObj, newOriginCode, "");

                var hasBgColor = currObj.attr("data-bgcolor");

                if(!hasBgColor){
                    personalisationObj.setBackgroundImg(currObj);
                }

				if (requestData) {

					function renderResponse(data) {

						var offer = data.offerInfo[0];
                        personalisationObj.isDuplicateOfferCode(offer["offerCode"]);

						if(!hasBgColor){
							personalisationObj.getPersonalisationImgPath(offer["offerCode"], currObj);
                        }

                        currObj.find(".top-content h2").text(offer["shortTitle"]);
                        currObj.find(".top-content h4").text(offer["destinationCity"]);
                        if(offer["program"].toLowerCase() == "onboarding") {
				            currObj.find(".top-content h4").text("");
				        }

				        var elem = currObj.find("a");

						$(elem).click(function(event){personalisationObj.onOfferClick(event,offer);});

						//elem[0].href = offer["cta"];
                        elem[0].title = offer["shortTitle"];

                        /*var target = personalisationObj.getTarget(offer["offerProdType"]);
                        if(target){
                            elem[0].target = target;
                        }*/
					};

					function handleError() {

					};

					personalisationObj.doPostRequest(personalisationObj.offerServiceURL(), requestData, renderResponse, handleError, currObj.attr("data-sync"));
				}
			}
		);
	}
}
/** * Start of Offer Sales campaigns * */

var offerSalesComponent = {

	initOfferSales : function(newOriginCode) {
	    var thisObj = this;
		
		$(".offer-sales-wrapper")
		.each(
			function() {
				var currObj = $(this);

				var requestData = personalisationObj.getRequestData(currObj, newOriginCode, "");

				var hasBgColor = currObj.attr("data-bgcolor");
				var isTextBgColor = currObj.attr("data-textBgColor");
	                
                if(!hasBgColor || (hasBgColor && isTextBgColor)){
                    personalisationObj.setBackgroundImg(currObj);
                    if(hasBgColor && isTextBgColor){
                        personalisationObj.setTextBgColor(currObj);
                    }
                }

				if (requestData) {

					function renderResponse(data) {

						var isFirstOffer = true;
						var maxOffers = currObj.attr("data-maxOffer");

						for(var count=0; count<data.offerInfo.length; count++) {
                            var offer = data.offerInfo[count];

							if(maxOffers == count) {

                                if(hasBgColor && isTextBgColor){
                                    personalisationObj.setTextBgColor(currObj);
                                }

				            	break;
				            }

				            personalisationObj.isDuplicateOfferCode(offer["offerCode"])

				            if(isFirstOffer) {
				            	isFirstOffer = false;
				            	if(!hasBgColor || (hasBgColor && isTextBgColor)){
		                            personalisationObj.getPersonalisationImgPath(offer["offerCode"], currObj);
		                        }

                                if (maxOffers > 1) {

                                    var tripTypeValueMultiOffer = personalisationObj.getTripType(currObj.attr("data-tripType"));

                                    currObj.find(".top-content h2").text(offer['mediumTitle'] || offer['shortTitle']);
                                    currObj.find(".bottom-content .service-label .left").text(offer['originCity']);
                                    currObj.find(".bottom-content .service-label .right").text(tripTypeValueMultiOffer);

                                    var destinationDetails = currObj.find(".destinationDetails");
									destinationDetails.empty();

								}

				            }
				            
							if (maxOffers > 1) {

								thisObj.setMultiOfferView( currObj, offer);

							} else if (maxOffers == 1) {

                               	personalisationObj.setSingleOfferView( currObj, offer);

							}
						}
						if(hasBgColor && isTextBgColor){
							personalisationObj.setTextBgColor(currObj);
						}
					};

                    function handleError(){
                    };

                    personalisationObj.doPostRequest(personalisationObj.offerServiceURL(), requestData, renderResponse, handleError, currObj.attr("data-sync"));
				}

		});
	},

	setMultiOfferView : function(currObj, offer){
		var formattedPrice=Granite.I18n.get("aem.commons.book-label");
								
		if(offer["price"] && parseInt(offer["price"])){
			formattedPrice = offer["price"] +' '+ (offer["currency"] || "");
		}

		var title = (offer["mediumTitle"] || offer['shortTitle']);
        var offerProdType = offer["offerProdType"];
        var destinationCity = offer["destinationCity"];

        var destinationDetails = currObj.find(".destinationDetails");

        var target = personalisationObj.getTarget(offerProdType);
        if(!target && currObj.attr("data-newWindow")){
            target = "_blank";
        } else if(!target) {
            target = "_top";
        }

        var snippet = '<li title="'+ title +'">'
        + '<div class="destinationValue">'
        + destinationCity 
        + '</div>'
        + '<div class="priceValue">'
        + formattedPrice
        + '</div></li>';

        var snippet = $(snippet).click(function(event){personalisationObj.onOfferClick(event,offer);});

        currObj.find('.bottom-content .service-label span').text();
                                                
        destinationDetails.append(snippet);
    }
}
/** * Start of Grouped reservation campaigns * */

var groupedReservationComponent = {
    defaultOfferElem : {},
    initGroupedReservation : function() {
        var thisObj = this;
        $(".grouped-reservation-wrapper")
        .each(
            function() {
                var offerCount = $(this).attr("data-offer-count");
                for(x=1; x <= offerCount; x++){
                    var obj = $(this).find(".column.column"+x);
                    thisObj.defaultOfferElem[x] = obj.find(".offer-sales-component");
                    thisObj.renderOffer(obj, $(this));
                }
                thisObj.callOffer($(this));
        });
    },

    renderOffer : function(currObj, parentObj) {

        var pnrNumber = personalisationObj.getPnrFromCookie();
        var newObj = "";

        if(pnrNumber){
            currObj.find(".offer-sales-component").remove();
            newObj = currObj.find(".reservation-component");
        }else{
            currObj.find(".reservation-component").remove();
            newObj = currObj.find(".offer-sales-component");
        }

        var displayType = newObj.attr("data-display-type");

        if(displayType == "small"){
            parentObj[0].style.height = "180px";
        }
        
        var hasBgColor = newObj.attr("data-bgcolor");
        var isTextBgColor = newObj.attr("data-textBgColor");
        
        if(!hasBgColor || (hasBgColor && isTextBgColor)){
            personalisationObj.setBackgroundImg(currObj);
            if(hasBgColor && isTextBgColor){
                personalisationObj.setTextBgColor(newObj);
            }
        }
    },
    
    callOffer : function(wrapperObj) {

        var thisObj = this;
        var pnrNumber = personalisationObj.getPnrFromCookie();
        var currObjClassName = "";
        if(pnrNumber){
            currObjClassName = " .reservation-component";
        }else{
            currObjClassName = " .offer-sales-component";
        }

        var firstObj = wrapperObj.find(".column.column1 "+currObjClassName);
        var displayType = firstObj.attr("data-display-type");
        var requestData = personalisationObj.getRequestData(firstObj, null, pnrNumber);
        var offerCount = wrapperObj.attr("data-offer-count");

        function renderResponse(data) {

            for(var count=0; (count < data.offerInfo.length && count < offerCount); count++) {
                var offer = data.offerInfo[count];

                personalisationObj.isDuplicateOfferCode(offer["offerCode"])

                var currObj = wrapperObj.find(".column.column"+(count+1)+currObjClassName);
                var hasBgColor = currObj.attr("data-bgcolor");
                var isTextBgColor = currObj.attr("data-textBgColor");

                if(!hasBgColor || (hasBgColor && isTextBgColor)){
                    personalisationObj.getPersonalisationImgPath(offer["offerCode"], currObj);
                }

                if(displayType == "medium") {

                    if( pnrNumber ) {

                         personalisationObj.setReservationView( currObj, offer);

                    } else { 

                        personalisationObj.setSingleOfferView( currObj, offer);

                    }

                } else if(displayType == "small") {

                    currObj.find(".top-content h2").text(offer["shortTitle"]);
                    currObj.find(".top-content h4") && currObj.find(".top-content h4").text(offer["destinationCity"]);
                    
                    var elem = currObj.find("a");
                    elem[0].title = offer["shortTitle"];

                    if(currObj.find(".bottom-content") && currObj.find(".bottom-content").length > 0){

                        var journey = offer["departureAirport"]+" - "+offer["arrivalAirport"];
                        
                        var travelDate = new Date(offer["outboundDateOfTravel"]);
                        var dateString = offer["outboundDateOfTravelString"];
                        var returnDateString = offer["homeboundDateOfTravelString"];
                            
                        if(personalisationObj.getReservationProductTypeFlag(offer["offerProdType"])) {
                            journey = offer["destinationCity"];
                            dateString += " - "+returnDateString;
                        } else {
                            if(travelDate < new Date()){
                                journey = offer["arrivalAirport"]+" - "+offer["departureAirport"];
                                dateString = returnDateString;
                            }
                        }
                        
                        currObj.find(".bottom-content h4")[0].innerHTML = journey;
                        currObj.find(".bottom-content h4")[1].innerHTML = dateString;

                        elem[0].href = offer["cta"];

                        var target = personalisationObj.getTarget(offer["offerProdType"]);
                        if(target){
                            elem[0].target = target;
                        }
                    } else {
                        
                        $(elem).click(function(event){personalisationObj.onOfferClick(event,offer);});
                    }

                }

                if(hasBgColor && isTextBgColor){
                    personalisationObj.setTextBgColor(currObj);
                }
            }
        };

        function handleError(){
            if(pnrNumber){
                for(x=1; x <= offerCount; x++){
                    var obj = wrapperObj.find(".column.column"+x);
                    var newObj = obj.find(".offer-sales-component");
                    var displayType = newObj.attr("data-display-type");
                    if(thisObj.defaultOfferElem[x]){
                        obj.find(".reservation-component").replaceWith(thisObj.defaultOfferElem[x]);
                    }

                    if(displayType == "small"){
                        wrapperObj[0].style.height = "180px";
                    }
                    
                    var hasBgColor = newObj.attr("data-bgcolor");
                    var isTextBgColor = newObj.attr("data-textBgColor");
                    
                    if(!hasBgColor || (hasBgColor && isTextBgColor)){
                        personalisationObj.setBackgroundImg(obj);
                        if(hasBgColor && isTextBgColor){
                            personalisationObj.setTextBgColor(newObj);
                        }
                    }

                }
            }
        };

        if (requestData) {
            personalisationObj.doPostRequest(personalisationObj.offerServiceURL(), requestData, renderResponse, handleError, firstObj.attr("data-sync"));
        } else {
            handleError();
        }
    }    
}
/** * Start of Grouped Offer Sales campaigns * */

var groupedOfferSalesComponent = {

    initGroupedOfferSales : function(newOriginCode) {
        var thisObj = this;
        $(".grouped-offer-sales-wrapper")
        .each(
            function() {
                var offerCount = $(this).attr("data-offer-count");
                for(x=1; x <= offerCount; x++){
                    var obj = $(this).find(".column.column"+x);
                    thisObj.renderOffer(obj, $(this));
                }
                thisObj.callOffer($(this), newOriginCode);
        });
    },

    renderOffer : function(currObj, parentObj) {

        var displayType = currObj.attr("data-display-type");

        if(displayType == "small"){
            parentObj[0].style.height = "180px";
        }
        
        var hasBgColor = currObj.attr("data-bgcolor");
        
        if(!hasBgColor){
            personalisationObj.setBackgroundImg(currObj);
        }
        
    },
    
    callOffer : function(wrapperObj, newOriginCode) {
        var thisObj = this;
        var firstObj = wrapperObj.find(".column.column1");
        var displayType = firstObj.attr("data-display-type");
        var requestData = personalisationObj.getRequestData(firstObj, newOriginCode, "");

        function renderResponse(data) {
            var offerCount = wrapperObj.attr("data-offer-count");

            for(var count=0; (count < data.offerInfo.length && count < offerCount); count++) {
                var offer = data.offerInfo[count];

                personalisationObj.isDuplicateOfferCode(offer["offerCode"])

                var tripTypeValue = personalisationObj.getTripType(offer["tripType"]);
                var currObj = wrapperObj.find(".column.column"+(count+1));

                var hasBgColor = currObj.attr("data-bgcolor");
                if(!hasBgColor){
                    personalisationObj.getPersonalisationImgPath(offer["offerCode"], currObj);
                }

                if(displayType == "medium"){
                    
                    personalisationObj.setSingleOfferView( currObj, offer);

                }else if(displayType == "small"){

                    currObj.find(".top-content h2").text(offer["shortTitle"]);
                    currObj.find(".top-content h4").text(offer["destinationCity"]);
                    if(offer["program"].toLowerCase() == "onboarding") {
                        currObj.find(".top-content h4").text("");
                    }

                    var elem = currObj.find("a");

                    $(elem).click(function(event){personalisationObj.onOfferClick(event,offer);});
                    //currObj.find("a")[0].href = offer["cta"];
                    elem[0].title = offer["shortTitle"];
                    
                    /*var target = personalisationObj.getTarget(offer["offerProdType"]);
                    if(target){
                        currObj.find("a")[0].target = target;
                    }*/

                }
            }
        };

        function handleError() {

        };

        if (requestData) {
            personalisationObj.doPostRequest(personalisationObj.offerServiceURL(), requestData, renderResponse, handleError, firstObj.attr("data-sync"));
        }
    }
    
}
/*** Start of dummy-login ***/
$('.dummy-login .login').click(function() {

    var selected=$('.dummy-login .flyerType').val();
    
	$(document).trigger("userSignedIn",selected);

});    
/*** End of dummy-login ***/
/* start of common script */

//NOTE : duplicate of common script with functions used in side banner components are hosted on transation server, so if changes are made here then they should be deployed there as well, */
/* the file shared with TXN team should have the object : personalisationObjTxn, and event listener should be like below
$(document).on("originChange", function(event, newOriginCode) {
    Granite.I18n.setLocale(getLocale());
    checkinMobileComponent.init();
    checkinComponent.init();
});

file is present in the same directory, name : txn-script.js, not part of aem script.
*/


$(document).on("originChange", function(event, newOriginCode) {
    Granite.I18n.setLocale(getLocale());
    personalisationObj.renderedOfferCodes = [];
    reservationOfferComponent.initReservationOffer();
    offerSalesComponent.initOfferSales(newOriginCode);
    reservationOfferSmallComponent.initReservationOfferSmall();
    offerSalesSmallComponent.initOfferSalesSmall(newOriginCode);
    groupedReservationComponent.initGroupedReservation();
    groupedOfferSalesComponent.initGroupedOfferSales(newOriginCode);
    //checkinMobileComponent.init();
    //checkinComponent.init();
});

var personalisationObj = {
    renderedOfferCodes : [],

    localeHeader : function(){
        return (getLanguageCode() + '_' + getCountryCode());
    },

    offerServiceURL : function(){
        //return "https://apit.flysas.com/st4/personalizedoffer/offers"; //TODO - remove
        return (getApiHost()+"personalizedoffer/offers");
    },

    getTripType : function(tripOpt) {
        var tripTypeValue = "";
        //var tripOpt = currObj.attr("data-tripType");
        if(tripOpt == "O"){
            tripTypeValue=Granite.I18n.get("label-one-way-from");         
            //tripTypeValue = "One-way";
        } else if(tripOpt == "R"){
            tripTypeValue=Granite.I18n.get("label-return-from");
            //tripTypeValue = "Return";
        }
        return tripTypeValue;
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
            backgroundImgElem.css("background-position", "50% 50%");
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
        var orgAirport = newOriginCode || getOriginCookie();
        var market = getCountryCode();
        var tripType = currObj.attr("data-tripType") || "";

        if(!(customerId && category && category.indexOf(';') > 1)) {
            return null;
        }
        //todo max offer multiply on the basis of dialog duplicate flag
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
            "language" : getLanguageCode()
        };
    },

    getCustomerIdFromCookie : function () {

        //return "10405357"; //TODO - remove
        var dnaData=getCustomerDNACookie();
        if(dnaData) {
            var dnaTokenArr=dnaData.split(',');
            var customerId=dnaTokenArr[2];

            return customerId;
        }
        return null;
    },

    getPnrFromCookie : function () {

        //return "2XGD7B"; //TODO - remove
        var dnaData=getCustomerDNACookie();
        if(dnaData) {
            var dnaTokenArr = dnaData.split(',');
            var upcomingBookingPNR = (dnaTokenArr[1] && dnaTokenArr[1] == "undefined") ? undefined : dnaTokenArr[1];

            return upcomingBookingPNR;
        }
        return null;
    },

    getTarget : function (targetVal) {
        var sameWindowVals = ["Go", "Go-light", "Plus", "Business", "Plus and Business", "Go-light and Go", "Go-light, Go and Plus", "Meal", "X-bag", "Pre-seat"];

        var newWindowVals = ["Upgrade", "Hotel", "Transfer", "Car rental"]

        //["Lounge", "Other", "Co-brand", "Online shopping", "Other partners", "ALL"]

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
            backgroundImgElem.css("background-image","url('" + adaptiveImgPath.join('.') + "')");
            backgroundImgElem.css("background-size", "cover");
            backgroundImgElem.css("background-position", "50% 50%");

        });
    },

    setTextBgColor : function (currObj) {
        var elems = ['h2'];
        var bgColor = currObj.attr("data-bgcolor");
        if(bgColor){
            elems.forEach(function(elem) {
                var selectedElems = currObj.find(elem);
                for(var i=0; i<selectedElems.length; i++) {
                    var txt = selectedElems[i].innerHTML;
                    if(selectedElems[i].innerHTML.indexOf('txtWithBgColor') < 0){
                        selectedElems[i].innerHTML="<span class='txtWithBgColor "+bgColor+"'>"+txt+"</span>";
                    }
                }
            });
        }
    },

    getReservationProductTypeFlag : function(productType) {
        var productTypes = ['car rental', 'hotel'];
        //var productType = currObj.attr("data-productType");
        if(productTypes.indexOf(productType.toLowerCase()) > -1){
            return true;
        }
        return false;
    },

    isDuplicateOfferCode : function(offerCode) {
        if(this.renderedOfferCodes.indexOf(offerCode) > -1) {
        } else {
            this.renderedOfferCodes.push(offerCode);
        }
    },

    getUrlParameterByName : function (name, url) {
        if (!url){
          url = window.location.href;
        } 
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },



    onOfferClick : function(event, offer){
        var url = offer["cta"];
        if(window.isCms){
              window.location.href = url;

        } else {

            var orgApt = this.getUrlParameterByName("org", url);
            var orgCity = offer['originCity'];
            var org = this.getUrlParameterByName("org", url);
            var destApt = offer['destinationCity'];
            var destCity = offer['destinationCity'];
            var dest = offer['offerCode'];
            var type = offer['tripType'];
            var outbound = this.getUrlParameterByName("out", url);
            var inbound = this.getUrlParameterByName("in", url);
            var onwardDate = this.getFormattedDate(outbound);
            var returnDate= (type == "O" ? null : this.getFormattedDate(inbound));

            $(document).trigger("showLPCCalendar",{

            origin:{
              value: orgApt,
              data:{
                cityName: orgCity,                                        
                countryName: "NA",
                iata: org                                          
              },
              isCityCode: false 
            },
            dest:{
              value: destApt,
              data:{
                cityName: destCity,                                        
                countryName: "NA",
                iata: dest                                          
              },
              isCityCode: false //if airport code -  isCityCode will be false
            },
            tripType: type,
            traveler: '1 Adult',
            onwardDate: onwardDate,
            returnDate: returnDate,
          });   
        }
    },

    getFormattedDate : function (dateStr){
        var date;
        if(dateStr == null){
            return null;
        }    
        var mmddyyFormat =  /(20\d{2})(\d{2})(\d{2})$/;
        if(mmddyyFormat.test(dateStr)){
            var match = mmddyyFormat.exec(dateStr);
            var dateStr = match[1] + '-' + match[2] + '-' + match[3];
            date = new Date(dateStr);
        }
        else {
            date = new Date(dateStr);
        }
        return date;
    },

    setSingleOfferView : function(currObj, offer){

        var formattedPrice= null;
                                        
        if(offer["price"] && parseInt(offer["price"])){
            formattedPrice = offer["price"] +' '+ (offer["currency"] || "");
        }

        var tripType = this.getTripType(offer["tripType"]);
        var title = (offer["mediumTitle"] || offer['shortTitle']);
        var offerProdType = offer["offerProdType"];
        var originCity = offer['originCity'];
        var destinationCity = offer['destinationCity'];

        var topContent = currObj.find(".top-content");
        var buttonHTML = topContent.find('.btn');
        
        var target = this.getTarget(offerProdType);
        if(!target && currObj.attr("data-newWindow")){
            target = "_blank";
        } else if(!target) {
            target = "_top";
        }

        var snippet = '<h2>'+title+'</h2>'
        + '<h4>'+originCity+'</h4>'
        + '<h3>'+destinationCity+'</h3>'
        + '<p>'+tripType+'</p>'
        + (formattedPrice ? '<h3>'+formattedPrice+'</h3>' : '')
        + '<div class="offer-button">'
        + '<a title="'+title+'">'
        //+ '<button type="button" class="btn btn-block" style="display: block;">TIL LAVPRISKALENDEREN</button>'
        //+ buttonHTML
        + '</a></div>'

        topContent.empty();
        topContent.append(snippet);

        topContent.find('a').click(function(event){personalisationObj.onOfferClick(event,offer);}).append(buttonHTML);
    },

    setReservationView : function(currObj, offer){
        var title = (offer["mediumTitle"] || offer['shortTitle']);
        var arrivalAirport = offer["arrivalAirport"];
        var departureAirport = offer["departureAirport"];
        var dateOfTravel = offer["outboundDateOfTravel"];
        var dateOfTravelString = offer["outboundDateOfTravelString"];
        var returnDateString = offer["homeboundDateOfTravelString"];
        var url = offer["cta"];
        var offerProdType = offer["offerProdType"];
        var destinationCity = offer["destinationCity"];

        var travelDate = new Date(dateOfTravel);
        var topContent = currObj.find(".top-content");
        var bottomContent = currObj.find(".bottom-content");
        var buttonHTML = bottomContent.find('.btn');

        var target = this.getTarget(offerProdType);
        if(!target && currObj.attr("data-newWindow")){
            target = "_blank";
        } else if(!target) {
            target = "_top";
        }

        var snippet = '<h2>'+title+'</h2>'
        //+ '<h4>'+name+'</h4>'

        topContent.empty();
        topContent.append(snippet);

        var temp = '<h4>'+departureAirport +' - '+ arrivalAirport+'</h4>'
                + '<h4>'+dateOfTravelString+'</h4>';

        if(this.getReservationProductTypeFlag(offerProdType)) {
             temp = '<h4>'+destinationCity+'</h4>'
                + '<h4>'+dateOfTravelString+' - '+returnDateString+'</h4>';
        } else {
            if(travelDate < new Date()){
                temp = '<h4>'+arrivalAirport +' - '+ departureAirport+'</h4>'
                + '<h4>'+returnDateString+'</h4>';
            }
        }

        snippet = temp
        + '<div class="offer-button">'
        + '<a href="'+url+'" target="'+target+'" title="'+title+'">'
        //+ '<button type="button" class="btn btn-block" style="display: block;">TIL LAVPRISKALENDEREN</button>'
        //+ buttonHTML
        + '</a></div>';

        if(offerProdType && offerProdType.toLowerCase() == "upgrade") {
            buttonHTML.text(Granite.I18n.get("label-place-bid"));
        }

        bottomContent.empty();
        bottomContent.append(snippet);
        bottomContent.find('a').append(buttonHTML);
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
        var keyValue=Granite.I18n.get(key+keyLower);

     return keyValue;

    },

    translateCity:function(keyMessage){

        var key="city-";
        keyString=keyMessage.trim().replace(/\s+/g, "-");
        var keyLower=keyString.toLowerCase();          
        var keyValue=Granite.I18n.get(key+keyLower);

        return keyValue;

    },

    translateMonth:function(month){

        var keyString="aem.marketing.vacPlanner.month-" + month.toLowerCase() + "-label";
        var keyValue=Granite.I18n.get(keyString);

        return keyValue;
    },
    
    storeOfferInSession: function(key, val){
        var temp = Object.keys(key).map(function(e) {
          return key[e]
        })
        key = temp.sort().join().replace(/([ ,;-])/g,'');
        if(!window.sessionStorage.offers){
            window.sessionStorage.setItem('offers', JSON.stringify({}));
        }
        var offers = JSON.parse(window.sessionStorage.offers);
        offers[key] = val;
        window.sessionStorage.setItem('offers', JSON.stringify(offers));
    },

    getOfferFromSession: function(key){
        if(window.sessionStorage.offers){
            var temp = Object.keys(key).map(function(e) {
              return key[e]
            })
            key = temp.sort().join().replace(/([ ,;-])/g,'');
            return JSON.parse(window.sessionStorage.offers)[key];
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

    clearOfferFromSession: function(){
        window.sessionStorage.setItem('offers', JSON.stringify({}));
    }
};

var personalisationDialogReservationObj = {
    strategyList : ['Cross - Sell Attached Outbound', 'Cross - Sell Attached Homebound', 'Cross - Sell Ancillary Outbound', 'Cross - Sell Ancillary Homebound', 'None'],
    
    productTypeList : {'Cross - Sell Attached Outbound':['Transfer', 'Hotel', 'None'],
    'Cross - Sell Attached Homebound':['Transfer', 'None'],
    'Cross - Sell Ancillary Outbound': ['Upgrade to Plus for Longhaul with Plusgrade', 'Pre order meal', 'Pre-Seat', 'Lounge', 'Upgrade to Business for Longhaul with Plusgrade', 'Upgrade to Plus for Shorthaul with Plusgrade', 'X-Bag', 'None'],
    'Cross - Sell Ancillary Homebound': ['Upgrade to Business for Longhaul with Plusgrade', 'Pre-seat', 'Upgrade to Plus for Longhaul with Plusgrade', 'Upgrade to Plus for Shorthaul with Plusgrade', 'X-Bag', 'Pre order meal', 'Lounge', 'None']},
    
    programLoadEvent : function(comp){ 
        var dlg = comp.findParentByType("dialog");
        var reservationProgramType = dlg.getField("./reservationProgramType");
        var reservationStrategy = dlg.getField("./reservationStrategy");
        var reservationProductType = dlg.getField("./reservationProductType");

        if(reservationProgramType.getValue() == "Sales"){

            reservationStrategy.show();
            var strategies = [];
            this.strategyList.forEach(function(item){
                var strategy = {};
                strategy['text'] = item;
                strategy['value'] = item;
                strategies.push(strategy);
            });

            reservationStrategy.setOptions(strategies);
            reservationStrategy.doLayout();

        } else {
            reservationStrategy.hide();
            reservationStrategy.setValue('');
            reservationProductType.hide();
            reservationProductType.setValue('');
        }
    },

    programChangeEvent : function(comp,val) {
        var dlg = comp.findParentByType("dialog");
        var reservationStrategy = dlg.getField("./reservationStrategy");
        var reservationProductType = dlg.getField("./reservationProductType");

        if(val=="Sales"){
            reservationStrategy.show();
            var strategies = [];
            this.strategyList.forEach(function(item){
                var strategy = {};
                strategy['text'] = item;
                strategy['value'] = item;
                strategies.push(strategy);
            });

            reservationStrategy.setOptions(strategies);
            reservationStrategy.doLayout();
            reservationProductType.hide();
            reservationProductType.setValue('');
            reservationProductType.doLayout();
        }else{
            reservationStrategy.hide();
            reservationStrategy.setValue('');
            reservationProductType.hide();
            reservationProductType.setValue('');
        }
    },

    strategyLoadEvent : function(comp){ 
        var dlg = comp.findParentByType("dialog");
        var reservationStrategy = dlg.getField("./reservationStrategy");
        var reservationProductType = dlg.getField("./reservationProductType");

        if(reservationStrategy.value){

            reservationProductType.show();

            var productTypes = [];
            this.productTypeList[reservationStrategy.value].forEach(function(item){
                var productType = {};
                productType['text'] = item;
                productType['value'] = item;
                productTypes.push(productType);
            });

            reservationProductType.setOptions(productTypes);
            reservationProductType.doLayout();

        } else {
            reservationProductType.hide();
            reservationProductType.setValue('');
        }
    },

    strategyChangeEvent : function(comp,val) {
        var dlg = comp.findParentByType("dialog");
        var reservationProductType = dlg.getField("./reservationProductType");

        if(Object.keys(this.productTypeList).indexOf(val) > -1){
            reservationProductType.show();

            var productTypes = [];
            this.productTypeList[val].forEach(function(item){
                var productType = {};
                productType['text'] = item;
                productType['value'] = item;
                productTypes.push(productType);
            });

            reservationProductType.setValue('');
            reservationProductType.setOptions(productTypes);
            reservationProductType.doLayout();

        } else {
            reservationProductType.hide();
            reservationProductType.setValue('');
        }
    }
};

var personalisationDialogRecipientObj = {
    programTypeList : ['Sales'],

    strategyList : {'Sales' : ['Campaign Types','Always on - Top Destination', 'None'] },
    
    productTypeList : { 'Campaign Types' : ['Fall Leisure Small W.29', 'Happy weekend Micro W.31', 'None'],
                        'Always on - Top Destination' : ['Intercont', 'Europe and Domestic', 'None'] },

    programLoadEvent : function(comp){ 
        var dlg = comp.findParentByType("dialog");
        var programType = dlg.getField("./programType");
        var offerStrategy = dlg.getField("./strategy");
        var productType = dlg.getField("./productType")

        if(this.programTypeList.indexOf(programType.getValue()) >= 0){
            offerStrategy.show();
            var strategies = [];
            this.strategyList[programType.getValue()].forEach(function(item){
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


    programChangeEvent : function(comp,val) {
        var dlg = comp.findParentByType("dialog");
        var offerStrategy = dlg.getField("./strategy");
        var productType = dlg.getField("./productType");

        if(this.programTypeList.indexOf(val) >= 0){
            offerStrategy.show();
            offerStrategy.setValue('');
            productType.hide();
            productType.setValue('');

            var strategies = [];
            this.strategyList[val].forEach(function(item){
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

    strategyLoadEvent : function(comp){ 
        var dlg = comp.findParentByType("dialog");
        var offerStrategy = dlg.getField("./strategy");
        var offerProductType = dlg.getField("./productType");

        if(offerStrategy.value && offerStrategy.value != ""){
            offerProductType.show();
            var productTypes = [];
            this.productTypeList[offerStrategy.value].forEach(function(item){
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

    strategyChangeEvent : function(comp,val) {
        var dlg = comp.findParentByType("dialog");
        var offerProductType = dlg.getField("./productType");

        if(Object.keys(this.productTypeList).indexOf(val) > -1){
            offerProductType.show();

            var productTypes = [];
            this.productTypeList[val].forEach(function(item){
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
};

$(document).on( "userSignedIn", function( event) {
    
    var customerDNAUrl=getApiHost()+"personalizedoffer/customerdna";
    var ssoCookie=getSSOCookie();
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
            jqXHR.setRequestHeader('Authorization', personalisationObj.getOAuthFromSession());
        },
        success: function(data) {
            var pnr=data.upcomingBookingPnr || "";
            var dnaDta=(data.tribe || "")+","+pnr+","+customerId;
            writeCustomerDNACookie(dnaDta);
            personalisationTribesObj.showPage();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // debugger;
            console.log("Personalisation : customer dna : Error fetching data : "+errorThrown+""+textStatus);
        }  
    });
    
});

$( document ).on( "userSignedOut", function( event ) {
    personalisationObj.clearOfferFromSession();
});

/* end of common script */
function _isStorageSupported(storageName) {

	var testKey = 'test';
	var storage = window[storageName];
	try
	{
		storage.setItem(testKey, '1');
		storage.removeItem(testKey);
		return true;
	} 
	catch (error) 
	{
		return false;
	}
}
/***** API Constants ***/

var API_AUTHZ_OAUTH = "authorize/oauth/token";
var API_LOCATION_GEOLOC = "location/getGeolocation";
var API_OFFERS_FLEXPRICER = "offers/flightproducts";
var API_OFFERS_LOWPRICE = "offers/flightproduct/lowestFare";

/***** API Constants ***/

/*********** Start for Oauth *********/

var cmsOuthDeferred = $.Deferred();
var oauthToken;

$(document).ready(function($){
    //var oauthUrl = getApiHost() + API_AUTHZ_OAUTH;
    var oauthUrl = '/bin/sas/d360/getOauthToken';

    function initOAuth(){
/*
		$.ajax({
			url: oauthUrl,
			type: 'POST',
            async: false,
            data: { grant_type: "client_credentials"} ,    
			beforeSend: function (jqXHR, settings) {
				jqXHR.setRequestHeader('Authorization', '############');
				return true;
			},
			success: function(data, textStatus, jqXHR) {
                oauthToken = data.access_token;
                //console.log("token " + oauthToken);
                setTimeout(expireToken, data.expires_in*1000);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error: "+errorThrown);
			},
            complete: function() {
                cmsOuthDeferred.resolve(oauthToken);
    		}             
		});
*/
		cmsOuthDeferred.resolve(oauthToken);
       /* $.ajax({
			url: oauthUrl,
			type: 'POST',
            async: false,
            success: function(data, textStatus, jqXHR) {
               oauthToken = data.access_token;
                //console.log("token " + oauthToken);
                setTimeout(expireToken, data.expires_in*1000);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error: "+errorThrown);
			} ,
            complete: function() {
                cmsOuthDeferred.resolve(oauthToken);
    		}             
		});*/
	}

    // TODO: Check why this global level beforeSend is not working
    // AJAX setup for API calls
	/*
    $.ajaxSetup({
        url: getApiHost(),
        beforeSend: function (jqXHR, settings) {
            //console.log("API call : token : " + oauthToken);
            if(oauthToken == null) {
                init();
            }    
            jqXHR.setRequestHeader('Authorization', oauthToken);
            return true;
        }
    });*/

    
    // AJAX setup for Humany calls
    /*
    $.ajaxSetup({
        url: "https://sas.humany.net",
        beforeSend: function (jqXHR, settings) {
            jqXHR.setRequestHeader('Access-Control-Request-Headers', null);
            return true;
        }
    });
    */

    function expireToken() {
		oauthToken = null;
        initOAuth();
    }    

	initOAuth();

});
/*********** End for Oauth *********/
/****************************** Start of Cookie Notification  **********************************/
//$(document).ready(function($) {
  var date, expires;
//$( document ).on( "loadCMS", function( event ) {
function loadCookieNotification(){

        

    function initCookieNotification() {
		var ack_cookie = getAckCookie();
        //alert(ack_cookie);
        if(ack_cookie == null){
            $('.cookies-bar').show();
            $('.cookies-bar .wrapper .btn').on('click', acknowledgeCookie);

        } 
       	else{

			$('.cookies-bar').hide();
        } 
        $('.cookies-bar.authorMode').show();		// To be shown in author mode at all times----in this case the accept button wont work


        $('.cookies-bar.authorMode .wrapper .btn').on('click', function(event){
            
            $('.cookies-bar').hide();
            
        });



    }

	function acknowledgeCookie() {
       // $('.cookies-bar').css("display", "none").toggle();
        $('.cookies-bar').hide();
        writeAckCookie();
		date = new Date();
        date.setTime(date.getTime() + (3600 * 1000 * 24 * 365));
        expires = '; expires=' + date.toUTCString();
        document.cookie = '_cookie=acknowledged' + expires + ';' + 'path=/';

    }

    initCookieNotification();
 };


$(document).ready(function(){

	loadCookieNotification();


});
/****************************** End of Cookie Notification  **********************************/
/****************************** Start of Cookie  **********************************/
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

/** Setters **/

function writeCookie(cookieName, cookieValue, cookiePersistence){

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
}    

function writeLanguageCookie(languageCode) {
    var isEditMode = false;
	var authoringMode = get_cookie('cq-authoring-mode');
	if(authoringMode == 'CLASSIC') {
		if(!(typeof CQ === "undefined")) {
			if(!(typeof CQ.WCM === "undefined")) {
				if (CQ.WCM.isEditMode(true) || CQ.WCM.isDesignMode(true)){
					isEditMode = true;
				}
			}
		}
	} else if(authoringMode == 'TOUCH') {
		if(get_cookie('wcmmode') == "edit") {
			isEditMode = true;
		}
	}
    if(isEditMode) {
		document.cookie =
					  COOKIE_LANGUAGE_CODE + "=" + encodeURIComponent(languageCode) +
					  "; max-age=" + COOKIE_USER_PERSISTENCE +
					  "; path=/" ;
			
			writeCookie(COOKIE_LANGUAGE_CODE, languageCode, COOKIE_USER_PERSISTENCE);
	}
}

function writeCountryCookie(countryCode){
    var isEditMode = false;
	var authoringMode = get_cookie('cq-authoring-mode');
	if(authoringMode == 'CLASSIC') {
		if(!(typeof CQ === "undefined")) {
			if(!(typeof CQ.WCM === "undefined")) {
				if (CQ.WCM.isEditMode(true) || CQ.WCM.isDesignMode(true)){
					isEditMode = true;
				}
			}
		}
	} else if(authoringMode == 'TOUCH') {
		if(get_cookie('wcmmode') == "edit") {
			isEditMode = true;
		}
	}
    if(isEditMode) {
		writeCookie(COOKIE_COUNTRY_CODE, countryCode, COOKIE_USER_PERSISTENCE);
	}
}

function writeOriginCookie(originCode){
    writeCookie(COOKIE_ORIGIN_CODE, originCode, COOKIE_USER_PERSISTENCE);
}

function saveInfoCookie(){
        writeCookie(COOKIE_INFO_CODE, "acknowledged", COOKIE_SESSION_PERSISTENCE);
}

function writeAckCookie(){
    writeCookie(COOKIE_ACK_CODE, "acknowledged", COOKIE_USER_PERSISTENCE);
}

function writeDarkSiteCookie(){
    writeCookie(COOKIE_DARK_SITE, "acknowledged", COOKIE_SESSION_PERSISTENCE);
}

function writeCustomerDNACookie(customerDNA){
	writeCookie(COOKIE_CUSTOMER_DNA, customerDNA, COOKIE_USER_PERSISTENCE);
}
/*
function writeOAuthCookie(oauthToken){
	writeCookie(COOKIE_OAUTH_TOKEN, oauthToken, COOKIE_USER_PERSISTENCE);
}
*/
/** Getters **/

function getCountryCookie() {
    var cookie_string = get_cookie(COOKIE_COUNTRY_CODE);
    return cookie_string;
}

function getLanguageCookie() {
    var cookie_string = get_cookie(COOKIE_LANGUAGE_CODE);
    return cookie_string;
}

function getOriginCookie() {
    var cookie_string = get_cookie(COOKIE_ORIGIN_CODE);
    
	// Added for backward compat: because user may disallow cookie
    if(cookie_string == null) {
		cookie_string = $(".countryName").attr("data-org-code");	
    }

    return cookie_string;
}
function getInfoCookie() {
    var cookie_string = get_cookie(COOKIE_INFO_CODE);
    return cookie_string;
}

function getAckCookie() {
    var cookie_string = get_cookie(COOKIE_ACK_CODE);
    return cookie_string;
}

function getSSOCookie() {
    var cookie_string = get_cookie(COOKIE_SSO_CODE);
    return cookie_string;
}

function getDarkSiteCookie() {
	var cookie_string = get_cookie(COOKIE_DARK_SITE);
    //alert(cookie_string);
    return cookie_string;
}

function getOAuthCookie(){
	var cookie_string = get_cookie(COOKIE_OAUTH_TOKEN);
    return cookie_string;
}

function getProfileCookie() {
    var cookie_string = get_cookie(COOKIE_PROFILE_ID);
    return cookie_string;
}

function  getCustomerDNACookie(){
	var cookie_string = get_cookie(COOKIE_CUSTOMER_DNA);
    return cookie_string; 
}

function get_cookie ( cookie_name ){
        var re = new RegExp(cookie_name + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
}
/****************************** End of Cookie  **********************************/

var defaultOriginCode = null;
var defaultCountryCode = getCountryCode();

if(defaultCountryCode == null || defaultCountryCode == "" || defaultCountryCode == undefined) {
	var newURL = window.location.host;
	var countryarry = window.location.pathname.split('/');
	var lowerEnvironment = countryarry[1];
	
	switch(true) {
		case newURL.indexOf("sas.no") > -1 || lowerEnvironment.indexOf("no-") > -1 || countryarry[2] === "flysas-no":
			defaultOriginCode = 'OSL';
			break;
		case newURL.indexOf("sas.dk") > -1 || lowerEnvironment.indexOf("dk-") > -1 || countryarry[2] === "flysas-dk":
			defaultOriginCode = 'CPH';
			break;
		case newURL.indexOf("sas.se") > -1 || lowerEnvironment.indexOf("se-") > -1 || countryarry[2] === "flysas-se":
			defaultOriginCode = 'ARN';
			break;
		case newURL.indexOf("sas.fi") > -1 || lowerEnvironment.indexOf("fi-") > -1 || countryarry[2] === "flysas-fi":
			defaultOriginCode = 'HEL';
			break;
	}
} else {
	switch(defaultCountryCode) {
		case "NO":
			defaultOriginCode = 'OSL';
			break;
		case "DK":
			defaultOriginCode = 'CPH';
			break;
		case "SE":
			defaultOriginCode = 'ARN';
			break;
		case "FI":
			defaultOriginCode = 'HEL';
			break;
	}
}
/*** Start of AEM main JS ***/
var cmsSitesDeferred = $.Deferred();
var siteOrigins;
Granite.I18n.setLocale(getLocale());

var initialAEMLoad = true;

/*$(document).ajaxStop(function() {
    // this will be called when all running AJAX calls have completed
    console.log("all ajax calls done");
    setTimeout(function(){
    if (initialAEMLoad) { */ 
                //$(document).trigger("loadCMS"); Commented for CMS-484
       /* initialAEMLoad = false;
            }
    }, 3000); 
}); */

//$(document).ready(function($) {
    //$( document ).on( "loadCMS", function( event ) {      

    //global variables
    //var countryDetails = "";
    window.isMenuOpen = false;
    window.isCountrySelector = false;
    window.isLoginOpen = false;
    var selectedOriginValue, // Origin city name selected in market selector
        selectedLanguageValue, // Language name selected in market selector
        selectedCountryValue, // Country name selected in market selector
        selectedOriginCode, // Origin code selected in market selector
        selectedCountryCode, // Country Code selected in market selector
        selectedLanguageCode, // LanguageCode selected in market selector
        currentOriginCode, // OriginCode applicable upon page load
        currentLanguageCode, // LanguageCode applicable upon page load
        currentCountryCode, // CountryCode applicable upon page load
        countryImage, // Country flag applicable on page load 
        selectedHomePath; // Added by AEM: Home path corresponding to language selected in market selector

    function initMain() {



        //checkForLogin();
        getCountryData();

        // Trigger loading of relevant CMS widgets on document.ready
        //$( document).trigger( "loadCMS" );

        // Trigger loading of relevant CMS widgets on AJAX load of CMS fragment
        $(document).ajaxComplete(function(event, xhr, settings) {

            // Evaluate url pattern, needs to be towards CMS content page
            var ajaxUrl = "";
            if(settings != undefined && settings != 'undefined'){
            	settings.url;
            }
            /*if ( ajaxUrl.indexOf(".content.") > -1 ) {
            	//console.log("trigerring ajax complete");
                $( document).trigger( "loadCMS" );	
            }*/
        });
    }
	registerEvents();// calling register events 
    function getCountryData() {
        var countryUrl = "/bin/sas/getCountryInfo." + getLanguageCode() + ".do"; /* ?lc=" + getLanguageCode(); */
		 
        //$.getJSON(countryUrl, function(data) {
            //console.log("Country Details : ", data);
           // countryDetails = data;
			 
			cmsSitesDeferred.resolve([countryDetails, getCountryCookie()]);  //getting country details data
			//registerEvents();
            checkCache();
            checkForMobileVersion();
			$("#countryLogo").removeClass('display-none');   //to remove class display-none
            // These are written into localstorage as Tx-UI will be referring to these
            setCache();
			if(window.isCms || window.isExplore){
				$(document).trigger("loadCMS");	//Added for CMS-484
			}

            // Fire this to load the campaigns on homepage
            //$(document).trigger( "originChange", [ selectedOriginCode ] );

            // Trigger loading of relevant CMS widgets on document.ready (only for CMS owned pages)
            /* if (window.isCms) { 
                $(document).trigger("loadCMS");
            } */
        //});  
    }

    function checkCache() {
        // These are being fetched from a AEM defined script in customfooterlibs.html
        selectedCountryCode = getCountryCode();
        currentCountryCode = getCountryCode();
        currentLanguageCode = getLanguageCode();
        var originCodeFromCookie = getOriginCookie();

        for (var i in countryDetails.sites) {
            if (countryDetails.sites[i].countryCode == currentCountryCode) {

                // Evaluate dark site redirection
                var darkSiteAck = getDarkSiteCookie();
                if (countryDetails.sites[i].darkSiteActive === true && darkSiteAck == null && window.isCms == undefined) {
                    //console.log("inside darkSite");
                    window.location.href = "/crisis/";
                    return;
                }


                // Set country flag image on the header
                countryImage = countryDetails.sites[i].imagePath;
                $("#countrySelect img").attr('src', countryImage);
                                $("#countrySelect img").css('display','inline-block');


                // Evaluate applicable origin
                var originIndex = -1;

                siteOrigins = countryDetails.sites[i].origins;

                // 1st - by cookie
                if (originCodeFromCookie != null) {
                    for (var k = 0; k < countryDetails.sites[i].origins.length; k++) {
                        if (originCodeFromCookie == countryDetails.sites[i].origins[k].airportCode) {
                            originIndex = k;
                            break;
                        }
                    }
                }

                // 2nd - by geoloc
                if (originIndex == -1 && window.nearestAirportIata != undefined) {
                    for (var k = 0; k < countryDetails.sites[i].origins.length; k++) {
                        if (window.nearestAirportIata == countryDetails.sites[i].origins[k].airportCode) {
                            originIndex = k;
                            break;
                        }
                    }
                }

                // 3rd - the first in the configured origins
                if (originIndex == -1) {
                    originIndex = 0;
                }


                currentOriginCode = countryDetails.sites[i].origins[originIndex].airportCode;

                // Set origin city name in header
                $(".countryName").text(countryDetails.sites[i].origins[originIndex].cityName);
                $(".countryName").attr("data-org-code", currentOriginCode);

                // Make Language and Origin dropdowns and Apply Changes button visible
                $(".languagePart").css("display", "block");

                populateLanguagesAndOrigins();
            }
        }

    }

    /*
    Not applicable in AEM
    */
    /*
    function getCache(){
    	currentOriginCode=localStorage.orginCode;
    	currentLanguageCode=localStorage.languageCode;
    	currentCountryCode=localStorage.countryCode;
    	selectedCountryName=localStorage.currentCountryName;
    	selectedLanguageName=localStorage.currentLanguageName;
    	countryImage = localStorage.currentFlag;
    	selectedCountry	= localStorage.selectedCountry;
    }
    */

    function setCache() {

        currentOriginCode = selectedOriginCode;

        /** Added for setting Cookie ***/
        writeCountryCookie(selectedCountryCode);
        writeLanguageCookie(selectedLanguageCode);
        //writeOriginCookie(selectedOriginCode);
		if(getOriginCookie() == null || getOriginCookie == ""){
            if(getCountryCookie()=="no"){
                writeOriginCookie('OSL');
            }
	        else if(getCountryCookie()=="dk"){
               writeOriginCookie('CPH');
            }
            else if(getCountryCookie()=="se"){
               writeOriginCookie('ARN');
            }
        }

        var storageSupport = _isStorageSupported('localStorage');
        if (storageSupport) {
            localStorage.countryCode = selectedCountryCode;
            localStorage.languageCode = selectedLanguageCode;
            localStorage.orginCode = selectedOriginCode;
        }

        //console.log(localStorage);
        //console.log("Country code  : ", selectedCountryCode);
        //console.log("Language code  : ", selectedLanguageCode);
        //console.log("Origin code : ", selectedOriginCode);

        $(".countryName").attr("data-org-code", selectedOriginCode);

    }

    function registerEvents() {
        $(".hamburger").on("click", showHamburger);
        $(".country").on("click", showCountrySelector);
        $('.mobileCountry').hide();
        $('.languagePart,#dropdownMobileCountry,.mobileLanguagePart').hide();
        $(document).on('click', '.countryNames', countryHandler);
        $(document).on('click', '.applychanges', applyChanges);
        //$(document).on('click', '.languagePartDropdown', bindSelectedValues);
        $(document).on('click', '.dropdownLanguage li', selectLanguageOptionValue);
        $(document).on('click', '.preferedOrgin li', selectOriginOptionValue);
        $(document).on('click', hideOpenedContentDesktop);

        $(document).on('click', '#dropdownLanguage', bindSelectedValuesLanguage);
        $(document).on('click', '#preferedOrgin', bindSelectedValuesOrigin);
        $(document).on('keydown', '#dropdownLanguage', bindkeydownSelectedValuesLanguage);
        $(document).on('keydown', '#preferedOrgin', bindkeydownSelectedValuesOrigin);
        $(document).on('keydown', '.dropdownLanguage li', selectKeydownLanguageOptionValue);
        $(document).on('keydown', '.preferedOrgin li', selectKeydownOriginOptionValue);


    }
	/************Code added for Accessibility*******************/	
	/****Start****/
    $("#maincontent, #skipmaincontent").on("keydown", function(e) {
        if ((e.which === 13 || e.keyCode === 13)) {
            showHamburger(e);
            setTimeout(function() {
                $("#searchTextBase").focus();
            }, 300);
        }
    });
    $("#countryselector, #skipcountryselect").on("keydown", function(e) {
        if ((e.which === 13 || e.keyCode === 13)) {
            showCountrySelector(e);
            $("#dropdownLanguage").attr("tabindex", 0);
            $("#preferedOrgin").attr("tabindex", 0);
            $("#countryList").find(".country-holder:first-child").find("ul:first-child").find("li:first-child").attr("tabindex", 0);
            setTimeout(function() {
               // $("#countryList").find(".country-holder:first-child").find("ul:first-child").find("li:first-child a").focus();
                $('.countryPart .countryTitle').focus();
            }, 300);
        }
    });
	
	//Added for accessibility (AC-268 and AC-269)
	$('.countryMenu').on('keydown',function(e){
		 if ((e.which === 27 || e.keyCode === 27)) {
             $('#countryselector').focus();
         }
	});
	$('.sitemapMenu').on('keydown',function(e){
		 if ((e.which === 27 || e.keyCode === 27)) {
             $('#maincontent').focus();
         }
	});
	
	
	$(".skipmaincontent").on("click", function(e) {
	showHamburger(e);
	setTimeout(function() {
		$("#searchTextBase").focus();
	}, 300);
	});

	$(".skipcountryselect").on("click", function(e) {
	showCountrySelector(e);
	$("#dropdownLanguage").attr("tabindex", 0);
	$("#preferedOrgin").attr("tabindex", 0);
	$("#countryList").find(".country-holder:first-child").find("ul:first-child").find("li:first-child").attr("tabindex", 0);
	setTimeout(function() {
		//$("#countryList").find(".country-holder:first-child").find("ul:first-child").find("li:first-child a").focus();
         $('.countryPart .countryTitle').focus();
	}, 300);

	});

$("#dropdownLanguage").on("keydown", function(e) {
        if ((e.which === 13 || e.keyCode === 13)) {

            $(".dropdownLanguage").find("li").attr("tabindex", 0);
            setTimeout(function() {
                $(".dropdownLanguage").find("li:first-child").focus();
            }, 300);
        }
    });
$("#preferedOrgin").on("keydown", function(e) {
        if ((e.which === 13 || e.keyCode === 13)) {

            $(".preferedOrgin").find("li").attr("tabindex", 0);
            setTimeout(function() {
                $(".preferedOrgin").find("li:first-child").focus();
            }, 300);
        }
    });
 $('.menuTilteList').on("keydown", function(e) {
        if ((e.which === 27 || e.keyCode === 27)) {
             $(".hamburger").attr("tabindex", 0);
            setTimeout(function() {
                $(".hamburger").focus();
            }, 300);
        }
    });


	/****End*****/
	
    /*********function for showing Hamburger********/
    function showHamburger(e) {
        checkForLogin();
        window.isMenuOpen = !window.isMenuOpen;
        //closeSearchHandler();
        if (window.isCountrySelector) {
            window.isCountrySelector = !window.isCountrySelector;
            slideMenus($(".countryMenu"), 0, e);
            slideMenus($(".sitemapMenu"), 200, e);
        } else {
            slideMenus($(".sitemapMenu"), 0, e);

            if ($(window).width() <= 767) {
                checkCache();
                $('.countryLaungage,.countryOrgin,.applychanges,.mobileCountryLanguage,.mobileLanguagePart').hide();
                $(".countryMobile").show();
            }
        }
        setMenuStatus();
    }

    function checkForLogin() {
        if (window.isLoginOpen) {
            window.isLoginOpen = !window.isLoginOpen;
            // $( ".LoginView" ).slideToggle(200);
            $("#LoginViewCont").slideToggle(200);
            // $(".profileDashWrap").hide();
        }
        /*
		if(angular.element("div.navbar div").hasClass("header-menu-active"))
		{
			className = angular.element("div.header-menu-active").attr('class').split(' ')[0];					
			switch(className)
			{
				case "navbar-login" : slideMenus($(".profileDashWrap"), 0);
				window.isCountrySelector = false;
				window.isMenuOpen = false;
				break;
			}
		}*/
    }


    /*********function for showing country********/
    function showCountrySelector(e) {
        checkForLogin();
        window.isCountrySelector = !window.isCountrySelector;
        if (window.isMenuOpen) {
            window.isMenuOpen = !window.isMenuOpen;
            slideMenus($(".sitemapMenu"), 0, e);
            slideMenus($(".countryMenu"), 200, e);
        } else {
            checkCache();
            slideMenus($(".countryMenu"), 0, e);
        }
        populateCountries();
        setMenuStatus();
    }

    /***** For loop for displaying country list *****/
    function populateCountries() {
        $("#countryList").html('');
        for (var i = 0; i < countryDetails.sites.length; i++) {
            $("#countryList").append('<div class="country-holder col-lg-4 col-md-4 col-sm-6">' +
                '<ul class="subMenu">' +
                '<li class="' + countryDetails.sites[i].countryCode + '">' +
                '<a href="javascript:" class="countryNames">' +
                '<span class="flag"><img class="countryImg" src="' + countryDetails.sites[i].imagePath + '"></span>' +
                '<span data-country-code="' + countryDetails.sites[i].countryCode + '" class="currentCountry" >' + countryDetails.sites[i].countryName + '</span>' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '</div>');
        }

        /***** highlight the selcted country *******/

        if (currentCountryCode !== '' && currentCountryCode !== undefined) {
            $('.' + currentCountryCode).parent().addClass('highlightedBgcolor tickSymbol');
            $('.' + currentCountryCode).find('.subMenu').find('.countryNames').attr('aria-label', 'selected');
        }
    }


    function slideMenus(el, delayTime, event) {
        $(el).stop().delay(delayTime).slideToggle(200);
        $(".arrow-up").hide();
        $(event.target).removeClass("header-menu-active");
    }

    /*********function to set menustatus is active   ********/
    function setMenuStatus() {
        if (window.isMenuOpen) {
            addActiveClass($(".hamburger"), "header-menu-active", true);
            addActiveClass($(".country"), "header-menu-active", false);
            $(".hamburger").children('span').show();
            $('.country').children('span').hide();
        }
        if (window.isCountrySelector) {
            addActiveClass($(".hamburger"), "header-menu-active", false);
            addActiveClass($(".country"), "header-menu-active", true);
            $('.country').children('span').show();
            $(".hamburger ").children('span').hide();
        }
        if (!window.isMenuOpen && !window.isCountrySelector) {
            $('.country').children('span').hide();
            $(".hamburger ").children('span').hide();
        }
    }

    function addActiveClass(element, className, isVal) {
        if (isVal) {
            element.addClass(className);
        } else {
            element.removeClass(className);
        }
    }

    /******************** Country Selection **************************/

    function countryHandler(event) {
        var el = $(event.currentTarget);
        chooseCountry(el);
    }

    function chooseCountry(el) {
        // Show language and origin dropdown and apply changes button if not already displayed
        $('.languagePart').show();

        // Get the selected country's country code
        selectedCountryCode = $(el).find(".currentCountry").attr('data-country-code');

        $('#countryList').find('.subMenu').removeClass('highlightedBgcolor tickSymbol');
        $(el).closest(".subMenu").addClass('highlightedBgcolor tickSymbol');
        $('#countryList').find('.subMenu').find('.countryNames').removeAttr('aria-label');
		//Added for accessibility
        var selectCon = $(el).closest(".subMenu").find('.currentCountry').html();
        $(el).closest(".subMenu").find('.countryNames').attr('aria-label', selectCon+' selected');
        setTimeout(function(){$("#dropdownLanguage").focus();},150);

        populateLanguagesAndOrigins();
    }

    /**********empty the dropdown value when country changes************/
    function dropdownEmpty() {
        $('.languageValue,.originValue').val("");
    }

    function populateLanguagesAndOrigins() {
        //console.log("SelectedCountryCode : ", selectedCountryCode);

        dropdownEmpty();

        for (var i = 0; i < countryDetails.sites.length; i++) {
            if (countryDetails.sites[i].countryCode == selectedCountryCode) {
                countryImage = countryDetails.sites[i].imagePath;
                selectedCountryValue = countryDetails.sites[i].countryName;

                /*** bind Languages ***/
                $(".dropdownLanguage").html('');
                selectedLanguageCode = '';
                for (var j = 0; j < countryDetails.sites[i].languages.length; j++) {
                    $(".dropdownLanguage").append('<li data-value="' + countryDetails.sites[i].languages[j].languageCode + '" data-home-path="' + countryDetails.sites[i].languages[j].homePath + '">' + countryDetails.sites[i].languages[j].language + '</li>');

                    if (currentLanguageCode == countryDetails.sites[i].languages[j].languageCode) {
                        selectedLanguageCode = countryDetails.sites[i].languages[j].languageCode;
                        selectedLanguageValue = countryDetails.sites[i].languages[j].language;
                        selectedHomePath = countryDetails.sites[i].languages[j].homePath;

                        $("header .navbar div.navbar-brand a").attr("href", countryDetails.sites[i].languages[j].homePath);
                    }
                }
                /*** bind Origins ***/
                $(".preferedOrgin").html('');
                selectedOriginCode = '';
                for (var k = 0; k < countryDetails.sites[i].origins.length; k++) {
                    $(".preferedOrgin").append('<li data-value="' + countryDetails.sites[i].origins[k].airportCode + '">' +
                        countryDetails.sites[i].origins[k].cityName + '</li>');

                    if (currentOriginCode == countryDetails.sites[i].origins[k].airportCode) {
                        selectedOriginCode = countryDetails.sites[i].origins[k].airportCode;
                        selectedOriginValue = countryDetails.sites[i].origins[k].cityName;
                    }
                }
            }
        }
        bindValues();
    }


    /************bind the first value of Language and Origin from Json ************/
    function bindValues() {
        if (selectedLanguageCode == '') {
            selectedLanguageValue = $(".dropdownLanguage li:first-child").text();
            selectedLanguageCode = $('.dropdownLanguage li:first-child').data('value');
            selectedHomePath = $('.dropdownLanguage li:first-child').data('home-path');
        }
        $('.languageValue').text(selectedLanguageValue);

        if (selectedOriginCode == '') {
            selectedOriginValue = $(".preferedOrgin li:first-child").text();
            selectedOriginCode = $('.preferedOrgin li:first-child').data('value');
        }
        $(".originValue").text(selectedOriginValue);
    }

    /*****************show the dropdown option when the Language and origin dropdown is clicked****************/
    /*
    function bindSelectedValues(event) {
    	var target= $(event.currentTarget).attr('id');
    	
    	alert('Clicked on ' + id);
    	
    	if(target === "dropdownLanguage"){
    		event.stopPropagation();
    		$('.dropdownLanguage').toggle();
    		$('.preferedOrgin,.dropdownMobileCountry').hide();
    	}
    	else if (target === "preferedOrgin"){
    		event.stopPropagation();
    		$('.preferedOrgin').toggle();
    		$('.dropdownLanguage,.dropdownMobileCountry').hide();	
    	}
    	
    }*/
    function bindSelectedValuesLanguage(event) {
        event.stopPropagation();
        $('.dropdownLanguage').toggle();
        $('.preferedOrgin,.dropdownMobileCountry').hide();
    }

    function bindSelectedValuesOrigin(event) {
        event.stopPropagation();
        $('.preferedOrgin').toggle();
        $('.dropdownLanguage,.dropdownMobileCountry').hide();
    }

    /****When document is click outside to close the opened content*******/
    function hideOpenedContentDesktop() {
        $('.dropdownLanguage,.preferedOrgin,.dropdownMobileCountry').hide();
    }

    /********function to select the language from dropdown*********/
    function selectLanguageOptionValue(event) {
        isLangDropdownSelect = true;
        selectedLanguageValue = $(event.currentTarget).text();
        $('.languageValue').text(selectedLanguageValue);
        selectedLanguageCode = $(this).data('value');
        selectedHomePath = $(this).data('home-path');
    }
    /********Accessibility for  language slect dropdown*********/

   function bindkeydownSelectedValuesLanguage(event) {
        if(event.which == 13){
            event.stopPropagation();
            $('.dropdownLanguage').toggle();
            $('.dropdownLanguage li').attr('tabindex', 0);
            $('.dropdownLanguage li').attr('role', 'menuitem');
    
            setTimeout(function(){ $('.dropdownLanguage li:first-child').focus();},100);
            $('.preferedOrgin').hide();
        }
    } 

    function selectKeydownLanguageOptionValue(event){
        if ((event.which === 13 || event.keyCode === 13)) {
            selectLanguageOptionValue(event);
            var sellangvalue = $(event.currentTarget).text();
            $('#dropdownLanguage').attr('aria-label', 'You have selected '+sellangvalue+' as your preferred language'); 
            setTimeout(function(){$('#dropdownLanguage').focus();},50);
        }
        if(event.which == 40){
            $(this).next().focus();
            return false;
        } else if(event.which == 38){
            $(this).prev().focus();
            return false;
        } 
    }

    /********function to select the origin from dropdown*********/
    function selectOriginOptionValue(event) {
        isOriginDropdownSelect = true;
        selectedOriginValue = $(event.currentTarget).text();
        $('.originValue').text(selectedOriginValue);
        selectedOriginCode = $(this).data('value');
    }

/********Accessibility for  origin select dropdown*********/
    function bindkeydownSelectedValuesOrigin(event) {
        if(event.which == 13){
            event.stopPropagation();
            $('.preferedOrgin').toggle();
            $('.preferedOrgin li').attr('tabindex', 0);
            $('.preferedOrgin li').attr('role', 'menuitem');
    
            setTimeout(function(){ $('.preferedOrgin li:first-child').focus();},100);
            $('.dropdownLanguage').hide();
        }
    }
    function selectKeydownOriginOptionValue(event){
        if ((event.which === 13 || event.keyCode === 13)) {
            selectOriginOptionValue(event);
            var selorgvalue = $(event.currentTarget).text();
            $('#preferedOrgin').attr('aria-label', 'You have selected '+selorgvalue+' as your preferred language'); 
            setTimeout(function(){$('#preferedOrgin').focus();},50);
        }
        if(event.which == 40){
            $(this).next().focus();
            return false;
        } else if(event.which == 38){
            $(this).prev().focus();
            return false;
        } 
    }


    /*********function for Apply Changes btn********/
    function applyChanges(e) {
		
        setCache();
		onPageLoad = true;
		
		
        //if (selectedOriginCode != currentOriginCode) {
            //console.log('Origin changed');
            $(document).trigger("originChange", [selectedOriginCode]);
        //}


        if (currentCountryCode !== selectedCountryCode || currentLanguageCode !== selectedLanguageCode) {
            var url = selectedHomePath;
            if (getSSOCookie() != null) {
                url = "/bin/sso/redirect?redirectUrl=" + encodeURIComponent(selectedHomePath);
            }
            window.location.href = url;
        } else {
            $(".countryName").text(selectedOriginValue);
            //$("#dropdownMobileCountry .flag").find("img").attr('src', countryImage);							
        }

        window.isCountrySelector = false;
        if ($(window).width() <= 767) {
            $('.languagePart,.mobileCountryLanguage').slideUp();
            $('.countryMobile').show();
        }

        slideMenus($(".countryMenu"), 0, e);
        $(".country").removeClass("header-menu-active");
        $(".country").children('span').hide();
    }

    /******************************************************* Mobile View ************************************/

    function checkForMobileVersion() {
        if ($(window).width() <= 767) {
            checkCache();
            showMobileVersion();
            registerMobileEvents();
        }
    }

    function showMobileVersion() {

        $(".countryTitle").hide();
        $('.mobileLanguagePart,.menuTilteList .titleDescription,.menuTilteList .subMenu,.country,.mobileCountryLanguage').hide();

        $('.menuTilteList .title').not('.mobileCountryLanguage .title').addClass('icon-right-open');
        $('.menuTilteList .countryMobile a').addClass('icon-right-open').removeClass('highlightedBgcolor');
        $('.menuTilteList .mobileCountryLanguage .title').removeClass('icon-right-open');

        $('.mobileCountry,#dropdownMobileCountry').show();
        $("#countrySelect").find(".flag img").attr('src', countryImage);
        $('#dropdownMobileCountry').on('click', showCountryOption);
        $('.mobileCountryLanguage').on('click', hideDropdownOpened);
        $(document).on('click', hideOpenedContentMobile);
    }

    function closeMobileMenus() {
        $(".menuItems .menuTilteList").removeClass('isOpen')
        $(".menuItems .menuTilteList").children('ul').stop().slideUp();
        $(".menuItems .menuTilteList").find('.title').parent().removeClass('highlightedBgcolor');
        $(".menuItems .menuTilteList").find('.title').not('.mobileCountryLanguage .title').removeClass('icon-down').addClass('icon-right-open');
    }

    function hideDropdownOpened() {
        $('.languagePart,.mobileCountryLanguage').slideUp();
        $('.countryMobile').slideDown();
        closeMobileMenus();
    }

    function registerMobileEvents() {

        $('.menuTilteList').click(function() {
            event.stopPropagation();
            if (!$(this).hasClass('mobileCountry') || $('.mobileCountryLanguage').hasClass('highlightedBgcolor')) {

                if ($(this).hasClass('isOpen')) {
                    closeMobileMenus();

                } else {
                    closeMobileMenus();
                    $(this).addClass("isOpen");
                    $(this).find('.title').parent().addClass('highlightedBgcolor');
                    $(this).find('.title').removeClass('icon-right-open').addClass('icon-down');
                    $(this).children('ul').stop().slideDown();
                    $('.countryMobile').show();
                    $('.languagePart,.mobileCountryLanguage').hide();
                }

            }

        });


        /*********function to show the Country,Language and Origin dropdown with binded value*************/

        $('.countryMobile').click(function() {
            checkCache();
            closeMobileMenus();
            event.stopPropagation();
            $('.countryMenu').css("display", "block !important");
            $('.countryMobile').hide();
            $('.mobileCountryLanguage,.mobileLanguagePart,.countryLaungage,.countryOrgin,.applychanges,.languagePart').show();
            if ($(".countryMenu").css('display', 'none') == true) {
                $(".countryMenu").css('display', 'block');
            }
            var countryList = countryDetails.sites;
            $.each(countryList, function(key, value) {
                $('.dropdownMobileCountry').append($('<li data-country-code="' + value.countryCode + '" >' + '<img src="' + value.imagePath + '"/>' + '<span>' + value.countryName + ' </li>'));

                if (value.countryCode == currentCountryCode) {
                    selectedCountryCode = value.countryCode;
                    selectedCountryValue = value.countryName;
                    countryImage = value.imagePath;
                }
            });
            $('.mobileCountryValue').text(selectedCountryValue);
            $("#dropdownMobileCountry .flag").find("img").attr('src', countryImage);

            populateLanguagesAndOrigins();
            /*
            if(localStorage.languageCode !== undefined &&  localStorage.languageCode !== ""){
            	$('.languageValue').text(selectedLanguageName);
            }
            if(localStorage.orginCode !== undefined && localStorage.orginCode !== ""){
            	$('.originValue').text(selectedCountryName);
            }
            if(localStorage.currentFlag !== undefined && localStorage.currentFlag !== ""){
            	$("#dropdownMobileCountry .flag").find("img").attr('src',countryImage);
            }
            */

            slideMenus($(".countryMenu"), 0);
        });

    }

    function showCountryOption() {
        event.stopPropagation();
        $('.dropdownMobileCountry').toggle();
        $('.preferedOrgin,.dropdownLanguage').hide();
        $('.dropdownMobileCountry li').on('click', selectCountryOptionValue);
    }
    // populate countries in the mobile view

    function selectCountryOptionValue() {
        selectedCountryValue = $(this).text();
        $('.mobileCountryValue').text(selectedCountryValue);
        countryImage = $(this).find("img").attr("src");
        $("#dropdownMobileCountry .flag").find("img").attr('src', countryImage);
        selectedCountryCode = $(this).data('country-code');
        populateLanguagesAndOrigins();
        /*
        if(currentLanguageCode !== "" && currentLanguageCode !== undefined){
        	$(".languagePart").css("display", "block");
        }
        */
    }
	function hideOpenedContentMobile() {	
		$('.languagePart,.mobileCountryLanguage').slideUp(); 
		$('.countryMobile').show();
        closeMobileMenus();
    }

    //init();
	
	
	//if(countryCalled){
		initMain();
	//}
	
	$(document).on('countryLoaded', function(e, opts) {
        /*if(countryDetails !== null){  //To call the init function only once d country details got fetched
			initMain();
        }*/
	});
	


//}); 
/************************SSO Logout CMS-474***********************/

var host=window.location.host; //Added by AEM for logout in SSO

$( document ).on( "userSignedOut", function( event ) {
     switch (host) {
    case 'd360t.flysas.com':
        logOut("https://wwt.sas.se/");
		logOut("https://wwt.sas.dk/");
		logOut("https://wwt.sas.no/");
        break;
    case 'd360u.flysas.com':
        logOut("https://wwt.sas.se/");
		logOut("https://wwt.sas.dk/");
		logOut("https://wwt.sas.no/");
        break;
    case 'www.sas.dk':
        logOut("https://classic.sas.dk");
        break;
    case 'www.sas.se':
        logOut("https://classic.sas.se");
        break;
    case 'www.sas.no':
        logOut("https://classic.sas.no");
        break;
    case 'www.flysas.com':
        logOut("https://classic.flysas.com");
        break;
    default:
       // console.log('The url is not under consideration :' + host);
}
});



   function logOut(url) {
       //console.log('The url is :' + url);
        url += '?logout=true';
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("id","logoutframe");
        ifrm.setAttribute("src", url);
        ifrm.style = "visibility:hidden";
        document.body.appendChild(ifrm);

   }

	setTimeout(function(){$('.cms-wrapper h1').first().focus();},150);	//Added for AC-258

/*** End of AEM main JS ***/
$(document).ready(function(){
	$('#accordian .content:eq(0)').hide();
	$(".head").click(function(){	
		$(".head").removeClass("active");
		//if ( screen.width < 768 ){		
			if ( $(window).width() < 768) { 
			if(false == $(this).next().is(':visible')) {
				$('#accordian .content').slideUp(300);
				$(this).toggleClass("active");
				//$('body').scrollTo(this);				
			}
			$(this).next().slideToggle(300);
			$("body, html").animate({
    			scrollTop: $(document).height()
				}, 400)
			//window.scrollTo($(this).position.left,$(this).position.top);
			
		}
		
	});
});

/** Date based utility **/

function createDateAsUTC(date) {
    // Returns a UTC date created using literal year,month,day.. values of another date object
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) { 
    // Returns the UTC equivalent date-time of the current date object
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}


/** End of Date based utility **/

/*** Start of journeybar capture ***/

$(document).ready(function() {
//$( document ).on( "loadCMS", function( event ) {          

    $(document).on("journeyBarChange", function(event, journeyBarMode) {
    	//console.log('Inside script.js journeyBarChange ::' + journeyBarMode);
		load(journeyBarMode);
	});

    function load(journeyBarMode) {
    	//console.log('Inside script.js rePaintHome ::' + journeyBarMode);
        var pageName = 'home';
        if(journeyBarMode == 'explore') {
            pageName = 'explore';
        } else if(journeyBarMode == 'check-in') {
            pageName = 'check-in';
        } else if (journeyBarMode == 'my-trips') {
            pageName = 'my-trips';
        } 

        var url = getExternalizedRootPage() + '/' + pageName + '.html';
                 //getExternalizedRootPage() + '/' + pageName + '.content.html?wcmmode=disabled';
		//console.log(url);
        window.location.href = url;

		/*
        $.ajax({
            method:"GET",
            url: url,
            //dataType: "html",
            success: function (data) {
               	$('#content').html(data);                				
            }			
        });
        */

	}
});

/*** End of journeybar capture ***/

/** Start of window load functions **/
$(window).on('load', function(){ 

    initWindowLoad();

    function initWindowLoad() {
	//	showOcpHolder(); 
        evaluateCmsContentAccess();
    }    

    // Show the login area only after it has fully loaded
    function showOcpHolder() {
    	$("#ocp-holder").show();
    }    

    // Check if CMS content is protected
    function evaluateCmsContentAccess() {
    	var isProtected = $("#content").attr("data-protected");

        if(isProtected != undefined && isProtected != null){

            // Evaluate existence of cookie
			var SSOCodeFromCookie = getSSOCookie();
            if(SSOCodeFromCookie == null){
                // Show login prompt
				var hashPath = window.location.hash;
                //console.log("hashPath " + hashPath);
                if(!hashPath.includes("userAction=Login")) {

                    var width = $(window).width();
                    var element;
    
                    if(width <= 767) {
                        element = $("#ocp-widget a.userProfile_icon");
                    } else {
                        element = $('a[ng-click="showtriangle(\'login\')"]');
                    }
                    if(element != null){
                        setTimeout(function() {
                            //console.log(element);
                            element.triggerHandler('click');
                        }, 1000);
                    }    
                }    


				// Wait for signin success
                $( document ).on( "userSignedIn", function( event ) {
                    //console.log("Received login complete notification");
                    loadCmsContent(getExternalizedCurrPage() + ".content.html");
                });
            } else {
                loadCmsContent(getExternalizedCurrPage() + ".content.html");
            }
        }    
    }

    function loadCmsContent(path){
        $.ajax({
        	method: "GET",
            dataType: "html",
            url: path + ".content.html",
            success: function(data) {
            	$("#content").html(data);
            	if(window.isCms || window.isExplore){
					$( document).trigger( "loadCMS" );
				}
        	} 
    	});
    }



});


//adds alt attribute to the image if missing, accessibility fix
$(document).ready(function(){
    $('img').each(function(){
        if(!$(this).attr('alt') || $(this).attr('alt')==""){
            $(this).attr('alt','image');
        }
        if($(this).attr('title')){
           $(this).removeAttr('title');
    	}
    });

})
/** End of window load functions **/
/***************** Start of tx-UI wing-advert *******************/

/*
	<div class="cms-wing-ad" data-iata="ARN" data-OnD="origin"></div>
    <div class="cms-wing-ad" data-iata="CPH" data-OnD="destination"></div>
	
	trigger event loadWingAd
*/

$( document ).on( "loadWingAd", function( event ) {    

	var itinerary_advert_base = "/content/flysas-blueprint/en/misc/adverts/booking-confirmation";

    var device = ($(document).width() < 768) ? "mobile" : "desktop";

    function initWingAdvert() {

		$( ".cms-wing-ad" ).each(function() {
        	placeItineraryAdvert($(this));
        });

    }    
	
	initWingAdvert();

    function placeItineraryAdvert(container) {

		var itinerary_iata = container.attr('data-iata');
        if(itinerary_iata == null) { return; }
		var itinerary_OnD_type = container.attr('data-OnD');
        if(itinerary_OnD_type == null) { return; }

        var itinerary_advert_default = itinerary_advert_base + "/" + device + "/default";
        var itinerary_advert_second = itinerary_advert_base + "/" + device + "/" + itinerary_iata.toLowerCase();
        var itinerary_advert_first = itinerary_advert_second + "/" + itinerary_OnD_type;

        fetchContent(itinerary_advert_first, 1);

        function fetchContent(url, attempt){
            $.ajax({
                method: "GET",
                dataType: "html",
                url: url + ".content.html",
                success: function(data) {
                    container.html($(data).find('.image.parbase').find('div').html());
                    //$("#" + container_id).html(data);
                } ,
                error: function (xhr, ajaxOptions, thrownError){
                    if(xhr.status==404) {
                        if(attempt == 1){
                            fetchContent(itinerary_advert_second, attempt+1);
                        }if(attempt == 2){
                            fetchContent(itinerary_advert_default, attempt+1);
                        }    
                    }
                }
            }); 
        }    
    
    }

});

/***************** End of tx-UI booking-confirmation advert *******************/
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=25)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){if(t._instance)throw new Error("Error: Instantiation failed, user Translations.getInstance()")}return t.getInstance=function(){return t._instance},t.prototype.setTranslations=function(t){this.translations=t},t.prototype.getTranslations=function(){return this.translations},t.prototype.applyTranslation=function(t){var e=this;this.translations&&(t.find("[data-i18n]").each(function(t,n){var i=$(n).data("i18n");e.translations[i]&&$(n).text(e.translations[i])}),t.find("[aria-label]").each(function(t,n){var i=$(n).attr("aria-label");void 0!==i&&e.translations[i]&&$(n).attr("aria-label",e.translations[i])}))},t.prototype.t=function(t){return this.translations[t]},t._instance=new t,t}();e.default=i},function(t,e,n){function i(t,e){if(c(t))return new Date(t.getTime());if("string"!=typeof t)return new Date(t);var n=e||{},i=n.additionalDigits;i=null==i?h:Number(i);var l=r(t),u=a(l.date,i),f=u.year,g=u.restDateString,w=o(g,f);if(w){var y,v=w.getTime(),b=0;return l.time&&(b=s(l.time)),l.timezone?y=d(l.timezone):(y=new Date(v+b).getTimezoneOffset(),y=new Date(v+b+y*p).getTimezoneOffset()),new Date(v+b+y*p)}return new Date(t)}function r(t){var e,n={},i=t.split(f);if(g.test(i[0])?(n.date=null,e=i[0]):(n.date=i[0],e=i[1]),e){var r=F.exec(e);r?(n.time=e.replace(r[1],""),n.timezone=r[1]):n.time=e}return n}function a(t,e){var n,i=y[e],r=b[e];if(n=v.exec(t)||r.exec(t)){var a=n[1];return{year:parseInt(a,10),restDateString:t.slice(a.length)}}if(n=w.exec(t)||i.exec(t)){var o=n[1];return{year:100*parseInt(o,10),restDateString:t.slice(o.length)}}return{year:null}}function o(t,e){if(null===e)return null;var n,i,r,a;if(0===t.length)return i=new Date(0),i.setUTCFullYear(e),i;if(n=m.exec(t))return i=new Date(0),r=parseInt(n[1],10)-1,i.setUTCFullYear(e,r),i;if(n=D.exec(t)){i=new Date(0);var o=parseInt(n[1],10);return i.setUTCFullYear(e,0,o),i}if(n=C.exec(t)){i=new Date(0),r=parseInt(n[1],10)-1;var s=parseInt(n[2],10);return i.setUTCFullYear(e,r,s),i}if(n=x.exec(t))return a=parseInt(n[1],10)-1,l(e,a);if(n=$.exec(t)){a=parseInt(n[1],10)-1;return l(e,a,parseInt(n[2],10)-1)}return null}function s(t){var e,n,i;if(e=T.exec(t))return(n=parseFloat(e[1].replace(",",".")))%24*u;if(e=k.exec(t))return n=parseInt(e[1],10),i=parseFloat(e[2].replace(",",".")),n%24*u+i*p;if(e=V.exec(t)){n=parseInt(e[1],10),i=parseInt(e[2],10);var r=parseFloat(e[3].replace(",","."));return n%24*u+i*p+1e3*r}return null}function d(t){var e,n;return(e=P.exec(t))?0:(e=I.exec(t))?(n=60*parseInt(e[2],10),"+"===e[1]?-n:n):(e=O.exec(t),e?(n=60*parseInt(e[2],10)+parseInt(e[3],10),"+"===e[1]?-n:n):0)}function l(t,e,n){e=e||0,n=n||0;var i=new Date(0);i.setUTCFullYear(t,0,4);var r=i.getUTCDay()||7,a=7*e+n+1-r;return i.setUTCDate(i.getUTCDate()+a),i}var c=n(19),u=36e5,p=6e4,h=2,f=/[T ]/,g=/:/,w=/^(\d{2})$/,y=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],v=/^(\d{4})/,b=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],m=/^-(\d{2})$/,D=/^-?(\d{3})$/,C=/^-?(\d{2})-?(\d{2})$/,x=/^-?W(\d{2})$/,$=/^-?W(\d{2})-?(\d{1})$/,T=/^(\d{2}([.,]\d*)?)$/,k=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,V=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,F=/([Z+-].*)$/,P=/^(Z)$/,I=/^([+-])(\d{2})$/,O=/^([+-])(\d{2}):?(\d{2})$/;t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(12),r=function(){function t(){}return t.prototype.GTMtrackErrors=function(t,e){window.sasD360DataLayer.push({event:"error","error.type":t,"error.message":e})},t.prototype.GTMCommonInformation=function(t,e,r,a){-1===window.location.pathname.indexOf("flights")&&(window.sasD360DataLayer=[],window.sasD360DataLayer.push({currency:t,environment:i.default.getInstance().env,pageBreadcrumb:"home|booking",pageType:"homepage",platformType:screen.width>=767?"desktop":"mobile",preferredOrigin:e,siteCountry:r.toUpperCase(),siteLanguage:a,flowType:"booking"}),n(55))},t.prototype.GTMtrackInteraction=function(t,e,n){window.sasD360DataLayer&&window.sasD360DataLayer.push({event:"interaction","interaction.category":t,"interaction.action":e,"interaction.label":n})},t.prototype.dataLayerTriptype=function(t){"OW"===t?this.GTMtrackInteraction("CEP","Select Ticket Type","One way"):"RT"===t?this.GTMtrackInteraction("CEP","Select Ticket Type","Round trip"):this.GTMtrackInteraction("CEP","Select Ticket Type","Multi-city")},t.prototype.prevNextMonth=function(t){1===t?this.GTMtrackInteraction("CEP","Calendar","Show next month"):0===t&&this.GTMtrackInteraction("CEP","Calendar","Show previous month")},t.prototype.dataLayerincreasePax=function(t,e){switch(t){case"Adult":var n="Add adult - now "+e;this.GTMtrackInteraction("CEP","Passengers",n);break;case"Child":var i="Add child - now "+e;this.GTMtrackInteraction("CEP","Passengers",i);break;case"Infant":var r="Add infant - now "+e;this.GTMtrackInteraction("CEP","Passengers",r);break;case"Youth":var a="Add youth - now "+e;this.GTMtrackInteraction("CEP","Passengers",a)}},t.prototype.dataLayerdecreasePax=function(t,e){switch(t){case"Adult":var n="Remove adult - now "+e;this.GTMtrackInteraction("CEP","Passengers",n);break;case"Child":var i="Remove child - now "+e;this.GTMtrackInteraction("CEP","Passengers",i);break;case"Infant":var r="Remove infant - now "+e;this.GTMtrackInteraction("CEP","Passengers",r);break;case"Youth":var a="Remove youth - now "+e;this.GTMtrackInteraction("CEP","Passengers",a)}},t.prototype.revenueFlow=function(t){this.GTMtrackInteraction("CEP","Select Book With","Cash")},t.prototype.pointsFlow=function(t){this.GTMtrackInteraction("CEP","Select Book With","Points")},t.prototype.dataLayerTicketSearch=function(t){"OW"===t.tripType?this.tripType="one way":"RT"===t.tripType?this.tripType="round trip":this.tripType="Multi-city";var e="type:"+this.tripType+"|origin:"+t.origin.iata.airport+"|destination:"+t.destination.iata.airport+"|adults:"+t.pax.adt+"|children:"+t.pax.chd+"|infants:"+t.pax.inf+"|youths:"+t.pax.yth;this.GTMtrackInteraction("CEP","Search",e)},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(13),a=function(){function t(){if(this.dataLayerService=new i.default,t._instance)throw new Error("Error: Instantiation failed, user Translations.getInstance()")}return t.getInstance=function(){return t._instance},t.prototype.setCepData=function(t,e){this.cepData=t,this.lang=e.lang,this.cepCode=e.market.toUpperCase()+e.cepCode,this.setAirports(),this.setSupportedCep(),this.setDefaultOriginCookie(),this.setTpStatus(),this.dataLayerService.GTMCommonInformation(this.getDefaultCurrency(),this.getDefaultOrigin(),e.market,e.lang)},t.prototype.getCepData=function(){return this.cepData},t.prototype.getAirports=function(){return this.airportList},t.prototype.getRegionData=function(){return this.cepData.regiondata.regionPos},t.prototype.LanguageData=function(){return this.cepData.regiondata.regionPos[0].country},t.prototype.getSeasonalOnD=function(){return this.cepData.seasonalOnD},t.prototype.getMarketData=function(){return this.cepData.marketresponsedata},t.prototype.getDefaultOrigin=function(){return this.supportedCep[0].defaultOrigin},t.prototype.getDefaultCurrency=function(){return this.supportedCep[0].defaultCurrency},t.prototype.getDefaultBookingFlow=function(){return this.supportedCep[0].defaultBookingFlow},t.prototype.setSupportedCep=function(){var t=this;this.supportedCep=this.getMarketData().pointOfSales[0].posSearchConfiguration.filter(function(e){return e.code===t.cepCode})},t.prototype.getSupportedCep=function(){return this.supportedCep},t.prototype.getTpStatus=function(){return this.tpStatus},t.prototype.setTpStatus=function(){var t=this,e=this.getMarketData().pointOfSales[0],n=e.code.toUpperCase();e.posSearchConfiguration.filter(function(e){e.code===n+"_DEFAULT"&&(t.tpStatus=e.bookingFlow.indexOf("TP/TPC"))})},t.prototype.overrideDefaultOrigin=function(){this.supportedCep[0].defaultOrigin=r.default.getCookie("_origin")},t.prototype.setDefaultOriginCookie=function(){if(r.default.getCookie("_origin")&&""!==r.default.getCookie("_origin"))this.overrideDefaultOrigin();else{var t=new Date,e=new Date(t.getTime()+31536e6),n=e.toUTCString();document.cookie="_origin="+this.getDefaultOrigin()+";path=/;expires="+n}},t.prototype.setAirports=function(){this.airportList={};for(var t=0,e=this.getRegionData();t<e.length;t++)for(var n=e[t],i=this.LanguageData(),r=Object.keys(i[0].names),a=r[0]===this.lang?0:1,o=0===a?1:0,s=0,d=n.country;s<d.length;s++)for(var l=d[s],c=0,u=l.city;c<u.length;c++)for(var p=u[c],h=0,f=p.airport;h<f.length;h++){var g=f[h];g.cityCode=p.code,g.names=[0===a?g.names[r[0]]?g.names[r[0]]:g.names.en:g.names[r[1]]?g.names[r[1]]:g.names.en,0===o?g.names[r[0]]?g.names[r[0]]:g.names.en:g.names[r[1]]?g.names[r[1]]:g.names.en],g.cityName=[0===a?p.names[r[0]]?p.names[r[0]]:p.names.en:p.names[r[1]]?p.names[r[1]]:p.names.en,0===o?p.names[r[0]]?p.names[r[0]]:p.names.en:p.names[r[1]]?p.names[r[1]]:p.names.en],g.countryCode=l.code,g.countryName=[0===a?l.names[r[0]]?l.names[r[0]]:l.names.en:l.names[r[1]]?l.names[r[1]]:l.names.en,0===o?l.names[r[0]]?l.names[r[0]]:l.names.en:l.names[r[1]]?l.names[r[1]]:l.names.en],this.airportList[g.code]=g}},t._instance=new t,t}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function t(){}return t.setInputStyle=function(t){var e=this;this.$localTarget=t,this.$window=$(window),this.$localTarget.on("focus",".input-set input",function(t){return e.inputAction(t)}),this.$localTarget.on("click",".input-set label",function(t){return e.inputAction(t)}),this.$localTarget.on("blur",".input-set input",function(t){return e.inputActionBlur(t)}),this.pushLabelUp()},t.pushLabelUp=function(){this.$localTarget&&this.$localTarget.find(".input-set").each(function(t,e){$(e).find("input").val().length>0&&$(e).find("label").addClass("top-set top-set-small")})},t.inputAction=function(t){var e=$(t.currentTarget);this.focusCEP(),e=e.closest(".input-set").find("input"),e.prev("label").addClass("top-set")},t.focusCEP=function(){$("#bg-disable").show(),$(document).trigger("cepFocused")},t.deFocusCEP=function(){$("#bg-disable").hide(),$(document).trigger("cepDeFocused")},t.inputActionBlur=function(t){var e=$(t.currentTarget),n=(e.closest(".input-set").find("input"),e.prev("label"));e.val().trim().length<1&&$(t.target).is($("#cep-wrap").find(t.target))?n.removeClass("top-set top-set-small"):n.addClass("top-set top-set-small")},t.enableContentAfterFindFlights=function(){$("#start-page").show(),$("#sas-footer-wrapper").show(),$(".calendar-wrapper.ocp-bottom-drop-2").removeClass("calendar-position-static"),$("body").removeClass("bgcolor-on-content")},t.disableContentAfterFindFlights=function(){$("#start-page").hide(),$("#sas-footer-wrapper").hide(),$(".calendar-wrapper.ocp-bottom-drop-2").addClass("calendar-position-static"),$("body").addClass("bgcolor-on-content")},t.applyWordStartPattern=function(t){return RegExp("^"+this.regExpEscape(t.trim())+"|\\s"+this.regExpEscape(t.trim()),"i")},t.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},t.getKeyByValue=function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n]===e)return n},t.getIndexFromArray=function(t,e){var n=t.filter(function(t){return t.toLowerCase().indexOf(e.toLowerCase())>-1});return t.indexOf(n[0])},t.translation=function(t){return i.default.getInstance().t(t)},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(17),r=n(12),a=i.default.config,o=function(){function t(){}return t.prototype.validateOnD=function(t,e,n,i,o){var s=o.adt>0?"ADT":"YTH",d={async:!0,crossDomain:!0,url:r.default.getInstance().appConf.APIURL+"searchpanel/validate",method:"GET",data:{origin:t,destination:e,pos:a.market,paxType:s,bookingFlow:i},headers:{authorization:n}};return $.ajax(d)},t.prototype.getOauth=function(){var t={method:"POST",url:r.default.getInstance().appConf.APIURL+"authorize/oauth/token",headers:{authorization:"Basic U0FTLVVJOg==","content-type":"application/x-www-form-urlencoded"},json:!0,data:{grant_type:"client_credentials"}};return $.ajax(t)},t.prototype.getCEPData=function(t){return window.location.host.indexOf("localhost")>-1||window.location.host.indexOf("127.0.0.1")>-1?$.getJSON("https://st2.flysas.com/appdata/cep/RD_Cepdata_"+t+".json"):$.getJSON("/appdata/cep/RD_Cepdata_"+t+".json")},t.prototype.getGeolocation=function(t,e){var n="?latitude="+t.latitude+"&longitude="+t.longitude,i={method:"GET",url:r.default.getInstance().appConf.APIURL+"location/getGeolocation"+n,async:!0,crossDomain:!0,headers:{authorization:e}};return $.ajax(i)},t.prototype.getTranslations=function(t){return window.location.host.indexOf("localhost")>-1||window.location.host.indexOf("127.0.0.1")>-1?$.getJSON("https://st2.flysas.com/translations/sasui-cep/cep_"+t+".json"):$.getJSON("/translations/sasui-cep/cep_"+t+".json")},t}();e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(35),r=n(5),a=n(0),o=n(3),s=n(16),d=function(){function t(t,e){this.$target=t,this.config=e,this.apiClient=new r.default,this.translation=a.default.getInstance(),this.setTranslations(),this.cepData=o.default.getInstance(),this.init()}return t.prototype.init=function(){this.view=new i.default(this,this.$target,this.config),this.adt=1,this.yth=this.chd=this.inf=0,this.isOnDValid=!0},t.prototype.setTranslations=function(){var t=this;this.config.translations?this.translation.setTranslations(this.config.translations):this.apiClient.getTranslations(this.config.lang).then(function(e){t.translation.setTranslations(e)}).catch(function(t){})},t.prototype.getCepData=function(){var t=this;return this.apiClient.getCEPData(this.config.market).then(function(e){t.cepData.setCepData(e,t.config)}).catch(function(t){})},t.prototype.onFieldsChange=function(t,e){switch(e){case l.ORIGIN:this.origin=t;break;case l.DESTINATION:this.destination=t;break;case l.RETURNFROM:this.returnFrom=t;break;case l.RETURNTO:this.returnTo=t;break;case l.OUTDATE:this.onwardDate=t;break;case l.INDATE:this.returnDate=t;break;case l.TRIPTYPE:this.tripType=t;break;case l.BOOKINGFLOW:this.bookingFlow=t;break;case l.ADT:this.adt=t;break;case l.CHD:this.chd=t;break;case l.INF:this.inf=t;break;case l.YTH:this.yth=t}},t.prototype.validateFields=function(){var t=!0;return this.origin?this.destination?this.returnFrom||"OJ"!==this.view.preferencesView.selectedTripType?s(new Date(this.onwardDate))?s(new Date(this.returnDate))||"OW"===this.view.preferencesView.selectedTripType?!this.adt&&!this.chd&&!this.inf&&!this.yth||0===this.adt&&0===this.chd&&0===this.inf&&0===this.yth?t=!1:this.isOnDValid&&!0!==this.view.fieldsView.calendarSetView.$outBoundDateField.checkForError()||(t=!1):(t=!1,this.view.showError(l.INDATE)):(t=!1,this.view.showError(l.OUTDATE)):(t=!1,this.view.showError(l.RETURNFROM)):(t=!1,this.view.showError(l.DESTINATION)):(t=!1,this.view.showError(l.ORIGIN)),t},t.prototype.updateTripTypeToReturnFromLPC=function(){this.tripType="RT",this.view.preferencesView.selectedTripType="RT"},t.prototype.checkSeasonalOND=function(){var t=(this.origin?this.origin.iata.airport:"")+(this.destination?this.destination.iata.airport:"");if(this.cepData.getSeasonalOnD().indexOf(t)>-1)return!0},t.prototype.checkOrgDstExist=function(){return this.origin&&this.destination&&("OJ"!==this.tripType||this.returnFrom&&null!==this.returnFrom)},t.prototype.validateOnd=function(t){this.isOnDValid=t},t.prototype.checkForValidLogin=function(){this.view.fieldsView.setDobToCep(),this.view.fieldsView.checkForValidLogin()},t.prototype.updatepaxInView=function(t){this.view.fieldsView.updatePaxinField(t)},t.prototype.updateCepOnLogout=function(){this.view.fieldsView.setDobToCep()},t.prototype.showLPC=function(t,e){this.view.fieldsView&&this.view.fieldsView.calendarSetView?this.view.fieldsView.calendarSetView.showLPC(t,e):(this.isExMethodCallRequired=!0,this.externalParams=t)},t.prototype.updateCEPDate=function(t,e){this.view.fieldsView&&this.view.fieldsView.calendarSetView&&this.view.fieldsView.calendarSetView.updateCEPDate(t,e)},t.prototype.updateBookingFlow=function(t){this.view.preferencesView&&this.view.preferencesView.updateBookingFlow(t)},t.prototype.updateDefaultAirport=function(t){this.view.updateDefaultAirport(t)},t}();e.default=d;var l;!function(t){t[t.ORIGIN=0]="ORIGIN",t[t.DESTINATION=1]="DESTINATION",t[t.RETURNFROM=2]="RETURNFROM",t[t.RETURNTO=3]="RETURNTO",t[t.OUTDATE=4]="OUTDATE",t[t.INDATE=5]="INDATE",t[t.ADT=6]="ADT",t[t.CHD=7]="CHD",t[t.INF=8]="INF",t[t.YTH=9]="YTH",t[t.TRIPTYPE=10]="TRIPTYPE",t[t.BOOKINGFLOW=11]="BOOKINGFLOW"}(l=e.FieldType||(e.FieldType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(64),r=function(){function t(t){var e=this;this.$field=t,this.isError=!1,this.$html=$(i),t.on("blur",function(t){e.onBlur()}).on("focus",function(t){e.onFocus()})}return t.prototype.val=function(){return this.$field.val()},t.prototype.setErrorMessage=function(t){this.errorMessage=t},t.prototype.setError=function(t){this.errorMessage=t,this.isError=!0},t.prototype.removeError=function(){this.isError=!1,this.errorMessage="";var t=this.getId(a.ERROR,!0);this.$field.siblings(t).remove()},t.prototype.showError=function(){var t=this.getId(a.ERROR,!0);this.$field.siblings(t).length>0?(this.$html.find("#message").text(this.errorMessage),this.$field.siblings(t).show()):(t=this.getId(a.ERROR),this.$html.attr("id",t),this.$html.find("#message").text(this.errorMessage),this.$field.parent().append(this.$html),this.$html.show())},t.prototype.checkForError=function(){var t=this.getId(a.ERROR,!0);return this.$field.siblings(t).length>0},t.prototype.onFocus=function(){this.hideError()},t.prototype.onBlur=function(){this.isError&&this.showError()},t.prototype.hideError=function(){var t=this.getId(a.ERROR,!0);this.$field.siblings(t).hide()},t.prototype.getId=function(t,e){return void 0===e&&(e=!1),e?"#tooltip-"+t+"-"+this.$field.attr("id"):"tooltip-"+t+"-"+this.$field.attr("id")},t.prototype.isValid=function(){return!this.isError&&0!==this.val().length},t}();e.default=r;var a;!function(t){t[t.ERROR=0]="ERROR",t[t.INFO=1]="INFO"}(a=e.ToolTipType||(e.ToolTipType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(70),r=n(1),a=n(14),o=n(20),s=n(0),d=function(){function t(){}return t.parse=function(t,e){return void 0===e&&(e="yyyy-MM-dd"),r(t)},t.formatDate=function(t,e){if(!t)return"";var n=o(t,e).toLowerCase();if("ddd, DD MMM"===e){var i=new RegExp(/^([\w\-]+)/).exec(n),r=new RegExp(/([^\s]+$)/).exec(n);i&&(n=n.replace(/^([\w\-]+)/,this.t("calendar.week."+i[0]))),r&&(n=n.replace(/([^\s]+$)/,this.t("calendar.month."+r[0])))}return n},t.getDateInteger=function(t){return+t.replace(/-/g,"")},t.getDayCount=function(t,e){return 1===e&&(t%400==0||t%4==0&&t%100!=0)?29:this.dict[e]},t.getMonthRange=function(t){var e=[];e.push(t);for(var n=1;n<12;n++)e.push(this.siblingsMonth(t,n));return e},t.siblingsMonth=function(t,e){return new Date(t.getFullYear(),1*t.getMonth()+e)},t.parseMonthYear=function(t,e){if(!t)return"";var n=o(t,"MMM YYYY").toLowerCase(),i=new RegExp(/^([\w\-]+)/).exec(n);return i&&(n=n.replace(/^([\w\-]+)/,this.t("calendar.month."+i[0]))),n},t.parseWeek=function(t){return this.daysOfWeekFull[t]},t.getYearMonth=function(t,e){return e>11?(t++,e=0):e<0&&(t--,e=11),{year:t,month:e}},t.getDateRange=function(t,e,n){for(var r=this.translation.getTranslations(),o=[],s=t?t.pane:[],d=0,l=0;l<s;l++){var c=e[l],u={year:c.getFullYear(),month:c.getMonth()};o[l]=[];var p=(u.year.toString(),new Date(u.year,u.month,1)),h=p.getDay();0===h&&(h=7);var f=this.getDayCount(u.year,u.month);if(h>1)for(var g=this.getYearMonth(u.year,u.month-1),w=(this.getDayCount(g.year,g.month),1);w<h;w++)o[l].push({sclass:"past-day"});for(var y=this,w=1;w<=f;w++)!function(t){var e=new Date(u.year,u.month,t),s=e.getDay(),d=y.currentDate.setHours(0,0,0,0),c=i(e)&&!a(e,d)?"disable-date":"";y.disabledDaysOfWeek.forEach(function(t){s===parseInt(t,10)&&(c="datepicker-item-disable")});var p="";r&&(p=r["holiday."+n.market+"."+y.formatDate(e,"YYYY-MM-DD")]),o[l].push({text:t,date:e,sclass:c,holiday:p&&""!==p?p:null})}(w);var v=7*Math.ceil((p.getDay()+f)/7);d<v&&(d=v)}for(var l=0;l<s;l++)if(o[l].length<d)for(var b=d-o[l].length,w=1;w<=b;w++)o[l].push({sclass:"future-day"});return o},t.t=function(t){return this.translation.t(t)},t.daysOfWeek=["M","T","W","T","F","S","S"],t.daysOfWeekFull=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],t.months=["January","February","March","April","May","June","July","August","September","October","November","December"],t.dict=[31,28,31,30,31,30,31,31,30,31,30,31],t.disabledDaysOfWeek=[],t.currentDate=new Date,t.translation=s.default.getInstance(),t}();e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t.getStorage=function(){return window.sessionStorage},t.getItem=function(t){return window.sessionStorage.getItem(t)},t.setItem=function(t,e){window.sessionStorage.setItem(t,e)},t.getObject=function(t){var e=this.getItem(t);return e?JSON.parse(e):null},t.setObject=function(t,e){this.setItem(t,JSON.stringify(e))},t.removeItem=function(t){window.sessionStorage.removeItem(t)},t}();e.default=i},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var a=i(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([a]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var a=this[r][0];"number"==typeof a&&(i[a]=!0)}for(r=0;r<t.length;r++){var o=t[r];"number"==typeof o[0]&&i[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=f[i.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](i.parts[a]);for(;a<i.parts.length;a++)r.parts.push(c(i.parts[a],e))}else{for(var o=[],a=0;a<i.parts.length;a++)o.push(c(i.parts[a],e));f[i.id]={id:i.id,refs:1,parts:o}}}}function r(t,e){for(var n=[],i={},r=0;r<t.length;r++){var a=t[r],o=e.base?a[0]+e.base:a[0],s=a[1],d=a[2],l=a[3],c={css:s,media:d,sourceMap:l};i[o]?i[o].parts.push(c):n.push(i[o]={id:o,parts:[c]})}return n}function a(t,e){var n=w(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=b[b.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),b.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function o(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=b.indexOf(t);e>=0&&b.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),a(t,e),e}function d(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),a(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function c(t,e){var n,i,r,a;if(e.transform&&t.css){if(!(a=e.transform(t.css)))return function(){};t.css=a}if(e.singleton){var l=v++;n=y||(y=s(e)),i=u.bind(null,n,l,!1),r=u.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=d(e),i=h.bind(null,n,e),r=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),i=p.bind(null,n),r=function(){o(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}function u(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=D(e,r);else{var a=document.createTextNode(r),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}function p(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function h(t,e,n){var i=n.css,r=n.sourceMap,a=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||a)&&(i=m(i)),r&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([i],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}var f={},g=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),w=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),y=null,v=0,b=[],m=n(29);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=g()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return i(n,e),function(t){for(var a=[],o=0;o<n.length;o++){var s=n[o],d=f[s.id];d.refs--,a.push(d)}if(t){i(r(t,e),e)}for(var o=0;o<a.length;o++){var d=a[o];if(0===d.refs){for(var l=0;l<d.parts.length;l++)d.parts[l]();delete f[d.id]}}}};var D=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=n(39),a=n(40),o=n(41),s=n(42),d=n(43),l=n(44),c=n(45),u=n(46),p=n(47),h=n(48),f=n(49),g=n(50),w=n(51),y=n(52),v=n(53),b=n(54);!function(t){t.PRODUCTION="prod",t.STAGING="staging"}(i=e.Env||(e.Env={}));var m=function(){function t(){if(t._instance)throw new Error("Error: Instantiation failed, user AppConfig.getInstance()");var e=window.location.host;this.env=i.STAGING,e.indexOf("localhost")>-1?this.appConf=new r.default:e.indexOf("st1.flysas.com")>-1?this.appConf=new a.default:e.indexOf("st2.flysas.com")>-1?this.appConf=new o.default:e.indexOf("st3.flysas.com")>-1?this.appConf=new s.default:e.indexOf("st4.flysas.com")>-1?this.appConf=new d.default:e.indexOf("st5.flysas.com")>-1?this.appConf=new l.default:e.indexOf("st6.flysas.com")>-1?this.appConf=new c.default:e.indexOf("uat1.flysas.com")>-1?this.appConf=new u.default:e.indexOf("uat2.flysas.com")>-1?this.appConf=new p.default:e.indexOf("uat3.flysas.com")>-1?this.appConf=new h.default:e.indexOf("uat4.flysas.com")>-1?this.appConf=new f.default:e.indexOf("uat5.flysas.com")>-1?this.appConf=new g.default:e.indexOf("uat6.flysas.com")>-1?this.appConf=new w.default:e.indexOf("staging")>-1?this.appConf=new y.default:e.indexOf("d360b")>-1?this.appConf=new v.default:e.indexOf("www")>-1||e.indexOf("beta")>-1?(this.appConf=new b.default,this.env=i.PRODUCTION):this.appConf=new r.default}return t.getInstance=function(){return t._instance},t._instance=new t,t}();e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t.getCookie=function(t){for(var e=document.cookie.split("; "),n=0,i=void 0;i=e[n]&&e[n].split("=");n++)if(this.decode(i.shift())===t)return this.decode(i.join("="));return null},t.decode=function(t){return decodeURIComponent(t)},t.setSearchCookie=function(t){var e=new Date,n=new Date(e.getTime()+31536e6),i=n.toUTCString();document.cookie="search ="+t+";path=/;expires="+i},t}();e.default=i},function(t,e,n){function i(t,e){var n=r(t),i=r(e);return n.getTime()===i.getTime()}var r=n(1);t.exports=i},function(t,e,n){function i(t){return r(t,{weekStartsOn:1})}var r=n(76);t.exports=i},function(t,e,n){function i(t){if(r(t))return!isNaN(t);throw new TypeError(toString.call(t)+" is not an instance of Date")}var r=n(19);t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(18),r={lang:"en",market:"se",apiUrl:"https://apit.flysas.com/rt1",roundTrip:!0,oauth:"",returnFrom:!1,revenue:!0,cepCode:"_DEFAULT",showHolidays:!0,accessTab:!0,defaultTravelerType:i.DefaultTraveler.ADULT,getFlightOffers:!1,searchCallback:function(t){}};e.default={config:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){t.ADULT="ADULT",t.YOUTH="YOUTH"}(e.DefaultTraveler||(e.DefaultTraveler={}))},function(t,e){function n(t){return t instanceof Date}t.exports=n},function(t,e,n){function i(t,e,n){var i=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",a=n||{},o=a.locale,s=h.format.formatters,d=h.format.formattingTokensRegExp;o&&o.format&&o.format.formatters&&(s=o.format.formatters,o.format.formattingTokensRegExp&&(d=o.format.formattingTokensRegExp));var l=u(t);return p(l)?r(i,s,d)(l):"Invalid Date"}function r(t,e,n){var i,r,o=t.match(n),s=o.length;for(i=0;i<s;i++)r=e[o[i]]||f[o[i]],o[i]=r||a(o[i]);return function(t){for(var e="",n=0;n<s;n++)o[n]instanceof Function?e+=o[n](t,f):e+=o[n];return e}}function a(t){return t.match(/\[[\s\S]/)?t.replace(/^\[|]$/g,""):t.replace(/\\/g,"")}function o(t,e){e=e||"";var n=t>0?"-":"+",i=Math.abs(t),r=Math.floor(i/60),a=i%60;return n+s(r,2)+e+s(a,2)}function s(t,e){for(var n=Math.abs(t).toString();n.length<e;)n="0"+n;return n}var d=n(71),l=n(75),c=n(21),u=n(1),p=n(16),h=n(78),f={M:function(t){return t.getMonth()+1},MM:function(t){return s(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return s(t.getDate(),2)},DDD:function(t){return d(t)},DDDD:function(t){return s(d(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return l(t)},WW:function(t){return s(l(t),2)},YY:function(t){return s(t.getFullYear(),4).substr(2)},YYYY:function(t){return s(t.getFullYear(),4)},GG:function(t){return String(c(t)).substr(2)},GGGG:function(t){return c(t)},H:function(t){return t.getHours()},HH:function(t){return s(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return s(f.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return s(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return s(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return s(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return s(t.getMilliseconds(),3)},Z:function(t){return o(t.getTimezoneOffset(),":")},ZZ:function(t){return o(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};t.exports=i},function(t,e,n){function i(t){var e=r(t),n=e.getFullYear(),i=new Date(0);i.setFullYear(n+1,0,4),i.setHours(0,0,0,0);var o=a(i),s=new Date(0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);var d=a(s);return e.getTime()>=o.getTime()?n+1:e.getTime()>=d.getTime()?n:n-1}var r=n(1),a=n(15);t.exports=i},function(t,e,n){function i(t,e,n){var i=r(t).getTime(),a=r(e).getTime(),o=r(n).getTime();if(a>o)throw new Error("The start of the range cannot be after the end of the range");return i>=a&&i<=o}var r=n(1);t.exports=i},function(t,e,n){function i(t,e){var n=r(t),i=r(e);return n.getTime()>i.getTime()}var r=n(1);t.exports=i},function(t,e,n){function i(t,e){var n=r(t),i=r(e);return n.getTime()<i.getTime()}var r=n(1);t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(26),n(30),n(32);var i=n(34);e.Cep=i.default},function(t,e,n){var i=n(27);"string"==typeof i&&(i=[[t.i,i,""]]);var r={};r.transform=void 0;n(11)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(10)(void 0),e.push([t.i,".cep {\r\n\tbackground: #fff;\r\n\twidth: 100%;\r\n\theight: 64px;\r\n\tposition: relative;\r\n\tborder-radius: 4px;\r\n\tpadding-right: 126px;\r\n\tfloat: left;\r\n\tz-index: 3;\r\n}\r\n.cep .input-set .arrow-up {\r\n\twidth: 0;\r\n\theight: 0;\r\n\tborder-style: solid;\r\n\tborder-width: 0 10px 13px 10px;\r\n\tborder-color: transparent transparent #eae9e7 transparent;\r\n\tposition: absolute;\r\n\tleft: 43%;\r\n\tz-index: 2;\r\n\tdisplay: none;\r\n}\r\n.cep .input-set .arrow-up.arrow-show {\r\n\tdisplay: block;\r\n}\r\n\r\n.cep .radius-left, .cep .radius-left input {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-top-left-radius: 4px;\r\n\tborder-left: none;\r\n}\r\n\r\n.cep .small-3 {\r\n\tpadding: 0;\r\n}\r\n\r\n.cep .cep-button-wrap button {\r\n\tmin-width: 103px;\r\n\tborder-radius: 4px;\r\n}\r\n.cep .cep-button-wrap {\r\n\tposition: absolute;\r\n\tright: 12px;\r\n\ttop: -2px;\r\n}\r\n\r\n.cep .cep-button-wrap .toggle-button {\r\n\tdisplay: none;\r\n}\r\n\r\n.cep-preference {\r\n    float: left;\r\n    width: 100%;\r\n    padding: 0 0 16px 0;\r\n    position: relative;\r\n    z-index: 3;\r\n    background: transparent;\r\n}\r\n.cep-preference p, .cep-preference label {\r\n\tcolor: #fff;\r\n}\r\n.cep-preference .radio-wrap {\r\n\tmargin: 7px 10px 0 0;\r\n}\r\n.cep-preference p {\r\n\tmargin: 7px 0 0 0;\r\n}\r\n\r\n.cep.one-way .input-set.outbound {\r\n\twidth: 100%;\r\n}\r\n.cep.one-way .input-set.inbound {\r\n\tdisplay: none;\r\n}\r\n\r\n.cep.multi-city .input-set.destination,\r\n.cep.multi-city .input-set.origin,\r\n.cep.multi-city .input-set.return-from,\r\n.cep.multi-city .input-set.return-to {\r\n\twidth: 12.5%;\r\n}\r\n.cep.multi-city .input-set.return-from,\r\n.cep.multi-city .input-set.return-to {\r\n\tdisplay: block;\r\n}\r\n\r\n.cep .input-set.return-from,\r\n.cep .input-set.return-to {\r\n\tdisplay: none;\r\n}\r\n.ocp-bottom-drop {\r\n\tcolor: #fff;\r\n\tdisplay: none;\r\n}\r\n.ocp-bottom-drop.active {\r\n\tdisplay: block;\r\n}\r\n.ocp-bottom-drop {\r\n\tbox-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);\r\n\tborder-radius: 4px;\r\n\tbackground: #eae9e8;\r\n\tleft: 0;\r\n\tposition: absolute;\r\n\twidth: 364px;\r\n\ttop: 77px;\r\n\tcolor: #3f3d3a;\r\n\tz-index: 1;\r\n}\r\n.select-passengers {\r\n\tdisplay: none;\r\n}\r\n.select-passengers .arrow-up,\r\n.cep .ocp-bottom-drop .arrow-up {\r\n\tposition: static;\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tmargin: -13px 0 0 10px;\r\n\tborder-color: transparent transparent #eae9e8 transparent;\r\n}\r\n.select-passengers li,\r\n.cep .ocp-bottom-drop li {\r\n\twidth: 100%;\r\n\tfloat: left;\r\n}\r\n.cep .return-to input {\r\n\tcursor: default;\r\n}\r\n\r\n.cep .input-set input[type='text'] {\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n\tcursor: pointer;\r\n}\r\n/* Changed main-airport hover to li */\r\n.cep-tool-tip {\r\n    display: none;\r\n}\r\n.cep .tool-tip.small {\r\n    bottom: 100%;\r\n    left: 15px;\r\n}\r\ninput[readonly] {\r\n   -moz-user-select: none;\r\n    -webkit-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n.focus-color {\r\n\tbackground: #eae9e8 !important;\r\n}\r\n\r\n@media (max-width: 767px) {\r\n.cep .destination  .tool-tip.small,\r\n.cep .inbound  .tool-tip.small {\r\n\tleft: -105px;\r\n}\r\n.destination .tool-tip.small  .tool-tip-inner:after,\r\n.inbound .tool-tip.small  .tool-tip-inner:after {\r\n\ttransform: rotate(45deg);\r\n\tleft: 244px;\r\n}\r\n}\r\n\r\n.cep .input-set .swap {\r\n    position: absolute;\r\n    border-radius: 4px;\r\n    background-color: #fff;\r\n    border: solid 1px #d5d4d1;\r\n    right: -13px;\r\n    top: 10px;\r\n    z-index: 1;\r\n}\r\n.cep .input-set .swap:hover {\r\n    background-color: #eae9e8;\r\n}\r\n.cep .swap.disabled .icon-swap {\r\n\topacity: .5;\r\n\tcursor: default;\r\n}\r\n\r\n.select-passengers {\r\n\tpadding: 8px;\r\n\twidth: 288px;\r\n}\r\n.cep .select-passengers .arrow-up { margin-top: -21px;}\r\n.select-passengers .inner-wrap {\r\n    box-shadow: 0 2px 4px 0 #d5d4d1;\r\n    width: 100%;\r\n    background: #fff;\r\n    float: left;\r\n}\r\n\r\n.select-passengers .count {\r\n    width: 98px;\r\n    height: 33px;\r\n    border-radius: 4px;\r\n    border: solid 1px #eae9e8;\r\n    float: right;\r\n    padding: 4px;\r\n    text-align: center;\r\n}\r\n.select-passengers .category {\r\n\tpadding: 8px 0 0 0;\r\n}\r\n.select-passengers .selected-count {\r\n    font-size: 16px;\r\n    display: inline-block;\r\n    padding-top: 1px;\r\n}\r\n.select-passengers .youth-tickets li,\r\n.select-passengers li {\r\n\tpadding: 9px 9px 5px 20px;\r\n}\r\n\r\n.select-passengers .youth-tickets li:last-child {\r\n\tpadding: 9px 9px 9px 20px;\r\n}\r\n.select-passengers .youth-tickets li:first-child {\r\n\tpadding: 20px 9px 9px 20px;\r\n}\r\n\r\n.select-passengers .youth-tickets {\r\n\tdisplay: none;\r\n}\r\n\r\n.select-passengers .book-youth {\r\n    border-top: 1px solid #eae9e8;\r\n    margin-top: 10px;\r\n    padding: 13px 0 15px 0;\r\n    text-align: center;\r\n}\r\n.select-passengers .book-youth-warning {\r\n    border-top: 1px solid #eae9e8;\r\n    margin-top: 10px;\r\n    padding: 13px 0 15px 0;\r\n    text-align: center;\r\n\tcolor: #a7a299;\r\n}\r\n.select-passengers li:last-child {\r\n    color: #a7a299;\r\n}\r\n\r\n.select-passengers p {\r\n\tcolor: #000;\r\n\tfont-size: 12px;\r\n\tmargin: 14px 0 8px 0;\r\n\tfloat: left;\r\n}\r\n\r\n.select-trip {\r\n\tmax-width: 498px;\r\n\twidth: 100%;\r\n\tfloat: left;\r\n}\r\n.select-trip li {\r\n\tbackground: #000099;\r\n\twidth: 33.3333%;\r\n\theight: 32px;\r\n\tfloat: left;\r\n\ttext-align: center;\r\n    position: relative;\r\n}\r\n.select-trip li:last-child,\r\n.select-trip li:last-child button {\r\n\tborder-bottom-right-radius: 4px;\r\n\tborder-top-right-radius: 4px;\r\n}\r\n.select-trip li:first-child,\r\n.select-trip li:first-child button {\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-top-left-radius: 4px;\r\n}\r\n.select-trip li button {\r\n\tcolor: #fff;\r\n\tfont-family: 'scandinavianblack', 'Helvetica', 'Arial', sans-serif;\r\n\tdisplay: block;\r\n\tpadding: 10px 0;\r\n\ttext-transform: uppercase;\r\n\tposition: relative;\r\n\tline-height: 12px;\r\n\twidth: 100%;\r\n\ttext-align: center;\r\n\tfont-size: 14px;\r\n\tbackground: transparent;\r\n}\r\n.select-trip li button:before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tleft: -1px;\r\n\ttop: 6px;\r\n\twidth: 1px;\r\n\theight: 20px;\r\n\tbackground: #0033cc;\r\n}\r\n.select-trip li:first-child button:before {\r\n\tdisplay: none;\r\n}\r\n\r\n.select-trip li.active:last-child button:before {\r\n\tleft: 0;\r\n}\r\n.select-trip li.active:nth-child(2) button:before {\r\n\tleft: 1px;\r\n}\r\n.select-trip li.active button,\r\n.select-trip li.active {\r\n\tbackground: #0033cc;\r\n}\r\n.select-trip li.active,\r\n.select-trip li.active button {\r\n\tcursor: default;\r\n}\r\n.passengers .icon-arrow-down-grey {\r\n    position: absolute;\r\n    width: 18px;\r\n    height: 17px;\r\n    right: 2px;\r\n    top: 24px;\r\n}\r\n.passengers .icon-arrow-down-grey.up {\r\n\t-webkit-transform: rotate(180deg);\r\n\ttransform: rotate(180deg);\r\n\tbackground-position: 3px -1156px;\r\n\tright: 3px;\r\n}\r\n.ocp-bottom-drop-2 {\r\n\tdisplay: none;\r\n}\r\n.select-passengers {\r\n\tbox-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);\r\n\tborder-radius: 4px;\r\n\tbackground: #eae9e8;\r\n\tcolor: #3f3d3a;\r\n}\r\n\r\n.touch .destination input,\r\n.touch .return-from input,\r\n.touch .return-to input,\r\n.touch .calendar-set input,\r\n.touch .passengers input{\r\n\t-webkit-border-radius: 0 !important;\r\n\tborder-radius: 0 !important;\r\n}\r\n.currency-points {\r\n\tfont-size: 16px;\r\n}\r\n\r\n@media (min-width:768px) {\r\n.select-passengers {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\twidth: 320px;\r\n\ttop: 77px;\r\n\tz-index: 1;\r\n  }\r\n}\r\n@media (min-width:768px) and (max-width:991px) {\r\n\t.select-trip {\r\n\t\tmax-width: 420px;\r\n\t}\r\n\t.cep .cep-button-wrap button {\r\n\t\tmin-width: 280px;\r\n\t\tmargin: 10px auto 0 auto;\r\n\t\tdisplay: block;\r\n \t}\r\n\t.cep-preference {\r\n\t\tpadding: 25px 0 20px 0;\r\n\t}\r\n\t.cep-preference .radio-wrap.last {\r\n\t\tmargin-right: 0;\r\n\t}\r\n}\r\n\r\n.cep .input-set input[type='text']:focus {\r\n\tborder-radius: 0;\r\n}\r\n\r\n.cep .origin.input-set input[type='text']:focus {\r\n    border-bottom-left-radius: 4px;\r\n    border-top-left-radius: 4px;\r\n}\r\n\r\n@media (min-width: 992px) {\r\n\t.cep .input-set {\r\n\t\t border-right: none;\r\n\t\t border-top: none;\r\n\t\t border-bottom: none;\r\n\t}\r\n\t.cep .input-set.passengers {\r\n\t\tborder-right: 1px solid #d5d4d1;\r\n\t}\r\n\t.cep-button-wrap .toggle-button {\r\n\t\tdisplay: none;\r\n\t}\r\n\t.cep .input-set input[type='text']:hover {\r\n\t\tbackground: #eae9e8;\r\n\t}\r\n}\r\n\r\n @media (max-width: 991px) {\r\n \t.cep-preference {\r\n\t\t padding: 0 16px 16px 16px;\r\n\t}\r\n\t.cep-preference .currency-points {\r\n\t\tmargin: 10px 0 0;\r\n\t}\r\n\t.cep-button-wrap {\r\n\t\tposition: static !important;\r\n\t\tpadding: 16px 16px 2px 16px;\r\n\t\tfloat: left;\r\n\t\twidth: 100%;\r\n\t}\r\n\t.cep .input-set.small-3 {\r\n\t\twidth: 50%;\r\n\t}\r\n\t.cep .small-3.calendar-set,\r\n\t.cep .small-3.passengers {\r\n\t\twidth: 100%;\r\n\t}\r\n\t.select-trip {\r\n\t\tmargin-top: 16px;\r\n\t}\r\n\t.cep {\r\n\t\tmargin-bottom: 16px;\r\n\t\tpadding-bottom: 20px;\r\n\t\tbackground: transparent;\r\n\t\theight: auto;\r\n\t}\r\n\t.cep,\r\n\t.cep .radius-left,\r\n\t.cep .radius-left input\t{\r\n\t\tborder-bottom-left-radius: 0;\r\n\t\tborder-top-left-radius: 0;\r\n\t\tborder-left: none;\r\n\t}\r\n\t.cep input\t{\r\n\t\t-webkit-border-radius: 0 !important;\r\n\t\tborder-radius: 0 !important;\r\n\t}\r\n\t.cep,\r\n\t.cep-wrap {\r\n\t\tpadding: 0;\r\n\t}\r\n\t.cep .input-set input[type='text'] {\r\n\t\theight: 63px;\r\n\t}\r\n\t.cep .input-set:nth-child(1) {\r\n\t\tborder-right: none;\r\n\t}\r\n\t.cep.multi-city .input-set.destination,\r\n\t.cep.multi-city .input-set.origin,\r\n\t.cep.multi-city .input-set.return-from,\r\n\t.cep.multi-city .input-set.return-to {\r\n\t\twidth: 50%;\r\n\t}\r\n\t.cep.multi-city .input-set.return-from {\r\n\t\tborder-left: none;\r\n\t\tborder-right: none;\r\n\t}\r\n\t.cep .input-set.outbound,\r\n\t.cep .input-set.passengers {\r\n\t\tborder-left: none;\r\n\t}\r\n    .cep .input-set.destination,\r\n\t.cep .input-set.return-to,\r\n\t.cep .input-set.passengers,\r\n\t.cep .input-set.inbound {\r\n\t\tborder-right: none;\r\n\t}\r\n\t.select-passengers .arrow-up,\r\n\t.cep .ocp-bottom-drop .arrow-up {\r\n\t\tdisplay: none;\r\n\t}\r\n\t.ocp-bottom-drop {\r\n\t\tbox-shadow: none;\r\n\t\tborder-radius: 0;\r\n\t\ttop: 62px;\r\n\t}\r\n\t.select-passengers {\r\n\t\twidth: 100%;\r\n\t}\r\n\t.origin .ocp-bottom-drop,  .destination .ocp-bottom-drop {\r\n\t\twidth: 201% !important;\r\n\t}\r\n\t.destination .ocp-bottom-drop {\r\n\t\tleft: -100% !important;\r\n\t\tmargin-left: -2px;\r\n\t}\r\n\t.select-passengers {\r\n\t\twidth: 100%;\r\n\t}\r\n\t.select-passengers .arrow-up,\r\n\t.cep .ocp-bottom-drop .arrow-up {\r\n\t\tborder-color: transparent transparent #e5e5e5 transparent !important;\r\n\t\tbox-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);\r\n\t}\r\n\t.cep.multi-city .calendar-wrapper {\r\n\t\ttop: 192px;\r\n\t}\r\n}\r\n\r\n@media (max-width: 991px) {\r\n\t.cep .select-passengers {\r\n\t\tfloat: left;\r\n\t\tborder-radius: 0;\r\n\t\tposition: static;\r\n\t\toverflow: hidden;\r\n\t}\r\n\t.select-passengers .arrow-up {\r\n\t\tdisplay: none !important;\r\n\t}\r\n\t.cep .col.passengers {\r\n\t\theight: auto;\r\n\t}\r\n\t.calendar-wrapper.ocp-bottom-drop-2 {\r\n\t\tposition: static;\r\n\t}\r\n}\r\n@media (max-width: 767px) {\r\n\t.cep-preference .currency-points {\r\n\t\tdisplay: none !important;\r\n\t}\r\n\t.select-trip {\r\n\t\tmax-width: none;\r\n\t}\r\n\t.select-trip li button {\r\n\t\tfont-size: 12px;\r\n\t\tpadding-top: 11px;\r\n\t\theight: 32px;\r\n\t}\r\n\t.cep .cep-button-wrap .toggle-button {\r\n\t\tdisplay: block;\r\n\t\tmargin-top: 16px;\r\n\t}\r\n\t.cep-button-wrap .toggle-button button {\r\n\t\tpadding: 0;\r\n\t}\r\n\t.cep .cep-button-wrap {\r\n\t\tpadding: 1px 16px 0 16px;\r\n\t}\r\n\t.cep-button-wrap .search-button {\r\n\t\tfont-size: 16px;\r\n\t}\r\n}\r\n.airport-list {\r\n\tpadding: 10px 0;\r\n\toverflow-y: auto;\r\n\tmax-height: 350px;\r\n}\r\n.airport-list li {\r\n\tpadding: 4px 15px 0 15px;\r\n}\r\n.airport-list li .country {\r\n\tmargin: 0;\r\n\tfont-size: 12px;\r\n\tcolor: #8a8479;\r\n\tpadding-left: 0;\r\n}\r\n.airport-list li:hover {\r\n\tbackground: #d5d4d1;\r\n\tcursor: pointer;\r\n}\r\n.airport-list .main-airport {\r\n\tmin-height: 44px;\r\n}\r\n.airport-list .city-name {\r\n\tfont-family: 'scandinavianbold', 'Arial', 'Helvetica', sans-serif;\r\n}\r\n.airport-list .city-airport-country {\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    max-width: 266px;\r\n    white-space: nowrap;\r\n    float: left;\r\n    width: 100%;\r\n}\r\n.airport-list .sub-airport .city-airport-country {\r\n\tmax-width: 270px;\r\n}\r\n.airport-list .sub-airport,\r\n.airport-list .all-airport-country{\r\n    position: relative;\r\n    padding: 3px 15px 3px 31px;\r\n}\r\n.airport-list .all-airport-country:hover{\r\n\tbackground-color: #eae9e8;\r\n\tcursor: default;\r\n}\r\n.airport-list .sub-airport:before {\r\n    background: url("+n(28)+") no-repeat right -3373px;\r\n    content: '';\r\n    width: 12px;\r\n    height: 12px;\r\n    display: block;\r\n    left: 13px;\r\n    top: 8px;\r\n    position: absolute;\r\n}\r\n.airport-list li.all-airport {\r\n    padding: 3px 15px 3px 15px;\r\n}\r\n.airport-list li[aria-selected='true'] {\r\n    background: #d5d4d1;\r\n}\r\n\r\n@media (max-width: 500px) {\r\n\t.airport-list .city-airport-country {\r\n\t\tmax-width: 224px;\r\n\t}\r\n\t.airport-list .sub-airport .city-airport-country {\r\n\t\tmax-width: 224px;\r\n\t}\r\n}\r\n.displayNone{\r\n   display: none !important;\r\n}\r\n.displayBlock{\r\n   display: block !important;\r\n}\r\n.sr-only {\r\n\tposition: absolute;\r\n\twidth: 1px;\r\n\theight: 1px;\r\n\tpadding: 0;\r\n\tmargin: -1px;\r\n\toverflow: hidden;\r\n\tclip: rect(0, 0, 0, 0);\r\n\tborder: 0;\r\n}\r\n.sr-payoptions.sr-only {\r\n\tcolor: #767676;\r\n}\r\n.ocp-bottom-drop .geolocation {\r\n\tpadding: 15px 15px 10px 15px;\r\n}\r\n.ocp-bottom-drop .geolocation span {\r\n\tdisplay: inline-block;\r\n\twidth: 40px;\r\n}\r\n.ocp-bottom-drop .geolocation a{\r\n\tcolor: #3f3d3a;\r\n\ttext-decoration: underline;\r\n}\r\n",""])},function(t,e,n){t.exports=n.p+"./images/sprite.svg"},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var a;return a=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(a)+")"})}},function(t,e,n){var i=n(31);"string"==typeof i&&(i=[[t.i,i,""]]);var r={};r.transform=void 0;n(11)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(10)(void 0),e.push([t.i,"body {\r\n\t-webkit-overflow-scrolling: auto;\r\n}\r\n.calendar-wrapper {\r\n\tposition: absolute;\r\n\tleft: 18%;\r\n\ttop: 77px;\r\n\tborder-radius: 4px;\r\n\tbackground: #fff;\r\n\twidth: 720px;\r\n\tz-index: 1;\r\n\tbox-shadow: 0 4px 12px 0 #3f3d3a;\r\n}\r\n\r\n.calendar-wrapper table {border-collapse: separate;}\r\n\r\n.calendar-set.input-set {\r\n\tborder-left: none;\r\n\tborder-top: none;\r\n}\r\n\r\n.calendar-set .icon-calendar {\r\n\tposition: absolute;\r\n\tright: 7px;\r\n\ttop: 7px;\r\n\tmargin: 0;\r\n}\r\n\r\n.calendar-tab-content {\r\n\tdisplay: none;\r\n\twidth: 100%;\r\n\tfloat: left;\r\n\tposition: relative;\r\n}\r\n.calendar-tab-content.active { display: block;}\r\n\r\n.calendar-wrapper .calendar-inner {\r\n\tbackground: #eae9e8;\r\n\tfloat: left;\r\n\twidth: 100%;\r\n\tmin-height: 250px;\r\n}\r\n.calendar-wrapper table {\r\n\tfloat: left;\r\n\twidth: 100%;\r\n}\r\n\r\n@media screen\\0, (-ms-high-contrast: none), (-ms-high-contrast: active) {\r\n.calendar-wrapper table td:hover,\r\n.calendar-wrapper table td:focus {background: #eae9e8;}\r\n}\r\n\r\n@media (min-width: 768px) and (pointer: fine) {\r\n .calendar-wrapper table td:hover,\r\n.calendar-wrapper table td:focus {background: #eae9e8;}\r\n}\r\n.calendar-wrapper table td.start-date,\r\n.calendar-wrapper table td.end-date {\r\n\tbackground: #0195ff;\r\n\tcolor: #fff;\r\n    border-color: #4ab3ff;\r\n}\r\n.calendar-wrapper table td.start-date:hover,\r\n.calendar-wrapper table td.end-date:hover {\r\n    border-color: #4ab3ff;\r\n}\r\n.calendar-wrapper table td.before-start-date:hover {\r\n\tbackground: #eae9e8;\r\n\tborder-color: #eae9e8;\r\n}\r\n.calendar-wrapper td.before-start-date:hover span.date {color: #3f3d3a !important;}\r\n\r\n.calendar-wrapper table td.date-range:hover {\r\n\tbackground: #7fccff;\r\n\tcursor: pointer;\r\n}\r\n\r\n.calendar-wrapper table td.date-range:hover {\r\n    border-color: #74c1f3;\r\n}\r\n\r\n.calendar-wrapper table td.date-range {\r\n\tbackground: #7fccff;\r\n\tcolor: #fff;\r\n    border-color: #74c1f3;\r\n\tcursor: default;\r\n}\r\n\r\n.calendar-wrapper table td.start-date:before {\r\n\tcontent: '';\r\n    height: 40px;\r\n    width: 4px;\r\n    background: #0079ff;\r\n    position: absolute;\r\n    left: -4px;\r\n    top: 0;\r\n\tborder-bottom-left-radius: 4px;\r\n\tborder-top-left-radius: 4px;\r\n\tz-index: 1;\r\n}\r\n\r\n.calendar-wrapper table td.end-date:after {\r\n    content: '';\r\n    height: 40px;\r\n    width: 4px;\r\n    background: #0079ff;\r\n    position: absolute;\r\n    right: -4px;\r\n    top: 0;\r\n    border-bottom-right-radius: 4px;\r\n    border-top-right-radius: 4px;\r\n    z-index: 1;\r\n}\r\n\r\n.calendar-wrapper table td.start-date.one-way-date:before {display:none;}\r\n\r\n.calendar-wrapper td.date-range a,\r\n.calendar-wrapper td.date-range span,\r\n.calendar-wrapper td.start-date a,\r\n.calendar-wrapper td.start-date span,\r\n.calendar-wrapper td.end-date a,\r\n.calendar-wrapper td.end-date span,\r\n.calendar-wrapper td.selected-td span.date,\r\n.calendar-wrapper td.selected-td .price { color:#fff !important;}\r\n\r\n\r\n.calendar-wrapper .regular-calendar  caption {\r\n\tfont-size: 20px;\r\n\tpadding: 10px 0 0 0;\r\n\tfont-family: 'scandinavianblack','Helvetica','Arial', sans-serif;\r\n\tcolor: #3f3d3a;\r\n\tposition: relative;\r\n\ttext-transform: uppercase;\r\n}\r\n\r\n.calendar-wrapper th {\r\n\tbackground: #fff;\r\n\tfont-weight: bold;\r\n\tpadding: 10px 0;\r\n\tfont-size: 12px;\r\n\tcolor: #bfbcb5;\r\n\theight: 40px;\r\n}\r\n\r\n.calendar-wrapper tr:first-child td {border-top:1px solid #eae9e8;}\r\n.calendar-wrapper td.head-left {\r\n\tfont-size: 14px;\r\n\tcolor: #a7a299;\r\n}\r\n\r\n.calendar-wrapper th:first-child { border-left: 1px solid transparent;}\r\n\r\n.calendar-wrapper th:last-child { border-top-right-radius: 4px;}\r\n\r\n.calendar-wrapper tr:last-child td:first-child,\r\n.calendar-wrapper tr:last-child td:first-child:hover { border-bottom-left-radius: 4px;}\r\n.regular-calendar tr:first-child td:last-child { border-top-right-radius: 4px;}\r\n.regular-calendar tr:first-child td:first-child { border-top-left-radius: 4px;}\r\n\r\n/* Commented by the following to avoid the jerk on hover */\r\n/*\r\n/*.calendar-wrapper .regular-calendar tr:first-child td:first-child:hover,\r\n.calendar-wrapper .regular-calendar tr:first-child td:last-child:hover,\r\n.calendar-wrapper tr:last-child td:first-child:hover { border:none}*/\r\n.calendar-wrapper tr:last-child td:last-child { border-bottom-right-radius:4px;}\r\n\r\n.calendar-wrapper td {\r\n\tbackground: #fff;\r\n\twidth: 55px;\r\n\theight: 40px;\r\n\tposition: relative;\r\n\tborder-bottom: 1px solid #eae9e8;\r\n\tborder-right: 1px solid #eae9e8;\r\n\ttext-align: center;\r\n\tvertical-align: middle;\r\n\tcursor: pointer;\r\n}\r\n.calendar-wrapper tbody td .date {\r\n\tposition: absolute;\r\n\tleft: 3px;\r\n\ttop: 1px;\r\n\tfont-size: 10px;\r\n\tcolor: #b6b5b3;\r\n}\r\n.calendar-wrapper tbody { border-radius: 10px; }\r\n.calendar-tab {\r\n\tpadding: 20px 20px 40px 20px;\r\n\theight: 56px;\r\n}\r\n.calendar-tab li {\r\n\tdisplay: inline-block;\r\n\tpadding: 0 20px 0 0;\r\n}\r\n.calendar-tab li a { color: #3f3d3a;}\r\n.calendar-tab li .active { border-bottom: 2px solid #0099ff;}\r\n\r\n.calendar-footer  {\r\n\tmin-height: 56px;\r\n\twidth: 100%;\r\n\tfloat: left;\r\n\tpadding: 10px 14px 10px 20px;\r\n\tposition: relative;\r\n    border-bottom-left-radius: 4px;\r\n    border-bottom-right-radius: 4px;\r\n}\r\n\r\n.calendar-footer.gradient {\r\nbackground: rgba(214,212,207,.95);\r\nbackground: -moz-linear-gradient(top, rgba(214,212,207,.95) 0, rgba(214,212,207,1) 0, rgba(235,234,230,1) 15%,\r\n\t\t  rgba(235,234,230,1) 16%, rgba(234,233,232,1) 100%);\r\nbackground: -webkit-gradient(left top, left bottom, color-stop(0, rgba(214,212,207,.95)),\r\n\t\t   color-stop(0, rgba(214,212,207,1)), color-stop(15%, rgba(235,234,230,1)),\r\n\t\t   color-stop(16%, rgba(235,234,230,1)), color-stop(100%, rgba(234,233,232,1)));\r\nbackground: -webkit-linear-gradient(top, rgba(214,212,207,.95) 0, rgba(214,212,207,1) 0, rgba(235,234,230,1) 15%,\r\n\t\t rgba(235,234,230,1) 16%, rgba(234,233,232,1) 100%);\r\nbackground: -o-linear-gradient(top, rgba(214,212,207,.95) 0, rgba(214,212,207,1) 0, rgba(235,234,230,1) 15%,\r\n\t\t rgba(235,234,230,1) 16%, rgba(234,233,232,1) 100%);\r\nbackground: -ms-linear-gradient(top, rgba(214,212,207,.95) 0, rgba(214,212,207,1) 0, rgba(235,234,230,1) 15%,\r\n\t\t rgba(235,234,230,1) 16%, rgba(234,233,232,1) 100%);\r\nbackground: linear-gradient(to bottom, rgba(214,212,207,.95) 0, rgba(214,212,207,1) 0, rgba(235,234,230,1) 15%,\r\n\t\t rgba(235,234,230,1) 16%, rgba(234,233,232,1) 100%);\r\n/* filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d6d4cf', endColorstr='#eae9e8', GradientType=0);\r\n */}\r\n.calendar-footer .flights-filter,\r\n.calendar-footer .flights-filter li { float:left;}\r\n.calendar-footer .flights-filter li {\r\n    position: relative;\r\n    padding: 0 10px 0 28px;\r\n    margin-top: 8px;\r\n}\r\n\r\n.calendar-wrapper .dropdown-native .arrow-down.up {transform: rotate(180deg); }\r\n\r\n.calendar-wrapper .calendar-head {\r\n\theight: 40px;\r\n\twidth: 100%;\r\n\tborder-bottom: 1px solid #eae9e8;\r\n}\r\n.calendar-wrapper .calendar-head h3 {\r\n\tfont-size: 14px;\r\n\tpadding: 12px 10px 0 12px;\r\n\tfont-weight: normal;\r\n\tcolor: #a7a299;\r\n}\r\n.calendar-wrapper .dropdown-native .selected-value {\r\n\t/*top: 10px;*/\r\n\tleft: 0;\r\n\tpadding: 10px 40px 10px 0;\r\n\tcolor: #3f3d3a;\r\n\ttext-align: right;\r\n\tline-height: 22px;\r\n}\r\n\r\n.calendar-wrapper .left-calendar ,\r\n.calendar-wrapper .right-calendar {\r\n\t-webkit-tap-highlight-color: transparent;\r\n}\r\n\r\n.calendar-wrapper .regular-calendar .left-calendar { padding:0 3px 15px 14px;}\r\n.calendar-wrapper .regular-calendar .right-calendar { padding:0 16px 10px 13px;}\r\n\r\n.calendar-wrapper .lpc .left-calendar { padding:0 8px 0 0;}\r\n.calendar-wrapper .lpc .right-calendar{ padding:0 0 0 8px;}\r\n.calendar-wrapper .calendar-shadow {\r\n\tbox-shadow: 0 2px 4px 0 #bfbcb5;\r\n\tfloat: left;\r\n\twidth: 100%;\r\n\tborder-radius: 4px;\r\n\tbackground: #fff;\r\n}\r\n.calendar-wrapper .calendar-shadow:hover {box-shadow: 0 6px 12px 0 #bfbcb5;}\r\n.calendar-shadow.one-way-only {\r\n    border: 1px solid #bfbcb5;\r\n    height: 280px;\r\n    background: transparent;\r\n    box-shadow: none;\r\n    text-align: center;\r\n    padding-top: 37%;\r\n}\r\n\r\n.calendar-shadow.one-way-only .calendar-head,\r\n.calendar-shadow.one-way-only table,\r\n.one-way-link{ display: none;}\r\n\r\n.calendar-shadow.one-way-only .one-way-link { display: inline-block;}\r\n\r\n.calendar-tab-content.lpc { padding: 0 16px;}\r\n\r\n.lpc tr:last-child td,\r\n.lpc tr:last-child td:hover { border-bottom: none;}\r\n\r\n.lpc tr td:last-child,\r\n.lpc tr td:last-child:hover { border-right: none;}\r\n\r\n.calendar-wrapper .dropdown-native {\r\n\tmin-width: 110px;\r\n    max-width: 130px;\r\n\tbackground: transparent;\r\n}\r\n.calendar-wrapper .dropdown-native .arrow-down {\r\n   /* background: url(../images/sprite.svg) no-repeat 0 -1156px;*/\r\n    position: absolute;\r\n    width: 16px;\r\n    height: 17px;\r\n    right: 11px;\r\n    top: 12px;\r\n}\r\n\r\n.regular-calendar table td:first-child {border-left: 1px solid #eae9e8;}\r\n.regular-calendar-inner {\r\n\twidth: 100%;\r\n\tfloat: left;\r\n\tbackground: #fff;\r\n}\r\n.regular-calendar .arrow-left, .regular-calendar .arrow-right {\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\twidth: 25px;\r\n\theight: 25px;\r\n}\r\n.calendar-wrapper .arrow-left,\r\n.regular-calendar .arrow-right {\r\n\ttop: 12px;\r\n\tz-index: 2;\r\n}\r\n\r\n.calendar-wrapper .arrow-left {left: 21px;}\r\n.regular-calendar .arrow-right {right: 0;}\r\n\r\n.regular-calendar .calendar-head { visibility: hidden;}\r\n\r\n.regular-calendar tbody td .date {\r\n\tposition: static;\r\n\ttext-align: center;\r\n}\r\n\r\n.flights-filter li:before {\r\n    content: '';\r\n    width: 16px;\r\n    height: 16px;\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    border: 1px solid #0033cc;\r\n\tborder-radius: 2px;\r\n}\r\n\r\n.flights-filter li.booked-flights:before {border: 1px solid #30a030;}\r\n.flights-filter .holidays:before {\r\n\tborder: 1px solid #ff4338;\r\n}\r\n\r\n.flights-filter li a {\r\n    color: #3f3d3a;\r\n    font-size: 12px;\r\n    margin-top: 1px;\r\n    float: left;\r\n}\r\n\r\n.calendar-footer .total-amount {\r\n    float: right;\r\n    color: #3f3d3a;\r\n    padding: 4px 0 0 0;\r\n\t/*display:none*/\r\n}\r\n\r\n.calendar-footer .total-amount button {\r\n    min-width: 100px;\r\n    margin-left: 7px;\r\n}\r\n\r\n\r\n.calendar-footer .flights-filter .booked-flights,\r\n.calendar-footer .flights-filter .direct-flights { display: none;}\r\n.calendar-footer .show { display: block !important;}\r\n\r\n.calendar-wrapper table td.past-day:hover,\r\n.calendar-wrapper table td.past-day:focus,\r\n.calendar-wrapper table td.future-day:hover,\r\n.calendar-wrapper table td.future-day:focus,\r\n.calendar-wrapper table td.disable-date,\r\n.calendar-wrapper table td.disable-date:hover{\r\n    background: none;\r\n\tborder-color: #eae9e8;\r\n\tcursor: default;\r\n}\r\n.calendar-wrapper table td.disable-date,\r\n.calendar-wrapper table td.disable-date:hover,\r\n.calendar-wrapper td.disable-date:hover span { color: #eae9e8 !important;}\r\n\r\n\r\n.calendar-wrapper  tr:first-child td.past-day:first-child:hover,\r\n.calendar-wrapper  tr:first-child td.future-day:first-child:hover,\r\n.calendar-wrapper  tr:first-child td.disable-date:first-child:hover {border: 1px solid #eae9e8;}\r\n\r\n.calendar-wrapper  tr:last-child td.past-day:first-child:hover,\r\n.calendar-wrapper  tr:last-child td.future-day:first-child:hover,\r\n.calendar-wrapper  tr:last-child td.disable-date:first-child:hover {\r\n\tborder-bottom: 1px solid #eae9e8;\r\n\tborder-right: 1px solid #eae9e8;\r\n\tborder-left: 1px solid #eae9e8;\r\n}\r\n\r\n.calendar-wrapper  tr:first-child td.past-day:last-child:hover,\r\n.calendar-wrapper  tr:first-child td.future-day:last-child:hover,\r\n.calendar-wrapper  tr:first-child td.disable-date:last-child:hover {\r\n\tborder-bottom: 1px solid #eae9e8;\r\n\tborder-right: 1px solid #eae9e8;\r\n\tborder-top: 1px solid #eae9e8;\r\n}\r\n\r\n.calendar-wrapper  tr:last-child td.past-day:last-child:hover,\r\n.calendar-wrapper  tr:last-child td.future-day:last-child:hover,\r\n.calendar-wrapper  tr:last-child td.disable-date:last-child:hover {\r\n\tborder-bottom: 1px solid #eae9e8;\r\n\tborder-right: 1px solid #eae9e8;\r\n}\r\n\r\n.calendar-wrapper table td.disable-date span {\r\n    color: #d5d4d1;\r\n}\r\n\r\n.prev-month.disabled,\r\n.next-month.disabled {\r\n\topacity: .3;\r\n\tpointer-events: none;\r\n}\r\n\r\ntd.past-day,\r\ntd.future-day,\r\ntd.disable-date {\r\n    pointer-events: none;\r\n}\r\n.holiday-tool-tip {\r\n    position: absolute;\r\n    z-index: 3;\r\n    bottom: 18px;\r\n    left: 50%;\r\n    padding: 4px 4px;\r\n    min-width: 50px;\r\n    max-width: 300px;\r\n    height: 26px;\r\n    border-radius: 4px;\r\n    filter: drop-shadow(0 0 4px #d5d4d1);\r\n    background: #fff;\r\n    border: 1px solid #eae9e8;\r\n    transform: translateX(-50%) translatey(-50%);\r\n}\r\n\r\n.holiday-tool-tip p {\r\n    position: relative;\r\n    margin: 0;\r\n    display: block;\r\n    width: 100%;\r\n    text-align: center;\r\n    color: #3f3d3a;\r\n    font-size: 12px;\r\n    line-height: 15px;\r\n    white-space: nowrap;\r\n}\r\n\r\n.holiday-tool-tip::after {\r\n    position: absolute;\r\n    z-index: 3;\r\n    left: calc(50% - 8px);\r\n    bottom: -8px;\r\n    content: ' ';\r\n    height: 0;\r\n    width: 0;\r\n    transform: rotate(180deg) !important;\r\n    border-style: solid;\r\n    border-width: 0 8px 8px 8px;\r\n    border-color: transparent transparent #fff transparent;\r\n    -webkit-transform: translateX(-50%) translatey(-50%);\r\n    -moz-transform: translateX(-50%) translatey(-50%);\r\n}\r\n\r\n.holiday-tool-tip p span{\r\n    float: none;\r\n    margin-right: 4px;\r\n    padding: 4px;\r\n}\r\n.filter-mark .filter-mark-wrap { display:block;}\r\n.filter-tool-tip .holiday-tool-tip { display:block !important;}\r\n\r\n.filter-mark-wrap {\r\n\tposition: absolute;\r\n\tright: 1px;\r\n\ttop: 3px;\r\n\tz-index: 2;\r\n\tdisplay: none;\r\n\theight: 6px;\r\n}\r\n\r\n.direct-flight-mark, .holiday-mark {\r\n    width: 6px;\r\n    height: 6px;\r\n    z-index: 10;\r\n    border-radius: 50%;\r\n    display: inline-block;\r\n    float: left;\r\n    margin-right: 2px;\r\n}\r\n.holiday-mark {background: #ff4338;}\r\n.direct-flight-mark {background: #09f;}\r\n\r\n@media (min-width: 992px) {\r\n\t.calendar-wrapper .calendar-inner {\r\n\t\tborder-radius: 4px;\r\n\t}\r\n}\r\n\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n\t.calendar-wrapper .regular-calendar .right-calendar { padding: 0 8px 10px 8px !important; }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n\t.calendar-footer .mobile-button { display: none;}\r\n\t.calendar-wrapper tbody td a, .regular-calendar tbody td .date {\r\n\tcolor: #3f3d3a;\r\n\tfont-size: 12px;\r\n\tfont-weight: bold;\r\n\t}\r\n.lpc.resize-price tbody td a {\r\n\tfont-size: 10px;\r\n}\r\n}\r\n\r\n@media (max-width: 991px) {\r\n\t.holiday-tool-tip p::after{left: 10px;}\r\n\t.holiday-tool-tip {left: 0;}\r\n\t.calendar-wrapper {\r\n\t\tleft: -200%;\r\n\t\twidth: 736px;\r\n\t\tbox-shadow: none;\r\n\t\tborder-radius: 0;\r\n\t\ttop: 128px;\r\n\t}\r\n\r\n   .calendar-wrapper .regular-calendar .left-calendar { padding: 0 8px 15px 8px;}\r\n   .calendar-tab-content.lpc { padding: 0 8px;}\r\n   .calendar-wrapper {\r\n\t\tleft: 0;\r\n\t\twidth: 100%;\r\n\t}\r\n\t.calendar-wrapper .calendar-head { width: 100%; }\r\n\t.calendar-footer {\r\n\t\tborder-bottom-left-radius: 0;\r\n\t\tborder-bottom-right-radius: 0;\r\n\t}\r\n}\r\n\r\n@media (max-width: 767px) {\r\n\t.regular-calendar-footer { display: none !important;}\r\n\t.calendar-wrapper .calendar-shadow,\r\n\t.calendar-wrapper .calendar-shadow:hover {\r\n\t\tbox-shadow: none !important;\r\n\t}\r\n\t.calendar-footer .total-amount { padding-top: 10px;}\r\n\t.calendar-footer .total-amount button,\r\n\t.regular-calendar .right-calendar { display:none;}\r\n\t.calendar-footer  {\r\n\t\tpadding: 0 16px 10px 16px;\r\n\r\n\t}\r\n\t.calendar-footer .mobile-button {\r\n\t\twidth: 100%;\r\n\t\tfloat: left;\r\n\t\tpadding: 20px 0 10px 0;\r\n\t}\r\n\t.calendar-wrapper .left-calendar,  .calendar-wrapper .right-calendar,  .calendar-wrapper table {\r\n\t\twidth: 100%;\r\n\t\tpadding: 0;\r\n\t}\r\n\t.calendar-wrapper .lpc .left-calendar,\r\n   .calendar-wrapper .lpc .right-calendar { padding: 0;}\r\n   .calendar-wrapper .lpc .left-calendar { padding-bottom: 15px;}\r\n   .calendar-wrapper .lpc {\r\n\t  padding-bottom: 10px;\r\n\t  -webkit-appearance: none;\r\n\t -moz-appearance: none;\r\n\t appearance: none;\r\n }\r\n\t.calendar-wrapper tbody td a, .regular-calendar tbody td .date{\r\n\tcolor: #3f3d3a;\r\n\tfont-size: 10px;\r\n\tfont-weight: bold;\r\n}\r\n.lpc.resize-price tbody td a{\r\n\tfont-size: 9px;\r\n}\r\n}\r\n\r\n\r\n.flights-filter li.show:before {\r\n    display: none;\r\n}\r\n\r\n.flights-filter li.show {\r\n    color: #3f3d3a;\r\n    padding: 0 8px 0 0;\r\n    font-size: 12px;\r\n    margin-top: 9px;\r\n}\r\n.lpc-loader {\r\n   position: absolute;\r\n    background: #fff;\r\n    width: 100%;\r\n    height: 199px;\r\n    z-index: 3;\r\n    border-radius: 4px;\r\n    left: 0;\r\n    top: 81px;\r\n}\r\n.lpc-loader p{\r\n    width: 100%;\r\n    color: #3f3d3a;\r\n    word-wrap: normal;\r\n    white-space: nowrap;\r\n    text-align: center;\r\n    position: absolute;\r\n    font-size: 14px;\r\n    top: calc(50% - 50px);\r\n}\r\n.lpc-loader-maxHeight{\r\n height: 239px;\r\n}\r\n#lpc{\r\nmin-height: 320px;\r\n}\r\n.lpc-maxloaderContainer{\r\nmin-height: 370px !important;\r\n}\r\n/** chnage from sai branch*/\r\n\r\n.calendar-wrapper table td.disable-inbound-date,\r\n.calendar-wrapper table td.disable-inbound-date:hover{\r\n    background: none;\r\n\tborder-color: #eae9e8;\r\n\tcursor: default;\r\n}\r\n\r\n.calendar-wrapper td.disable-inbound-date .price,\r\n.calendar-wrapper td.disable-inbound-date:hover,\r\n.calendar-wrapper td.disable-inbound-date:hover span,\r\n.calendar-wrapper td.disable-inbound-date:hover a { color: #d5d4d1 !important;}\r\n.calendar-wrapper td.disable-inbound-date span,\r\n.calendar-wrapper td.disable-inbound-date a {\r\n    color: #bfbcb5;\r\n}\r\n\r\ntd.disable-inbound-date {\r\n    pointer-events: none;\r\n\tcursor: default;\r\n}\r\ntd.disable-inbound-date.filter-mark .filter-mark-wrap,\r\ntd.disable-date.filter-mark .filter-mark-wrap{ display: none; }\r\n\r\n.calendar-wrapper table td.selected-td {\r\n \tbackground: #0195ff;\r\n \tcolor: #fff;\r\n     border-color: #0195ff;\r\n }\r\n .calendar-wrapper table td.selected-td-error {\r\n\tborder: 1px solid red !important;\r\n}\r\n\r\n .calendar-wrapper select{\r\n \tcursor: pointer;\r\n \t/*display:none*/\r\n }\r\n .calendar-wrapper select.disabled {\r\n /*opacity: 0.3;*/\r\n \tpointer-events: none;\r\n\t cursor: default;\r\n }\r\n.calendar-head select {\r\n    font-size: 13px;\r\n    padding: 0;\r\n    position: relative;\r\n    z-index: 2;\r\n\tmin-height: 40px;\r\n    max-height: 40px;\r\n    cursor: pointer;\r\n}\r\n.calendar-shadow.one-way-only .one-way-link.disabled {\r\n    color: #ccc;\r\n    pointer-events: none;\r\n\tcursor: default;\r\n}\r\n\r\n.calendar-wrapper tbody td .price {\r\n    white-space: nowrap;\r\n}\r\n.calendar-position-static{\r\n\tposition: static;\r\n}\r\n#lpc .dropdown-native .selected-value {\r\n\tright: 0;\r\n\ttop: 0;\r\n\theight: 100%;\r\n\twhite-space: nowrap;\r\n\ttext-align: left;\r\n\tpadding-left: 5px;\r\n\ttext-transform: uppercase;\r\n}\r\n.disable-lpc{\r\ncolor: #d5d4d1 !important;\r\npointer-events: none;\r\ncursor: default;\r\n}\r\n.bgcolor-on-content{\r\nbackground: #006;\r\n}\r\n/*IE9 and plus */\r\n@media screen and (min-width:0\\0) and (min-resolution: +72dpi) {\r\n  .calendar-head select {\r\n\t  width: auto;\r\n\t  height: auto;\r\n\t  padding: 0;\r\n\t  margin: 0 20px 0 0;\r\n\t  position: relative;\r\n\t  z-index: 2;\r\n\t  float: right;\r\n\t}\r\n}\r\n.calendar-footer .total-amount button.secondary.disabled {\r\n    min-width: 100px;\r\n    margin-left: 7px;\r\n    background: transparent !important;\r\n    border: 1px solid #bfbcb5 !important;\r\n    color: #bfbcb5;\r\n}\r\n",""])},function(t,e,n){var i=n(33);"string"==typeof i&&(i=[[t.i,i,""]]);var r={};r.transform=void 0;n(11)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(10)(void 0),e.push([t.i,".pay-with {\r\n    max-width: 900px;\r\n     margin: 0 auto;\r\n}\r\n.pay-with-row {\r\n    min-height: 120px;\r\n    float: left;\r\n    width: 100%;\r\n    padding: 20px 73px 20px 20px;\r\n    background: #0030d0;\r\n    color: #fff;\r\n    position: relative;\r\n\tborder-radius: 4px;\r\n\toverflow: hidden;\r\n\tmargin-bottom: 15px;\r\n}\r\n.pay-with-row h2{ font-size: 25px;}\r\n.pay-with-row h2 { margin: 0;}\r\n.pay-with-row p { text-align: left;}\r\n.pay-with-row li {\r\n    width: 50%;\r\n    float: left;\r\n    position: relative;\r\n    padding: 0 10px 0 20px;\r\n}\r\n.sar-btn-wrap {\r\n\tbackground-color: #09f;\r\n    position: absolute;\r\n    right: 0;\r\n    top: 0;\r\n    z-index: 1;\r\n    height: 100%;\r\n    display: block;\r\n    width: 73px;\r\n}\r\n.sar-btn {\r\n    width: 100%;\r\n    height: 100%;\r\n    display: block;\r\n    position: relative;\r\n}\r\n.sar-btn span.icon-sar-select {\r\n    background-position: -301px -2800px;\r\n\twidth: 16px;\r\n\theight: 24px;;\r\n    display: block;\r\n    width: 16px;\r\n    height: 24px;\r\n    left: 50%;\r\n    top: 52%;\r\n    transform: translate(-50%, -50%);\r\n    -ms-transform: translate(-50%, -50%);\r\n    -webkit-transform: translate(-50%, -50%);\r\n    position: absolute;\r\n}\r\n.pay-with-row li:before {\r\n    content: '';\r\n    margin-right: 8px;\r\n    margin-bottom: 2px;\r\n    display: inline-block;\r\n    width: 8px;\r\n    height: 8px;\r\n    background-color: #09f;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    left: 4px;\r\n    top: 6px;\r\n}\r\n.pay-with-footer {\r\n    padding: 10px 16px;\r\n    clear: both;\r\n    float: left;\r\n}\r\n.pay-with-footer li {\r\n    font-size: 12px;\r\n    color: grey;\r\n    float: left;\r\n    width: 50%;\r\n    padding: 0 20px 0 8px;\r\n    position: relative;\r\n}\r\n.pay-with-footer li:before {\r\n    content: '\\2022';\r\n    color: silver;\r\n    position: absolute;\r\n    left: 0;\r\n}\r\n.pay-with-footer p { text-align: left;}\r\n.vbr-link {\r\n    text-align: right;\r\n    width: 100%;\r\n    float: left;\r\n}\r\n.vbr-link a { display: inline-block;}\r\n.vbr-link img {margin: 18px 0 -20px 0;}\r\n.pay-with-main h3.main-head,\r\n.pay-with-row p,\r\n.pay-with-row h2  { color: #fff;}\r\n\r\n.wrapper.pay-with-main { overflow: hidden;}\r\n@media (max-width: 767px) {\r\n\t.vbr-link {\r\n        text-align: center;\r\n        margin: 10px 0 20px 0;\r\n        float: none;\r\n        padding: 0 16px;\r\n    }\r\n\t.vbr-link a {\r\n\t\twidth: 100%;\r\n\t\tdisplay: block;\r\n\t\tposition: relative;\r\n\t\tbackground-color: #020148;\r\n\t\tborder-radius: 4px;\r\n\t}\r\n\t.vbr-link img { margin: 0;}\r\n\t.pay-with-footer li,\r\n\t.pay-with-row li { width: 100%;}\r\n\t.sar-btn span.icon-sar-select { display: none;}\r\n\t.sar-btn-wrap {\r\n\t\tbackground-color: #0099ff;\r\n\t\tposition: static;\r\n\t\tdisplay: block;\r\n\t\twidth: 100%;\r\n\t\theight: 40px;\r\n\t\tfloat: left;\r\n\t\tborder-radius: 4px;\r\n\t\tmargin-top: 20px;\r\n\t}\r\n\t.sar-btn-wrap .sar-btn {\r\n\t\tcolor: #fff;\r\n\t\ttext-align: center;\r\n\t\tpadding: 10px 0 0 0;\r\n\t\tfont-family: 'scandinavianblack', 'Arial','Helvetica', sans-serif;\r\n\t}\r\n    .pay-with-row { padding: 20px 16px;}\r\n\t.pay-with-main h2,\r\n\t.pay-with-row p { float: left;}\r\n\t.pay-with-row p { padding: 5px 0 0 8px;}\r\n    .pay-with-main h2 { font-size: 20px;}\r\n}\r\n",""])},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(6),r=n(17),a=function(){function t(t,e){this.target=t,this.config=e,this.$target=$(t);var n=r.default.config;this.config=$.extend(n,e),this.cepController=new i.default(this.$target,this.config)}return t.prototype.onCustomerLogin=function(){this.cepController.checkForValidLogin()},t.prototype.updatePassengerInCep=function(t){this.cepController.updatepaxInView(t)},t.prototype.onCustomerLogout=function(){this.cepController.updateCepOnLogout()},t.prototype.showLPC=function(t,e){this.cepController.showLPC(t,e)},t.prototype.updateCEPDate=function(t,e){this.cepController.updateCEPDate(t,e)},t.prototype.updateBookingFlow=function(t){this.cepController.updateBookingFlow(t)},t.prototype.updateDefaultAirport=function(t){this.cepController.updateDefaultAirport(t)},t}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(36),r=n(37),a=n(56),o=n(6),s=n(4),d=n(0),l=function(){function t(t,e,n){this.controller=t,this.$target=e,this.config=n,this.initilaize()}return t.prototype.initilaize=function(){var t=this;this.$target.html(i),this.preferencesView=new r.default(this,this.$target),this.fieldsView=new a.default(this,this.$target,this.config),this.translation=d.default.getInstance();var e;window;$(window).on("touchend click",function(n){!0!==e&&t.resetInputStyle(n)}).on("touchmove",function(t){e=!0}).on("touchstart",function(){e=!1}),this.registerEventForCallBackOnCEPFocus()},t.prototype.registerEventForCallBackOnCEPFocus=function(){var t=this;$(document).on("cepFocused",function(){t.config.onCEPFocused&&t.config.onCEPFocused(!0)}),$(document).on("cepDeFocused",function(){t.config.onCEPFocused&&t.config.onCEPFocused(!1)})},t.prototype.changeTripType=function(t){this.$target.find("#cep").removeClass("one-way round-trip multi-city").addClass(t),this.fieldsView.onTripTypeChange(t)},t.prototype.showError=function(t){var e=this.translation.getTranslations();switch(t){case o.FieldType.ORIGIN:this.fieldsView.onDFieldView.$ondFields.$origin.removeError(),this.fieldsView.onDFieldView.$ondFields.$destination.removeError(),this.fieldsView.onDFieldView.$ondFields.$returnFrom.removeError(),this.fieldsView.onDFieldView.$ondFields.$origin.setError(e["cep.message.emptyorigin"]),this.fieldsView.onDFieldView.$ondFields.$origin.showError();break;case o.FieldType.DESTINATION:this.fieldsView.onDFieldView.$ondFields.$origin.removeError(),this.fieldsView.onDFieldView.$ondFields.$destination.removeError(),this.fieldsView.onDFieldView.$ondFields.$returnFrom.removeError(),this.fieldsView.onDFieldView.$ondFields.$destination.setError(e["cep.message.emptydest"]),this.fieldsView.onDFieldView.$ondFields.$destination.showError();break;case o.FieldType.RETURNFROM:this.fieldsView.onDFieldView.$ondFields.$origin.removeError(),this.fieldsView.onDFieldView.$ondFields.$origin.removeError(),this.fieldsView.onDFieldView.$ondFields.$returnFrom.removeError(),this.fieldsView.onDFieldView.$ondFields.$returnFrom.setError(e["cep.message.emptyreturnfrom"]),this.fieldsView.onDFieldView.$ondFields.$returnFrom.showError();break;case o.FieldType.INDATE:this.fieldsView.calendarSetView.$returnField.setError(e["cep.message.invalidreturndate"]),this.fieldsView.calendarSetView.$returnField.showError();break;case o.FieldType.OUTDATE:this.fieldsView.calendarSetView.$outBoundDateField.setError(e["cep.message.invalidfromdate"]),this.fieldsView.calendarSetView.$outBoundDateField.showError()}},t.prototype.removeError=function(t){switch(t){case o.FieldType.ORIGIN:this.fieldsView.onDFieldView.$ondFields.$origin.removeError();break;case o.FieldType.DESTINATION:this.fieldsView.onDFieldView.$ondFields.$destination.removeError();break;case o.FieldType.RETURNFROM:this.fieldsView.onDFieldView.$ondFields.$returnFrom.removeError();break;case o.FieldType.INDATE:this.fieldsView.calendarSetView.$returnField.removeError();break;case o.FieldType.OUTDATE:this.fieldsView.calendarSetView.$outBoundDateField.removeError()}},t.prototype.resetInputStyle=function(t){!this.exclusionCheckForReset(t)||$(t.target).is(this.fieldsView.onDFieldView.$swap.find(t.target))?this.resetAll():this.mobileViewReset(t)},t.prototype.exclusionCheckForReset=function(t){return $(t.target).is(this.$target.find("#cep").find(t.target))||$(t.target).is(this.preferencesView.$target.find(".currency-points").find(t.target))||$(t.target).hasClass("one-way-link")||null!=this.dynamicResetExceptionList&&this.dynamicResetExceptionList.indexOf(t.target.id)>-1},t.prototype.resetAll=function(){s.default.deFocusCEP(),this.blurActiveInput(),this.fieldsView.hideAllDD(),window.innerWidth<767&&this.enableMobileContent()},t.prototype.blurActiveInput=function(){$("#cep input").blur()},t.prototype.mobileViewReset=function(t){window.innerWidth<767&&($(t.target).is(this.fieldsView.calendarSetView.$target.find(t.target))||$(t.target).is(this.fieldsView.paxFieldView.$target.find(t.target)))?(s.default.disableContentAfterFindFlights(),this.enableMobileContent()):this.enableMobileContent()},t.prototype.enableMobileContent=function(){this.fieldsView.calendarSetView.isOutDateFocussed||this.fieldsView.calendarSetView.isInDateFocussed||this.fieldsView.paxFieldView.isPaxFocussed||s.default.enableContentAfterFindFlights()},t.prototype.focusNextEle=function(t,e){$(window).width()>=767||e?t.nextAll("div:visible:first").find("input:enabled:first").focus():this.resetAll()},t.prototype.resetYouthForPointsFlowInCep=function(){this.fieldsView.paxFieldView&&this.fieldsView.paxFieldView.paxDDView.youthHelper.resetYouthForPointsFlow()},t.prototype.setYouthForRevenueFlowInCep=function(){this.fieldsView.paxFieldView&&this.fieldsView.paxFieldView.paxDDView.youthHelper.setYouthForRevenueFlow()},t.prototype.updateDefaultAirport=function(t){t&&this.fieldsView.onDFieldView.overrideDefaultOrigin(t)},t.prototype.showLpcForUpsellError=function(t){this.dynamicResetExceptionList=[],null!=t&&this.dynamicResetExceptionList.push(t)},t}();e.default=l},function(t,e){t.exports='<article class="wrapper">\r\n    <article id="cep-preference" class="cep-preference">\r\n    </article>\r\n    <article id="cep" class="cep">\r\n        <form name="cep-fields" id="cep-fields-form" data-ajax="false"></form>\r\n    </article>\r\n</article>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(38),r=n(5),a=n(0),o=n(3),s=n(4),d=n(6),l=n(2),c=function(){function t(t,e,n){this.cepView=t,this.$target=e,this.config=n,this.apiClient=new r.default,this.dataLayerService=new l.default,this.translation=a.default.getInstance(),this.cepData=o.default.getInstance(),this.view=this.$target.find("#cep-preference"),this.initilaize()}return t.prototype.initilaize=function(){var t=this;this.view.html(i),this.translation.applyTranslation(this.view),this.currency=$("#currency"),this.EuroBonus=$("#EuroBonus"),this.dataLayerService.pointsFlow({}),this.currency.click(function(e){return t.dataLayerService.revenueFlow(e)}),this.EuroBonus.click(function(e){return t.dataLayerService.pointsFlow(e)}),this.tripClass={oneway:"one-way",roundtrip:"round-trip",multicity:"multi-city"},this.triptypeLookup={oneway:"OW",roundtrip:"RT",multicity:"OJ"},this.setTripClass="round-trip",this.view.find(".trip-type li").on("click",function(e){return t.onChangeTrip(e)}),this.view.find("input").on("change",function(e){return t.setSelectedFlow()}),this.$travelPass=this.$target.find(".travel-pass"),this.$travelPass.find("a").on("click",function(){return t.travelPassRedirection()}),this.$multiway=this.$target.find("#multi-city"),this.$multiway.on("keydown",function(e){return t.accessTabTripType(e)}),this.setPreferences()},t.prototype.setPreferences=function(){this.cepView.config.urlParams?(this.setTripTypeFromUrl(this.cepView.config.urlParams.tripType),this.setBookingFlowFromUrl(this.cepView.config.urlParams.bookingFlow)):(this.setTripTypeFromUrl(),this.setBookingFlowFromUrl())},t.prototype.setTripTypeFromUrl=function(t){this.selectedTripType=t||this.triptypeLookup.roundtrip;var e=s.default.getKeyByValue(this.triptypeLookup,this.selectedTripType),n=this.tripClass[e];this.cepView.$target.find("#cep").removeClass("one-way round-trip multi-city").addClass(n);var i=this.view.find(".trip-type li button#"+n).parent();this.view.find(".trip-type li").removeClass("active"),i.addClass("active"),this.cepView.controller.onFieldsChange(this.selectedTripType,d.FieldType.TRIPTYPE)},t.prototype.setBookingFlowFromUrl=function(t){this.selectedBookingFlow=t?t.toLowerCase():this.view.find("input[name=currency-bonus]:checked").attr("data-flow"),this.view.find("input[name=currency-bonus][data-flow="+this.selectedBookingFlow+"]").prop("checked",!0),this.cepView.controller.onFieldsChange("REVENUE",d.FieldType.BOOKINGFLOW)},t.prototype.loadCEPDataRelatedViews=function(){this.$currency=this.view.find("#currency").next().find(".label-content"),this.$currency.html(this.cepData.getDefaultCurrency()),this.view.find("#currency").val(this.cepData.getDefaultCurrency()),this.setSelectedFlow(),this.cepData.getTpStatus()<0&&this.$target.find(".travel-pass").remove()},t.prototype.onChangeTrip=function(t){var e=$(t.currentTarget).find("button").attr("id");if(e){var n=e.toLowerCase().replace(/-|\s/g,"");this.cepView.changeTripType(e),this.view.find(".trip-type li").removeClass("active"),this.view.find(".trip-type li").find("button").attr("aria-pressed","false"),$(t.currentTarget).addClass("active"),$(t.currentTarget).find("button").attr("aria-pressed","true"),this.selectedTripType=this.triptypeLookup[n],this.cepView.controller.onFieldsChange(this.selectedTripType,d.FieldType.TRIPTYPE),this.dataLayerService.dataLayerTriptype(this.selectedTripType)}},t.prototype.updateBookingFlow=function(t){this.selectedBookingFlow=t?t.toLowerCase():this.view.find("input[name=currency-bonus]:checked").attr("data-flow"),this.view.find("input[name=currency-bonus][data-flow="+this.selectedBookingFlow+"]").prop("checked",!0),this.updateSelectedFlow(this.selectedBookingFlow,!0)},t.prototype.setSelectedFlow=function(){this.updateSelectedFlow(this.view.find("input[name=currency-bonus]:checked").attr("data-flow"))},t.prototype.updateSelectedFlow=function(t,e){if(this.selectedBookingFlow=t,this.cepView.fieldsView&&this.cepView.fieldsView.onDFieldView&&this.cepView.fieldsView.onDFieldView.validateOnD(this.cepView.fieldsView.onDFieldView.$ondFields.$destination),"points"===this.selectedBookingFlow)this.cepView.controller.onFieldsChange("POINTS",d.FieldType.BOOKINGFLOW),this.cepView.resetYouthForPointsFlowInCep(),this.cepView.config.onPointsToggle&&!e&&this.cepView.config.onPointsToggle(!0);else{if(this.cepView.controller.onFieldsChange("REVENUE",d.FieldType.BOOKINGFLOW),this.cepView.fieldsView.calendarSetView){var n=this.cepView.fieldsView.calendarSetView.$outboundInput.attr("data-date"),i=this.cepView.fieldsView.getDobTFromCep(),r=this.cepView.fieldsView.checkAgeForCustomer(i,new Date(n));i&&sessionStorage.getItem("basicProfile")?r[1]<26&&r[1]>=12&&this.cepView.setYouthForRevenueFlowInCep():this.cepView.setYouthForRevenueFlowInCep()}this.cepView.config.onPointsToggle&&!e&&this.cepView.config.onPointsToggle(!1)}var a=this.cepView.fieldsView;a&&a.calendarSetView&&a.calendarSetView.dateDDView&&a.calendarSetView.dateDDView.lpcView.reloadLPC()},t.prototype.travelPassRedirection=function(){var t;this.dataLayerService.GTMtrackInteraction("CEP","Select Book With","Travel Pass");var e=this.t("home.travelpassRedirectionUrl."+this.cepView.config.market);if(sessionStorage.getItem("basicProfile")){var n=sessionStorage.getItem("basicProfile");t=JSON.parse(n).tp}else t=!1;sessionStorage.getItem("UserSession")&&!1===t?window.open(e+"%26d360loging=true"):window.open(e)},t.prototype.accessTabTripType=function(t){var e=this;9!==t.keyCode||t.shiftKey||(t.preventDefault(),$("#pay-radio-wrapper").attr("aria-labelledby","sr-out-of-list"),clearTimeout(this.timeoutfnone),this.cepView.config.accessTab?this.timeoutfnone=setTimeout(function(){$(e.currency).focus()},50):this.timeoutfnone=setTimeout(function(){$("#origin").focus()},50),clearTimeout(this.timeoutfntwo),this.timeoutfntwo=setTimeout(function(){$("#pay-radio-wrapper").attr("aria-labelledby","sr-payment-type")},500))},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=c},function(t,e){t.exports='<span> </span> <nav id="select-trip" class="select-trip">\r\n    <ul class="trip-type">\r\n        <li>\r\n            <button id="one-way" tabindex="0" data-i18n="cep.oneWay" aria-pressed=\'false\' role="button" aria-label="cep.oneWay">ONE WAY</button>\r\n        </li>\r\n        <li class="active">\r\n            <button id="round-trip" tabindex="0" data-i18n="cep.roundTrip" aria-pressed=\'true\' role="button" aria-label="cep.roundTrip">ROUND TRIP</button>\r\n        </li>\r\n        <li>\r\n            <button id="multi-city" tabindex="0" data-i18n="cep.openJaw" aria-pressed=\'false\' role="button" aria-label="cep.openJaw">OTHER TRIP</button>\r\n        </li>\r\n        \x3c!-- data-i18n="cep.openJaw" --\x3e\r\n    </ul>\r\n</nav>\r\n<div class="pull-right currency-points" id="pay-radio-wrapper" role="radiogroup" aria-labelledby="sr-payment-type">\r\n    <span id="sr-out-of-list" class="sr-only" >\r\n        <span data-i18n="cep.readerText.outoflist">Out of list </span>    \r\n        <span data-i18n="cep.readerText.paywith">Select your payment type</span>\r\n    </span>\r\n    <span id="sr-payment-type" class="sr-only" data-i18n="cep.readerText.paywith">\r\n         Select your payment type\r\n    </span>\r\n    <span class="pull-left pad-t-10 pad-r-10 book-with" data-i18n="cep.bookWith">Book with </span>\r\n    <div class="radio-wrap pull-left">\r\n        <input checked  type="radio" id="currency" name="currency-bonus" data-flow="revenue" value="revenue" role="radio"/>\r\n        <label for="currency"> <span> </span> <span class="sr-only sr-payoptions" data-i18n="cep.readerText.currency">Currency </span> <span class="label-content"></span></label>\r\n    </div>\r\n    <div class="radio-wrap pull-left last">\r\n        <input  type="radio" id="EuroBonus" name="currency-bonus" data-flow="points" value="points" role="radio"/>\r\n        <label for="EuroBonus"> <span> </span> <span class="sr-only sr-payoptions" data-i18n="dashboard.eurobonus">EuroBonus </span> <span class="label-content" data-i18n="cep.bookWith.points">EuroBonus pts</span></label>\r\n    </div>\r\n    <span id="travel-pass-link" class="pull-left pad-t-10 travel-pass">\r\n        <a href="javascript:;" tabindex="0" aria-describedby="sr-travel-pass" data-i18n="travelPass.linkText">\r\n            Travel Pass\r\n        </a>\r\n        <span class="sr-only" id="sr-travel-pass" data-i18n="cep.readerText.newwindow">\r\n            This will open in a new window\r\n        </span>\r\n    </span>\r\n</div>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat2/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st1/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st2/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st3/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st4/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st5/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st6/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat1/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat2/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat3/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat4/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat5/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat6/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://api-staging.flysas.com/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apib.flysas.com/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://api.flysas.com/"}return t}();e.default=i},function(t,e){!function(t,e,n,i,r){t[i]=t[i]||[],t[i].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var a=e.getElementsByTagName(n)[0],o=e.createElement(n);o.async=!0,o.src="https://www.googletagmanager.com/gtm.js?id=GTM-PRPCD8&l=sasD360DataLayer",a.parentNode.insertBefore(o,a)}(window,document,"script","sasD360DataLayer")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(57),r=n(5),a=n(58),o=n(65),s=n(86),d=n(91),l=n(4),c=n(0),u=n(3),p=n(6),h=n(9),f=function(){function t(t,e,n){this.cepView=t,this.$target=e,this.config=n,this.apiClient=new r.default,this.translation=c.default.getInstance(),this.cepData=u.default.getInstance(),this.isCepInitialized=!1,this.$fieldsElement=this.$target.find("#cep-fields-form"),this.initilaize()}return t.prototype.initilaize=function(){this.$fieldsElement.html(i),this.translation.applyTranslation(this.$fieldsElement),this.$currency=this.$fieldsElement.find("#currecny-button"),this.$calendarCont=this.$target.find(".calendar-set"),this.$paxCont=this.$target.find(".passengers"),this.$search=this.$target.find(".cep-button-wrap #search-button"),this.$travelerField=this.$target.find("#passengers"),this.getCepData(),this.updateMobileBookingFlow()},t.prototype.getCepData=function(){var t=this;$.when(this.cepView.controller.getCepData()).then(function(){t.loadCEPDataRelatedViews(),t.setInteraction(),t.config.urlParams&&!0===t.config.urlParams.lpcView&&(t.calendarSetView.$outboundInput.focus(),t.calendarSetView.dateDDView.lpcView.triggerLPC()),t.cepView.controller.isExMethodCallRequired&&t.calendarSetView.showLPC(t.cepView.controller.externalParams)})},t.prototype.loadCEPDataRelatedViews=function(){this.cepView.preferencesView.loadCEPDataRelatedViews(),this.$currency.html(this.cepData.getDefaultCurrency()),this.onDFieldView=new a.default(this,this.config),this.calendarSetView=new o.default(this,this.config),this.paxFieldView=new s.default(this,this.config),this.paxFieldView.updatePaxField(),this.isCepInitialized=!0,this.checkForValidLogin(),this.calendarSetView.youthValidation()},t.prototype.setInteraction=function(){var t=this;this.$fieldsElement.on("submit",function(e){return t.searchFlights(e)}),this.$fieldsElement.find(".booking-flow-toggle button").click(function(e){return t.onToggleClick(e)}),this.$search.on("keydown",function(e){return t.accessibleSearch(e)}),l.default.setInputStyle(this.$fieldsElement)},t.prototype.onToggleClick=function(t){this.$fieldsElement.find(".booking-flow-toggle button").removeClass("active"),$(t.currentTarget).addClass("active"),this.cepView.preferencesView.updateSelectedFlow($(t.currentTarget).val())},t.prototype.updateMobileBookingFlow=function(){"points"===this.cepView.preferencesView.selectedBookingFlow?(this.$fieldsElement.find(".booking-flow-toggle button").removeClass("active"),$("#points-button").addClass("active")):"revenue"===this.cepView.preferencesView.selectedBookingFlow&&(this.$fieldsElement.find(".booking-flow-toggle button").removeClass("active"),$("#currecny-button").addClass("active"))},t.prototype.validate=function(t){var e=t.attr("id"),n=t.val();switch(e){case"origin":if(this.onDFieldView.origin){var i=this.onDFieldView.origin;n!==i.name.city+" "+i.iata.airport&&n!==i.name.city+" "+i.iata.city&&(this.onDFieldView.origin=null)}this.cepView.removeError(p.FieldType.ORIGIN),this.cepView.controller.onFieldsChange(this.onDFieldView.origin,p.FieldType.ORIGIN);break;case"destination":if(this.onDFieldView.destination){var r=this.onDFieldView.destination;n!==r.name.city+" "+r.iata.airport&&n!==r.name.city+" "+r.iata.city&&(this.onDFieldView.destination=null)}this.cepView.removeError(p.FieldType.DESTINATION),this.cepView.controller.onFieldsChange(this.onDFieldView.destination,p.FieldType.DESTINATION);break;case"returnFrom":if(this.onDFieldView.returnFrom){var a=this.onDFieldView.returnFrom;n!==a.name.city+" "+a.iata.airport&&n!==a.name.city+" "+a.iata.city&&(this.onDFieldView.returnFrom=null)}this.cepView.removeError(p.FieldType.RETURNFROM),this.cepView.controller.onFieldsChange(this.onDFieldView.returnFrom,p.FieldType.RETURNFROM);break;case"Inbound":this.calendarSetView&&this.cepView.removeError(p.FieldType.INDATE),this.cepView.controller.onFieldsChange(t.attr("data-date"),p.FieldType.INDATE);break;case"Outbound":this.calendarSetView&&this.cepView.removeError(p.FieldType.OUTDATE),this.cepView.controller.onFieldsChange(t.attr("data-date"),p.FieldType.OUTDATE);break;case"passengers":this.cepView.controller.onFieldsChange(this.paxFieldView.paxDDView.adultCount,p.FieldType.ADT),this.cepView.controller.onFieldsChange(this.paxFieldView.paxDDView.childCount,p.FieldType.CHD),this.cepView.controller.onFieldsChange(this.paxFieldView.paxDDView.infantCount,p.FieldType.INF),this.cepView.controller.onFieldsChange(this.paxFieldView.paxDDView.youthCount,p.FieldType.YTH)}},t.prototype.searchFlights=function(t){t.preventDefault(),this.cepView.resetAll();var e=this.cepView.controller.validateFields(),n=this.calendarSetView.dateDDView.lpcView;e&&(this.searchDetails={origin:this.onDFieldView.origin,destination:this.onDFieldView.destination,returnFrom:this.onDFieldView.returnFrom,returnTo:this.onDFieldView.returnTo,outDate:this.calendarSetView.$outboundInput.attr("data-date"),inDate:"OW"!==this.cepView.preferencesView.selectedTripType?this.calendarSetView.$inboundInput.attr("data-date"):null,pax:{adt:this.paxFieldView.paxDDView.adultCount,chd:this.paxFieldView.paxDDView.childCount,inf:this.paxFieldView.paxDDView.infantCount,yth:this.paxFieldView.paxDDView.youthCount},bookingFlow:this.cepView.preferencesView.selectedBookingFlow,tripType:this.cepView.preferencesView.selectedTripType,view:n.isLPCLoaded()?"LPC":"upsell"},"LPC"===this.searchDetails.view&&(this.searchDetails.outPrice=n.outPrice,this.searchDetails.inPrice="OW"!==this.cepView.preferencesView.selectedTripType?n.inPrice:null),this.cepSearchView=new d.default(this.config,this.searchDetails))},t.prototype.onTripTypeChange=function(t){this.onDFieldView.hideSwap(t),this.calendarSetView.onTripTypeChange(t)},t.prototype.hideAllDD=function(){this.$fieldsElement.find("input").removeClass("focus-color"),this.onDFieldView&&this.onDFieldView.hideAllOnDDropDowns(),this.calendarSetView&&this.calendarSetView.hideDropDown(),this.paxFieldView&&this.paxFieldView.hideDropDown()},t.prototype.hideAllDDExceptPax=function(){this.onDFieldView.hideAllOnDDropDowns(),this.calendarSetView.hideDropDown()},t.prototype.checkSearch=function(t){return $(t.target).is(this.$search)},t.prototype.checkForValidLogin=function(){if(this.isCepInitialized){var t=this.getDobTFromCep(),e=this.calendarSetView.$outboundInput.attr("data-date"),n=new Date(e),i=this.checkAgeForCustomer(t,n),r=this.paxFieldView.paxDDView.youthHelper.checkItisYouthOrNot(),a=r.flagForCheckYouth;(i[1]>=26||i[1]<12)&&a?(this.paxFieldView.paxDDView.youthHelper.toggleAdult(parseInt(r.youthCount,10),0,!1),this.paxFieldView.paxDDView.youthHelper.addClassDisplayNone(parseInt(r.youthCount,10))):(i[1]>=26||i[1]<12)&&!a&&this.paxFieldView.paxDDView.youthHelper.addClassDisplayNone(parseInt(r.youthCount,10))}},t.prototype.updatePaxinField=function(t){"adult"===t.toggleType?this.paxFieldView.paxDDView.youthHelper.toggleAdult(t.youthcount,t.adultcount,!1):this.paxFieldView.paxDDView.youthHelper.toggleYouth(t.adultcount)},t.prototype.checkAgeForCustomer=function(t,e){var n=new Date,i=e,r=new Date(t),a=n.getFullYear()-r.getFullYear(),o=i.getFullYear()-r.getFullYear(),s=n.getMonth()-r.getMonth(),d=i.getMonth()-r.getMonth();(s<0||0===s&&n.getDate()<r.getDate())&&a--,(d<0||0===d&&i.getDate()<r.getDate())&&o--;var l=[];return l.push(a),l.push(o),l},t.prototype.setDobToCep=function(){if(h.default.getObject("basicProfile")){var t=h.default.getObject("basicProfile");this.cepDob=t.dob}else this.cepDob=null,this.calendarSetView.$outBoundDateField.removeError(),this.cepView.fieldsView.paxFieldView.paxDDView.youthHelper.removeClassDisplayNone()},t.prototype.getDobTFromCep=function(){return this.cepDob},t.prototype.accessibleSearch=function(t){t.shiftKey&&9===t.keyCode&&(t.preventDefault(),this.$travelerField.focus())},t}();e.default=f},function(t,e){t.exports='\x3c!-- input set orgin start --\x3e\r\n<div class="input-set  large-3  medium-3 small-3  col radius-left origin ond">\r\n    <label for="origin" data-i18n="cep.origin"> Origin </label>\r\n<input id="origin" name="" type="text" value="" tabindex="0" autocomplete="off" aria-expanded="false" aria-autocomplete="both" aria-required="true"\r\n    aria-activedescendant="currentddlist" role="combobox" aria-label="cep.readerText.from"></input>\r\n    <a class="swap disabled" href="javascript:;" tabindex="0" aria-label="cep.readerText.swapairport">\r\n        <span id="UiSwap" class="icon-swap"><span class="displayNone">icon</span></span>\r\n    </a>\r\n</div>\r\n \x3c!-- input set orgin End  --\x3e \r\n <div class="input-set  large-3  medium-3 small-3  col destination ond">\r\n    <label for="destination" data-i18n="cep.destination"> Destination </label>\r\n<input id="destination" name="" type="text" value="" tabindex="0" autocomplete="off" aria-expanded="false" aria-autocomplete="both" aria-required="true"\r\n    aria-activedescendant="currentddlist" role="combobox" aria-label="cep.readerText.to"></input>\r\n</div>\r\n\r\n<div class="input-set col return-from ond">\r\n    <label  for="returnFrom" data-i18n="cep.date.returnFrom"> Return from </label>\r\n<input id="returnFrom" name="" type="text" value="" tabindex="0" autocomplete="off" aria-expanded="false" aria-autocomplete="both" aria-required="true"\r\n    aria-activedescendant="currentddlist" role="combobox" aria-label="cep.readerText.returnfrom"></input>\r\n\x3c!-- Return from dropdown start --\x3e\x3c!-- Return from dropdown End --\x3e\r\n</div>\r\n\r\n<div class="input-set col return-to ond">\r\n    <label for="returnTo" data-i18n="cep.returnTo"> Return to </label>\r\n<input id="returnTo" name="" type="text" value="" tabindex="0" readonly="readonly" autocomplete="off" aria-label="cep.returnTo"></input>\r\n\x3c!-- Return from dropdown start --\x3e\x3c!-- Return from dropdown End --\x3e\r\n</div>\r\n\r\n<div class=" large-3  medium-3 small-3  col calendar-set">\r\n    <div class="input-set  large-6  medium-6 small-6  col outbound">\r\n        <label  for="Outbound" data-i18n="cep.date.departure"> Departure </label>\r\n        <input id="Outbound" name="" type="text" value="" tabindex="0" readonly autocomplete="off"></input>\r\n        <div class="arrow-up"></div>\r\n        <span class="icon-calendar"></span>\r\n    </div>\r\n    <div class="input-set  large-6  medium-6 small-6  col inbound">\r\n        <label for="Inbound" data-i18n="cep.date.return"> Return </label>\r\n        <input id="Inbound" name="" type="text" value="" tabindex="0" readonly autocomplete="off"></input>\r\n        <div class="arrow-up"></div>\r\n        <span class="icon-calendar"></span>\r\n    </div>\r\n</div>\r\n\r\n<div class="input-set  large-3  medium-3 small-3  col passengers">\r\n<label aria-label="cep.readerText.travelerField" for="passengers"\r\n    data-i18n="cep.passenger.passengers"> Passengers </label>\r\n    <input id="passengers" name="" type="text" value="" tabindex="0" readonly autocomplete="off"></input>\r\n    <a href="javascript:;" class="icon-arrow-down-grey" tabindex="-1"><span class="sr-only">icon</span> </a>\r\n    \r\n</div>\r\n\r\n<div class="cep-button-wrap">\r\n    <div class="toggle-button booking-flow-toggle"> \r\n        <button class="btn small active" id="currecny-button" type="button" value="revenue">SEK</button> \r\n        <button class="btn small" id="points-button" data-i18n="cep.bookWith.points" type="button" value="points">EUROBONUS PTS</button>\r\n    </div>\r\n    <button id="search-button" class="btn medium primary mrgn-t-15 search-button" aria-label="cep.readerText.searchflights" data-i18n="cep.button.search" type="submit" tabindex="0">SEARCH        \r\n    </button>\r\n</div>\r\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(59),r=n(63),a=n(5),o=n(0),s=n(3),d=n(7),l=n(6),c=n(2),u=n(12),p=function(){function t(t,e){this.fieldsView=t,this.config=e,this.translation=o.default.getInstance(),this.cepData=s.default.getInstance(),this.geoLocationView=r.default.getInstance(),this.init()}return t.prototype.init=function(){this.$target=this.fieldsView.$fieldsElement,this.$originCont=this.$target.find(".origin"),this.$swap=this.$target.find(".swap"),this.$destCont=this.$target.find(".destination"),this.$returnFromCont=this.$target.find(".return-from"),this.$returnToCont=this.$target.find(".return-to"),this.$originInput=this.$originCont.find("#origin"),this.$destInput=this.$destCont.find("#destination"),this.$returnFromInput=this.$returnFromCont.find("#returnFrom"),this.$returnToInput=this.$returnToCont.find("#returnTo"),this.$ondFields={$origin:new d.default(this.$originInput),$destination:new d.default(this.$destInput),$returnFrom:new d.default(this.$returnFromInput)},this.isGeolocation=!0,this.setInteraction(),this.dataLayerService=new c.default},t.prototype.setInteraction=function(){var t=this;this.$target.find(".ond input").on("change",function(e){return t.validate(e)}),this.$target.find(".ond input").on("focus",function(e){return t.onFocusInput(e)}),this.$target.find(".ond label").on("click",function(e){return t.onFocusInput(e)}),this.$swap.on("click",function(e){return t.swapOnD(e)}),this.loadOndDropdown(),this.handleSwap()},t.prototype.validate=function(t){this.fieldsView.validate($(t.currentTarget))},t.prototype.onFocusInput=function(t){var e=$(t.currentTarget),n=e.closest(".input-set");this.fieldsView.hideAllDD(),n.find("input").addClass("focus-color"),t.target.value&&!n.hasClass("return-to")&&(clearTimeout(this.xteime),this.xteime=setTimeout(function(){window.innerWidth>767?t.target.setSelectionRange(0,t.target.value.length):t.target.setSelectionRange(t.target.value.length,t.target.value.length)},10)),this.isGeolocation&&n.hasClass("origin")&&this.geoLocationView.getLocation()},t.prototype.loadOndDropdown=function(){var t=this,e=this.config.urlParams,n=e?e.itineraryParams:[];this.defaultOrigin=n[0]?n[0]:this.cepData.getDefaultOrigin();var r=n[1]?n[1]:"",o=n[4]?n[4]:"";this.originDDView=new i.default(this.$originCont,function(e,n){return t.onOrginSelected(e,n)},this.config,this.defaultOrigin,function(){return t.handleSwap()},function(){return t.callGeoLocation()}),this.geoLocationView.setDropDownInstance(this.originDDView),this.destDDView=new i.default(this.$destCont,function(e,n){return t.onDestinationSelected(e,n)},this.config,r,function(){return t.handleSwap()}),this.returnFromDDView=new i.default(this.$returnFromCont,function(e,n){return t.onReturnFromSelected(e,n)},this.config,o),this.returnToDDView=new i.default(this.$returnToCont,function(e){return t.onReturnToSelected(e)},this.config),this.apiClient=new a.default},t.prototype.callGeoLocation=function(){this.$returnToInput.val(this.$originInput.val()).trigger("blur").trigger("change"),this.isGeolocation&&this.geoLocationView.getLocation()},t.prototype.onOrginSelected=function(t,e){this.origin=t,this.$returnToInput.val(this.$originInput.val()),this.onReturnToSelected(t),this.fieldsView.cepView.controller.onFieldsChange(t,l.FieldType.ORIGIN),e||(this.fieldsView.cepView.focusNextEle(this.$originCont),this.validateOnD(this.$ondFields.$origin))},t.prototype.onDestinationSelected=function(t,e){this.destination=t,this.fieldsView.cepView.controller.onFieldsChange(t,l.FieldType.DESTINATION),e||(this.fieldsView.cepView.focusNextEle(this.$destCont),this.validateOnD(this.$ondFields.$destination)),this.handleSwap()},t.prototype.onReturnFromSelected=function(t,e){this.returnFrom=t,this.fieldsView.cepView.controller.onFieldsChange(t,l.FieldType.RETURNFROM),e||(this.fieldsView.cepView.focusNextEle(this.$returnToCont),this.validateOnD(this.$ondFields.$returnFrom,!0))},t.prototype.onReturnToSelected=function(t){this.returnTo=t,this.fieldsView.cepView.controller.onFieldsChange(t,l.FieldType.RETURNTO)},t.prototype.prepareFlagsForValidateOndCall=function(t){void 0!==t?(this.checkFlagOriginAndDes=!!(this.returnFrom&&this.returnTo&&this.returnFrom.iata.airport&&this.returnTo.iata.airport),this.returnFrom&&this.returnTo&&(this.checkFlagForSameOnd=this.returnFrom.iata.airport===this.returnTo.iata.airport)):(this.checkFlagOriginAndDes=!!(this.origin&&this.destination&&this.origin.iata.airport&&this.destination.iata.airport),this.origin&&this.destination&&(this.checkFlagForSameOnd=this.origin.iata.airport===this.destination.iata.airport))},t.prototype.validateOnD=function(t,e){var n=this;if(this.prepareFlagsForValidateOndCall(e),this.checkFlagOriginAndDes)if(this.checkFlagForSameOnd)this.$ondFields.$origin.removeError(),this.$ondFields.$destination.removeError(),this.$ondFields.$returnFrom.removeError(),t.setError(this.t("cep.message.sameOriginDestination")),t.showError(),this.fieldsView.cepView.controller.validateOnd(!1);else if(this.$ondFields.$origin.removeError(),this.$ondFields.$destination.removeError(),this.$ondFields.$returnFrom.removeError(),this.fieldsView.cepView.controller.validateOnd(!0),this.config.oauth)this.callValidateApi(t,e);else{var i=this.apiClient.getOauth();i.done(function(i){if(i.access_token&&(n.config.oauth=i.access_token,n.callValidateApi(t,e)),i.error){var r=i.status.toString()+" ("+i.json().error.responseText.error_description+")";n.dataLayerService.GTMtrackErrors(r,u.default.getInstance().appConf.APIURL+"authorize/oauth/token")}}).catch(function(t){if(-1===t.responseText.indexOf("html")){var e=t.status.toString()+" ("+JSON.parse(t.responseText).error_description+")";n.dataLayerService.GTMtrackErrors(e,u.default.getInstance().appConf.APIURL+"authorize/oauth/token")}else{var e=t.status.toString()+" (Internal server Error)";n.dataLayerService.GTMtrackErrors(e,u.default.getInstance().appConf.APIURL+"authorize/oauth/token")}})}else this.$ondFields.$origin.removeError(),this.$ondFields.$destination.removeError(),this.$ondFields.$returnFrom.removeError(),this.fieldsView.cepView.controller.validateOnd(!0)},t.prototype.callValidateApi=function(t,e){var n=this;e?this.returnFrom&&this.returnTo&&(this.validateCall=this.apiClient.validateOnD(this.returnFrom.iata.airport,this.returnTo.iata.airport,this.config.oauth,this.fieldsView.cepView.preferencesView.selectedBookingFlow,this.fieldsView.cepView.controller)):this.origin&&this.destination&&(this.validateCall=this.apiClient.validateOnD(this.origin.iata.airport,this.destination.iata.airport,this.config.oauth,this.fieldsView.cepView.preferencesView.selectedBookingFlow,this.fieldsView.cepView.controller)),(this.origin&&this.destination||this.returnFrom&&this.returnTo)&&this.validateCall.done(function(i){if(i.status)n.$ondFields.$origin.removeError(),n.$ondFields.$destination.removeError(),n.fieldsView.cepView.controller.validateOnd(!0);else if(n.origin&&n.destination)if(n.returnFrom&&n.returnTo&&e){var r="All airports"===n.returnFrom.name.airport?n.returnFrom.name.city:n.returnFrom.name.airport,a="All airports"===n.returnTo.name.airport?n.returnTo.name.city:n.returnTo.name.airport,o="revenue"===n.fieldsView.cepView.preferencesView.selectedBookingFlow?n.t("cep.message.doNotFly").replace(/\#origin\#?/g,r).replace(/\#destination\#?/g,a):n.t("cep.message.pointsOndValidation");n.$ondFields.$origin.removeError(),n.$ondFields.$destination.removeError(),t.setError(o),t.showError(),n.fieldsView.cepView.controller.validateOnd(!1)}else{var r="All airports"===n.origin.name.airport?n.origin.name.city:n.origin.name.airport,a="All airports"===n.destination.name.airport?n.destination.name.city:n.destination.name.airport,o="revenue"===n.fieldsView.cepView.preferencesView.selectedBookingFlow?n.t("cep.message.doNotFly").replace(/\#origin\#?/g,r).replace(/\#destination\#?/g,a):n.t("cep.message.pointsOndValidation");n.$ondFields.$origin.removeError(),n.$ondFields.$destination.removeError(),t.setError(o),t.showError(),n.fieldsView.cepView.controller.validateOnd(!1)}else n.$ondFields.$origin.removeError(),n.$ondFields.$destination.removeError(),n.fieldsView.cepView.controller.validateOnd(!0)}).catch(function(t){var e=t.status.toString()+" (Internal server Error)";n.dataLayerService.GTMtrackErrors(e,u.default.getInstance().appConf.APIURL+"searchpanel/validate")})},t.prototype.swapOnD=function(t){var e=this.$originInput.val(),n=this.$destInput.val();i=[this.origin,this.destination],this.destination=i[0],this.origin=i[1],this.$originInput.val(n).trigger("blur").trigger("change"),this.$destInput.val(e).trigger("blur").trigger("change"),this.$returnToInput.val(n).trigger("blur").trigger("change"),this.validateOnD(this.$ondFields.$destination),this.dataLayerService.GTMtrackInteraction("CEP","Origin/Destination","Switch Origin and Destination");var i},t.prototype.handleSwap=function(){var t=this.$originInput.val(),e=this.$destInput.val();t.length>0||e.length>0||this.origin&&this.destination?this.$swap.removeClass("disabled"):this.$swap.addClass("disabled")},t.prototype.hideSwap=function(t){"multi-city"===t?this.$swap.hide():this.$swap.show()},t.prototype.hideAllOnDDropDowns=function(){this.$target.find(".ond input").removeClass("focus-color"),this.originDDView.hideDropdown(),this.destDDView.hideDropdown(),this.returnFromDDView.hideDropdown(),this.returnToDDView.hideDropdown()},t.prototype.overrideDefaultOrigin=function(t){this.originDDView.setDefautOrigin(t)},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(60),r=n(61),a=n(0),o=function(){function t(t,e,n,i,r,o){this.$target=t,this.callback=e,this.config=n,this.defaultAirport=i,this.handleSwap=r,this.geoCallback=o,this.translation=a.default.getInstance(),this.initilaize()}return t.prototype.initilaize=function(){this.$target.append(i),this.$input=this.$target.find("input"),this.$dropdown=this.$target.find(".ocp-bottom-drop"),this.predictive=new r.default(this.$input,this),this.index=-1,this.$listContainer=this.$dropdown.find("ul"),this.defaultAirport&&this.setDefautOrigin(this.defaultAirport),this.setInteractions(),this.isUserTyped=!1},t.prototype.setInteractions=function(){var t=this;this.$input.on("input",function(e){return t.onInputSearch(e)}),this.$input.on("keydown",function(e){return t.onkeyDownSearch(e)})},t.prototype.setDefautOrigin=function(t){this.predictive.pickRegionFromCode(t),this.predictive.selectResult(0)},t.prototype.onInputSearch=function(t){t.currentTarget.value&&t.currentTarget.value.trim().length>=2?(this.isUserTyped=!0,this.index=0,this.showDropdown(),this.predictive.loadDataToInput(this.$input.val()),this.scrollResultContainer(0),this.accessOnDdExpand()):t.currentTarget.value.length<2&&(this.isUserTyped=!1,this.index=-1,this.handleSwap&&this.handleSwap(),this.hideDropdown(),this.$listContainer.html(""),t.currentTarget.value.length<1&&this.geoCallback())},t.prototype.onkeyDownSearch=function(t){switch(t.keyCode){case 13:this.enterOrTab(t);break;case 9:t.shiftKey||this.enterOrTab(t);break;case 27:this.$input.val(""),this.hideDropdown();break;case 38:case 40:this.upOrDown(t)}},t.prototype.upOrDown=function(t){t.preventDefault();var e,n=this.$listContainer.children().length-this.$listContainer.find(".all-airport-country").length;if(38===t.keyCode){var i=this.index-1;e=this.index>-1&&-1!==i?i:n-1}else e=this.index<n-1?this.index+1:n?0:-1;this.highlightList(e),this.scrollResultContainer(e),this.predictive.selectResult(this.index)},t.prototype.enterOrTab=function(t){this.$dropdown.hasClass("active")&&(t.preventDefault(),this.index=this.index>-1?this.index:0,this.predictive.selectResult(this.index,t))},t.prototype.scrollResultContainer=function(t){var e=this.$listContainer.innerHeight(),n=this.$listContainer.children();if(e){var i=n.not(".all-airport-country").eq(t),r=i.position(),a=i.height();r&&a>0&&this.$listContainer.scrollTop(r.top-e+a)}},t.prototype.showDropdown=function(){this.$dropdown.addClass("active")},t.prototype.hideDropdown=function(t){this.$dropdown.removeClass("active"),this.index>-1&&!t&&this.predictive.selectResult(this.index),this.index=-1,this.accessOnDdCollapse(),this.isUserTyped=!1},t.prototype.highlightList=function(t){var e=this;this.index=t;var n=this.$listContainer.children();t>-1&&n.length>0&&(clearTimeout(this.timeoutfnthree),this.timeoutfnthree=setTimeout(function(){e.$listContainer.find("li").attr("aria-selected","false"),e.$listContainer.find("li").attr("id",""),n.not(".all-airport-country").eq(t).attr("id","selectedlihighlight"+e.index),n.not(".all-airport-country").eq(t).attr("aria-selected","true"),e.$input.attr("aria-activedescendant","selectedlihighlight"+e.index)},50))},t.prototype.setSelectedRegion=function(t,e){var n;n={iata:{city:t.attr("data-cityCode"),airport:t.attr("data-airportCode")},name:{city:t.attr("data-cityName"),airport:t.attr("data-airportName"),country:t.attr("data-countryName")}},this.isUserTyped=!1,this.callback(n,e)},t.prototype.accessOnDdExpand=function(){var t=this;this.$input.attr("aria-expanded","true"),this.$listContainer.attr("id","currentddlist");var e=this.$listContainer.children().length;this.$dropdown.find(".sr-content-dd-ul").attr("id","sr-dd-ul-total"),this.$input.attr("aria-activedescendant","selectedlihighlight"+this.index),this.$dropdown.find("#sr-dd-ul-total").html(""),clearTimeout(this.timeoutfnone),this.timeoutfnone=setTimeout(function(){t.$dropdown.find("#sr-dd-ul-total").html(t.translation.t("cep.readerText.expand")+" "+e)},50),clearTimeout(this.timeoutfntwo),this.timeoutfntwo=setTimeout(function(){t.$dropdown.find("#sr-dd-ul-total").html("")},100)},t.prototype.accessOnDdCollapse=function(){this.$input.attr("aria-expanded","false"),this.$listContainer.removeAttr("id"),this.$input.attr("aria-activedescendant",""),this.$dropdown.find("#sr-dd-ul-total").attr("id","")},t}();e.default=o},function(t,e){t.exports='<div class="ocp-bottom-drop">\r\n    <div class="arrow-up"></div>\r\n    <div class="geolocation displayNone">\r\n        <span class=\'dummy-placeholder-for-icon\'></span>\r\n        <a href="javascript:;">Use closest airport</a>\r\n    </div>\r\n    <ul class="airport-list origin-list-items" role="listbox" tabindex="0">\r\n    </ul>\r\n    <span class="sr-content-dd-ul sr-only" aria-live="assertive"></span>\r\n</div>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),r=n(62),a=n(3),o=function(){function t(t,e,n){this.$ele=t,this.dropdownView=e,this.o=n,this.cepData=a.default.getInstance(),this.init(),this.options=$.extend(!0,n,this.options)}return t.prototype.init=function(){this.options={minChars:2},this.airportsList=this.cepData.getAirports(),this.$listContainer=this.$ele.parent().find(".airport-list")},t.prototype.loadDataToInput=function(t){var e=this,n=t.length,r=this.options.minChars,a=this.airportsList;if(r&&n>0&&n>=r){var o=i.default.applyWordStartPattern(t),s=Object.keys(a).filter(function(n){return e.wordStartFilter(o,a[n],t)});this.suggestions=s.map(function(t){return a[t]}),this.generateList(t)}},t.prototype.pickRegionFromCode=function(t){var e=this.airportsList,n=Object.keys(e).filter(function(n){return n===t||e[n].cityCode===t});if(n.length>1)this.suggestions=n.map(function(t){return e[t].displayLangIndex=0,e[t].isCityMatch=!0,e[t].isAirportMatch=e[t].isCountryMatch=!1,e[t]});else{var i=e[n[0]];i.displayLangIndex=0,i.isAirportMatch=!0,i.isCityMatch=i.isCountryMatch=!1,this.suggestions=[i]}this.generateList(t)},t.prototype.generateList=function(t){this.regionListView=new r.default(this.suggestions,t),this.$listContainer.html(this.regionListView.getList());var e=this.$listContainer.find("li:not(.all-airport-country):lt(10)"),n=e.end().find(".all-airport").length,i=n?24*n:0;this.setHeightAndInteractions(e,i)},t.prototype.wordStartFilter=function(t,e,n){if(t.test(e.code)||t.test(e.cityCode))return e.displayLangIndex=0,e.isCityMatch=t.test(e.cityCode),e.isAirportMatch=t.test(e.code),e.isCountryMatch=!1,!0;if(t.test(e.countryName.join(" "))){var r=i.default.getIndexFromArray(e.countryName,n);return e.displayLangIndex=r>-1?r:0,e.isCountryMatch=!0,e.isCityMatch=e.isAirportMatch=!1,!0}if(t.test(e.cityName.join(" "))){var r=i.default.getIndexFromArray(e.cityName,n);return e.displayLangIndex=r>-1?r:0,e.isCityMatch=!0,e.isAirportMatch=e.isCountryMatch=!1,!0}if(t.test(e.names.join(" "))){var r=i.default.getIndexFromArray(e.names,n);return e.displayLangIndex=r>-1?r:0,e.isAirportMatch=!0,e.isCityMatch=e.isCountryMatch=!1,!0}return e.isCityMatch=e.isAirportMatch=e.isCountryMatch=!1,!1},t.prototype.setHeightAndInteractions=function(t,e){var n=this,i=0;e=e||0,t.each(function(t,e){i+=$(e).outerHeight()}),this.$listContainer.height(i+e),this.$resultList=this.$listContainer.find("li"),this.$resultList.on("click",function(t){return n.selectResult(void 0,t)})},t.prototype.selectResult=function(t,e){var n;void 0!==t&&null!==t&&t>-1&&this.$resultList&&this.$resultList.length>0?n=this.$resultList.not(".all-airport-country, .no-airport").eq(t):(n=$(e.currentTarget).not(".no-airport"),this.dropdownView.index=n.index()),n&&n.length>0&&this.$resultList&&this.$resultList.length>0?(this.$ele.val(n.attr("data-input")),void 0===e?this.dropdownView.setSelectedRegion(n,!0):(this.dropdownView.hideDropdown(!0),this.dropdownView.setSelectedRegion(n))):(this.$ele.val(""),this.dropdownView.hideDropdown(!0))},t}();e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),r=n(0),a=function(){function t(t,e){this.suggestions=t,this.value=e,this.translation=r.default.getInstance(),this.init()}return t.prototype.init=function(){var t=this;this.airports={},this.groupSuggestions(),this.suggestions.forEach(function(e){var n={code:e.code,names:e.names,cityName:e.cityName,countryName:e.countryName,displayLang:e.displayLangIndex};t.airports[e.cityCode]?t.airports[e.cityCode].push(n):t.airports[e.cityCode]=[n]}),this.createList()},t.prototype.groupSuggestions=function(){var t=this.suggestions.filter(function(t){if(void 0!==t&&void 0!==t.isCityMatch)return t.isCityMatch});t=this.sortAlpha(t,"cityName");var e=this.suggestions.filter(function(t){return t.isAirportMatch&&!t.isCityMatch});e=this.sortAlpha(e,"names");var n=this.suggestions.filter(function(t){return t.isCountryMatch&&!t.isAirportMatch&&!t.isCityMatch});n=this.sortAlpha(n,"names"),this.suggestions=t.concat(e,n)},t.prototype.sortAlpha=function(t,e){return t.sort(function(t,n){var i=t[e][t.displayLangIndex],r=n[e][n.displayLangIndex];return i.localeCompare(r)})},t.prototype.createList=function(){var t=this;this.mainAirport=Object.keys(this.airports).length>0?""+Object.keys(this.airports).map(function(e,n){return t.airports[e].length>1?""+t.getSubAirports(t.airports[e],e,n):""+t.airports[e].map(function(i){return'<li data-input="'+t.getInputValue(i,t.value,e,t.airports[e].length)+'"\n                    data-cityCode="'+e+'" data-cityName="'+t.getCityName(i)+'"\n                    data-airportCode="'+i.code+'"\n                    data-airportName="'+t.getAirportName(i)+'"\n                    data-countryName="'+t.getCountryName(i)+'"\n                    aria-selected="'+(0===n?"true":"false")+'" class="main-airport"\n                    role="option"\n                    tabindex="-1" id="'+(0===n?"selectedlihighlight0":"")+'">\n                    <div class="city-airport-country">\n                        '+t.getDisplayName(i,t.value,e,t.airports[e].length)+'\n                        <p class="country">'+t.getCountryName(i,t.value)+'</p>\n                    </div>\n                    <div class="pull-right airport-code bold">'+t.getDisplayCode(i,t.value,e,t.airports[e].length)+"</div>\n                </li>"}).join("")}).join(""):'<li class="no-airport" role="alert">'+this.t("cep.message.invalidSearch")+"</li>"},t.prototype.getSubAirports=function(t,e,n){var i=this;return'<li data-input="'+this.getInputValue(t[0],this.value,e,t.length)+'"\n            data-cityCode="'+e+'" data-cityName="'+this.getCityName(t[0])+'"\n            data-airportCode="'+e+'"\n            data-airportName="All airports"\n            data-countryName="'+this.getCountryName(t[0])+'"\n            aria-selected="'+(0===n?"true":"false")+'" class="all-airport">\n            <div class="city-airport-country">\n                '+this.getDisplayName(t[0],this.value,e,t.length)+'\n            </div>\n            <div class="pull-right airport-code bold">'+this.getDisplayCode(t[0],this.value,e,this.airports[e].length)+"</div>\n        </li>\n        "+t.map(function(t){return'<li data-input="'+i.getInputValue(t,i.value,e,0)+'"\n            data-cityCode="'+e+'" data-cityName="'+i.getCityName(t)+'"\n            data-airportCode="'+t.code+'"\n            data-airportName="'+i.getAirportName(t)+'"\n            data-countryName="'+i.getCountryName(t)+'" class="sub-airport">\n             <div class="city-airport-country">\n                '+i.getDisplayName(t,i.value,e,0)+'\n            </div>\n            <div class="pull-right airport-code bold">'+i.getDisplayCode(t,i.value,e,0)+"</div>\n        </li>"}).join("")+'\n        <li class="all-airport-country">\n            <div class="country">'+this.getCountryName(t[0],this.value)+"</div>\n        </li>"},t.prototype.getList=function(){return this.mainAirport},t.prototype.getCityName=function(t){return t.cityName[t.displayLang]},t.prototype.getAirportName=function(t){return t.names[t.displayLang]},t.prototype.getCountryName=function(t,e){var n=t.countryName[t.displayLang];return e?this.underline(n,e):n},t.prototype.getDisplayName=function(t,e,n,i){var r=this.underline(this.getCityName(t),e),a=this.underline(this.getAirportName(t),e),o='<span class="city-name">'+r+'</span><span> - </span><span class="airport-name">'+this.t("cep.allAirports")+"</span>",s='<span class="city-name">'+r+'</span><span> - </span>\n                            <span class="airport-name">'+this.underline(a,e)+"</span>";return i>1?o:s},t.prototype.getDisplayCode=function(t,e,n,i){var r=""+this.underline(n,e),a=""+this.underline(t.code,e);return i>1?r:a},t.prototype.getInputValue=function(t,e,n,i){var r=this.getCityName(t)+" "+n,a=this.getCityName(t)+" "+t.code;return i>1?r:a},t.prototype.underline=function(t,e){return t.replace(i.default.applyWordStartPattern(e.trim()),"<u>$&</u>")},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(0),a=function(){function t(){if(this.apiClient=new i.default,this.translation=r.default.getInstance(),t._instance)throw new Error("Error: Instantiation failed, user GeoLocationView.getInstance()")}return t.getInstance=function(){return t._instance},t.prototype.setDropDownInstance=function(t){this.dropDownView=t},t.prototype.getLocation=function(){var t=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){return t.getNearestAirports(e)})},t.prototype.getNearestAirports=function(t){var e=this;if(!this.geoAirports&&t.coords.latitude&&t.coords.longitude){var n={latitude:t.coords.latitude,longitude:t.coords.longitude};this.apiClient.getOauth().done(function(t){if(t.access_token){e.apiClient.getGeolocation(n,t.access_token).done(function(t){t.airports&&t.airports.length>0?e.generateNearestAirportList(t.airports):t.error&&t.error.length>0&&e.errorHandlerGeo(t.error[0].errorMessage)}).catch(function(t){e.errorHandlerGeo()})}}).catch(function(t){})}else this.geoAirports&&this.showListOfAirports()},t.prototype.errorHandlerGeo=function(t){this.geoAirports='<li class="no-airport">'+(t||this.t("cep.message.geolocationNotAvailable"))+"</li>",this.showListOfAirports()},t.prototype.generateNearestAirportList=function(t){var e=this;t=this.sortByDistance(t),this.geoAirports=""+t.map(function(t,n){return'<li data-input="'+t.cityName+" "+t.iata+'"\n        data-cityCode="'+t.cityCode+'" data-cityName="'+t.cityName+'"\n        data-airportCode="'+t.iata+'"\n        data-airportName="'+t.name+'"\n        data-countryName="'+t.countryName+'" class="main-airport"\n        role="option" tabindex="-1">\n        <div class="city-airport-country">\n        <span class="city-name">'+t.cityName+'</span><span> - </span>\n        <span class="airport-name">'+t.name+'</span>\n            <p class="country">'+t.countryName+'</p>\n        </div>\n        <div class="pull-right airport-code bold">'+t.iata+'</div>\n        <div class="pull-right country">'+Math.round(t.distanceInKm)+" "+e.t("cep.kmsAway")+"</div>\n    </li>"}).join(""),this.showListOfAirports()},t.prototype.sortByDistance=function(t){return t.sort(function(t,e){return t.distanceInKm-e.distanceInKm})},t.prototype.showListOfAirports=function(){if(!this.dropDownView.isUserTyped){this.dropDownView.$listContainer.html(this.geoAirports),this.dropDownView.showDropdown();var t=this.dropDownView.$listContainer.find("li");this.dropDownView.predictive.setHeightAndInteractions(t)}},t.prototype.t=function(t){return this.translation.t(t)},t._instance=new t,t}();e.default=a},function(t,e){t.exports='<div class="tool-tip small bottom-left cep-tool-tip error">\r\n    <div class="tool-tip-inner">\r\n        \x3c!-- <a href="#" class="icon-close-grey"></a> --\x3e\r\n        <span id="message" role="alert"></span>\r\n    </div>\r\n</div>\r\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=(n(66),n(67)),r=n(4),a=n(0),o=n(7),s=n(8),d=function(){function t(t,e){this.fieldsView=t,this.config=e,this.flagToCheckYouth=!1,this.translation=a.default.getInstance(),this.isOutDateFocussed=!1,this.isInDateFocussed=!1,this.isFirstDateFocus=!0,this.init()}return t.prototype.init=function(){this.$target=this.fieldsView.$fieldsElement.find(".calendar-set"),this.$outPointer=this.$target.find(".outbound .arrow-up"),this.$inPointer=this.$target.find(".inbound .arrow-up"),this.$outIcon=this.$target.find(".outbound .icon-calendar"),this.$inIcon=this.$target.find(".inbound .icon-calendar"),this.$outboundInput=this.$target.find("#Outbound"),this.$inboundInput=this.$target.find("#Inbound"),this.$returnField=new o.default(this.$inboundInput),this.$outBoundDateField=new o.default(this.$outboundInput),this.$dateDropDownBox=this.$target.find(".calendar-wrapper"),this.loadDateDropdown(),this.setInteractions()},t.prototype.loadDateDropdown=function(){var t=this;this.dateDDView=new i.default(this,function(e,n,i,r,a){return t.displayDate(e,n,i,r,a)},this.config)},t.prototype.setInteractions=function(){var t,e=this;window;this.$outboundInput.on("focus",function(t){return e.onFocusInput(t)}),this.$inboundInput.on("focus",function(t){return e.onFocusInput(t)}),this.$target.find("label").on("click",function(t){return e.onFocusInput(t)}),this.$outboundInput.on("touchend click",function(n){!0!==t&&e.dateDDView.onDateInputClick(n)}).on("touchmove",function(e){t=!0}).on("touchstart",function(){t=!1}),this.$inboundInput.on("touchend click",function(n){!0!==t&&e.dateDDView.onDateInputClick(n)}).on("touchmove",function(e){t=!0}).on("touchstart",function(){t=!1}),this.$outIcon.on("click",function(t){return e.dateDDView.onDateInputClick(t)}),this.$inIcon.on("click",function(t){return e.dateDDView.onDateInputClick(t)})},t.prototype.onFocusInput=function(t){var e=$(t.currentTarget),n=e.closest(".input-set");this.isFirstDateFocus&&$(".calendar-inner").is(":hidden")&&this.fieldsView.cepView.controller.checkSeasonalOND()&&(this.dateDDView.lpcView.triggerLPC(),this.isFirstDateFocus=!1);var i=this.isInDateFocussed;if(this.fieldsView.hideAllDD(),this.isInDateFocussed=i,n.find("input").addClass("focus-color"),this.dateDDView.$dropdown.show(),n.hasClass("outbound"))if(this.$outPointer.show(),t.preventDefault(),$("#lpc-tab").hasClass("active")){var r=this.t("cep.date.departure")+" "+this.t("calendar.regularCalendar");$("#regular-calendar-tab").attr("aria-label",r),$("#lpc-tab").focus()}else{var r=this.t("cep.date.departure")+" "+this.t("cep.readerText.regularCalendar");$("#regular-calendar-tab").attr("aria-label",r),$("#regular-calendar-tab").focus()}else if(n.hasClass("inbound")){if(this.$inPointer.show(),$("#lpc-tab").hasClass("active"));else if($("#regular-calendar-tab").hasClass("active")){var r=this.t("cep.date.return")+" "+this.t("cep.readerText.regularCalendar");$("#regular-calendar-tab").attr("aria-label",r)}this.dateDDView.$calendar.find(".start-date").focus()}this.dateDDView.showSelectedMonths(t)},t.prototype.onBlurInput=function(t){$(t.currentTarget).removeClass("focus-color"),this.dateDDView.hideDropDown()},t.prototype.displayDate=function(t,e,n,i,r){var a=this;this.$inPointer.is(":hidden")&&!r||"start-date"===n?(this.updateDates(this.$outboundInput,e,t),i||("one-way"===this.dateDDView.tripType?(clearTimeout(this.xteime),this.xteime=setTimeout(function(){a.fieldsView.paxFieldView.isPaxFocussed=!0,a.fieldsView.cepView.focusNextEle(a.$target)},500)):(this.isOutDateFocussed=!1,this.isInDateFocussed=!0,clearTimeout(this.xteime),this.xteime=setTimeout(function(){a.fieldsView.cepView.focusNextEle(a.$outboundInput.parent(),!0)},50)))):(this.updateDates(this.$inboundInput,e,t),i||(clearTimeout(this.xteime),this.xteime=setTimeout(function(){a.fieldsView.paxFieldView.isPaxFocussed=!0,a.dateDDView.dateView.start?a.fieldsView.cepView.focusNextEle(a.$target):$("#Outbound").focus()},500))),"start-date"===n&&this.fieldsView.getDobTFromCep()&&$("#Outbound").is(":visible")&&this.checkDateForLoggedinPassenges("start-date",t),this.$returnField.removeError()},t.prototype.updateDates=function(t,e,n){if(e&&""!==e&&n&&""!==n){var i=e.toLowerCase().charAt(0).toUpperCase()+e.toLowerCase().slice(1);t.val(i),t.attr("data-date",n),this.$inPointer.is(":hidden")}else t.val(""),t.removeAttr("data-date");this.fieldsView.validate(t),r.default.pushLabelUp()},t.prototype.updateCEPDate=function(t,e){var n;if("OUTBOUND"===e?(n=this.$outboundInput,this.dateDDView.dateView.start=s.default.parse(t)):"INBOUND"===e&&(n=this.$inboundInput,this.dateDDView.dateView.end=s.default.parse(t)),n){this.updateDates(n,s.default.formatDate(s.default.parse(t),"ddd, DD MMM"),t);var i=this.dateDDView.dateView.getSelectedDateDOM(this.dateDDView.dateView.start);this.dateDDView.putCalDOM(i),this.dateDDView.setDefaultDates()}},t.prototype.onTripTypeChange=function(t){this.dateDDView.tripType=t,"one-way"===t?(this.$outPointer.is(":hidden")&&!$(".calendar-inner").is(":hidden")&&this.$outPointer.show(),""!==this.$outboundInput.val()&&this.resetOutCalendar(),this.$inPointer.hide(),this.dateDDView.$day.removeClass("end-date"),this.dateDDView.$day.removeClass("date-range"),this.dateDDView.$calendar.find(".start-date").addClass("one-way-date")):(this.$inPointer.is(":hidden")&&""!==this.$outboundInput.val()&&this.$inboundInput.val(),this.dateDDView.$day.removeClass("one-way-date"),this.dateDDView.setDateRange())},t.prototype.hideDropDown=function(){this.$target.find("input").removeClass("focus-color"),this.dateDDView.hideDropDown(),this.isOutDateFocussed=!1,this.isInDateFocussed=!1},t.prototype.resetOutCalendar=function(){this.dateDDView.$dropdown.hide(),this.$outPointer.hide()},t.prototype.checkDateForLoggedinPassenges=function(t,e){this.fieldsView.isCepInitialized&&this.youthValidation(t,e)},t.prototype.youthValidation=function(t,e){if(t=t||"start-date",e=e||this.$outboundInput.attr("data-date"),"start-date"===t&&this.fieldsView.getDobTFromCep()){if(this.fieldsView.paxFieldView.paxDDView.youthHelper.checkItisYouthOrNot().flagForCheckYouth)this.checkForLoggedInPassengerType(e);else{this.flagToCheckYouth=!1;var n=this.fieldsView.getDobTFromCep(),i=this.fieldsView.checkAgeForCustomer(n,new Date(e));i[1]<12||i[1]>=26?this.fieldsView.paxFieldView.paxDDView.$bookYouth.hasClass("displayNone"):this.fieldsView.paxFieldView.paxDDView.$bookYouth.hasClass("displayNone")&&this.fieldsView.paxFieldView.paxDDView.youthHelper.removeClassDisplayNone(),this.$outBoundDateField.removeError()}}},t.prototype.checkForLoggedInPassengerType=function(t){var e=this.fieldsView.getDobTFromCep(),n=new Date(t),i=this.fieldsView.checkAgeForCustomer(e,n);if(i[1]>=26)this.flagToCheckYouth=!0,this.errorMessage=this.t("cep.message.turningToYouth"),this.$outBoundDateField.setError(this.errorMessage),this.$outBoundDateField.showError();else if(i[1]<12)this.flagToCheckYouth=!0,this.errorMessage="You ll still be a child when this trip starts, so you can only book a child ticket on this date",this.$outBoundDateField.setError(this.errorMessage),this.$outBoundDateField.showError();else if(i[1]<26&&i[1]>=12){this.flagToCheckYouth=!1;var r=this.fieldsView.paxFieldView.paxDDView;r.$bookYouth.hasClass("displayNone")&&this.fieldsView.paxFieldView.paxDDView.$dropDown.is(":hidden")&&this.fieldsView.paxFieldView.paxDDView.youthHelper.removeClassDisplayNone(),this.$outBoundDateField.removeError()}else this.flagToCheckYouth=!1,this.$outBoundDateField.removeError()},t.prototype.showLPC=function(t,e){$(".calendar-inner").is(":hidden")&&this.$outboundInput.focus(),t&&!0===t?(this.fieldsView.cepView.showLpcForUpsellError(e),"erroroutbound"===e?this.$outboundInput.focus():this.$inboundInput.focus(),this.dateDDView.lpcView.triggerLPC(t)):this.dateDDView.lpcView.reLoadRC()},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=d},function(t,e){t.exports='<div class="input-set  large-6  medium-6 small-6  col outbound">\r\n    <label aria-label="Select your Outbound Date" for="Outbound" data-i18n="cep.date.departure"> Departure </label>\r\n    <input id="Outbound" name="" type="text" value="" tabindex="0" readonly autocomplete="off"></input>\r\n    <div class="arrow-up"></div>\r\n    <span class="icon-calendar"></span>\r\n</div>\r\n<div class="input-set  large-6  medium-6 small-6  col inbound">\r\n    <label aria-label="Select your Inbound date" for="Inbound" data-i18n="cep.date.return"> Return </label>\r\n    <input id="Inbound" name="" type="text" value="" tabindex="0" readonly autocomplete="off"></input>\r\n    <div class="arrow-up"></div>\r\n    <span class="icon-calendar"></span>\r\n</div>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(68),r=n(69),a=n(8),o=n(0),s=n(82),d=n(84),l=n(3),c=n(9),u=n(2),p=n(22),h=n(23),f=n(24),g=n(14),w=function(){function t(t,e,n){this.calendarSetView=t,this.dayClick=e,this.config=n,this.$target=this.calendarSetView.$target,this.translation=o.default.getInstance(),this.cepData=l.default.getInstance(),this.dataLayerService=new u.default,this.init()}return t.prototype.init=function(){var t=this;this.$target.append(i),this.calendarSetView.isOutDateFocussed=!1,this.calendarSetView.isInDateFocussed=!1,this.translation.applyTranslation(this.$target),this.$dropdown=this.$target.find(".ocp-bottom-drop-2"),this.$calendar=this.$target.find(".regular-calendar-inner"),this.$outPointer=this.$target.find(".outbound .arrow-up"),this.$inPointer=this.$target.find(".inbound .arrow-up"),this.$lpcTab=this.$target.find("#lpc-tab"),this.$regularCalendarTab=this.$target.find("#regular-calendar-tab"),this.$lpcOuntboundMonthDropdown=this.$target.find("#calendar-monthDropDown-1select"),this.$holidaysCheckBox=this.$target.find("#regular-calendar-footer").find(".holidays"),this.$calWrapper=this.$target.find(".calendar-wrapper"),this.loadDateView(),this.setDefaultDates(),this.bindPrevNextEvents(),this.disablePrevNextMonth(),this.bindDayEvents(),this.accessibilityEvents(),!this.dateView.isDesktop||this.config.disableHoliday?this.$target.find("#regular-calendar-footer").find(".flights-filter").hide():this.$holidaysCheckBox.click(function(){t.handleHolidays()})},t.prototype.loadDateView=function(){var t=this;this.dateView=new r.default(this.config,{onDayClick:function(e,n,i){t.dayClick(e,n,i)}}),this.$calendar.html(this.dateView.getCalendar()),this.lpcView=new s.default(this,this.$target,this.config,this.calendarSetView.fieldsView.cepView.controller),this.loadHolidays()},t.prototype.setDefaultDates=function(){var t=a.default.formatDate(this.dateView.start,"ddd, DD MMM"),e=a.default.formatDate(this.dateView.start,"YYYY-MM-DD");if(this.dayClick(e,t,"start-date",!0,!0),null!=this.dateView.end){var n=a.default.formatDate(this.dateView.end,"ddd, DD MMM"),i=a.default.formatDate(this.dateView.end,"YYYY-MM-DD");this.dayClick(i,n,"end-date",!0,!0)}},t.prototype.bindPrevNextEvents=function(){var t=this;this.$prevMonth=this.$target.find("#prev-month"),this.$nextMonth=this.$target.find("#next-month"),this.$prevMonth.on("click",function(e){return t.prevNextMonthClick(e,0)}),this.$nextMonth.on("click",function(e){return t.prevNextMonthClick(e,1)})},t.prototype.prevNextMonthClick=function(t,e){t.preventDefault();var n=this.dateView.prevNextMonthDOM(e);this.putCalDOM(n),this.dataLayerService.prevNextMonth(e)},t.prototype.hideDropDown=function(){this.$dropdown.hide(),this.$outPointer.hide(),this.$inPointer.hide()},t.prototype.scrollForOutDateElements=function(t,e,n){t.offset()&&e.offset()&&t.animate({scrollTop:e.offset().top},void 0===n?500:n)},t.prototype.scrollForInDate=function(){if(!this.dateView.isDesktop){var t=void 0;this.lpcView.$lpcFooter&&(t=this.lpcView.$lpcFooter.offset()),t&&t.top&&$("html, body").animate({scrollTop:t.top-$(window).height()},500)}},t.prototype.lpcMobileScrollActions=function(t){if(!this.dateView.isDesktop){"Outbound"===t.attr("id")?this.scrollForOutDateElements($("html, body"),t):this.scrollForInDate()}},t.prototype.onDateInputClick=function(t){t.preventDefault();var e=$(t.currentTarget);1===e.closest(".input-set.outbound").length?this.clickEventOutDate(e):this.clickEventOnInDate(e),this.dateView.isDesktop||this.calendarSetView.isOutDateFocussed||this.calendarSetView.isInDateFocussed||this.calendarSetView.fieldsView.hideAllDD()},t.prototype.clickEventOnInDate=function(t){t.is("input")||(t=this.calendarSetView.$inboundInput),this.calendarSetView.isInDateFocussed?(t.trigger("blur"),this.calendarSetView.isInDateFocussed=!1):(this.focusInDate(t),this.$lpcTab.hasClass("active")&&this.scrollForInDate())},t.prototype.clickEventOutDate=function(t){t.is("input")||(t=this.calendarSetView.$outboundInput),this.calendarSetView.isOutDateFocussed?(t.trigger("blur"),this.calendarSetView.isOutDateFocussed=!1):(this.focusOutDate(t),this.$lpcTab.hasClass("active")&&this.lpcMobileScrollActions(t))},t.prototype.focusOutDate=function(t){t.trigger("focus"),this.calendarSetView.isOutDateFocussed=!0,!0===this.calendarSetView.isInDateFocussed&&(this.calendarSetView.isInDateFocussed=!1)},t.prototype.focusInDate=function(t){t.trigger("focus"),this.calendarSetView.isInDateFocussed=!0,!0===this.calendarSetView.isOutDateFocussed&&(this.calendarSetView.isOutDateFocussed=!1)},t.prototype.showSelectedMonths=function(t){t.preventDefault();var e=$(t.currentTarget);this.lpcView.enableLPC(),this.$lpcTab.hasClass("active")?this.lpcView.reloadLPC():this.updateRC(e)},t.prototype.updateRC=function(t){var e=t.attr("data-date");if(e&&"undefined"!==e&&t.val().trim().length>0){var n=a.default.parse(t.attr("data-date")),i=n.getMonth()+""+n.getFullYear(),r=this.dateView.calenderDates[0].getMonth()+""+this.dateView.calenderDates[0].getFullYear(),o=this.dateView.calenderDates[1]?this.dateView.calenderDates[1].getMonth()+""+this.dateView.calenderDates[1].getFullYear():"";if(n&&r!==i&&o!==i){var s=this.dateView.getSelectedDateDOM(n);this.putCalDOM(s)}}},t.prototype.putCalDOM=function(t){this.$calendar.html(t),this.bindDayEvents(),this.disablePrevNextMonth(),"OW"===this.tripType&&(this.$day.removeClass("end-date date-range"),this.$calendar.find("td.start-date").addClass("one-way-date"))},t.prototype.disablePrevNextMonth=function(){this.dateView.disablePrev?this.$prevMonth.addClass("disabled"):this.$prevMonth.removeClass("disabled"),this.dateView.disableNext?this.$nextMonth.addClass("disabled"):this.$nextMonth.removeClass("disabled")},t.prototype.bindDayEvents=function(){var t=this;this.$day=this.$calendar.find("td"),this.$day.on("click",function(e){return t.daySelect(e)}),this.$day.on("mouseover",function(e){return t.ondateMouseOver(e)}),this.$day.on("mouseleave",function(e){return t.ondateMouseLeave(e)}),this.addHolidayFilter()},t.prototype.ondateMouseOver=function(t){this.setDateRangeOnHover(t),!0===this.dateView.isDesktop&&this.showHoliday(t)},t.prototype.ondateMouseLeave=function(t){this.removeDateRangeOnHover(t),!0===this.dateView.isDesktop&&this.hideHoliday(t)},t.prototype.showHoliday=function(t){!0===this.config.showHolidays&&$(t.target).closest("td").addClass("filter-tool-tip")},t.prototype.hideHoliday=function(t){$(t.target).closest("td").removeClass("filter-tool-tip")},t.prototype.daySelect=function(t){t.stopPropagation();var e="",n=new Date($(t.currentTarget).attr("data-date"));if(this.$inPointer.is(":hidden"))e="start-date",this.dataLayerService.GTMtrackInteraction("CEP","Calendar","Regular Calendar - Select Departure Date"),this.$day.removeClass("before-start-date start-date one-way-date date-range"),$(t.currentTarget).addClass("start-date"),"one-way"===this.tripType&&$(t.currentTarget).addClass("one-way-date"),this.dateView.end&&h(n,this.dateView.end)&&(this.$day.removeClass("end-date"),this.calendarSetView.updateDates(this.calendarSetView.$inboundInput,"",""),this.dateView.start=this.dateView.end=null);else{c.default.getItem("saslogoClickConf");e="end-date",this.dataLayerService.GTMtrackInteraction("CEP","Calendar","Regular Calendar - Select Return Date"),this.$day.removeClass("before-start-date end-date date-range"),$(t.currentTarget).addClass("end-date"),this.dateView.start&&"one-way"!==this.tripType&&!this.$inPointer.is(":hidden")&&h(this.dateView.start,n)&&(e="start-date",this.$day.removeClass("before-start-date date-range start-date end-date"),this.calendarSetView.updateDates(this.calendarSetView.$inboundInput,"",""),$(t.currentTarget).addClass("start-date"),this.dateView.start=this.dateView.end=null)}e&&(this.dateView.daySelect(t,e),this.setDateRange(this.dateView.start,this.dateView.end)),$(t.currentTarget).attr("aria-selected","true"),$(".valid-day").not(".start-date").not(".end-date").removeAttr("aria-selected")},t.prototype.setDateRangeOnHover=function(t){var e=new Date(new Date($(t.currentTarget).attr("data-date")).setHours(0,0,0,0));(this.dateView.start&&!this.dateView.end&&!this.$inPointer.is(":hidden")||!this.dateView.start&&this.dateView.end&&!this.$outPointer.is(":hidden")&&"one-way"!==this.tripType)&&(this.$day.removeClass("date-range"),this.dateView.start?this.setDateRange(this.dateView.start,e,!0):this.dateView.end&&this.setDateRange(e,this.dateView.end,!0,!0)),h(this.dateView.start,e)||this.dateView.end&&h(e,this.dateView.end)?$(t.currentTarget).addClass("before-start-date"):this.$day.removeClass("before-start-date")},t.prototype.removeDateRangeOnHover=function(t){(this.dateView.start&&!this.dateView.end&&!this.$inPointer.is(":hidden")||!this.dateView.start&&this.dateView.end&&!this.$outPointer.is(":hidden")&&"one-way"!==this.tripType)&&this.$day.removeClass("date-range"),this.$day.removeClass("before-start-date")},t.prototype.setDateRange=function(t,e,n,i){var r=this,a=!t||!e;t=t||this.dateView.start,e=e||this.dateView.end,t&&e&&"one-way"!==this.tripType&&this.$day.each(function(o,s){var d=new Date($(s).attr("data-date")).setHours(0,0,0,0),l=!!n||!g(d,e),c=i?f(d,e)&&!g(d,e):h(d,t)&&!g(d,t);h(e,t)&&c&&l&&p(d,t,e)&&$(s).addClass("date-range"),a&&!$(s).hasClass("end-date")&&h(r.dateView.end,r.dateView.start)&&g(d,r.dateView.end)&&$(s).addClass("end-date")})},t.prototype.updateDatesOfCalendar=function(t,e,n){t=t||this.dateView.start,e=e||this.dateView.end,"one-way"!==this.tripType?t&&e?(this.$day.removeClass("before-start-date date-range start-date end-date one-way-date"),this.$day.each(function(n,i){var r=new Date($(i).attr("data-date")).setHours(0,0,0,0);h(e,t)&&h(r,t)&&!g(r,t)&&!g(r,e)&&p(r,t,e)?$(i).addClass("date-range"):g(r,t)?$(i).addClass("start-date"):g(r,e)&&$(i).addClass("end-date")})):t&&(this.$day.removeClass("before-start-date date-range start-date end-date one-way-date"),this.$day.each(function(e,n){var i=new Date($(n).attr("data-date")).setHours(0,0,0,0);g(i,t)&&$(n).addClass("start-date")})):"one-way"===this.tripType&&(this.$day.removeClass("before-start-date date-range start-date end-date one-way-date"),this.$day.each(function(e,n){var i=new Date($(n).attr("data-date")).setHours(0,0,0,0);g(i,t)&&$(n).addClass("one-way-date")}),this.dataLayerService.GTMtrackInteraction("CEP","Calendar","Regular Calendar - Add Return Flight"))},t.prototype.handleHolidays=function(t){this.$holidaysCheckBox.hasClass("active")?(this.$holidaysCheckBox.removeClass("active"),this.config.showHolidays=!1,this.removeHolidayFilter()):(this.config.showHolidays=!0,this.$holidaysCheckBox.addClass("active"),this.addHolidayFilter())},t.prototype.updateHolidayFromLPC=function(t){t!==this.config.showHolidays&&(this.config.showHolidays=t,this.handleHolidays())},t.prototype.addHolidayFilter=function(){this.$day&&!0===this.config.showHolidays&&this.$day.find(".filter-mark-wrap").parent("td").addClass("filter-mark")},t.prototype.removeHolidayFilter=function(){this.$day&&(this.$day.find(".filter-mark-wrap").parent("td").removeClass("filter-mark"),this.$target.find(".holiday-tool-tip").hide())},t.prototype.loadHolidays=function(){!0===this.config.showHolidays&&this.handleHolidays()},t.prototype.accessibilityEvents=function(){this.$validDate=this.$target.find("td.valid-day"),this.accessDateSubView=new d.default(this)},t.prototype.announceBound=function(t){var e;"departure"===t&&(e=this.translation.t("cep.readerText.outbounddate"),clearTimeout(this.timeoutfntwo),this.timeoutfntwo=setTimeout(function(){$("#sr-dummyel-rcal").html(e)},50)),"return"===t&&(e=this.translation.t("cep.readerText.returndate"),clearTimeout(this.timeoutfneight),this.timeoutfneight=setTimeout(function(){$("#sr-dummyel-rcal").html(e)},50)),clearTimeout(this.timeoutfnnine),this.timeoutfnnine=setTimeout(function(){$("#sr-dummyel-rcal").html("")},150)},t}();e.default=w},function(t,e){t.exports='<section class="calendar-wrapper ocp-bottom-drop-2" style="display: none;">\r\n    <article class="calendar-inner">\r\n        <ul class="calendar-tab" >\r\n            <li ><a href="javascript:;" class="active tab-regular-calendar" data-tab="tab-1" data-i18n="calendar.regularCalendar"\r\n                    id="regular-calendar-tab" tabindex="0" >Regular calendar </a> </li>\r\n            <li ><a href="javascript:;" data-tab="tab-2" class="tab-lpc-calendar" data-i18n="lowPriceCalendar"\r\n                 id="lpc-tab" tabindex="0">Lowprice calendar</a></li>\r\n        </ul>\r\n        <span class="sr-only" id="sr-dummyel-rcal" aria-live="assertive"></span>\r\n        <div class="calendar-tab-content active regular-calendar" id="tab-1">\r\n            <span class="icon-arrow-left-grey2 arrow-left prev-month" tabindex="-1" id="prev-month" aria-label="cep.readerText.prevmonth" role="button">left</span>\r\n            <span class="icon-arrow-right-grey2 arrow-right next-month" tabindex="-1" id="next-month" aria-label="cep.readerText.nextmonth" role="button">right</span>\r\n            <div class="regular-calendar-inner"></div>\r\n        </div>\r\n        <div id="lpc" style="display: none;">\r\n            <ul class="spinner white-bg" style="display: none;">\r\n                <li class="bounce1"></li>\r\n                <li class="bounce2"></li>\r\n                <li class="bounce3"></li>\r\n            </ul>\r\n        </div>\r\n        <footer id="regular-calendar-footer" class="calendar-footer gradient regular-calendar-footer">\r\n            <ul class="flights-filter">\r\n                <li class="show" data-i18n="lowPriceCalendar.show">Show:</li>\r\n                <li class="direct-flights"><a href="javascript:void(0)" tabindex="-1">Direct Flights</a></li>\r\n                <li class="booked-flights"><a href="javascript:void(0)" tabindex="-1">My booked flights</a></li>\r\n                <li class="holidays"><a href="javascript:void(0)" data-i18n="lowPriceCalendar.holidays">Holidays</a></li>\r\n            </ul>\r\n        </footer>\r\n    </article>\r\n</section>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(8),r=n(9),a=(n(20),n(22)),o=n(23),s=n(14),d=n(16),l=n(24),c=function(){function t(t,e){this.config=t,this.o=e,this.init()}return t.prototype.init=function(){this.isDesktop=$(window).width()>=767,this.currDate=new Date,this.currDate=new Date(this.currDate.setHours(0,0,0,0));var t=this.config.urlParams&&this.config.urlParams.itineraryParams?this.config.urlParams.itineraryParams:[],e=i.default.parse(t[2]);if(this.checkForSessionFlag="true"!==r.default.getItem("saslogoClickConf"),this.checkForSessionFlag&&d(e)&&!l(e,this.currDate)&&(this.start=e),this.start&&(this.start=new Date(this.start.setHours(0,0,0,0))),d(e)&&!l(e,this.currDate)){var n=i.default.parse(t[3]);this.end=d(n)&&!l(n,this.currDate)?n:this.end,this.end=this.end?new Date(this.end.setHours(0,0,0,0)):this.end}this.options={pane:this.isDesktop?2:1,format:"ddd, DD MMM",minDate:0,maxDate:359,outDate:this.start},this.options=$.extend(!0,this.o,this.options),this.maxDate=new Date,this.options.maxDate&&(this.maxDate=new Date(this.maxDate.setDate(this.maxDate.getDate()+this.options.maxDate))),this.calenderDates=[],this.getcalendarDates(this.options),this.monthRange=i.default.getMonthRange(this.currDate),this.dateRange=i.default.getDateRange(this.options,this.calenderDates,this.config),this.generateCalendar()},t.prototype.getCalendar=function(){return this.calendarBlock},t.prototype.prevNextMonthDOM=function(t){var e=this.calenderDates[0].getFullYear(),n=this.calenderDates[0].getMonth(),r=this.calenderDates[0].getDate();if(0===t){var a=i.default.getYearMonth(e,n-1);this.currDate=new Date(a.year,a.month,r),this.getcalendarDates({}),this.dateRange=i.default.getDateRange(this.options,this.calenderDates,this.config)}else{var o=i.default.getYearMonth(e,n+1);this.currDate=new Date(o.year,o.month,r),this.getcalendarDates({}),this.dateRange=i.default.getDateRange(this.options,this.calenderDates,this.config)}return this.generateCalendar(),this.getCalendar()},t.prototype.getSelectedDateDOM=function(t,e){return e?this.getcalendarDates({outDate:t,inDate:e}):this.getcalendarDates({outDate:t}),this.dateRange=i.default.getDateRange(this.options,this.calenderDates,this.config),this.generateCalendar(),this.getCalendar()},t.prototype.daySelect=function(t,e){var n=t.currentTarget,r=$(n).attr("data-input"),a=$(n).attr("data-date"),o=i.default.parse(a);this.start="start-date"===e?o:this.start,this.end="end-date"===e?o:this.end,this.options.onDayClick&&this.options.onDayClick(a,r,e)},t.prototype.generateCalendar=function(){var t=this;this.calendarBlock=""+this.dateRange.map(function(e,n){return'\n            <div class="'+(0===n?"left-calendar pad-r-5":"right-calendar pad-l-5")+' pull-left large-6  medium-6 small-6 col">\n                <table>\n                    <caption data-month="'+t.calenderDates[n].getMonth()+'"\n                    aria-label="'+t.AccessibilityCalendarMonths(t.calenderDates[n])+'" >\n                        '+i.default.parseMonthYear(t.calenderDates[n],t.config.lang)+'\n                    </caption>\n                    <thead aria-hidden = "true">\n                        <tr>\n                            '+i.default.daysOfWeek.map(function(t){return"<th>"+t+"</th>"}).join("")+"\n                        </tr>\n                    </thead>\n                    <tbody>\n                        "+t.getTableRows(e)+"\n                  </tbody>\n                </table>\n            </div>"}).join("")},t.prototype.getTableRows=function(t){for(var e="",n=0;n<t.length;n++){if(n%7==0)if(0===n)e+="<tr>";else{if("future-day"===t[n].sclass){e+="</tr>";break}e+="</tr> <tr>"}else e+="";e+='<td class="'+this.getItemClasses(t[n])+'" '+("past-day"!==t[n].sclass&&"future-day"!==t[n].sclass?'data-input="'+this.stringify(t[n].date)+'" data-date="'+this.stringify(t[n].date,"YYYY-MM-DD")+'"':"")+'\n                 aria-label="'+this.formatDatesAccessibility(t[n].date,t[n].holiday)+'" tabindex="0">\n                             '+(t[n].holiday&&null!==t[n].holiday?this.getHolidayContent(t[n].holiday):"")+'<span class="date">\n                                '+this.getCalenderValue(t[n])+"\n                            </span>\n                            </td>"}return e},t.prototype.getHolidayContent=function(t){return'<div class="filter-mark-wrap">\n                <span class="holiday-mark"></span>\n              </div>\n            <div class="holiday-tool-tip" style="display: none;">\n              <p><span class="holiday-mark"></span>'+t+"</p>\n            </div>"},t.prototype.getcalendarDates=function(t){t.pane=t.pane?t.pane:this.options.pane,this.calenderDates[0]=t.outDate?i.default.parse(t.outDate):this.currDate;var e=this.calenderDates[0].getMonth()+" "+this.calenderDates[0].getFullYear(),n=(new Date).getMonth()+" "+(new Date).getFullYear(),r=this.maxDate.getMonth()+" "+this.maxDate.getFullYear();if(this.disablePrev=e===n,2===t.pane){if(t.inDate){var a=i.default.parse(t.inDate);this.calenderDates[1]=a.getMonth()>this.calenderDates[0].getMonth()?a:i.default.siblingsMonth(this.calenderDates[0],1)}else this.calenderDates[1]=i.default.siblingsMonth(this.calenderDates[0],1);var o=this.calenderDates[1].getMonth()+" "+this.calenderDates[0].getFullYear();this.disableNext=o===r}else this.disableNext=e===r},t.prototype.getCalenderValue=function(t){return"past-day"!==t.sclass&&"future-day"!==t.sclass?t.text:""},t.prototype.getItemClasses=function(t){""===t.sclass&&(t.sclass="valid-day");var e=[],n=this.stringify(t.date,"YYYY-MM-DD"),i=this.stringify(this.start,"YYYY-MM-DD"),r=this.stringify(this.end,"YYYY-MM-DD"),d=void 0!==t.date&&void 0!==this.start&&n===i&&this.checkForSessionFlag?"start-date":"",l=void 0!==t.date&&void 0!==this.end&&n===r?"end-date":"",c=o(this.end,this.start)&&o(t.date,this.start)&&!s(t.date,this.start)&&!s(t.date,this.end)&&a(t.date,this.start,this.end)?"date-range":"",u=o(t.date,this.maxDate)?"disable-date":"";return e.push(t.sclass),e.push(d),e.push(l),e.push(c),e.push(u),e.join(" ")},t.prototype.stringify=function(t,e){return t?(e=e||this.options.format,i.default.formatDate(t,e)):""},t.prototype.formatDatesAccessibility=function(t,e){if(void 0!==t){var n=[i.default.translation.t("calendar.month.january"),i.default.translation.t("calendar.month.february"),i.default.translation.t("calendar.month.march"),i.default.translation.t("calendar.month.april"),i.default.translation.t("calendar.month.may"),i.default.translation.t("calendar.month.june"),i.default.translation.t("calendar.month.july"),i.default.translation.t("calendar.month.august"),i.default.translation.t("calendar.month.september"),i.default.translation.t("calendar.month.october"),i.default.translation.t("calendar.month.november"),i.default.translation.t("calendar.month.december")],r=[i.default.translation.t("cep.readerText.sunday"),i.default.translation.t("cep.readerText.monday"),i.default.translation.t("cep.readerText.Tuesday"),i.default.translation.t("cep.readerText.wednesday"),i.default.translation.t("cep.readerText.thursday"),i.default.translation.t("cep.readerText.friday"),i.default.translation.t("cep.readerText.saturday")],a=t.getDate(),o=t.getMonth();return r[t.getDay()]+" "+a+" "+n[o]+" "+t.getFullYear()+" "+(null===e?"":e)}},t.prototype.AccessibilityCalendarMonths=function(t){if(void 0!==t){return[i.default.translation.t("calendar.month.january"),i.default.translation.t("calendar.month.february"),i.default.translation.t("calendar.month.march"),i.default.translation.t("calendar.month.april"),i.default.translation.t("calendar.month.may"),i.default.translation.t("calendar.month.june"),i.default.translation.t("calendar.month.july"),i.default.translation.t("calendar.month.august"),i.default.translation.t("calendar.month.september"),i.default.translation.t("calendar.month.october"),i.default.translation.t("calendar.month.november"),i.default.translation.t("calendar.month.december")][t.getMonth()]+" "+t.getFullYear()}},t}();e.default=c},function(t,e,n){function i(t){return r(t).getTime()<(new Date).getTime()}var r=n(1);t.exports=i},function(t,e,n){function i(t){var e=r(t);return o(e,a(e))+1}var r=n(1),a=n(72),o=n(73);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}var r=n(1);t.exports=i},function(t,e,n){function i(t,e){var n=r(t),i=r(e),s=n.getTime()-n.getTimezoneOffset()*a,d=i.getTime()-i.getTimezoneOffset()*a;return Math.round((s-d)/o)}var r=n(74),a=6e4,o=864e5;t.exports=i},function(t,e,n){function i(t){var e=r(t);return e.setHours(0,0,0,0),e}var r=n(1);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=a(e).getTime()-o(e).getTime();return Math.round(n/s)+1}var r=n(1),a=n(15),o=n(77),s=6048e5;t.exports=i},function(t,e,n){function i(t,e){var n=e?Number(e.weekStartsOn)||0:0,i=r(t),a=i.getDay(),o=(a<n?7:0)+a-n;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}var r=n(1);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=new Date(0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),a(n)}var r=n(21),a=n(15);t.exports=i},function(t,e,n){var i=n(79),r=n(80);t.exports={distanceInWords:i(),format:r()}},function(t,e){function n(){function t(t,n,i){i=i||{};var r;return r="string"==typeof e[t]?e[t]:1===n?e[t].one:e[t].other.replace("{{count}}",n),i.addSuffix?i.comparison>0?"in "+r:r+" ago":r}var e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:t}}t.exports=n},function(t,e,n){function i(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=["AM","PM"],d=["am","pm"],l=["a.m.","p.m."],c={MMM:function(e){return t[e.getMonth()]},MMMM:function(t){return e[t.getMonth()]},dd:function(t){return n[t.getDay()]},ddd:function(t){return i[t.getDay()]},dddd:function(t){return o[t.getDay()]},A:function(t){return t.getHours()/12>=1?s[1]:s[0]},a:function(t){return t.getHours()/12>=1?d[1]:d[0]},aa:function(t){return t.getHours()/12>=1?l[1]:l[0]}};return["M","D","DDD","d","Q","W"].forEach(function(t){c[t+"o"]=function(e,n){return r(n[t](e))}}),{formatters:c,formattingTokensRegExp:a(c)}}function r(t){var e=t%100;if(e>20||e<10)switch(e%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"}var a=n(81);t.exports=i},function(t,e){function n(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);var r=i.concat(e).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+r.join("|")+"|.)","g")}var i=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=n(8),a=n(83),o=n(2),s=n(13),d=function(){function t(t,e,n,r){this.dateDDView=t,this.$target=e,this.config=n,this.cepController=r,this.translation=i.default.getInstance(),this.dataLayerService=new o.default,this.init()}return t.prototype.init=function(){var t=this;this.$calendarTab=this.$target.find("#regular-calendar-tab"),this.$lpcTab=this.$target.find("#lpc-tab"),this.$outboundInput=this.$target.find("#Outbound"),this.$inboundInput=this.$target.find("#Inbound"),this.$lpcCalendar=$("#lpc"),this.$lpcSpinner=this.$lpcCalendar.find(".spinner"),this.$regularCalendar=$("#tab-1"),this.$CEPFooter=$("#regular-calendar-footer"),this.$outBoundDropdown=this.$target.find("#calendar-monthDropDown-1"),this.$lpcTab.click(function(e){t.triggerLPC()}),this.$calendarTab.click(function(e){t.dataLayerService.GTMtrackInteraction("CEP","Calendar","Regular Calendar - Show Calendar"),t.reLoadRC()}),this.dateDDView.dateView.isDesktop||this.onScrollTopFocusOutBound()},t.prototype.triggerLPC=function(t){var e=location.pathname.indexOf("lowpricecalendar")>-1;this.$lpcSpinner.show(),this.$lpcCalendar.show(),this.$calendarTab.removeClass("active"),this.$lpcTab.addClass("active"),this.$lpcTab.attr("aria-label",this.translation.t("cep.readerText.lowPriceCalendar")),this.$calendarTab.attr("aria-label",this.translation.t("calendar.regularCalendar")),this.$regularCalendar.hide(),this.$CEPFooter.hide(),this.$lpcCalendar.show(),this.dateDDView.calendarSetView.isInDateFocussed&&this.dateDDView.scrollForInDate(),this.dataLayerService.GTMtrackInteraction("CEP","Calendar","Low Price Calendar - Show Calendar"),void 0===this.lpcCalendar?(this.lpcConfig=this.getLPCCalendarData(t),this.lpcCalendar=new a.Calendar("#lpc",this.lpcConfig),this.dateDDView.dateView.isDesktop?this.registerMousePointerEvents("mouseover"):this.registerMousePointerEvents("click"),this.translation.applyTranslation(this.$lpcCalendar),this.hideRightCaledarMobile(),this.$lpcFooter=this.$target.find("#lpc-calendar-footer"),!0===this.dateDDView.calendarSetView.isOutDateFocussed&&this.dateDDView.lpcMobileScrollActions(this.$outboundInput),!0===this.dateDDView.calendarSetView.isInDateFocussed&&this.dateDDView.scrollForInDate(),e&&this.mobileScrollLpc()):this.reloadLPC(t)},t.prototype.mobileScrollLpc=function(){"errorinbound"===s.default.getCookie("bound")?(this.$inboundInput.focus(),this.dateDDView.lpcMobileScrollActions(this.$inboundInput)):this.dateDDView.lpcMobileScrollActions(this.$outboundInput)},t.prototype.hideRightCaledarMobile=function(){!this.dateDDView.dateView.isDesktop&&this.lpcConfig&&(this.lpcConfig.tripType&&"OW"===this.lpcConfig.tripType?this.$lpcCalendar.find(".right-calendar").hide():this.$lpcCalendar.find(".right-calendar").show())},t.prototype.reLoadRC=function(){this.$calendarTab.addClass("active"),this.$regularCalendar.show(),this.$CEPFooter.show(),this.$lpcTab.removeClass("active"),this.$lpcCalendar.hide(),this.$lpcTab.attr("aria-label",this.translation.t("lowPriceCalendar")),this.$calendarTab.attr("aria-label",this.translation.t("cep.readerText.regularCalendar")),void 0!==this.cepController.onwardDate&&""!==this.cepController.onwardDate?this.dateDDView.dateView.start=r.default.parse(this.cepController.onwardDate):this.dateDDView.dateView.start=new Date,null!==this.dateDDView.dateView.start?this.dateDDView.dateView.start=new Date(this.dateDDView.dateView.start.setHours(0,0,0,0)):this.dateDDView.dateView.start=new Date,this.dateDDView.dateView.end=void 0!==this.cepController.returnDate&&""!==this.cepController.returnDate?r.default.parse(this.cepController.returnDate):null,this.dateDDView.dateView.end=this.dateDDView.dateView.end?new Date(this.dateDDView.dateView.end.setHours(0,0,0,0)):null;var t=this.dateDDView.dateView.getSelectedDateDOM(this.dateDDView.dateView.start);this.dateDDView.putCalDOM(t),this.dateDDView.setDefaultDates()},t.prototype.reloadLPC=function(t){var e=this.getLPCCalendarData(t);!this.deepCompare(e,this.lpcConfig)&&this.lpcCalendar?(this.lpcConfig=e,this.lpcCalendar.reloadCalendar(e)):this.lpcCalendar&&(this.lpcConfig.showHolidays!==e.showHolidays||this.lpcConfig.outDate&&e.outDate&&this.lpcConfig.outDate.substring(8,10)!==e.outDate.substring(8,10)||this.lpcConfig.inDate&&e.inDate&&this.lpcConfig.inDate.substring(8,10)!==e.inDate.substring(8,10))&&(this.lpcConfig=e,this.lpcCalendar.reloadDateSelectionInSameMonth(this.lpcConfig)),this.hideRightCaledarMobile()},t.prototype.getLPCCalendarData=function(t){var e=this;return{cep:"true",market:this.config.market,lang:this.config.lang,from:this.getAirportCode(this.cepController.origin),to:this.getAirportCode(this.cepController.destination),returnFrom:this.getAirportCode(this.cepController.returnFrom),returnTo:this.getAirportCode(this.cepController.returnTo),outDate:this.cepController.onwardDate,inDate:this.cepController.returnDate,adt:this.cepController.adt,chd:this.cepController.chd,inf:this.cepController.inf,yth:this.cepController.yth,bookingFlow:this.cepController.bookingFlow,tripType:this.cepController.tripType,showHolidays:this.config.showHolidays,disableHoliday:this.config.disableHoliday,translations:this.translation.getTranslations(),lpcOutDateCallback:function(t,n,i){e.lpcOutBoundDateCallback(t,n,i)},lpcInBoundDateCallback:function(t,n,i){e.lpcInBoundDateCallback(t,n,i)},onNextClick:function(){$("#passengers").focus()},addReturnFlight:function(t){e.onCLickOfReturnFlight(t)},holidayCallback:function(t){e.dateDDView.updateHolidayFromLPC(t)},showError:t}},t.prototype.onCLickOfReturnFlight=function(t){this.cepController.updateTripTypeToReturnFromLPC(),$(".trip-type li").removeClass("active"),$(".trip-type li:nth-child(2)").addClass("active"),$("#cep").removeClass("one-way round-trip multi-city").addClass("round-trip"),this.lpcConfig.tripType=t,this.$inboundInput.focus()},t.prototype.getAirportCode=function(t){return t?t.iata.airport:void 0},t.prototype.enableLPC=function(){this.cepController.checkOrgDstExist()?this.$lpcTab.removeClass("disable-lpc"):(this.$lpcTab.addClass("disable-lpc"),this.isLPCActive()&&this.reLoadRC())},t.prototype.isLPCActive=function(){return this.$lpcTab.hasClass("active")},t.prototype.isLPCLoaded=function(){return this.isLPCActive()&&this.outPrice&&""!==this.outPrice&&("OW"===this.lpcConfig.tripType||this.inPrice&&""!==this.inPrice)},t.prototype.lpcOutBoundDateCallback=function(t,e,n){t&&""!==t?(this.dateDDView.calendarSetView.fieldsView.getDobTFromCep()&&$("#Outbound").is(":visible")&&this.dateDDView.calendarSetView.checkDateForLoggedinPassenges("start-date",t),t!==this.lpcConfig.outDate&&this.dataLayerService.GTMtrackInteraction("CEP","Calendar","Low Price Calendar - Select Departure Date"),this.dateDDView.calendarSetView.updateDates(this.$outboundInput,r.default.formatDate(r.default.parse(t),"ddd, DD MMM"),t),this.lpcConfig.outDate=t,this.outPrice=e):(this.clearOutBoundDate(),n||this.clearInBoundDate())},t.prototype.getInputDate=function(t){return t.toLowerCase().charAt(0).toUpperCase()+t.toLowerCase().slice(1)},t.prototype.lpcInBoundDateCallback=function(t,e,n){t&&""!==t?(this.dateDDView.calendarSetView.updateDates(this.$inboundInput,r.default.formatDate(r.default.parse(t),"ddd, DD MMM"),t),t!==this.lpcConfig.inDate&&this.dataLayerService.GTMtrackInteraction("CEP","Calendar","Low Price Calendar - Select Return Date"),this.lpcConfig.inDate=t,this.inPrice=e):this.clearInBoundDate()},t.prototype.clearInBoundDate=function(){this.dateDDView.calendarSetView.updateDates(this.$inboundInput,"",""),this.lpcConfig&&null==this.inPrice&&(this.dateDDView.dateView.end=null,this.lpcConfig.inDate="")},t.prototype.clearOutBoundDate=function(){this.dateDDView.calendarSetView.updateDates(this.$outboundInput,"",""),this.lpcConfig&&null==this.outPrice&&(this.dateDDView.dateView.start=null,this.lpcConfig.outDate="")},t.prototype.registerMousePointerEvents=function(t){var e=this;1===$("#calendar-tab-2").find("table").length&&(this.$lpcCalendar.find(".left-calendar").on(t,function(t){e.mouseEventOnLeftCalednar(t)}),this.$lpcCalendar.find(".right-calendar").on(t,function(t){e.mouseEventOnRightCalednar(t)}))},t.prototype.mouseEventOnLeftCalednar=function(t){$(t.target).is("select")||$(".calendar-inner").is(":hidden")||1!==$("#calendar-tab-1").find("table").length||(!0===this.dateDDView.dateView.isDesktop||!this.dateDDView.calendarSetView.isOutDateFocussed&&this.isElementInViewport(this.$outboundInput,!0))&&(this.$outboundInput.focus(),this.dateDDView.calendarSetView.isOutDateFocussed=!0,!0===this.dateDDView.calendarSetView.isInDateFocussed&&(this.dateDDView.calendarSetView.isInDateFocussed=!1))},t.prototype.mouseEventOnRightCalednar=function(t){$(t.target).is("select")||$(".calendar-inner").is(":hidden")||1!==$("#calendar-tab-2").find("table").length||((!0===this.dateDDView.dateView.isDesktop||!this.dateDDView.calendarSetView.isInDateFocussed&&this.isElementInViewport(this.$inboundInput,!0))&&(this.$inboundInput.focus(),this.dateDDView.calendarSetView.isInDateFocussed=!0,!0===this.dateDDView.calendarSetView.isOutDateFocussed&&(this.dateDDView.calendarSetView.isOutDateFocussed=!1)),this.dateDDView.dateView.isDesktop||this.dateDDView.scrollForInDate())},t.prototype.onScrollTopFocusOutBound=function(){var t=this,e=0,n=0;$(document).on("scroll",function(i){if(e++,!$(".calendar-inner").is(":hidden")&&t.$lpcTab.hasClass("active")){var r=$(i.target).scrollTop();if(r<n){var a=$(document.activeElement);t.isElementInViewport(t.$outboundInput,!0)&&t.isOutFocusRequired(a)&&(a.trigger("blur"),t.$outboundInput.focus(),t.dateDDView.calendarSetView.isOutDateFocussed=!0,!0===t.dateDDView.calendarSetView.isInDateFocussed&&(t.dateDDView.calendarSetView.isInDateFocussed=!1))}n=r}})},t.prototype.isOutFocusRequired=function(t){return!t.is(this.$outboundInput)&&!t.is("select")},t.prototype.isElementInViewport=function(t,e){"function"==typeof jQuery&&t instanceof jQuery&&(t=t[0]);var n=t.getBoundingClientRect();return(!e&&n.top>=0||!0===e&&n.top+n.height>0)&&n.left>=0&&n.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&n.right<=(window.innerWidth||document.documentElement.clientWidth)},t.prototype.deepCompare=function(t,e){function n(t,e){var a;if(isNaN(t)&&isNaN(e)&&"number"==typeof t&&"number"==typeof e)return!0;if(t===e)return!0;if("function"==typeof t&&"function"==typeof e||t instanceof Date&&e instanceof Date||t instanceof RegExp&&e instanceof RegExp||t instanceof String&&e instanceof String||t instanceof Number&&e instanceof Number)return t.toString()===e.toString();if(!(t instanceof Object&&e instanceof Object))return!1;if(t.isPrototypeOf(e)||e.isPrototypeOf(t))return!1;if(t.constructor!==e.constructor)return!1;if(t.prototype!==e.prototype)return!1;if(i.indexOf(t)>-1||r.indexOf(e)>-1)return!1;for(a in e)if("inDate"!==a&&"outDate"!==a&&"showHolidays"!==a&&"showError"!==a){if(e.hasOwnProperty(a)!==t.hasOwnProperty(a))return!1;if(typeof e[a]!=typeof t[a])return!1}for(a in t)if("inDate"!==a&&"outDate"!==a&&"showHolidays"!==a&&"showError"!==a){if(e.hasOwnProperty(a)!==t.hasOwnProperty(a))return!1;if(typeof e[a]!=typeof t[a])return!1;switch(typeof t[a]){case"object":case"function":if(i.push(t),r.push(e),!n(t[a],e[a]))return!1;i.pop(),r.pop();break;default:if(t[a]!==e[a])return!1}}else if("inDate"===a||"outDate"===a)if(void 0!==t[a]&&void 0!==e[a]){if(!n(t[a].substring(0,7),e[a].substring(0,7)))return!1}else if(void 0!==t[a]&&void 0===e[a])return!1;return!0}var i,r;if(arguments.length<1)return!0;for(var a=1,o=arguments.length;a<o;a++)if(i=[],r=[],!n(arguments[0],arguments[a]))return!1;return!0},t}();e.default=d},function(t,e,n){!function(e,n){t.exports=n()}(0,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){function i(t,e){if(c(t))return new Date(t.getTime());if("string"!=typeof t)return new Date(t);var n=e||{},i=n.additionalDigits;i=null==i?h:Number(i);var l=r(t),u=a(l.date,i),f=u.year,g=u.restDateString,w=o(g,f);if(w){var y,v=w.getTime(),b=0;return l.time&&(b=s(l.time)),l.timezone?y=d(l.timezone):(y=new Date(v+b).getTimezoneOffset(),y=new Date(v+b+y*p).getTimezoneOffset()),new Date(v+b+y*p)}return new Date(t)}function r(t){var e,n={},i=t.split(f);if(g.test(i[0])?(n.date=null,e=i[0]):(n.date=i[0],e=i[1]),e){var r=F.exec(e);r?(n.time=e.replace(r[1],""),n.timezone=r[1]):n.time=e}return n}function a(t,e){var n,i=y[e],r=b[e];if(n=v.exec(t)||r.exec(t)){var a=n[1];return{year:parseInt(a,10),restDateString:t.slice(a.length)}}if(n=w.exec(t)||i.exec(t)){var o=n[1];return{year:100*parseInt(o,10),restDateString:t.slice(o.length)}}return{year:null}}function o(t,e){if(null===e)return null;var n,i,r,a;if(0===t.length)return i=new Date(0),i.setUTCFullYear(e),i;if(n=m.exec(t))return i=new Date(0),r=parseInt(n[1],10)-1,i.setUTCFullYear(e,r),i;if(n=D.exec(t)){i=new Date(0);var o=parseInt(n[1],10);return i.setUTCFullYear(e,0,o),i}if(n=C.exec(t)){i=new Date(0),r=parseInt(n[1],10)-1;var s=parseInt(n[2],10);return i.setUTCFullYear(e,r,s),i}return(n=x.exec(t))?(a=parseInt(n[1],10)-1,l(e,a)):(n=$.exec(t))?(a=parseInt(n[1],10)-1,l(e,a,parseInt(n[2],10)-1)):null}function s(t){var e,n,i;if(e=T.exec(t))return(n=parseFloat(e[1].replace(",",".")))%24*u;if(e=k.exec(t))return n=parseInt(e[1],10),i=parseFloat(e[2].replace(",",".")),n%24*u+i*p;if(e=V.exec(t)){n=parseInt(e[1],10),i=parseInt(e[2],10);var r=parseFloat(e[3].replace(",","."));return n%24*u+i*p+1e3*r}return null}function d(t){var e,n;return(e=P.exec(t))?0:(e=I.exec(t))?(n=60*parseInt(e[2],10),"+"===e[1]?-n:n):(e=O.exec(t),e?(n=60*parseInt(e[2],10)+parseInt(e[3],10),"+"===e[1]?-n:n):0)}function l(t,e,n){e=e||0,n=n||0;var i=new Date(0);i.setUTCFullYear(t,0,4);var r=i.getUTCDay()||7,a=7*e+n+1-r;return i.setUTCDate(i.getUTCDate()+a),i}var c=n(4),u=36e5,p=6e4,h=2,f=/[T ]/,g=/:/,w=/^(\d{2})$/,y=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],v=/^(\d{4})/,b=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],m=/^-(\d{2})$/,D=/^-?(\d{3})$/,C=/^-?(\d{2})-?(\d{2})$/,x=/^-?W(\d{2})$/,$=/^-?W(\d{2})-?(\d{1})$/,T=/^(\d{2}([.,]\d*)?)$/,k=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,V=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,F=/([Z+-].*)$/,P=/^(Z)$/,I=/^([+-])(\d{2})$/,O=/^([+-])(\d{2}):?(\d{2})$/;t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=n(31),a=n(44),o=(n(6),n(7)),s=["January","February","March","April","May","June","July","August","September","October","November","December"],d=[31,28,31,30,31,30,31,31,30,31,30,31],l={no:"nb"},c=function(){function t(){}return t.getLangForDateFormat=function(t){return l[t]?l[t]:t},t.changeMonth=function(t,e){return a(t,e-1)},t.parse=function(t,e){return void 0===e&&(e="yyyy-MM-dd"),i(t)},t.formatDate=function(t,e){if(!t)return"";var n=r(t,e).toLowerCase();if("ddd, DD MMM"===e){var i=new RegExp(/^([\w\-]+)/).exec(n),a=new RegExp(/([^\s]+$)/).exec(n);i&&(n=n.replace(/^([\w\-]+)/,this.t("calendar.week."+i[0]))),a&&(n=n.replace(/([^\s]+$)/,this.t("calendar.month."+a[0])))}return n},t.parseMonthYear=function(t,e){if(!t)return"";var n=r(t,"MMM YYYY").toLowerCase(),i=new RegExp(/^([\w\-]+)/).exec(n);return i&&(n=n.replace(/^([\w\-]+)/,this.t("calendar.month."+i[0]))),n},t.getDateInteger=function(t){return parseInt(t.replace(/-/g,""),10)},t.getDayCount=function(t,e){return 1===e&&(t%400==0||t%4==0&&t%100!=0)?29:d[e]},t.getMonthRange=function(t){var e=[];e.push(t);for(var n=1;n<12;n++)e.push(this.siblingsMonth(t,n));return t.getDate()>1&&e.push(this.siblingsMonth(t,12)),e},t.siblingsMonth=function(t,e){return new Date(t.getFullYear(),1*t.getMonth()+e)},t.parseMonth=function(t){return s[t.getMonth()]},t.getYearMonth=function(t,e){return e>11?(t++,e=0):e<0&&(t--,e=11),{year:t,month:e}},t.getDateRange=function(t,e){console.log(t,e);for(var n=[],i=new Date,r={year:i.getFullYear(),month:i.getMonth(),date:i.getDate()},a=t?t.pane:[],o=0,s=0;s<a;s++){var d=e[s],l={year:d.getFullYear(),month:d.getMonth()};n[s]=[];var c=new Date(l.year,l.month,1),u=c.getDay();0===u&&(u=7);var p=this.getDayCount(l.year,l.month);if(u>1)for(var h=1;h<u;h++)n[s].push({sclass:"past-day"});for(var h=1;h<=p;h++){var f=new Date(l.year,l.month,h),g="";t.translations&&(g=t.translations["holiday."+t.market+"."+this.stringify(f,t)]);var w=r.month===l.month&&this.isPastDate(r,l,h)?"past-day disable-date":"";n[s].push({text:h,date:f,sclass:w,holiday:g&&""!==g?g:null})}var y=7*Math.ceil((u+p-1)/7);o<y&&(o=y)}for(var s=0;s<a;s++)if(n[s].length<o)for(var v=o-n[s].length,h=1;h<=v;h++)n[s].push({sclass:"past-day"});return console.log(n,"--------\n\n---------------------"),n},t.isPastDate=function(t,e,n){return t.date>n&&t.year===e.year||t.year<e.year&&t.date<n},t.stringify=function(t,e,n){return t?this.formatDate(t,e.format):""},t.t=function(t){return this.translation.t(t)},t.accessibility=function(t){var e=[this.t("calendar.month.january"),this.t("calendar.month.february"),this.t("calendar.month.march"),this.t("calendar.month.april"),this.t("calendar.month.may"),this.t("calendar.month.june"),this.t("calendar.month.july"),this.t("calendar.month.august"),this.t("calendar.month.september"),this.t("calendar.month.october"),this.t("calendar.month.november"),this.t("calendar.month.december")],n=new Date(t),i=n.getFullYear();return e[n.getMonth()]+" "+i},t.daysOfWeek=["M","T","W","T","F","S","S"],t.translation=o.default.getInstance(),t}();e.default=c},function(t,e,n){function i(t){return r(t,{weekStartsOn:1})}var r=n(37);t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={format:"YYYY-MM-DD",pane:2,tripType:"R",channel:"web",bookingFlow:"REVENUE",adt:"1",lpc:"true",displayType:"CALENDAR",cep:"false",lang:"en",market:"se",showHolidays:!1};e.default={config:i}},function(t,e){function n(t){return t instanceof Date}t.exports=n},function(t,e,n){function i(t){var e=r(t),n=e.getFullYear(),i=new Date(0);i.setFullYear(n+1,0,4),i.setHours(0,0,0,0);var o=a(i),s=new Date(0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);var d=a(s);return e.getTime()>=o.getTime()?n+1:e.getTime()>=d.getTime()?n:n-1}var r=n(0),a=n(2);t.exports=i},function(t,e,n){function i(t,e){var n=r(t),i=Number(e);return n.setDate(i),n}var r=n(0);t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){if(t._instance)throw new Error("Error: Instantiation failed, user Translations.getInstance()")}return t.getInstance=function(){return t._instance},t.prototype.setTranslations=function(t){this.translations=t},t.prototype.getTranslations=function(){return this.translations},t.prototype.applyTranslation=function(t){var e=this;this.translations&&t.find("[data-i18n]").each(function(t,n){var i=$(n).data("i18n");e.translations[i]&&$(n).text(e.translations[i])})},t.prototype.t=function(t){return this.translations[t]},t._instance=new t,t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(9);e.Calendar=i.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),r=n(3),a=function(){function t(t,e){return this.target=t,this.config=e,this.$target=$(t),this.config=$.extend({},r.default.config,e),this.calendarController=new i.default(this.$target,this.config),this}return t.prototype.reloadCalendar=function(t){this.calendarController.reloadCalendarConfiguration($.extend({},r.default.config,t))},t.prototype.reloadDateSelectionInSameMonth=function(t){this.calendarController.reloadDateSelectionInSameMonth(t)},t}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(11),r=n(1),a=n(7),o=function(){function t(t,e){this.currDate=new Date,this.config=e,this.translations=a.default.getInstance(),this.translations.setTranslations(this.config.translations),this.config.market&&""!==this.config.market||(this.config.market=this.getCountry()),this.config.lang&&""!==this.config.lang||(this.config.lang=this.getLanguage()),this.monthRange=r.default.getMonthRange(this.currDate),this.getUpdatedConfigurations(),this.calendarView=new i.default(this,t,e),this.calendarView.initilaize(),this.accessibilityLpcMonthDD()}return t.prototype.reloadCalendarConfiguration=function(t){this.config=t,this.getUpdatedConfigurations(),this.calendarView.refreshPrices(this.config.bookingFlow),this.calendarView.reloadCalendar(this.config)},t.prototype.reloadDateSelectionInSameMonth=function(t){this.config.showHolidays!==t.showHolidays&&this.calendarView.handleHolidays(),this.config.selectedDates&&(this.config.selectedDates.outBound=t.outDate,this.config.selectedDates.inBound=t.inDate),this.calendarView.config.selectedDates&&(this.calendarView.config.selectedDates.outBound=t.outDate,this.calendarView.config.selectedDates.inBound=t.inDate),this.calendarView.updateInBoundDate(),this.calendarView.updateOutBoundDate()},t.prototype.getUpdatedConfigurations=function(){this.config.selectedDates={},this.setSelectedDates(),this.calenderDates=[],this.getcalendarDates(this.config),this.dateRange=r.default.getDateRange(this.config,this.calenderDates),this.dateRange[0].length>35||void 0!==this.dateRange[1]&&this.dateRange[1].length>35?this.config.maxHeightRequired=!0:this.config.maxHeightRequired=!1},t.prototype.getCalendarDates=function(){return this.calenderDates},t.prototype.getDateRange=function(){return this.dateRange},t.prototype.setSelectedDates=function(){this.config.selectedDates&&(this.config.outDate&&(this.config.selectedDates.outBound=this.config.outDate),this.config.inDate&&(this.config.selectedDates.inBound=this.config.inDate))},t.prototype.getcalendarDates=function(t){if(t.lpc)this.setLPCCalendarDates(t);else if(t.pane=2,this.calenderDates[0]=t.outDate?r.default.parse(t.outDate):this.currDate,t.inDate){var e=r.default.parse(t.inDate);this.calenderDates[1]=e.getMonth()>this.calenderDates[0].getMonth()?e:r.default.siblingsMonth(this.calenderDates[0],1)}else this.calenderDates[1]=r.default.siblingsMonth(this.calenderDates[0],1)},t.prototype.setLPCCalendarDates=function(t){t.outDate?this.calenderDates[0]=r.default.parse(t.outDate):(this.calenderDates[0]=this.currDate,t.outDate=this.stringify(this.currDate)),"OW"===t.tripType?t.pane=1:(t.inDate?this.calenderDates[1]=r.default.parse(t.inDate):(this.calenderDates[1]=this.calenderDates[0],t.inDate=t.outDate),t.pane=2)},t.prototype.updateCalendarDates=function(t,e,n){var i=!1;return void 0!==t&&void 0!==e?(r.default.getDateInteger(t)>r.default.getDateInteger(e)&&(i=!0,n?(e=t,this.calendarView.clearInDate()):(t=e,this.calendarView.clearOutDate())),this.config.inDate=e,this.config.outDate=t):void 0!==t&&(this.config.outDate=t),this.getcalendarDates(this.config),this.dateRange=r.default.getDateRange(this.config,this.calenderDates),this.dateRange[0].length>35?this.config.maxHeightRequired=!0:this.config.maxHeightRequired=!1,i},t.prototype.updateSelectedDates=function(){if(this.config.selectedDates){var t=this.config.selectedDates;t.inBound&&this.config.inDate&&(t.inBound=this.stringify(r.default.changeMonth(t.inBound,+this.config.inDate.substring(5,7)))),t.outBound&&this.config.outDate&&(t.outBound=this.stringify(r.default.changeMonth(t.outBound,+this.config.outDate.substring(5,7))))}},t.prototype.preNextMonthClick=function(t){var e=this.currDate.getFullYear(),n=this.currDate.getMonth(),i=this.currDate.getDate();if(0===t){var a=r.default.getYearMonth(e,n-1);this.currDate=new Date(a.year,a.month,i),this.getcalendarDates(this.config),this.dateRange=r.default.getDateRange(this.config,this.calenderDates)}else{var o=r.default.getYearMonth(e,n+1);this.currDate=new Date(o.year,o.month,i),this.getcalendarDates(this.config),this.dateRange=r.default.getDateRange(this.config,this.calenderDates)}},t.prototype.stringify=function(t,e){return t?(e=e||this.config.format,r.default.formatDate(t,e)):""},t.prototype.getItemClasses=function(t){var e=[];return e.push(t.sclass),e.join(" ")},t.prototype.getCookie=function(t){for(var e=document.cookie.split("; "),n=0,i=void 0;i=e[n]&&e[n].split("=");n++)if(this.decode(i.shift())===t)return this.decode(i.join("="));return null},t.prototype.decode=function(t){return decodeURIComponent(t)},t.prototype.getLanguage=function(){return this.getCookie("_language")||"en"},t.prototype.getCountry=function(){var t;return t=this.getCookie("_country"),t&&"others"!==t.toLowerCase()?t:"lu"},t.prototype.accessibilityLpcMonthDD=function(){$("#calendar-monthDropDown-1 select").attr("aria-label",this.translations.t("lowPriceCalendar.departure")),$("#calendar-monthDropDown-2 select").attr("aria-label",this.translations.t("lowPriceCalendar.return"));for(var t=$("#calendar-monthDropDown-1 option").length-1,e=$("#calendar-monthDropDown-2 option").length-1,n=0;n<=t;n++){var i="aria-label",r=$("#calendar-monthDropDown-1 option")[n].attributes[i].nodeValue;$("#calendar-monthDropDown-1 select option")[n].setAttribute("aria-label",r)}for(var n=0;n<=e;n++){var i="aria-label",r=$("#calendar-monthDropDown-2 option")[n].attributes[i].nodeValue;$("#calendar-monthDropDown-2 select option")[n].setAttribute("aria-label",r)}},t}();e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(12),r=n(30),a=n(1),o=n(46),s=n(47),d=n(6),l=n(48),c=function(){function t(t,e,n){this.outBoundPrice=0,this.inBoundPrice=0,this.controller=t,this.$target=e,this.config=n,this.dataLayerService=new s.default,this.bindings={ctrl:t,conf:n},this.getLPCData(n),"true"===n.cep?this.calendarDOM=r.default.getCalendarBlock(this.bindings):this.calendarDOM=r.default.getCalendarTemplate(this.bindings)}return t.prototype.initilaize=function(){var t=this;this.haserror=!1,this.zeroPoints=!1,this.isDesktop=$(window).width()>=767,this.$target.html(this.calendarDOM),this.$errorBlock=$("#lpc-error"),this.$lpcCalendar=$("#lpcCalendar"),this.$errorBlock.hide(),this.$outBoundCalender=$("#calendar-tab-1"),this.$inBoundCalender=$("#calendar-tab-2"),this.$leftCalLoader=this.$outBoundCalender.find(".lpc-loader");var e=$("#lpc-calendar-footer");this.$totalPrice=e.find("#totalPrice"),this.$nextButton=e.find("button"),this.$holidaysCheckBox=e.find(".holidays"),this.$holidaysCheckBoxAccessibility=e.find(".holidays a"),this.$perAdult=e.find("#peradult"),this.$peryouth=e.find("#peryouth"),this.isDesktop?this.$holidaysCheckBox.click(function(){t.handleHolidays()}):e.find(".flights-filter").hide(),this.$lpcOutBoundMonthDropDown=this.$outBoundCalender.find("#calendar-monthDropDown-1"),this.$outBoundselectedMonth=this.$lpcOutBoundMonthDropDown.find(".selected-value"),this.$lpcOutBoundMonthDropDownAccess=this.$outBoundCalender.find("#calendar-monthDropDown-1 select"),this.$lpcInBoundMonthDropDownAccess=this.$inBoundCalender.find("#calendar-monthDropDown-2 select"),this.$lpcOutBoundMonthDropDown.find("select").change(function(e){return t.onLPCMonthChange(e,!0)}),this.initilaizeInBoundJqeryObjects(),this.$nextButton.click(function(){t.config.onNextClick&&t.config.onNextClick()}),this.initilaizeCalenderDynamicElements(),this.$errorBlock.find("a").click(function(e){return t.onErrorClose()}),$("#left-arrow").click(function(e){return t.preNextMonthClick(0)}),$("#right-arrow").click(function(e){return t.preNextMonthClick(1)}),!0===this.config.maxHeightRequired&&(this.addMaxHeightToLoader(),this.addMaxHeightToAddReturnFlight()),!0===this.config.showHolidays&&this.handleHolidays(!0),this.updateTotalPriceInView(),this.updateLPCTotalPerPersonText()},t.prototype.handleHolidays=function(t){this.$holidaysCheckBox.hasClass("active")?(this.$holidaysCheckBox.removeClass("active"),this.config.showHolidays=!1,this.removeHolidayFilter()):(this.config.showHolidays=!0,this.$holidaysCheckBox.addClass("active"),!0!==t&&this.addHolidayFilter()),this.config.holidayCallback&&this.config.holidayCallback(this.config.showHolidays)},t.prototype.addHolidayFilter=function(){!0===this.isDesktop&&this.$outBoundCalender&&this.$leftCalLoader.is(":hidden")&&!0===this.config.showHolidays&&(this.$inBoundCalender.find(".filter-mark-wrap").parent("td").addClass("filter-mark"),this.$outBoundCalender.find(".filter-mark-wrap").parent("td").addClass("filter-mark"))},t.prototype.removeHolidayFilter=function(){!0===this.isDesktop&&this.$outBoundCalender&&(this.$inBoundCalender.find(".filter-mark-wrap").parent("td").removeClass("filter-mark"),this.$outBoundCalender.find(".filter-mark-wrap").parent("td").removeClass("filter-mark"),this.$target.find(".holiday-tool-tip").hide())},t.prototype.onErrorClose=function(){this.$errorBlock.hide()},t.prototype.showHoliday=function(t){!0===this.config.showHolidays&&$(t.target).closest("td").addClass("filter-tool-tip")},t.prototype.hideHoliday=function(t){$(t.target).closest("td").removeClass("filter-tool-tip")},t.prototype.initilaizeInBoundJqeryObjects=function(){var t=this;this.$rightCalLoader=this.$inBoundCalender.find(".lpc-loader"),this.$lpcInBoundMonthDropDown=this.$inBoundCalender.find("#calendar-monthDropDown-2"),this.$inBoundselectedMonth=this.$lpcInBoundMonthDropDown.find(".selected-value"),this.$lpcInBoundMonthDropDown.find("select").change(function(e){return t.onLPCMonthChange(e,!1)}),this.$addReturnFlightLink=this.$inBoundCalender.find("a.one-way-link").first(),1===this.$addReturnFlightLink.length&&this.$addReturnFlightLink.click(function(){t.config.tripType="RT",t.config.addReturnFlight&&(t.dataLayerService.GTMtrackInteraction("CEP","Calendar","Low Price Calendar - Add Return Flight"),t.config.addReturnFlight("RT",!0)),t.controller.reloadCalendarConfiguration(t.config)})},t.prototype.initilaizeCalenderDynamicElements=function(){var t=this;this.$outBoundCalenderPriceTag=this.$outBoundCalender.find("a"),this.$inBoundCalenderPriceTag=this.$inBoundCalender.find("a"),this.$outBoundCalenderPriceTag.click(function(t){t.preventDefault()}),this.$inBoundCalenderPriceTag.click(function(t){t.preventDefault()}),!0===this.isDesktop&&($("td").on("mouseover",function(e){t.showHoliday(e)}),$("td").on("mouseleave",function(e){t.hideHoliday(e)}))},t.prototype.setOutBoundPrice=function(t,e){this.outBoundPrice=e,this.updateTotalPriceInView()},t.prototype.setInBoundPrice=function(t,e){this.inBoundPrice=e,this.updateTotalPriceInView()},t.prototype.refreshPrices=function(t){this.inBoundPrice=0,this.outBoundPrice=0,this.updateTotalPriceInView(t)},t.prototype.updateTotalPriceInView=function(t){if(this.$nextButton&&this.$nextButton.length>0&&(this.inBoundPrice>0&&this.outBoundPrice>0||"OW"===this.bindings.conf.tripType&&this.outBoundPrice>0?this.$nextButton.removeClass("disabled"):this.$nextButton.addClass("disabled")),this.$totalPrice){var e=this.outBoundPrice+this.inBoundPrice;if("POINTS"===(t||this.config.bookingFlow)){this.$totalPrice.text(o.formatedPrice(e,"POINTS"));var n=this.$totalPrice.text(o.formatedPrice(e,"POINTS"))[0].innerText,i=this.$perAdult.is(":visible")?this.config.translations["lowPriceCalendar.person"]:this.config.translations["cep.readerText.youthname"];$("#totaltext").attr("aria-label",this.config.translations["lowPriceCalendar.total"]+"\n                     "+n+"/"+i+" "+this.config.translations["lowPriceCalendar.button.next"])}else{this.$totalPrice.text(o.formatedPrice(e,this.config.market?this.config.market.toUpperCase():"LU"));var r=this.$totalPrice.text(o.formatedPrice(e,this.config.market?this.config.market.toUpperCase():"LU"))[0].innerText,i=this.$perAdult.is(":visible")?this.config.translations["lowPriceCalendar.person"]:this.config.translations["cep.readerText.youthname"];$("#totaltext").attr("aria-label",this.config.translations["lowPriceCalendar.total"]+"\n                     "+r+"/"+i+" "+this.config.translations["lowPriceCalendar.button.next"])}}},t.prototype.preNextMonthClick=function(t){$("#calendar-body-container").html(""),this.controller.preNextMonthClick(t),this.calendarDOM=r.default.getCalendarBlock(this.bindings),$("#calendar-body-container").html(this.calendarDOM)},t.prototype.onLPCMonthChange=function(t,e){var n=$(t.target).children(":selected"),i=n.attr("data-date");if(2===this.config.pane)if(e){this.clearOutDate(!0);var r=this.$lpcInBoundMonthDropDown.find("select :selected");this.controller.updateCalendarDates(i,r.attr("data-date"),e)}else{this.clearInDate();var a=this.$lpcOutBoundMonthDropDown.find("select :selected");this.controller.updateCalendarDates(a.attr("data-date"),i,!1)}else this.clearOutDate(),this.controller.updateCalendarDates(i);this.reloadCalendar(this.config,e)},t.prototype.updateI18nAttributeMonth=function(t,e){void 0!==e&&t.attr("data-i18n","calendar.month."+e.toLowerCase())},t.prototype.reloadCalendar=function(t,e){this.config=t,this.bindings.conf=this.config,this.config.showError?(this.$errorBlock.show(),this.haserror=!0):(this.$errorBlock.hide(),this.haserror=!1),this.getLPCData(this.bindings.conf);var n=this.bindings.ctrl.getCalendarDates(),i=this.bindings.ctrl.getDateRange();this.reloadOutBoundCalendar(i,n,void 0!==e&&e),this.reLoadReturnCalendar(i,n,void 0!==e&&!1===e),this.initilaizeCalenderDynamicElements(),this.addMaxHeightToAddReturnFlight(),this.updateLPCTotalPerPersonText()},t.prototype.addMaxHeightToAddReturnFlight=function(){"OW"===this.config.tripType&&!0===this.config.maxHeightRequired&&this.$target.find(".right-calendar .calendar-shadow").css("height","320px")},t.prototype.reloadOutBoundCalendar=function(t,e,n){var i=a.default.parseMonthYear(e[0],this.config.lang);this.$outBoundselectedMonth.text(i);var o=this.$lpcOutBoundMonthDropDown.find("select :selected");return l(e[0],o.attr("data-date"))&&!n||(this.$lpcOutBoundMonthDropDown.find("option").prop("selected",!1),l(e[0],new Date)?this.$lpcOutBoundMonthDropDown.find("option[data-date="+this.controller.stringify(e[0])+"]").prop("selected",!0):this.$lpcOutBoundMonthDropDown.find("option[data-date="+this.controller.stringify(d(e[0],1))+"]").prop("selected",!0)),$("#calendar-table-1").html(r.default.getCalender(t[0],this.bindings,0)),this},t.prototype.reLoadReturnCalendar=function(t,e,n){var i=$("#calendar-table-2");if(2===this.bindings.conf.pane){var o=a.default.parseMonthYear(e[1],this.config.lang);0!==i.length?(this.$inBoundselectedMonth.text(o),i.html(r.default.getCalender(t[1],this.bindings,1))):(this.$inBoundCalender.html(r.default.getCalendaSection(this.bindings,t[1],1)),this.initilaizeInBoundJqeryObjects());var s=this.$lpcInBoundMonthDropDown.find("select :selected");l(e[1],s.attr("data-date"))&&!n||(this.$lpcInBoundMonthDropDown.find("option").prop("selected",!1),l(e[1],new Date)?this.$lpcInBoundMonthDropDown.find("option[data-date="+this.controller.stringify(e[1])+"]").prop("selected",!0):this.$lpcInBoundMonthDropDown.find("option[data-date="+this.controller.stringify(d(e[1],1))+"]").prop("selected",!0))}else this.$inBoundCalender.html(r.default.getADDReturnSection(this.bindings.conf)),this.initilaizeInBoundJqeryObjects();return this},t.prototype.handleDateSelect=function(t,e){if(void 0!==this){var n=t.attr("data-date");if(void 0!==n){var i=Number(n.replace(/-/g,""));1===t.closest("#calendar-tab-1").length&&this.outBoundCalendarHandler(t,i,n,e),1===t.closest("#calendar-tab-2").length&&this.inBoundCalendarHandler(t,i,n,e)}}},t.prototype.outBoundCalendarHandler=function(t,e,n,i){if(t.hasClass("selected-td-error")&&t.removeClass("selected-td-error"),i&&!0===i&&t.hasClass("past-day")||t.hasClass("disable-date")){if(t.hasClass("disable-date")&&this.isDesktop){var r=this.$outBoundCalender.find("td.selected-td");r.removeClass("selected-td"),r.removeAttr("aria-selected"),t.addClass("selected-td-error"),this.haserror=!0,this.showErrorForLPC()}this.clearOutDate()}else{this.updateoutBoundDateSelection(t,e),void 0!==this.config.selectedDates&&(this.config.selectedDates.outBound=n);var a=t.attr("data-price");if(void 0!==a)this.config.lpcOutDateCallback&&this.config.lpcOutDateCallback(n,a,i),this.setOutBoundPrice(t.text(),Number(a));else{var o=this.$outBoundCalender.find("td.selected-td");o.removeClass("selected-td"),o.removeAttr("aria-selected"),this.clearOutDate()}if(2===this.config.pane){this.updatePricesOnSelection(this.$inBoundCalenderPriceTag,this.bindings.response.outboundLowestFares,n),this.updateInBoundSelectionRange(e);var s=this.$inBoundCalender.find("td.selected-td"),d=s.attr("data-price");void 0!==d&&this.setInBoundPrice(s.text(),Number(d))}}},t.prototype.clearOutDate=function(t){this.config.lpcOutDateCallback&&this.config.lpcOutDateCallback("","",t),this.config.selectedDates&&delete this.config.selectedDates.outBound,this.setOutBoundPrice("",0),t||this.clearInDate()},t.prototype.clearInDate=function(){var t=this.$inBoundCalender.find("td.selected-td");t.removeClass("selected-td"),t.removeAttr("aria-selected"),this.config.selectedDates&&delete this.config.selectedDates.inBound,this.setInBoundPrice("",0),this.config.lpcInBoundDateCallback&&this.config.lpcInBoundDateCallback("","")},t.prototype.inBoundCalendarHandler=function(t,e,n,i){if(t.hasClass("selected-td-error")&&t.removeClass("selected-td-error"),i&&!0===i&&t.hasClass("past-day")||t.hasClass("disable-date")){if(t.hasClass("disable-date")&&this.isDesktop){var r=this.$inBoundCalender.find("td.selected-td");r.removeClass("selected-td"),r.removeAttr("aria-selected"),t.addClass("selected-td-error"),this.haserror=!0,this.showErrorForLPC()}this.config.lpcInBoundDateCallback&&this.config.lpcInBoundDateCallback("","")}else{this.updateInBoundDateSelection(t,e),void 0!==this.config.selectedDates&&(this.config.selectedDates.inBound=n);var a=t.attr("data-price");void 0!==a?(this.config.lpcInBoundDateCallback&&this.config.lpcInBoundDateCallback(n,a,i),this.setInBoundPrice(t.text(),Number(a))):this.clearInDate(),this.updatePricesOnSelection(this.$outBoundCalenderPriceTag,this.bindings.response.inboundLowestFares,n);var o=this.$outBoundCalender.find("td.selected-td"),s=o.attr("data-price");void 0!==s&&this.setOutBoundPrice(o.text(),Number(s))}},t.prototype.updateoutBoundDateSelection=function(t,e){if(this.$outBoundCalender.find("td.selected-td").removeAttr("aria-selected"),this.$outBoundCalender.find("td.selected-td").removeClass("selected-td"),t.addClass("selected-td"),t.attr("aria-selected","true"),this.$outBoundCalender.find("td.selected-td-error").removeClass("selected-td-error"),this.$errorBlock.hide(),2===this.config.pane){var n=this.$inBoundCalender.find("td.selected-td");if(n.length>0){var i=n.attr("data-date");void 0!==i&&Number(i.replace(/-/g,""))<e&&(n.removeClass("selected-td"),n.removeAttr("aria-selected"),this.setInBoundPrice("0",0),this.config.lpcInBoundDateCallback&&this.config.lpcInBoundDateCallback("",""))}else{var r=this.config.selectedDates;r&&r.inBound&&Number(r.inBound.replace(/-/g,""))<e&&(r.inBound="",this.setInBoundPrice("0",0),this.config.lpcInBoundDateCallback&&this.config.lpcInBoundDateCallback("",""))}}},t.prototype.updateInBoundDateSelection=function(t,e){this.$inBoundCalender.find("td.selected-td").removeClass("selected-td"),this.$inBoundCalender.find("td.selected-td").removeAttr("aria-selected"),t.addClass("selected-td"),t.attr("aria-selected","true"),this.$inBoundCalender.find("td.selected-td-error").removeClass("selected-td-error"),this.$errorBlock.hide();var n=this.$outBoundCalender.find("td.selected-td");if(n){var i=n.attr("data-date");void 0!==i&&Number(i.replace(/-/g,""))>e&&(n.removeClass(".selected-td"),n.removeAttr("aria-selected"))}},t.prototype.updateInBoundSelectionRange=function(t){this.$inBoundCalender.find("td").removeClass("disable-inbound-date"),this.$inBoundCalender.find("td").filter(function(e,n){var i=$(n).attr("data-date");return void 0!==i&&Number(i.replace(/-/g,""))<t}).addClass("disable-inbound-date")},t.prototype.updatePricesOnSelection=function(t,e,n){if(e[n]){var i=e[n].associatedLowestFares;i&&(this.updatePricesForCalender(t,i,!0,""),this.isPriceHasOverLength())}},t.prototype.updatePricesForCalender=function(t,e,n,i){var r=this;t.each(function(t,a){var o=$(a).parent();if("POINTS"===r.config.bookingFlow){var s=e[o.attr("data-date")];s?0!==s.points?(r.zeroPoints=!1,$(a).text(s.points),o.attr("data-price",s.points),o.addClass("valid-date"),o.attr("aria-label",r.formatDatesAccessibility(new Date(o.attr("data-date")),s.points,o,i,r.config.translations["cep.bookWith.points"]))):(o.addClass("disable-date"),r.zeroPoints=!0,$(a).text("-")):n||(o.addClass("disable-date"),$(a).text("-"))}else{var s=e[o.attr("data-date")];s?($(a).text(s.formattedTotalPrice),o.attr("data-price",s.totalPrice),o.addClass("valid-date"),o.attr("aria-label",r.formatDatesAccessibility(new Date(o.attr("data-date")),s.totalPrice,o,i,s.currency))):n||(o.addClass("disable-date"),$(a).text("-"))}}),"POINTS"===this.config.bookingFlow&&!0===this.zeroPoints&&(this.failureCallback(),this.zeroPoints=!1);var a=!!navigator.platform.match(/(iPhone|iPod|iPad)/i);this.isDesktop&&!a&&this.accessibilityEvents()},t.prototype.getLPCData=function(t){!0===t.maxHeightRequired?(this.addMaxHeightToLoader(),this.$target.addClass("lpc-maxloaderContainer")):(this.removeMaxHeight(),this.$target.removeClass("lpc-maxloaderContainer")),this.showLPCLoader(),this.removeHolidayFilter(),this.refreshPrices(),i.getLPCResponse(t,this)},t.prototype.sucuessCallBack=function(t){this.bindings.response=t,this.hideLPCLoader(),this.removeMaxHeight(),this.$target.removeClass("lpc-maxloaderContainer"),this.config.maxHeightRequired=!1,this.addHolidayFilter(),this.addEventForDateClick(this.$outBoundCalender.find("td")),this.addEventForDateClick(this.$inBoundCalender.find("td")),t.outboundLowestFares&&this.updatePricesForCalender(this.$outBoundCalenderPriceTag,t.outboundLowestFares,!1,this.config.translations["lowPriceCalendar.departure"]),t.inboundLowestFares&&this.updatePricesForCalender(this.$inBoundCalenderPriceTag,t.inboundLowestFares,!1,this.config.translations["lowPriceCalendar.return"]),t.errors?(this.$outBoundCalender.find("td").addClass("disable-date"),this.$inBoundCalender.find("td").addClass("disable-date"),this.showError(t.errors[0].errorMessage)):(this.updateSelectedDate(t),this.showErrorForLPC()),this.isPriceHasOverLength()},t.prototype.showErrorForLPC=function(){(this.config.showError||this.haserror)&&(void 0===this.config.translations["lowpricecalendar.message.noflightoffers"]&&(this.config.translations["llowpricecalendar.message.noflightoffers"]="There are no available seats \n                on the selected date. Please select another date "),this.showError(this.config.translations["lowpricecalendar.message.noflightoffers"]))},t.prototype.addEventForDateClick=function(t){var e,n=this;t.on("touchend click",function(t){!0!==e&&n.handleDateSelect(n.getJqueryDate(t))}).on("touchmove",function(t){e=!0}).on("touchstart",function(){e=!1})},t.prototype.showError=function(t){this.$errorBlock.find("p").text(t),this.$errorBlock.show()},t.prototype.failureCallback=function(){void 0===this.config.translations["lowpricecalendar.message.lpcCallFail"]&&(this.config.translations["lowpricecalendar.message.lpcCallFail"]="\nUnfortunately, we can't process your request right now. Please try again or contact SAS Customer Service."),this.$outBoundCalender.find("td").addClass("disable-date"),this.$inBoundCalender.find("td").addClass("disable-date"),this.showError(this.config.translations["lowpricecalendar.message.lpcCallFail"])},t.prototype.isPriceHasOverLength=function(){var t=this.$outBoundCalenderPriceTag.filter(function(t,e){return $(e).text().length>5});t.length>0?this.$lpcCalendar.addClass("resize-price"):"OW"!==this.config.tripType?(t=this.$inBoundCalenderPriceTag.filter(function(t,e){return $(e).text().length>5}),t.length>0?this.$lpcCalendar.addClass("resize-price"):this.$lpcCalendar.removeClass("resize-price")):this.$lpcCalendar.removeClass("resize-price")},t.prototype.getJqueryDate=function(t){var e=$(t.target);return e.is("td")||(e=e.parent("td")),e},t.prototype.updateSelectedDate=function(t){this.config.selectedDates&&(t.inboundLowestFares&&this.updateInBoundDate(),t.outboundLowestFares&&this.updateOutBoundDate())},t.prototype.updateInBoundDate=function(){if(this.config.selectedDates&&this.config.selectedDates.inBound){var t=this.$inBoundCalender.find("td[data-date='"+this.config.selectedDates.inBound+"']");this.handleDateSelect(t,!0)}},t.prototype.updateOutBoundDate=function(){if(this.config.selectedDates&&this.config.selectedDates.outBound){var t=this.$outBoundCalender.find("td[data-date='"+this.config.selectedDates.outBound+"']");this.handleDateSelect(t,!0)}},t.prototype.showLPCLoader=function(){void 0!==this.$leftCalLoader&&(this.$leftCalLoader.show(),"OW"!==this.config.tripType?this.$rightCalLoader.show():void 0!==this.$addReturnFlightLink&&this.$addReturnFlightLink.addClass("disabled"))},t.prototype.hideLPCLoader=function(){void 0!==this.$leftCalLoader&&(this.$leftCalLoader.hide(),"OW"!==this.config.tripType?this.$rightCalLoader.hide():void 0!==this.$addReturnFlightLink&&this.$addReturnFlightLink.removeClass("disabled"))},t.prototype.addMaxHeightToLoader=function(){void 0!==this.$leftCalLoader&&void 0!==this.$rightCalLoader&&(this.$leftCalLoader.addClass("lpc-loader-maxHeight"),this.$rightCalLoader.addClass("lpc-loader-maxHeight"))},t.prototype.removeMaxHeight=function(){void 0!==this.$leftCalLoader&&void 0!==this.$rightCalLoader&&(this.$leftCalLoader.removeClass("lpc-loader-maxHeight"),this.$rightCalLoader.removeClass("lpc-loader-maxHeight"))},t.prototype.updateLPCTotalPerPersonText=function(){this.config.yth&&Number(this.config.yth)>0?this.enableYouthInTotal():this.enableAdultInTotal()},t.prototype.enableAdultInTotal=function(){this.$perAdult.show(),this.$peryouth.hide()},t.prototype.enableYouthInTotal=function(){this.$perAdult.hide(),this.$peryouth.show()},t.prototype.accessibilityEvents=function(){var t=this;$("td.valid-date").attr("tabindex","0"),0!==this.outBoundPrice?this.$lpcInBoundMonthDropDownAccess.focus():0===this.outBoundPrice&&this.$lpcOutBoundMonthDropDownAccess.focus(),this.$day=this.$lpcCalendar.find("td"),this.$lpcOutBoundMonthDropDownAccess.on("keydown",function(e){return t.LpcOutboundmonthNavigation(e)}),this.$day.on("keydown",function(e){return t.LpcDayNavigation(e)}),this.$lpcInBoundMonthDropDownAccess.on("keydown",function(e){return t.LpcInboundmonthNavigation(e)}),this.$holidaysCheckBox.on("keydown",function(e){return t.holidayNavigation(e)}),this.$nextButton.on("keydown",function(e){return t.nextBtnNavigation(e)})},t.prototype.LpcOutboundmonthNavigation=function(t){switch(t.keyCode){case 9:t.shiftKey||(t.preventDefault(),$("td.valid-date").first().focus())}},t.prototype.LpcInboundmonthNavigation=function(t){switch(t.keyCode){case 9:t.shiftKey||(t.preventDefault(),$(".right-calendar td.valid-date").not(".disable-inbound-date").first().focus())}},t.prototype.LpcDayNavigation=function(t){var e=$(t.currentTarget);switch(t.keyCode){case 16:this.onTab2(t,e);break;case 9:this.onTab(t,e);break;case 13:case 32:this.onEnter(t,e);break;case 37:this.onPressLeftArrow(t,e);break;case 38:this.onPressUpArrow(t,e);break;case 39:this.onPressRightArrow(t,e);break;case 40:this.onPressDownArrow(t,e)}},t.prototype.onTab2=function(t,e){var n=this;16===t.keyCode&&9===t.keyCode&&(t.preventDefault(),$("#calendar-table-2").is(":visible")?(t.preventDefault(),setTimeout(function(){$("#Inbound").focus()},50),setTimeout(function(){n.$lpcInBoundMonthDropDownAccess.focus()},100)):$(".one-way-link").focus())},t.prototype.onTab=function(t,e){var n=this;t.shiftKey||(0!==e.parent().parent().parent("#calendar-table-2").length?$(".total-amount button").hasClass("disabled")||(t.preventDefault(),$(".total-amount button").focus()):(t.preventDefault(),$("#calendar-table-2").is(":visible")?(t.preventDefault(),setTimeout(function(){$("#Inbound").focus()},50),setTimeout(function(){n.$lpcInBoundMonthDropDownAccess.focus()},100)):$(".one-way-link").focus()))},t.prototype.onEnter=function(t,e){var n=this;this.handleDateSelect(e),e.attr("aria-selected","true"),0!==e.parent().parent().parent("#calendar-table-2").length&&"OW"!==this.config.tripType?(t.preventDefault(),$(".total-amount button").hasClass("disabled")?$("#regular-calendar-tab").focus():$(".total-amount button").focus()):"RT"===this.config.tripType||"OJ"===this.config.tripType?(t.preventDefault(),setTimeout(function(){$("#Inbound").focus()},50),setTimeout(function(){n.$lpcInBoundMonthDropDownAccess.focus()},100)):(t.preventDefault(),this.$addReturnFlightLink.focus())},t.prototype.onPressLeftArrow=function(t,e){e.prev("td.valid-date").not(".disable-inbound-date").focus(),0===e.prev("td.valid-date").length&&$("#calendar-table-2 tbody tr td.valid-date:first")[0]!==$(t.currentTarget)[0]?(t.preventDefault(),e.parent().prev("tr").find("td.valid-date").last().focus()):$("#calendar-table-2 tbody tr td.valid-date:first")[0]===$(t.currentTarget)[0]&&(t.preventDefault(),$("#calendar-table-1 tbody tr td.valid-date").last().focus())},t.prototype.onPressUpArrow=function(t,e){var n=null;0!==e.parent().prev("tr").length&&(n=e.parent().prev("tr").find("td")[e.index()],n.classList.contains("valid-date")&&!n.classList.contains("disable-inbound-date")?(t.preventDefault(),n.focus()):t.preventDefault())},t.prototype.onPressRightArrow=function(t,e){e.next("td.valid-date").not(".disable-inbound-date").focus(),0===e.next("td.valid-date").length&&$("#calendar-table-1 tbody tr td.valid-date:last")[0]!==$(t.currentTarget)[0]?(t.preventDefault(),e.parent().next("tr").find("td.valid-date").first().focus()):$("#calendar-table-1 tbody tr td.valid-date:last")[0]===$(t.currentTarget)[0]&&(t.preventDefault(),$("#calendar-table-2 tbody tr td.valid-date").not(".disable-inbound-date").first().focus())},t.prototype.onPressDownArrow=function(t,e){if(0!==e.parent().next("tr").length){t.preventDefault();var n=null;n=e.parent().next("tr").find("td")[e.index()],n.classList.contains("valid-date")&&!n.classList.contains("disable-inbound-date")&&(t.preventDefault(),n.focus())}else t.preventDefault()},t.prototype.holidayNavigation=function(t){switch(t.keyCode){case 9:t.shiftKey||(t.preventDefault(),$(".total-amount button").hasClass("disabled")?(t.preventDefault(),$("#regular-calendar-tab").focus()):$(".total-amount button").focus())}},t.prototype.nextBtnNavigation=function(t){if(9===t.keyCode&&t.shiftKey)if("RT"===this.config.tripType||"OJ"===this.config.tripType){t.preventDefault(),clearTimeout(this.timeoutfnone);var e=$("#calendar-table-2 .valid-date.selected-td");this.timeoutfnone=setTimeout(function(){e.focus()},50)}else t.preventDefault(),this.$addReturnFlightLink.focus()},t.prototype.formatDatesAccessibility=function(t,e,n,i,r){if(this.ariaHolidayText="",void 0!==t){var a=[this.config.translations["calendar.month.january"],this.config.translations["calendar.month.february"],this.config.translations["calendar.month.march"],this.config.translations["calendar.month.april"],this.config.translations["calendar.month.may"],this.config.translations["calendar.month.june"],this.config.translations["calendar.month.july"],this.config.translations["calendar.month.august"],this.config.translations["calendar.month.september"],this.config.translations["calendar.month.october"],this.config.translations["calendar.month.november"],this.config.translations["calendar.month.december"]],o=[this.config.translations["cep.readerText.sunday"],this.config.translations["cep.readerText.monday"],this.config.translations["cep.readerText.Tuesday"],this.config.translations["cep.readerText.wednesday"],this.config.translations["cep.readerText.thursday"],this.config.translations["cep.readerText.friday"],this.config.translations["cep.readerText.saturday"]],s="POINTS"===this.config.bookingFlow?e:"price:"+e,d=t.getDate(),l=t.getMonth(),c=t.getDay(),u=t.getFullYear();return 0!==n.has(".holiday-tool-tip").length&&(this.ariaHolidayText=n.has(".holiday-tool-tip").find("#holidayContent")[0].innerText),i+" "+s+" "+r+" "+o[c]+" "+d+"\n             "+a[l]+" "+u+" "+(""===this.ariaHolidayText?"":this.ariaHolidayText)}},t}();e.default=c},function(t,e,n){"use strict";function i(t,e,n,i){var r={method:e,url:s.default.getInstance().appConf.APIURL+t,data:n,headers:i};return $.ajax($.extend(r,i))}function r(t,e){var n={displayType:t.displayType?t.displayType:o.default.config.displayType,channel:t.channel?t.channel:o.default.config.channel,bookingFlow:t.bookingFlow?t.bookingFlow:o.default.config.bookingFlow};return t.adt&&(n.adt=t.adt),t.chd&&(n.chd=t.chd),t.inf&&(n.inf=t.inf),t.yth&&(n.yth=t.yth),t.outDate&&(n.outDate=t.outDate.replace(/-/g,"")),t.inDate&&"OW"!==t.tripType&&(n.inDate=t.inDate.replace(/-/g,"")),t.from&&(n.from=t.from),t.to&&(n.to=t.to),"OJ"===t.tripType&&(n.returnFrom=t.returnFrom?t.returnFrom:""),t.market&&(n.pos=t.market),a&&4!==a.readyState&&a.abort(),a=i("offers/flights","GET",n,{"accept-language":t.lang+"_"+t.market}),console.log("xhr.readyState",a.readyState),a.done(function(t){e.sucuessCallBack(t)}),a.fail(function(t){console.log("in error call back of fal",a.readyState),0!==a.readyState&&e.failureCallback()}),a}Object.defineProperty(e,"__esModule",{value:!0});var a,o=n(3),s=n(13);e.makeHttpCall=i,e.getLPCResponse=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(14),r=n(15),a=n(16),o=n(17),s=n(18),d=n(19),l=n(20),c=n(21),u=n(22),p=n(23),h=n(24),f=n(25),g=n(26),w=n(27),y=n(28),v=n(29),b=function(){function t(){if(t._instance)throw new Error("Error: Instantiation failed, user AppConfig.getInstance()");var e=window.location.host;e.indexOf("localhost")>-1?this.appConf=new i.default:e.indexOf("st1.flysas.com")>-1?this.appConf=new r.default:e.indexOf("st2.flysas.com")>-1?this.appConf=new a.default:e.indexOf("st3.flysas.com")>-1?this.appConf=new o.default:e.indexOf("st4.flysas.com")>-1?this.appConf=new s.default:e.indexOf("st5.flysas.com")>-1?this.appConf=new d.default:e.indexOf("st6.flysas.com")>-1?this.appConf=new l.default:e.indexOf("uat1.flysas.com")>-1?this.appConf=new c.default:e.indexOf("uat2.flysas.com")>-1?this.appConf=new u.default:e.indexOf("uat3.flysas.com")>-1?this.appConf=new p.default:e.indexOf("uat4.flysas.com")>-1?this.appConf=new h.default:e.indexOf("uat5.flysas.com")>-1?this.appConf=new f.default:e.indexOf("uat6.flysas.com")>-1?this.appConf=new g.default:e.indexOf("staging")>-1?this.appConf=new v.default:e.indexOf("www")>-1||e.indexOf("beta")>-1?this.appConf=new w.default:e.indexOf("d360b")>-1?this.appConf=new y.default:this.appConf=new i.default}return t.getInstance=function(){return t._instance},t._instance=new t,t}();e.default=b},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st3/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st1/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st2/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st3/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st4/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st5/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apit.flysas.com/st6/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat1/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat2/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat3/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat4/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat5/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apiu.flysas.com/uat6/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://api.flysas.com/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://apib.flysas.com/"}return t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.APIURL="https://api-staging.flysas.com/"}return t}();e.default=i},function(t,e,n){"use strict";function i(t,e){return"past-day"!==t.sclass?t.text:""}function r(t,e){return"past-day"!==e.sclass?'data-date="'+t.ctrl.stringify(e.date)+'" data-input="'+t.ctrl.stringify(e.date,"ddd, DD MMM")+'" ':""}function a(t,e){return"true"===t.conf.lpc?'<span class="date">'+i(e,t)+"</span> \n                                    <a href='javascript:void(0)' tabindex='-1' class='price' title='Price for this date'> </a>":i(e,t)}function o(t,e,n){return(e%7==0?0===e?' <tr class="datepicker-dateRange">':'</tr> <tr class="datepicker-dateRange">':"")+'<td class="'+n.ctrl.getItemClasses(t)+'"  '+r(n,t)+">\n                  "+(t.holiday&&null!==t.holiday?y(t.holiday):"")+"  \n                  "+a(n,t)+"\n                </td>"}function s(t,e,n){return" "+("true"===e.conf.lpc?"":"<caption>"+v.default.parseMonthYear(e.ctrl.calenderDates[n],e.conf.lang)+"</caption>")+'\n                  <thead>\n                        <tr class="datepicker-weekRange">\n                        '+v.default.daysOfWeek.map(function(t){return"<th>"+t+"</th>"}).join("")+"\n                        </tr>\n                  <thead>\n                  <tbody>         \n                    "+t.map(function(t,n){return o(t,n,e)}).join("")+"\n                  </tbody>"}function d(t,e){return t.ctrl.monthRange.map(function(n,i){var r=v.default.parseMonthYear(n,t.conf.lang).toUpperCase();return"<option "+(l(n,e)?"selected":"")+'  data-date="'+t.ctrl.stringify(n)+'"\n        aria-label ="'+v.default.accessibility(t.ctrl.stringify(n))+'"> '+r+"</option>"}).join("")}function l(t,e){return t.getMonth()===e.getMonth()&&e.getFullYear()===t.getFullYear()}function c(t,e,n){var i=t.conf,r=t.ctrl;return console.log("in calendar section ",n),'<div class="calendar-shadow  relative">   \n    <div class="lpc-loader">\n<div id="spinner" >\n             <ul class="spinner white-bg">\n               <li class="bounce1"></li>\n                <li class="bounce2"></li>\n                <li class="bounce3"></li>\n           </ul>\n            <p data-i18n="lowpricecalendar.message.loaderText">Recalculating available price combinations</p>\n             </div>\n</div>\n                            \n                    '+("true"===i.lpc?'\n                        <div class="calendar-head pull-right">\n                             <h3 class="pull-left" data-i18n="'+u(n)+'" >'+(0===n?"DEPARTURE":"RETURN")+'\n                             </h3>\n                             <div id="calendar-monthDropDown-'+(n+1)+'" class="dropdown-native pull-right"> \n                                <span class="selected-value" >'+v.default.parseMonthYear(r.calenderDates[n],i.lang)+'</span>\n                                 <select name="Outbound" tabindex="0">\n                                '+d(t,r.calenderDates[n])+'\n                                </select>\n                                 <span class="arrow-down icon-arrow-down-grey"></span>\n                              </div>\n                          </div>':"")+'\n                        <table id="calendar-table-'+(n+1)+'">\n                            '+s(e,t,n)+"                              \n                        </table>\n                </div>"}function u(t){return 0===t?"lowPriceCalendar.departure":"lowPriceCalendar.return"}function p(t){return t.translations?t.translations["lowPriceCalendar.addReturnFlight.linkText"]:"Add Return Flight"}function h(t){return' <div class="calendar-shadow relative one-way-only">\n    <a href="javascript:void(0)" class="one-way-link disabled" title="Add return flight" \n       data-i18n="lowPriceCalendar.addReturnFlight.linkText">'+p(t)+"</a>\n                 </div>"}function f(t){var e=t.conf;return'<div id = "lpc-error" class="error-notification mrgn-b-10" role="alert">  \n                <p></p>\n                <a href="javascript:void(0)" class="icon-close-white" title="close">X</a>\n            </div>\n            <div class="calendar-tab-content active lpc" id ="lpcCalendar">\n               '+t.ctrl.dateRange.map(function(e,n){return'\n                <div class="'+(0===n?"left-calendar pad-r-5":"right-calendar pad-l-5")+' pull-left  large-6\n                              medium-6 small-12 col"  id="calendar-tab-'+(n+1)+'" aria-label = "outbound">\n                    '+c(t,e,n)+"\n                </div>"}).join("")+"             \n                "+("OW"===e.tripType?'\n                <div class="right-calendar pad-l-5 pull-left  large-6  medium-6 small-12 col"  id="calendar-tab-2" aria-label = "inbound">\n                    '+h(e)+"\n                </div>":"")+"\n            </div>\n          "+("true"===t.conf.lpc?'         \n        <footer id="lpc-calendar-footer" class="calendar-footer">\n        '+(!1===t.conf.disableHoliday?'\n             <ul class="flights-filter">\n             <li class=\'show\' data-i18n="lowPriceCalendar.show">Show:</li>\n                <li class="direct-flights"><a href="javascript:void(0)">Direct Flights</a></li>\n                <li class="booked-flights"><a href="javascript:void(0)">My booked flights</a></li>\n                <li class="holidays" ><a tabindex="-1" href="javascript:void(0)" data-i18n="lowPriceCalendar.holidays">Holidays</a></li>\n            </ul>':"")+'\n            <div class="total-amount">\n                <span class="total-title" data-i18n="lowPriceCalendar.total">Total</span> <span>:</span>\n                <strong id = "totalPrice" class="amount-value">0</strong>\n                <span class="per-person" >/<span id="peradult" data-i18n="lowPriceCalendar.person">Adult</span>\n                 <span  id="peryouth"  style="display: none;" data-i18n="lowPriceCalendar.youth">youth</span></span>                \n                <button type="button" class="btn small secondary disabled" data-i18n="lowPriceCalendar.button.next" id="totaltext" tabindex = "-1">next</button>\n            </div>            \n         </footer>':"")}function g(t){return'<section class="calendar-wrapper ocp-in-out-drop" style="display: block;">\n            <article class="calendar-inner">\n               '+("true"===t.conf.lpc?"":'  <div class="datepicker-ctrl">\n                    <span id="left-arrow" class="icon-arrow-left-grey2 arrow-left" aria-hidden=\'true\'></span>\n                    <span id="right-arrow" class="icon-arrow-right-grey2 arrow-right  pull-right" aria-hidden=\'true\'></span>\n                </div>')+'\n                <div id="calendar-body-container" >'+f(t)+"\n                </div>\n            </article>\n        </section>"}function w(){return' <div class="lpc-loader">\n<div id="spinner" >\n             <ul class="spinner white-bg">\n               <li class="bounce1"></li>\n                <li class="bounce2"></li>\n                <li class="bounce3"></li>\n           </ul>\n            <p data-i18n="lowpricecalendar.message.loaderText">Recalculating available price combinations</p>\n             </div>\n</div>\n           '}function y(t){return'<div class="filter-mark-wrap">\n                <span class="holiday-mark"></span>\n              </div>                          \n            <div class="holiday-tool-tip" style="display: none;" >\n              <p id="holidayContent"><span class="holiday-mark"></span>'+t+"</p>\n            </div>"}Object.defineProperty(e,"__esModule",{value:!0});var v=n(1);e.default={getCalender:s,getCalendarTemplate:g,getCalendarBlock:f,getADDReturnSection:h,getCalendaSection:c,getLoader:w}},function(t,e,n){function i(t,e,n){var i=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",a=n||{},o=a.locale,s=h.format.formatters,d=h.format.formattingTokensRegExp;o&&o.format&&o.format.formatters&&(s=o.format.formatters,o.format.formattingTokensRegExp&&(d=o.format.formattingTokensRegExp));var l=u(t);return p(l)?r(i,s,d)(l):"Invalid Date"}function r(t,e,n){var i,r,o=t.match(n),s=o.length;for(i=0;i<s;i++)r=e[o[i]]||f[o[i]],o[i]=r||a(o[i]);return function(t){for(var e="",n=0;n<s;n++)o[n]instanceof Function?e+=o[n](t,f):e+=o[n];return e}}function a(t){return t.match(/\[[\s\S]/)?t.replace(/^\[|]$/g,""):t.replace(/\\/g,"")}function o(t,e){e=e||"";var n=t>0?"-":"+",i=Math.abs(t),r=Math.floor(i/60),a=i%60;return n+s(r,2)+e+s(a,2)}function s(t,e){for(var n=Math.abs(t).toString();n.length<e;)n="0"+n;return n}var d=n(32),l=n(36),c=n(5),u=n(0),p=n(39),h=n(40),f={M:function(t){return t.getMonth()+1},MM:function(t){return s(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return s(t.getDate(),2)},DDD:function(t){return d(t)},DDDD:function(t){return s(d(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return l(t)},WW:function(t){return s(l(t),2)},YY:function(t){return s(t.getFullYear(),4).substr(2)},YYYY:function(t){return s(t.getFullYear(),4)},GG:function(t){return String(c(t)).substr(2)},GGGG:function(t){return c(t)},H:function(t){return t.getHours()},HH:function(t){return s(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return s(f.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return s(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return s(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return s(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return s(t.getMilliseconds(),3)},Z:function(t){return o(t.getTimezoneOffset(),":")},ZZ:function(t){return o(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};t.exports=i},function(t,e,n){function i(t){var e=r(t);return o(e,a(e))+1}var r=n(0),a=n(33),o=n(34);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}var r=n(0);t.exports=i},function(t,e,n){function i(t,e){var n=r(t),i=r(e),s=n.getTime()-n.getTimezoneOffset()*a,d=i.getTime()-i.getTimezoneOffset()*a;return Math.round((s-d)/o)}var r=n(35),a=6e4,o=864e5;t.exports=i},function(t,e,n){function i(t){var e=r(t);return e.setHours(0,0,0,0),e}var r=n(0);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=a(e).getTime()-o(e).getTime();return Math.round(n/s)+1}var r=n(0),a=n(2),o=n(38),s=6048e5;t.exports=i},function(t,e,n){function i(t,e){var n=e?Number(e.weekStartsOn)||0:0,i=r(t),a=i.getDay(),o=(a<n?7:0)+a-n;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}var r=n(0);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=new Date(0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),a(n)}var r=n(5),a=n(2);t.exports=i},function(t,e,n){function i(t){if(r(t))return!isNaN(t);throw new TypeError(toString.call(t)+" is not an instance of Date")}var r=n(4);t.exports=i},function(t,e,n){var i=n(41),r=n(42);t.exports={distanceInWords:i(),format:r()}},function(t,e){function n(){function t(t,n,i){i=i||{};var r;return r="string"==typeof e[t]?e[t]:1===n?e[t].one:e[t].other.replace("{{count}}",n),i.addSuffix?i.comparison>0?"in "+r:r+" ago":r}var e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:t}}t.exports=n},function(t,e,n){function i(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=["AM","PM"],d=["am","pm"],l=["a.m.","p.m."],c={MMM:function(e){return t[e.getMonth()]},MMMM:function(t){return e[t.getMonth()]},dd:function(t){return n[t.getDay()]},ddd:function(t){return i[t.getDay()]},dddd:function(t){return o[t.getDay()]},A:function(t){return t.getHours()/12>=1?s[1]:s[0]},a:function(t){return t.getHours()/12>=1?d[1]:d[0]},aa:function(t){return t.getHours()/12>=1?l[1]:l[0]}};return["M","D","DDD","d","Q","W"].forEach(function(t){c[t+"o"]=function(e,n){return r(n[t](e))}}),{formatters:c,formattingTokensRegExp:a(c)}}function r(t){var e=t%100;if(e>20||e<10)switch(e%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"}var a=n(43);t.exports=i},function(t,e){function n(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);var r=i.concat(e).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+r.join("|")+"|.)","g")}var i=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];t.exports=n},function(t,e,n){function i(t,e){var n=r(t),i=Number(e),o=n.getFullYear(),s=n.getDate(),d=new Date(0);d.setFullYear(o,i,15),d.setHours(0,0,0,0);var l=a(d);return n.setMonth(i,Math.min(s,l)),n}var r=n(0),a=n(45);t.exports=i},function(t,e,n){function i(t){var e=r(t),n=e.getFullYear(),i=e.getMonth(),a=new Date(0);return a.setFullYear(n,i+1,0),a.setHours(0,0,0,0),a.getDate()}var r=n(0);t.exports=i},function(t,e,n){"use strict";function i(t,e,n){var i=s[e]?s[e]:s.LU;return n?i.IS_SYM_PREFIX?i.CURRENCY_SYM+r(t,i):r(t,i)+i.CURRENCY_SYM:i.IS_CODE_PREFIX?i.CURRENCY_CODE+r(t,i):r(t,i)+" "+i.CURRENCY_CODE}function r(t,e){var n=parseInt(Math.abs(t||0).toString(),10).toString(),i=a(t,e);return n.replace(o[e.dGroup],"$1"+e.GROUP_SEP)+(""!==i&&e.precision&&e.precision>0?e.DECIMAL_SEP+i:"")}function a(t,e){var n="";return t.toString().split(".").length>1&&(n=t.toString().split(".")[1],n.length>e.precision&&(n=t.toFixed(e.precision).split(".")[1])),n}Object.defineProperty(e,"__esModule",{value:!0});var o={3:/(\d)(?=(\d{3})+(?!\d))/g,2:/(\d)(?=(\d{2})+\d$)/g,4:/(\d)(?=(\d{4})+(?!\d))/g},s={USD:{CURRENCY_SYM:"$",CURRENCY_CODE:"USD",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:".",DECIMAL_SEP:",",precision:2,dGroup:"3"},JPY:{CURRENCY_SYM:"円",CURRENCY_CODE:"JPY",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:",",DECIMAL_SEP:".",precision:0,dGroup:"3"},SEK:{CURRENCY_SYM:":-",CURRENCY_CODE:"SEK",IS_SYM_PREFIX:!1,IS_CODE_PREFIX:!1,GROUP_SEP:"",DECIMAL_SEP:".",precision:0,dGroup:"3"},DKK:{CURRENCY_SYM:",-",CURRENCY_CODE:"DKK",IS_SYM_PREFIX:!1,IS_CODE_PREFIX:!1,GROUP_SEP:".",DECIMAL_SEP:",",precision:0,dGroup:"3"},NOK:{CURRENCY_SYM:",-",CURRENCY_CODE:"NOK",IS_SYM_PREFIX:!1,IS_CODE_PREFIX:!1,prefix:"",suffix:",-",GROUP_SEP:".",DECIMAL_SEP:",",precision:0,dGroup:"3"},EUR:{CURRENCY_SYM:"€",CURRENCY_CODE:"EUR",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:" ",DECIMAL_SEP:",",precision:3,dGroup:"3"},GBP:{CURRENCY_SYM:"£",CURRENCY_CODE:"GBP",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:" ",DECIMAL_SEP:".",precision:3,dGroup:"3"},POINTS:{prefix:"",suffix:"",CURRENCY_CODE:"PTS",GROUP_SEP:" ",DECIMAL_SEP:"",precision:0,dGroup:"3"},US:{CURRENCY_SYM:"$",CURRENCY_CODE:"USD",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:".",DECIMAL_SEP:",",precision:2,dGroup:"3"},JP:{CURRENCY_SYM:"円",CURRENCY_CODE:"JPY",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:",",DECIMAL_SEP:".",precision:0,dGroup:"3"},SE:{CURRENCY_SYM:":-",CURRENCY_CODE:"SEK",IS_SYM_PREFIX:!1,IS_CODE_PREFIX:!1,GROUP_SEP:"",DECIMAL_SEP:".",precision:0,dGroup:"3"},DK:{CURRENCY_SYM:",-",CURRENCY_CODE:"DKK",IS_SYM_PREFIX:!1,IS_CODE_PREFIX:!1,GROUP_SEP:".",DECIMAL_SEP:",",precision:0,dGroup:"3"},NO:{CURRENCY_SYM:",-",CURRENCY_CODE:"NOK",IS_SYM_PREFIX:!1,IS_CODE_PREFIX:!1,prefix:"",suffix:",-",GROUP_SEP:" ",DECIMAL_SEP:",",precision:0,dGroup:"3"},LU:{CURRENCY_SYM:"€",CURRENCY_CODE:"EUR",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:" ",DECIMAL_SEP:",",precision:3,dGroup:"3"},GB:{CURRENCY_SYM:"£",CURRENCY_CODE:"GBP",IS_SYM_PREFIX:!0,IS_CODE_PREFIX:!1,GROUP_SEP:" ",DECIMAL_SEP:".",precision:3,dGroup:"3"}};e.formatedPrice=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t.prototype.GTMtrackInteraction=function(t,e,n){window.sasD360DataLayer.push({event:"interaction","interaction.category":t,"interaction.action":e,"interaction.label":n})},t}();e.default=i},function(t,e,n){function i(t,e){var n=r(t),i=r(e);return n.getFullYear()===i.getFullYear()&&n.getMonth()===i.getMonth()}var r=n(0);t.exports=i}])})},function(t,e,n){"use strict";var i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(85),a=function(t){function e(e){var n=t.call(this)||this;return n.dateddView=e,n.bindEvents(),n}return i(e,t),e.prototype.bindEvents=function(){t.prototype.bindEvents.call(this,[this.dateddView.$day,this.dateddView.$nextMonth,this.dateddView.$prevMonth,this.dateddView.$lpcTab,this.dateddView.$regularCalendarTab,this.dateddView.$calWrapper])},e.prototype.tab=function(t,e){var n=this;switch(e){case this.dateddView.$day:!1!==this.dateddView.dateView.disableNext||t.shiftKey?t.shiftKey&&(t.preventDefault(),!1===this.dateddView.dateView.disablePrev?this.dateddView.$prevMonth.focus():this.dateddView.$lpcTab.hasClass("disable-lpc")?this.dateddView.$lpcTab.hasClass("disable-lpc")&&this.dateddView.$regularCalendarTab.focus():this.dateddView.$lpcTab.focus()):(t.preventDefault(),!0===this.dateddView.outPointerFlag&&(this.dateddView.outPointerFlag=!1),!0===this.dateddView.inPointerFlag&&(this.dateddView.inPointerFlag=!1),this.dateddView.$nextMonth.focus());break;case this.dateddView.$nextMonth:t.shiftKey?(t.preventDefault(),$(".left-calendar tbody tr td.valid-day").first().focus(),this.bindEvents(),clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.dateddView.$inPointer.is(":visible")?n.dateddView.announceBound("return"):n.dateddView.announceBound("departure")},50)):"one-way"===this.dateddView.tripType&&!0!==this.dateddView.inPointerFlag?(t.preventDefault(),$("#passengers").focus(),this.dateddView.inPointerFlag=!0):this.dateddView.$outPointer.is(":visible")?(t.preventDefault(),$("#Inbound").focus(),this.dateddView.$regularCalendarTab.focus(),this.dateddView.outPointerFlag=!0):this.dateddView.$inPointer.is(":visible")&&!1===this.dateddView.outPointerFlag&&(t.preventDefault(),$("#passengers").focus());break;case this.dateddView.$prevMonth:t.shiftKey||(t.preventDefault(),$(".left-calendar tbody tr td.valid-day").first().focus(),this.bindEvents(),clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.dateddView.$inPointer.is(":visible")?n.dateddView.announceBound("return"):n.dateddView.announceBound("departure")},50));break;case this.dateddView.$lpcTab:t.shiftKey||(this.dateddView.$lpcTab.hasClass("disable-lpc")||this.dateddView.$lpcTab.hasClass("active")?this.dateddView.$lpcTab.hasClass("active")&&this.dateddView.$lpcOuntboundMonthDropdown.focus():(t.preventDefault(),!1===this.dateddView.dateView.disablePrev?(t.preventDefault(),this.dateddView.$prevMonth.focus(),clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.dateddView.$prevMonth.focus()},100)):($(".left-calendar tbody tr td.valid-day").first().focus(),this.bindEvents(),clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.dateddView.$inPointer.is(":visible")?n.dateddView.announceBound("return"):n.dateddView.announceBound("departure")},50))));break;case this.dateddView.$regularCalendarTab:if(t.shiftKey)t.shiftKey&&(t.preventDefault(),"multi-city"!==this.dateddView.tripType?$("#destination").focus():$("#returnFrom").focus());else if(t.preventDefault(),this.dateddView.$lpcTab.hasClass("disable-lpc")){if(this.dateddView.$lpcTab.hasClass("disable-lpc")){if(t.preventDefault(),!1===this.dateddView.dateView.disablePrev)return t.preventDefault(),this.dateddView.$prevMonth.focus(),void setTimeout(function(){n.dateddView.$prevMonth.focus()},100);$(".left-calendar tbody tr td.valid-day").first().focus(),this.bindEvents(),clearTimeout(this.timeout),this.timeout=setTimeout(function(){n.dateddView.$inPointer.is(":visible")?n.dateddView.announceBound("return"):n.dateddView.announceBound("departure")},50)}}else t.preventDefault(),this.dateddView.$lpcTab.focus(),this.dateddView.$lpcTab.hasClass("active")&&this.dateddView.$lpcTab.attr("aria-label",this.dateddView.translation.t("cep.readerText.lowPriceCalendar"))}},e.prototype.enter=function(t,e,n){var i=this;switch(e){case this.dateddView.$prevMonth:t.preventDefault(),n||(this.dateddView.prevNextMonthClick(t,0),$("body").addClass("viewfocus"));break;case this.dateddView.$day:t.preventDefault(),this.dateddView.daySelect(t),"one-way"===this.dateddView.tripType?this.dateddView.inPointerFlag=!1:this.dateddView.outPointerFlag=!1,clearTimeout(this.timeout),this.timeout=setTimeout(function(){i.dateddView.$inPointer.is(":visible")&&!$(e).hasClass("end-date")&&i.dateddView.announceBound("return")},50);break;case this.dateddView.$nextMonth:t.preventDefault(),n||(this.dateddView.prevNextMonthClick(t,1),$("body").addClass("viewfocus"));break;case this.dateddView.$lpcTab:t.preventDefault(),this.dateddView.$lpcTab.click(),this.dateddView.$lpcTab.attr("aria-label",this.dateddView.translation.t("cep.readerText.lowPriceCalendar")),this.dateddView.$lpcOuntboundMonthDropdown.focus();break;case this.dateddView.$regularCalendarTab:t.preventDefault(),this.dateddView.$regularCalendarTab.click(),$(e).attr("aria-label",this.dateddView.translation.t("cep.readerText.regularCalendar"))}},e.prototype.escape=function(t,e){this.dateddView.hideDropDown()},e.prototype.space=function(t,e){this.enter(t,e,!0)},e.prototype.leftArrow=function(t,e){var n=$(t.currentTarget);t.preventDefault(),this.dateddView.$day&&(n.prev("td.valid-day").focus(),0===n.prev("td.valid-day").length&&$(".right-calendar tbody tr td.valid-day:first")[0]!==n[0]?n.parent().prev("tr").find("td.valid-day").last().focus():$(".right-calendar tbody tr td.valid-day:first")[0]===n[0]&&$(".left-calendar tbody tr td.valid-day").last().focus())},e.prototype.upArrow=function(t,e){var n=null,i=$(t.currentTarget);0!==i.parent().prev("tr").length?(n=i.parent().prev("tr").find("td")[i.index()],n.classList.contains("valid-day")&&(t.preventDefault(),n.focus())):t.preventDefault()},e.prototype.rightArrow=function(t,e){var n=$(t.currentTarget);t.preventDefault(),n.next("td.valid-day").focus(),0===n.next("td.valid-day").length&&$(".left-calendar tbody tr td.valid-day:last")[0]!==n[0]?n.parent().next("tr").find("td.valid-day").first().focus():$(".left-calendar tbody tr td.valid-day:last")[0]===n[0]&&(t.preventDefault(),this.dateddView.prevNextMonthClick(t,1),clearTimeout(this.timeoutfn),this.timeoutfn=setTimeout(function(){$(".left-calendar tbody tr td.valid-day").first().focus()},100),this.bindEvents())},e.prototype.downArrow=function(t,e){var n=null,i=$(t.currentTarget);0!==i.parent().next("tr").length?(n=i.parent().next("tr").find("td")[i.index()],n.classList.contains("valid-day")&&(t.preventDefault(),n.focus())):t.preventDefault()},e.prototype.add=function(t){},e.prototype.subtract=function(t){},e}(r.default);e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t.prototype.bindEvents=function(t){var e=this;$.each(t,function(t,n){n.on("keydown",function(t){return e.keyNavigations(t,n)})})},t.prototype.keyNavigations=function(t,e){switch(t.keyCode){case 9:this.tab(t,e);break;case 13:this.enter(t,e);break;case 27:this.escape(t,e);break;case 32:this.space(t,e);break;case 37:this.leftArrow(t,e);break;case 38:this.upArrow(t,e);break;case 39:this.rightArrow(t,e);break;case 40:this.downArrow(t,e);break;case 107:this.add(t,e);break;case 109:this.subtract(t,e)}},t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),r=n(87),a=n(0),o=n(7),s=function(){function t(t,e){this.fieldsView=t,this.config=e,this.translation=a.default.getInstance(),this.init()}return t.prototype.init=function(){this.$target=this.fieldsView.$fieldsElement.find(".passengers"),this.$paxInput=this.$target.find("#passengers"),this.$paxArrow=this.$paxInput.next(".icon-arrow-down-grey"),this.$paxField=new o.default(this.$paxInput),this.$window=$(window),this.isDesktop=this.$window.width()>=767,this.isPaxFocussed=!1,this.setInteraction()},t.prototype.setInteraction=function(){var t,e=this;window;this.$paxInput.on("focus",function(t){return e.paxInputFocus(t)}),this.$paxInput.on("touchend click",function(n){!0!==t&&e.paxInputClick(n)}).on("touchmove",function(e){t=!0}).on("touchstart",function(){t=!1}),this.$paxArrow.on("touchend click",function(n){!0!==t&&e.paxInputClick(n)}).on("touchmove",function(e){t=!0}).on("touchstart",function(){t=!1}),this.loadPaxDropdown()},t.prototype.paxInputFocus=function(t){t.preventDefault();var e=$(t.currentTarget),n=e.closest(".input-set");this.fieldsView.hideAllDDExceptPax(),n.find("input").addClass("focus-color"),this.showHidePaxDD(t),$("#passengers").attr("aria-expanded","true"),t.stopPropagation()},t.prototype.paxInputBlur=function(t){$(t.currentTarget).removeClass("focus-color"),this.hideDropDown()},t.prototype.showHidePaxDD=function(t){this.$paxArrow.toggleClass("up"),this.paxDDView.$dropDown.toggle(),this.paxDDView.$arrow.toggle(),this.$paxArrow.hasClass("up")?(i.default.focusCEP(),this.fieldsView.hideAllDDExceptPax(),this.$paxInput.addClass("focus-color"),this.checkForYouthAndAdultAvailability(),"points"===this.fieldsView.cepView.preferencesView.selectedBookingFlow&&this.paxDDView.youthHelper.addClassDisplayNone(this.paxDDView.youthCount)):(this.$paxInput.removeClass("focus-color"),i.default.deFocusCEP())},t.prototype.checkForYouthAndAdultAvailability=function(){this.paxDDView.youthCount>0&&(this.paxDDView.youthHelper.toggleYouth(this.paxDDView.youthCount,"paxField"),this.paxDDView.youthHelper.addClassDisplayNone(this.paxDDView.youthCount)),0===this.paxDDView.youthCount&&this.fieldsView.getDobTFromCep()&&this.fieldsView.calendarSetView.$outBoundDateField.removeError()},t.prototype.checkForYouthEligibility=function(){var t=this.fieldsView.getDobTFromCep(),e=this.fieldsView.calendarSetView.$outboundInput.attr("data-date"),n=new Date(e),i=this.fieldsView.checkAgeForCustomer(t,n);i[1]<26&&i[1]>=12?this.paxDDView.$bookYouth.hasClass("displayNone")&&this.paxDDView.youthHelper.removeClassDisplayNone():this.paxDDView.$bookYouth.hasClass("displayNone")||this.paxDDView.youthHelper.addClassDisplayNone()},t.prototype.paxInputClick=function(t){t.preventDefault();var e=$(t.currentTarget);e.is("input")||(e=this.$paxInput),this.isPaxFocussed?(e.trigger("blur"),this.isPaxFocussed=!1,this.$paxInput.removeClass("focus-color"),i.default.deFocusCEP()):(this.isPaxFocussed=!0,e.is(":focus")||e.focus()),this.isPaxFocussed||this.hideDropDown()},t.prototype.loadPaxDropdown=function(){var t=this;this.paxDDView=new r.default(this.$target,function(){return t.updatePaxField()},this.fieldsView,this.config)},t.prototype.updatePaxField=function(){this.setPaxCount(),this.fieldsView.validate(this.$paxInput)},t.prototype.setPaxCount=function(){var t=this.paxDDView.adultCount,e=this.paxDDView.childCount,n=this.paxDDView.infantCount,i=this.paxDDView.youthCount,r=$("#"+this.paxDDView.paxTypeConf.Youth.name),a=t+e+n,o=0===a&&0===i?1:0!==a&&0===i?a:i,s=i>0&&0===t;if(this.paxDDView.$bookAdult.hasClass("displayNone")){0===t&&0===e&&0===n?(this.$paxField.setError(this.t("cep.message.minimumOnePassenger")),this.$paxField.showError()):this.$paxField.removeError();var d=o>1?e>0||n>0?o+" "+this.t("cep.passenger.passengers").toLowerCase():o+" "+this.t("cep.passengers.adults").toLowerCase():o+" "+this.t("cep.passengers.adult").toLowerCase();this.$paxInput.val(d)}if(this.paxDDView.$bookYouth.hasClass("displayNone")&&"none"!==r.css("display")||!0===s){var l=void 0;l=1===o?o+" "+this.t("cep.passengers.youth").toLowerCase():o+" "+this.t("cep.passengers.youths").toLowerCase(),0===i?(this.$paxField.setError(this.t("cep.message.minimumOnePassenger")),this.$paxField.showError()):this.$paxField.removeError(),this.$paxInput.val(l)}},t.prototype.hideDropDown=function(){this.isPaxFocussed=!1,this.paxDDView.hideDropdown()},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(88),r=n(18),a=n(89),o=n(0),s=n(3),d=n(7),l=n(5),c=n(90),u=n(2),p=function(){function t(t,e,n,i){this.$target=t,this.updatePaxField=e,this.fieldsView=n,this.config=i,this.flagToCheckYouth=!1,this.translation=o.default.getInstance(),this.cepData=s.default.getInstance(),this.dataLayerService=new u.default,this.init()}return t.prototype.init=function(){this.$target.append(i),this.translation.applyTranslation(this.$target),this.$dropDown=this.$target.find(".select-passengers"),this.$dropdownArrow=this.$target.find(".icon-arrow-down-grey"),this.$arrow=this.$dropDown.find(".arrow-up"),this.$paxListCont=this.$target.find("ul.passengers-list"),this.$notifyPax=this.$target.find(".notify-pax"),this.$childAlone=this.$target.find("#child-travel-alone"),this.$infantPerAdult=this.$target.find("#infant-per-adult"),this.totalCount=this.adultCount=1,this.childCount=this.infantCount=0,this.$outBoundDateField=new d.default($("#Outbound")),this.$paxInput=this.$target.find("#passengers"),this.$paxField=new d.default(this.$paxInput),this.loadPaxList(),this.setDefaultTravelerType(),this.handlePax(),this.apiClient=new l.default,this.youthHelper=new c.default(this),this.$groupChildLink=this.$target.find("#groupChildLink"),this.$outbound=this.$target.find("#Outbound"),this.$inbound=this.$target.find("#Inbound")},t.prototype.loadPaxList=function(){var t=this;this.supportedCep=this.cepData.getSupportedCep(),this.paxTypeConf=this.cepData.getMarketData().passengerTypes;var e=this.config.urlParams&&this.config.urlParams.paxObj?this.config.urlParams.paxObj:null;e?(this.totalWithoutInfCount=e.adt+e.inf,this.adultCount=this.paxTypeConf.Adult.preSelected=e.adt,this.childCount=this.paxTypeConf.Child.preSelected=e.chd,this.infantCount=this.paxTypeConf.Infant.preSelected=e.inf,this.youthCount=this.paxTypeConf.Youth.preSelected=e.yth):(this.totalWithoutInfCount=this.adultCount=1,this.childCount=this.infantCount=this.youthCount=0),this.passengerTypes=this.supportedCep[0].supportedPassengerType.map(function(e){return t.paxTypeConf[e]}),this.paxListView=new a.default(this.passengerTypes),this.$paxListCont.prepend(this.paxListView.getPassengerList()),this.$adult=this.$paxListCont.find("#Adult"),this.$child=this.$paxListCont.find("#Child"),this.$infant=this.$paxListCont.find("#Infant"),this.$youth=this.$paxListCont.find("li#Youth"),this.$bookAdult=this.$paxListCont.find("#book-adult"),this.$bookYouth=this.$paxListCont.find("li#book-youth"),this.$bookYouthWarning=this.$paxListCont.find("li#book-youth-warning"),this.$increasePax=this.$paxListCont.find("li a.icon-increase"),this.$decreasePax=this.$paxListCont.find("li a.icon-decrease"),this.$decreasePaxForAdult=this.$target.find("ul > li:first-child .count .icon-decrease"),this.$increasePaxForAdult=this.$target.find("ul > li:first-child .count .icon-increase"),this.$decreasePaxForChild=this.$target.find("ul > li:nth-child(3) .count .icon-decrease"),this.$increasePaxForChild=this.$target.find("ul > li:nth-child(3) .count .icon-increase"),this.$decreasePaxForInfant=this.$target.find("ul > li:nth-child(4) .count .icon-decrease"),this.$increasePaxForInfant=this.$target.find("ul > li:nth-child(4) .count .icon-increase"),this.$decreasePaxForYouth=this.$target.find("ul > li:nth-child(5) .count .icon-decrease"),this.$increasePaxForYouth=this.$target.find("ul > li:nth-child(5) .count .icon-increase"),this.$adultPreSelected=this.$target.find("ul > li:first-child .selected-count"),this.$childPreSelected=this.$target.find("ul > li:nth-child(2) .selected-count"),this.$infantPreSelected=this.$target.find("ul > li:nth-child(3).selected-count"),this.$youthPreSelected=this.$target.find("ul > li:nth-child(5) .selected-count"),this.$cepAddAdult=this.$target.find("#cepAddAdult"),this.$cepRemoveAdult=this.$target.find("#cepRemoveAdult"),this.$cepAddChild=this.$target.find("#cepAddChild"),this.$cepRemoveChild=this.$target.find("#cepRemoveChild"),this.$cepAddInfant=this.$target.find("#cepAddInfant"),this.$cepRemoveInfant=this.$target.find("#cepRemoveInfant"),this.$cepAddYouth=this.$target.find("#cepAddYouth"),this.$cepRemoveYouth=this.$target.find("#cepRemoveYouth"),this.$totalCountAdult=this.$target.find("#totalCountAdult"),this.$totalCountChild=this.$target.find("#totalCountChild"),this.$totalCountInfant=this.$target.find("#totalCountInfant"),this.$totalCountYouth=this.$target.find("#totalCountYouth"),this.$youthlink=this.$target.find("#youthPaxLink"),this.setInteraction()},t.prototype.setInteraction=function(){var t=this;this.$dropDown.on("click",function(t){return t.stopPropagation()}),this.$increasePax.on("click",function(e){return t.increasePax(e,"+")}),this.$decreasePax.on("click",function(e){return t.increasePax(e,"-")}),this.$notifyPax.find("a").attr("href",this.t("cep.groupBookingRedirectionUrl."+this.config.market)),this.$bookYouth.on("click",function(e){return t.youthHelper.toggleYouth(0)}),this.$bookAdult.on("click",function(e){return t.youthHelper.toggleAdult(0,0,!1)}),this.srAdultCount=this.t("cep.readerText.adultname")+" "+this.t("cep.readerText.selected"),this.srChildCount=this.t("cep.readerText.childname")+" "+this.t("cep.readerText.selected"),this.srInfantCount=this.t("cep.readerText.infantname")+" "+this.t("cep.readerText.selected"),this.srYouthCount=this.t("cep.readerText.youthname")+" "+this.t("cep.readerText.selected"),this.$paxInput.on("keydown",function(e){return t.accessTravelers(e)}),this.$adult.on("keydown",function(e){return t.accessKey(e)}),this.$child.on("keydown",function(e){return t.accessChildKey(e)}),this.$infant.on("keydown",function(e){return t.accessInfantKey(e)}),this.$bookAdult.on("keydown",function(e){return t.accessBookAdult(e)}),this.$youth.on("keydown",function(e){return t.accessYouthKey(e)}),this.$bookYouth.find("a").on("keydown",function(e){return t.accessYouthLink(e)}),setTimeout(function(){t.$groupBooking=t.$target.find("#sr-only-grpbooking"),t.$minorBooking=t.$target.find("#sr-only-minorbooking"),t.$groupBooking.attr("href",t.t("cep.groupBookingRedirectionUrl."+t.config.market)),t.$minorBooking.attr("href",t.t("cep.unaccompaniedMinorRedirectionUrl."+t.config.market)),t.$groupBooking.on("keydown",function(e){return t.accessGroupLink(e)}),t.$minorBooking.on("keydown",function(e){return t.accessMinorLink(e)})},50)},t.prototype.setTravelerCount=function(){this.adultCount=this.paxTypeConf.Adult.preSelected,this.childCount=this.paxTypeConf.Child.preSelected,this.infantCount=this.paxTypeConf.Infant.preSelected,this.youthCount=this.paxTypeConf.Youth.preSelected},t.prototype.setDefaultTravelerType=function(){this.config.defaultTravelerType===r.DefaultTraveler.YOUTH?(this.$youth.show(),this.$bookAdult.removeClass("displayNone"),this.$adult.hide(),this.$child.hide(),this.$infant.hide(),this.totalWithoutInfCount=this.youthCount=this.paxTypeConf.Youth.preSelected=1,this.childCount=this.infantCount=this.adultCount=this.paxTypeConf.Adult.preSelected=this.paxTypeConf.Child.preSelected=this.paxTypeConf.Infant.preSelected=0):(this.$childAlone.hide(),this.$youth.hide(),this.$bookAdult.addClass("displayNone"))},t.prototype.increasePax=function(t,e){if(!$(t.currentTarget).hasClass("disabled")){var n="+"===e?$(t.currentTarget).prev():$(t.currentTarget).next(),i=$(t.currentTarget).parents("li").attr("id"),r=this.paxTypeConf[i].preSelected;r+="+"===e?r<this.paxTypeConf[i].maxPax?1:0:r<=this.paxTypeConf[i].maxPax?-1:0,this.paxTypeConf[i].preSelected=r,this.handlePax(),r=this.paxTypeConf[i].preSelected;var a=r.toString();n.html(a);var o="Total  "+r+" "+i+" "+this.t("cep.readerText.selected");$("#totalCount"+i).html(""),setTimeout(function(){$("#totalCount"+i).html(o)},300),this.updatePaxField(),"+"===e?this.dataLayerService.dataLayerincreasePax(i,r):this.dataLayerService.dataLayerdecreasePax(i,r)}},t.prototype.disable=function(t){t.addClass("disabled")},t.prototype.enable=function(t){t.removeClass("disabled")},t.prototype.handlePax=function(){var t=this;this.maxPax=9,this.setTravelerCount(),this.totalCount=0,this.totalWithoutInfCount=0,Object.keys(this.paxTypeConf).forEach(function(e){"Infant"!==e&&(t.totalWithoutInfCount+=t.paxTypeConf[e].preSelected)}),this.$paxListCont.find("li:not(#book-youth)").each(function(e,n){t.paxCountValidation(n)}),this.childCount=this.paxTypeConf.Child.preSelected},t.prototype.paxCountValidation=function(t){var e=$(t).find("a.icon-increase"),n=$(t).find("a.icon-decrease"),i=$(t).find(".selected-count");switch($(t).attr("id")){case"Adult":this.adultValidation(t,e,n,i);break;case"Child":this.childValidation(t,e,n,i);break;case"Infant":this.infantValidation(t,e,n,i);break;case"Youth":this.youthvalidation(t,e,n,i)}},t.prototype.adultValidation=function(t,e,n,i){this.totalWithoutInfCount<=9&&this.$bookAdult.hasClass("displayNone")&&(this.enable($(t).find("a")),this.adultCount!==this.infantCount&&0!==this.adultCount||this.disable(n),this.adultCount+this.childCount===this.maxPax&&this.disable(e),this.showAdultMessage())},t.prototype.childValidation=function(t,e,n,i){this.totalWithoutInfCount<=9&&this.$bookAdult.hasClass("displayNone")&&(this.enable($(t).find("a")),this.adultCount+this.childCount===this.maxPax&&this.disable(e),0===this.childCount&&this.disable(n),0===this.adultCount&&this.childCount>0&&(this.showChildMessage(),this.paxTypeConf.Child.preSelected=0,i.text(this.paxTypeConf.Child.preSelected.toString()),this.disable(n),this.disable(e)))},t.prototype.infantValidation=function(t,e,n,i){this.infantCount<=9&&this.$bookAdult.hasClass("displayNone")&&(this.enable($(t).find("a")),this.infantCount===this.adultCount&&(this.showInfantMessage(),this.enable(n),this.disable(e)),0===this.infantCount&&this.disable(n))},t.prototype.youthvalidation=function(t,e,n,i){this.youthCount<=9&&this.$bookYouth.hasClass("displayNone")&&(this.enable($(t).find("a")),0===this.youthCount&&this.disable(n),this.maxPax===this.youthCount&&this.disable(e))},t.prototype.showAdultMessage=function(){this.adultCount>0&&this.adultCount!==this.infantCount&&(this.$notifyPax.find("span").html(this.t("makeGroupBooking")),this.$notifyPax.find("a").html(this.t("makeGroupBooking.linkText")),this.$notifyPax.find("a").attr("aria-label","press enter to group book"),this.$notifyPax.find("a").attr("href",this.t("cep.groupBookingRedirectionUrl."+this.config.market)))},t.prototype.showChildMessage=function(){0===this.adultCount&&this.childCount>0?(this.$notifyPax.find("span").html(this.t("childTravellingAlone")),this.$notifyPax.find("a").html(this.t("bookHere")),this.$notifyPax.find("a").attr("aria-label","press enter to book for unaccompainied minor"),this.$notifyPax.find("a").attr("href",this.t("cep.unaccompaniedMinorRedirectionUrl."+this.config.market))):(this.$notifyPax.find("span").html(this.t("makeGroupBooking")),this.$notifyPax.find("a").html(this.t("makeGroupBooking.linkText")),this.$notifyPax.find("a").attr("aria-label","press enter to group book"),this.$notifyPax.find("a").attr("href",this.t("cep.groupBookingRedirectionUrl."+this.config.market)))},t.prototype.showInfantMessage=function(){var t=this;if(this.adultCount>0&&this.adultCount===this.infantCount){var e=this.t("cep.message.infantPerAdult")?this.t("cep.message.infantPerAdult"):"It's not possible to book more than one infant ticket per adult";this.$notifyPax.find("span").attr("role","alert"),this.$notifyPax.find("span").html(e),this.$notifyPax.find("a").html(""),clearTimeout(this.timeoutfnone),this.timeoutfnone=setTimeout(function(){t.$notifyPax.find("span").removeAttr("role")},300)}else 0===this.adultCount&&0===this.childCount&&(this.$notifyPax.find("span").html(this.t("makeGroupBooking")),this.$notifyPax.find("a").html(this.t("makeGroupBooking.linkText")),this.$notifyPax.find("a").attr("aria-label","press enter to group book"),this.$notifyPax.find("a").attr("href",this.t("cep.groupBookingRedirectionUrl."+this.config.market)))},t.prototype.hideDropdown=function(){this.$dropDown.hide(),this.$arrow.hide(),this.$dropdownArrow.removeClass("up"),$("#passengers").attr("aria-expanded","false")},t.prototype.t=function(t){return this.translation.t(t)},t.prototype.accessKey=function(t){var e=this;switch(t.keyCode){case 37:case 109:t.preventDefault(t),this.$cepRemoveAdult.click();break;case 39:case 107:t.preventDefault(t),this.$cepAddAdult.click();break;case 9:t.preventDefault(t),t.shiftKey?(this.$paxInput.focus(),this.hideDropdown()):this.$bookYouth.find("a").focus();break;case 40:t.preventDefault(t),this.$totalCountChild.html(" 2 of 3 "+this.childCount+" "+this.srChildCount+" "+this.t("cep.readerText.childrentext")),this.$child.focus(),setTimeout(function(){e.$totalCountChild.html("")},200);break;case 38:t.preventDefault(t),this.$paxInput.focus(),this.hideDropdown();break;case 13:t.preventDefault(t);break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessChildKey=function(t){var e=this;switch(t.keyCode){case 37:case 109:t.preventDefault(t),this.$cepRemoveChild.click();break;case 39:case 107:t.preventDefault(t),this.$cepAddChild.click();break;case 9:t.preventDefault(t),t.shiftKey?(this.$adult.focus(),this.$totalCountAdult.html(" 1 of 3 "+this.adultCount+this.srAdultCount+" "+this.t("cep.readerText.adultstext")),setTimeout(function(){e.$totalCountAdult.html("")},200)):this.$bookYouth.find("a").focus();break;case 40:t.preventDefault(t),this.$infant.focus(),this.$totalCountInfant.html(" 3 of 3 "+this.infantCount+" "+this.srInfantCount+" "+this.t("cep.readerText.infanttext")),setTimeout(function(){e.$totalCountInfant.html("")},200);break;case 38:t.preventDefault(t),this.$adult.focus(),this.$totalCountAdult.html(" 1 of 3 "+this.adultCount+" "+this.srAdultCount+" "+this.t("cep.readerText.adultstext")),setTimeout(function(){e.$totalCountAdult.html("")},200);break;case 13:t.preventDefault(t);break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessInfantKey=function(t){var e=this;switch(t.keyCode){case 37:case 109:t.preventDefault(t),this.$totalCountAdult.attr("role",""),this.$cepRemoveInfant.click();break;case 39:case 107:t.preventDefault(t),this.$totalCountAdult.attr("role",""),this.$cepAddInfant.click();break;case 9:t.shiftKey&&(t.preventDefault(t),this.$child.focus(),this.$totalCountChild.html(" 2 of 3 "+this.childCount+" "+this.srChildCount+" "+this.t("cep.readerText.childrentext")),setTimeout(function(){e.$totalCountChild.html("")},200));break;case 40:t.preventDefault(t),this.$bookYouth.find("a").focus();break;case 38:t.preventDefault(t),this.$child.focus(),this.$totalCountChild.html(" 2 of 3 "+this.childCount+this.srChildCount+" "+this.t("cep.readerText.childrentext")),setTimeout(function(){e.$totalCountChild.html("")},200);break;case 13:t.preventDefault(t);break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessBookAdult=function(t){var e=this;switch(t.keyCode){case 9:t.shiftKey?(t.preventDefault(),this.$paxInput.focus(),this.hideDropdown()):(t.preventDefault(t),this.$youth.focus(),this.$totalCountYouth.html(""+this.youthCount+this.srYouthCount+" "+this.t("cep.readerText.youthtext")),setTimeout(function(){e.$totalCountYouth.html("")},200));break;case 40:t.preventDefault(t),this.$youth.focus(),this.$totalCountYouth.html(""+this.youthCount+this.srYouthCount+" "+this.t("cep.readerText.youthtext")),setTimeout(function(){e.$totalCountYouth.html("")},200);break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessYouthKey=function(t){switch(t.keyCode){case 37:case 109:t.preventDefault(t),this.$cepRemoveYouth.click();break;case 39:case 107:t.preventDefault(t),this.$cepAddYouth.click();break;case 9:t.shiftKey&&(t.preventDefault(t),this.$bookAdult.find("a").focus());break;case 38:t.preventDefault(t),this.$bookAdult.find("a").focus();break;case 13:t.preventDefault(t);break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessYouthLink=function(t){var e=this;switch(t.keyCode){case 9:t.shiftKey&&(t.preventDefault(t),this.$infant.focus(),this.$totalCountInfant.html(" 3 of 3 "+this.infantCount+" "+this.srInfantCount+" "+this.t("cep.readerText.infanttext")),setTimeout(function(){},200));break;case 40:t.preventDefault(t);break;case 38:t.preventDefault(t),this.$infant.focus(),this.$totalCountInfant.html(" 3 of 3 "+this.infantCount+" "+this.srInfantCount+" "+this.t("cep.readerText.infanttext")),setTimeout(function(){e.$totalCountInfant.html("")},200);break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessMinorLink=function(t){var e=this;switch(t.keyCode){case 9:t.shiftKey||(t.preventDefault(),setTimeout(function(){e.$totalCountInfant.attr("aria-live","polite"),e.$totalCountInfant.html("collapsed")},10),setTimeout(function(){e.$totalCountInfant.removeAttr("aria-live"),e.$totalCountInfant.html(""),e.hideDropdown(),e.$paxInput.removeClass("focus-color"),e.fieldsView.$search.focus()},200))}},t.prototype.accessGroupLink=function(t){switch(t.keyCode){case 40:t.preventDefault(t),this.$minorBooking.focus();break;case 27:t.preventDefault(t),this.hideDropdown()}},t.prototype.accessTravelers=function(t){switch(t.keyCode){case 9:t.shiftKey?t.shiftKey&&(!0===this.config.roundTrip||!0===this.config.returnFrom?this.$outbound.focus():this.$inbound.focus()):(t.preventDefault(t),this.$dropdownArrow.hasClass("up")?this.$youth.is(":visible")?(t.preventDefault(t),this.$youth.focus(),this.$totalCountYouth.html(""+this.youthCount+this.srYouthCount+" "+this.t("cep.readerText.youthtext")),setTimeout(function(){},200)):this.$youthlink.focus():(this.hideDropdown(),this.$paxInput.removeClass("focus-color"),this.fieldsView.$search.focus()));break;case 40:t.preventDefault(t),this.$adult.focus(),this.$totalCountAdult.html(" 1 of 3 "+this.adultCount+" "+this.srAdultCount+" "+this.t("cep.readerText.adultstext")),setTimeout(function(){},200),this.$bookAdult.find("a").focus();break;case 27:t.preventDefault(t),this.hideDropdown();break;case 13:t.preventDefault(t),this.$paxInput.focus()}},t}();e.default=p},function(t,e){t.exports='<div class="select-passengers" id="select-passengers">\r\n    <div class="arrow-up"></div>\r\n    <div id="adult-children">\r\n        <div class="inner-wrap radius-4"> \r\n            <ul class="passengers-list" role="presentation">                \r\n                \r\n                \r\n            </ul>\r\n        </div>\r\n        <p class="pad-l-10 notify-pax" id="group-booking"><span data-i18n="makeGroupBooking">More than 9 passengers? Make a </span> <a href="javascript:;" id="groupChildLink" target="_blank"  class="font-12" aria-label="press enter to go for gropu booking" data-i18n="makeGroupBooking.linkText" tabindex="-1">group booking</a></p>\r\n        <span class="sr-only" id="sr-dummyel-pax" tabindex="-1"></span>\r\n        \x3c!--<p class="pad-l-10" id="child-travel-alone"><span data-i18n="childTravellingAlone">Booking a child travelling alone?</span> <a href="javascript:;" tabindex="0" class="font-12" data-i18n="bookHere">Book here</a></p>\r\n        <p class="pad-l-10" id="infant-per-adult"><span data-i18n="infantPerAdult">It\'s not possible to book more than one infant ticket per adult</span></p>--\x3e\r\n    </div>\r\n</div>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function t(t){this.paxTypes=t,this.translation=i.default.getInstance(),this.init()}return t.prototype.init=function(){var t=this;this.passenger=""+this.paxTypes.map(function(e,n){return'<li id="'+e.name+'" tabindex="0" aria-describedby="totalCount'+e.name+'" role="menuitem">\n                <div class="category pull-left" id="cepTypPax'+e.name+'"  role="presentation" aria-hidden="true" tabindex="-1">\n                '+("Child"===e.name?""+t.t("cep.passengers.children"):""+t.t("cep.passengers."+e.name.toLowerCase()+"s"))+'\n                    <span class="text-grey-3 font-13">\n                        '+t.t("cep.passengers."+e.name.toLowerCase()+".age")+'\n                    </span>\n                </div>\n                <div class="count">\n                    <a role="presentation" aria-hidden="true" href="javascript:;" id="cepRemove'+e.name+'"\n                    class="icon-decrease pull-left '+(e.preSelected===e.minPax?"disabled":"")+'"\n                    tabindex="-1"><span class="displayNone">icon</span> </a>\n                    <span role="presentation" aria-hidden="true" tabindex="-1" class="selected-count" id="cep'+e.name+'PaxCount" >'+e.preSelected+'</span>\n                    <a role="presentation" aria-hidden="true" href="javascript:;" id="cepAdd'+e.name+'"\n                    class="icon-increase pull-right '+(e.preSelected===e.maxPax?"disabled":"")+'"\n                    tabindex="-1"> <span class="displayNone">icon</span></a>\n                </div>\n                <span id="totalCount'+e.name+'" class="sr-only" aria-hidden=\'false\'></span>\n            </li>\n            '+("Youth"===e.name?'</ul>\n                <ul>\n                <li id="book-youth" class="book-youth">\n                <a href="javascript:;" tabindex="0"  id="youthPaxLink" aria-describedby="sr-youthlink-text" aria-label="'+t.t("cep.readerText.youthlink")+'">\n                '+t.t("cep.passengers."+e.name.toLowerCase())+" "+t.t("cep.passengers."+e.name.toLowerCase()+".age")+'\n                </a>\n                <span class="sr-only" id="sr-youthlink-text" aria-label=\''+t.t("cep.readerText.youthText")+'\'></span>\n             </li>\n              <li id="book-youth-warning" class="displayNone book-youth-warning">\n                <div href="javascript:;" tabindex="0">\n                    '+t.t("cep.passengers."+e.name.toLowerCase())+" "+t.t("cep.passengers."+e.name.toLowerCase()+".age")+'\n                </div>\n             </li>\n                    <li class="sr-only">\n                        <a href="javascript:;" target="_blank"  class="font-12"\n                        id="sr-only-grpbooking"\n                        aria-label="'+t.t("makeGroupBooking.linkText")+'"\n                        tabindex="0"\n                        aria-describedby="sr-grpbooking-desc">\n                            Group booking\n                        </a>\n                        <span id="sr-grpbooking-desc">'+t.t("cep.readerText.grpBookingText")+'</span>\n                    </li>\n                    <li class="sr-only">\n                        <a href="javascript:;" target="_blank"  class="font-12"\n                        id="sr-only-minorbooking"\n                        aria-label="'+t.t("cep.readerText.minorbookinglink")+'"\n                        tabindex="0"\n                        aria-describedby="sr-minorbooking-desc">\n                            Minor booking\n                        </a>\n                        <span id="sr-minorbooking-desc">'+t.t("cep.readerText.newwindow")+"</span>\n                    </li>\n                </ul>":"")+"\n             "+("Adult"===e.name?'<li id="book-adult">\n                <a href="javascript:;" tabindex="0" aria-label="Back to adult & children booking">\n                    '+t.t("cep.passengers.adult")+" & "+t.t("cep.passengers.children")+"\n                    "+t.t("cep.passengers."+e.name.toLowerCase()+".age")+"\n                </a>\n             </li>":"")}).join("")},t.prototype.getPassengerList=function(){return this.passenger},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=function(){function t(t){this.fieldRef=t,this.dataLayerService=new i.default}return t.prototype.toggleAdult=function(t,e,n){var i=this.fieldRef.fieldsView.getDobTFromCep();this.fieldRef.youthCountToBeResetToAdult=0!==t&&i?t:0,this.fieldRef.$outBoundDateField.removeError(),this.fieldRef.$youth.hide(),this.fieldRef.$bookAdult.addClass("displayNone"),this.fieldRef.$adult.show(),this.fieldRef.$child.show(),this.fieldRef.$infant.show(),!0!==n?this.removeClassDisplayNone():this.fieldRef.$bookYouthWarning.removeClass("displayNone"),this.fieldRef.totalCount=0!==this.fieldRef.youthCountToBeResetToAdult?parseInt(this.fieldRef.youthCountToBeResetToAdult,10):1,this.fieldRef.totalCount=0===e?this.fieldRef.totalCount:e,this.fieldRef.adultCount=this.fieldRef.paxTypeConf.Adult.preSelected=this.fieldRef.totalCount,this.fieldRef.childCount=this.fieldRef.paxTypeConf.Child.preSelected=0,this.fieldRef.infantCount=this.fieldRef.paxTypeConf.Infant.preSelected=0,this.fieldRef.youthCount=this.fieldRef.paxTypeConf.Youth.preSelected=0,this.updateHtmlOnToggling("adultToggle"),this.fieldRef.$paxField.removeError(),this.fieldRef.updatePaxField(),this.fieldRef.$adultPreSelected.text(this.fieldRef.paxTypeConf.Adult.preSelected.toString()),this.callValidateApi()},t.prototype.toggleYouth=function(t,e){var n=this;"paxField"!==e&&$("#sr-dummyel-pax").focus(),this.fieldRef.$youth.show(),this.fieldRef.$bookAdult.removeClass("displayNone"),this.fieldRef.$adult.hide(),this.fieldRef.$child.hide(),this.fieldRef.$infant.hide(),this.addClassDisplayNone(t),this.fieldRef.$bookYouthWarning.addClass("displayNone"),this.fieldRef.adultCount=this.fieldRef.paxTypeConf.Adult.preSelected=0,this.fieldRef.childCount=this.fieldRef.paxTypeConf.Child.preSelected=0,this.fieldRef.infantCount=this.fieldRef.paxTypeConf.Infant.preSelected=0,this.fieldRef.youthCount=this.fieldRef.paxTypeConf.Youth.preSelected=this.fieldRef.totalCount=t>0?t:1,this.updateHtmlOnToggling("youthToggle");var i=this.fieldRef.fieldsView.calendarSetView.$outboundInput.attr("data-date");this.fieldRef.$paxField.removeError(),this.fieldRef.updatePaxField(),this.fieldRef.$youthPreSelected.text(this.fieldRef.paxTypeConf.Youth.preSelected.toString()),this.fieldRef.fieldsView.calendarSetView.checkDateForLoggedinPassenges("start-date",i),"paxField"!==e&&($("#sr-dummyel-pax").html(this.fieldRef.youthCount+this.fieldRef.srYouthCount+" Youth allowed age 12-25 years press right arrow key or plus numeric key to add Youth passenger and left arrow key or minus numeric key to remove Youth passenger"),setTimeout(function(){n.fieldRef.$youth.focus()},200)),this.callValidateApi()},t.prototype.resetYouthForPointsFlow=function(){this.addClassDisplayNone(this.fieldRef.youthCount);var t=this.fieldRef.$paxInput.val(),e=parseInt(t.split(" ")[0],10);this.fieldRef.$bookYouth.hasClass("displayNone")&&this.fieldRef.youthCount>0&&this.toggleAdult(0,e,!0)},t.prototype.setYouthForRevenueFlow=function(){this.removeClassDisplayNone()},t.prototype.removeClassDisplayNone=function(){this.fieldRef.$bookYouth.removeClass("displayNone"),this.fieldRef.$bookYouthWarning.addClass("displayNone")},t.prototype.addClassDisplayNone=function(t){this.fieldRef.$bookYouth.addClass("displayNone"),t>0||this.fieldRef.$bookYouthWarning.removeClass("displayNone")},t.prototype.callValidateApi=function(){this.fieldRef.fieldsView.onDFieldView.validateOnD(this.fieldRef.fieldsView.onDFieldView.$ondFields.$destination)},t.prototype.checkItisYouthOrNot=function(){var t,e=this.fieldRef.$paxInput.val(),n=e.split(" ")[1].toLowerCase(),i=this.fieldRef.t("cep.passengers.youth").toLowerCase(),r=this.fieldRef.t("cep.passengers.youths").toLowerCase(),a=-1!==n.indexOf(i)||-1!==n.indexOf(r);return a&&(t=e.split(" ")[0]),{flagForCheckYouth:a,youthCount:t}},t.prototype.updateHtmlOnToggling=function(t){this.fieldRef.$notifyPax.find("a").attr("href",this.fieldRef.t("cep.groupBookingRedirectionUrl."+this.fieldRef.config.market)),this.fieldRef.$notifyPax.find("a").html(this.fieldRef.t("makeGroupBooking.linkText")),this.fieldRef.$notifyPax.find("a").attr("aria-label","press enter to group book"),this.fieldRef.$notifyPax.find("span").html(this.fieldRef.t("makeGroupBooking")),$("#"+this.fieldRef.paxTypeConf.Youth.name+" .selected-count").html(this.fieldRef.youthCount.toString()),$("#"+this.fieldRef.paxTypeConf.Adult.name+" .selected-count").html(this.fieldRef.adultCount.toString()),$("#"+this.fieldRef.paxTypeConf.Child.name+" .selected-count").html(this.fieldRef.childCount.toString()),$("#"+this.fieldRef.paxTypeConf.Infant.name+" .selected-count").html(this.fieldRef.infantCount.toString()),"adultToggle"===t&&(this.dataLayerService.GTMtrackInteraction("CEP","Passengers","Switch to Adult booking"),this.fieldRef.enable(this.fieldRef.$decreasePaxForAdult),this.fieldRef.enable(this.fieldRef.$increasePaxForAdult),this.fieldRef.enable(this.fieldRef.$increasePaxForChild),this.fieldRef.disable(this.fieldRef.$decreasePaxForChild),this.fieldRef.enable(this.fieldRef.$increasePaxForInfant),this.fieldRef.disable(this.fieldRef.$decreasePaxForInfant)),"youthToggle"===t&&(this.dataLayerService.GTMtrackInteraction("CEP","Passengers","Switch to Youth booking"),this.fieldRef.enable(this.fieldRef.$decreasePaxForYouth),this.fieldRef.enable(this.fieldRef.$increasePaxForYouth))},t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(92),a=n(13),o=n(9),s=function(){function t(t,e){this.config=t,this.cepDetails=e,this.dataLayerService=new i.default,this.init()}return t.prototype.init=function(){this.config.getFlightOffers&&this.getFlightOffers(),this.config.searchCallback&&this.config.searchCallback(this.cepDetails)},t.prototype.getFlightOffers=function(){o.default.setItem("saslogoClickConf","false"),this.dataLayerService.GTMtrackInteraction("CEP","Select Ticket Type","Flights");var t,e="";e+=this.cepDetails.tripType+"_"+this.cepDetails.origin.iata.airport+"-"+this.cepDetails.destination.iata.airport+"-",e+=this.cepDetails.outDate.replace(/-/g,""),e+=this.cepDetails.returnFrom&&"OJ"===this.cepDetails.tripType?"_"+this.cepDetails.returnFrom.iata.airport+"-"+this.cepDetails.origin.iata.airport:"",e+=this.cepDetails.inDate&&"OW"!==this.cepDetails.tripType?"-"+this.cepDetails.inDate.replace(/-/g,"")+"_":"_",e+="a"+this.cepDetails.pax.adt,e+="c"+this.cepDetails.pax.chd,e+="i"+this.cepDetails.pax.inf,e+="y"+this.cepDetails.pax.yth,t={search:e,view:this.cepDetails.view,bookingFlow:this.cepDetails.bookingFlow};var n=e+="_"+this.cepDetails.bookingFlow,i="?"+$.param({search:n});a.default.setSearchCookie(n),history.pushState({search:i},"",i);var s="?"+$.param(t),d="/book/flights"+s;if("revenue"===this.cepDetails.bookingFlow)window.location.href=d;else{new r.default(this.config,d,this.cepDetails).show()}this.dataLayerService.dataLayerTicketSearch(this.cepDetails)},t}();e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=n(93),a=function(){function t(t,e,n){this.config=t,this.upsellUrl=e,this.cepDetails=n,this.translation=i.default.getInstance()}return t.prototype.show=function(){var t=this;this.$overlay=$("#overlay"),this.$overlay.html(r),this.translation.applyTranslation(this.$overlay),this.getOverlayContent(),this.$overlay.css("display","block"),this.$overlay.find("#selectsar").click(function(e){return t.pointsClicked(e)}),this.$overlay.find("#close").click(function(e){return t.closeOverlay(e)}),this.$overlay.find("#vbr-btn").click(function(e){return t.vbr(t.cepDetails)})},t.prototype.pointsClicked=function(t){window.location.href=this.upsellUrl},t.prototype.vbr=function(t){if("OW"===t.tripType){var e=this.t("vbr.redirection.OW."+this.config.market).split("?"),n=e[2].replace("{1}",t.origin.iata.airport).replace("{2}",t.destination.iata.airport).replace("{3}",t.outDate).replace("{4}",t.pax.adt).replace("{5}",t.pax.chd).replace("{6}",t.pax.inf).replace("{7}",t.pax.yth).replace("{8}",this.config.lang).replace("{9}",this.config.market),i=encodeURIComponent(n),r=e[0]+"?"+e[1]+"?"+i;window.open(r)}else if("RT"===t.tripType){var e=this.t("vbr.redirection.RT."+this.config.market).split("?"),a=e[2].replace("{1}",t.origin.iata.airport).replace("{2}",t.destination.iata.airport).replace("{3}",t.outDate).replace("{4}",t.inDate).replace("{5}",t.pax.adt).replace("{6}",t.pax.chd).replace("{7}",t.pax.inf).replace("{8}",t.pax.yth).replace("{9}",this.config.lang).replace("{10}",this.config.market),i=encodeURIComponent(a),r=e[0]+"?"+e[1]+"?"+i;window.open(r)}else{var e=this.t("vbr.redirection.OJ."+this.config.market).split("?"),o=e[2].replace("{1}",t.origin.iata.airport).replace("{2}",t.destination.iata.airport).replace("{3}",t.returnFrom.iata.airport).replace("{4}",t.outDate).replace("{5}",t.inDate).replace("{6}",t.pax.adt).replace("{7}",t.pax.chd).replace("{8}",t.pax.inf).replace("{9}",t.pax.yth).replace("{10}",this.config.lang).replace("{11}",this.config.market),i=encodeURIComponent(o),r=e[0]+"?"+e[1]+"?"+i;window.open(r)}},t.prototype.getOverlayContent=function(){var t=this.t("home.sarContentUrl").split("|"),e="";$(t).each(function(t,n){e+="<li>"+n+"</li>"}),$("#sar ul").html(e);var n=this.t("home.vbrContentUrl").split("|"),i="";$(n).each(function(t,e){i+="<li>"+e+"</li>"}),$("#vbr ul").html(i);var r=this.t("home.ebdisclaimerContentUrl").split("|"),a="";$(r).each(function(t,e){a+="<li>"+e+"</li>"}),$("#disclaimer ul").html(a)},t.prototype.closeOverlay=function(t){this.$overlay.css("display","none")},t.prototype.t=function(t){return this.translation.t(t)},t}();e.default=a},function(t,e){t.exports='<a href="javascript:void(0)" tabindex="0" role="link" data-modal-open="modal-5">Pay with</a>\r\n\r\n<div class="modal" data-modal="modal-5" style="display: block;">\r\n\r\n<div class="wrapper pay-with-main">\r\n<div class="modal-body">\r\n<header>\r\n     <h3 class="main-head" data-i18n="vbrinterstitial.payWith"></h3>        \r\n     <button type="button" class="modal-close" data-modal-close="modal-5" id="close">×</button>\r\n</header>\r\n\r\n<div class="modal-content">\r\n<div class="pay-with">\r\n            <div class="pay-with-row" >\r\n                <div class="large-3 small-12 medium-3 col">\r\n                    <h2 data-i18n="vbrinterstitial.points"></h2>\r\n                    <p data-i18n="vbrinterstitial.bestPrice"></p>\r\n                </div>\r\n                <div class="large-9 small-12 medium-9 col" id="sar">\r\n                    <ul></ul>\r\n                </div>\r\n                <div class="sar-btn-wrap"><a href="javascript:void(0)" class="sar-btn" id="selectsar" >SELECT <span class="icon-sar-select"></span></a></div>\r\n            </div>\r\n            \r\n            <div class="pay-with-row">\r\n                <div class="large-3 small-12 medium-3 col">\r\n                    <h2 data-i18n="vbrinterstitial.pointsMoney"></h2>\r\n                    <p  data-i18n="vbrinterstitial.bestAvailability"></p>\r\n                </div>\r\n                <div class="large-9 small-12 medium-9 col" id="vbr">\r\n                     <ul></ul>\r\n                </div>\r\n                \r\n                <div class="sar-btn-wrap"><a href="javascript:void(0)" class="sar-btn" id="vbr-btn">SELECT<span class="icon-sar-select"></span></a></div>\r\n                \r\n            </div>\r\n            \r\n            <div class="pay-with-footer clear" id="disclaimer"> \r\n                 <ul></ul>\r\n            </div>\r\n</div> \r\n      \r\n      \r\n</div>\r\n</div>  \r\n</div>\r\n\r\n'}])});
var cep;
if($("#standalone-cep").length){

    $(document).find(".cms-wrapper.cms-infopage-wrapper").addClass("standalone-cep-page-wrapper");

    var cepObj = $("#standalone-cep");
    var predefinedParams = {
        bookingFlow:cepObj.attr("data-bookingFlow") || null,
        itineraryParams:[
        	cepObj.attr("data-origin") || null,
        	cepObj.attr("data-destination")
        ],
        lpcView:cepObj.attr("data-showlpc") || false,
        tripType:cepObj.attr("data-tripType") || null
	};
                          
	getTranslations(getLanguageCookie())
            .then( function (translation) {
			cep = new Cep('#standalone-cep', {
            lang: getLanguageCookie(),
            market: getCountryCookie(),
            defaultTravelerType:cepObj.attr("data-travelerType"),
            urlParams: predefinedParams,
   			translations: translation,
            getFlightOffers: true
        });

	});
}

function getTranslations(lang) {
    if (window.location.host.indexOf('localhost') > -1 || window.location.host.indexOf('127.0.0.1') > -1) {
        return $.getJSON('https://st2.flysas.com/translations/sasui-homepage/homepage_' + lang + '.json');
    } else {
        return $.getJSON('/translations/sasui-homepage/homepage_' + lang + '.json');
    }
}





var linkpath;
var topnav;


$( document ).ready(function(){


        $( "#header-primary-nav ul li" ).each(function() {
            var isEditMode = false;
			var authoringMode = get_cookie('cq-authoring-mode');
			if(authoringMode == 'CLASSIC') {
				if(!(typeof CQ === "undefined")) {
					if(!(typeof CQ.WCM === "undefined")) {
						if (CQ.WCM.isEditMode(true) || CQ.WCM.isDesignMode(true)){
							isEditMode = true;
						}
					}
				}
			} else if(authoringMode == 'TOUCH') {
				if(get_cookie('wcmmode') == "edit") {
					isEditMode = true;
				}
			}
			if (isEditMode){
				//console.log("edit");

				linkpath = $(this).attr("data-linkpath");
				topnav = $(this).attr("data-topnav");
				//topnav= topnav + '.html';


				if(linkpath	===	topnav){

					$(this).addClass('active');
				   
			
				}
			}
			
			else {
				//console.log("pulish");
				linkpath = $(this).attr("data-linkpath");
				topnav = $(this).attr("data-topnav");
				
				topnav= topnav.split('/');
				topnav= topnav[topnav.length-2];
				topnav= topnav + '.html';

				linkpath = linkpath.substring(linkpath.lastIndexOf('/')+1);
				
				if(linkpath	===	topnav){

					$(this).addClass('active');
				   

				}

			}


		});


});
