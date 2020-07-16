define(['jquery'], function($){
	function Application(){

		showHiddenLinksOnFocus();

		positionFilters();

		resetCareerPathSalaryScale();

		backToPreviousPage();

	}

	function resetCareerPathSalaryScale () {
		var hasPayScale, el;

		hasPayScale = false;

		el = {
			careerStepsFilterFormPayscales     : $('#career-steps-filter-form-payscales'),
			careerStepsFilterFormFunctiongroup : $('#career-steps-filter-form-functiongroup'),
			wrapperLearningpaths               : $('#wrapper-learningpaths'),
			wrapperCareersteps                 : $('#wrapper-careersteps'),
			skipLinks                          : $('#skip-links')
		};

		el.careerStepsFilterFormFunctiongroup
			.find('select')
			.on('change', function () {
				el.careerStepsFilterFormPayscales.hide();
				el.wrapperLearningpaths.hide();
				el.wrapperCareersteps.hide();
				el.skipLinks.hide();
			});

		el.careerStepsFilterFormPayscales
			.find(':radio')
			.on('change', function () {
				el.wrapperLearningpaths.hide();
				el.wrapperCareersteps.hide();
				el.skipLinks.hide();
			});

		el.careerStepsFilterFormPayscales.find(':radio').each(function () {
			if ($(this).is(':checked')) {
				hasPayScale = true;
			}
		});


		if (!hasPayScale) {
			el.wrapperLearningpaths.hide();
			el.wrapperCareersteps.hide();
			el.skipLinks.hide();
		} else {
			el.wrapperLearningpaths.show();
			el.wrapperCareersteps.show();
			el.skipLinks.show();
		}
	}

	function positionFilters () {
		var formHeight, filterTableWrapper, listFilterForm;

		filterTableWrapper = $('.table-filter-wrapper');
		listFilterForm = filterTableWrapper.find('.list-filter-form');
		formHeight = listFilterForm.outerHeight();

		filterTableWrapper.css({
			paddingTop: formHeight
		});
	}

	function showHiddenLinksOnFocus () {
		$('.screenreader-link')
		.on('focus', function () {
			$(this).removeClass('visuallyhidden');
		})
		.on('blur', function () {
			$(this).addClass('visuallyhidden');
		});
	}

	function backToPreviousPage () {
		$('.back-to-previous-page').on('click', function (evt) {
			evt.preventDefault();
			window.history.back();
		});
	}

	return Application;
});