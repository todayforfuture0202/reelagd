// BF twimple twitter feed
BF_TWIMPLE = {
    appendTo: ".section-feeds #twimple",
    loadTweets: function(t, e, a) {
        settings = {
            num_tweets: e,
            twitter_id: a
        }, jQuery.ajax({
            url: '/wp-content/plugins/TwimpleFeed/grabtweets.php',
            type: "POST",
            dataType: "json",
            data: settings,
            success: function(t, a, s) {
                for (var r = 0; e > r; r++) {
                    var n = t[r].created_at;
                    message = '<div class="tweet-message"><p>' + BF_TWIMPLE.ify.clean(t[r].text) + "</p></div>", time = '<div class="tweet-time"><h6>' + n.substr(0, 11) + "</h6></div>", jQuery(BF_TWIMPLE.appendTo).append('<div class="twmp-tweet">' + time + message + "</div>")
                }
            }
        })
    },
    ify: {
        link: function(t) {
            return t.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(t, e, a, s, r) {
                var n = a.match(/w/) ? "http://" : "",
                    i = e,
                    t = e.length,
                    c = e.substr(t - 1, t);
                return c.match(/[A-Za-z0-9_]/) || (i = e.substr(0, t - 1)), '<a class="twitter-link" target="_blank" href="' + n + i + '">' + (e.length > 25 ? e.substr(0, 24) + "..." : e) + "</a>" + r
            })
        },
        at: function(t) {
            return t.replace(/\B[@@]([a-zA-Z0-9_]{1,20})/g, function(t, e) {
                return '<a target="_blank" class="twitter-at" href="http://twitter.com/' + e + '">@' + e + "</a>"
            })
        },
        list: function(t) {
            return t.replace(/\B[@@]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(t, e) {
                return '<a target="_blank" class="twitter-list" href="http://twitter.com/' + e + '">@' + e + "</a>"
            })
        },
        hash: function(t) {
            return t.replace(/(^|\s+)#(\w+)/gi, function(t, e, a) {
                return e + '<a target="_blank" class="twitter-hash" href="http://twitter.com/search?q=%23' + a + '">#' + a + "</a>"
            })
        },
        clean: function(t) {
            return this.hash(this.at(this.list(this.link(t))))
        }
    }
};




jQuery(function($){

    grav = {};

    grav.lastScrollPos = $(window).scrollTop();

    grav.headerAnimationDown = function(){
        var scrollPos = $(window).scrollTop();
        if($(window).width() > 1024){
            if(scrollPos > 90){
                if (scrollPos >= grav.lastScrollPos){
                    $('html').removeClass('scroll-up').addClass('scroll-down');
                } else {
                    $('html').removeClass('scroll-down').addClass('scroll-up');
                }
            } else {
                $('html').removeClass('scroll-up scroll-down');
            }
        } else {
            $('html').removeClass('scroll-up scroll-down');
        }
        grav.lastScrollPos = scrollPos;
    }

    grav.animateContent = function(){
		$('.block-container.animate-content').each(function()
		{
			if($(window).scrollTop() + $(window).innerHeight() > $(this).offset().top + ($(window).innerHeight()/4)){
				$(this).addClass('animated');
			}
		});
	}

    grav.playVideo = function(){
		$('.block-container .block-background-video-wrapper').each(function()
		{
			if($(window).scrollTop() + $(window).innerHeight() > $(this).offset().top + ($(window).innerHeight()/4)){
				$(this).children('video')[0].play();
			}
		});
	}

    grav.videoRatio = 1.77777777778;
    grav.setBannerBg = function(){
        if($('.banner-container').length){
            var bgHeight = $('.banner-container').innerHeight() + 60;
            if($('.bg-image').length && $('.bg-image').hasClass('home-bg-image')){
                var winWidth = $(window).innerWidth();
                var bgRatio = winWidth / bgHeight;
                if(bgRatio > grav.videoRatio){
                    $('.bg-image').addClass('landscape');
                } else {
                    $('.bg-image').removeClass('landscape');
                }
                $('.bg-image').css('height', bgHeight).addClass('shown');
            } else {
                $('.bg-image').css('height', bgHeight).addClass('shown');
            }
        }
    }

});
