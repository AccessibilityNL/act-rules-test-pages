var endava = endava || {};

endava.search = function () {
    this.downarrow = 'notpressed';
    this.searchTextBox = jQuery("#search");
    this.searchButton = jQuery("#btnSearch");
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

endava.search.prototype = function () {
    var setup = function () {
        bindControls.call(this);
    },
    bindControls = function () {
        var t = this;

        this.searchButton.bind("click", function () {
            submitSearch.call(t);
        });

        this.searchTextBox.bind("keypress", function (event) {
            submitOnEnter.call(event);
        });
    },

    submitSearch = function () {
        var t = this;
        if (jQuery('#linkSearch').val() == undefined) {
            return false;
        }

        var search = jQuery("#search").val();
        var hint = jQuery("#typeText").val();

        if (!CheckInput.call(t, search, hint)) {
            return false;
        }

        var searchurl;
        if (jQuery('#listCount').val() > 1) {
            searchurl = jQuery('#linkSearch').val() + "?searchText=" + jQuery("#search").val() + "&qs=" + jQuery("#searchcategory").val() + "&catTxt=" + (jQuery('#catTxt').val() != '' ? jQuery('#catTxt').val() : 'All');
        } else {
            searchurl = jQuery('#linkSearch').val() + "?searchText=" + jQuery("#search").val() + "&qs=" + jQuery("#seachCategoryWithoutDropDown").val() + "&catTxt=" + jQuery('#catTxtWithoutDropDown').val();
        }

        location.href = searchurl;
        return true;
    },
    submitOnEnter = function (evt) {
        var evt = this;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == "40") {
            //down arrow pressed - takes care of autocomplete
            evt.returnValue = false;
            evt.cancel = true;
            downarrow = 'pressed';
        }
        if (charCode == "13") {
            submitSearch.call(evt);
            evt.returnValue = false;
            evt.cancel = true;
        }
    },
    CheckInput = function (searchText, typeKeyword) {
        var t = this;
        if (TrimText.call(t, searchText) == TrimText.call(t, typeKeyword) || TrimText.call(t, searchText) == "") {
            return false;
        }
        return true;
    },
    setSearchCategoriesSelectedValue = function () {
        var t = this;
        try {
            var selectedCategory = getParameterByName.call(t, "qs");
            if (selectedCategory == "" || selectedCategory == undefined)
                jQuery("#searchcategory option:first").attr('selected', 'selected');
            else {
                jQuery("#searchcategory").val(selectedCategory);
                jQuery("#catTxt").val(jQuery("#searchcategory option:selected").text());
            }
        } catch (err) {
        }
    },
    getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    },
    TrimText = function (text) {
        text = text.replace(/\r\n/g, '');
        return text.trim();
    };

    return {
        setup: setup
    };
}();

(function () {

    var search = new endava.search();

    search.setup();

})();