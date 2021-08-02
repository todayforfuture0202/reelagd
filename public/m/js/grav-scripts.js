/*
*
* Custom Global Functions
*
*/
loader = '<div class="loading-screen"><span class="moon"></span><span class="space-station"></span><span class="mercury"></span><span class="loader"></span></div>';

function loadMember(memberID, page){
	var data = {
		'action': 'get_member_info',
		'memberId': memberID
	};
	jQuery('body').append(loader);
	jQuery.post('/wp-admin/admin-ajax.php', data, function(response) {
		var response = jQuery.parseJSON(response);
		if(page){
			history.pushState(null, null, '/company/'+response.slug);
		}
		jQuery('.member-profile-name').empty().html(response.name);
		jQuery('.member-profile-title').empty().html(response.title);
		jQuery('.member-profile-description').empty().html(response.description);
		jQuery('.member-profile-latest-title, .member-profile-latest-list').empty();
		jQuery('.grav-slideout').css('background-image', '');
		if(response.author_posts != ''){
			jQuery('.member-profile-latest-title').html(response.latest_title);
			jQuery('.member-profile-latest-list').html(response.author_posts);
		}
		if(response.image_url != false){
			jQuery('.grav-slideout').css('background-image', 'url('+response.image_url+')');
		}
		jQuery('.loading-screen').remove();
		jQuery('html').addClass('grav-slideout-active');
	});
}

