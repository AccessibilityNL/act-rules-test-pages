define(['jquery', 'jquery.tabs'], function($, accessibleTabs){
	function AccessibleTabs(){
		var selectedPayScale, tabs;

		tabs = $('.tabs').accessibleTabs({
			tabhead         : '.nav-tabs',
			fx              : 'fadeIn',
			wrapperClass    : 'tab-content',
			currentInfoText : 'Huidige tab',
			autoAnchor      : true
		});


		selectedPayScale = $('#career-steps-filter-form-payscales')
								.find(':radio:checked')
								.data('payscale');

		if (selectedPayScale && $('#leerlijnenschaal' + selectedPayScale).size() > 0) {
			tabs.showAccessibleTabSelector('#leerlijnenschaal' + selectedPayScale);
		}

		if (selectedPayScale && $('#loopbaanstappen' + selectedPayScale).size() > 0) {
			tabs.showAccessibleTabSelector('#loopbaanstappen' + selectedPayScale);
		}
	}

	return AccessibleTabs;
});