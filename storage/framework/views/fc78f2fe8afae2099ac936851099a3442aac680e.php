<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Reel-ZZang</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<meta name="viewport" content="width=1600,minimum-scale=0,maximum-scale=1">-->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link href="css/common.css" rel="stylesheet" type="text/css">
    <link href="css/layout.css?<?php echo e(time()); ?>" rel="stylesheet" type="text/css">
	<link href="css/lion.css" rel="stylesheet" type="text/css">
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <script language="javascript" src="js/showid.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/animations.css"><!-- CSS animations1 -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script><!-- 기본 -->

    <!-- slideshow2 { -->
    <link rel="stylesheet" type="text/css" href="css/slideshow.css" />
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="js/slideshow.js"></script>
    <!-- } slideshow2 -->

    <script type="text/javascript" src="js/popup.js"></script><!-- 팝업 -->
    <!--<script type="text/javascript" src="js/script.js"></script>--><!-- GNB -->

    <!-- 실시간출금 롤링 -->
    <!--<script type="text/javascript" src="js/table.js"></script>-->

    <script type="text/javascript" src="js/jquery.number.min.js"></script>
    <script type="text/javascript" src="js/jquery.lazyload.js"></script>

    <script type="text/javascript" src="js/lion.min.js?v=1589442973"></script>
    <script type="text/javascript" src="js/parsley.min.js"></script>
    <script type="text/javascript" src="js/parsley.remote.min.js"></script>
    <script type="text/javascript" src="js/alertify.min.js"></script>

    <script type="text/javascript" src="js/pusher.min.js"></script>

    <link rel="stylesheet" href="css/alertify.min.css">
    <link rel="stylesheet" href="css/default.min.css">

    <script>
        $(document).ready(function () {
            
            $(document).bind("contextmenu", function (e) {
                return false;
            });

            if (location.pathname === '/'){
                var isLogin = "";
                var newMsgCount = '0';
                if (parseInt(newMsgCount) > 0 && parseInt(isLogin)){
                    alertify.alert('알림', '새로운 쪽지가 ' + newMsgCount + '개 있습니다. [쪽지함]에서 확인하세요.');
                }
            }
        });

        $(document).bind('selectstart', function () {
            return false;
        });

        $(document).bind('dragstart', function () {
            return false;
        });

        window.onload = function () {
		};
    </script>
<script>
        function goPAGE() {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                window.location.href="m/index.php";
            }
        }
         goPAGE();
    </script>
    
</head>

<body id="id_main">
<audio id="newMSG">
    <!-- <source src="/sound/message.mp3" type="audio/mpeg"/> -->
</audio>
<audio id="alertMSG">
    <!-- <source src="/sound/alert.wav" type="audio/mpeg"/> -->
</audio>
<div class='wrapper_loading hidden'>
    <img src="images/loading.gif" class="wrapper_loading_img" alt="">
</div>

<!-- 메인 -->
<div id="wrap" style="width: 100% !important; height: 100%;">
    <div id="header_wrap">
        <div class="header_box">
            <!-- <div class="live_casino" onclick="location.href='/'" style="cursor:pointer;">
                <img src="images/logo.png">
            </div> -->
			<table style="width: 100%">
				<tr><td>
					<?php if(Session::has('user_session')) { ?>
						<b><h2 style="float: left; margin-top: 5px; font-weight: bold; color: #ffffff; margin-right: 20px; sans-serif;">
								<?php echo Session::get('user_session')?> 님
							</h2></b>
					<?php } ?>
				</td><td>
					<div class="login" style="margin-right: 445px; display: flex;">
						
						<form id="loginForm" action="https://www.lion-ace57.com/login" method="post" data-parsley-validate="true">
							<input type="hidden" name="_token" value="eEkvArWbwt5O3sAp5iPWdtnjR65kjcuM521U7j0N">
							<ul>
								
								<li id="sign-in-submit">
									<?php if(!Session::has('user_session')) { ?>
										<div style="display: flex;">
											<div class="login_div" onclick="showLoginForm();">

											</div>
											<div class="register_div" onclick="showRegisterForm();">

											</div>
										</div>
									<?php } ?>                        
								</li>
								<li>
									<?php if(!Session::has('user_session')) { ?>
										
									<?php } else {?> 
										<a href="/logout" class="etc_pop1_open">
											<img src="images/logout.png?v01">
										</a>
									<?php } ?>
								</li>					
							</ul>
						</form>
					</div>
				</td></tr>
			</table>
		</div>
    </div>
	
	<div class="desktop-download" onclick="onDownloadPC()">
										
	</div>
	<div class="mobile-download" onclick="onDownloadMobile()">
	
	</div>
<!--
<div class="main_game_wrap">
    <div class="main_game_box">
        <div class="main_game_title">
            <img src="images/slot_title.png">
        </div>
    </div>
