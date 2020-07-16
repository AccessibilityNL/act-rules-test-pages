(function($) {Drupal.behaviors.haeghegroep = {attach: function(context, settings) {





    /* Functies
        
    -------------------------------------- */   

        $.fn.plaatjeAlsAchtergrond = function(size, position, target) {
            var src = $('img', this).attr('src');
            if (typeof size === 'undefined') {
                var size = 'cover';
            }
            else {
                var size = size;
            }

            if (typeof position === 'undefined') {
                var position = 'center';
            }
            else {
                var position = position;
            }

            if (typeof target === 'undefined') {
                var target = this;
            }

            $(target).css({
                'background-image' : 'url(' + src + ')',
                'background-size' : size,
                'background-position' : position,
                'background-repeat' : 'no-repeat',
            });

            $('img', this).hide();
        };




        /* Standaardisering van slideshow
        -------------------------------------- */   

       $.fn.setSlideshow = function() {
            var slideshow = this;

            $(slideshow).slick({
                centerMode: true,
                slidesToShow: 4,
                dots: false,
                lazyLoad: 'ondemand',
                infinite: true,
                variableWidth: false,
                nextArrow: '<div class="icon-right-big"></div>',
                prevArrow: '<div class="icon-left-big"></div>',
                responsive: [
                    {
                    breakpoint: 1880,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                    breakpoint: 1480,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                    breakpoint: 1280,
                        settings: {
                            centerMode: false,
                            slidesToShow: 2
                        }
                    },
                    {
                    breakpoint: 1000,
                        settings: {
                            centerMode: false,
                            slidesToShow: 1
                        }
                    },
                ]


            });

            $(slideshow).each(function() {
                var _s = $(this);
                $('.slick-dots', this).after('<div class="captiondiv">');


                $('.slick-slide', this).each(function() {
                    var _t = $(this);
                    var _c = '';
                    if ($('img', _t).attr('title')) {
                        _c = $('img', _t).attr('title');
                        $('img', _t).attr('title', '');
                    }
                    $('.captiondiv', _s).append('<span>' + _c + '</span>');
                });
            });

        };




    /* Knappe selectbox
        
    -------------------------------------- */   

        function datumDropdown() {
            $('.date-year.form-select option').not(':eq(0)').remove();

            $('.date-display-single').each(function() {
                $('.date-year.form-select').prepend('<option value="' + $(this).text() + '">' + $(this).text() + '</option>');
            });

            if (typeof dateOptions == 'undefined') {
                dateOptions = $('.date-year.form-select').html();
            }

            $('.date-year.form-select').html(dateOptions);
        }





    /* Paginaopbouw
        
    -------------------------------------- */   

        function pageSetup() {



            /* Wysiwyg hulpjes
                
            -------------------------------------- */   

                $('.field-name-body p:eq(0), .paragraphs-item-tekst:eq(0) p:eq(0)').addClass('initiaal');

                $('p .video-youtube').each(function() {
                    $(this).parent().addClass('videowrap');
                });

                $('p img').each(function() {
                    $(this).parent().addClass('pimg');
                });




            /* Icons
                
            -------------------------------------- */   

                $('.block-menu-block-2 > div > .menu > li.last a').addClass('icon-search');


                $('.field-label').each(function() {
                    var _t = $(this).text().replace(':', '');
                    $(this).text(_t);
                });

                $('.view-dienst-en-producten .views-row a').each(function() {
                    $(this).addClass('icon-right-dir');
                });

                $('.menu-block-3 .menu a').each(function() {
                    $(this).addClass('icon-right-big');
                });



            /* Video knoppies
                
            -------------------------------------- */   

                var v;
                $('video').each(function() {

                    v = $(this)[0];
                    v.addEventListener('play', function() { $('#play-pause').html('Pauze'); }, true);
                    v.addEventListener('pause', function() { $('#play-pause').html('Afspelen'); }, true);

                    if ($('source', v).attr('src') == '') {
                        $(this).hide();
                    }
                });

                $('#play-pause').click(function(e) {
                    if (!$('#hgvideo')[0].paused) {
                       $('#hgvideo')[0].pause();
                       $('#play-pause').html('Afspelen');
                    } else {
                       $('#hgvideo')[0].play();
                        $('#play-pause').html('Pauze');
                    }
                });

                $('video').hover(function() {
                    $(this).prop('controls', true);
                }, function() {
                    $(this).prop('controls', false);
                });

                $('video').click(function() {
                    $(this).get(0).play();
                });



            /* Themablokjes
                
            -------------------------------------- */   

                $('.field-name-field-thema-s > .field-items > .field-item').each(function() {
                    $('img',this).attr('alt','');
                    $('.field-name-field-link a', this).attr('title',$('.field-name-field-titel .even', this).text());
                    $(this).plaatjeAlsAchtergrond();
                    var t = $('.paragraphs-item-secties', this);
                    $('.field-name-field-link', this).detach().prependTo(t);
                });



            /* Match height
                
            -------------------------------------- */   

                $('.field-name-field-uitgelicht > div > div').matchHeight();
                $('.view-producten .views-row').matchHeight();
                $('.field-name-field-wat-is-mogelijk- > .field-items > .field-item').matchHeight();




            /* Zet main-wrapper
                
            -------------------------------------- */   

                $('.ds-2col-stacked.view-mode-full > .group-left, .ds-2col-stacked.view-mode-full > .group-right').wrapAll('<div class="contentWrap">');
                $('.block-block-2').prependTo($('.contentWrap'));
                $('.block-sharelinks-sharelinks').prependTo($('.contentWrap'));



            /* Form onderaan pagina
                
            -------------------------------------- */   

                $('.enkels .form-item').each(function() {
                    var pl = $('label', this).text();
                    $('textarea, input', this).attr('placeholder', pl);
                });

                $('.enkels h2').click(function() {
                    $('.enkels .block-webform').toggleClass('form-active');
                });

                $('.block-webform-client-block-3').addClass('form-active');

                if ($('.field-name-field-kopbeeld img').length) {
                    $('body').addClass('kopbeeld');
                }


            /* Cart icon in menu
                
            -------------------------------------- */   

                $('.block-uc-minicart-uc-minicart > a').insertBefore('.menu-block-2 > .menu > li.last').wrap('<li class="minicart"></li>');

            datumDropdown();
        }



    /* Menu
        
    -------------------------------------- */   

        function initMobilemenu() {

            $('.block-menu-block-2 > div').once().clone().appendTo('.voorgrond');
            $('.hoofd .region-header').append('<div id="klik" class="icon-menu" tabindex="0"><span class="sr-only"></span></div>');

            var menu = $('.voorgrond .menu-block-2 > .menu');

            var toggleMenu = function(){
                $('#klik').toggleClass('icon-menu');
                $('#klik').toggleClass('icon-cancel');
                $('body').toggleClass('menuOpen');

                if ($('#klik').hasClass('icon-menu')) {
                    $('.sr-only').text('Menu uitklappen');
                    $('a', menu).attr('tabindex', '');
                } 
                else {
                    $('.sr-only').text('Menu inklappen');
                    $('a', menu).attr('tabindex','1');
                }
            };

            $('.touch #klik').on('touchstart', toggleMenu);
            $('.no-touch #klik').on('click', toggleMenu);

            $('#klik').on('keydown',function(e){
                if(e.keyCode == 13){
                    toggleMenu();
                    $('a', menu).first().focus();
                    return false;
                };
            });

            menu.on('keydown',function(e){
                if(e.keyCode == 27){
                    toggleMenu();
                    $('#klik').focus();
                    return false;
                };   
            });

        }



    /* Load en failsafe
        
    -------------------------------------- */   

        $(document).ready(function() {
            pageSetup();
            initMobilemenu();
            $('html').addClass('loading');
        });

        $(window).load(function() {


            /* Skip links
            -------------------------------------- */   

                $('.not-front h1').each(function() {       
                    if ($(this).css('display') == 'block') {
                        $(this).attr('id', '_main_content');
                        $('.skiplink').first().attr('href', '#_main_content');
                        return false;
                    }
                });

                $('.front .block-views-koppen-block').attr('id', '_main_content');
                $('.front .skiplink').first().attr('href', '#_main_content');




            /* Fade in
            -------------------------------------- */   

                $('html').removeClass('loading');
                $('html').addClass('loaded');
                $('.hoofd, .voorgrond, .romp').css('opacity', '1');

        });


        /* Fail-safe
        -------------------------------------- */   

            setTimeout(function() {
                $('html').addClass('loaded');
                $('.hoofd, .voorgrond, .romp').css('opacity', '1');
            },1500);



}}})(jQuery);

