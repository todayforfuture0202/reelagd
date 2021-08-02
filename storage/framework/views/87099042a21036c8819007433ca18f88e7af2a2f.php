<!doctype html>
<html lang="en-US">

<head>
		
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="application-name" content="ReelBox" />
	<link rel="shortcut icon" href="images/favicon.ico">
	<!--
	<link rel="apple-touch-icon" sizes="57x57" href="images/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="144x144" href="images/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="60x60" href="images/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="120x120" href="images/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="images/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="152x152" href="images/apple-touch-icon-152x152.png">

	<link rel="icon" type="images/png" href="images/favicon-96x96.png" sizes="96x96">
	<meta name="msapplication-TileColor" content="#d52f5b">
	<meta name="msapplication-TileImage" content="images/mstile-144x144.png">
	<link rel="pingback" href="https://www.gravitatedesign.com/xmlrpc.php">
-->
	
<!-- This site is optimized with the Yoast SEO plugin v13.1 - https://yoast.com/wordpress/plugins/seo/ -->
<title>ReelBox</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<link rel='stylesheet' id='wp-block-library-css'  href='m/css/style.min.css?ver=5.4.1' type='text/css' media='all' />
<link rel='stylesheet' id='dashicons-css'  href='m/css/dashicons.min.css?ver=5.4.1' type='text/css' media='all' />
<link rel="stylesheet" href="m/css/alertify.min.css">
<link rel='stylesheet' id='master_css-css'  href='m/css/master.min.css?ver=1593195991' type='text/css' media='all' />

<script type='text/javascript' src='m/js/jquery.js?ver=1.12.4-wp'></script>
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/js/alertify.min.js"></script>
<style>
body{
	display: block;
	height: 900px;
	overflow: auto;
	background:url("m/images/1.jpg?v12") center top no-repeat;
	width: 100% !important;
	z-index:9999;
	background-size: cover;
}

#tocplusWindow {
	z-index: 111111 !important;
}
</style>		
</head>
<body id="body" class="home page-template page-template-front-page page-template-front-page-php page page-id-216 wp-custom-logo wp-schema-pro-1.6.1">
				<!-- Google Tag Manager (noscript) -->