</div>
-->
    <div class="main_game_wrap" style="display: none;">
        <div class="main_game_box">
				<div class="main_game_title"></div>
			<div class="main_game">
				<div class="play2_effect">
						<ul>
							<li class="play2 slot01" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot02" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot03" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot04" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot05" >
								<?php if(!Session::has('user_session')) { ?>
								<a href="javascript:void(0);"								
										onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
									<span></span>
								</a>
								<?php } else {?> 
								<a href="javascript:void(0);" >									
									<span></span>
								</a>
								<?php } ?> 
							</li>
						</ul>
						<ul>
							<li class="play2 slot06" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot07" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot08" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot09" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
							<li class="play2 slot10" >
								<?php if(!Session::has('user_session')) { ?>
									<a href="javascript:void(0);"								
											onclick="alertify.alert('알림', '로그인이 필요합니다.');"  >									
										<span></span>
									</a>
									<?php } else {?> 
									<a href="javascript:void(0);" >									
										<span></span>
									</a>
								<?php } ?>
							</li>
						</ul>						
				</div>
			</div>
		</div>
	</div>
<!--
    <div style="width: 100%; text-align: center;">
        <div style="cursor:pointer; margin-top: 2250px !important; width: 100% !important; text-align: center;">
            <img src="images/logo.png">
        </div>
    </div>
	-->
<!-- <div class="title_5" onclick="onDownloadPC()" style="cursor:pointer; margin-top: 250px !important;"><img src="images/down.png?v02"></div>
<div class="title_5" onclick="onDownloadPC()" style="cursor:pointer; margin-top: 1700px !important;"><img src="images/down1.png?v02"></div> -->


<!-- <div style="width: 488px; height: 38px; position: absolute; top: 4620px; left: 413px;">
	<table style="width: 100%;">
		<tr>
			<td style="width: 10%; text-align: center;"></td>
			<td style="width: 35%; text-align: center; font-size: 15px; font-weight: 900;">시간</td>
			<td style='width:10%'></td>
			<td style="width: 20%; text-align: left; font-size: 15px; font-weight: 900;">닉네임</td>
			<td style="width: 25%; text-align: right; font-size: 15px; font-weight: 900;">금액</td>
		</tr>
	</table>
</div>
<div style="width: 488px; height: 38px; position: absolute; top: 4620px; left: 977px;">
	<table style="width: 100%;">
		<tr>
			<td style="width: 30%; text-align: center; font-size: 15px; font-weight: 900;">시간</td>
			<td style='width: 7%'></td>
			<td style="width: 25%; text-align: left; font-size: 15px; font-weight: 900;">닉네임</td>
			<td style="width: 15%; text-align: left; font-size: 15px; font-weight: 900;">게임종류</td>
			<td style="width: 20%; text-align: right; font-size: 15px; font-weight: 900;">잭팟금액</td>
		</tr>
	</table>
</div> -->

<!-- <div style="width: 488px; height: 200px; position: absolute; top: 4653px; left: 413px;" id="id_livejacpatData"></div>
<div style="width: 488px; height: 200px; position: absolute; top: 4653px; left: 977px;" id="id_jacpattopData"></div> -->
<!--<div class="title_5" onclick="onDownloadPC()" style="cursor:pointer; margin-top: 550px !important;"><img src="images/down2.png"></div>-->
<!--<div class="title_6" onclick="onDownloadMobile()" style="cursor:pointer; text-align: right; margin-top: 100px; width: 100%;"><img src="images/m_down.png"></div>-->
<!-- <div class="title_7"><img src="images/title_7.png"></div> -->

<!-- <div class="title_9"><img src="images/title_9.png"></div> -->
<!--<div id="footer"><img src="images/footer.png"></div>--><!-- footer -->

