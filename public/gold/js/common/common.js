var _abyss = (function (abyss, $) {
    "use strict";

    var _userInformation = "";
    var _loadingStr = '<div class="loadingLayer"><div class="loading_progress_wrap"><div class="inner"><div class="loading_circle"><div class="loader"></div></div></div></div></div>';

    // event
    abyss.btnClick = function ($btn, callback) {
        if (!$btn || $btn.length <= 0) {
            return false;
        }

        $btn.off('click').on('click', function (e, data) {
            if ($btn.length <= 0) {
                return false;
            }

            if ($.isFunction(callback)) {
                callback($(this), e, data);
            }
        });
    }
    abyss.mouseDown = function ($ele, callback) {
        if (!$ele || $ele.length <= 0) {
            return false;
        }

        $ele.off('mousedown').on('mousedown', function (e) {
            if ($ele.length <= 0) {
                return false;
            }

            if ($.isFunction(callback)) {
                callback(e);
            }
        });
    }
    abyss.showCallback = function ($element, callback) {
        if (!$element || $element.length <= 0) {
            return false;
        }

        $element.show().ready(function () {
            if ($.isFunction(callback)) {
                callback(true);
            }
        });
    }
    abyss.hideCallback = function ($element, callback) {
        if (!$element || $element.length <= 0) {
            return false;
        }

        $element.hide().ready(function () {
            if ($.isFunction(callback)) {
                callback(true);
            }
        });
    }
    abyss.fadeInCallback = function ($element, second, callback) {
        if (!$element || $element.length <= 0) {
            return false;
        }

        second = second || 0.5;

        $element.stop().fadeIn(second * 1000, function () {
            if ($.isFunction(callback)) {
                callback($element);
            }
        });
    }
    abyss.fadeOutCallback = function ($element, second, callback) {
        if (!$element || $element.length <= 0) {
            return false;
        }

        second = second || 0.5;

        $element.stop().fadeOut(second * 1000, function () {
            if ($.isFunction(callback)) {
                callback($element);
            }
        });
    }

    // function
    abyss.init = function () {
        abyss.gnbMenu();
        abyss.headerFixed();
        abyss.networkFixed();
        inputInit();
        jqueryFunction();
        topScroll();
        abyss.initFloatingBanner();
        abyss.detailMore();
        abyss.resizeElements($('[data-resize="true"]'), 0);
        abyss.languageChange('cultureType');
        abyss.siteMap();

        var trackingCode = function () {
            // ga 트래킹 코드
            $(document).on('click', '[data-ga]', function () {
                ga('send', 'pageview', "'" + $(this).data('ga') + "'");
            });
        }();
    }

    abyss.isEmpty = function (data, isSpaceCheck) {
        var result = true;
        try {
            if ($.isNumeric(data)) {
                data = data.toString();
            }
            if ($.isPlainObject(data)) {
                data = JSON.stringify(data);
            }

            if (typeof data == 'object') {
                data = data.value || data;
            }

            data = data || null || undefined || '';


            if (isSpaceCheck && 0 < data.replace(/\s/gi, '').length) {
                result = false;
            }
            else if (!isSpaceCheck && 0 < data.length) {
                result = false;
            }
        }
        catch (e) {
            console.error('isEmpty error');
            result = true;
        }
        return result;
    }
    abyss.isNumber = function (value) {
        var result = false;
        try {
            if (0 < parseInt(value) || parseInt(value) <= 0) {
                result = true;
            }

        } catch (e) {
            result = false;
        }
        return result;
    }
    abyss.checkFieldValid = function (element, message, useFocus) {
        var result = true;
        var $element = null;

        if ($.isFunction(element.get)) {
            $element = element;
        }
        else {
            $element = $(element);
        }

        if ($element.is('[type="hidden"]')) {
            result = false;
        }
        else if (abyss.isEmpty($element.val())) {
            result = false;

            if (useFocus) {
                $element.focus();
            }

            if (!abyss.isEmpty(message)) {
                alert(message);
            }
        }

        return result;
    }
    abyss.checkEmailValid = function (element, message, useFocus) {
        var result = true;
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z_-])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;
        var $element = null;

        if ($.isFunction(element.get)) {
            $element = element;
        }
        else {
            $element = $(element);
        }

        if (!abyss.checkFieldValid($element, message)) {
            result = false;
        }
        else if (!regExp.test($element.val())) {
            result = false;

            if (useFocus) {
                $element.focus();
            }

            if (!abyss.isEmpty(message)) {
                alert(message);
            }
        }

        return result;

    }
    abyss.checkPasswordValid = function (element, message, useFocus) {
        var result = true;
        var regExp = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-]))(^[a-zA-Z0-9!@#$%^&*()_+=~-]{10,16}$)/;

        var $element = null;

        if ($.isFunction(element.get)) {
            $element = element;
        }
        else {
            $element = $(element);
        }
        if (!abyss.checkFieldValid($element, message)) {
            result = false;
        }
        else if (!regExp.test($element.val())) {
            result = false;

            if (useFocus) {
                $element.focus();
            }

            if (!abyss.isEmpty(message)) {
                alert(message);
            }
        }
        else {
            var chk_num = $element.val().search(/[0-9]/g);
            var chk_eng = $element.val().search(/[a-z]/ig);
            if (chk_num < 0 || chk_eng < 0) {
                result = false;

                if (useFocus) {
                    $element.focus();
                }

                if (!abyss.isEmpty(message)) {
                    alert(message);
                }
            }
        }

        return result;
    }
    abyss.checkNameValid = function (element, message, useFocus) {
        var regExp = /([0-9|\(\)\{\}\[\],.`~!@#$%^&*\-=|_+\\\'\";:\/?<>★─│┌┐┘└├┬┤┴│━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊０１２３４５６７８９ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ＋－＜＝＞±×÷≠≤≥∞∴♂♀∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∮∑∏！＇，．／：；？＾＿｀｜￣、、。·‥…¨〃­―∥＼∼´～ˇ˘˝˚˙¸˛¡¿ː㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛＃＆＊＠§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡?ªº＂（）［］｛｝‘’“”〔〕〈〉《》「」『』【】ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂＄％￦Ｆ′″℃Å￠￡￥¤℉‰?㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎢㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎲㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㅥㅦㅧㅨㅩㅪㅫㅬㅭㅮㅯㅰㅱㅲㅳㅴㅵㅶㅷㅸㅹㅺㅻㅼㅽㅾㅿㆀㆁㆂㆃㆄㆅㆆㆇㆈㆉㆊㆋㆌㆍㆎ½⅓⅔¼¾⅛⅜⅝⅞¹²³⁴ⁿ₁₂₃₄ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚØŒÞŦŊæđðħıĳĸŀłøœßþŧŋŉАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя])/gi;
        var result = true;
        var $element = null;

        if ($.isFunction(element.get)) {
            $element = element;
        }
        else {
            $element = $(element);
        }

        if (!abyss.checkFieldValid($element, message)) {
            result = false;
        }
        else if (regExp.test($element.val()) || _abyss.getByteLength($element.val()) < 4 || _abyss.getByteLength($element.val()) > 200) {
            result = false;

            if (useFocus) {
                $element.focus();
            }

            if (!abyss.isEmpty(message)) {
                alert(message);
            }
        }

        return result;
    }
    abyss.checkNickNameValid = function (element, message, useFocus) {
        // 우선 특문이 들어갈 경우 불가능하게 설정
        var result = true;
        var regExp = /([\(\)\{\}\[\],.`~!@#$%^&*|\\\'\";:\/?★─│┌┐┘└├┬┤┴│━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊０１２３４５６７８９ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ＋－＜＝＞±×÷≠≤≥∞∴♂♀∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∮∑∏！＇，．／：；？＾＿｀｜￣、、。·‥…¨〃­―∥＼∼´～ˇ˘˝˚˙¸˛¡¿ː㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛＃＆＊＠§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡?ªº＂（）［］｛｝‘’“”〔〕〈〉《》「」『』【】ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂＄％￦Ｆ′″℃Å￠￡￥¤℉‰?㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎢㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎲㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㅥㅦㅧㅨㅩㅪㅫㅬㅭㅮㅯㅰㅱㅲㅳㅴㅵㅶㅷㅸㅹㅺㅻㅼㅽㅾㅿㆀㆁㆂㆃㆄㆅㆆㆇㆈㆉㆊㆋㆌㆍㆎ½⅓⅔¼¾⅛⅜⅝⅞¹²³⁴ⁿ₁₂₃₄ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚØŒÞŦŊæđðħıĳĸŀłøœßþŧŋŉАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя])/gi;
        var $element = null;
        var checkchars = /[a-z]/;

        if ($.isFunction(element.get)) {
            $element = element;
        }
        else {
            $element = $(element);
        }

        if (!abyss.checkFieldValid($element, message)) {
            result = false;
        }
        else if (regExp.test($element.val()) || $element.val().length < 2 || $element.val().length > 10 || checkchars.test($element.val().substring(0, 1))) {
            result = false;

            if (useFocus) {
                $element.focus();
            }

            if (!abyss.isEmpty(message)) {
                alert(message);
            }
        }

        return result;
    }
    abyss.isValidDate = function (param) {
        try {
            param = param.replace(/-/g, '');

            if (isNaN(param) || param.length != 8) {
                return false;
            }

            var year = Number(param.substring(0, 4));
            var month = Number(param.substring(4, 6));
            var day = Number(param.substring(6, 8));

            var dd = day / 0;


            if (month < 1 || month > 12) {
                return false;
            }

            var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var maxDay = maxDaysInMonth[month - 1];

            // 윤년 체크
            if (month == 2 && (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) {
                maxDay = 29;
            }

            if (day <= 0 || day > maxDay) {
                return false;
            }
            return true;

        } catch (err) {
            return false;
        }
    }
    abyss.getByteLength = function (value) {
        var byteLength = 0;
        var charCode = "";

        for (var i = 0; i < value.length; i++) {
            charCode = escape(value.charAt(i));

            if (charCode.substring(0, 2) == '%u') {
                if (charCode.substring(2, 4) == '00') {
                    byteLength += 1;
                }
                else {
                    byteLength += 2;
                }
            }
            else if (charCode.substring(0, 1) == '%') {
                if (parseInt(charCode.substring(1, 3), 16) > 127) {
                    byteLength += 2;
                }
                else {
                    byteLength += 1;
                }
            }
            else {
                byteLength += 1;
            }
        }

        return byteLength;
    }
    abyss.resizeElements = function ($eles, isFixedSize) {
        resizeCalc($eles, isFixedSize);

        $(window).on('resize',function (e) {
            resizeCalc($eles, isFixedSize);
        });
    }

    abyss.loading = function (isShow, durationSecond, $parent, $target) {
        var $ele = $target || $('.loadingLayer');
        var $parent = $parent || $('body');

        if (isShow) {
            $parent.append(_loadingStr);
            $parent.append(function () {
                abyss.fadeInCallback($parent.find('.loadingLayer'), durationSecond);
            });
        }
        else {
            abyss.fadeOutCallback($ele, durationSecond, function ($this) {
                $this.remove();
            });
        }
    }
    abyss.removeTag = function (data, isSpace) {
        if (abyss.isEmpty(tagRemove)) {
            return '';
        }

        return data.replace(/(<([^>]+)>)/ig, isSpace ? ' ' : '');
    }

    abyss.headerFixed = function () {
        var _scope, ctrl, $target, windowW;
        var resizeTimer;
        var winW = window.innerWidth || $(window).width();
        function init() {
            windowW = $(window).width();
            _scope = window;
            ctrl = false;
            $target = document.querySelector('.header_wrap');
            bind();
        };
        function bind() {
            $(_scope).on('scroll', function () {
                if ($(window).width() > 1540) {
                    var _scrollTop = $(_scope).scrollTop();
                    if (ctrl == true && _scrollTop == 0) {
                        ctrl = false;
                        $($target).removeClass('small');
                    } else if (ctrl == false && _scrollTop > 0) {
                        ctrl = true;
                        $($target).addClass("small");
                    }
                }
            });
            $(_scope).on('resize', function () {
                if ($(window).width() == windowW) { return; }
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    if (winW <= 1024) {
                        ctrl = false;
                        $($target).removeClass('small');
                        navReset()
                    } else {
                        navReset()
                        $('.sub_menu').show();
                    }
                    $('.header_wrap').attr('style', '').removeClass('open');
                    $('.header_wrap .btn_all_menu').removeClass('on');
                }, 50);
            });

            function navReset() {
                $('body').removeClass('hidden');
                $('.header_wrap nav').removeClass('active');
                $('.dimm_sub_menu').hide();
                $('.sub_menu').slideUp(0);
                $('.header_wrap nav ul > li.node1 > a').removeClass('active');
            }
        }
        init();
    }
    // 네트워크바 header 대응
    abyss.networkFixed = function () {
        var bar_height;
        $(window).scroll(function () {
            bar_height = $('#top_network').outerHeight() || 0;
            if ($(window).scrollTop() > bar_height) {
                $('body').addClass('scrolling');
            } else {
                $('body').removeClass('scrolling');
            }
        });
    }
    abyss.gnbMenu = function () {
        $('nav ul > li.node1').on({
            'mouseenter': function () {
                if ($(window).width() > 1540) {
                    var headerH = $('.header').outerHeight(true);
                    var $this = $(this);
                     $('.header_wrap').css('height', headerH + 'px').addClass('open');
                    $('.header_wrap').addClass('open');
                    $this.find('.sub_menu').addClass('on');
                }
            },
            'mouseleave': function () {
                if ($(window).width() > 1540) {
                    $('.sub_menu').removeClass('on');
                };
            }
        });
        $('.header_wrap').on('mouseleave', function (e) {
            e.preeventDefault;
            if ($(window).width() > 1540) {
                $('.header_wrap').attr('style', '').removeClass('open');
            }
        });

        abyss.btnClick($('.btn_all_menu'), function ($this) {
            var headerH = $('.header').outerHeight(true);
            var speed = 250;
            var winW = window.innerWidth || $(window).width();
            $('.dimm_sub_menu').hide();
            if (winW > 1024 && $(window).width() <= 1540) {
                $('.sub_menu').css('display', 'block');
                if ($this.hasClass('on')) {
                    $this.removeClass('on');
                    $('.header_wrap').attr('style', '').removeClass('open');
                } else {
                    $this.addClass('on');
                    $('.header_wrap').css('height', headerH + 'px').addClass('open');
                }
            } else if (winW <= 1024) {
                $('body').addClass('hidden');
                $('.header_wrap nav').addClass('active');
                $('.dimm_sub_menu').show();
                abyss.btnClick($('.header_wrap nav ul > li.node1 > a'), function ($that) {
                    if (winW <= 1024) {
                        if ($that.hasClass('active')) {
                            $that.next('.sub_menu').slideUp(speed, function () {
                                $that.removeClass('active');
                            })
                        } else {
                            $('.sub_menu').slideUp(speed, function () {
                                $('.header_wrap nav ul > li.node1 > a').removeClass('active');
                            });
                            $that.next('.sub_menu').slideDown(speed, function () {
                                $that.addClass('active');
                            });
                        }
                    }
                });
				$('.header_wrap nav ul > li.node1 > div > ul > li > a.active').parents('.sub_menu').prev().trigger('click');
                abyss.btnClick($('.dimm_sub_menu'), function () {
                    navReset();
                });
                abyss.btnClick($('.btn_nav_close'), function () {
                    navReset();
                });
            }

            function navReset() {
                $('body').removeClass('hidden');
                $('.header_wrap nav').removeClass('active');
                $('.dimm_sub_menu').hide();
                $('.sub_menu').slideUp(speed);
                $('.header_wrap nav ul > li.node1 > a').removeClass('active');
            }
        });
    };

    abyss.addCookie = function (cookieName, cookieValue, expireDay) {
        if (abyss.isEmpty(document.cookie) || abyss.isEmpty(abyss.getCookie(cookieName))) {
            var cDay = expireDay || 1;
            var expire = new Date();
            expire.setDate(expire.getDate() + cDay);
            var cookies = cookieName + '=' + escape(cookieValue) + '; domain=' + location.host + '; path=/ ';
            cookies += ';expires=' + expire.toGMTString() + ';';
            document.cookie = cookies;
        }
        else {
            document.cookie = cookieName + '=' + cookieValue;
        }
    }
    abyss.removeCookie = function (cookieName) {
        if (!abyss.isEmpty(abyss.getCookie(cookieName))) {
            var cDay = -1;
            var expire = new Date();
            expire.setDate(expire.getDate() + cDay);
            var cookies = cookieName + '=; domain=' + location.host + '; path=/ ';
            cookies += ';expires=' + expire.toGMTString() + ';';
            document.cookie = cookies;
        }
    }
    abyss.getCookie = function (cookieName) {
        cookieName = cookieName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cookieName);
        var cValue = '';
        if (start != -1) {
            start += cookieName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1) end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

    abyss.bindPartial = function (id, url, data, callback) {
        if (abyss.isEmpty(id) || abyss.isEmpty(url) || !document.getElementById(id)) {
            if ($.isFunction(callback)) {
                callback(false);
            }
            return false;
        }

        //abyss.loading(true);
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            beforeSend: function (xhr, settings) { },
            complete: function (xhr, status) { },
            success: function (result, status, xhr) {
                //abyss.loading(false);
                $('#' + id).html(result.views || result);
                if ($.isFunction(callback)) {
                    callback(true);
                }
            },
            error: function (xhr, status, error) {
                //abyss.loading(false);
                if ($.isFunction(callback)) {
                    callback(false);
                }
            }
        });
    }
    abyss.alert = function (option, callback) {
        //option { msg:'', btnDoneText:'', backdrop:'' }
        if ($.isEmptyObject(option)) {
            return;
        }

        var $focusElement = $(document.activeElement);
        var idx = $('.messageBox.alert').length;
        var appendStr =
            '<div id="messageBox' + idx + '" class="messageBox alert">' +
                '<div class="content">' +
                    '<div class="header">' +
                        '<button class="btn btnClose"><i></i>X</button>' +
                    '</div>' +
                    '<div class="body">' +
                        '<span>' + (option.msg || '') + '</span>' +
                    '</div>' +
                    '<div class="footer">' +
                        '<button class="btn btnDone"><i></i>' + (option.btnDoneText || BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MESSAGEBOX_DONE")) + ' </button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $('body').append(appendStr);
        $('body').append(function (e) {
            $focusElement.blur();
            var $parent = $('#messageBox' + idx);

            abyss.fadeInCallback($parent, 0.5);

            if (option.backdrop || false) {
                abyss.mouseDown($parent, function (e) {
                    $parent.find('.btnDone').click();
                });
                abyss.mouseDown($parent.children(), function (e) {
                    e.stopPropagation();
                });
            }
            abyss.btnClick($parent.find('.btnDone, .btnClose'), function ($this) {
                abyss.fadeOutCallback($parent, 0.5, function () {
                    if ($.isFunction(callback)) {
                        callback(true);
                    }

                    if ($focusElement.is('input, textarea')) {
                        $focusElement.focus();
                    }

                    $parent.remove();
                });
            });
        });
    }
    abyss.confirm = function (option, callback) {
        //option { msg:'', btnDoneText:'', btnCancelText:'', backdrop:'' }
        if ($.isEmptyObject(option)) {
            return;
        }

        var $focusElement = $(document.activeElement);
        var idx = $('.messageBox.alert').length;
        var appendStr =
            '<div id="messageBox' + idx + '" class="messageBox confirm">' +
                '<div class="content">' +
                    '<div class="header">' +
                        '<button class="btn btnClose"><i></i>X</button>' +
                    '</div>' +
                    '<div class="body">' +
                        '<span>' + (option.msg || '') + '</span>' +
                    '</div>' +
                    '<div class="footer">' +
                        '<button class="btn btnDone"><i></i>' + (option.btnDoneText || BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MESSAGEBOX_DONE")) + ' </button>' +
                        '<button class="btn btnCancel"><i></i>' + (option.btnCancelText || BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MESSAGEBOX_CANCEL")) + ' </button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        $('body').append(appendStr);
        $('body').append(function (e) {
            $focusElement.blur();
            var $parent = $('#messageBox' + idx);

            abyss.fadeInCallback($parent, 0.5);

            if (option.backdrop || false) {
                abyss.btnClick($parent, function ($this, e) {
                    $parent.find('.btnDone').click();
                });
                abyss.btnClick($parent.find('.content > *'), function ($this, e) {
                    e.stopPropagation();
                });
            }
            abyss.btnClick($parent.find('.btnDone'), function ($this) {
                abyss.fadeOutCallback($parent, 0.5, function () {
                    if ($.isFunction(callback)) {
                        callback(true);
                    }

                    if ($focusElement.is('input, textarea')) {
                        $focusElement.focus();
                    }

                    $parent.remove();
                });
            });
            abyss.btnClick($parent.find('.btnCancel, .btnClose'), function ($this) {
                abyss.fadeOutCallback($parent, 0.5, function (e) {
                    if ($.isFunction(callback)) {
                        callback(false);
                    }

                    if ($focusElement.is('input, textarea')) {
                        $focusElement.focus();
                    }

                    $parent.remove();
                });
            });
        });
    }
    abyss.popupSlider = function (option) {
        if ($.isEmptyObject(option) || $.isEmptyObject(option.data)) {
            return;
        }

        var appendStr =
            '<div id="popupSlider" class="">' +
                '<div class="pop_content">' +
                    '<div class="pop_header">' +
                        '<button class="btn btn_not_today" type="button" style="display:none">' + BDWeb.Resource.GetResourceValue("NEW_WEB_MAIN_LANDING_POPUP_TODAYONLY") + '</button>' +
                        '<a href="javascript:void(0)" class="btn btn_pop_download"><span></span></a>' +
                        '<a href="javascript:void(0)" class="btn btn_pop_close"><span></span><span></span></a>' +
                    '</div>' +
                    '<div class="pop_body">' +
                        '<div id="popupOwl" class="pop_slide_wrap owl-carousel owl-theme">[REPALCE::SLIDER]</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        if (0 < $('#popupSlider').length) {
            $('#popupSlider').remove();
        }
        $(document.activeElement).blur();
        if (!abyss.isEmpty(option.playVideo)) {
            $('#' + option.playVideo).trigger('pause');
        }

        var slide = '';
        $.each(option.data, function (idx, data) {
            if (!abyss.isEmpty(data.type) && 'video' == data.type.toLowerCase()) {
                if (data.uploadVideo == undefined) {
                    slide += '<iframe style="width:100%; height:100%;" src="' + data.url + '" frameborder="0" allowfullscreen allow="' + data.allow + '"></iframe>';
                } else {
                    slide += '<video id="mainVideo" controls';
                    slide += data.isAutoPlay == true ? ' autoplay' : '';
                    slide += data.isLoop == true ? ' loop' : '' ;
                    slide += data.isMuted == true ? ' muted' : '';
                    slide += data.isPlayInline == true ? ' playsinline' : '';
                    slide += ' style="width:100%; height:100%;">';

                    var sourceUrl = data.url.split("|");

                    for (var idx in sourceUrl) {
                        if (sourceUrl[idx].indexOf("webm") > 0) {
                            slide += '<source src = "' + sourceUrl[idx] + '" type = "video/webm">';
                        }
                        if (sourceUrl[idx].indexOf("mp4") > 0) {
                            slide += '<source src = "' + sourceUrl[idx] + '" type = "video/mp4">';
                        }
                        if (sourceUrl[idx].indexOf("ogg") > 0) {
                            slide += '<source src = "' + sourceUrl[idx] + '" type = "video/ogg">';
                        }
                        if (sourceUrl[idx].indexOf("ogv") > 0) {
                            slide += '<source src = "' + sourceUrl[idx] + '" type = "video/ogv">';
                        }
                    }
                        slide += '</video>';
                }
            }
            else {
                slide += '<img class="popupImg" src="' + data.url + '" alt="' + (data.alt || '') + '"/>';
            }
        });

        appendStr = appendStr.replace('[REPALCE::SLIDER]', slide);

        $('body').append(appendStr);
        $('body').append(function () {
            var $parent = $('#popupSlider');

            abyss.loading(true, 0.2, $parent.find('.pop_content'));

            if (option.data.length <= 1) {
                abyss.loading(false, 0.2, null, $parent.find('.pop_content .loadingLayer'));
                pageChange($parent.find('.pop_content .pop_slide_wrap').first().show(0, function () {
                    $('.owl-carousel').addClass('owl-item active');
                }));
            }
            else {
                $('#popupOwl').owlCarousel({
                    startPosition: option.idx || 0,
                    loop: option.data.length <= 1 ? false : true,
                    nav: true,
                    items: 1,
                    mouseDrag: true,
                    touchDrag: true,
                    autoHeight:true,
                    dots: true,
                    rewind: true,
                    onInitialized: function (event) {
                        var currentItem = $(event.target).find('.owl-item').eq(event.item.index);
                        pageChange(currentItem);

                        if (option.data.length <= 1) {
                            $('#popupOwl .owl-nav').remove();
                        }
                    },
                    onTranslate: function (event) {
                        var currentItem = $(event.target).find('.owl-item.active');

                        // video reset
                        currentItem.find('iframe').first().attr('src', currentItem.find('iframe').first().attr('src'));
                    },
                    onTranslated: function (event) {
                        var currentItem = $(event.target).find('.owl-item.active');
                        pageChange(currentItem);
                    },
                    onResize: function (event) {
                    },
                    onRefreshed: function (event) {
                        abyss.loading(false, 0.2, null, $parent.find('.pop_content .loadingLayer'));
                    }
                });
            }
            function pageChange(currentItem) {
                if (currentItem.data('video') || 0 < currentItem.find('iframe').length) {
                    $parent.find('.btn_pop_download').hide();;
                }
                else {
                    $parent.find('.btn_pop_download').show();;
                }

                abyss.resizeVideo($('.pop_content'), 960, 540, 0.85);

                $(window).resize(function () {
                    abyss.resizeVideo($('.pop_content'), 960, 540, 0.85);
                })
            }

            if (abyss.isEmpty(option.backdrop) || option.backdrop) {
                abyss.mouseDown($parent, function (e) {
                    $parent.find('.btn_pop_close').click();
                });
                abyss.mouseDown($parent.children(), function (e) {
                    e.stopPropagation();
                });
            }

            abyss.fadeInCallback($parent, 0.5);
            abyss.btnClick($parent.find('.btn_not_today'), function () {
                abyss.fadeOutCallback($parent, 0.5, function () {
                    $parent.remove();
                    abyss.addCookie("notTodayMovie", true, 1);
                    if (!abyss.isEmpty(option.playVideo)) {
                        $('#' + option.playVideo).trigger('play');
                    }
                });
            });

            abyss.btnClick($parent.find('.btn_pop_close'), function ($this) {
                abyss.fadeOutCallback($parent, 0.5, function () {
                    $parent.remove();
                    if (!abyss.isEmpty(option.playVideo)) {
                        $('#' + option.playVideo).trigger('play');
                    }
                });
            });
            abyss.btnClick($parent.find('.btn_pop_download'), function ($this) {
                var $element = $(".owl-item.active .popupImg");
                var url = $element.attr('src') || '';
                var link = document.createElement('a');

                link.style.display = 'none';
                link.setAttribute('class', 'downImage');
                link.href = url;
                link.download = '';

                if (url.length > 0) {
                    link.click();
                }

                $('.downImage').remove();
            });
        });
    }
    abyss.resizeVideo = function ($video, orgWidth, orgHeight, percent) {
        var $window = $(window);
        var height = $window.height() * percent;
        var width = $window.width() * percent;

        var maxPercent = height / orgHeight < width / orgWidth ? width / orgWidth : height / orgHeight;
        var minPercent = height / orgHeight > width / orgWidth ? width / orgWidth : height / orgHeight;

        var newWidth = orgWidth * minPercent;
        var newHeight = orgHeight * minPercent;

        if ($video.length > 0) $video.css({
            'width': parseInt(Math.floor(newWidth/2.2)*2),
            'height': parseInt(Math.floor(newHeight/2.2)*2)
        });
        else return {
            'width': parseInt(newWidth),
            'height': parseInt(newHeight)
        };
    }

    abyss.getUserInfo = function () {
        return _userInformation;
    }
    abyss.moveLoginPage = function (returnUrl) {
        if (abyss.isEmpty(returnUrl)) {

            var strUrl = top.location.href;
            var strQuerystring = top.location.search;

            if (abyss.isEmpty(strQuerystring)) {
                strQuerystring = strQuerystring.substring(1, strQuerystring.length);
            }

            if (abyss.isEmpty(strQuerystring)) {
                returnUrl = encodeURIComponent(strUrl);
            }
            else {
                returnUrl = encodeURIComponent(strUrl);
            }
        }
        else {
            returnUrl = encodeURIComponent(returnUrl);
        }
        var rawUrl = _abyss.api.Http.Account + "/Member/Login?_returnUrl=" + returnUrl;
        top.location.href = rawUrl;
    }
    abyss.confirmLogin = function (callback) {
        if (_userInformation.isLogin == undefined || !_userInformation.isLogin || _userInformation.isLogin == "false") {
            if (confirm(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_COMMON_CONFIRM_LOGIN"))) {
                abyss.moveLoginPage();
            }
            else {
                return false;
            }
        }
        else {
            if ($.isFunction(callback)) {
                callback();
            }
        }
    }

    abyss.oauthCallBack = function (resultCode, resultMsg, returnUrl) {
        if (parseInt(resultCode) != 0) {
            alert(resultMsg);
        }
        location.href = returnUrl;
    }
    abyss.authlink = function (type) {
        var popX = (window.screen.width / 2) - (450 / 2);
        var popY = (window.screen.height / 2) - (600 / 2);

        if (OAuthPopup != null) {
            OAuthPopup.close();
        }

        OAuthPopup = window.open(_abyss.api.Http.Account + "/Member/OAuth/" + type + "?returnUrl=" + $("#_returnUrl").val(), '', 'width=450px,height=600px,top=' + popY + ',left=' + popX);
        if (window.focus) {
            OAuthPopup.focus();
        }

    }
    abyss.oauthlinkdelete = function () {
        $.ajax({
            type: "post",
            url: _abyss.api.Http.Portal + "/Member/Join/OauthLinkDelete/",
            success: function (result) {
               if (result.resultCode == 0) {
                    // 연동해제성공
                    alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_MYINFO_SLSLINK_DISLINK'));
                    location.reload();
                    return false;
               } else if (!abyss.isEmpty(result.resultMsg) && (result.resultCode == -10006 || result.resultCode == -10001)) {
                   alert(result.resultMsg);
               }
               else {
                    alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_LOGIN_FAILED'));
                    return false;
                }
            },
            error: function () {
                alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_NOTICE_ERROR'));
                return false;
            }
        });
    }
    abyss.facebooklinkdelete = function () {
        $.ajax({
            type: "post",
            url: _abyss.api.Http.Portal + "/Member/Join/FacebookLinkDelete/",
            success: function (result) {
                if (result.resultCode == 0) {
                    // 연동해제성공
                    alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_FACEBOOK_DISLINK_SUCCESS'));
                    location.reload();
                }
                else if (!abyss.isEmpty(result.resultMsg) && (result.resultCode == -10006 || result.resultCode == -10001)) {
                    alert(result.resultMsg);
                }
                else {
                    alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_LOGIN_FAILED'));
                }
            },
            error: function (result) {
                alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_NOTICE_ERROR'));
            }
        });
		return false;
    }
    abyss.vklinkdelete = function () {
        $.ajax({
            type: "post",
            url: _abyss.api.Http.Portal + "/Member/Join/VKLinkDelete/",
            success: function (result) {
                if (result.resultCode == 0) {
                    // 연동해제성공
                    alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_VK_DISLINK_SUCCESS'));
                    location.reload();
                }
                else if (!abyss.isEmpty(result.resultMsg) && (result.resultCode == -10006 || result.resultCode == -10001)) {
                    alert(result.resultMsg);
                }
                else {
                    alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_LOGIN_FAILED'));
                }
            },
            error: function (result) {
                alert(BDWeb.Resource.GetResourceValue('NEW_WEB_MSG_MYPAGE_SNSLINK_INDEX_NOTICE_ERROR'));
            }
        });
        return false;
    }
    abyss.getVideoThumbnail = function (url) {
        var path = [];
        var type = '';
        var id = [];

        id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        if (0 <= id[3].indexOf('youtu')) {
            type = 'youtube';
        }
        else if (0 <= id[3].indexOf('vimeo')) {
            type = 'vimeo';
        }
        else if (0 <= id[3].indexOf('vzaar')) {
            type = 'vzaar';
        }

        id = id[6];

        if (type === 'youtube') {
            path.push('//img.youtube.com/vi/' + id + '/maxresdefault.jpg');
            path.push('//img.youtube.com/vi/' + id + '/sddefault.jpg');
            path.push('//img.youtube.com/vi/' + id + '/hqdefault.jpg');
            path.push('//img.youtube.com/vi/' + id + '/mqdefault.jpg');
            path.push('//img.youtube.com/vi/' + id + '/default.jpg');
        }

        return path;
    }
    abyss.checkRequiredPolicy = function () {
        var _result = true;
        $(".box_agree .sec_header .custom_check input").each(function (index) {
            var $ele = $(this);
            if ($ele.prop("required")) {
                if (!$ele.is(":checked")) {
                    _result = false;
                    return false;
                }
            }
        });
        return _result;
    };
    abyss.initFloatingBanner = function () {
        var $bannerObj = $('.floatingBanner.hide');

        if ($bannerObj.length <= 0) {
            return;
        };

        $bannerObj.each(function (idx, ele) {
            var $copy = $(this).clone();
            var $target = $($copy.data('move'));
            $copy.removeClass('hide');

            if (0 < $target.length) {
                $target.append($copy);
                $(this).remove();
            }
        });
    };

    var inputInit = function () {
        var inputSelector = 'input:not([type="hidden"])';

        $(document).on('focusout', inputSelector, function () {
            var val = $(this).val();

            if (!abyss.isEmpty(val)) {
                $(this).addClass('active');
            }
            else {
                $(this).removeClass('active');
                return;
            }

            if ($(this).is('[type="email"]') || $(this).is('[type="password"]')) {
                $(this).trigger('keyup');
            }
        });

        $(document).on('change', inputSelector, function () {
            $(this).trigger('focusout');
        });

        $(document).on('keyup', inputSelector + '[type="email"][required]', function () {
            var $this = $(this);

            if (!abyss.checkEmailValid($this)) {
                $this.parent().addClass('error');
            }
            else {
                $this.parent().removeClass('error');
            }
        });

        $(document).on('keyup', inputSelector + '[type="password"][required]', function () {
            var $this = $(this);
            if (!abyss.checkPasswordValid($this)) {
                if (abyss.isEmpty($this.val())) {
                    $this.parent().removeClass('error').removeClass('error_not_valid')
                }
                else {
                    $this.parent().addClass('error').addClass('error_not_valid').removeClass('correct');
                }
            }
            else {
                if ($this.parent().hasClass('error_not_equals')) {
                    $this.parent().removeClass('error_not_valid').addClass('correct');
                }
                else {
                    $this.parent().removeClass('error').removeClass('error_not_valid').addClass('correct');
                }
            }
            var $ele = $(inputSelector + '[type="password"][required]');
            if ($ele.length == 2) {
                if ($ele.eq(0).val() == $ele.eq(1).val()) {
                    if ($ele.parent().hasClass('error_not_valid')) {
                        $ele.parent().removeClass('error_not_equals');
                    } else {
                        $ele.parent().removeClass('error').removeClass('error_not_equals');
                    }
                }
                else {
                    $ele.eq(1).parent().addClass('error').addClass('error_not_equals');
                }
            }
        });

        $(inputSelector).trigger('focusout');
    }
    var jqueryFunction = function () {
        $.fn.customDatepicker = function (option) {
            if (!$.isFunction($.fn.datepicker)) {
                return false;
            }

            var optionSetting = option || {};

            if (abyss.isEmpty(optionSetting.language)) {

                optionSetting.language = _abyss.api.cultureCode;
                optionSetting.autoHide = optionSetting.autoHide || true;
                optionSetting.days = optionSetting.days || [BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_SUNDAY"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONDAY")
                                                          , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_TUESDAY"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_WEDNESDAY")
                                                          , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_THURSDAY"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_FRIDAY")
                                                          , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_SATURDAY")];
                optionSetting.daysShort = optionSetting.daysShort || [BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_SUNDAY_SIMPLE"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONDAY_SIMPLE")
                                                                    , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_TUESDAY_SIMPLE"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_WEDNESDAY_SIMPLE")
                                                                    , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_THURSDAY_SIMPLE"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_FRIDAY_SIMPLE")
                                                                    , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_SATURDAY_SIMPLE")];
                optionSetting.daysMin = optionSetting.daysMin || [BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_SUNDAY_SIMPLE"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONDAY_SIMPLE")
                                                                , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_TUESDAY_SIMPLE"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_WEDNESDAY_SIMPLE")
                                                                , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_THURSDAY_SIMPLE"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_FRIDAY_SIMPLE")
                                                                , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_SATURDAY_SIMPLE")];
                optionSetting.months = optionSetting.months || [BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_1"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_2")
                                                              , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_3"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_4")
                                                              , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_5"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_6")
                                                              , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_7"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_8")
                                                              , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_9"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_10")
                                                              , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_11"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_12")];
                optionSetting.monthsShort = optionSetting.monthsShort || [BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_1"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_2")
                                                                        , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_3"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_4")
                                                                        , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_5"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_6")
                                                                        , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_7"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_8")
                                                                        , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_9"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_10")
                                                                        , BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_11"), BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_MONTH_12")];
                optionSetting.weekStart = optionSetting.weekStart || 1;
                optionSetting.yearFirst = optionSetting.yearFirst || true;
                optionSetting.yearSuffix = optionSetting.yearSuffix || BDWeb.Resource.GetResourceValue("NEW_WEB_COMMON_YEAR");
            }

            this.datepicker(optionSetting);
        }
        $.fn.getCustomDate = function (formatted) {
            if (!$.isFunction($.fn.datepicker)) {
                return;
            }
            return this.datepicker('getDate', formatted);
        }
        $.fn.setCustomDate = function (date) {
            if (!$.isFunction($.fn.datepicker)) {
                return;
            }
            this.datepicker('setDate', date);
        }
    }
    var topScroll = function () {
        var $scope = $('.btn_top_mobile');
        var $btnTop = $scope.find('.btn_top');
        var ctrl = false;
        $(window).on('scroll', function () {
            var _scrollTop = $(window).scrollTop();
            if (ctrl == true && _scrollTop == 0) {
                ctrl = false;
                $btnTop.removeClass('active');
            }
            else if (ctrl == false && _scrollTop > 200) {
                ctrl = true;
                $btnTop.addClass('active');
            }
        });
        abyss.btnClick($btnTop, function () {
            $('html, body').stop().animate({ scrollTop: 0 }, 200);
        });
    };
    var resizeCalc = function ($eles, isFixedSize, widthRatio, heightRatio, percent, maxWidth, maxHeight) {
        // $ele : 대상 element
        // isFixedSize : 고정비율 사용여부
        // widthRatio : 고정 가로비율
        // heightRatio : 고정 세로비율
        // percent : 화면에 채울 비율 (기본값 1)
        // maxWidth : 최대 가로
        // maxHeight : 최대 높이

        if (abyss.isEmpty($eles) || $eles.length <= 0) {
            return;
        }

        $.each($eles, function (idx, ele) {
            var $ele = $(ele);
            var targetWidth = $ele.outerWidth();
            var targetHeight = $ele.outerHeight();
            var parentWidth = $ele.parents('[data-resize-parent="true"]').outerWidth() + 2;
            var parentHeight = $ele.parents('[data-resize-parent="true"]').outerHeight() + 2;
            var newWidth = 0;
            var newHeight = 0;
            var maxPercent = 1;
            var ratio = 0;
            var calcResult = {};

            if (isFixedSize) {
                calcResult = ratioCalc(parentWidth, parentHeight, widthRatio, heightRatio, percent, maxWidth, maxHeight);
                if (parentWidth < calcResult.heightFix.width) {
                    newWidth = calcResult.widthFix.width;
                    newHeight = calcResult.widthFix.height;
                }
                else {
                    newWidth = calcResult.heightFix.width;
                    newHeight = calcResult.heightFix.height;
                }

                if (abyss.isNumber(maxWidth) && maxWidth < newWidth) {
                    newWidth = maxWidth;
                    newHeight = maxHeight;
                }
                else if (abyss.isNumber(maxHeight) && maxHeight < newHeight) {
                    newHeight = maxHeight;
                    newWidth = maxWidth;
                }

            }
            else {
                var targetHeight = 0;
                var targetWidth = 0;

                if ($ele[0].tagName.toLowerCase() == 'img') {
                    var image = new Image();

                    if (abyss.isEmpty($ele.attr('src'))) {
                        return;
                    }

                    image.src = $ele.attr('src');
                    targetHeight = image.height;
                    targetWidth = image.width;
                }
                else if ($ele[0].tagName.toLowerCase() == 'video') {
                    var video = document.createElement('video');

                    if (abyss.isEmpty($ele.attr('src'))) {
                        return;
                    }

                    video.setAttribute('src', $ele.attr('src') || $ele.children().first().attr('src'));
                    targetHeight = video.videoHeight;
                    targetWidth = video.videoWidth;
                }


                ratio = parentHeight / targetHeight < parentWidth / targetWidth ? parentWidth / targetWidth : parentHeight / targetHeight;

                newWidth = targetWidth * ratio;
                newHeight = targetHeight * ratio;
            }

            $ele.css({
                'width': parseInt(newWidth),
                'height': parseInt(newHeight),
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
                'position': 'absolute'
            });
        });
    }
    var ratioCalc = function (width, height, ratioX, ratioY, percent, maxWidth, maxHeight) {
        if (!(abyss.isNumber(width) && abyss.isNumber(height) && abyss.isNumber(ratioX) && abyss.isNumber(ratioY)) ||
            (width <= 0 && height <= 0 && ratioX <= 0 && ratioY <= 0)) {
            console.error('argument error!');
        }

        var newHeight = parseInt((width / ratioX) * ratioY);
        var newWidth = parseInt((height / ratioY) * ratioX);

        if (!abyss.isNumber(percent)) {
            percent = 1;
        }

        width = width * percent;
        height = height * percent;
        newWidth = newWidth * percent;
        newHeight = newHeight * percent;

        return {
            'widthFix': { 'width': width, 'height': parseInt(newHeight) },
            'heightFix': { 'width': newWidth, 'height': height }
        };
    }

    // 모바일인지 체크
    abyss.isMobile = function (userAgent) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent))
        {
            return true;
        }
        return false;
    };


    abyss.detailMore = function () {
        var $scope = $('.box_detail_slider');
        var $btnMore = $scope.find('.btn_detail_more');
        var speed = 300;
        var init = function () {
            $btnMore.removeClass('active').html(BDWeb.Resource.GetResourceValue("NEW_WEB_BOARD_SUBMENU_OPEN"));
            $('.detail_content_wrap').css('display', 'none');
        };
        abyss.btnClick($btnMore, function ($this) {
            if (!$this.hasClass('active')) {
                $this.next('.detail_content_wrap').slideDown(speed, function () {
                    $this.addClass('active').html(BDWeb.Resource.GetResourceValue("NEW_WEB_BOARD_SUBMENU_FOLD"));
                });
            }
            else {
                $this.next('.detail_content_wrap').slideUp(speed, function () {
                    $this.removeClass('active').html(BDWeb.Resource.GetResourceValue("NEW_WEB_BOARD_SUBMENU_OPEN"));
                });
            }
        });
        init();
    };

    // 하단 언어 선택 박스
    abyss.languageChange = function (id) {
        if (!abyss.isEmpty(id) && document.getElementById(id)) {
            document.getElementById(id).addEventListener('change', function (e) {
                location.href = _abyss.api.Http.Portal + '/Api/LanguageChange?lang=' + this.value;
            });
        }
    };

    // 하단 사이트 맵
    abyss.siteMap = function () {
        var speed = 300;
        var country = $('.footer_item').data('country');

        $('.footer_item .current_country').html($('.sitemap_country [data-country="' + country + '"]').text());
        $('.sitemap_country [data-country="' + country + '"]').addClass('active');

        abyss.btnClick($('.btn_country'), function ($this, e) {
            e.stopPropagation();
            if (!$this.hasClass('active')) {
                $this.parent().prev('.sitemap_country').slideDown(speed, function () {
                    $('html,body').animate({ scrollTop: $('.sitemap_country').offset().top - $('.header_wrap').outerHeight() }, speed);
                    $this.addClass('active');
                });
            }
            else {
                $this.parent().prev('.sitemap_country').slideUp(speed, function () {
                    $this.removeClass('active');
                });
            }
        });
        abyss.btnClick($("body:not(.sitemap_country, .sitemap_country *)"), function () {
            $('.sitemap_country').slideUp(speed, function () {
                $('.btn_country').removeClass('active');
            });
        });
    };

    abyss.useGuestPassCoupon = function () {
        abyss.confirmLogin(function () {
            if (!confirm(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_CONFIRM")))
            {
                return null;
            }
            $.ajax({
                async: true,
                cache: false,
                url: _abyss.api.Http.Portal + '/Main/SetBeginnerCoupon',
                type: 'GET',
                contentsType: false,
                dataType: false,
                success: function (result, txtStatus, jqXHR) {
                    switch (result.Result) {
                        case 0:
                            //지급 성공
                            if (confirm(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_REGIST_SUCCESS_GO_MY_PAGE"))) {
                                location.href = _abyss.api.Http.Portal + "/MyPage/";
                            }
                            break;
                        case -10018:
                            //쿠폰 입력 실패 제한
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_APPLY_LIMIT"));
                            break;
                        case -10000:
                            //빈 쿠폰
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_EMPTY"));
                            break;
                        case -10010:
                            //계정없을 경우
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_CHECK_ACCOUNT"));
                            break;
                        case -10012:
                            //쿠폰 기간 에러
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_NOT_PEROID"));
                            break;
                        case -10013:
                            //아이템 지급 에러
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_NOTVALID"));
                            break;
                        case -10014:
                            //패키지 구매 유저
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_ALREADY_USE"));
                            break;
                        case -10015:
                            //중복 사용 불가
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_DUPLICATE"));
                            break;
                        case -10016:
                            //쿠폰 기간 만료
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_EXPIRED"));
                            break;
                        case -10017:
                            //게패쿠 중복사용 불가
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_ONLY_USE"));
                            break;
                        case -114:
                            //에러
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_NOTVALID"));
                            break;
                        default:
                            //에러
                            alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_NOTVALID"));
                            break;
                    }
                },
                error: function () {
                    alert(BDWeb.Resource.GetResourceValue("NEW_WEB_MSG_GUEATPASS_COUPON_NOTVALID"));
                }
            });

        });
    };

    $(document).ready(function () {
        if (_abyss.api) {
            $.ajax({
                dataType: "jsonp"
                , url: _abyss.api.Http.Portal + "/Api/GetUserInfo/"
                , type: "GET"
                , success: function (result) {
                    _userInformation = result;
                }
            });
        }
    })

    abyss.init();

    return abyss;
})(window._abyss || {}, jQuery);

$(function () {
    var varUA = navigator.userAgent.toLowerCase();
    if (varUA.match('android') != null) {
        $('body').addClass('mobile android');
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
        $('body').addClass('mobile iphone');
    } else {
        //아이폰, 안드로이드 외 처리
    }
});
