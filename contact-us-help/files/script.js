/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
  $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
    $requestCommentFields = $(".request-container .comment-container .comment-fields"),
    $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
    $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
    $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function() {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function(e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });

  /**
   * Finds all paragraphs containing only an image and adds a class (.article-image)
   * to be used as a styling hook. The tagged paragraph may also contain
   * spaces/nbsp characters or other empty tags, but no text.
   *
   * Leaves all other paragraph tags untagged.
   *
   * @param {node} node - The node under scrutiny
   * @param {node} parent - The parent paragraph to be tagged with the class
   * @return {void}
   */
  function tagImageContainers(node, parent) {
    var isElementNode = function(node) { return node.nodeType === 1 };
    var isTextNode = function(node) { return node.nodeType === 3 };
    var isImageNode = function(node) { return node.nodeName === "IMG" };

    var children = [].slice.call(node.childNodes);
    var nestedTags = children.filter(isElementNode);

    var containsText = children.some(function(n) {
      var nbspUnicode = /\u00a0/;
      var hasTextChars = !/^[nbspUnicode\s]*$/.test(n.textContent);
      return isTextNode(n) && hasTextChars;
    });

    if (containsText) {
      $(parent).removeClass('article-image');
      return false;
    }

    // If no images found at this level but there are other nested tags
    // present, check all levels deep for images and/or text.
    // We use .every to ensure there's no text anywhere in this paragraph tree.
    // If so, we fail early and remove the class
    if (nestedTags.length) {
      nestedTags.every(function(el) {
        return tagImageContainers.call(null, el, parent);
      });
      return true;
    }

    if (isImageNode(node) || children.some(isImageNode)) {
      $(parent).addClass('article-image');
      return true;
    }

    return true;
  }

  // Finds all paragraph tags that only contain an image (but no text)
  // and adds a class as a styling hook
  $(".article-body").find("img").closest("p").each(function() {
    var parent = this;
    tagImageContainers.call(null, this, parent);
  });

  // Populate copyright year
  $("#copyrightYear").text(new Date().getFullYear());
});
