var getScript = function (source, callback) {
	var script = document.createElement('script');
	var prior = document.getElementsByTagName('script')[0];
	script.async = 1;

	script.onload = script.onreadystatechange = function (_, isAbort) {
		if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
			script.onload = script.onreadystatechange = null;
			script = undefined;

			if (!isAbort) {
				if (callback) callback();
			}
		}
	};

	script.src = source;
	prior.parentNode.insertBefore(script, prior);
};
window.CVVA = window.CVVA || {};
window.CVVA.model = window.CVVA.model || {};
window.CVVA.initStarts = new Date();
window.CVVA.commitInfo = JSON.parse('{"hash":"889293de78684dc4a347d6e03c3c22a36fa9e6bd","subject":"ETV survey names lookup.","body":"","author":{"name":"Moshe Villaizan","email":"moshe.villaizan@creativevirtual.com"},"notes":"master","branch":"","tags":[]}');
window.CVVA.businessName = "businessName:NYT";
window.CVVA.versionNumber = "versionNumber:1.5.8";
window.CVVA.events = {
	makeRequest: function (data) {},
	loaded: function (data) {},
	bind: function (event, callback) {
		if (event === 'makeRequest') {
			this.makeRequest = callback;
		} else if (event === 'loaded') {
			this.loaded = callback;
		}
	}
};
window.CVVA.methods = {
	switchBA: function (newBA) {},
	sendEscalationData: function(data){}
};
window.triggerInitialize = setInterval(function(){
	if(document.readyState === 'complete'){
		clearInterval(window.triggerInitialize);
		if (window.cvVASettings === undefined) {
			window.cvVASettings = {};
		}
		var initializeCVVA = function () {
			var libEndpoint = window.cvVASettings.libEndpoint || location.protocol + '//' + location.host + '/';
			var engineEndpoint = window.cvVASettings.endpoint || location.protocol + '//' + location.host + '/proxy';
			getScript(libEndpoint + 'js/require.js', function () {
				define('settings', [], function () {
					var localCVVASettings = {
						businessName: window.cvVASettings.businessName || '',
						iframe: window.cvVASettings.iframe || false,
						iframeEvents: window.cvVASettings.iframeEvents || false,
						request_method: window.cvVASettings.request_method || 'POST',
						endpoint: window.cvVASettings.endpoint || engineEndpoint,
						libEndpoint: window.cvVASettings.libEndpoint || libEndpoint,
						development: window.cvVASettings.development || true,
						plugins: window.cvVASettings.plugins || [],
						modalHeader: window.cvVASettings.modalHeader || {
							backgroundColor: '#FFFFFF',
							secondBackgroundColor: '#FFFFFF',
							color: '#31B0D5',
							height: '99px',
							title: {
								disabled: false,
								text: 'Virtual Assistant',
							},
							logo: {
								borderRadius: '0px',
								width: '40px',
								enabled: false,
								name: ''
							},
							extralogo: {
								width: '40px',
								enabled: false,
								name: ''
							},
							minimizedLogo: {
								width: '40px',
								enabled: false,
								name: '',
								CSS: {
									top: '15px',
									left: '20px'
								}
							},
							mobile: {
								height: '70px'
							},
							btnIcons: {
								close: 'fa-times',
								minimize: 'fa-minus',
								maximize: 'fa-clone'
							}
						},
						trigger: window.cvVASettings.trigger || '.cv-va-opener',
						businessArea: window.cvVASettings.businessArea || 'Root.NewUI',
						channel: window.cvVASettings.channel || '',
						defaultPlaceholderText: window.cvVASettings.defaultPlaceholderText || '',
						placeholderSuggestions: window.cvVASettings.placeholderSuggestions || ['Type your question here...', 'Instant answers...'],
						livechatOfferETV: window.cvVASettings.livechatOfferETV || 'livechatrequested',
						mainColor: window.cvVASettings.mainColor || '#31B0D5',
						userBubbleBackgroundColor: window.cvVASettings.userBubbleBackgroundColor || '#E2F4FD',
						vaPillFontColor: window.cvVASettings.vaPillFontColor || '#000000',
						vaInputPillBackgroundColor: window.cvVASettings.vaInputPillBackgroundColor || '#FFD155',
						vaInputPillFontColor: window.cvVASettings.vaInputPillFontColor || '#000000',
						vaShim: window.cvVASettings.vaShim || false,
						minimizedContainerWidth: window.cvVASettings.minimizedContainerWidth || '325px',
						firstIcsBtnBkgColor: window.cvVASettings.firstIcsBtnBkgColor || '#4CAE4C',
						secondIcsBtnBkgColor: window.cvVASettings.secondIcsBtnBkgColor || '#D9534F',
						thirdIcsBtnBkgColor: window.cvVASettings.thirdIcsBtnBkgColor || '#F0AD4E',
						firstIcsBtnFontColor: window.cvVASettings.firstIcsBtnFontColor || '#FFFFFF',
						secondIcsBtnFontColor: window.cvVASettings.secondIcsBtnFontColor || '#FFFFFF',
						thirdIcsBtnFontColor: window.cvVASettings.thirdIcsBtnFontColor || '#FFFFFF',
						placeHolderRotationTicks: window.cvVASettings.placeHolderRotationTicks || 0,
						inputHeight: window.cvVASettings.inputHeight || '65px',
						inputFontSize: window.cvVASettings.inputFontSize || '25px',
						useImageButton: window.cvVASettings.useImageButton || false,
						imageButtonText: window.cvVASettings.imageButtonText || '',
						inputPillFontStyle: window.cvVASettings.inputPillFontStyle || 'normal',
						vaCaption: window.cvVASettings.vaCaption || {
							enabled: true,
							text: 'Virtual Agent is typing',
							type: 'normal'
						},
						printIconOption: window.cvVASettings.printIconOption || false,
						cvFooter: window.cvVASettings.cvFooter || false,
						icsStyle: window.cvVASettings.icsStyle || 'default',
						vaChatView: window.cvVASettings.vaChatView || 'default',
						vaBubbleBackgroundColor: window.cvVASettings.vaBubbleBackgroundColor || '#E2F4FD',
						vaBubbleFontColor: window.cvVASettings.vaBubbleFontColor || '#000000',
						userInputFontWeight: window.cvVASettings.userInputFontWeight || 'normal',
						useImageDisabledButton: window.cvVASettings.useImageDisabledButton || false,
						imageDisabledButtonText: window.cvVASettings.imageDisabledButtonText || '',
						vaLcTabs: window.cvVASettings.vaLcTabs || false,
						inputBorderRadius: window.cvVASettings.inputBorderRadius || '5px',
						semanticTextAlignRight: window.cvVASettings.semanticTextAlignRight || false,
						connectorsFontColor: window.cvVASettings.connectorsFontColor || '#000000',
						connectorsBackgroundColor: window.cvVASettings.connectorsBackgroundColor || '#E6E7E8',
						connectorsHoverFontColor: window.cvVASettings.connectorsHoverFontColor || '#000000',
						connectorsHoverBackgroundColor: window.cvVASettings.connectorsHoverBackgroundColor || '#f5f5f5',
						connectorBorder: window.cvVASettings.connectorBorder || {
							borderWidth: '0 0 1px 0',
							borderStyle: 'solid',
							borderColor: '#f9f9f9'
						},
						connectorLastChildBorderBottomWidth: window.cvVASettings.connectorLastChildBorderBottomWidth || '0px',
						backlinkBorderWidth: window.cvVASettings.backlinkBorderWidth || '1px 0 0 0',
						lcTimeStamp: window.cvVASettings.lcTimeStamp || false,
						persistenceEnabled: window.cvVASettings.persistenceEnabled || false,
						persistenceTimeout: window.cvVASettings.persistenceTimeout || 600000, // 300000 = 5 minutes
						cvDisclaimer: window.cvVASettings.cvDisclaimer || false,
						tabsActiveBorderBottomColor: window.cvVASettings.tabsActiveBorderBottomColor || '#F3565D',
						tabsHoverBorderBottomColor: window.cvVASettings.tabsHoverBorderBottomColor || '#FBCDCF',
						virtualAgentName: window.cvVASettings.virtualAgentName || 'Virtual Agent',
						livechatVendor: window.cvVASettings.livechatVendor || 'creative virtual',
						creativeVirtual: window.cvVASettings.creativeVirtual || 'http://cvusalivechat.creativevirtual15.com:80/livechat/userChat.html',
						liveperson: window.cvVASettings.liveperson || {
							accountNumber: '',
							APIKey: '',
							domain: '',
							leTag: {
								enabled: false,
								showLauncher: true,
								injectOnLauncher: false,
								closeVAOnLaunch: false,
								loadedOnHost: false,
								engagementButtons: [],
								leTagPrependEngagements: [],
								lpEngagementIdETV: ''
							},
							monitoring: false,
							unavailableMessage: '%3Cdiv%3EI%20am%20unable%20to%20connect%20you%20to%20a%20live%20agent%20at%20this%20time.%3C%2Fdiv%3E',
							surveys: {
								pcsEnabled: false,
								exitSurveysEnabled: false,
								offlineSurveysEnabled: false,
								submittedSurveyMsg: 'Thank you for your feedback.'
							},
							removeLPengagements: false,
							removeLPengagementExceptions: [],
							cursorAtEndOnFocus: false
						},
						genesys: window.cvVASettings.genesys || {
							hashingEndpoint: window.location.protocol + '://' + window.location.hostname + '/'
						},
						launcherInjection: window.cvVASettings.launcherInjection || false,
						selectiveLauncherInjection: window.cvVASettings.selectiveLauncherInjection || {
							enabled: false,
							url: []
						},
						appendLauncherTo: window.cvVASettings.appendLauncherTo || 'body',
						lcAvailabilityLauncher: window.cvVASettings.lcAvailabilityLauncher || false,
						availabiltyInterval: window.cvVASettings.availabiltyInterval || 1000,
						launcherText: window.cvVASettings.launcherText || 'Open Virtual Assistant',
						enableProactiveEndSession: window.cvVASettings.enableProactiveEndSession || false,
						proactiveEndSessionWaitTime: window.cvVASettings.proactiveEndSessionWaitTime || 10000,
						proactiveEndSessionCommand: window.cvVASettings.proactiveEndSessionCommand || 'autosubmission',
		
						launcherCSS: window.cvVASettings.launcherCSS || {
							backgroundColor: '#4CAF50',
							color: '#FFFFFF',
							fontSize: '9px',
							borderRadius: '0px',
							width: '72px',
							top: '50%',
							bottom: 'auto',
							right: 'auto',
							left: '0',
							before: false,
							displayChildren: 'initial',
							height: 'initial'
						},
						customLaunchers: window.cvVASettings.customLaunchers || [],
						vaHyperLinkCSS: window.cvVASettings.vaHyperLinkCSS || {
							color: '#337ab7',
							textDecoration: 'none'
						},
						selectiveInjection: window.cvVASettings.selectiveInjection || {
							enabled: false,
							variable: null,
							url: [],
							device: {
								desktop: true,
								mobile: true
							}
						},
						bubbleInit: window.cvVASettings.bubbleInit || false,
						anchoredContainer: window.cvVASettings.anchoredContainer || {
							enabled: false,
							position: 'bottom-right',
							disabledResizeHandler: false,
							expandHeight: false
						},
						semanticAppendBotAnswer: window.cvVASettings.semanticAppendBotAnswer || true,
						useLegacyAC: window.cvVASettings.useLegacyAC || false,
						shrunkenUI: window.cvVASettings.shrunkenUI || false,
						fontfamily: window.cvVASettings.fontfamily || "sans-serif",
						headerBorderBottom: window.cvVASettings.headerBorderBottom || "1px solid #e5e5e5",
						userBubbleCSS: window.cvVASettings.userBubbleCSS || {
							borderRadius: '5px'
						},
						vaBubbleCSS: window.cvVASettings.vaBubbleCSS || {
							borderRadius: '5px'
						},
						tabHeaderHeight: window.cvVASettings.tabHeaderHeight || '77px',
						avatar: window.cvVASettings.avatar || false,
						vaTypingFontSize: window.cvVASettings.vaTypingFontSize || '12px',
						faqTab: window.cvVASettings.faqTab || false,
						textResize: window.cvVASettings.textResize || false,
						placeholderTimeoutMilliseconds: window.cvVASettings.placeholderTimeoutMilliseconds || Math.round(Math.random() * (100 - 30)) + 10,
						cvLCbtn: window.cvVASettings.cvLCbtn || {
							enabled: false,
							text: '',
							request: ''
						},
						placeHolderRotationResetMilliseconds: window.cvVASettings.placeHolderRotationResetMilliseconds || 10000,
						libEndpointDomain: window.cvVASettings.libEndpointDomain || '',
						terminateVASession: window.cvVASettings.terminateVASession || false,
						lcMinimizedLogo: window.cvVASettings.lcMinimizedLogo || '',
						eocs: window.cvVASettings.eocs || {
							header_text: '',
							questions: [{
								text: '',
								input_name: '',
								type: '',
								rating_labels: ''
							}],
							textarea_label: '',
							submit_btn_text: '',
							postEOCSMessage: ''
						},
						submitBtn: window.cvVASettings.submitBtn || {
							border: '',
							borderWidth: '',
							color: '#fff',
							fontSize: '18px',
							text: 'Send Your Question',
							backgroundColor: '#31B0D5',
							fontWeight: 'normal',
							fontAwesome: '',
							interactionText: 'Ask Another Question',
							focus: {
								color: '#fff',
								backgroundColor: '#5ead3e'
							},
							disabled: {
								color: '#fff',
								backgroundColor: '#31B0D5',
								opacity: false
							},
							embedded: {
								enabled: false,
								width: '127px'
							},
							mobile: {
								width: '309px',
							},
							height: '35px'
						},
						minimizedContentMobile: window.cvVASettings.minimizedContentMobile || {
							height: '40px',
							width: '90px',
							top: 'auto',
							bottom: '20px',
							left: 'auto',
							right: '20px',
							fontAwesome: 'fa-comments',
							addShim: true,
							borderRadius: '25px',
							text: 'Chat',
							backgroundColor: '#000',
							color: '#fff'
						},
						fullScreen: window.cvVASettings.fullScreen || {
							enabled: false
						},
						disableBtn: window.cvVASettings.disableBtn || {
							close: false,
							minimize: false,
							fullscreen: false
						},
						popup: window.cvVASettings.popup || false,
						ariaLabel: window.cvVASettings.ariaLabel || {
							btnGroup: 'Close and Minimize Buttons',
							closeBtn: 'Close Virtual Assistant',
							minimizedBtn: 'Minimize Virtual Assistant',
							fullScreenBtn: 'Full Screen',
							printBtn: 'Print',
							userEntry: 'Type a question, then press ENTER.',
							submitBtn: 'Send Your Question',
							fontSizeBtn: {
								small: 'Small Font Size',
								medium: 'Medium Font Size',
								large: 'Large Font Size'
							},
							maximizeBtn: 'Virtual Assistant Default Size',
							resizeHandlerBtn: 'Resizable Handler',
							eocsRatingStarNum: ' out of ',
							acNoResultsMsg: 'No search results.',
							acResultsPlural: ' results are',
							acResultSingular: ' result is',
							acAvailableResultsNav: ' available, use up and down arrow keys to navigate.',
							cvLCiframeTitle: 'Live Chat'
						},
						desktopAnchoredMinimizedContainer: window.cvVASettings.desktopAnchoredMinimizedContainer || {
							axis: 'x',
							disabled: false,
							left: '',
							right: ''
						},
						focusInputOnOpen: window.cvVASettings.focusInputOnOpen || false,
						proactiveEndOnLastKeystroke: window.cvVASettings.proactiveEndOnLastKeystroke || false,
						placeholderSuggestionOptions: window.cvVASettings.placeholderSuggestionOptions || {
							disable: false,
							collectionLength: 0 
						},
						modalFooter: window.cvVASettings.modalFooter || {
							backgroundColor: '#fff',
							borderRadius: '0 0 6px 6px'
						},
						chatHistoryDiv: window.cvVASettings.chatHistoryDiv || {
							fontSize: '14px',
							backgroundColor: '#fff'
						},
						initMessage: window.cvVASettings.initMessage || {
							backgroundColor: '#ccc',
							borderRadius: '5px',
							margin: '0 45px 0 0',
							padding: '6px 12px',
							border: '1px solid #F0F0F0',
							boxShadow: '0px 0px 1px 1px #F0F0F0',
							borderBottomColor: '#ccc',
							borderTop: 'none',
							keepInChatHistory: false
						},
						modalContent: window.cvVASettings.modalContent || {
							border: '1px solid rgba(0, 0, 0, 0.2)',
							boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
							borderRadius: '6px',
							borderTop: '1px solid rgba(0, 0, 0, 0.2)'
						},
						logEndpoint: window.cvVASettings.logEndpoint || libEndpoint,
						inputLauncher: window.cvVASettings.inputLauncher || {
							enabled: false,
							selectiveInjection: {
								enabled: false,
								url: []
							},
							appendTo: 'body',
							headerText: 'Ask Virtual Assistant ',
							headerFontAwesome: 'fa fa-comments',
							inputPlaceholder: 'For instant answers type your question here...',
							submitBtnText: 'Send',
							submitBtnFontawesome: 'fa fa-paper-plane',
							css: {
								container: {
									backgroundColor: '#f5f5f5',
									border: '1px solid #ccc',
									padding: '12px'
								},
								header:  {
									backgroundColor: 'transparent',
									border: 'none',
									padding: '0 0 5px 4px;'
								},
								body: {
									backgroundColor: 'transparent',
									border: 'none',
									padding: '0'
								}
							}
						},
						flushVAonClose: window.cvVASettings.flushVAonClose || false,
						input: window.cvVASettings.input || {
							maxlength: '',
							counter: {
								enable: false,
								// css: {
								// 	color: '#000',
								// 	fontSize: '13px',
								// }
							}
						}
					};
					return localCVVASettings;
				});
				require([libEndpoint + 'js/app.js']);
			});
		};
		var leTagPrependEngagements = function () {
			if (window.cvVASettings.liveperson !== undefined) {
				if (window.cvVASettings.liveperson.leTag.leTagPrependEngagements.length > 0) {
					for (var i = 0; i < window.cvVASettings.liveperson.leTag.leTagPrependEngagements.length; i++) {
						var body = document.getElementsByTagName('body')[0];
						var div = document.createElement("div");
						div.setAttribute('id', window.cvVASettings.liveperson.leTag.leTagPrependEngagements[i]);
						body.appendChild(div);
					}
				}
			}
		};
		if (window.cvVASettings.lookup === 'remote') {
			var a = document.createElement('a');
			a.href = window.cvVASettings.lookupEndpoint;
			window.cvVASettings.libEndpointDomain = a.hostname;
		
			var request = new XMLHttpRequest();
			request.open('GET', window.cvVASettings.lookupEndpoint, true);
			request.withCredentials = true;
			request.onload = function () {
				var resp = JSON.parse(request.responseText);
				if (request.status >= 200 && request.status < 400) {
					if (resp.render === true) {
						window.cvVASettings = resp;
						leTagPrependEngagements();
						if (window.cvVASettings.libEndpoint === undefined || window.cvVASettings.libEndpoint === '') {
							window.cvVASettings.libEndpoint = 'https://vastage1.creativevirtual15.com:6550/';
						}
						initializeCVVA();
					} else {
						window.CVlaunchVA = function () {};
						console.warn('CV VA Disabled');
					}
				}
			};

			request.onerror = function () {
				// There was a connection error of some sort
			};
		
			request.send();
		} else {
			leTagPrependEngagements();
			initializeCVVA();
		}
	}
}, 100);