jQuery(function($){




    hasClass = false;
	function gravTrigger($this){
        if($('html').hasClass('colorbox-active')){
            $.colorbox.close()
            $('html').removeClass('colorbox-active');
        } else {
            if($this.hasClass('project-inquiry')){
    			$('.grav-slideout').css('background-image', 'none');
    		}
    		if($('html').hasClass('grav-slideout-active') || $('html').hasClass('form-active')){
    			$('html').removeClass('grav-slideout-active form-active');
    			if($this.data('page')){
    				history.pushState(null, null, '/company/');
    			}
    		} else if($('html').hasClass('search-active')) {
                $('html').removeClass('search-active');
            } else {
    			var target = $this.data('target');
    			var cssClass = $this.data('css-class');
                if(cssClass == 'menu' && $('html').hasClass('menu-active')){
                    hasClass = false;
                }
    			$(target).toggleClass(cssClass+'-active');
                if(cssClass == 'search' && $('html').hasClass('search-active')){
                    setTimeout(function(){
                        $('.search-desktop input.s').focus();
                    }, 750);
                }
    		}
        }
	}

    function gravInquiry(){
        $('.grav-slideout').css('background-image', 'none');
        $('html').toggleClass('form-active');
    }
	function bannerPara(){
		if($('.banner-container').length && !Modernizr.touchevents){
			//window.requestAnimationFrame(bannerPara);
			var scrollPos = $(window).scrollTop(),
				paraSpeed = .5,
				aniValue = (scrollPos * paraSpeed);
			$('.banner-container').css({
				'-webkit-transform': 'translate3d(0, '+aniValue.toFixed(2)+'px, 0)',
				'-moz-transform': 'translate3d(0, '+aniValue.toFixed(2)+'px, 0)',
				'transform': 'translate3d(0, '+aniValue.toFixed(2)+'px, 0)',
			});
		}
	}
	function videoCbox(elem){
		$(elem).click(function(e){
			e.preventDefault();
			if($(window).width() > 641){
				$(this).colorbox({iframe:true, width:"100%", height:"100%"});
			} else {
				window.open($(this).attr('href'), '_blank');
			}
		});
	}
	function loadPosts(elem){
		var data = elem.data();
		data.action = 'get_more_posts';
		if(data.paged){
			data.paged = data.paged + 1;
			elem.attr('data-paged', data.paged);
		}
		$('body').append(loader);
		$.post('/wp-admin/admin-ajax.php', data, function(response) {
			var response = $.parseJSON(response);
			$('.knowledge-posts-wrapper').append(response.content);
			if(response.last_page){
				$('.load-more').fadeOut();
			}
		}).then(function(){
			setTimeout(function(){
				$('.knowledge-posts-wrapper .column').removeClass('loading');
				$('.loading-screen').remove();
			}, 500);
		});
	}
	function shareSticky(){
		if($('.share-sticky').length){
			scrollPos = $(window).scrollTop();
			parentHeight = $('.global-wrapper').outerHeight();
			parentOffset = $('.global-wrapper').offset().top;
			bottomPos = parentHeight + parentOffset - $(window).height();
			if(scrollPos < window.sharePos - 26){
				$('.share-sticky').removeClass('stuck absolute active');
			}
			if(scrollPos >= window.sharePos - 26){
				$('.share-sticky').removeClass('absolute active').addClass('stuck');
			}
			if(scrollPos >= bottomPos){
				$('.share-sticky').removeClass('stuck').addClass('absolute active');
			}
		}
	}
    function tocSticky(){
		if($('.col-sidebar > ul').length){
            stuckOffset = 100;
			scrollPos = $(window).scrollTop();
			parentHeight = $('.col-sidebar').outerHeight();
			parentOffset = $('.col-sidebar').offset().top;
			bottomPos = parentHeight + parentOffset - window.targetHeight - stuckOffset;
			if(scrollPos < window.tocPos - stuckOffset){
				$('.col-sidebar').removeClass('stuck align-bottom');
			}
			if(scrollPos >= window.tocPos - stuckOffset){
				$('.col-sidebar').removeClass('stuck align-bottom').addClass('stuck');
			}
			if(scrollPos >= bottomPos){
				$('.col-sidebar').removeClass('stuck').addClass('align-bottom');
			}
		}
	}
	function colorUpdate(){
		var wrapperColor = $('.single-work .main-content-wrapper').attr('data-bg-color');
		$('.single-work .main-content-wrapper').css('color', wrapperColor);
	}


    function minMaxId(selector, slides) {
        var min=null, max=null;
		if($(selector).length){
			$(selector).children(slides).css('min-height', '0px');
	        $(selector).each(function() {
	            var height = parseInt($(this).outerHeight(), 10);
	            if ((min===null) || (height < min)) { min = height; }
	            if ((max===null) || (height > max)) { max = height; }
	        });
	        return {min:min, max:max};
		}
		return false;
    }
    function setSlideHeight(selector, children, height){
        $(selector).each(function(){
            $(this).children(children).css('min-height', height+'px');
        });
    }

    $.fn.extend({
        hasClasses: function (selectors) {
            var self = this;
            for (var i in selectors) {
                if ($(self).hasClass(selectors[i]))
                    return true;
            }
            return false;
        }
    });

    function gravHeaderAniResize(){
        var winWidth = $(window).width();

        if(winWidth > 1024 && $('html').hasClass(['menu-active'])){
            hasClass = true;
            $('html').removeClass('menu-active');
        }
        if(winWidth <= 1024 && hasClass){
            $('html').addClass('menu-active');
        }
    }
	function focusCheck() {
		windowFocus = setInterval(function(){
			if($('.home-bg-image').length){
				if(!document.hasFocus()){
					$('.home-bg-image video').unbind('stop pause');
					$(".home-bg-image video.active").get(0).pause();
					$('html').addClass('lost-focus');
				}
				if(document.hasFocus() && $('html').hasClass('lost-focus')) {
					$('html').removeClass('lost-focus');
					$(".home-bg-image video.active").bind('stop pause', function(e) {
						videoJukeBox();
					}).get(0).play();
				}
			}
		}, 500);
	}
	function scrollCheck() {
		if($('.home-bg-image').length){
			var winHeight = $(window).height();
			$(window).scroll(function() {
				if($(window).scrollTop() >= winHeight){
					$('.home-bg-image video').unbind('stop pause');
					$(".home-bg-image video.active").get(0).pause();
					$('html').addClass('past-focus');
				}
				if($(window).scrollTop() < winHeight && $('html').hasClass('past-focus')) {
					$('html').removeClass('past-focus');
					$(".home-bg-image video.active").bind('stop pause', function(e) {
						videoJukeBox();
					}).get(0).play();
				}
			});
		}
	}
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	function createPlaylist(){
		if($('.home-bg-image').length){
			var data = $('.home-bg-image').data(),
				min = 1,
				max = data.videoTotal,
				numVideo = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
			videoArray = [];
			videoIndex = 0;
			for(var i=min; i<max+1; i++){
				videoArray.push(i);
			}
			shuffledArray = shuffle(videoArray);
		}
	}
	function videoJukeBox(){
		//focusCheck();
		if($('.home-bg-image').length){
			// console.log(shuffledArray);
			// console.log(shuffledArray[videoIndex]);
			numVideo = shuffledArray[videoIndex];
			if(numVideo){
				$('.home-bg-image video[data-video-num='+numVideo+']').prop('muted', true).attr('preload', 'auto').attr('autoplay', '');
				$('.home-bg-image video').removeClass('active').unbind('stop pause');

				$('.home-bg-image video[data-video-num='+numVideo+']').addClass('active').get(0).play();
				if(shuffledArray[videoIndex+1]){
					$('.home-bg-image video[data-video-num='+shuffledArray[videoIndex+1]+']').prop('muted', true).attr('preload', 'auto').attr('autoplay', '');
				}
				if($('.home-bg-image').hasClass('random-all')){
					$(".home-bg-image video.active").bind('stop pause', function(e) {
						videoIndex++;
						if(videoIndex > videoArray.length - 1){
							videoIndex = 0;
						}
						videoJukeBox();
					});
				}
			}
		}
	}
	createPlaylist();
	videoJukeBox();
	//scrollCheck();
	/*
	* End Functions
	*/

	$('.load-more-posts').click(function(e){
		e.preventDefault();
		loadPosts($(this));
	});

	function company_filter_2018() {
		// related functions: loadMember and gravTrigger

		// alpha-ordering of tags
		var company_tags_alpha_ordering = $('.company-filter .tag').sort(function(a, b) {
		  return String.prototype.localeCompare.call($(a).text().toLowerCase(), $(b).text().toLowerCase());
		});
		$('.company-filter .tags').empty().append(company_tags_alpha_ordering).prepend('<span class="team-filter active" data-filter="all">All Team Members</span>');


		// close team detail on doc click, reset url to /company/
		var html_active_class = $('html.grav-slideout-active'),
			slideout = $('.grav-slideout');
		$(document).on('click', function(event) {
			if (!$(event.target).closest(slideout).length) {
				if ($('html').hasClass('grav-slideout-active')) {
					$('html').removeClass('grav-slideout-active');
	    			history.pushState(null, null, '/company/');
				}
			}
		});

		// MOBILE: open and scroll-to active tag
		function tag_container() {
			var tags_container = $('.tag-listing .tags'),
				row = tags_container.closest('.tag-listing'),
				active_tag = tags_container.find('.team-filter.active');
			if (!tags_container.hasClass('open')) {
				tags_container.addClass('open');
				// tags_container.animate({
				// 	// scrollTop: active_tag.offset().top - tags_container.offset().top + tags_container.scrollTop() - (tags_container.height()/2)
				// 	scrollTop: active_tag.offset().top - tags_container.offset().top + tags_container.scrollTop()
				// });
			} else {
				tags_container.removeClass('open');
				// tags_container.animate({
				// 	// scrollTop: active_tag.offset().top - tags_container.offset().top + tags_container.scrollTop() - (tags_container.height()/2)
				// 	scrollTop: active_tag.offset().top - row.offset().top + row.scrollTop()
				// });
			}

			console.log('active_tag.offset().top '+active_tag.offset().top);
			console.log('tags_container.offset().top '+tags_container.offset().top);
			console.log('tags_container.scrollTop() '+tags_container.scrollTop());
			console.log(tags_container.find('.team-filter.active').attr('data-filter'));
		}
		$('.tag-listing .mobile-filter').on('click', function() {
			tag_container();
		});

		// masonry style the team members, isotope on filter
		var $masonry_company = $('.company-listing').isotope({
			itemSelector: '.team-member',
		});
		$('.tag-listing .team-filter').on('click', function() {
			var active_tag = $(this),
				data_filter = $(this).attr('data-filter'),
				filterValue = '.'+data_filter;

			$('.tag-listing .tags').prepend(active_tag);
			if (data_filter === 'all') {

				$masonry_company.isotope({filter: '*'});
			} else {
				$masonry_company.isotope({filter: filterValue});
			}
		});

		// loadMember function
		$('.team-member').on('click', function(e){
			e.preventDefault();
			loadMember($(this).attr('data-member-id'), $(this).attr('data-page'));
		});

		// tag style toggling
		$('.team-filter').on('click', function(e){
			e.preventDefault();
			var filter = $(this).data('filter');
			$('.team-filter').removeClass('active');
			$(this).addClass('active');
			$('.team-member').addClass('active');
			$('.team-member:not(.'+filter+')').removeClass('active');
			tag_container();
		});
	}



	$(document).ready(function(){

		company_filter_2018();

		$('#masonry-wrapper').masonry();


		// console.log('saved');

		/* Make all External Links and PDF's open in a new Tab */
	    var host = new RegExp('/' + window.location.host + '/');
	    $('a').each(function() {
		    if ((!host.test(this.href) && this.href.slice(0, 1) != "/" && this.href.slice(0, 1) != "#" && this.href.slice(0, 1) != "?") || this.href.indexOf('.pdf') > 0) {
			    $(this).attr({'target': '_blank'});
		    }
		});
		colorUpdate();
        grav.animateContent();
        grav.playVideo();

		$('.nav-trigger, .filter-ix, a.subnav-item:not(.sub-capability), button.project-inquiry, .search-trigger').on('click', function(e){
			e.preventDefault();
			gravTrigger($(this));
		});
        $('a[href="#open-project-form"], button[href="#open-project-form"]').on('click', function(e){
            e.preventDefault();
            gravInquiry();
        });
		videoCbox('.video-play, .block-link-video');

		// TODO move these into functions


		$('.grav-next').on('click', function(e){
			e.preventDefault();
			var currentPos = $('.company-filter .row').scrollLeft();
			$('.company-filter .row').animate({
				scrollLeft: currentPos+300
			});
		});
		$('.grav-prev').on('click', function(e){
			e.preventDefault();
			var currentPos = $('.company-filter .row').scrollLeft();
			$('.company-filter .row').animate({
				scrollLeft: currentPos-300
			});
		});
		$('.share-sticky .icon-share').on('click', function(){
			parent = $(this).parent();
			if(parent.hasClass('stuck') || parent.hasClass('absolute')){
				if(!parent.hasClass('noticed') && parent.hasClass('absolute')){
					parent.addClass('noticed');
				}
				parent.toggleClass('active');
			}
		});


        $(document).bind('cbox_open', function(){
            $('html').addClass('colorbox-active');
        });




        featuredSlideHeight = minMaxId('.block-featured-work .swiper-slide', '.row');
        setSlideHeight('.block-featured-work .swiper-slide', '.row', featuredSlideHeight.max);

		formSlideHeight = minMaxId('.block-slider-form .swiper-wrapper', '.swiper-slide');
        setSlideHeight('.block-slider-form .swiper-wrapper', '.swiper-slide', formSlideHeight.max);

        $('.sub-capability').on('click', function(e){
            e.preventDefault();
            var target = '.'+$(this).attr('data-css-class');
            if($(this).hasClass('active')){
                $('.sub-capability, .menu').removeClass('active');
            } else {
                $('.sub-capability, .menu').removeClass('active');
                $(target).addClass('active');
                $(this).addClass('active');
            }

        });
        $('.toc').on('click', function(e){
            e.preventDefault();
            var target = '.'+$(this).attr('data-css-class');
            if($(this).hasClass('active')){
                $('.capability-nav, .capability-nav .menu').removeClass('active');
            } else {
                $('.capability-nav, .menu').removeClass('active');
                $(target).addClass('active');
                $(this).addClass('active');
            }

        });
        grav.headerAnimationDown();



		$('.media-slider-container').each(function(index){
			var blockIndex = $(this).data('block-index');
			var mediaSlider = new Swiper($(this)[0], {
			    speed: 400,
				slidesPerView: 1,
				loop: true,
				paginationClickable: true,
				pagination: '.swiper-pagination-'+blockIndex,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
			});
		});

		$('.cycle-slideshow').each(function(index){
			var blockIndex = $(this).data('block-index');
			var testimonialSlider = new Swiper($(this)[0], {
				speed: 400,
				slidesPerView: 1,
				loop: true,
				paginationClickable: true,
				pagination: '.cycle-swiper-pagination-'+blockIndex,
				wrapperClass: 'swiper-wrapper',
			});
		});

		$('.featured-work-slider').each(function(index){
			var blockIndex = $(this).data('block-index');
			var workSlider = new Swiper($(this)[0], {
				speed: 300,
				effect: 'fade',
				fade: {
				  crossFade: true
			  	},
				slidesPerView: 1,
				loop: true,
				paginationClickable: true,
				lazyLoading: true,
				lazyLoadingInPrevNext: true,
				parallax: true,
				pagination: '.cycle-swiper-pagination-'+blockIndex,
				wrapperClass: 'swiper-wrapper',
				nextButton: '.work-swiper-next-'+blockIndex,
		        prevButton: '.work-swiper-prev-'+blockIndex,
			});
		});

		$('.featured-slider').each(function(index){
			var blockIndex = $(this).data('block-index');
			var featuredSlider = new Swiper($(this)[0], {
			    speed: 500,
				slidesPerView: 1,
				loop: true,
				paginationClickable: true,
				parallax: true,
				lazyLoading: true,
				lazyLoadingInPrevNext: true,
				pagination: '.swiper-pagination-'+blockIndex,
			});
		});

		// FAQ Accordion Content Block
		const accordionButtons = document.querySelectorAll('.accordion-button');
		const accordionSections = document.querySelectorAll('.accordion-item-content');

		accordionSections.forEach(function(section) {
			section.setAttribute('aria-hidden', true);
			section.classList.remove('open');
		});
		
		accordionButtons.forEach(function(button) {
			var associatedSection = button.parentElement.nextElementSibling;

			button.addEventListener('click', function() {
				button.classList.toggle('expanded');
				associatedSection.classList.toggle('open');
				if (button.classList.contains('expanded')) {
					button.setAttribute('aria-expanded', true);
					associatedSection.setAttribute('aria-hidden', false);
				} else {
					button.setAttribute('aria-expanded', false);
					associatedSection.setAttribute('aria-hidden', true);
				}
			});
		});

		// Tabs Content Block
		if ($('.block-tabs')) {
			$('.block-tabs').each(function() {
				var tabs = document.querySelector('.tabs-container');
				var tabsContentContainer = document.querySelector('.tabs-content-container');
				var tabButtons = tabs.querySelectorAll('[role="tab"]');
				var tabPanels = Array.from(tabsContentContainer.querySelectorAll('[role="tabpanel"]'));
				var accordionTabBtns = tabsContentContainer.querySelectorAll('.tab-accordion-button');
				var accordionTabSections = tabsContentContainer.querySelectorAll('.tab-accordion-item-content');
				var firstAccordionTabSection = tabsContentContainer.querySelector('.tab-accordion-item-content');

				accordionTabSections.forEach(function(section) {
					section.setAttribute('aria-hidden', true);
					section.classList.remove('open');
				});

				firstAccordionTabSection.setAttribute('aria-hidden', false);
				firstAccordionTabSection.classList.add('open');

				var handleTabClick = function(event) {
					// hide the tab panels
					tabPanels.forEach(function(panel) {
						panel.setAttribute('aria-hidden', true);
					});

					// hide the accordion sections (on mobile)
					accordionTabSections.forEach(function (section) {
						section.setAttribute('aria-hidden', true);
						section.classList.remove('open');
					});

					// remove expanded class from the tab buttons (on mobile)
					accordionTabBtns.forEach(function(tabBtn) {
						tabBtn.classList.remove('expanded');
						tabBtn.setAttribute('aria-expanded', false);
					});

					// set aria-selected to false on the tab buttons
					tabButtons.forEach(function(tab) {
						tab.setAttribute('aria-selected', false);
					});

					// get data attribute number that was clicked on
					var id = event.currentTarget.getAttribute('data-tab-index');

					// set aria-selected to true on tab button that was clicked or related
					var tabBtn = tabs.querySelector(`[data-tab-index="${id}"]`);
					tabBtn.setAttribute('aria-selected', true);

					// add expanded class to the related accordion button (on mobile)
					var tabAccordionButton = tabsContentContainer.querySelector(`[data-tab-index="${id}"] button.tab-accordion-button`);
					tabAccordionButton.classList.add('expanded');

					// set tab panel that was clicked on to aria hidden false
					var tabPanel = tabsContentContainer.querySelectorAll(`[data-tab-index="${id}"]`);
					tabPanel.forEach(function(panel) {
						panel.setAttribute('aria-hidden', false);
					});
				}

				tabButtons.forEach(function(button) {
					button.addEventListener('click', handleTabClick);
				});

				accordionTabBtns.forEach(function(button) {
					button.addEventListener('click', handleTabClick);
				});
			});
			
		};

	});

	/*
	*
	*	Place items in here to have them run the page is loaded
	*
	*/
	$(window).load(function() {
		grav.setBannerBg();
		if($('.share-sticky').length){
			window.sharePos = $('.share-sticky').offset().top;
		}
        if($('.col-sidebar > ul').length){
			window.tocPos = $('.col-sidebar > ul').offset().top;
            window.targetHeight = $('.col-sidebar > ul').innerHeight();
		}
        tocSticky();
	});

	/*
	*
	*	Place items in here to have them run when the window is scrolled
	*
	*/



	$(window).scroll(function() {
		bannerPara();
		shareSticky();
        tocSticky();
        grav.animateContent();
        grav.playVideo();
        grav.headerAnimationDown();
	});

	/*
	*
	*	Place items in here to have them run when the window is resized
	*
	*/
	$(window).resize(function() {
		featuredSlideHeight = minMaxId('.block-featured-work .swiper-slide', '.row');
        setSlideHeight('.block-featured-work .swiper-slide', '.row', featuredSlideHeight.max);
		formSlideHeight = minMaxId('.block-slider-form .swiper-wrapper', '.swiper-slide');
        setSlideHeight('.block-slider-form .swiper-wrapper', '.swiper-slide', formSlideHeight.max);

        gravHeaderAniResize();
        if($('.share-sticky').length){
			window.sharePos = $('.share-sticky').offset().top;
		}
        if($('.col-sidebar > ul').length){
			window.tocPos = $('.col-sidebar > ul').offset().top;
            window.targetHeight = $('.col-sidebar > ul').innerHeight();
		}
		grav.setBannerBg();
	});



});
