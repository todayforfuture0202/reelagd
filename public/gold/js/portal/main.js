window._abyss = window._abyss || {};
window._abyss.main = (function (main, $) {
    "use strict";

    main.init = function () {
        main.newsSlide();
        main.shopSlide();
        classSlide();
        main.couponPopup();
        //eventSection();
        // background img 변경
        //$(".visual_wrap").css('background-image', 'url(' + $(".visual_wrap").attr('data-img') + ')');

        // mobile 일 경우 hide
        if (_abyss.isMobile(navigator.userAgent)) {
            document.querySelector('#videoTag').pause();
            document.querySelector('#videoTag').remove();

        } else {
            document.querySelector('#videoTag').play();
        }
    }

    main.couponPopup = function () {
        var $couponPopup = $(".popup_coupon");

        _abyss.btnClick($couponPopup.find(".btn_pop_close"), function ($this) {
            _abyss.fadeOutCallback($couponPopup, 0);
        });

        _abyss.mouseDown($couponPopup, function (e) {
            $couponPopup.find('.btn_pop_close').click();
        });
        _abyss.mouseDown($couponPopup.children(), function (e) {
            e.stopPropagation();
        });
    }

    main.videoPopUp = function (upLoadType, url, isAutoPlay, isLoop, isMuted, isPlayInline) {

        var option = {
            idx: 0,
            backdrop: true,
            playvideo: null,
            data: [{
                url: url,
                type: 'video',
                alt: '',
            }]
        };

        if (!_abyss.getCookie("notTodayMovie") === true) {

            if (upLoadType == 2) {
                option.data[0].uploadVideo = true;

                if (isAutoPlay == 1) {
                    option.data[0].isAutoPlay = true;
                }

                if (isLoop == 1) {
                    option.data[0].isLoop = true;
                }

                if (isMuted == 1) {
                    option.data[0].isMuted = true;
                }

                if (isPlayInline == 1) {
                    option.data[0].isPlayInline = true;
                }
            }

            _abyss.popupSlider(option);
            $('.btn.btn_not_today').show();
            $('.pop_content').addClass('main');
        }
    }

    main.newsSlide = function () {
        var boolean = $('.news_item').length > 2 ? true : false;
        if ($('.news_item').length > 1) {
            $('.news_list').owlCarousel({
                loop: boolean,
                nav: true,
                margin: 30,
                dots: true,
                mouseDrag: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                rewind: true,
                center: true,
                responsive: {
                    2800: {
                        items: 8,
                        mouseDrag: false,
                        nav: true
                    },
                    2400: {
                        items: 6,
                        mouseDrag: false,
                        nav: true
                    },
                    2000: {
                        items: 5,
                        mouseDrag: false,
                        nav: true
                    },
                    1600: {
                        items: 4,
                        mouseDrag: false,
                        nav: true
                    },
                    1024: {
                        items: 3,
                        loop: true,
                        mouseDrag: false,
                        nav: true
                    },
                    0: {
                        items: 1,
                        loop: true,
                        mouseDrag: false,
                        nav:true
                    }
                },
                onInitialized: function () {
                    _abyss.resizeElements($('[data-resize="true"]'), 0);
                }
            });
        }
        else {
            $('.news_list').addClass('col3');
        }
    };
    main.shopSlide = function () {
        var $scop = $('.shop_area');
        var $shopItem = $scop.find('.cash_item');
        var $slideTarget = $scop.find('.cash_list');
        var idx = 1;
        if ($shopItem.length > 1) {
            $slideTarget.owlCarousel({
                loop: true,
                nav: true,
                items: 1,
                rewind: true,
                autoplay: true,
                autoplayTimeout: 5000,
                dots: true,
                mouseDrag: false,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        mouseDrag: false,
                    }
                },
                onInitialized: function (event) {
                    $('.txt_count').html(idx);
                    $('.total_count').html(event.item.count);
                },
                onTranslate: function (event) {

                },
                onTranslated: function (event) {
                    idx = event.page.index + 1;
                    $('.txt_count').html(idx);
                }
            });
        } else {
            $scop.find('.count_area').css('display', 'none');
        }
    };

    main.classes = function () {
        var $scope = $('.character_wrap');
        var $btnThub = $scope.find('.thumb_nail_area > ul > li > a');
        var $element = $scope.find('.character_area > div');
        var length = $element.length;
        var baseClass = 'character_'
        var $currentDiv = $('.character_area > div.active');
        var idx = $currentDiv.index();
        var thumbIndex;
        var myIdx;
        var $btn = $scope.find('.btn_wrap a');
        _abyss.btnClick($btnThub, function ($this) {
            var myName = $this.attr('data-name');
            myIdx = $this.attr('data-idx');
            $btnThub.parent().removeClass('active');
            $this.parent().addClass('active');
            $element.removeClass('active');
            $scope.attr('class', '');
            $scope.addClass('character_wrap').addClass(baseClass + myIdx);
            $('#' + myName).addClass('active');
            idx = $('#' + myName).index();
        });

        _abyss.btnClick($btn, function ($this) {
            thumbIndex = $('.thumb_nail_area > ul > li.active').index();

            $btnThub.parent().removeClass('active');
            if ($this.hasClass('btn_prev')) {
                thumbIndex--;
                if (thumbIndex < 0) {
                    thumbIndex = $btnThub.parent().length - 1;
                }
            }
            else {
                thumbIndex++;
                if (thumbIndex > $btnThub.parent().length - 1) {
                    thumbIndex = 0;
                }
            }

            $btnThub.parent().eq(thumbIndex).addClass('active').ready(function () {
                var myIdx = $('.thumb_nail_area > ul > li.active').find('> a').attr('data-idx');
                $scope.attr('class', '');
                $scope.addClass(baseClass + myIdx).addClass('character_wrap');
            });
            var myName = $('.thumb_nail_area > ul > li.active').find('a').attr('data-name');
            $element.removeClass('active');
            $('#' + myName).addClass('active');
        });

    };

    _abyss.btnClick($("#thumb_nail_area a"), function ($this) {

        var option = {
            idx: $this.attr('attr-idx'),
            backdrop: true,
            playvideo: null,
            data: []
        };

        for (var i = 0; i < 3; i++) {
            var $element = $("#thumnail_" + i);
            var obj = {
                url: $element.attr('data-url'),
                type: $element.attr('attr-type'),
                alt: $element.attr('attr-alt')
            }
            option.data.push(obj);
        }

        _abyss.popupSlider(option);

    });

    _abyss.btnClick($('.media_list_area a'), function ($this) {

        var option = {
            idx: $this.attr('attr-idx'),
            backdrop: true,
            playvideo: null,
            data: []
        };

        $.each($('.media_list_area a'), function (idx, element) {
            var $element = $(element);

            var obj = {
                url: $element.attr('data-url'),
                type: $element.attr('attr-type'),
                alt: $element.attr('attr-alt')
            }
            option.data.push(obj);
        });
        _abyss.popupSlider(option);
    });

    var classSlide = function () {
        var $scope = $('.character_wrap');
        var $slideTarget = $scope.find('.character_list');
        var $slideItem = $slideTarget.find('.character_item');
        var $thumbBtn = $scope.find('.thumb_nail_area > ul > li > a');
        if ($slideItem.length > 1) {
            $slideTarget.owlCarousel({
                loop: true,
                nav: true,
                items: 1,
                rewind: true,
                autoplay: false,
                dots: true,
                mouseDrag: false,
                animateOut: 'fadeOut',
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        mouseDrag: false,
                    }
                },
                onInitialized: function (event) {

                },
                onTranslate: function (event) {
                },
                onTranslated: function (event) {
                    $thumbBtn.parent().removeClass('active');
                    $thumbBtn.parent().eq(event.page.index).addClass('active');
                }
            });
        }
        _abyss.btnClick($thumbBtn, function ($this) {
            var myIdx = $this.parent().index();
            $thumbBtn.parent().removeClass('active');
            $this.parent().addClass('active');
            $slideTarget.trigger('to.owl.carousel', myIdx);
        });
    };

    // 메인 이벤트 19.05.29
    var eventSection = function () {
        var $scope = $('.visual_wrap');
        var $btn = $('.btn_event_js');
        var headerH, targetOffset;
        _abyss.btnClick($btn, function ($this) {
            var myId = $this.attr('data-id');
            headerH = $('.header_wrap').outerHeight(true);
            targetOffset = $('#' + myId).offset().top;
            $('html, body').stop().animate({ scrollTop: targetOffset - headerH }, 200);
        });
    };

    main.init();
    return main;
})(window._abyss.main || {}, jQuery);

(function () {
})();