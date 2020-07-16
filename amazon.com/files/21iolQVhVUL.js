(function(h){var g=window.AmazonUIPageJS||window.P,p=g._namespace||g.attributeErrors,c=p?p("AuthorFollowAssets"):g;c.guardFatal?c.guardFatal(h)(c,window):c.execute(function(){h(c,window)})})(function(h,g,p){function c(a){g.ue&&g.ue.tag&&g.ue.count&&(g.ue.tag(a,"authorFollow"),g.ue.count(a+"count",1))}function a(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);return a.replace(/\{(\d+)\}/g,function(a,c){var e=parseInt(c,10);return b[e]})}var b=g.location.protocol+"//"+g.location.hostname+
(g.location.port?":"+g.location.port:"")+"/ap/signin",f=/^(?:(?:(?:(\w\w)-)?pre-prod)|(?:.+))\.amazon.(?:(\w\w)|(com)|(?:co\.(?:(\w\w))))?$/,l={au:"A39IBJ37TRP1C6",br:"A2Q3Y263D00KWC",ca:"A2EUQ1WTGCTBG2",cn:"AAHKV2X7AFYLW",de:"A1PA6795UKMFR9",es:"A1RKKUPIHCS9HS",fr:"A13V1IB3VIYZZH","in":"A21TJRUUN4KGV",it:"APJ6JRA9NG5V4",jp:"A1VC38T7YXB528",mx:"A1AM78C64UM0Y8",nl:"A1805IZSGTT6HS",ru:"AD2EMQ3L3PG8S",uk:"A1F83G8C2ARO7P",com:"ATVPDKIKX0DER"},e={A39IBJ37TRP1C6:"auflex",A2Q3Y263D00KWC:"brflex",A2EUQ1WTGCTBG2:"caflex",
AAHKV2X7AFYLW:"cnflex",A1PA6795UKMFR9:"deflex",A1RKKUPIHCS9HS:"esflex",A13V1IB3VIYZZH:"frflex",A21TJRUUN4KGV:"inflex",APJ6JRA9NG5V4:"itflex",A1VC38T7YXB528:"jpflex",A1AM78C64UM0Y8:"mxflex",A1805IZSGTT6HS:"nlflex",AD2EMQ3L3PG8S:"ruflex",A1F83G8C2ARO7P:"gbflex",ATVPDKIKX0DER:"usflex"};h.when("jQuery").register("followButtonJS",function(k){function n(d){function n(){var a;(a=!D)||(a=/author-follow=([^#&]+)/.exec(g.location.search),a=(a&&2===a.length?a[1]:p)!==y);if(a||"undefined"===typeof sessionStorage)return!1;
a=sessionStorage.followKey;sessionStorage.removeItem("followKey");return a===y}function q(){d.closest(".hide").removeClass("hide")}function m(){h.when("A","a-modal").execute(function(a,b){var c=k("#followErrorPopoverTrigger"),m=b.create(c,{name:"followErrorPopover",closeButton:!1,hideHeader:!0,popoverLabel:"followErrorPopover"});a.declarative("closeErrorDialog","click",function(){m.hide()});m.show()})}function t(a){var b=k(".author-follow-button");"undefined"!==typeof b&&b.each(function(){var b=k(this).find("button"),
c=b.attr("data-followingtext");"undefined"===typeof c&&(c="✓");var m=b.attr("data-followtext");"undefined"===typeof m&&(m="+");"undefined"!==typeof b&&b.attr("data-authorasin")===y&&(a?(b.html(c),b.attr("data-isFollowing","true")):(b.html(m),b.attr("data-isFollowing","false")))})}function u(){"undefined"!==typeof F&&"undefined"!==typeof E&&k.ajax({type:"GET",url:H,data:{per_result_recommendations_limit:3,scale_width:50,facet:"low",results_limit:1},success:function(a){var b=k("#a-popover-"+F),c=JSON.parse(k("#"+
E).attr("data-a-popover"));delete c.height;k("#"+E).attr("data-a-popover",JSON.stringify(c));for(var m=0,c=0;3>c;c++){var d,q,n="#similarAuthorRow_"+c,e=b.find(n),n=b.find(n+" + .a-divider-normal");try{d=a.results[0].recommendations[c].entity_data,q=a.results[0].recommendations[c].entity_id}catch(f){e.hide();n.hide();continue}m++;var n=d.name,l=d.url,t="",g;for(g=0;g<d.data.length;g++)t+=d.data[g].name,g<d.data.length-1&&(t+=", ");e.find("img").attr("src",d.image_url);e.find(".authorImageLink").attr("href",
l);g=e.find(".similarAuthorNameLink");g.attr("href",l);g.html(n);e.find(".inlineBibliography").html(t);e=e.find("button");e.attr("data-authorasin",q);"undefined"!==typeof A&&e.attr("data-followRef",A+"_i"+c);"undefined"!==typeof C&&e.attr("data-unfollowRef",C+"_i"+c)}0!==m&&(r(),h.when("a-popover").execute(function(a){a.get(k("#"+E)).show()}))},error:function(a){c("SimilarAuthorsRequestError")}})}function I(a){k.ajax({type:"POST",url:G,data:{_method:"delete",authenticity_token:a,ref:C},success:function(a){d.html(B);
d.attr("data-isFollowing","false");t(!1)},error:function(a){c("AuthorUnfollowError");m()}})}function x(a){k.ajax({type:"POST",url:"/follow/",data:{authenticity_token:a,entity_id:y,category:"author",ref:A},success:function(){d.html(z);d.attr("data-isFollowing","true");q();t(!0);u()},error:function(a){c("AuthorFollowError");m()}})}function w(){k.ajax({type:"GET",url:G,data:{},success:function(a){a.isFollowable&&(a.isFollowing?(d.html(z),q(),d.attr("data-isFollowing","true")):n()?x(a.csrf):(d.html(B),
q(),d.attr("data-isFollowing","false")),d.click(function(){"true"===d.attr("data-isFollowing")?I(a.csrf):x(a.csrf)}))},error:function(a){c("AuthorFollowStatusError")}})}var y=d.attr("data-authorasin");if("undefined"!==typeof y){var A=d.attr("data-followref"),C=d.attr("data-unfollowref"),B=d.attr("data-followtext");"undefined"===typeof B&&(B="+");var z=d.attr("data-followingtext");"undefined"===typeof z&&(z="✓");var D=d.attr("data-issignedin"),E=d.attr("data-similarauthorspopoverid"),F=d.attr("data-similarauthorspopovercontentname"),
G="/follow/"+y+"_author/",H="/follow/v2/recommendations/author/"+y+"?recommenders[]=similarities&entity_types[]=author";"true"===D?d.attr("data-followLogicExecuted")===p&&(d.attr("data-followLogicExecuted","true"),w()):(q(),d.click(function(){var c=a("{0}={1}","author-follow",y),c=a("https://{0}{1}{2}",g.location.hostname,g.location.pathname,(g.location.search?g.location.search+"&":"?")+c);"undefined"!==typeof sessionStorage&&(sessionStorage.followKey=y);var m;a:{if(m=g.location.hostname.match(f))for(var d=
1;d<m.length;d++)if(m[d]!==p){m=l[m[d]];break a}m="ATVPDKIKX0DER"}d=b.replace(/^https?:\/\//,"https://");c=a("{0}?openid.assoc_handle={1}&openid.claimed_id={2}&openid.identity={2}&openid.mode=checkid_setup&openid.ns={3}&openid.ns.pape={4}&openid.pape.max_auth_age=0&openid.return_to={5}",d,e[m],encodeURIComponent("http://specs.openid.net/auth/2.0/identifier_select"),encodeURIComponent("http://specs.openid.net/auth/2.0"),encodeURIComponent("http://specs.openid.net/extensions/pape/1.0"),encodeURIComponent(c));
g.location.href=c}))}}function r(){var a=k(".author-follow-button");"undefined"!==typeof a&&a.each(function(){var a=k(this).find("button");"undefined"!==typeof a&&n(a)})}r();return{enableFollowButtons:r}})});