<!-- End Google Tag Manager (noscript) -->	
	<div class="container" style="padding: 0; text-align: center;">
		<!--<img src="m/images/bg.jpg?v12" alt="" style="height: auto; !important;">-->
		<header class="header-global bg-offset-adjust">
			<div class="header-global-nav__row">
				<div class="row align-middle collapse" style="display: block;">
					<div class="columns medium-9 show-for-large">
						<div class="header-global-menu__desktop">
							<div class="menu-global-menu-container">
							<ul id="menu-global-menu" class="menu">
							<?php if(!Session::has('user_session')) { ?>
								<li id="menu-item-15475" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15475"><a href="javascript:showLoginForm();">로그인</a></li>
								<li id="menu-item-165" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-165"><a href="javascript:showRegisterForm();">회원가입</a></li>
								<?php } else {?> 
									<li id="menu-item-15475" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15475"><a href="/logout">로그아읏</a></li>
								<?php } ?>
							</ul>
							</div>					
						</div>
					</div>
				</div>
			</div>
		</header>
		
		<div class="live_casino" onclick="location.href='/index.php'" style="cursor:pointer; left:0; right:0; margin-left:auto; margin-right:auto; z-index: 99;">
			<!-- <img src="m/images/logo.png"> -->
		</div>
			<!-- <img src="m/images/m_down.png?v03"> -->
		<div class="title_6" onclick="onDownloadMobile()" style="cursor:pointer; text-align: center; top: 270px; position: absolute; background-color: red;">
		</div>

		<!-- <div style="width: 246px; height: 20px; position: absolute; top: 1238px; left:18px; right:0; margin-left:auto; margin-right:auto;">
			<style>
				table {
					color: white !important;
					font-size: 10px !important;
					border: none;
				}
				tr {
					height: 20px !important;
				}
				td {
					border: none !important;
					padding : 0 !important;
					padding-top: 4px !important;
				}

				.cls:focus {
					background-color: black;
				}
			</style>
			<table style="width: 100%;">
				<tr>
					<td style="width: 13%; text-align: center;"></td>
					<td style="width: 37%; text-align: center;">시간</td>
					<td style="width: 30%; text-align: left;">닉네임</td>
					<td style="width: 20%; text-align: right;">금액</td>
				</tr>
			</table>
		</div>
		<div style="width: 246px; height: 20px; position: absolute; top: 1258px; left:18px; right:0; margin-left:auto; margin-right:auto;" id="id_livejacpatData"></div> -->
	</div>		
	
	<div class="nav-fixed">
	<a class="nav-trigger" href="#" title="menu" data-target="html" data-css-class="menu"  >Menu</a>
	<span class="button bg-magenta-dark project-inquiry hide-for-smaller">환영합니다 !!</span>
	</div>
	
	<nav class="nav-global-hidden">
		<div class="row bg-offset-adjust collapse align-justify small-uncollapse"style="display: block;">
			<div class="medium-7 large-8 columns hide-for-small-only nav-featured-work">
				<a href="" class="work-wrapper-featured">							
				<div class="work-featured-content">
					<h2></h2>
					<h4></h4>
					<span class="show-for-hover button"></span>
				</div>
				</a>
			</div>
			<div class="small-12 medium-5 large-4 columns nav-global-items align-right align-middle">
				<div class="nav-wrapper-global-items">
					<div class="menu-global-menu-container" style="display: block;">
						<ul id="menu-global-menu-1" class="menu">
							<?php if(!Session::has('user_session')) { ?>
							<li id="menu-item-15475" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15475"><button onclick="showLoginForm();">로그인</button></li>
							<li id="menu-item-165" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-165"><button onclick="showRegisterForm();">회원가입</button></li>
							<?php } else {?> 
							<li id="menu-item-15475" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15475"><button onclick="document.location.href='/logout'">로그아읏</button></li>
							<?php } ?>
							<!--<li id="menu-item-15475" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15475"><button onclick="document.getElementById('tocplus').style.display='none';"<button>고객상담</button></li>-->
						</ul>
					</div>				
				</div>
			</div>
		</div>		
	</nav>

	
	<script type="text/javascript">
			function submitLogin() {
				var u_name      = $( "#u_name" ).val();
				var pwd       	= $( "#pwd" ).val();
				$.ajax({
					type: "GET",
					url: "/login",
					data: {u_name:u_name, pwd:pwd} ,
					success: function(data) {
						if(data == "Success") {
							window.location.href = "/";
						} else {
							alert(data);
						}
					}
				});
			}

			function submitRegister() {
				var user_name      = $( "#user_name" ).val();
				var nick_name      = $( "#nick_name" ).val();
				var password       = $( "#password" ).val();
				var phone_num      = $( "#phone_num" ).val();
				$.ajax({
					type: "GET",
					url: "/register",
					data: {user_name:user_name, nick_name:nick_name, password:password, phone_num:phone_num} ,
					success: function(data) {
						console.log(data);
						if(data == "가입에 성공하엿습니다.") {
							alert(data);
							doLogin(user_name, password);
						} else {
							alert(data);
						}
					}
				});
			}
			
			function doLogin(u_name, pwd) {
				$.ajax({
					type: "GET",
					url: "/login",
					data: {u_name:u_name, pwd:pwd} ,
					success: function(data) {
						if(data == "Success") {
							window.location.href = "/";
						} else {
							alert(data);
						}
					}
				});
			}
			getLoginDetailListData();
			setInterval(function(){ getLoginDetailListData(); }, 5000);

			function getLoginDetailListData() {
				$.ajax({
					type: "GET",
					url: "/getLoginDetailList",
					data: {} ,
					success: function(data) {
						var result = JSON.parse(data);
						document.getElementById("id_livejacpatData").innerHTML = result['livejacpatHTML'];
					}
				});
			}

			function showRegisterForm() {
				document.getElementById('signupModal').style.display = "block";
				document.getElementById('signinModal').style.display = "none";
			}

			function showLoginForm() {
				document.getElementById('signupModal').style.display = "none";
				document.getElementById('signinModal').style.display = "block";
			}
			
			function onCloseRegisterForm() {
				document.getElementById('signupModal').style.display = "none";
			}

			function onCloseLoginForm() {
				document.getElementById('signinModal').style.display = "none";
			}

			<?php if(!Session::has('user_session')) { ?>
				function onOpenInfoWnd() {
					showLoginForm();
				}

				function onOpenUseGuide() {
					showLoginForm();
				}

				function onDownloadPC() {
					showLoginForm();
				}

				function onDownloadMobile() {
					showLoginForm();
				}
			
			<?php } else {?>
				function onOpenInfoWnd() {
					window.open('guide.php','','width=1135, height=547, top=290, left=375, status=no');return false;
				}

				function onOpenUseGuide() {
					window.open('info.php','','width=1135, height=547, top=290, left=375, status=no');return false;
				}

				/*function onDownloadPC() {
					document.location.href = "http://onda365.com/ala_son.exe";
				}

				function onDownloadMobile() {
					document.location.href = "http://onda365.com/ala_son.apk";
				}*/
				function onDownloadPC() {
					document.location.href = "http://reelbox-599.com/download/ReelBoxSetup(VIP).exe";
				}

				function onDownloadMobile() {
					document.location.href = "http://reelbox-599.com/download/ReelBox(VIP).apk";
				}
				
				<?php }?>
		</script>
	<script type='text/javascript' src='m/js/grav-plugins.js?ver=1593195990'></script>
	<script type='text/javascript' src='m/js/grav-functions.js?ver=1593195990'></script>
	<script type='text/javascript' src='m/js/grav-scripts.js?ver=1593195990'></script>
	<script type='text/javascript' src='m/js/wp-embed.min.js?ver=5.4.1'></script>
	<div class="modal" id="signupModal" style="margin-top:80px; z-index: 9999999999999">
		<div class="modal-dialog">
			<div class="modal-content" style="background-color: rgba(0,0,0,0.9) !important; color: white !important;">
				<!-- Modal Header -->
				<div class="modal-header">
				<h2 class="modal-title" style="font-size: 1.5em; font-weight: bolder">회원가입</h2>
				<span class="close" onclick="onCloseRegisterForm()" data-dismiss="modal" style="color: white; font-size:28px; margin-top: -22px; margin-right: -16px;">&times;</span>
				</div>
				
				<!-- Modal body -->
				<div class="modal-body">
					<div class="needs-validation text-center" id="register-form">
						<div class="form-group text-left">
						<label for="uname" style="font-size:14px; font-weight: bolder">아이디:</label>
						<input type="text" class="form-control cls" id="user_name" name="user_name" required style="font-size:15px; border-radius: 15px; color: white; font-weight: bold;">
						</div>
						<div class="form-group text-left">
						<label for="uname" style="font-size:14px; font-weight: bolder">닉네임:</label>
						<input type="text" class="form-control cls" id="nick_name" name="nick_name" required style="font-size:15px; border-radius: 15px; color: white; font-weight: bold;">
						</div>
						<div class="form-group text-left">
						<label for="pwd" style="font-size:14px; font-weight: bolder">암호:</label>
						<input type="password" class="form-control cls" id="password" name="password" required style="font-size:15px; border-radius: 15px; color: white; font-weight: bold;">
						</div>
						<div class="form-group text-left">
						<label for="pwd" style="font-size:14px; font-weight: bolder">전화번호(환전 및 이벤트 당첨시 중요합니다. 정확히 넣어 주세요.):</label>
						<input type="text" class="form-control cls" id="phone_num" name="phone_num" required style="font-size:15px; border-radius: 15px; color: white; font-weight: bold;">
						</div>
						<button type="submit" onclick="submitRegister()" class="btn btn-primary px-5" style="margin: auto; font-size:14px; border-radius: 10px;" name="btn-save" id="btn-submit">가입</button>
					</div>
				</div>      
			</div>
		</div>
	</div>

	<div class="modal" id="signinModal" style="margin-top: 80px; z-index: 9999999999999">
		<div class="modal-dialog">
			<div class="modal-content" style="background-color: rgba(0,0,0,0.9) !important; color: white !important;">
				<div class="modal-header">
					<div style="display: block;">
						<h2 class="modal-title" style="font-size: 1.5em; font-weight: bolder;">로그인</h2>
						<h6 style="cursor: pointer; font-size:16px; font-weight: bolder">회원 가입이 안되신분들은 회원가입을 해주십시요.</h6>
					</div>                    
					<span class="close" onclick="onCloseLoginForm()" data-dismiss="modal" style="color: white;font-size:28px; margin-top: -22px; margin-right: -16px;">&times;</span>
				</div>
				<div class="modal-body">
					<div class="needs-validation text-center" id="login-form">
						<div id="error-login">
						<?php
							if(isset($error)) {
						?>
						<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span><?=$error?></div>
						<?php
							}
						?>
						</div>
						<div class="form-group text-left">
						<label for="uname" style="font-size:16px; font-weight: bolder;">아이디:</label>
						<input type="text" class="form-control cls" id="u_name" name="u_name" required style="font-size:16px;  border-radius: 15px; color: white; font-weight: bold;">
						</div>
						<div class="form-group text-left">
						<label for="pwd" style="font-size:16px; font-weight: bolder">암호:</label>
						<input type="password" class="form-control cls" id="pwd" name="pwd" required style="font-size:16px;border-radius: 15px; color: white;  font-weight: bold;">
						</div>
						<button type="submit" class="btn btn-primary px-5" id="btn-check" name="btn-check" onclick="submitLogin()" style="margin: auto; font-size:16px; font-weight: bolder">로그인</button>
					</div>
				</div>      
			</div>
		</div>
	</div>	
