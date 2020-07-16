var hpeuck_locales = ['en-emea_africa','fr-emea_africa','sq-al','ar-dz','fr-dz','pt-ao','es-ar','hy-am','en-asia_pac','en-au','de-at','az-az','bn-bd','ru-by','nl-be','fr-be','es-bo','bs-ba','en-bw','pt-br','bg-bg','en-ca','fr-ca','en-lamerica_nsc_carib','es-lamerica_nsc_cnt_amer','es-cl','zh-cn','es-co','fr-cg','hr-hr','el-cy','cs-cz','da-dk','es-ec','et-ee','en-et','en-emea_europe','fr-emea_europe','de-emea_europe','fe-fg','fi-fi','fr-fr','ge-ge','de-de','en-gh','el-gr','en-hk','zh-hk','hu-hu','is-is','en-in','en-id','en-ie','en-il','he-il','it-it','ja-jp','ru-kz','en-ke','ko-kr','sq-ks','lv-lv','lt-lt','fr-lu','mk-mk','en-my','en-mt','en-mu','es-mx','ar-emea_middle_east','en-emea_middle_east','ro-md','sr-me','ar-ma','fr-ma','pt-mz','nl-nl','en-nz','en-ng','no-no','en-pk','es-py','es-pe','en-ph','pl-pl','pt-pt','es-pr','ro-ro','ru-ru','ar-sa','en-sa','fr-sn','sr-rs','en-sg','sk-sk','sl-si','en-za','es-es','si-lk','sv-se','fr-ch','de-ch','zh-tw','en-tz','sw-tz','en-th','th-th','ar-tn','fr-tn','tr-tr','ru-tm','en-ug','sw-ug','ru-ua','uk-ua','en-ae','en-uk','en-us','es-us','es-uy','es-ve','en-vn','vi-vn'];
var banner_allowedLL = ['en','el','en','fr','de'];
var banner_allowedCC = ['asia_pac','cy','emea_europe','emea_europe','emea_europe'];
var bannerText = new Array();
bannerText[0] = new Array('1111','Strictly necessary cookie','Performance cookie','Functionality cookie','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','Yes','No','Continue','Learn how we use cookies and the benefits of choosing Yes.','<p class="rtxt"><small class="small"><strong>HP websites use cookies to support:</strong><br />- "Remember me", which lets you log in quickly on repeat visits<br />- Saving your previous choices and providing recommendations for HP products &amp; services based on your interests<br />- "Recently viewed", which lists your browsing history and will speed up you search on this site.</small></p><p class="rtxt"><small class="small"><strong>HP &amp; Partners use cookies on other websites to allow:</strong><br />- HP and our partners to deliver advertisements relevant to your interests. These may include popular offers for HP and partner products and services.</small></p>','HP sites use data collection tools like cookies. Please tell us how HP may use these tools:','Anonymous statistical information is also collected to enhance site functionality and performance.','<small class="small">You can change these settings at any time by going to our <a href="http://www8.hp.com/ie/en/privacy/privacy.html"><small class="small">Privacy Statement</small></a>.</small><small class="small"><br />By clicking continue you confirm your understanding and agreement for cookies settings as indicated on left.</small>','Yes','My privacy preferences','SAVE','Your preferences have been saved','Cookies that we capture on HP.com','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','HP websites use data collections tools, such as cookies. Please tell us how HP may use these tools:','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/ie/en/privacy/privacy.html">Privacy Statement</a>.','<strong>HP websites use date collection tools, such as cookies,</strong><br />to personalise your experience, allow HP partners to show HP ads meeting your interests on other websites, and to collect anonymous statistical information to enhance site functionality and performance.','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/ie/en/m/privacy/preferences.do">Privacy Statement</a>.','');

bannerText[1] = new Array('1111','Αυστηρά απαραίτητο cookie','Cookie απόδοσης','Cookie λειτουργίας','Μπορούμε να συλλέγουμε ανώνυμα στατιστικά δεδομένα για τη βελτίωση της λειτουργικότητας και της απόδοσης της τοποθεσίας;','Μπορεί η HP να εξατομικεύσει την εμπειρία σας στις τοποθεσίες web της HP;','Μπορούν η HP και οι συνεργάτες της να προβάλουν διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας σε άλλες τοποθεσίες web;','Ναι','Όχι','Συνέχεια','Μάθετε πώς χρησιμοποιούμε τα cookie και τα πλεονεκτήματα που έχετε επιλέγοντας "Ναι".','<p class="rtxt"><small class="small"><strong>Οι τοποθεσίες web της HP χρησιμοποιούν τα cookie για να υποστηρίξουν τις παρακάτω λειτουργίες:</strong><br />- "Απομνημόνευση", για γρήγορη σύνδεση σε τοποθεσίες που επισκέπτεστε συχνά.<br />- Αποθήκευση των προηγούμενων επιλογών σας και προτάσεις για προϊόντα και υπηρεσίες HP σύμφωνα με τα ενδιαφέροντά σας.<br />- "Πρόσφατες προβολές", για τη δημιουργία λίστας του ιστορικού αναζήτησης και γρηγορότερη αναζήτηση στη συγκεκριμένη τοποθεσία.</small></p><p class="rtxt"><small class="small"><strong>Η HP και οι συνεργάτες της χρησιμοποιούν τα cookie σε άλλες τοποθεσίες web προκειμένου:</strong><br />- Η HP και οι συνεργάτες της να προβάλουν διαφημίσεις βάσει των ενδιαφερόντων σας. Σε αυτές μπορούν να περιλαμβάνονται δημοφιλείς προσφορές προϊόντων και υπηρεσιών της HP και των συνεργατών της.</small></p>','Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie. Πείτε μας με ποιον τρόπο μπορεί η HP να χρησιμοποιεί αυτά τα εργαλεία:','Γίνεται επίσης συλλογή ανώνυμων στατιστικών δεδομένων για τη βελτίωση της λειτουργικότητας και της απόδοσης των τοποθεσιών.','<small>Μπορείτε να αλλάξετε αυτές τις ρυθμίσεις οποιαδήποτε στιγμή μεταβαίνοντας στη <a href="http://www8.hp.com/cy/el/privacy/privacy.html"><small>Δήλωση απορρήτου</small></a>.</small><small><br />Επιλέγοντας "ΣΥΝΕΧΕΙΑ" επιβεβαιώνετε ότι κατανοείτε και συμφωνείτε με τις ρυθμίσεις cookie όπως εμφανίζονται αριστερά.</small>','Yes','Προτιμήσεις ιδιωτικού απορρήτου','ΑΠΟΘΗΚΕΥΣΗ','ΑΠΟΘΗΚΕΥΣΗ OK','Cookie που συλλέγουμε στην τοποθεσία HP.com','Μπορούμε να συλλέγουμε ανώνυμα στατιστικά δεδομένα για τη βελτίωση της λειτουργικότητας και της απόδοσης της τοποθεσίας;','Μπορεί η HP να εξατομικεύσει την εμπειρία σας στις τοποθεσίες web της HP;','Μπορούν η HP και οι συνεργάτες της να προβάλουν διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας σε άλλες τοποθεσίες web;','Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie. Πείτε μας πώς μπορεί η HP να χρησιμοποιήσει αυτά τα εργαλεία:','Κάντε κλικ στο κουμπί "Συνέχεια" για να συναινέσετε στη χρήση των cookie από την HP. Για να αλλάξετε τις προτιμήσεις σας ή να αναιρέσετε τη συγκατάθεσή σας, μεταβείτε στη <a href="http://www8.hp.com/cy/el/privacy/privacy.html">Δήλωση απορρήτου</a>.','<strong>Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie,</strong><br />για εξατομίκευση της εμπειρίας σας, για να μπορούν οι συνεργάτες της HP να προβάλλουν διαφημίσεις της HP που ταιριάζουν στα ενδιαφέροντά σας σε άλλες τοποθεσίες web και για να συλλέγουν ανώνυμες στατιστικές πληροφορίες που βελτιώνουν της λειτουργικότητα και την απόδοση της τοποθεσίας.','Κάντε κλικ στο κουμπί "Συνέχεια" για να συναινέσετε στη χρήση των cookie από την HP. Για να αλλάξετε τις προτιμήσεις σας ή να αναιρέσετε τη συγκατάθεσή σας, μεταβείτε στη <a href="http://www8.hp.com/cy/el/m/privacy/preferences.do">Δήλωση απορρήτου</a>.','');

bannerText[2] = new Array('1111','Strictly necessary cookie','Performance cookie','Functionality cookie','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','Yes','No','Continue','Learn how we use cookies and the benefits of choosing Yes.','<p class="rtxt"><small class="small"><strong>HP websites use cookies to support:</strong><br />- "Remember me", which lets you log in quickly on repeat visits<br />- Saving your previous choices and providing recommendations for HP products &amp; services based on your interests<br />- "Recently viewed", which lists your browsing history and will speed up you search on this site.</small></p><p class="rtxt"><small class="small"><strong>HP &amp; Partners use cookies on other websites to allow:</strong><br />- HP and our partners to deliver advertisements relevant to your interests. These may include popular offers for HP and partner products and services.</small></p>','HP sites use data collection tools like cookies. Please tell us how HP may use these tools:','Anonymous statistical information is also collected to enhance site functionality and performance.','<small class="small">You can change these settings at any time by going to our <a href="http://www8.hp.com/ie/en/privacy/privacy.html"><small class="small">Privacy Statement</small></a>.</small><small class="small"><br />By clicking continue you confirm your understanding and agreement for cookies settings as indicated on left.</small>','Yes','My privacy preferences','SAVE','Your preferences have been saved','Cookies that we capture on HP.com','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','HP websites use data collections tools, such as cookies. Please tell us how HP may use these tools:','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/ie/en/privacy/privacy.html">Privacy Statement</a>.','<strong>HP websites use date collection tools, such as cookies,</strong><br />to personalise your experience, allow HP partners to show HP ads meeting your interests on other websites, and to collect anonymous statistical information to enhance site functionality and performance.','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/ie/en/m/privacy/preferences.do">Privacy Statement</a>.','');

bannerText[3] = new Array('1111','Cookie strictement nécessaire','Cookie de performances','Cookie de fonctionnalité','Pouvons-nous collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site ?','Est-ce que HP peut personnaliser votre expérience sur les sites Web HP ?','Est-ce que HP et ses partenaires peuvent afficher des publicités correspondant à vos centres d\'intérêt sur d\'autres sites Web ?','Oui','Non','Continuer','Découvrez de quelle manière nous utilisons les cookies, ainsi que les avantages de sélectionner Oui.','<p class="rtxt"><small class="small"><strong>Les sites Web HP utilisent les cookies pour la prise en charge des fonctionnalités suivantes :</strong><br />- La fonctionnalité « Memoriser mes informations » qui vous permet de vous connecter rapidement dans le cas de visites répétées.<br />- La fonctionnalité d\'enregistrement des choix précédents permettant des recommandations pour des produits et services HP basés sur vos centres d\'intérêt.<br />- La fonctionnalité « Récemment affiché » qui répertorie votre historique de navigation et accélère vos recherches sur ce site.</small></p><p class="rtxt"><small class="small"><strong>HP et ses partenaires utilisent des cookies sur d\'autres sites afin que :</strong><br />- HP et ses partenaires puissent fournir des publicités correspondant à vos centres d\'intérêt. Ces publicités peuvent être des offres pour des produits et des services de HP et de ses partenaires.</small></p>','Les sites HP utilisent des outils de collecte de données tels que des cookies. Dites-nous de quelle manière HP peut utiliser ces outils :','Des informations de statistiques anonymes sont également collectées pour améliorer les fonctionnalités et les performances du site.','<small>Vous pouvez modifier ces paramètres à tout moment en accédant à la page de notre <a href="http://www8.hp.com/fr/fr/privacy/privacy.html"><small>Déclaration de protection de la vie privée</small></a>.</small><small><br />En cliquant sur CONTINUER, vous confirmez que vous comprenez les fonctionnalités des paramètres de cookies et êtes d\'accord avec leur utilisation comme indiqué à gauche.</small>','Yes','Mes préférences de confidentialité ','ENREGISTRER','ENREGISTRER OK','Cookies que nous avons collectés sur HP.com','Pouvons-nous collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site ?','Est-ce que HP peut personnaliser votre expérience sur les sites Web HP ?','Est-ce que HP et ses partenaires peuvent afficher des publicités correspondant à vos centres d\'intérêt sur d\'autres sites Web ?','Les sites Web HP utilisent des outils de collecte de données comme les cookies. Veuillez nous indiquer la façon dont HP peut utiliser ces outils:','Cliquez sur Continuer pour accepter l\'utilisation des cookies par HP. Pour modifier vos paramètres ou vous désengager, accédez à notre <a href="http://www8.hp.com/fr/fr/privacy/privacy.html">Déclaration de confidentialité</a>.','<strong>Les sites Web HP utilise des outils de collecte de données comme les cookies</strong><br />pour personnaliser votre expérience, autoriser les partenaires HP à afficher des publicités correspondant à vos intérêts sur d\'autres sites Web et collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site.','Cliquez sur Continuer pour accepter l\'utilisation des cookies par HP. Pour modifier vos paramètres ou vous désengager, accédez à notre <a href="http://www8.hp.com/fr/fr/m/privacy/preferences.do">Déclaration de confidentialité</a>.','');