</div><!-- wrap -->
		<div class="modal" id="signupModal" style="margin-top: 250px; z-index: 999999">
			<div class="modal-dialog">
				<div class="modal-content" style="background-color: rgba(0,0,0,0.9) !important; color: white !important;">
					<!-- Modal Header -->
					<div class="modal-header">
					<h2 class="modal-title" style="font-size: 2.5em; font-weight: bolder">회원가입</h2>
					<button type="button" class="close" onclick="onCloseRegisterForm()" data-dismiss="modal" style="color: white; font-size:28px;">&times;</button>
					</div>
					
					<!-- Modal body -->
					<div class="modal-body">
						<div class="needs-validation text-center" id="register-form">
							<div id="error"></div>
							<div class="form-group text-left">
							<label for="uname" style="font-size:14px; font-weight: bolder">아이디:</label>
							<input type="text" class="form-control" id="user_name" name="user_name" required style="font-size:15px;">
							<div class="valid-feedback">Valid.</div>
							<div class="invalid-feedback">Please fill out this field.</div>
							</div>
							<div class="form-group text-left">
							<label for="uname" style="font-size:14px; font-weight: bolder">닉네임:</label>
							<input type="text" class="form-control" id="nick_name" name="nick_name" required style="font-size:15px;">
							<div class="valid-feedback">Valid.</div>
							<div class="invalid-feedback">Please fill out this field.</div>
							</div>
							<div class="form-group text-left">
							<label for="pwd" style="font-size:14px; font-weight: bolder">암호:</label>
							<input type="password" class="form-control" id="password" name="password" required style="font-size:15px;">
							<div class="valid-feedback">Valid.</div>
							<div class="invalid-feedback">Please fill out this field.</div>
							</div>
							<div class="form-group text-left">
							<label for="pwd" style="font-size:14px; font-weight: bolder">전화번호(환전 및 이벤트 당첨시 중요합니다. 정확히 넣어 주세요.):</label>
							<input type="text" class="form-control" id="phone_num" name="phone_num" required style="font-size:15px;">
							<div class="valid-feedback">Valid.</div>
							<div class="invalid-feedback">Please fill out this field.</div>
							</div>
							<button type="button" onclick="submitRegister()" class="btn btn-primary px-5" style="margin: auto; font-size:14px;" name="btn-save" id="btn-submit">가입</button>
						</div>
					</div>      
				</div>
			</div>
		</div>

		<div class="modal" id="signinModal" style="margin-top: 250px; z-index: 999999">
			<div class="modal-dialog">
				<div class="modal-content" style="background-color: rgba(0,0,0,0.9) !important; color: white !important;">
				
					<!-- Modal Header -->
					<div class="modal-header">
						<div style="display: block;">
							<h2 class="modal-title" style="font-size: 3em; font-weight: bolder">로그인</h2>
							<h6 style="cursor: pointer; font-size:16px; font-weight: bolder" onclick="showRegisterForm()">회원 가입이 안되신분들은 회원가입을 해주십시요.</h6>
						</div>                    
						<button type="button" class="close" onclick="onCloseLoginForm()" data-dismiss="modal" style="color: white;font-size:28px;">&times;</button>
					</div>
					<!-- Modal body -->
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
							<label for="uname" style="font-size:16px; font-weight: bolder">아이디:</label>
							<input type="text" class="form-control" id="u_name" name="u_name" required style="font-size:16px;">
							<div class="valid-feedback" style="font-size:16px;">Valid.</div>
							<div class="invalid-feedback" style="font-size:16px;">Please fill out this field.</div>
							</div>
							<div class="form-group text-left">
							<label for="pwd" style="font-size:16px; font-weight: bolder">암호:</label>
							<input type="password" class="form-control" id="pwd" name="pwd" required style="font-size:16px;">
							<div class="valid-feedback" style="font-size:16px;">Valid.</div>
							<div class="invalid-feedback" style="font-size:16px;">Please fill out this field.</div>
							</div>
							<button type="submit" class="btn btn-primary px-5" id="btn-check" name="btn-check" onclick="submitLogin()" style="margin: auto; font-size:16px; font-weight: bolder">로그인</button>
						</div>
					</div>      
				</div>
			</div>
		</div>		
		<!-- Tocplus 15.1 -->
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
							alertify.alert('알림', data);
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
						if(data == "가입에 성공하엿습니다.") {
							onCloseRegisterForm();
							alertify.alert('알림', data);
							doLogin(user_name, password);
						} else {
							alertify.alert('알림', data);
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
							alertify.alert('알림', data);
						}
					}
				});
			}

			//getLoginDetailListData();
			//setInterval(function(){ getLoginDetailListData(); }, 5000);

			function getLoginDetailListData() {
				$.ajax({
					type: "GET",
					url: "/getLoginDetailList",
					data: {} ,
					success: function(data) {                        
						var result = JSON.parse(data);
						document.getElementById("id_livejacpatData").innerHTML = result['livejacpatHTML'];
						document.getElementById("id_jacpattopData").innerHTML = result['topjacpatHTML'];
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

				function onDownloadPC() {
					document.location.href = "http://210.180.118.22:81/ReelZzangSetup.exe";
				}

				function onDownloadMobile() {
					document.location.href = "http://210.180.118.22:81/ReelZzang.apk";
				}
				
				<?php }?>
		</script>

		<script>
			function autoResizeDiv()
			{
				document.getElementById('id_main').style.height = window.innerHeight +'px';
			}
			window.onresize = autoResizeDiv;
			autoResizeDiv();
		</script>
<!-- Tocplus 15.1 -->
<script type="text/javascript">
tocplusTop=15;
tocplusLeft=10;
tocplusMinimizedImage='http://kr03.tocplus007.com/img/minimized_ko.gif';
tocplusHAlign='right';
tocplusWidth=357;
tocplusHeight=270;
tocplusUserName='VIP';
tocplusFrameColor='#FFD700';
tocplusFloatingWindow=true;
var tocplusHost = (("https:" == document.location.protocol) ? "https://" : "http://");
//document.write(unescape("%"+"3Cscript src='" + tocplusHost + "kr03.tocplus007.com/chatLoader.do?userId=jojo1' type='text/javascript'"+"%"+"3E"+"%"+"3C/script"+"%"+"3E"));
</script>
<!-- End of Tocplus -->
</body>
</html>
<?php /**PATH D:\ReelGame\ReelZangDownload\resources\views/user.blade.php ENDPATH**/ ?>