<!-- Tocplus 15.1 -->
<div id="tocplus" class="tocplus" style="overflow: hidden;">
<script type="text/javascript">
tocplusTop=15;
tocplusLeft=10;
tocplusMinimizedImage='http://kr03.tocplus007.com/img/minimized_ko.gif';
tocplusHAlign='left';
tocplusWidth=330;
tocplusHeight=270;
tocplusTop=230;
tocplusUserName='VIP';
tocplusFrameColor='#FFD700';
tocplusFloatingWindow=true;
var tocplusHost = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%"+"3Cscript src='" + tocplusHost + "kr03.tocplus007.com/chatLoader.do?userId=jojo1' type='text/javascript'"+"%"+"3E"+"%"+"3C/script"+"%"+"3E"));
</script>
</div>
<!-- End of Tocplus -->
</body>


</html>

<!--
Performance optimized by W3 Total Cache. Learn more: https://www.boldgrid.com/w3-total-cache/

Object Caching 280/476 objects using memcached
Page Caching using memcached 
Database Caching 5/108 queries in 0.138 seconds using memcached (Request-wide modification query)

Served from: www.gravitatedesign.com @ 2020-06-30 04:25:07 by W3 Total Cache
--><?php /**PATH E:\xampp\htdocs\reel\resources\views/mobile/user.blade.php ENDPATH**/ ?>