bannerText[4] = new Array('1111','Unbedingt erforderlicher Cookie','Cookie zur Performance','Cookie zur Funktionalität','Dürfen wir anonyme statistische Informationen erfassen, um die Funktionalität und Leistung der Site zu verbessern?','Darf HP Ihr Weberlebnis auf HP Websites personalisieren?','Dürfen HP und die HP Partner Ihnen auf anderen Websites auf Ihre Interessen abgestimmte Werbung anzeigen?','Ja','Nein','Weiter','Erfahren Sie, wie wir Cookies verwenden und welche Vorteile es hat, wenn Sie "Ja" auswählen.','<p class="rtxt"><small class="small"><strong>Auf HP Websites werden Cookies für die folgenden Funktionen verwendet:</strong><br />- "Remember me" (Anmeldedaten speichern). Diese Funktion beschleunigt Ihre Anmeldung bei wiederholten Besuchen.<br />- Auf der Basis Ihrer vorherigen Angaben, die gespeichert wurden, erhalten Sie Empfehlungen für HP Produkte und Services, die auf Ihre Interessen abgestimmt sind.<br />- "Recently viewed" (Vor Kurzem angezeigt). Diese Funktion listet Ihren Browserverlauf auf und beschleunigt Ihre Suche auf dieser Site.</small></p><p class="rtxt"><small class="small"><strong>Auf anderen Websites werden Cookies von HP und den HP Partnern für die folgenden Funktionen verwendet:</strong><br />- HP und die HP Partner zeigen Werbung entsprechend Ihren Interessen an. Diese kann Angebote für die Produkte und Services von HP und den HP Partnern umfassen.</small></p>','Auf HP Websites werden Datenerfassungstools wie Cookies verwendet. Bitte teilen Sie uns mit, wie HP diese Tools einsetzen darf:','Es werden auch anonyme statistische Informationen erfasst, um die Funktionalität und Leistung der Site zu verbessern.','<small>Sie können diese Einstellungen jederzeit ändern, wenn Sie unsere <a href="http://www8.hp.com/de/de/privacy/privacy.html"><small>Datenschutzerklärung</small></a> aufrufen.</small><small><br />Wenn Sie auf \'WEITER\' klicken, bestätigen Sie, dass Sie die auf der linken Seite angegebenen Einstellungen für Cookies verstanden haben und mit ihnen einverstanden sind.</small>','Yes','Meine Datenschutzeinstellungen','SPEICHERN','SPEICHERN OK','','Dürfen wir anonyme statistische Informationen erfassen, um die Funktionalität und Leistung der Site zu verbessern?','Darf HP Ihr Weberlebnis auf HP Websites personalisieren?','Dürfen HP und die HP Partner Ihnen auf anderen Websites auf Ihre Interessen abgestimmte Werbung anzeigen?','Auf HP Websites werden Tools für Datensammlungen verwendet, z. B. Cookies. Bitte geben Sie an, wie HP diese Tools verwenden soll:','Klicken Sie auf "Weiter", wenn Sie der Verwendung von Cookies durch HP zustimmen. Wenn Sie Ihre bevorzugten Einstellungen ändern oder die Genehmigung rückgängig machen möchten, rufen Sie unsere <a href="http://www8.hp.com/de/de/privacy/privacy.html">Datenschutzerklärung</a> auf.','<strong>Auf HP Websites werden Tools für Datensammlungen verwendet, z. B. Cookies.</strong><br />Sie werden verwendet, um Ihr Onlineerlebnis zu personalisieren, um HP Partnern die Anzeige von HP Werbemaßnahmen zu Ihren Interessensgebieten auf anderen Websites zu ermöglichen und um anonyme statistische Informationen zu sammeln, mit denen die Funktionalität und die Leistung der Website verbessert werden kann.','Klicken Sie auf "Weiter", wenn Sie der Verwendung von Cookies durch HP zustimmen. Wenn Sie Ihre bevorzugten Einstellungen ändern oder die Genehmigung rückgängig machen möchten, rufen Sie unsere <a href="http://www8.hp.com/de/de/m/privacy/preferences.do">Datenschutzerklärung</a> auf.','Bitte wählen Sie "Ja" oder "Nein" um Cookies von HP und den HP Partnern zuzulassen.');
var technical_cookies = ['.ISCS[]','023492_pdf_registration','113325-IOT','113325-OT','15mntwarning','202324-OT','205216-IOT','3Po','5mntwarning','AFCore','AFFILIATE','AFFILIATEAGENTAUTHID','AGENTSELECTION','AS','ASP.NET_SessionId','ASP.Net','ASPFIXATION','ASPSESSIONID','ASPSESSIONIDQATRSCCB','AWSELB','AccountID','ActiveXCleanUP','AdminContactType','AppID','ArcFlagCookie','AuthenticationStateToken-sessionID','B2BP_CHECKBOX','BEID','BIGipServerp-dc20-c3-GT-HP','BSCDisclosureAgreed','BUSENTITYID','Bookmark','BusPhone','CAMPAIGN','CA%5FESD ','CCcookie','CISOPID','CL_Cookie','CP','CSMcaseId','CSR','CallType','CartFootersize','CartLevelDiscount','ChatOpen','ClientKey','CntyCD_Orig','CntyName_Orig','Commerce2002_TestPersistentCookie','Commerce2002_TestSessionCookie','ContactID','ContainerCookie','Cookie','Cookie_eSCPD','tridion_siteedit','CountryCD','CountryCode','CountryName','CurrLangCode','CurrLangId','DCCDEV%5FGEM%5FSHOPPER%5F1127%5F90898','DCCDEV%5FGEM%5FSHOPPER%5F70%5F90898','DCCITG%5FGEM%5FSHOPPER%5F1127%5F90898','DCCITG%5FGEM%5FSHOPPER%5F70%5F90898','DCCPRO','DCCPRO3174779','DCCPRO4211548','DCCPRO%5FGEM%5F','DCCPRO%5FGEM%5FSHOPPER%5F1127%5F90898','DCCPRO%5FGEM%5FSHOPPER%5F150%5F90898','DCCPRO%5FGEM%5FSHOPPER%5F70%5F90898','DCCPRO%5FUSERINFO%5F','DCCPRO%5FUSERINFO%5F1600003','DEPOT_KIOSK_ID','DSS%5FTICKET','DSS%5FTOKEN','DWF-HF-ROUTE','DataCenter','DataReady','DefLangCode','DefLangId','DefaultAcctId','DeliveryAddress','DiscBUSEntityId','DiscountReasonCode','DisplayCEIOnOff','DisplayDetailsOnOff','DisplayName','DisplaySkuOnOff','EEEJSESSIONID','EMEAINFO','EMailID','ESC','ES_status','ETR_OPT_IN','privacy_nb','EmailLink','EndTime','Equispeed cookie ','ExemptPromo','ExternalUser','FORMCRED','File[]','firstname','FooterURL','Force_View','FromSelfHelp','GENCartQty_[]','German Virtualisation navigator','HFCartQty_[]','HPE-ITGSESSION','HPELOQUA','HPESESSION','HPI-ITGSESSION','HPISESSION','HPPFEDIDENTITY','HPPFEDSESSION','HPPIDENTITY','HPPSESSION','HPPTRYNO','HPPUserID','HPSource','HPVC:AuthPartner:','HP_ContinueID','HP_EBC_INTPRO_HPE_COOKIE_NAME','HP_EBC_INTPRO_HPI_COOKIE_NAME','HP_EBC_ITGEXTHPE_COOKIE_NAME','HP_EBC_ITGEXTHPI_COOKIE_NAME','HP_EBC_ITGINT_HPE_COOKIE_NAME','HP_EBC_ITGINT_HPI_COOKIE_NAME','HP_EBC_PROEXTHPE_COOKIE_NAME','HP_EBC_PROEXTHPI_COOKIE_NAME','HP_EBUS','HP_EBUS_FORUM','HP_EBUS_HP_CLICKS','HP_EBUS_INTERNAL','HP_EBUS_ISPE','HP_EBUS_ITRC','HP_ELP','HP_EMEA_COOKIE','HP_HPSC_NOTICE','HP_LB','HP_SPF_HOST','HP_SPF_LOCALE','HP_SPF_SID','HP_SPF_SITE','HP_SURVEY','HTMLClientBlocked','HeaderURL','HomeOrder','HomePO','HomeShipment','HpOcsCountry','HpOcsLanguage','Hpdia_Optin','ICLocation','INDIGO_REG','IPAQModel','IPGConsumer','IPLocale','IRLJSESSIONID','ITGINT%5FDPLUS%5F19701%5F90898','ITGINT%5FDPLUS%5FSHOPPER%5F19701%5F90898','ITGINT%5FDPLUS%5FSHOPPER%5F19701%5F90898%5FEmail','ITGINT%5FGEM%5FSHOPPER%5F1127%5F90898','IsAgent','IsSpoofed','IsTester','IsTyping','JSESSIONID','KM','LAJSESSIONID','LGSESSION','peerius_ct','LOGINPAGE','LandingPageRead','LastInteractionDate','LastOrderSource','lastURL','lastname','LegacySessionID','LiSessionID','LithiumSecureUser','LithiumUserInfo','Logged','LoggedInDeployment','Login','LoginStatus','LoginURL','Login_auth','MAX%5FRECORD%5FCOUNT','MSCSAuth','MSCSProfile','ManageStandardID','MerchAkamaiCC','MerchAkamaiSCESG','MerchCompareData','MerchFacetsSelected','MerchHistory','MerchListData','MerchSettings','MgrApproval','NEWS','NEWSLETTER_SUBSCRIPTION_[]','NTLPREFS','NTLoginID','NewUser','NumberDiscountLineItems','OP_LoginStatus','ORDBusEntityID','ORDPriceLevelID','ORDUserType','OfficeHours ','OmSiteIdBEId','OmnitureLoggedIn','OneUid','OperLogin','OperatorId','OrderAdminPage','OrderDebug','OutletId','PA','PFTime','PHPSESSID','PQRData ','PR_Cookie','Page','Parent_Quote_Id','Passcode','PassedCreditCheck','PhoneNumber','Poetic: AUL','Poetic: JSESSIONID','PortalSessionID','PreferredLanguageCode','PriceLevelID','ProdImageURL','ProdSeriesOid','ProdTypeOid','Product','ProductBigseriesSnf','ProductInfo','ProductTypeValue','QSI_HistorySession','QSI_SI_[]_intercept','QSI_SI_8cQkT9vsjudeBdH_intercept','QSI_HistorySession','Redirect','RegID','RegID_Orig','RegName','RegName_Orig','Response_Repair_Time ','Response_Repair_Time_Clicked','RoleID','RoleID_Orig','RoleName','RoleName_Orig','SDASM_OF_ActiveWindows','SDP-HPP-Header','SDPPortalCache','SESSfb8b0b4d32066efd9cbade33e07c6e3b','SFmlyID','SIEBEL_TRANS_TYPE','SIEBEL_WEB_REF_ID','SIGNUPEMAIL','SI_[]_intercept','SI_ai2DPVK1I1MVhFG','SI_baq09Z0lnwnAFA8','SMBDealerID_CCBL','SMIDENTITY','SMSESSION','SM_UNIVERSALID','SM_USER','SOCIAL_EMAIL','SOCIAL_ERROR','SOCIAL_IDP','SOCIAL_REQ','SPlineID','SQLAuthCookie','SSID','SSOPLUSTWITTERS','SSOPLUSTWITTERV','SSOPLUSYAHOOS','SSOPLUSYAHOOT','Salesrep_AccountType','SavedContactID','SavedLNManageEmailFlag','SavedLogin','SavedSessionID','SecTime','SendLinkHistory','Serial','SessionManager','SessionSID','SessionToken','SetSearchReset','ShopperId','Siebel_AccountID','Siebel_Acct_Loc','Siebel_Acct_Name','Siebel_Acnt_FaxNum','Siebel_Acnt_MainNum','Siebel_Action_Type','Siebel_Activity_OwnedBy','Siebel_Camp_Name','Siebel_ContactHomePhone','Siebel_Contact_Acct_City','Siebel_Contact_Acct_Ctry','Siebel_Contact_Acct_State','Siebel_Contact_Acct_Zip','Siebel_Contact_Email_Addr','Siebel_Contact_First_Name','Siebel_Contact_Last_Name','Siebel_Contact_Mid_Name','Siebel_Contact_Ph','Siebel_Contact_Row_Id','Siebel_Contact_St_Addr','Siebel_Login','Siebel_Oppty_Ref_Id','Siebel_Oppty_Status','Siebel_Prim_Acct_City','Siebel_Prim_Acct_State','Siebel_Prim_Acct_Zip','Site','SiteID','SiteName','SiteSecured','SolutionsDemoPortal','SourceCode','Source_Code','Standards','StartDefaultPage','StartTime','Suk_en_hho_psc[]','Suk_en_smb_psc[]','SupApproval','Sysid','TIS_COOKIE','TIS_ERROR','TIS_LOGON_ID','TMC Cookie.txt','TNSCollected','TOSSBidRef','TOSSBidRefApprover','Test','TossCallNeeded','uat_peerius_ct','USER_LOCALE_COOKIE','UnderAgeCustomer','UnmatchedSearch','UserEmail','UserExperience','UserID','UserName','UserType','VDNMCC','VISITORID','Valid','VignettePortal-NavTreeState-admin','VignettePortal-NavTreeState-dspp','WC_ACTIVEPOINTER','WC_AUTHENTICATION_[]','WC_CartOrderId_10151','WC_GENERIC_ACTIVITYDATA','WC_PERSISTENT','WC_SESSION_ESTABLISHED','WC_USERACTIVITY_-1002','WC_USERACTIVITY_[]','WebUserID','X-release','[]-IOT','[]-OT','[]authUser','_SM_USERID','_g_tid','_ga','_gat_UA-73104404-1','_gid','_rmc','_rmebus','_spark_session','abIcons','ad','affHomecookie','affHomecookieoper','agencyID','akaau','alreadyRegisterd_rfg','area','aunoticepoppedup','auth_cookie','auth_token','bCILead','basicCookie','basicSearch','basket','bigdealsSite','bizaddrcity','bizaddrline1','bizcountry','bld_lvl_name','breadCrumbModelId','bsc_cc','bsc_lang','bsdSearchCode','building_name','c_lang','c_u','cae_browser','cc','cc%5Ftype','check','ckApp','ckBusinessGroup','ckBusinessUnit','ckCountry','ckCountryHierarchy','ckEmployeeInfo','ckFiscalPeriod','ckFiscalYear','ckQuestReport','ckRole','ckUserAccess','ckUserSelection','clickHistoryExt ','clickHistoryInt ','com_hp_hope','com_hp_jumpid','companyname','connectionType','country','ctoURL','ddj','default%5Ffirsttime','destination','dev-exp','downloadFromCart','downloadsw_SOFTWARE','dspp_c_u cookie','ePRIME_Session_Cookie[]','eSupportCookie','elAppHost','eloquaPdfSubmitted','eloquaSoftwareSubmitted','eloquaTouchpdfSubmitted','eloquaTouchsoftwareSubmitted','EMAIL','enssid','eprime_sid','errMsgTxt','externalLogin','externalLoginCookie','extractFunctionality','fQuotesOnly','fShowLease','fStateSelectionLink','fix_cc_err','fromQuickSpecs','fsr.r','fsr.s','fullharvest_[]','gss.api.gsid','hf_cookie_cart_id','hf_cookie_language','hf_cookie_password','hf_cookie_username','hf_use_pers_login','hf_vat_show_value','hp_cidww','hp_store_vcode','hpdtmstatus','hpe_locale','hpeuck_answ','hpeuck_cktst','hpeuck_lc','hpeuck_locale_ar','hpeuck_prefs','hpiscssid_[]','hpkrban','hpparts_cc','hpparts_lang','hppcf/','hppprofileid','hpsplitn','hpstore_##cc##_##ll##_##segment##','hpstore_uk_en_hho','hpstore_uk_en_smb','iCareNumber','inBaseURL','isRegistered','iscs_rem_me','iscscart_[]','jscr','lang','languagePre_cookie','lastSearch','lib/pb_server.py.session_id','lithium.anonymous.usersetting.[]','locale','members','merchUserType','merch_NLOI','metricsKeys','mobile','modelNum','new_user_email','newsletter_dev','newsletter_itg','opentoken','opselect','optimizelyBuckets','optimizelyCustomEvents','optimizelyEndUserId','optimizelyPendingLogEvents','optimizelyRedirects','optimizelySegments','optly_hp_test','optrackMetrics','order%5Fid','origin','osb_itemNo_cookie_[]','ovrd_last_page','ovrdtarget','password','pdfSubmitted','pdf_authorized','pdf_track_metric','pdlogin','planer_portal','plloginOccured','pm%5Ftype','poSession','preferences','price%5Fmatrix','privacy','privacy_browser_locale','productNum','productdescription','promocontact','pwebsessionid','queueId','queueName','rbArchiveOrCurrentCookie','resultCookie','routingName','rtversion','sCISRCCode','s_ppvl','s_ss_ses','s_u','scmrc','scriptsite-auth','sdc','secSID','serialNum','serviceParam','sessState','session','SessionID','signup_dev','signup_itg','site_name','snfversion','softwareSubmitted','State','stepStack','store-emea-test','strKey','sw_authorized','sw_ddj','sw_track_metric','sweetspot','tag_cartCookie','timeOffset','txtSearchCookie','tzoffset','uid','usbport_itemNo_cookie_[]','userAgentCookie','utag_main','utag_opt_out','vmp_desktop_site','wc_locale','www8-prd-ecom-ck','www_hp_com_locale'];
var tracking_cookies = ['.HPMYROOM','ASPSESSIONIDAAQASRBR','ASPSESSIONIDAATCRTBR','ASPSESSIONIDAQADTSTT','ASPSESSIONIDASBBRRRQ','ASPSESSIONIDASSDCACA','ASPSESSIONIDCAAQBCRT','ASPSESSIONIDCATDQQBT','ASPSESSIONIDCSSDCACA','ASPSESSIONIDQQAARQSQ','ASPSESSIONIDQQADQTRQ','ASPSESSIONIDSADCSSSS','ASPSESSIONIDSQRACDRT','ASPSESSIONID[]','ATHP_COOKIE','BKUT','CL%5FCookie','CL%5FHeader','CM_view','CPQ1Time','CRDTCSearchTerm','CSNBenchmark','CatalogCategoryID','dnb_eVar86','Culture','DCCPRO%5FDPLUS%5F19701%5F90898','DCCPRO%5FDPLUS%5FSHOPPER%5F19701%5F90898','DCCPRO%5FDPLUS%5FSHOPPER%5F19701%5F90898','ELOQUA','ELQSTATUS','EkAnalytics','EktGUID','HHOJSID2','HPINDIGOSESSION','HPPFEDRELAYURL','HPVC:AttendName:','HP_EBUS_SVCP','HP_EBUS_TIME','HP_TSUSB_SVCP','HumanClickACTIVE','IN_Company','IN_Country','IN_Email','IN_Name','IN_Phone','IN_Serial','peerius_user','peerius_sess','LivePersonID','MMAppLog','MMAppLogStore','NSC_iq-efm_qppm_iuuq','NSC_iq-efm_qppm_ttm','OAX','Omniture','ProdListUrl','ProductLineCode','ProductRefID','QSI_S_ZN_37VeCQSvFMO7aWF','SDASM_Orderformation_ActiveWindows','SMTRYNO','SPF_DC_SID','Suk_en_smb_psc1222','Survey','TRADEDOUBLER','TakenTheSurvey','Technical','Tracking cookie','Typed/Bookmarked','uat_peerius_user','uat_peerius_sess','UPS_ProductBrowse','UserID','WRIgnore','WRUID','Y4gQ7hab2NAAAAEzHhV9czuo','[]@bluekai.com','[]@hp.com','__CT_Data','__g_c','__g_u','__utma','__utmb','__utmc','__utmz','_ezb_o','_ga','_gat_UA-53409747-[]','_rmc_n','axState[]','bk','bk0','bkc','bkdc','bklc','bko','bkou','bkp1','bkst','bku','bkw5','c%5Flang','c%5Fu','ci_session','com_hp_gc','conCookie','ct_configName','dc_session_id','dmdbase_cdc','dnb3','dnb1','ecm','gpv_pN','guest_id','h_cm2','h_inavclk','hho_omni_usen','hpcompc_usen','hpe_eloqua','hpe_eloqua_90','hpe_eloqua_timer','hpjidc','hpshopping2','mbox','metrics[]','migrated','mmcore.pd','mmcore.srv','mmcore.tst','mmid','op1666topnav2gum','op1666topnav2liid','pgid','productCookie','prop12','regionCookie','s_cc','s_cpmscm','s_depth','s_dfa','s_fid','s_invisit','s_pn','s_ppn','s_ppv','s_prevPage','s_re','s_sq','s_sv_sid','s_vi','s_vnum','sid','smbRMcookie','startTime','strCPQTestingCookiesValue','use_hitbox','userid-[]','vcportal','wooTracker '];
var personalization_cookies = ['ABTasty','ABTastySession','AdReady Retargeting Pixel','B2BP_ACCT_LOGO','is','iv','CPQ_CA','Converter','Criteo retargeting cookie','EMID','EclaimsPecWwBdg','EclaimsPecWwEntity','EclaimsPecWwRole','GUID','HP-BCO-PRODMEM-TRANSFER','HP-BCO-PRODMEMID','HPMYROOM','HPMyRoom.Language','HPMyRoomWeb.Country','HPMyRoomWeb.Language','HPOrg','HPVC:AttendName','HP_EBUS_HP_CLICKS','IsPartnerAdmin','peerius_rid','LNG_257269261260253260230233252254252246233257260258264224251260200254206262','LastSite','PartnerProIdHQ','PhysCountry','SlmAccount','SlmLanguage','uat_peerius_rid','UPS_AnonymousID','Uid','UserGroups','UserPhone','UserRights','_dc_gtm_UA-[] ','acdc','addr_1','addr_2','addr_3','bigdealsLogin','bizaddrarea','bizaddrline2','bizfax','bizfaxcityareacode','bizfaxextn','bizphone','bizphonecitycode','bizphonextn','bizpostalcode','bizstate','byside_webcare_tuid','call_center','city_name','clang','com_hp_jumpid','contact_contact_first_name','contact_contact_last_name','cpccountry','eid ','email','evt','gscab','gsci','gscs','gscv','heleni.rememberMe','hp_cust_seg_sel','hp_last_segment','hp_rv_lc_lang','hpjumpidv2','newsletterChecker','opt','optout','postal_code','sdpRatingCookie_[]','signupChecker','sm_provider','smlang','sppSearchString','tabcookie','tst','tz','udc','udi','uic','userAgentCookie','user_locale','vcportal','wc_prods','zdi'];
var exDomains = ["X",'h10139.www1.hp.com','m.staples.pt','www.staples.pt','www.dustin.se','www.dustinhome.se','ezbuy.houston.hp.com','ebuyer.com','orders.ebuyer.com','h40059.www4.hp.com','cat-ext-0.emea.hp.com','cat-ext5.atlanta.hp.com','cat-ext6.atlanta.hp.com','cat-ext.emea.hp.com','h41201.www4.hp.com','b2b.hpe.com'];
var footerBanner_locales = ["X",'emea_africa-en','emea_africa-fr','at-de','be-fr','be-nl','fr-fr','de-de','ie-en','emea_middle_east-en','nl-nl','sa-en','es-es','ch-de','ch-fr','za-en','uk-en','cn-zh','hk-en','jp-ja','kr-ko','in-en','id-en','my-en','nz-en','ph-en','sg-en','th-en','vn-en','lamerica_nsc_carib-en','ca-en','us-en','by-ru','bg-bg','hr-hr','cz-cs','dk-da','ee-et','fi-fi','gr-el','hu-hu','il-he','it-it','kz-ru','lv-lv','lt-lt','emea_middle_east-ar','no-no','pl-pl','pt-pt','ro-ro','ru-ru','sa-ar','rs-sr','sk-sk','si-sl','se-sv','tr-tr','ua-ru','hk-zh','tw-zh','ar-es','bo-es','br-pt','lamerica_nsc_cnt_amer-es','cl-es','co-es','ec-es','mx-es','py-es','pe-es','pr-es','uy-es','ve-es','ca-fr'];if(typeof hpeuck_loaded === 'undefined') {
	var hpeuck_loaded = false;
}

if(!hpeuck_loaded) {

/*
When below three variables are set to true, the respective banner function will be executed and as result shown. 
Defining as false, code will set them true when given banner needs to be shown.
*/

var show_privacyBanner = false;
/*var show_auBanner = false;
var show_splitBanner = false;*/
var show_privacyNoticeBanner = false;




	//<IE9 fix
	Date.now = Date.now || function() { return +new Date; };
	
	//start the timer
	var hpeuck_timerStart = Date.now();
	
	//set the hpeuck_loaded loaded flag to true
	hpeuck_loaded = true;
	
	var page_domain = window.location.href.split('/');
	var page_domain = page_domain[0]+"//"+page_domain[2];
	
	var hpeuck_server = "http://";
	if (location.protocol === 'https:') {
		var hpeuck_server = "https://ssl.";
	}
	//interface css
	var hpeuck_css = '#cookie_privacy_holder {/*padding-top: 120px;*/ font-size: 12px; line-height: 15px; direction: ltr;}\
		#cookie_privacy_holder form table {margin: 0px; padding: 5px 0; border: 0px; border-collapse: separate;}\
		#cookie_privacy_holder form table td {margin: 0px; padding: 0px; border: 0px;}\
		.rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px; margin: 0px; margin-top: 5px;}\
		.rtxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px;}\
		#rptxt {color: #000; width: 200px; font-family: "HPSimplified", Arial,sans-serif;margin: 0px;font-size: 12px; margin: 0px;}\
		#rptxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif; margin: 0px;font-size: 12px;}\
		#cookie_privacy_popup {position: absolute; display: block; /*height: 120px;*/ width: 100%; top: 0; left: 0; background: #efefef; z-index: 100; text-align: center;}\
		#cookie_privacy_popup form {margin: 10px auto; width: 1000px; text-align: left;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookie_privacy_popup td.q3{width: 350px; border: 0px; border-right: 1px solid #5A5A5A;padding: 0 10px 0 0}\
		#cookie_privacy_popup td.q4{width: 350px; border: 0px; border-right: 1px solid #5A5A5A;padding: 0 15px}\
		#cookie_privacy_popup td.notice{width: 350px; border: 0px; border-right: 1px solid #5A5A5A;padding: 0 15px}\
		#cookie_privacy_popup td.formsubmit{width: 70px; border: 0px; padding: 0 0 0 15px; vertical-align: middle;}\
		#cookieFormSubmit {background: none #0096d6; border: 0 none; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified", Arial,sans-serif; font-size: 10px;font-weight: bold; margin-bottom: 0; padding: 2px 10px; text-transform: uppercase; border-radius: 0 5px 0 5px;}\
		.hppFormSubmit {border-radius: 0 4px 0 4px;}\
		#privacyShowDetails {margin-left: 10px;}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		.banner_popup { visibility: hidden; background-color: #252525; border-color: #626262; border-style: solid; border-width: 20px 10px 10px; height: 175px; left: 40%; position: absolute; top: 425px; width: 245px; z-index: 99; } \
		.privacy_banner_close { height: 17px; width: 17px; background-image: url("'+hpeuck_server+'www8.hp.com/uk/en/images/i/header-footer/s-hf-hpe_462697.gif"); background-position: -368px -9px; float:right} \
		.small {line-height: 15px; font-size: 10px;}';

	//interface css for UK/EN
	var hpeuck_css_uk = '#cookie_privacy_holder {/*padding-top: 120px;*/ font-size: 12px; line-height: 15px; direction: ltr;}\
		#cookie_privacy_holder form table {margin: 0px; padding: 5px 0; border: 0px; border-collapse: separate;}\
		#cookie_privacy_holder form table td {margin: 0px; padding: 0px; border: 0px;}\
		.rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px; margin: 0px; margin-top: 5px;}\
		.rtxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px;}\
		#rptxt {color: #000; width: 200px; font-family: "HPSimplified", Arial,sans-serif;margin: 0px;font-size: 12px; margin: 0px;}\
		#rptxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif; margin: 0px;font-size: 12px;}\
		#cookie_privacy_popup {position: absolute; display: block; /*height: 120px;*/ width: 100%; top: 0; left: 0; background: #efefef; z-index: 100; text-align: center;}\
		#cookie_privacy_popup form {margin: 10px auto; width: 1000px; text-align: left;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit {background: none #0096d6; border: 0 none; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified", Arial,sans-serif; font-size: 10px;font-weight: bold; margin-bottom: 0; padding: 2px 10px; border-radius: 0 5px 0 5px;}\
		.hppFormSubmit {border-radius: 0 4px 0 4px;}\
		#privacyShowDetails {margin-left: 10px;}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		.banner_popup { visibility: hidden; display: none; } \
		.small {line-height: 15px; font-size: 10px;}';
		
	//interface css for MX/ES
	var hpeuck_css_mx = '#cookie_privacy_holder {/*padding-top: 120px;*/ font-size: 12px; line-height: 15px; direction: ltr;}\
		#cookie_privacy_holder form table {margin: 0px; padding: 5px 0; border: 0px; border-collapse: separate;}\
		#cookie_privacy_holder form table td {margin: 0px; padding: 0px; border: 0px;}\
		.rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px; margin: 0px; margin-top: 5px;}\
		.rtxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px;}\
		#rptxt {color: #000; width: 200px; font-family: "HPSimplified", Arial,sans-serif;margin: 0px;font-size: 12px; margin: 0px;}\
		#rptxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif; margin: 0px;font-size: 12px;}\
		#cookie_privacy_popup {position: absolute; display: block; /*height: 120px;*/ width: 100%; top: 0; left: 0; background: #efefef; z-index: 100; text-align: center;}\
		#cookie_privacy_popup form {margin: 10px auto; width: 1000px; text-align: left;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit {background: none #0096d6; border: 0 none; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified", Arial,sans-serif; font-size: 10px;font-weight: bold; margin-bottom: 0; padding: 2px 10px; border-radius: 0 5px 0 5px;}\
		.hppFormSubmit {border-radius: 0 4px 0 4px;}\
		#privacyShowDetails {margin-left: 10px;}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		.banner_popup { visibility: hidden; display: none; } \
		.small {line-height: 15px; font-size: 10px;}';
	
	//interface css for responsive
	var hpeuck_css_r = '.sml {display:none} \
                @media only screen and (max-width: 320px) { .lrg {display:none} .sml {display: block} } \
		@media only screen and (min-width: 321px) and (max-width: 375px) { .lrg {display:none;} .sml {display: block} } \
		@media only screen and (min-width: 376px) and (max-width: 496px) { .lrg {display:none;} .sml {display: block} } \
		@media only screen and (min-width: 497px) and (max-width: 720px) { .sml{display:none;} .first_el{max-width:50%}  .sec_el {max-width:100%}} \
		@media only screen and (min-width: 721px) and (max-width: 934em) { .sml{display:none;} .first_el{max-width:50%}  .sec_el {max-width:100%}} \
		@media only screen and (min-width: 935px) {.sml{display:none}} \
		#cookie_privacy_holder {direction: ltr;font-size: 75%;line-height: 15px;font-family: HPSimplified, arial;background-color: #f2f2f2; -webkit-text-size-adjust:100%;} \
		#cookie_privacy_popup p {margin: 10px 2px} \
		#cookie_privacy_popup a {color: #00A0D2; text-decoration: underline} \
                .rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;margin: 0px; margin-top: 5px;}\
		#cookie_privacy_popup { background: none repeat scroll 0 0 #f2f2f2;display: block;text-align: left; top: 0; width: 100%; z-index: 100; max-width: 1000px;margin: 0 auto;color:#000;}\
		#cookie_privacy_popup form { font-family: "HPSimplified",Arial,sans-serif; text-align: left;width: 100%; display:inline-block;}\
                #cookie_privacy_popup label { /*float: left;*/ margin-right: 10px; /*clear:none;*/ width:auto}\
                #privacyShowDetails {margin-left: 10px;overflow:hidden;float:left}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit { background: none #0096D6;  border: 0 none; border-radius: 0 5px 0 5px; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified",Arial,sans-serif;    font-size: 133.3%;font-weight: bold;margin-bottom: 0; padding: 2px 10px; -webkit-appearance: none;height:36px;}\
		#cookie_privacy_popup input[type="radio"] {width: auto; height: auto; position: inherit; -moz-appearance: radio; -webkit-appearance: radio} \
		#cookie_privacy_popup input[type="radio"] + label:before {content: none} \
		.banner_popup { visibility: hidden; background-color: #252525; border-color: #626262; border-style: solid; border-width: 20px 10px 10px; height: 175px; left: 0px; position: absolute; top: 425px; width: 245px; z-index:99;  } \
		.privacy_banner_close { height: 17px; width: 17px; background-image: url("'+hpeuck_server+'www8.hp.com/uk/en/images/i/header-footer/s-hf-hpe_462697.gif"); background-position: -368px -9px; float:right} \
		.hppFormSubmit { border-radius: 0 4px 0 4px;}\
                .first_el {float:left; margin-right: 30px;}\
                .sec_el {overflow:hidden;margin-bottom:2px}\
                .lrg input {margin: 4px;*margin: 1px}\
                .small { font-size: 84%; line-height: 15px;}';	

        //interface css for responsive UK
	var hpeuck_css_r_uk = '#cookie_privacy_holder {direction: ltr;font-size: 75%;line-height: 15px;font-family: HPSimplified, arial;background-color: #f2f2f2;-webkit-text-size-adjust:100%;} \
		#cookie_privacy_popup p {margin: 10px 2px} \
		#cookie_privacy_popup a {color: #00A0D2} \
                .rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;margin: 0px; margin-top: 5px;}\
		#cookie_privacy_popup { background: none repeat scroll 0 0 #f2f2f2;display: block;text-align: left; top: 0; width: 100%; z-index: 100; max-width: 980px;margin: 0 auto;color:#000;}\
		#cookie_privacy_popup form { font-family: "HPSimplified",Arial,sans-serif; text-align: left;width: 100%; display:inline-block;}\
                #privacyShowDetails {margin-left: 10px;overflow:hidden;float:left}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit { background: none #0096D6;  border: 0 none; border-radius: 0 5px 0 5px; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified",Arial,sans-serif;    font-size: 133.3%;font-weight: bold;margin-bottom: 0; padding: 2px 10px; -webkit-appearance: none;height:36px;}\
		.banner_popup { visibility: hidden; display: none; } \
		.hppFormSubmit { border-radius: 0 4px 0 4px;}\
                .first_el {float:left; margin-right: 30px; width: 50%}\
                .sec_el {overflow:hidden;margin-bottom:2px}\
                .lrg input {margin: 4px;*margin: 1px}\
                .small { font-size: 84%; line-height: 15px;}\
				@media only screen and (max-width: 496px) { .sec_el {clear:both} .first_el {width: 100%} .rtxt.lrg {display: none;} #cookieFormSubmit {float:left} #benefits {display:none}} \
				@media only screen and (min-width: 497px) { #cookieFormSubmit {float:right} } ';
				
//interface html
	var hpeuck_html = '<!--googleoff: index-->\
						<noindex>\
						<div id="cookie_privacy_popup" class="custom_cookie_privacy_popup">\
							<form method="POST" name="privacyCookieForm" onsubmit="return savePrivacyPreferences()">\
								<div style="float:left">\
									<span class="rtxt"><strong>###heading###</strong></span>\
									<table cellspacing=0 cellpadding=0 border=0 style="padding: 5px 0;">\
										<tr>\
											<td valign="top" class="q3">\
												<input id="q1" type="hidden" name="option_tec" value="1">\
												<input id="q2" type="hidden" name="option_fpt" value="1">\
												<span class="rtxt" style="display: block">###question_3###</span><label for="q3y"><input id="q3y" type="radio" value="1" name="option_fpf"><span class="rtxt">###yes###</span></label> <label for="q3n"><input id="q3n" type="radio" value="0" name="option_fpf" ><span class="rtxt">###no###</span></label>\
											</td>\
											<td valign="top" class="q4">\
												<span class="rtxt" style="display: block">###question_4###</span>&nbsp;<label for="q4y"><input id="q4y" type="radio" value="1" name="option_tpc"><span class="rtxt">###yes###</span></label> <label for="q4n"><input id="q4n" type="radio"  value="0" name="option_tpc" ><span class="rtxt">###no###</span></label>\
											</td>\
											<td valign="top" class="notice">\
												<span class="rtxt" style="display: block">###nottice###</span>\
											</td>\
											<td width=70 valign="middle" class="formsubmit">\
												<span class="rtxt"><input type="submit" id="cookieFormSubmit" value="###button###" name="p_submit"></span>\
											</td>\
											<td valign="middle" style="border: 0px; padding: 0 10px; vertical-align: middle;">\
												<div id="rptxt" style="display: block; width: 260px;">\
													###disclaimer###\
												</div>\
											</td>\
										</tr>\
										<tr>\
											<td valign="top" colspan=5 style="padding: 0 10px">\
												<p class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyShowDetails()"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
											</td>\
										</tr>\
									</table>\
								</div>\
								<div id="privacyShowDetails">\
									###unfold_area###\
								</div>\
							</form>\
							<div class="banner_popup" id="banner_popup"><div id="privacy_banner_close" class="privacy_banner_close" onclick="hpeuck_hide_bannerpopup();"> </div><p id="privacy_banner_p" class="privacy_p">###banner_alert###</p></div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';

	//interface for UK/EN
	var hpeuck_html_uk = '<!--googleoff: index-->\
						<noindex>\
						<div id="cookie_privacy_popup" class="custom_cookie_privacy_popup">\
							<form method="POST" name="privacyCookieForm" onsubmit="return savePrivacyPreferences()">\
								<div style="float:left">\
									<span class="rtxt"><strong>###heading###</strong></span>\
									<table cellspacing=0 cellpadding=0 border=0 style="padding: 5px 0;">\
										<tr>\
											<td width=900 valign="top" style="border: 0px; padding: 0 10px 0 0">\
												<input id="q1" type="hidden" name="option_tec" value="1">\
												<input id="q2" type="hidden" name="option_fpt" value="1">\
												<input id="q3" type="hidden" name="option_fpf" value="1">\
												<input id="q4" type="hidden" name="option_tpc" value="1">\
												<span class="rtxt" style="display: block">###question_3###</span>\
												<span class="rtxt" style="display: block">###question_4###</span>\
												<span class="rtxt" style="display: block">###nottice###</span>\
											</td>\
											<td width=500 valign="top" style="border: 0px; padding: 0 15px">\
												<span class="rtxt" style="display: block">###disclaimer###</span>\
											</td>\
										</tr>\
										<tr>\
											<td valign="top" style="padding: 0 10px; vertical-align: middle;">\
												<p class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyShowDetails()"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
											</td>\
											<td width=70 valign="middle" align="right" style="border: 0px; padding: 0 0 0 15px; vertical-align: middle;">\
												<span class="rtxt"><input type="submit" id="cookieFormSubmit" value="###button###" name="p_submit"></span>\
											</td>\
										</tr>\
									</table>\
								</div>\
								<div id="privacyShowDetails">\
									###unfold_area###\
								</div>\
							</form>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
	
	//interface for MX/ES
	var hpeuck_html_mx = '<!--googleoff: index-->\
						<noindex>\
						<div id="cookie_privacy_popup" class="custom_cookie_privacy_popup">\
							<form method="POST" name="privacyCookieForm" onsubmit="return savePrivacyPreferences()">\
								<div style="float:left">\
									<span class="rtxt"><strong>###heading###</strong></span>\
									<table cellspacing=0 cellpadding=0 border=0 style="padding: 5px 0;">\
										<tr>\
											<td width=700 valign="top" style="border: 0px; padding: 0 10px 0 0">\
												<input id="q1" type="hidden" name="option_tec" value="1">\
												<input id="q2" type="hidden" name="option_fpt" value="1">\
												<input id="q3" type="hidden" name="option_fpf" value="1">\
												<input id="q4" type="hidden" name="option_tpc" value="1">\
												<span class="rtxt" style="display: block">###question_3###</span>\
											</td>\
											<td width=700 valign="top" style="border: 0px; padding: 0 15px">\
												<span class="rtxt" style="display: block">###disclaimer###</span>\
											</td>\
										</tr>\
										<tr>\
											<td valign="top" style="padding: 0 10px; vertical-align: middle;">\
												<p class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyShowDetails()"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
											</td>\
											<td width=70 valign="middle" align="right" style="border: 0px; padding: 0 0 0 15px; vertical-align: middle;">\
												<span class="rtxt"><input type="submit" id="cookieFormSubmit" value="###button###" name="p_submit"></span>\
											</td>\
										</tr>\
										<tr>\
											<td colspan="2">\
												<div id="privacyShowDetails">\
													###unfold_area###\
												</div>\
											</td>\
										</tr>\
									</table>\
								</div>\
							</form>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
						
	//interface for responsive
	var hpeuck_html_r = '<!--googleoff: index-->\
						<noindex>\
						<div class="custom_cookie_privacy_popup" id="cookie_privacy_popup" >\
                                              <div style="margin-left:10px">\
							<p class="sml">###heading_responsive_mobile###</p>\
							<p class="lrg"><strong>###heading_responsive###</strong></p>\
							<form onsubmit="return savePrivacyPreferences()" name="privacyCookieForm" method="POST">\
								<div class="lrg first_el">\
									<input type="hidden" value="1" name="option_tec" id="q1">\
									<input type="hidden" value="1" name="option_fpt" id="q2">\
									<span style="display: block" class="rtxt q3">###question_3###</span>\
									<input id="q3y" type="radio" value="1" name="option_fpf">\
									<label for="q3y">###yes###</label>\
									<input id="q3n" type="radio" value="0" name="option_fpf">\
									<label for="q3n">###no###</label>\
									<span style="display: block; clear:both" class="rtxt q4">###question_4###</span>\
									<input id="q4y" type="radio" value="1" name="option_tpc">\
									<label for="q4y">###yes###</label>\
									<input id="q4n" type="radio" value="0" name="option_tpc">\
									<label for="q4n">###no###</label>\
                                    <p class="lrg" class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyResponsiveShowDetails()" data-position="auto"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
								</div>\
								<div class="sec_el">\
									<p class="lrg">###nottice###</p>\
									<p class="lrg">###disclaimer_responsive###</p>\
									<p class="sml">###disclaimer_responsive_mobile###</p>\
									<span class="rtxt"><input type="submit" name="p_submit" value="###button###" id="cookieFormSubmit"></span>	\
								</div>\
                                <div class="lrg">\
                                    <div id="privacyShowDetails">###unfold_area###</div>\
                                </div>\
							</form>\
							<div class="banner_popup" id="banner_popup"><div id="privacy_banner_close" class="privacy_banner_close" onclick="hpeuck_hide_bannerpopup();"> </div><p id="privacy_banner_p" class="privacy_p">###banner_alert###</p></div>\
                            </div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';

	//interface for responsive UK
	var hpeuck_html_r_uk = '<!--googleoff: index-->\
						<noindex>\
						<div class="custom_cookie_privacy_popup" id="cookie_privacy_popup" >\
                                              <div style="margin: 0 10px">\
							<form onsubmit="return savePrivacyPreferences()" name="privacyCookieForm" method="POST">\
								<div class="lrg first_el">\
									<input type="hidden" value="1" name="option_tec" id="q1">\
									<input type="hidden" value="1" name="option_fpt" id="q2">\
									<input type="hidden" value="1" name="option_fpf" id="q3">\
									<input type="hidden" value="1" name="option_tpc" id="q4">\
									<p class="sml">###heading_responsive_mobile###</p>\
								</div>\
								<div class="sec_el">\
									<p class="lrg">###disclaimer_responsive_mobile###</p>\
									<span class="rtxt"><input type="submit" name="p_submit" value="###button###" id="cookieFormSubmit"></span>	\
								</div>\
							</form>\
							<div class="banner_popup" id="banner_popup"><div id="privacy_banner_close" class="privacy_banner_close" onclick="hpeuck_hide_bannerpopup();"> </div><p id="privacy_banner_p" class="privacy_p">###banner_alert###</p></div>\
                                                    </div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
	
	    //interface for responsive MX
	var hpeuck_html_r_mx = '<!--googleoff: index-->\
						<noindex>\
						<div class="custom_cookie_privacy_popup" id="cookie_privacy_popup" >\
                                              <div style="margin: 0 10px">\
							<form onsubmit="return savePrivacyPreferences()" name="privacyCookieForm" method="POST">\
								<div class="lrg first_el">\
									<input type="hidden" value="1" name="option_tec" id="q1">\
									<input type="hidden" value="1" name="option_fpt" id="q2">\
									<input type="hidden" value="1" name="option_fpf" id="q3">\
									<input type="hidden" value="1" name="option_tpc" id="q4">\
									<p class="sml">###heading_responsive_mobile###</p>\
									<p class="lrg" class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyResponsiveShowDetails()" data-position="auto"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
								</div>\
								<div class="sec_el">\
									<p class="lrg">###disclaimer_responsive_mobile###</p>\
									<span class="rtxt"><input type="submit" name="p_submit" value="###button###" id="cookieFormSubmit"></span>	\
								</div>\
								<div class="lrg">\
                                    <div id="privacyShowDetails">###unfold_area###</div>\
                                </div>\
							</form>\
							<div class="banner_popup" id="banner_popup"><div id="privacy_banner_close" class="privacy_banner_close" onclick="hpeuck_hide_bannerpopup();"> </div><p id="privacy_banner_p" class="privacy_p">###banner_alert###</p></div>\
                                                    </div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
						
	function hpeuck_localizeInterface(hpeuck_html, bannerText, index) {
		var html = hpeuck_html;
		html = html.replace("###heading###", bannerText[index][12]);
		html = html.replace("###question_3###", bannerText[index][5]);
		html = html.replace("###question_4###", bannerText[index][6]);
		html = html.replace("###yes###", bannerText[index][7]);
		html = html.replace("###yes###", bannerText[index][7]);
		html = html.replace("###no###", bannerText[index][8]);
		html = html.replace("###no###", bannerText[index][8]);
		html = html.replace("###yes###", bannerText[index][7]);
		html = html.replace("###yes###", bannerText[index][7]);
		html = html.replace("###no###", bannerText[index][8]);
		html = html.replace("###no###", bannerText[index][8]);
		html = html.replace("###nottice###", bannerText[index][13]);
		html = html.replace("###button###", bannerText[index][9]);
		html = html.replace("###disclaimer###", bannerText[index][14]);
		html = html.replace("###unfold_link###", bannerText[index][10]);
		html = html.replace("###unfold_area###", bannerText[index][11]);
		html = html.replace("###heading_responsive###", bannerText[index][23]);
		html = html.replace("###disclaimer_responsive###", bannerText[index][24]);
		html = html.replace("###heading_responsive_mobile###", bannerText[index][25]);
		html = html.replace("###disclaimer_responsive_mobile###", bannerText[index][26]);
		html = html.replace("###banner_alert###", bannerText[index][27]);
		return html;
	}
	
	function privacyLoadScript(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState) {  //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" ||
						script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} 
		else {  //Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	function privacyReadCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function privacyCreateCookie(domain, name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
	}
	
	function privacyCreateCookieSeconds(domain, name,value,seconds) {
		if (seconds) {
			var date = new Date();
			date.setTime(date.getTime()+(seconds));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
	}

	function privacyListCookies() {
		var cookies = new Array();
		var ca = document.cookie.split(';');

		for(var i=0;i < ca.length;i++) {
			var pair = ca[i].split('=');
			pair[0] = pair[0].replace(/ /,"");
			cookies.push(pair[0]);
		}
		return cookies;
	}

	function privacyEraseCookie(name) {
		privacyCreateCookie(hpeuck_pageDomain, name,"",0);
		if (!isIE) {console.log("("+hpeuck_pageDomain+") Cookie "+name+" has been deleted");}
	}
	
	//create the reverse function for strings
	String.prototype.reverse = function(){
		return this.split("").reverse().join("");
	}

	function isCookieToBeDeleted(cookie_name, allowed_cookies) {
		var result = true;
		var cookie_allowed = "";
		var reversed_cookie_name = "";
		for(var j=0; j < allowed_cookies.length; j++) {
			if(cookie_name == allowed_cookies[j]) { //simple cookie
				result = false;
			}
			else if(allowed_cookies[j].indexOf("[]") > 0) { //wildcard is at the end of the cookie name
				cookie_allowed = allowed_cookies[j];
				var pos = cookie_allowed.indexOf("[]");
				cookie_allowed = cookie_allowed.substring(0, pos);
				if(cookie_name.indexOf(cookie_allowed) == 0) {
					result = false;
				}
			}
			else if(allowed_cookies[j].indexOf("[]") == 0){ //wildcard is at the begining of the cookie name
				cookie_allowed = allowed_cookies[j];
				var pos = cookie_allowed.indexOf("[]");
				cookie_allowed = cookie_allowed.substring(2, cookie_allowed.length);
				cookie_allowed = cookie_allowed.reverse();
				reversed_cookie_name = cookie_name.reverse();
				if(reversed_cookie_name.indexOf(cookie_allowed) > -1) {
					result = false;
				}
			}
		}
		return result;
	}

	function doPrivacyFiletring() {
		var ca = privacyListCookies();
		var allowed_cookies = new Array();
		
		for (i=0;i<hpeuck_privacy.length;i++) {
			if (hpeuck_privacy.charAt(i) == "1") {
				switch(i) {
					case 0 :
						allowed_cookies = allowed_cookies.concat(technical_cookies);
						break;
					case 1 :
						allowed_cookies = allowed_cookies.concat(tracking_cookies);
						break;
					case 2 :
						allowed_cookies = allowed_cookies.concat(personalization_cookies);
						break;
					default:
						allowed_cookies = allowed_cookies.concat(technical_cookies);
				}
			}
		}

		for(var i=0;i < ca.length;i++) {
			//do not delete the privacy cookie
			if (ca[i] != "hpeuck_prefs") {
				var tbDeleted = false;
				tbDeleted = isCookieToBeDeleted(ca[i], allowed_cookies);
				if(tbDeleted) {
					privacyEraseCookie(ca[i]);
				}
			}
		}
	}

	function privacyValButton(btn) {
		var cnt = -1;
		for (var i=btn.length-1; i > -1; i--) {
			if (btn[i].checked) {cnt = i; i = -1;}
		}
		if (cnt > -1) return btn[cnt].value;
		else return null;
	}
	
	function getLocaleArrayFromCookie() {
		var locale = privacyReadCookie('hpeuck_locale_ar');
		if(locale != null) {
			locale_ar = locale.split("|");
			locale = Array(3);
			locale['cc'] = locale_ar[0];
			locale['ll'] = locale_ar[1];
			locale['mod'] = locale_ar[2];
		}
		return locale;
	}
	
	function hpeuck_show_bannerpopup() {
		var page_popup = document.getElementById('banner_popup');
		page_popup.style.background='#f2f2f2';
		page_popup.style.position='fixed';
		page_popup.style.top='40%';
		page_popup.style.left='40%'; //added to fix the mobile layout --> Alex Pricop 19 Feb 2016
		page_popup.style.borderColor='#ccc';
		page_popup.style.zfrm_index='99';
		
		var privacy_banner_popup = document.getElementById('privacy_banner_p');
		privacy_banner_popup.color = "#000000";
		privacy_banner_popup.fontFamily = "HPSimplified,Arial";
		privacy_banner_popup.fontSize = "16px";
		privacy_banner_popup.marginTop = "40px";
		page_popup.style.visibility='visible';
		
		if((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile ) { //responsive layout
			if( !((document.getElementById('q3y').checked) || (document.getElementById('q3n').checked))) {
				if (document.getElementsByClassName) {
					document.getElementsByClassName('q3')[0].style.color = "#d7410b";
				}
				//IE8 fix
				else if (document.querySelectorAll) {
					document.querySelectorAll('.q3')[0].style.color = "#d7410b";
				}
			}
			if( !((document.getElementById('q4y').checked) || (document.getElementById('q4n').checked))) {
				if (document.getElementsByClassName) {
					document.getElementsByClassName('q4')[0].style.color = "#d7410b";
				}
				//IE8 fix
				else if (document.querySelectorAll) {
					document.querySelectorAll('.q4')[0].style.color = "#d7410b";
				}
			}
		}
		else { //non responsive layout
			if( !((document.getElementById('q3y').checked) || (document.getElementById('q3n').checked))) {
				if (document.getElementsByClassName) {
					document.getElementsByClassName('q3')[0].style.border = "2px solid #d7410b";
				}
				//IE8 fix
				else if (document.querySelectorAll) {
					document.querySelectorAll('.q3')[0].style.border = "2px solid #d7410b";
				}
			}
			if( !((document.getElementById('q4y').checked) || (document.getElementById('q4n').checked))) {
				if (document.getElementsByClassName) {
					document.getElementsByClassName('q4')[0].style.border = "2px solid #d7410b";
				}
				//IE8 fix
				else if (document.querySelectorAll) {
					document.querySelectorAll('.q4')[0].style.border = "2px solid #d7410b";
				}
			}
		}
		
		
}

	function hpeuck_hide_bannerpopup() { 
		document.getElementById('banner_popup').style.visibility='hidden'; 
		if(!((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile)) { //if not responsive, add the right border divider
			if (document.getElementsByClassName) {
				document.getElementsByClassName("q3")[0].style.border = "none";
				document.getElementsByClassName("q3")[0].style.borderRight = "1px solid #5A5A5A";
				document.getElementsByClassName("q4")[0].style.border = "none";
				document.getElementsByClassName("q4")[0].style.borderRight = "1px solid #5A5A5A";
			}
			//IE8 fix
			else if (document.querySelectorAll) {
				document.querySelectorAll('.q3')[0].style.border = "none";
				document.querySelectorAll('.q3')[0].style.borderRight = "1px solid #5A5A5A";
				document.querySelectorAll('.q4')[0].style.border = "none";
				document.querySelectorAll('.q4')[0].style.borderRight = "1px solid #5A5A5A";
			}
		}
	}
	
	function selectivePreselect(id, checked) {
		document.getElementById(id).checked = checked;
	}

	function savePrivacyPreferences() {
		var hpeuck_q4_selected = 0;
		var hpeuck_q3_selected = 0;
		
		var default_hpeuck_privacy = privacyReadCookie('hpeuck_prefs');
		var windowWidth = window.innerWidth;
		
		if ((document.getElementById('q4y') != null) && (document.getElementById('q3y') != null)) {
			if( (document.getElementById('q4y').checked) || (document.getElementById('q4n').checked)) {
				hpeuck_q4_selected = 1;
			}
			else if(windowWidth < 497 && (!document.getElementById('q4y').checked || !document.getElementById('q4n').checked)){ //if the banner is in mobile format (width<497px) preselect the default answers on the radio buttons
				if(default_hpeuck_privacy.charAt(3) == "1") {
					selectivePreselect('q4y', true);
					selectivePreselect('q4n', false);
				}
				else {
					selectivePreselect('q4y', false);
					selectivePreselect('q4n', true);
				}
				hpeuck_q4_selected = 1;
			}
			
			if( (document.getElementById('q3y').checked) || (document.getElementById('q3n').checked)) {
				hpeuck_q3_selected = 1;
			}
			else if(windowWidth < 497 && (!document.getElementById('q3y').checked || !document.getElementById('q3n').checked)){ //if the banner is in mobile format (width<497px) preselect the default answers on the radio buttons
				if(default_hpeuck_privacy.charAt(2) == "1") {
					selectivePreselect('q3y', true);
					selectivePreselect('q3n', false);
				}
				else {
					selectivePreselect('q3y', false);
					selectivePreselect('q3n', true);
				}
				hpeuck_q3_selected = 1;
			}
		}
		else {
			hpeuck_q4_selected = 1;
			hpeuck_q3_selected = 1;
		}
	    if (( hpeuck_q4_selected === 1) && ( hpeuck_q3_selected === 1)) {
  

			var option_tec = privacyValButton(document.forms.privacyCookieForm.option_tec); //technical cookies
			if(option_tec == null) {
				option_tec = "1";
			}
			var option_fpt = privacyValButton(document.forms.privacyCookieForm.option_fpt); //tracking cookies
			if(option_fpt == null) {
				option_fpt = "1";
			}
			var option_fpf = privacyValButton(document.forms.privacyCookieForm.option_fpf); //personalization cookies
			if(option_fpf == null) {
				option_fpf = "1";
			}
			var option_tpc = privacyValButton(document.forms.privacyCookieForm.option_tpc); //3rd party cookies
			if(option_tpc == null) {
				option_tpc = "1";
			}
			
			//sync  personalization and criteo cookis
			if(option_fpf == "1") {
				privacyEraseCookie("com_hp_hope");
				privacyCreateCookie(hpeuck_pageDomain, "com_hp_hope","", 365);
			}
			else {
				privacyEraseCookie("com_hp_hope");
				privacyCreateCookie(hpeuck_pageDomain, "com_hp_hope","g**X", 365);
			}
			
			document.getElementById('cookie_privacy_popup').style.display = 'none';
			document.getElementById("cookie_privacy_holder").style.paddingTop = "0px";

				   //create an event when banner is closed
			if (document.createEvent) {
					var privacyBannerClosed = document.createEvent('Event');
					privacyBannerClosed.initEvent('HP.PrivacyBanner.Closed', true, true);
					document.dispatchEvent(privacyBannerClosed);
				}
			else { //IE<9, cannot create custom event;
				privacyBannerClosedFlag=true;
			}
			
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
			
			hpeuck_privacy = option_tec+option_fpt+option_fpf+option_tpc;
			privacyCreateCookie(hpeuck_pageDomain, 'hpeuck_prefs',hpeuck_privacy, 365); 
			
			//track the CONTINUE action and answer
			try {
				var locale = getLocaleArrayFromCookie();
				trackMetrics("newLink", {name: locale['cc']+'_'+locale['ll']+'_hpeuck_bansave_ans_'+hpeuck_privacy });
			}catch(e){}
			
			window.hpeuck_privacy = privacyReadCookie('hpeuck_prefs');
			doPrivacyFiletring();
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_answ","1", 365); //the form was asnwered by visitor 
		}
		
		else {
		   hpeuck_show_bannerpopup();
		}
		return false;
	}

	function privacyShowDetails() {
		var display = document.getElementById("privacyShowDetails").style.display;
		if((display == "none") || (display =="")) {
			document.getElementById("cookie_privacy_holder").style.paddingTop = hpeuck_maxHeight+"px";
			document.getElementById("cookie_privacy_popup").style.height = hpeuck_maxHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "block";
			document.getElementById("plus_minus").innerHTML = "- ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}
		else {
			document.getElementById("cookie_privacy_holder").style.paddingTop = hpeuck_minHeight+"px";
			document.getElementById("cookie_privacy_popup").style.height = hpeuck_minHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "none";
			document.getElementById("plus_minus").innerHTML = "+ ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}
		return false;
	}
	
	function privacyResponsiveShowDetails() {
	
        var display = document.getElementById("privacyShowDetails").style.display;
		if((display == "none") || (display =="")) {
			document.getElementById("cookie_privacy_popup").style.minHeight = hpeuck_maxHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "block";
			document.getElementById("plus_minus").innerHTML = "- ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}
		else {
            document.getElementById("cookie_privacy_popup").style.minHeight = hpeuck_minHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "none";
			document.getElementById("plus_minus").innerHTML = "+ ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}          
		return false;
	}
	
	function privacyEBPageResize() {
		if(typeof initResizing == 'function') {
			initResizing();
		}
		if(typeof resizing == 'function') {
			resizing();
		}
	}
	
	function hpeuck_getIndexForLocale(cc, ll, hpeuck_allowedCC, hpeuck_allowedLL) {
		var index = null;
		for(i=0; i<hpeuck_allowedCC.length; i++) {
			if(cc.toLowerCase() == hpeuck_allowedCC[i] && ll.toLowerCase() == hpeuck_allowedLL[i]) {
				index = i;
			}
		}
		return index;
	}

	function cookiePrivacyMessage() {
		var sheet = document.createElement("style");
		var style = hpeuck_css;
		document.getElementsByTagName("head")[0].appendChild(sheet);
		try {
			sheet.innerText=style;
			sheet.innerHTML=style;
		}
		catch(e) {
			sheet.styleSheet.cssText=style;
		}
				
		document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
		
		//get the opened height
		hpeuck_maxHeight = hpeuck_getBannerHeight();
		
		//get the closed height
		document.getElementById('privacyShowDetails').style.display = "none";
		hpeuck_minHeight = hpeuck_getBannerHeight();
		
		//set the dimensions
		document.getElementById('cookie_privacy_holder').style.paddingTop = hpeuck_minHeight+"px";
		document.getElementById('cookie_privacy_popup').style.height = hpeuck_minHeight+"px";
		
		hpeuck_preselectAnswers(hpeuck_privacy);
	}
	
	function hpeuck_preselectAnswers(defaultSettings) {
		document.getElementById('q1').value = defaultSettings.charAt(0);
		document.getElementById('q2').value = defaultSettings.charAt(1);
		
		var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;//All IE
		var tmp_locale = hpeuck_detectUserLocale(banner_allowedCC, banner_allowedLL, isIE);
		
		//3rd question exception for Germany
		if ((!(tmp_locale['cc'] == "de" && tmp_locale['ll'] == "de") && !(tmp_locale['cc'] == "nl" && tmp_locale['ll'] == "nl")) || hpeuck_mobile ){
			if(defaultSettings.charAt(2) == "1") {
				document.getElementById('q3y').checked = true;
				document.getElementById('q3n').checked = false;
			}
			else {
				document.getElementById('q3y').checked = false;
				document.getElementById('q3n').checked = true;
			}
		}
		
		//4th question exception for Germany, Austria, Italy, Latvia, Lithuania, Netherlands, Portugal, Sweden, Croatia
		if (( !(tmp_locale['cc'] == "de" && tmp_locale['ll'] == "de") && !(tmp_locale['cc'] == "at" && tmp_locale['ll'] == "de") && !(tmp_locale['cc'] == "it" && tmp_locale['ll'] == "it") && !(tmp_locale['cc'] == "lt" && tmp_locale['ll'] == "lt") && !(tmp_locale['cc'] == "lv" && tmp_locale['ll'] == "lv") && !(tmp_locale['cc'] == "nl" && tmp_locale['ll'] == "nl") && !(tmp_locale['cc'] == "pt" && tmp_locale['ll'] == "pt") && !(tmp_locale['cc'] == "se" && tmp_locale['ll'] == "sv") && !(tmp_locale['cc'] == "hr" && tmp_locale['ll'] == "hr") ) || hpeuck_mobile ){
			if(defaultSettings.charAt(3) == "1") {
				document.getElementById('q4y').checked = true;
				document.getElementById('q4n').checked = false;
			}
			else {
				document.getElementById('q4y').checked = false;
				document.getElementById('q4n').checked = true;
			}
		}
	}

	function privacyGetMetaContent(mn) {
		var m = document.getElementsByTagName('meta');
		for(var i in m) {
			if (m[i].name == mn) {
				return m[i].content;
				break;
			}
		}
		return false;
	}

	function privacyGetUrlLocale(arr, allowedCC, allowedLL) {
		var url = window.location.href;
		var tmp = "";
		var ret = "";
		var ccll = "";
		var locale = false;
		for(i=0; i<arr.length; i++) {
		    ccll = arr[i].split('-');
		    ccll = ccll[1]+'/'+ccll[0];
			tmp = "/" + ccll + "/";
			if (url.indexOf(tmp) != -1) {
				ret = tmp.split("/");
				if(hpeuck_isLocaleEnabled(allowedLL, ret[2]) && hpeuck_isLocaleEnabled(allowedCC, ret[1])) {
					locale = new Array();
					locale['cc'] = ret[1];
					locale['ll'] = ret[2];
					locale['mod'] = "page_url";
					if (!isIE) { console.log("Locale detected from URL"); }
					break;
				}
			}
		}
		return locale;
	}

	function hpeuck_isLocaleEnabled(arr, obj) {
		var ret = false;
		if (arr && obj) {
			obj = obj.toLowerCase();
			if(obj == "gb") {
				obj = "uk";
			}
			for(var i=0; i<arr.length; i++) {
				if (arr[i].toUpperCase() == obj.toUpperCase()) ret = true;
			}
		}
		return ret;
	}

	function privacyTakeAction() {
		//check if cookie_privacy_holder div exists and if not, create it
		if(!document.getElementById('cookie_privacy_holder')) {
			var holder = document.createElement("div");
			holder.id = "cookie_privacy_holder";

                        //add exception for store pages, where "cookie_privacy_holder" div is injected into the "storePrivacyBlock" div
			if(document.getElementById('storePrivacyBlock')){
                                   document.getElementById('storePrivacyBlock').appendChild(holder);
                        }
                        else {
                                   if (document.body.firstChild) {
                                          document.body.insertBefore(holder, document.body.firstChild);
                                   }
                                   else {
                                          document.body.appendChild(holder);
                                   }
                       }
		}

		if (!hpeuck_answer || hpeuck_answer == "0") { 
			if(typeof customCookiePrivacyMessage == 'function') { //if custom cookie privacy message is found, execute that function
				if(hpeuck_isInIFrame === false) {
					if (!isIE) {console.log("Using the custom popup");}
					customCookiePrivacyMessage();
				}
			}
			else if(hpeuck_isInIFrame === false) {
				if (!isIE) {console.log("Using the default popup");}
				cookiePrivacyMessage(); 
			}
			
			//track the banner display
			try {
				var locale = getLocaleArrayFromCookie();
				trackMetrics("newLinkExclGlobal", {name: locale['cc']+'_'+locale['ll']+'_hpeuck_banview_'+locale['cc']+'_'+locale['ll']+'_'+locale['mod'] });
			}catch(e) {}

			
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
			
                        //create an event when banner is loaded
			if (document.createEvent) {
				var privacyBannerLoaded = document.createEvent('Event');
				privacyBannerLoaded.initEvent('HP.PrivacyBanner.Loaded', true, true);
				document.dispatchEvent(privacyBannerLoaded);
			}
			else { //IE<9, cannot create custom event
				 privacyBannerLoadedFlag = true;
			}	

			doPrivacyFiletring();
		}
		else {
			if (!isIE) {console.log("Privacy cookie is already set to "+hpeuck_privacy);}
			doPrivacyFiletring();
		}
	}

	function privacyGetPageDomain() {
		var href = window.location.href;
		if(href.indexOf("http://") > -1 || href.indexOf("https://") > -1) { //if cookie domain can be detected
			var domain = href.split('/');
			var domain_name = domain[2];
			if(domain_name.indexOf(':') > 0) { //check if we have port number in the domain name
				var tmp = domain_name.split(':');
				domain_name = tmp[0];
			}
			var bits = domain_name.split('.');
			var cookie_domain = "."+bits[bits.length - 1];
			var accept_cookie = "0";
			for(i=bits.length-1; i>0; i--) {
				cookie_domain = '.'+bits[i-1]+cookie_domain;
				privacyCreateCookie(cookie_domain, "hpeuck_cktst","1");
				accept_cookie = privacyReadCookie("hpeuck_cktst");
				privacyEraseCookie("hpeuck_cktst");
				if (accept_cookie === "1") { break }
			}
			if(accept_cookie == 0) {
				cookie_domain = false;
			}
		}
		else { //the cookie domain is not detected
			cookie_domain = false;
		}
		if(!isIE) { console.log(cookie_domain); }
		return cookie_domain;
	}

	function cookiePrivacy() {
		//check if the user is accepting cookies
		var accept_cookie = "0";
		privacyCreateCookie(hpeuck_pageDomain, "hpeuck_cktst","1");
		accept_cookie = privacyReadCookie("hpeuck_cktst");
		privacyEraseCookie("hpeuck_cktst");
		if (accept_cookie == "1") {
			privacyTakeAction();
		}
		else {
			if (!isIE) {console.log("Browser is not accepting cookies");}
		}
	}
	
	function privacyExclude(domains) {
		var ret = false;
		var location = window.location.href;
		for(var i=0; i<domains.length; i++) {
			if(location.indexOf(domains[i]) > -1) {
				ret = true;
			}
		}
		return ret;
	}
	
	function privacyCheckReadyState() {
		if(document.readyState == "complete") {
			return true;
		}
		else {
			return false;
		}
	}
	
	function hpeuck_addOnloadEventOnPageReady() {
		if(!hpeuck_exclude && privacyCheckReadyState()) {
			cookiePrivacy();
			if (!isIE) {console.log("Launching the opt-in banner.");}
		}
		else {
			setTimeout(hpeuck_addOnloadEventOnPageReady,100);
		}
	}
	
	function hpeuck_getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	
	function hpeuck_getBannerHeight() {
		return document.getElementById('cookie_privacy_popup').offsetHeight;
	}
	
	function hpeuck_createXHR() {
		var xhr;
		
		if(window.XDomainRequest) {
			try {
				xhr = new window.XDomainRequest();
			}
			catch(e) {
				xhr = null;
			}
		}
		else {
			try {
				xhr = new XMLHttpRequest();
			}
			catch(e) {
				xhr = null;
			}
		}
		return xhr;
	}
	
	function hpeuck_localeCheck(ll, cc, locale_list) {
		var i = locale_list.length;
		cc = cc.toLowerCase();
		ll = ll.toLowerCase();
		if(cc == "gb") { cc = "uk"; }
		while (i--) {
			if (locale_list[i] == ll + '-' + cc) {
				if (!isIE) { console.log("CC-LL confirmed"); }
				return true;
			}
		}
		return false;
	}
	
	function hpeuck_detectUserLocale(banner_allowedCC, banner_allowedLL, isIE) {
		var cc = "";
		var ll = "";
		var locale = false;
		
		//check the JS locale object
		if(typeof window.locale == 'object' && window.locale['mod'] == "var") {
			locale = window.locale;
		}
		
		if(!locale) {//check the page url
			locale = privacyGetUrlLocale(hpeuck_locales, banner_allowedCC, banner_allowedLL);
		}
		
		if(!locale) {//try to get ll from HTML tag and ll from meta
			var lang = document.documentElement.lang;
			if(lang != null) {
				var tmp = lang.split("-");
				if (tmp.length > 1) { //lang attribute contains ll-cc
					ll = tmp[0];
					cc = tmp[1];
				}
				else { //lang attribute contains only ll
					ll = lang;
					cc = privacyGetMetaContent("target_country");
				}
				if (hpeuck_isLocaleEnabled(banner_allowedCC, cc) && hpeuck_isLocaleEnabled(banner_allowedLL, ll) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {  
					locale = new Array();
					locale['cc'] = cc;
					locale['ll'] = ll;
					locale['mod'] = "page_source";
					if (!isIE) { console.log("Locale detected from page source"); }
				}
			}
			else { //get the country from the meta tag and try to match the language
				cc = privacyGetMetaContent("target_country");
				ll = hpeuck_matchLanguage(cc, hpeuck_locales);
				if(ll) {
					if (hpeuck_isLocaleEnabled(banner_allowedCC, cc) && hpeuck_isLocaleEnabled(banner_allowedLL, ll) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "meta";
						if (!isIE) { console.log("Locale detected from meta information"); }
					}
				}
			}
		}
		
		if(!locale) {//try to get the language from the lang cookie
			var cookie_locale = privacyReadCookie("lang");
			if(cookie_locale != null) {
				var tmp = cookie_locale.split("-");
				if(tmp.length > 1) {//lang contains ll-cc combination
					cc = tmp[1];
					ll = tmp[0];
					if (hpeuck_isLocaleEnabled(banner_allowedLL, ll) && hpeuck_isLocaleEnabled(banner_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "lang_cookie";
						if (!isIE) { console.log("Locale detected from lang cookie"); }
					}
				}
			}
		}
		
		//detecting browser locale.
		if(isIE) { //for IE
			if(!locale) {
				//console.log("Trying to detect browser locale for IE browsers...");
				hpeuck_lc = privacyReadCookie("hpeuck_lc");
				if(!hpeuck_lc) { //if cookie is not present (also means that dynamic script call is not disabled)
					privacyCreateCookieSeconds(hpeuck_pageDomain, "hpeuck_lc","0", 3600000);
					//first disable the request to protect against request to dynamic script taking long time, time in which the user may navigate to other pages, initiating more requests
					
					//console.log("loading the dynamic jsp");
					if (document.location.protocol == "https:") { var heuck_jsp = "https://ssl.www8.hp.com/ww/en/system/include/privacy_cookie_dynamic.jsp";	}
					else { var heuck_jsp = "http://www8.hp.com/ww/en/system/include/privacy_cookie_dynamic.jsp"; }
					
					var trdnames = "stg.www8.hp.com|www8.hp.com|g4t0539a.houston.hp.com|g4t0577a.houston.hp.com|d9t0164g.houston.hp.com:30002|d9t0164g.houston.hp.com:30004"; 
					//pro stg|pro live|itg stage|itg live|dev2 stage|dev2 live
					var dm = trdnames.split('|');
					for(var k = dm.length-1; k >= 0; k = k - 1) {
						if(document.location.href.indexOf(dm[k]) != -1) {
							heuck_jsp = page_domain + "/ww/en/system/include/privacy_cookie_dynamic.jsp";
							break;
						}
					}
					
					privacyLoadScript(heuck_jsp, function () {
						//console.log("dynamic jsp loaded");
						hpeuck_lc = privacyReadCookie("hpeuck_lc");
						if(window.hpeuck_result == "unknown") { //if browser locale can't be detected by the dynamic script
							privacyCreateCookieSeconds(hpeuck_pageDomain, "hpeuck_lc","0", 3600000*24*30); //disable the call to dynamic script for 30 days
							//console.log("dynamic jsp can't determine the browser locale");
							//console.log("the call to dynamic jsp is disabled for 30 days");
						}
						else if(hpeuck_lc != "0" && hpeuck_lc != null) { //if we have result, extract cc/ll information
							//console.log("reading the results");
							var tmp = hpeuck_lc.split("-");
							cc = tmp[1];
							ll = tmp[0];
							if (hpeuck_isLocaleEnabled(banner_allowedLL, ll) && hpeuck_isLocaleEnabled(banner_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
								locale = new Array();
								locale['cc'] = cc;
								locale['ll'] = ll;
								locale['mod'] = "browser";
								
								//convert values to lower case
								if(locale['cc']) {locale['cc'] = locale['cc'].toLowerCase();}
								if(locale['ll']) {locale['ll'] = locale['ll'].toLowerCase();}
								//include workaround for GB cc
								if(locale['cc'] == "gb") {locale['cc'] = "uk";}
								//console.log("browser locale settings "+locale['cc']+"/"+locale['ll']+" | mod: "+locale['mod']);
								hpeuck_launch(locale, banner_allowedCC, banner_allowedLL, window.hpeuck_privacy, window.hpeuck_html, window.bannerText); //launch the banner
							}
						}
						else {
							//console.log("we have a problem with the dynamic jsp script: " + heuck_jsp);
						}
					});
				}
				else if(hpeuck_lc != "0" && hpeuck_lc != null) { //if there is result in the cookie
					//console.log("reading browser locale from hpeuck_lc cookie");
					var tmp = hpeuck_lc.split("-");
					cc = tmp[1];
					ll = tmp[0];
					if (hpeuck_isLocaleEnabled(banner_allowedLL, ll) && hpeuck_isLocaleEnabled(banner_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "browser";
						
					}
				}
			}
		}
		else { //for non IE browsers
			if(!locale) {//try to get the language from the browser settings
				var browserLang = (navigator.language) ? navigator.language : navigator.userLanguage;
				if(browserLang != null) {
					var tmp = browserLang.split("-");
					if(tmp.length > 1) {//browser lang contains ll-cc combination
						cc = tmp[1];
						ll = tmp[0];
						if (hpeuck_isLocaleEnabled(banner_allowedLL, ll) && hpeuck_isLocaleEnabled(banner_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
							locale = new Array();
							locale['cc'] = cc;
							locale['ll'] = ll;
							locale['mod'] = "browser";
							if (!isIE) { console.log("Locale detected from browser"); }
						}
					}
				}
			}
		}
		
		//convert values to lower case
		if(locale['cc']) {locale['cc'] = locale['cc'].toLowerCase();}
		if(locale['ll']) {locale['ll'] = locale['ll'].toLowerCase();}
		//include workaround for GB cc
		if(locale['cc'] == "gb") {locale['cc'] = "uk";}
		
		if (!isIE) { console.log("Detected locale ("+locale['mod']+"): "+locale['cc']+"/"+locale['ll']); }
		
		return locale;
	}
	
	function hpeuck_matchLanguage(cc, llCCArray) {
		var result = false;
		var tmp = "";

		//for(var i in llCCArray) {
		for(var i=0; i<llCCArray.length; i++) {

			tmp = llCCArray[i].split("-");
			if(cc == tmp[1]) {
				result = tmp[0];
				break;
			}
		}
		return result;
	}
	
	function hpeuck_launch(locale, banner_allowedCC, banner_allowedLL, hpeuck_privacy, hpeuck_html, bannerText) {
		if(locale) {
			var hpeuck_index = hpeuck_getIndexForLocale(locale['cc'], locale['ll'], banner_allowedCC, banner_allowedLL);
			
			if(!hpeuck_privacy || hpeuck_answer == 0) {
				
				window.hpeuck_privacy = bannerText[hpeuck_index][0];
				privacyCreateCookie(hpeuck_pageDomain, "hpeuck_prefs",hpeuck_privacy, 365);
				if (!isIE) {console.log("Default settings for country: "+hpeuck_privacy);}
			}
			
			window.hpeuck_html = hpeuck_localizeInterface(hpeuck_html, bannerText, hpeuck_index);
			
			hpeuck_addOnloadEventOnPageReady();
		}
		else {
			if (!isIE) { console.log("Privacy banner is not enabled.");	}
		}
	}
	
	function hpeuck_mobileDetect() {
		var result = false;
		var nav = navigator.userAgent.toLowerCase();
		if (nav.match(/iphone|ipod|ipad|android|webos|iemobile|blackberry/i)) {result = true;}
		return result;
	}
	
	function privacyGetCookieStatistics(locale) {
		var ca = document.cookie.split(';');
		var cSize = 0;
		var statistics = ca.length;
		
		for(var i=0;i < ca.length;i++) {
			var pair = ca[i].split('=');
			pair[0] = pair[0].replace(/ /,"");
			pair[1] = pair[1].replace(/ /,"");
			cSize = cSize + pair[0].length + pair[1].length;
		}
		statistics = statistics+"_"+cSize+"B";
		
		var hpeuck_load_time = Date.now()-window.performance.timing.navigationStart;
		var cc_ll = "";
		if(locale['cc'] && locale['ll']) {
			cc_ll = locale['cc'] + "-" + locale['ll'] + "_";
		}
		var prefix = cc_ll;
		try {
			if(!hpmmd.page.name) {
				prefix = prefix + "cktrk_other_";
			}
			else if(hpmmd.page.name == "welcome-home") { //check if we are on the homepage
				prefix = prefix + "cktrk_homepage_";
			}
		}
		catch(e) {}
		statistics = prefix + statistics + "_" + hpeuck_load_time + "ms";
		
		return statistics;
	}

	var hpeuck_minHeight = 0;
	var hpeuck_maxHeight = 0;
	
	var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;//All IE
	
	exDomains.shift();
	var hpeuck_exclude = privacyExclude(exDomains);
	
	var hpeuck_lc = privacyReadCookie("hpeuck_lc");
	
	var hpeuck_isInIFrame = (self!=window) ? true : false;
	var hpeuck_pageDomain = privacyGetPageDomain();
	
	if(hpeuck_pageDomain) { //if the domain is detected, execute logic
	
		var hpeuck_answer = privacyReadCookie('hpeuck_answ');
		if(!hpeuck_answer) {
			hpeuck_answer = 0;
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_answ","0", 365);
		}
		
		var hpeuck_locale = hpeuck_detectUserLocale(banner_allowedCC, banner_allowedLL, isIE);
		if (!isIE) { console.log("hpeuck_locale: " + hpeuck_locale['cc'] + " | " + hpeuck_locale['ll'] + " | " + hpeuck_locale['mod']); }
		
		if(hpeuck_locale) {
			hpeuck_locale['cc'] = hpeuck_locale['cc'].toLowerCase();
			hpeuck_locale['ll'] = hpeuck_locale['ll'].toLowerCase();
			var hpeuck_index = hpeuck_getIndexForLocale(hpeuck_locale['cc'], hpeuck_locale['ll'], banner_allowedCC, banner_allowedLL);
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_locale_ar",hpeuck_locale['cc']+'|'+hpeuck_locale['ll']+'|'+hpeuck_locale['mod'], 0);
			
			//if a custom privacy link is specified
			if(typeof window.hpeuck_privacy_link !== 'undefined') {
				bannerText[hpeuck_index][14] = bannerText[hpeuck_index][14].replace(/http(.*)html/, window.hpeuck_privacy_link);
			}
		}
		else {
			if (!isIE) {console.log("no locale information");}
		}
		
		var hpeuck_privacy = privacyReadCookie('hpeuck_prefs');
		if(hpeuck_privacy == "11nullnull") {
			hpeuck_privacy = bannerText[hpeuck_index][0];
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_prefs",hpeuck_privacy, 365);
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_answ","0", 365);
			hpeuck_answer = privacyReadCookie('hpeuck_answ');
		}
		
		var hpeuck_mobile = hpeuck_mobileDetect();
		
		if (hpeuck_locale){
			
			if(!hpeuck_privacy || hpeuck_answer == 0) {
				
				hpeuck_privacy = bannerText[hpeuck_index][0];
				privacyCreateCookie(hpeuck_pageDomain, "hpeuck_prefs",hpeuck_privacy, 365);
				if (!isIE) {console.log("Default settings for country: "+hpeuck_privacy);}
			}
			
			if((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile){ //use responsive template for pages using responsive CaaS or mobile pages
							if(hpeuck_locale['cc'] == "uk" && hpeuck_locale['ll'] == "en") { //use different template for uk/en
									hpeuck_html = hpeuck_localizeInterface(hpeuck_html_r_uk, bannerText, hpeuck_index);
					
					   //define the customCookiePrivacyMessage for responsive
					  var customCookiePrivacyMessage = function() {
					   var sheet = document.createElement("style");
						var style = hpeuck_css_r_uk;
						document.getElementsByTagName("head")[0].appendChild(sheet);
					try {
						sheet.innerText=style;
						sheet.innerHTML=style;
					}
					catch(e) {
						sheet.styleSheet.cssText=style;
					}
							
					document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
					
					//get the opened height
					hpeuck_maxHeight = hpeuck_getBannerHeight();
					
					//get the closed height
					//document.getElementById('privacyShowDetails').style.display = "none";
					hpeuck_minHeight = hpeuck_getBannerHeight();
					
					//set the dimensions
					document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
					}
							}
				else if (hpeuck_locale['cc'] == "mx" && hpeuck_locale['ll'] == "es") {
					//use different template for mx/es
						hpeuck_html = hpeuck_localizeInterface(hpeuck_html_r_mx, bannerText, hpeuck_index);
					
					   //define the customCookiePrivacyMessage for responsive
					  var customCookiePrivacyMessage = function() {
					   var sheet = document.createElement("style");
						var style = hpeuck_css_r_uk;
						document.getElementsByTagName("head")[0].appendChild(sheet);
					try {
						sheet.innerText=style;
						sheet.innerHTML=style;
					}
					catch(e) {
						sheet.styleSheet.cssText=style;
					}
							
					document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
					
					//get the opened height
					hpeuck_maxHeight = hpeuck_getBannerHeight();
					
					//get the closed height
						document.getElementById('privacyShowDetails').style.display = "none";
						hpeuck_minHeight = hpeuck_getBannerHeight();
						
						//set the dimensions
						document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
						window.onresize=function(){
							if ((document.getElementById('privacyShowDetails').style.display == "block") && (window.innerWidth<497)) {
										  document.getElementById('privacyShowDetails').style.display = "none";
										  document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
										  document.getElementById("plus_minus").innerHTML = "+ ";
							}                                                     
						};
				 }}
				 else {
									hpeuck_html = hpeuck_localizeInterface(hpeuck_html_r, bannerText, hpeuck_index);
					
					//define the customCookiePrivacyMessage for responsive
					var customCookiePrivacyMessage = function() {
						var sheet = document.createElement("style");
						var style = hpeuck_css_r;
						document.getElementsByTagName("head")[0].appendChild(sheet);
						try {
							sheet.innerText=style;
							sheet.innerHTML=style;
						}
						catch(e) {
							sheet.styleSheet.cssText=style;
						}
								
						document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
						
						//get the opened height
						hpeuck_maxHeight = hpeuck_getBannerHeight();
						
						//get the closed height
						document.getElementById('privacyShowDetails').style.display = "none";
						hpeuck_minHeight = hpeuck_getBannerHeight();
						
						//set the dimensions
						document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
						window.onresize=function(){
							if ((document.getElementById('privacyShowDetails').style.display == "block") && (window.innerWidth<497)) {
										  document.getElementById('privacyShowDetails').style.display = "none";
										  document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
										  document.getElementById("plus_minus").innerHTML = "+ ";
							}                                                     
						};
						hpeuck_preselectAnswers(hpeuck_privacy);
					}
							   }
			}
			else if(hpeuck_locale['cc'] == "mx" && hpeuck_locale['ll'] == "es") { //use different template for mx/es
				hpeuck_html = hpeuck_localizeInterface(hpeuck_html_mx, bannerText, hpeuck_index);
				
				//define the customCookiePrivacyMessage for mx/es
				var customCookiePrivacyMessage = function() {
					var sheet = document.createElement("style");
					var style = hpeuck_css_mx;
					document.getElementsByTagName("head")[0].appendChild(sheet);
					try {
						sheet.innerText=style;
						sheet.innerHTML=style;
					}
					catch(e) {
						sheet.styleSheet.cssText=style;
					}
							
					document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
					
					//get the opened height
					hpeuck_maxHeight = hpeuck_getBannerHeight();
					
					//get the closed height
					document.getElementById('privacyShowDetails').style.display = "none";
					hpeuck_minHeight = hpeuck_getBannerHeight();
					
					//set the dimensions
					document.getElementById('cookie_privacy_holder').style.paddingTop = hpeuck_minHeight+"px";
					document.getElementById('cookie_privacy_popup').style.height = hpeuck_minHeight+"px";
				}
			}
			else if(hpeuck_locale['cc'] == "uk" && hpeuck_locale['ll'] == "en") { //use different template for uk/en
				hpeuck_html = hpeuck_localizeInterface(hpeuck_html_uk, bannerText, hpeuck_index);
				
				//define the customCookiePrivacyMessage for mx/es
				var customCookiePrivacyMessage = function() {
					var sheet = document.createElement("style");
					var style = hpeuck_css_uk;
					document.getElementsByTagName("head")[0].appendChild(sheet);
					try {
						sheet.innerText=style;
						sheet.innerHTML=style;
					}
					catch(e) {
						sheet.styleSheet.cssText=style;
					}
							
					document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
					
					//get the opened height
					hpeuck_maxHeight = hpeuck_getBannerHeight();
					
					//get the closed height
					document.getElementById('privacyShowDetails').style.display = "none";
					hpeuck_minHeight = hpeuck_getBannerHeight();
					
					//set the dimensions
					document.getElementById('cookie_privacy_holder').style.paddingTop = hpeuck_minHeight+"px";
					document.getElementById('cookie_privacy_popup').style.height = hpeuck_minHeight+"px";
				}
			}
			else {
				hpeuck_html = hpeuck_localizeInterface(hpeuck_html, bannerText, hpeuck_index);
			}


			/* show privacy banner - execute cookiePrivacy() - by setting this var to true
			   It will be picked up by a function executing onready event at the end of privacy JS */
			if (!hpeuck_exclude) {
				show_privacyBanner = true;
			}


		}
		else if(hpeuck_answer == 1) { //if the banner is not enabled on the country, but the user has set preferences
			if (!isIE) { console.log("Privacy banner settings are set: "+hpeuck_privacy);	}
			if (!isIE) { console.log("Executing cleanup logic.");	}
			doPrivacyFiletring();
		}
		else {
			if (!isIE) { console.log("Privacy banner is not enabled.");	}
			//if (!isIE && window.performance) { console.log(privacyGetCookieStatistics(locale));}
		}
	}
	
	function hpeuck_cookie_privacy_launch() {
		var hpeuck_locale = hpeuck_detectUserLocale(banner_allowedCC, banner_allowedLL, isIE);
		if (hpeuck_locale && !hpeuck_exclude) { //if we have proper locale and domain is not on excluded list
			//splitMessage();
			cookiePrivacy();
		}
	}

	
/* Commenting the below code as AU Notice banner as part of notice removal story */
/////////////////////////////////////////////	
///////////////////////////// aunotice //////
/////////////////////////////////////////////

	///// config:
// 	var aunotice_locales = ['en-au'];
// 	var aunotice_allowedCC = ['au'];
// 	var aunotice_allowedLL = ['en'];
// 	var hpeuck_locale = false;

// 	if (!isIE) { console.log("aunotice logic start"); }

// 	function aunoticeTrimStr(str) {
// 		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
// 	}

// 	// aunotice function to check if websection id of page is on exception list
// 	function aunoticeExcludeWebsection(websections) {
// 		var ret = false;
// 		var websectionid = privacyGetMetaContent("web_section_id");

// 		if (websectionid) {
// 			for(var i=0; i<websections.length; i++) {
// 				if(aunoticeTrimStr(websectionid).toLowerCase() == aunoticeTrimStr(websections[i].toLowerCase()) ) {
// 					ret = true;
// 					if (!isIE) { console.log("aunotice websection exception match: " + websections[i]); }
// 				}
// 			}
// 		}
// 		return ret;
// 	}


// 	// aunotice function to detect locale - based on url (searching for cc/ll string), html lang arg, or target_country metatag.
// 	function aunotice_detectUserLocale(aunotice_allowedCC, aunotice_allowedLL, isIE) {
// 		var cc = "";
// 		var ll = "";
// 		var hpeuck_locale = false;

// 		//check the page url
// 		hpeuck_locale = privacyGetUrlLocale(aunotice_locales, aunotice_allowedCC, aunotice_allowedLL);

// 		if(!hpeuck_locale) {//try to get ll from HTML tag and ll from meta
// 			var lang = document.documentElement.lang;
// 			if(lang != null) {
// 				var tmp = lang.split("-");
// 				if (tmp.length > 1) { //lang attribute contains ll-cc
// 					ll = tmp[0];
// 					cc = tmp[1];
// 				}
// 				else { //lang attribute contains only ll
// 					ll = lang;
// 					cc = privacyGetMetaContent("target_country");
// 				}
// 				if (hpeuck_isLocaleEnabled(aunotice_allowedCC, cc) && hpeuck_isLocaleEnabled(banner_allowedLL, ll)) {  
// 					hpeuck_locale = new Array();
// 					hpeuck_locale['cc'] = cc;
// 					hpeuck_locale['ll'] = ll;
// 					hpeuck_locale['mod'] = "page_source";
// 					if (!isIE) { console.log("aunotice Locale detected from page source"); }
// 				}
// 			}
// 		}

// 		if(!hpeuck_locale) {//get the country from the meta tag and try to match the language
// 			cc = privacyGetMetaContent("target_country");
// 			if(cc) {
// 				ll = hpeuck_matchLanguage(cc, aunotice_locales);
// //alert("ll " + ll);
// 				if(ll) {
// 					if (hpeuck_isLocaleEnabled(aunotice_allowedCC, cc) && hpeuck_isLocaleEnabled(aunotice_allowedLL, ll)) {
// 						hpeuck_locale = new Array();
// 						hpeuck_locale['cc'] = cc;
// 						hpeuck_locale['ll'] = ll;
// 						hpeuck_locale['mod'] = "meta";
// 						if (!isIE) { console.log("aunotice Locale detected from meta information"); }
// 					}
// 				}
// 			}
// 		}
// //alert(locale['cc'] + "/" + locale['ll']);
// 		if (!isIE) { console.log("aunotice Detected locale ("+hpeuck_locale['mod']+"): "+hpeuck_locale['cc']+"/"+hpeuck_locale['ll']); }
// 		return hpeuck_locale;
// 	}

// 	function aunoticeLoadPopup() {
// 		var popurl="http://h20426.www2.hp.com/program/au/en/important-notice.html";
// 		winpops=window.open(popurl,"","width=540,height=500,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1");
// 	}
    
// 	function aunoticeShowPageNotice() {
// 		if(privacyCheckReadyState()) {
// //alert("hejhoX");
// 			var notice_holder = document.createElement("div");
// 			notice_holder.id = "notice_holder";
// 			notice_holder.style.background = "#000";
// 			notice_holder.style.width= "100%";
//             var hpnotice_html = "";
// 			var hpnotice_css = "";
// 			//if((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile) {
// 				hpnotice_html = "<div id=\"inacr\" style=\"background-color: #000;color: #FFF;padding: 10px;font-family: 'Times New Roman',Times,serif; text-align: center; margin: 0 auto; max-width: 1000px;\"><a style=\"color: #FFFFFF;text-decoration: none;\" target=\"_blank\" href=\"http://www8.hp.com/au/en/ad/consumer_guarantees/warranty-policy.html?jumpid=in_r11566_au/en/hho/pps/pl_gi_ob_ds_pd/Important-notice_cc/dt\">IMPORTANT NOTICE ABOUT CONSUMER RIGHTS</a></div>";
// 				hpnotice_css = "@media only screen and (max-width: 20em) { #notice_holder { font-size: 0.75em; padding: 0px;}}\
// 								@media only screen and (min-width: 20.0001em) and (max-width: 31em) {#notice_holder { font-size: 0.75em; padding: 0;}}\
// 								@media only screen and (min-width: 31.0001em) and (max-width: 50em) { #notice_holder { font-size: 1em; padding: 0;}}\
// 								@media only screen and (min-width: 50.0001em) { #notice_holder { font-size: 1em; padding: 0;}}";
// 			//}
// 			/*
// 			else {
// 				if (document.location.protocol == "https:") {
// 					 hpnotice_html = "<div style=\"height:34px; margin:0 auto; width: 1000px;\"><a target=\"_new\" href=\"http://www8.hp.com/au/en/ad/consumer_guarantees/warranty-policy.html?jumpid=in_r11566_au/en/hho/pps/pl_gi_ob_ds_pd/Important-notice_cc/dt\"><img src=\"https://ssl.www8.hp.com/ww/en/images/i/important-notice-large.jpg\" alt=\"IMPORTANT NOTICE ABOUT CONSUMER RIGHTS\" style=\"border: 0px solid ; width: 1000px; height: 34px; float: left;\"></a><div>";
	
// 				} else {
// 					 hpnotice_html = "<div style=\"height:34px; margin:0 auto; width: 1000px;\"><a target=\"_new\" href=\"http://www8.hp.com/au/en/ad/consumer_guarantees/warranty-policy.html?jumpid=in_r11566_au/en/hho/pps/pl_gi_ob_ds_pd/Important-notice_cc/dt\"><img src=\"http://www.www8-hp.com/ww/en/images/i/important-notice-large.jpg\" alt=\"IMPORTANT NOTICE ABOUT CONSUMER RIGHTS\" style=\"border: 0px solid ; width: 1000px; height: 34px; float: left;\"></a><div>";
	
// 				}
// 			}
// 			*/
// 			if (document.body.firstChild) {
// 					if (document.getElementById('cookie_privacy_holder'))
// 						document.getElementById('cookie_privacy_holder').parentNode.insertBefore(notice_holder, document.getElementById('cookie_privacy_holder').nextSibling);
// 					else 
// 						document.body.insertBefore(notice_holder, document.body.firstChild);
// 			}
// 			else
// 					document.body.appendChild(notice_holder);
// 			document.getElementById('notice_holder').innerHTML += hpnotice_html;
// 			if (!isIE) {console.log("Show aunotice notice.");}
// 		}
// 		else {
// 			setTimeout(aunoticeShowPageNotice,100);
// 		}
		
// 	}
// 	// Function to execute the aunotice logic
// 	function aunoticeTakeAction() {
		
// 		aunotice_company_code = privacyGetMetaContent("company_code");
// 		aunotice_hp_inav_version = privacyGetMetaContent("hp_inav_version");

// 		if(hpeuck_pageDomain.indexOf("hpe.com") == -1) { //domain check

// 			// check if company_code and hp_inav_version metadata did not exist on the page:
// 			if(aunotice_company_code == false) {
// 				aunotice_company_code = "";
// 			}
// 			if(aunotice_hp_inav_version == false) {
// 				aunotice_hp_inav_version = "_no_hp_inav_version";
// 			}


// 			if(aunotice_company_code == "hpe" || aunotice_hp_inav_version.indexOf("ehfcaas") == 0) {

// 				if (!isIE) {console.log("AU Notice: not showing AU notice, HPE company code or HPE CaaS detected.");}

// 			}
// 			else {

// 				/******* SHOWING AU NOTICE *******/
// 				aunoticeShowPageNotice();

// 			}

// 		}
// 		else {
// 			if (!isIE) {console.log("AU Notice: not showing AU notice for HPE domain "+hpeuck_pageDomain);}
// 		}

// 		// Execute popup logic:
// 		//alert(document.cookie.indexOf('aunoticepoppedup'));
// //		if (!privacyReadCookie('aunoticepoppedup')){
// //			document.cookie="aunoticepoppedup=yes; path=/; domain=hp.com";
// //			aunoticeLoadPopup();
// 			//alert(document.cookie.indexOf('aunoticepoppedup'));
// //		}

// 	}
	
// 	// Try to detect aunotice hpeuck_locale
// 	var hpeuck_locale = aunotice_detectUserLocale(aunotice_allowedCC, aunotice_allowedLL, isIE);

// 	aunotice_exDomains.shift();
// 	aunotice_exWebsections.shift();

// 	// If hpeuck_locale is detected, we can launch the aunotice logic; verifying we're not falling under any of the exceptions
// 	if (hpeuck_locale && (!privacyExclude(aunotice_exDomains)) && (!aunoticeExcludeWebsection(aunotice_exWebsections)) ) {

// 		/* show AU banner - aunoticeTakeAction() - by setting this var to true
// 		  It will be picked up by a function executing onready event at the end of privacy JS */
// 		show_auBanner = true;
// 	}
}
var bannern_locales = ['en-emea_africa','fr-emea_africa','sq-al','ar-dz','fr-dz','pt-ao','es-ar','hy-am','en-asia_pac','en-au','de-at','az-az','bn-bd','ru-by','nl-be','fr-be','es-bo','bs-ba','en-bw','pt-br','bg-bg','en-ca','fr-ca','en-lamerica_nsc_carib','es-lamerica_nsc_cnt_amer','es-cl','zh-cn','es-co','fr-cg','hr-hr','el-cy','cs-cz','da-dk','es-ec','et-ee','en-et','en-emea_europe','fr-emea_europe','de-emea_europe','fe-fg','fi-fi','fr-fr','ge-ge','de-de','en-gh','el-gr','en-hk','zh-hk','hu-hu','is-is','en-in','en-id','en-ie','en-il','he-il','it-it','ja-jp','ru-kz','en-ke','ko-kr','sq-ks','lv-lv','lt-lt','fr-lu','mk-mk','en-my','en-mt','en-mu','es-mx','ar-emea_middle_east','en-emea_middle_east','ro-md','sr-me','ar-ma','fr-ma','pt-mz','nl-nl','en-nz','en-ng','no-no','en-pk','es-py','es-pe','en-ph','pl-pl','pt-pt','es-pr','ro-ro','ru-ru','ar-sa','en-sa','fr-sn','sr-rs','en-sg','sk-sk','sl-si','en-za','es-es','si-lk','sv-se','fr-ch','de-ch','zh-tw','en-tz','sw-tz','en-th','th-th','ar-tn','fr-tn','tr-tr','ru-tm','en-ug','sw-ug','ru-ua','uk-ua','en-ae','en-uk','en-us','es-us','es-uy','es-ve','en-vn','vi-vn'];
var bannern_allowedLL = ['en','fr','sq','ar','fr','pt','es','hy','en','en','de','az','bn','ru','nl','fr','es','bs','en','pt','bg','en','fr','en','es','es','zh','es','fr','hr','el','cs','da','es','et','en','en','fr','de','fe','fi','fr','ge','de','en','el','en','zh','hu','is','en','en','en','en','he','it','ja','ru','en','ko','sq','lv','lt','fr','mk','en','en','en','es','ar','en','ro','sr','ar','fr','pt','nl','en','en','no','en','es','es','en','pl','pt','es','ro','ru','ar','en','fr','sr','en','sk','sl','en','es','si','sv','fr','de','zh','en','sw','en','th','ar','fr','tr','ru','en','sw','ru','uk','en','en','en','es','es','es','en','vi'];
var bannern_allowedCC = ['emea_africa','emea_africa','al','dz','dz','ao','ar','am','asia_pac','au','at','az','bd','by','be','be','bo','ba','bw','br','bg','ca','ca','lamerica_nsc_carib','lamerica_nsc_cnt_amer','cl','cn','co','cg','hr','cy','cz','dk','ec','ee','et','emea_europe','emea_europe','emea_europe','fg','fi','fr','ge','de','gh','gr','hk','hk','hu','is','in','id','ie','il','il','it','jp','kz','ke','kr','ks','lv','lt','lu','mk','my','mt','mu','mx','emea_middle_east','emea_middle_east','md','me','ma','ma','mz','nl','nz','ng','no','pk','py','pe','ph','pl','pt','pr','ro','ru','sa','sa','sn','rs','sg','sk','si','za','es','lk','se','ch','ch','tw','tz','tz','th','th','tn','tn','tr','tm','ug','ug','ua','ua','ae','uk','us','us','uy','ve','vn','vn'];
var footerTxtBeforeLink = new Array();
footerTxtBeforeLink[0] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[1] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[2] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[3] = new Array('<strong>معلومة هامة:</strong> تم تحديث بيان الخصوصية الخاص بنا.  للاطلاع على بيان الخصوصية الحالي الخاص بنا وعلى طريقة تجميع المعلومات واستخدامها من قبل HP Inc.‎‏، الرجاء النقر');

footerTxtBeforeLink[4] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[5] = new Array('<strong>Informação importante:</strong> A nossa Declaração de Privacidade foi atualizada. Para rever a nossa Declaração de Privacidade atual e compreender como a HP Inc. recolhe e utiliza as informações, por favor clique ');

footerTxtBeforeLink[6] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[7] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[8] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[9] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[10] = new Array('<strong>Wichtiger Hinweis:</strong> Unsere Datenschutzerklärung wurde aktualisiert. Klicken Sie bitte auf den ');

footerTxtBeforeLink[11] = new Array('<strong>Важная информация:</strong> Обновлено заявление о конфиденциальности.  Чтобы просмотреть заявление о конфиденциальности и разобраться в процедуре сбора и использования информации компанией HP Inc., перейдите по этой');

footerTxtBeforeLink[12] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[13] = new Array('<strong>Важная информация:</strong> Обновлено заявление о конфиденциальности.  Чтобы просмотреть заявление о конфиденциальности и разобраться в процедуре сбора и использования информации компанией HP Inc., перейдите по этой');

footerTxtBeforeLink[14] = new Array('<strong>Belangrijk:</strong> Onze privacyverklaring is aangepast. Om de actuele privacyverklaring te lezen, met informatie over hoe HP Inc. informatie verzamelt en gebruikt, klikt u');

footerTxtBeforeLink[15] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[16] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[17] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[18] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[19] = new Array('<strong>Informações importantes:</strong> nossa Declaração de Privacidade foi atualizada. Para ver nossa Declaração de Privacidade atual e compreender como a HP Inc. coleta e usa informações, clique');

footerTxtBeforeLink[20] = new Array('<strong>Важна информация:</strong> Декларацията ни за поверителност беше актуализирана. За да прегледате актуалната ни Декларация за поверителност и да разберете как HP Inc. събира и използва информация, моля, кликнете ');

footerTxtBeforeLink[21] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[22] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer');

footerTxtBeforeLink[23] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[24] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[25] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[26] = new Array('<strong>重要消息</strong> 我们的隐私声明已经更新，如需查看现行的隐私声明并了解 HP Inc. 的数据收集和使用情况，请点击');

footerTxtBeforeLink[27] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[28] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[29] = new Array('<strong>Važne informacije:</strong> naša je Izjava o zaštiti privatnosti ažurirana. Da biste pročitali našu trenutnu Izjavu o zaštiti privatnosti i shvatili kako HP Inc. prikuplja i koristi vaše podatke, kliknite');

footerTxtBeforeLink[30] = new Array('<strong>Σημαντική πληροφορία:</strong> Η Δήλωση προστασίας προσωπικών δεδομένων μας έχει ενημερωθεί.  Για να διαβάσετε την τρέχουσα Δήλωση προσωπικών δεδομένων μας και για να κατανοήσετε τον τρόπο με τον οποίο η HP Inc. συλλέγει και χρησιμοποιεί πληροφορίες, κάντε κλικ');

footerTxtBeforeLink[31] = new Array('<strong>Důležité oznámení:</strong> Naše prohlášení o ochraně osobních údajů bylo aktualizováno. Chcete-li si jeho aktuální znění přečíst a seznámit se s tím, jak společnost HP Inc. shromažďuje a používá údaje, ');

footerTxtBeforeLink[32] = new Array('<strong>Vigtige oplysninger:</strong> Vores Erklæring om beskyttelse af personlige oplysninger er blevet opdateret. For at se vores nuværende Erklæring om beskyttelse af personlige oplysninger og for at forstå, hvordan HP Inc. indsamler og anvender oplysninger bedes du klikke');

footerTxtBeforeLink[33] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[34] = new Array('<strong>Oluline teave:</strong> meie privaatsusavaldust on värskendatud. Praeguse privaatsusavalduse ülevaateks ja arusaamiseks, kuidas HP Inc. teavet kogub ning kasutab, klõpsake ');

footerTxtBeforeLink[35] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[36] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[37] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[38] = new Array('<strong>Wichtiger Hinweis:</strong> Unsere Datenschutzerklärung wurde aktualisiert. Klicken Sie bitte auf den ');

footerTxtBeforeLink[39] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[40] = new Array('<strong>Tärkeää tietoa:</strong> Tietosuojalausuntomme on päivitetty. Nykyistä tietosuojalausuntoamme ja HP Inc:n tapaa kerätä ja käyttää tietoja voi tarkastella napsauttamalla');

footerTxtBeforeLink[41] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[42] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[43] = new Array('<strong>Wichtiger Hinweis:</strong> Unsere Datenschutzerklärung wurde aktualisiert. Klicken Sie bitte auf den ');

footerTxtBeforeLink[44] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[45] = new Array('<strong>Σημαντική πληροφορία:</strong> Η Δήλωση προστασίας προσωπικών δεδομένων μας έχει ενημερωθεί.  Για να διαβάσετε την τρέχουσα Δήλωση προσωπικών δεδομένων μας και για να κατανοήσετε τον τρόπο με τον οποίο η HP Inc. συλλέγει και χρησιμοποιεί πληροφορίες, κάντε κλικ');

footerTxtBeforeLink[46] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[47] = new Array('<strong>重要資訊：</strong>我們的私隱聲明已更新。如要檢視我們目前的私隠聲明，並且瞭解  HP Inc. 如何收集及使用資料，請點擊');

footerTxtBeforeLink[48] = new Array('<strong>Fontos információ:</strong> Az adatvédelmi nyilatkozatunkat frissítettük. Az aktuális adatvédelmi nyilatkozat áttekintéséhez, illetve a HP Inc. információgyűjtési és -felhasználási eljárásainak megismeréséhez kattintson ');

footerTxtBeforeLink[49] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[50] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[51] = new Array('<strong>Informasi Penting:</strong> Pernyataan Privasi kami telah diperbarui. Untuk membaca Pernyataan Privasi kami yang berlaku saat ini dan untuk memahami cara HP Inc. mengumpulkan dan menggunakan informasi, silakan klik');

footerTxtBeforeLink[52] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[53] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[54] = new Array('</strong>מידע חשוב:<strong> הצהרת הפרטיות שלנו עודכנה. כדי לסקור את הצהרת הפרטיות הנוכחית, וכדי להבין כיצד HP Inc.‎ אוספת מידע ומשתמשת בו, ');

footerTxtBeforeLink[55] = new Array('<strong>Informazioni importanti:</strong> la nostra Informativa sulla privacy è stata aggiornata. Per visualizzare l attuale Informativa sulla privacy e sapere come HP Inc. raccoglie e utilizza le informazioni, fare clic');

footerTxtBeforeLink[56] = new Array('<strong>重要な情報:</strong> 当社の個人情報保護方針が更新されました。当社の現在の個人情報保護方針を確認し、HP Inc.がどのように情報の収集と利用を行っているかを知るには、');

footerTxtBeforeLink[57] = new Array('<strong>Важная информация:</strong> Обновлено заявление о конфиденциальности.  Чтобы просмотреть заявление о конфиденциальности и разобраться в процедуре сбора и использования информации компанией HP Inc., перейдите по этой');

footerTxtBeforeLink[58] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[59] = new Array('<strong>중요 정보:</strong> 개인정보 보호정책이 업데이트되었습니다. 최신 개인정보 보호정책을 검토하고 HP Inc.에서 정보를 수집 및 사용하는 방식에 대해 알아보려면');

footerTxtBeforeLink[60] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[61] = new Array('<strong>Svarīga informācija:</strong> paziņojums par konfidencialitāti ir atjaunināts.  Lai pārskatītu pašreizējo paziņojumu par konfidencialitāti un izprastu, kā HP Inc. apkopo un lieto informāciju, lūdzu, noklikšķiniet ');

footerTxtBeforeLink[62] = new Array('<strong>Svarbi informacija:</strong> mūsų privatumo patvirtinimas buvo atnaujintas. Norėdami peržiūrėti dabartinį privatumo patvirtinimą ir suprasti, kaip „HP Inc.“ renka ir naudoja informaciją, spustelėkite ');

footerTxtBeforeLink[63] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[64] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[65] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[66] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[67] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[68] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[69] = new Array('<strong>معلومة هامة:</strong> تم تحديث بيان الخصوصية الخاص بنا.  للاطلاع على بيان الخصوصية الحالي الخاص بنا وعلى طريقة تجميع المعلومات واستخدامها من قبل HP Inc.‎‏، الرجاء النقر');

footerTxtBeforeLink[70] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[71] = new Array('<strong>Informaţii importante:</strong> Declaraţia noastră de confidenţialitate a fost actualizată. Pentru a examina Declaraţia noastră curentă de confidenţialitate şi a înţelege modul în care HP Inc. colectează şi utilizează informaţii, faceţi clic ');

footerTxtBeforeLink[72] = new Array('<strong>Važne informacije:</strong> Ažurirali smo izjavu o privatnosti. Da biste pregledali aktuelnu izjavu o privatnosti i saznali kako HP Inc. prikuplja i koristi informacije, kliknite ');

footerTxtBeforeLink[73] = new Array('<strong>معلومة هامة:</strong> تم تحديث بيان الخصوصية الخاص بنا.  للاطلاع على بيان الخصوصية الحالي الخاص بنا وعلى طريقة تجميع المعلومات واستخدامها من قبل HP Inc.‎‏، الرجاء النقر');

footerTxtBeforeLink[74] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[75] = new Array('<strong>Informação importante:</strong> A nossa Declaração de Privacidade foi atualizada. Para rever a nossa Declaração de Privacidade atual e compreender como a HP Inc. recolhe e utiliza as informações, por favor clique ');

footerTxtBeforeLink[76] = new Array('<strong>Belangrijk:</strong> Onze privacyverklaring is aangepast. Om de actuele privacyverklaring te lezen, met informatie over hoe HP Inc. informatie verzamelt en gebruikt, klikt u');

footerTxtBeforeLink[77] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[78] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[79] = new Array('<strong>Viktig informasjon:</strong> Vår personvernerklæring har blitt oppdatert. Hvis du vil gjennomgå vår gjeldende personvernerklæring og forstå hvordan HP Inc. innhenter og bruker informasjon, kan du klikke');

footerTxtBeforeLink[80] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[81] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[82] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[83] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[84] = new Array('<strong>Ważna informacja:</strong> Nasza polityka prywatności została zaktualizowana. Chcąc zapoznać się z jej bieżącą treścią i dowiedzieć się, jak HP Inc. zbiera oraz wykorzystuje dane użytkownika, prosimy kliknąć ');

footerTxtBeforeLink[85] = new Array('<strong>Informação importante:</strong> A nossa Declaração de Privacidade foi atualizada. Para rever a nossa Declaração de Privacidade atual e compreender como a HP Inc. recolhe e utiliza as informações, por favor clique ');

footerTxtBeforeLink[86] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[87] = new Array('<strong>Informaţii importante:</strong> Declaraţia noastră de confidenţialitate a fost actualizată. Pentru a examina Declaraţia noastră curentă de confidenţialitate şi a înţelege modul în care HP Inc. colectează şi utilizează informaţii, faceţi clic ');

footerTxtBeforeLink[88] = new Array('<strong>Важная информация:</strong> Обновлено заявление о конфиденциальности.  Чтобы просмотреть заявление о конфиденциальности и разобраться в процедуре сбора и использования информации компанией HP Inc., перейдите по этой');

footerTxtBeforeLink[89] = new Array('<strong>معلومة هامة:</strong> تم تحديث بيان الخصوصية الخاص بنا.  للاطلاع على بيان الخصوصية الحالي الخاص بنا وعلى طريقة تجميع المعلومات واستخدامها من قبل HP Inc.‎‏، الرجاء النقر');

footerTxtBeforeLink[90] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[91] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[92] = new Array('<strong>Važne informacije:</strong> Ažurirali smo izjavu o privatnosti. Da biste pregledali aktuelnu izjavu o privatnosti i saznali kako HP Inc. prikuplja i koristi informacije, kliknite ');

footerTxtBeforeLink[93] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[94] = new Array('<strong>Dôležité informácie:</strong> Naše vyhlásenie o ochrane osobných údajov bolo aktualizované. Ak si chcete prečítať naše aktuálne vyhlásenie o ochrane osobných údajov a pochopiť, akým spôsobom spoločnosť HP Inc. zhromažďuje a používa informácie, ');

footerTxtBeforeLink[95] = new Array('<strong>Pomembne informacije:</strong> naša izjava o zasebnosti je posodobljena. Če želite pregledati našo trenutno izjavo o zasebnosti in razumeti, kako HP Inc. zbira ter uporablja informacije, kliknite ');

footerTxtBeforeLink[96] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[97] = new Array('<strong>Información importante:</strong> Nuestra Declaración de Privacidad se ha actualizado.  Para consultar la Declaración actual en vigor y conocer la manera en que HP Inc. recopila y utiliza la información, haga clic ');

footerTxtBeforeLink[98] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[99] = new Array('<strong>Viktig information:</strong> Vårt meddelande om sekretess och integritet  har uppdaterats. Om du vill visa det aktuella meddelandet om sekretess och integritet och se hur HP Inc. registrerar och använder information klickar du');

footerTxtBeforeLink[100] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[101] = new Array('<strong>Wichtiger Hinweis:</strong> Unsere Datenschutzerklärung wurde aktualisiert. Klicken Sie bitte auf den ');

footerTxtBeforeLink[102] = new Array('<strong>重要資訊：</strong>我們的「隱私權聲明」已更新。若要檢閱最新的「隱私權聲明」並瞭解 HP Inc. 收集和使用資訊的方式，請按一下');

footerTxtBeforeLink[103] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[104] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[105] = new Array('<strong>ข้อมูลสำคัญ:</strong> คำชี้แจงสิทธิส่วนบุคคลของเรามีข้อมูลอัปแดต หากต้องการดูคำชี้แจงสิทธิส่วนบุคคลปัจจุบันของเรา และเพื่อทำความเข้าใจเกี่ยวกับวิธีการที่ HP Inc. เก็บรวบรวมและใช้ข้อมูล โปรดคลิก');

footerTxtBeforeLink[106] = new Array('<strong>ข้อมูลสำคัญ:</strong> คำชี้แจงสิทธิส่วนบุคคลของเรามีข้อมูลอัปแดต หากต้องการดูคำชี้แจงสิทธิส่วนบุคคลปัจจุบันของเรา และเพื่อทำความเข้าใจเกี่ยวกับวิธีการที่ HP Inc. เก็บรวบรวมและใช้ข้อมูล โปรดคลิก');

footerTxtBeforeLink[107] = new Array('<strong>معلومة هامة:</strong> تم تحديث بيان الخصوصية الخاص بنا.  للاطلاع على بيان الخصوصية الحالي الخاص بنا وعلى طريقة تجميع المعلومات واستخدامها من قبل HP Inc.‎‏، الرجاء النقر');

footerTxtBeforeLink[108] = new Array('<strong>Information importante:</strong> notre déclaration de confidentialité a été mise à jour. Pour examiner notre déclaration de confidentialité en vigueur et comprendre comment HP Inc. collecte et utilise les informations, veuillez cliquer ');

footerTxtBeforeLink[109] = new Array('<strong>Önemli bilgi:</strong> Gizlilik Bildirimimiz güncellenmiştir. Geçerli Gizlilik Bildirimimizi incelemek ve HP Inc. nin bilgileri nasıl toplayıp kullandığını öğrenmek için lütfen ');

footerTxtBeforeLink[110] = new Array('<strong>Важная информация:</strong> Обновлено заявление о конфиденциальности.  Чтобы просмотреть заявление о конфиденциальности и разобраться в процедуре сбора и использования информации компанией HP Inc., перейдите по этой');

footerTxtBeforeLink[111] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[112] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[113] = new Array('<strong>Важная информация:</strong> Обновлено заявление о конфиденциальности.  Чтобы просмотреть заявление о конфиденциальности и разобраться в процедуре сбора и использования информации компанией HP Inc., перейдите по этой');

footerTxtBeforeLink[114] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[115] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[116] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[117] = new Array('<strong>Important Information:</strong> Our Privacy Statement has been updated. To review our current Privacy Statement and to understand how HP Inc. collects and uses information, please click');

footerTxtBeforeLink[118] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[119] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[120] = new Array('<strong>Información importante:</strong> Nuestra Declaración de privacidad ha sido actualizada. Para ver nuestra Declaración de privacidad actual y comprender cómo HP Inc. recopila y utiliza la información, haga clic');

footerTxtBeforeLink[121] = new Array('<strong>Thông tin Quan trọng:</strong> Tuyên bố về Quyền riêng tư của chúng tôi đã được cập nhật. Để xem xét Tuyên bố về Quyền riêng tư hiện tại của chúng tôi và hiểu rõ cách HP Inc. thu thập và sử dụng thông tin, vui lòng bấm vào');

footerTxtBeforeLink[122] = new Array('<strong>Thông tin Quan trọng:</strong> Tuyên bố về Quyền riêng tư của chúng tôi đã được cập nhật. Để xem xét Tuyên bố về Quyền riêng tư hiện tại của chúng tôi và hiểu rõ cách HP Inc. thu thập và sử dụng thông tin, vui lòng bấm vào');
var footerLinkText = new Array();
footerLinkText[0] = new Array('here');

footerLinkText[1] = new Array('ici');

footerLinkText[2] = new Array('here');

footerLinkText[3] = new Array('هنا ');

footerLinkText[4] = new Array('ici');

footerLinkText[5] = new Array('aqui');

footerLinkText[6] = new Array('aquí');

footerLinkText[7] = new Array('here');

footerLinkText[8] = new Array('here');

footerLinkText[9] = new Array('here');

footerLinkText[10] = new Array('Link');

footerLinkText[11] = new Array('ссылке');

footerLinkText[12] = new Array('here');

footerLinkText[13] = new Array('ссылке');

footerLinkText[14] = new Array('hier');

footerLinkText[15] = new Array('ici');

footerLinkText[16] = new Array('aquí');

footerLinkText[17] = new Array('here');

footerLinkText[18] = new Array('here');

footerLinkText[19] = new Array('aqui');

footerLinkText[20] = new Array('тук');

footerLinkText[21] = new Array('here');

footerLinkText[22] = new Array('ici');

footerLinkText[23] = new Array('here');

footerLinkText[24] = new Array('aquí');

footerLinkText[25] = new Array('aquí');

footerLinkText[26] = new Array('这里');

footerLinkText[27] = new Array('aquí');

footerLinkText[28] = new Array('ici');

footerLinkText[29] = new Array('ovdje');

footerLinkText[30] = new Array('εδώ');

footerLinkText[31] = new Array('klikněte sem');

footerLinkText[32] = new Array('her');

footerLinkText[33] = new Array('aquí');

footerLinkText[34] = new Array('siia');

footerLinkText[35] = new Array('here');

footerLinkText[36] = new Array('here');

footerLinkText[37] = new Array('ici');

footerLinkText[38] = new Array('Link');

footerLinkText[39] = new Array('here');

footerLinkText[40] = new Array('tätä');

footerLinkText[41] = new Array('ici');

footerLinkText[42] = new Array('here');

footerLinkText[43] = new Array('Link');

footerLinkText[44] = new Array('here');

footerLinkText[45] = new Array('εδώ');

footerLinkText[46] = new Array('here');

footerLinkText[47] = new Array('這裡');

footerLinkText[48] = new Array('ide');

footerLinkText[49] = new Array('here');

footerLinkText[50] = new Array('here');

footerLinkText[51] = new Array('di sini');

footerLinkText[52] = new Array('here');

footerLinkText[53] = new Array('here');

footerLinkText[54] = new Array('לחץ');

footerLinkText[55] = new Array('qui');

footerLinkText[56] = new Array('ここをクリックしてください');

footerLinkText[57] = new Array('ссылке');

footerLinkText[58] = new Array('here');

footerLinkText[59] = new Array('여기를 클릭하십시오');

footerLinkText[60] = new Array('here');

footerLinkText[61] = new Array('šeit');

footerLinkText[62] = new Array('čia');

footerLinkText[63] = new Array('ici');

footerLinkText[64] = new Array('here');

footerLinkText[65] = new Array('here');

footerLinkText[66] = new Array('here');

footerLinkText[67] = new Array('here');

footerLinkText[68] = new Array('aquí');

footerLinkText[69] = new Array('هنا ');

footerLinkText[70] = new Array('here');

footerLinkText[71] = new Array('aici');

footerLinkText[72] = new Array('ovde');

footerLinkText[73] = new Array('هنا ');

footerLinkText[74] = new Array('ici');

footerLinkText[75] = new Array('aqui');

footerLinkText[76] = new Array('hier');

footerLinkText[77] = new Array('here');

footerLinkText[78] = new Array('here');

footerLinkText[79] = new Array('her');

footerLinkText[80] = new Array('here');

footerLinkText[81] = new Array('aquí');

footerLinkText[82] = new Array('aquí');

footerLinkText[83] = new Array('here');

footerLinkText[84] = new Array('tutaj');

footerLinkText[85] = new Array('aqui');

footerLinkText[86] = new Array('aquí');

footerLinkText[87] = new Array('aici');

footerLinkText[88] = new Array('ссылке');

footerLinkText[89] = new Array('هنا ');

footerLinkText[90] = new Array('here');

footerLinkText[91] = new Array('ici');

footerLinkText[92] = new Array('ovde');

footerLinkText[93] = new Array('here');

footerLinkText[94] = new Array('kliknite sem');

footerLinkText[95] = new Array('tukaj');

footerLinkText[96] = new Array('here');

footerLinkText[97] = new Array('aquí');

footerLinkText[98] = new Array('here');

footerLinkText[99] = new Array('här');

footerLinkText[100] = new Array('ici');

footerLinkText[101] = new Array('Link');

footerLinkText[102] = new Array('這裡');

footerLinkText[103] = new Array('here');

footerLinkText[104] = new Array('here');

footerLinkText[105] = new Array('ที่นี่');

footerLinkText[106] = new Array('ที่นี่');

footerLinkText[107] = new Array('هنا ');

footerLinkText[108] = new Array('ici');

footerLinkText[109] = new Array('buraya tıklayın');

footerLinkText[110] = new Array('ссылке');

footerLinkText[111] = new Array('here');

footerLinkText[112] = new Array('here');

footerLinkText[113] = new Array('ссылке');

footerLinkText[114] = new Array('here');

footerLinkText[115] = new Array('here');

footerLinkText[116] = new Array('here');

footerLinkText[117] = new Array('here');

footerLinkText[118] = new Array('aquí');

footerLinkText[119] = new Array('aquí');

footerLinkText[120] = new Array('aquí');

footerLinkText[121] = new Array('đây');

footerLinkText[122] = new Array('đây');
var footerTxtAfterLink = new Array();
footerTxtAfterLink[0] = new Array('.');

footerTxtAfterLink[1] = new Array('.');

footerTxtAfterLink[2] = new Array('.');

footerTxtAfterLink[3] = new Array('.');

footerTxtAfterLink[4] = new Array('.');

footerTxtAfterLink[5] = new Array('.');

footerTxtAfterLink[6] = new Array('.');

footerTxtAfterLink[7] = new Array('.');

footerTxtAfterLink[8] = new Array('.');

footerTxtAfterLink[9] = new Array('.');

footerTxtAfterLink[10] = new Array(', um unsere aktuelle Datenschutzerklärung abzurufen und sich über die Erfassung und Nutzung von Daten durch HP Inc. zu informieren.');

footerTxtAfterLink[11] = new Array('.');

footerTxtAfterLink[12] = new Array('.');

footerTxtAfterLink[13] = new Array('.');

footerTxtAfterLink[14] = new Array('.');

footerTxtAfterLink[15] = new Array('.');

footerTxtAfterLink[16] = new Array('.');

footerTxtAfterLink[17] = new Array('.');

footerTxtAfterLink[18] = new Array('.');

footerTxtAfterLink[19] = new Array('.');

footerTxtAfterLink[20] = new Array('.');

footerTxtAfterLink[21] = new Array('.');

footerTxtAfterLink[22] = new Array('.');

footerTxtAfterLink[23] = new Array('.');

footerTxtAfterLink[24] = new Array('.');

footerTxtAfterLink[25] = new Array('.');

footerTxtAfterLink[26] = new Array('.');

footerTxtAfterLink[27] = new Array('.');

footerTxtAfterLink[28] = new Array('.');

footerTxtAfterLink[29] = new Array('.');

footerTxtAfterLink[30] = new Array('.');

footerTxtAfterLink[31] = new Array('.');

footerTxtAfterLink[32] = new Array('.');

footerTxtAfterLink[33] = new Array('.');

footerTxtAfterLink[34] = new Array('.');

footerTxtAfterLink[35] = new Array('.');

footerTxtAfterLink[36] = new Array('.');

footerTxtAfterLink[37] = new Array('.');

footerTxtAfterLink[38] = new Array(', um unsere aktuelle Datenschutzerklärung abzurufen und sich über die Erfassung und Nutzung von Daten durch HP Inc. zu informieren.');

footerTxtAfterLink[39] = new Array('.');

footerTxtAfterLink[40] = new Array('.');

footerTxtAfterLink[41] = new Array('.');

footerTxtAfterLink[42] = new Array('.');

footerTxtAfterLink[43] = new Array(', um unsere aktuelle Datenschutzerklärung abzurufen und sich über die Erfassung und Nutzung von Daten durch HP Inc. zu informieren.');

footerTxtAfterLink[44] = new Array('.');

footerTxtAfterLink[45] = new Array('.');

footerTxtAfterLink[46] = new Array('.');

footerTxtAfterLink[47] = new Array('.');

footerTxtAfterLink[48] = new Array('.');

footerTxtAfterLink[49] = new Array('.');

footerTxtAfterLink[50] = new Array('.');

footerTxtAfterLink[51] = new Array('.');

footerTxtAfterLink[52] = new Array('.');

footerTxtAfterLink[53] = new Array('.');

footerTxtAfterLink[54] = new Array('.');

footerTxtAfterLink[55] = new Array('.');

footerTxtAfterLink[56] = new Array('。');

footerTxtAfterLink[57] = new Array('.');

footerTxtAfterLink[58] = new Array('.');

footerTxtAfterLink[59] = new Array('.');

footerTxtAfterLink[60] = new Array('.');

footerTxtAfterLink[61] = new Array('.');

footerTxtAfterLink[62] = new Array('.');

footerTxtAfterLink[63] = new Array('.');

footerTxtAfterLink[64] = new Array('.');

footerTxtAfterLink[65] = new Array('.');

footerTxtAfterLink[66] = new Array('.');

footerTxtAfterLink[67] = new Array('.');

footerTxtAfterLink[68] = new Array('.');

footerTxtAfterLink[69] = new Array('.');

footerTxtAfterLink[70] = new Array('.');

footerTxtAfterLink[71] = new Array('.');

footerTxtAfterLink[72] = new Array('.');

footerTxtAfterLink[73] = new Array('.');

footerTxtAfterLink[74] = new Array('.');

footerTxtAfterLink[75] = new Array('.');

footerTxtAfterLink[76] = new Array('.');

footerTxtAfterLink[77] = new Array('.');

footerTxtAfterLink[78] = new Array('.');

footerTxtAfterLink[79] = new Array('.');

footerTxtAfterLink[80] = new Array('.');

footerTxtAfterLink[81] = new Array('.');

footerTxtAfterLink[82] = new Array('.');

footerTxtAfterLink[83] = new Array('.');

footerTxtAfterLink[84] = new Array('.');

footerTxtAfterLink[85] = new Array('.');

footerTxtAfterLink[86] = new Array('.');

footerTxtAfterLink[87] = new Array('.');

footerTxtAfterLink[88] = new Array('.');

footerTxtAfterLink[89] = new Array('.');

footerTxtAfterLink[90] = new Array('.');

footerTxtAfterLink[91] = new Array('.');

footerTxtAfterLink[92] = new Array('.');

footerTxtAfterLink[93] = new Array('.');

footerTxtAfterLink[94] = new Array('.');

footerTxtAfterLink[95] = new Array('.');

footerTxtAfterLink[96] = new Array('.');

footerTxtAfterLink[97] = new Array('.');

footerTxtAfterLink[98] = new Array('.');

footerTxtAfterLink[99] = new Array('.');

footerTxtAfterLink[100] = new Array('.');

footerTxtAfterLink[101] = new Array(', um unsere aktuelle Datenschutzerklärung abzurufen und sich über die Erfassung und Nutzung von Daten durch HP Inc. zu informieren.');

footerTxtAfterLink[102] = new Array('.');

footerTxtAfterLink[103] = new Array('.');

footerTxtAfterLink[104] = new Array('.');

footerTxtAfterLink[105] = new Array('.');

footerTxtAfterLink[106] = new Array('.');

footerTxtAfterLink[107] = new Array('.');

footerTxtAfterLink[108] = new Array('.');

footerTxtAfterLink[109] = new Array('.');

footerTxtAfterLink[110] = new Array('.');

footerTxtAfterLink[111] = new Array('.');

footerTxtAfterLink[112] = new Array('.');

footerTxtAfterLink[113] = new Array('.');

footerTxtAfterLink[114] = new Array('.');

footerTxtAfterLink[115] = new Array('.');

footerTxtAfterLink[116] = new Array('.');

footerTxtAfterLink[117] = new Array('.');

footerTxtAfterLink[118] = new Array('.');

footerTxtAfterLink[119] = new Array('.');

footerTxtAfterLink[120] = new Array('.');

footerTxtAfterLink[121] = new Array('.');

footerTxtAfterLink[122] = new Array('.');
//====================================
//site wide privacy notification JS Begin
//====================================
	//all HP locales
	//var hpeuck_locales = ['en-emea_africa','fr-emea_africa','sq-al','ar-dz','fr-dz','pt-ao','es-ar','hy-am','en-au','de-at','az-az','bn-bd','ru-by','nl-be','fr-be','es-bo','bs-ba','en-bw','pt-br','bg-bg','en-ca','fr-ca','en-lamerica_nsc_carib','es-lamerica_nsc_cnt_amer','es-cl','zh-cn','es-co','fr-cg','hr-hr','el-cy','cs-cz','da-dk','es-ec','et-ee','en-et','fe-fg','fi-fi','fr-fr','ge-ga','de-de','en-gh','el-gr','en-hk','zh-hk','hu-hu','is-is','en-in','en-id','en-ie','en-il','he-il','it-it','ja-jp','ru-kz','en-ke','ko-kr','sq-ks','lv-lv','lt-lt','fr-lu','mk-mk','en-my','en-mt','en-mu','es-mx','ar-emea_middle_east','en-emea_middle_east','ro-md','sr-me','ar-ma','pt-mz','nl-nl','en-nz','en-ng','no-no','en-pk','es-py','es-pe','en-ph','pl-pl','pt-pt','es-pr','ro-ro','ru-ru','ar-sa','en-sa','fr-sn','sr-rs','en-sg','sk-sk','sl-si','en-za','es-es','si-lk','sv-se','fr-ch','de-ch','zh-tw','en-tz','sw-tz','en-th','ar-tn','fr-tn','tr-tr','en-ug','sw-ug','ru-ua','en-ae','en-uk','en-us','es-uy','es-ve','en-vn'];

	hpenotice_close_base_url = "http://www.www8-hp.com";
	if (document.location.protocol == "https:") {
		hpenotice_close_base_url = "https://ssl.www8.hp.com";
	}

	//interface css

	var footerNotice_css = '#privacy-notification {position: fixed; z-index: 100001;bottom:0;background: #E5E8E8;width: 100%;display: table;}'+
	'#privacy-notification .notification-container {width: 100%; max-width: 1200px; margin: 0 auto}'+
	'#privacy-notification p{color: #333333;font-size: 18px;line-height: 22px;margin: 10px 40px 10px 15px;/*float: left;*/}'+
	'#privacy-notification p a{text-decoration: none;color:#007DBA;}'+
	'#privacy-notification p a:hover{text-decoration: underline;}'+
	'#privacy-notification .close-btn{background-image:  url(' + hpenotice_close_base_url + '/ww/en/images/i/split_close.jpg);width: 19px;height: 19px;margin-right: 15px;position: absolute;top:10px;display: block;right:0;}'+
	'#privacy-notification .close-btn:hover{background-position: 0 19px;}'+
	'#privacy-notification a.close-btn:hover {cursor: pointer;}'+
	//'@media (min-width: 1139px) and (max-width:1172px){#privacy-notification .close-btn{top: -31px;}}'+
	//'/***** Tablet *****/@media (min-width: 619px) and (max-width:1138px){#privacy-notification .close-btn{top: -60px;}}'+
	//'@media (min-width: 448px) and (max-width:618px){#privacy-notification .close-btn {top: -80px;	}}'+
	//'@media (min-width: 350px) and (max-width:447px){#privacy-notification .close-btn {top: -103px;}}'+
	//'@media (max-width:349px){#privacy-notification .close-btn {top: -125px;}}'+
	//'@media (max-width:349px){#privacy-notification .close-btn {top: -118px;}}'+
	//'/****** Mobile ******/@media (max-width:447px){#privacy-notification .close-btn{top: -60px;}}'+
	//'@media (min-width:448px) and (max-width:617px){#privacy-notification .close-btn {top: -42px}}'+
	//'/******* Desktop *******/@media (min-width:1173px){#privacy-notification .close-btn{top: 10px;}}'+
	'.viewMobile, .viewTablet, .viewDesktop{display: none;}'+
	'@media (max-width:20em){.viewBase {display: block;}.viewMobile, .viewTablet, .viewDesktop{display: none;}}'+
	'@media (min-width:20em) and (max-width:31em){.viewMobile {display: block;}.viewBase, .viewTablet, .viewDesktop{display: none;}}'+
	'@media (min-width:31.0001em) and (max-width:50em){.viewTablet {display: block;}.viewBase, .viewMobile , .viewDesktop{display: none;}}'+
	'@media (min-width:50.0001em){.viewDesktop {display: block;}.viewBase, .viewMobile , .viewTablet{display: none;}}'+
	'p.txt{font-family: "HPSimplifiedRegular",Arial,sans-serif;text-align:center}';
	//interface html
	var footerNotice_html = '<!--googleoff: index-->\
						<noindex>\
							<div class="notification-container"><p class="txt">###notice###</p><a class="close-btn" onclick="privacyNoticeClose();"></a></div>\
						</noindex>\
						<!--googleon: index-->';
		
	function privacyNotice_localizeInterface(footerNotice_html, footerTxtBeforeLink, index) {
		var html = footerNotice_html,
			hpe_link = "http://www8.hp.com/",
			privacyPageName = "/privacy/privacy.html", allowed_CC, allowed_LL;
			var footerTxtAfterLinkField = footerTxtAfterLink[index][0] !== undefined ? footerTxtAfterLink[index][0] : '',
			//footerBanner_exLocales = ['emea_africa-en','emea_africa-fr','at-de','be-fr','be-nl','fr-fr','de-de','ie-en','emea_middle_east-en','nl-nl','sa-en','es-es','ch-de','ch-fr','za-en','uk-en','au-en','cn-zh','hk-en','jp-ja','kr-ko','in-en','id-en','my-en','nz-en','ph-en','sg-en','th-en','vn-en','lamerica_nsc_carib-en','ca-en','us-en'];
		privacyNotice_locale = bannern_allowedCC[index] + '-' + bannern_allowedLL[index];
		if (footerBanner_locales.toString().indexOf(privacyNotice_locale) == -1) {
			allowed_CC = 'us';
			allowed_LL = 'en';
		} else {
			allowed_CC = bannern_allowedCC[index];
			allowed_LL = bannern_allowedLL[index];
		}

		//if (hpe_home_page_urls[index]!="") hpe_link = hpe_home_page_urls[index];

		html = html.replace("###notice###", footerTxtBeforeLink[index][0] + " <a onclick='bindPrivacyNotificationMetrics()' target='_blank' href=\"" + hpe_link + allowed_CC + "/" + allowed_LL + privacyPageName + "\">" + footerLinkText[index][0] + "</a>" + footerTxtAfterLinkField);
		return html;
	}
	
	function privacyNoticeClose() {
		document.getElementById('privacy-notification').style.display = "none";
		privacyCreateCookie(hpeuck_pageDomain, "privacy_nb","0",0);
		return false;
	}

	function showPrivacyNoticeMessage() {

		var sheet = document.createElement("style");
		var style = footerNotice_css, metricValue;
		document.getElementsByTagName("head")[0].appendChild(sheet);
		try {
			sheet.innerText=style;
			sheet.innerHTML=style;
		}
		catch(e) {
			sheet.styleSheet.cssText=style;
		}
					
		if(!document.getElementById('privacy-notification')) {
			var holder = document.createElement("div");
			holder.id = "privacy-notification";
			//add exception for store pages, where "cookie_privacy_holder" div is injected into the "storePrivacyBlock" div
			if(document.getElementById('storePrivacyBlock')){
				document.getElementById('storePrivacyBlock').appendChild(holder);
			}
			else {
				if (document.body.firstChild) {
					document.body.insertBefore(holder, document.body.firstChild);
				}
				else {
					document.body.appendChild(holder);
				}
			}
		}
					
		document.getElementById('privacy-notification').innerHTML = footerNotice_html;
		//privacyCreateCookie(hpeuck_pageDomain, "privacy_nb","0",0);
		//metricvalue = bannern_allowedCC[privacyNotice_index] + "_" + bannern_allowedLL[privacyNotice_index] + "_legal_hpeuck_privacy_notif_ban";
		//console.log('********privacyNotificationMetrics triggered**************metricvalue', metricvalue);
		//trackMetrics('newLink', {
			//'name': metricvalue,
			//'type': 'link'
		//});

	}

	function privacyNoticeMessage() {
		privacyNotice_company_code = privacyGetMetaContent("company_code");
		privacyNotice_hp_inav_version = privacyGetMetaContent("hp_inav_version");
		privacyNotice_closed = privacyReadCookie("privacy_nb");
		
		if(!privacyNotice_closed || privacyNotice_closed == "1") { //check if the split notification was not closed (0 for closed, 1 for not closed)
			//if(hpeuck_pageDomain.indexOf("hpe.com") == -1) { //domain check

				// check if company_code and hp_inav_version metadata did not exist on the page:
				if(privacyNotice_company_code == false) {
					privacyNotice_company_code = "";
				}
				if(privacyNotice_hp_inav_version == false) {
					privacyNotice_hp_inav_version = "_no_hp_inav_version";
				}


				if(privacyNotice_company_code == "hpi" || privacyNotice_hp_inav_version.indexOf("ihfcaas") == 0) {


					/* show Split banner - showSplitMessage() - by setting this var to true
					  It will be picked up by a function executing onready event at the end of privacy JS */
					show_privacyNoticeBanner = true;


				}


			//}
			// else {
			// 	if (!isIE) {console.log("Privacy Notice: not showing Privacy notice message for domain "+hpeuck_pageDomain);}
			// }
		}
		else {
			if (!isIE) {console.log("Privacy Notice: Privacy notice message was closed");}
		}
	}
	
	var privacyNotice_locale = hpeuck_detectUserLocale(bannern_allowedCC, bannern_allowedLL, isIE)

	if(privacyNotice_locale) {
		privacyNotice_locale['cc'] = privacyNotice_locale['cc'].toLowerCase();
		privacyNotice_locale['ll'] = privacyNotice_locale['ll'].toLowerCase();
	}
	else { // fallback to default language (uk/en)
		privacyNotice_locale = new Array();
		privacyNotice_locale['cc'] = 'uk';
		privacyNotice_locale['ll'] = 'en';
		privacyNotice_locale['mod'] = "default";
		if (!isIE) {console.log("privacyNotice Notice: going to default locale for privacyNotice message");}
	}
	
	var privacyNotice_index = hpeuck_getIndexForLocale(privacyNotice_locale['cc'], privacyNotice_locale['ll'], bannern_allowedCC, bannern_allowedLL);
	footerNotice_html = privacyNotice_localizeInterface(footerNotice_html, footerTxtBeforeLink, privacyNotice_index);
	
	if (!isIE) { console.log("privacyNotice Notice: privacyNotice_locale: " + privacyNotice_locale['cc'] + " | " + privacyNotice_locale['ll'] + " | " + privacyNotice_locale['mod']); }
	function bindPrivacyNotificationMetrics() {
		trackMetrics('global-inav', {
			'link_id': '2411096'
		});
	}
	privacyNoticeMessage();
//====================================
//site wide privacy notification JS End
//====================================
function loadOneTrustScript() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://cc-cdn.onetrust.com/langswitch/71f5981f5be0c55a6934346638010faa.js";
		script.charset = "UTF-8";
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	loadOneTrustScript();/* Commenting the code relating to the Split Banner and AU Banner as they are not used*/

//====================================
// Show AU/Privacy/HPE Notice Banners
//====================================

// First checking if banner showing code was already executed - e.g. second script being loaded
if(typeof hpeuck_onreadyexecuted === 'undefined') {
	var hpeuck_onreadyexecuted = false;
}

if(!hpeuck_onreadyexecuted) {
	var hpeuck_onreadyexecuted = true;
    
    if (/* show_splitBanner*/ /*|| show_auBanner ||*/ show_privacyBanner || show_privacyNoticeBanner) {
        if (privacyCheckReadyState()) {
            if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Document readyState is already completed - not adding onreadystatechange.");}
            if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching banners.");}
            /*if (show_splitBanner) {
                if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the Split banner.");}
                showSplitMessage();
            }*/
            /*if (show_auBanner) {
                if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the AU banner.");}
                aunoticeTakeAction();
            }*/
            if (show_privacyNoticeBanner) {
                if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the privacy notice banner.");}
                showPrivacyNoticeMessage();
            }
            if (show_privacyBanner) {
                if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the Privacy banner.");}
                cookiePrivacy();
            }
        }
        else {
            if(typeof document.onreadystatechange == 'function') {
                showbanners_onreadystatechange_fn = document.onreadystatechange;
                if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Page onreadystatechange detected.");}
            }
            else {
                showbanners_onreadystatechange_fn = function() {
                    ;
                }
                if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Page has no onreadystatechange event.")};
            }
            document.onreadystatechange = function () {
                if (document.readyState == "complete") {
                    if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching banners.");}
                    /*if (show_splitBanner) {
                        if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the Split banner.");}
                        showSplitMessage();
                    }*/
                    /*if (show_auBanner) {
                        if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the AU banner.");}
                        aunoticeTakeAction();
                    }*/
                    if (show_privacyNoticeBanner) {
                        if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the privacy notice banner.");}
                        showPrivacyNoticeMessage();
                    }
                    if (show_privacyBanner) {
                        if (!isIE) {console.log("Show AU/Privacy/HPE Notice Banners: Launching the Privacy banner.");}
                        cookiePrivacy();
                    }
                }
                showbanners_onreadystatechange_fn();
            }
        }
    }
    
}