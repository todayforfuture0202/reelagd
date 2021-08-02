<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use DB;
use Session;
use View;
use Redirect;
use Request;

class UserController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index() {
        return View::make('user');
    }

    public function mobile() {
        return View::make('mobile/user');
    }

    public function login() {
        $user_name     = $_GET['u_name'];
        $user_password = $_GET['pwd'];
        
        $userInfo = array();
        $userInfo['strUserID'] = trim($user_name);
        $userInfo['strUserPW'] = trim($user_password);
        $strValue = json_encode($userInfo);
        $strUrl = "http://www.reelbox-a.com:8673/api/oner?nOnerCmd=92&nOnerCode=0&strValue=$strValue";
        $ret = file_get_contents($strUrl);

        if($ret == "Success") {
            Session::put('user_session', $user_name);
        }
        
        echo $ret;      
    }

    public function register() {
        if(isset($_GET['user_name'])) {
            $user_name      = $_GET['user_name'];
            $nick_name      = $_GET['nick_name'];
            $user_password  = $_GET['password'];
            $phone_num      = $_GET['phone_num'];
            
            if(trim($user_name) == "") {
                echo "아이디를 입력하세요.";
            }
            else if(trim($nick_name) == "") {
                echo "닉네임을 입력하세요.";
            }
            else if(trim($user_password) == "") {
                echo  "비번을 입력하세요.";
            }
            else if(trim($phone_num) == "") {
                echo "전화번호를 입력하세요.";
            }
            else {
                $domain_name = $_SERVER['HTTP_HOST'];
                $domain_name = str_replace("www.", "", $domain_name);
                
                $userInfo = array();
                $userInfo['userID'] = trim($user_name);
                $userInfo['userNick'] = trim($nick_name);
                $userInfo['userPW'] = trim($user_password);
                $userInfo['userPhone'] = trim($phone_num);
                $userInfo['domain'] = $domain_name;
                $strValue = json_encode($userInfo);
                
                $strUrl = "http://www.reelbox-a.com:8673/api/oner?nOnerCmd=54&nOnerCode=0&strValue=$strValue";
                $ret = file_get_contents($strUrl);
                
                echo $ret;
            }
        }       
    }

    public function logout() {
        $user_session = Session::get('user_session');
        Session::flush();        
        return Redirect::to('/');
    }

    public function getLoginDetailList() {
        $limitData = 14;
        $sql = "SELECT tbl_excharge.accTime AS accTime, tbl_excharge.exCash AS cash, '[출금]'  AS kind, tbl_user.userNick AS userNick FROM tbl_excharge LEFT JOIN tbl_user ON tbl_user.userCode = tbl_excharge.userCode WHERE tbl_excharge.exCheck = 1 UNION SELECT tbl_tempEx.accTime AS accTime, tbl_tempEx.cash AS cash, CASE WHEN tbl_tempEx.kind = 1 THEN '[출금]' ELSE '[입금]' END AS kind, tbl_tempEx.userNick FROM tbl_tempEx ORDER BY accTime DESC LIMIT 14";
        
        $livejacpat = DB::select($sql);

        if (count($livejacpat) > 0) {
            // output data of each row
            $livejacpatHTML = "<table style='width: 100%;'>";

            foreach($livejacpat as $row) {
                $date = substr($row->accTime, 0, 10);
                $livejacpatHTML .= "<tr style='height: 38px;'>";
                $livejacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 10%; text-align: left; font-weight: 900;'>".$row->kind."</td>";
                $livejacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 35%; text-align: center; font-weight: 900;'>".$date."</td><td style='width:10%'></td>";
                $livejacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 20%; text-align: left; font-weight: 900;'>".$row->userNick."</td>";
                $livejacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 25%; text-align: right; font-weight: 900; padding-right: 10px;'>".$row->cash."</td>";                
                $livejacpatHTML .= "</tr>";
            }

            $livejacpatHTML .= "</table>";
        }
                
        $strtime = date('Y-m-d H:i:s', strtotime('-7 days'));
        $sql = "SELECT CASE WHEN tbl_user.userNick IS NULL THEN tbl_robot.rbNick ELSE tbl_user.userNick END AS userNick, tbl_gear.gearNum AS gearNum, tbl_gamename.gameName AS gameName, tbl_jackinfo.jackName AS jackName, tbl_jackpot.jackAmount AS jackAmount, tbl_jackpot.jackTime AS jackTime ";
        $sql .= "FROM tbl_jackpot LEFT JOIN tbl_user ON tbl_user.userCode = tbl_jackpot.userCode LEFT JOIN tbl_robot ON tbl_robot.rbCode = tbl_jackpot.rbCode LEFT JOIN tbl_gear ON tbl_gear.gearCode = tbl_jackpot.gearCode LEFT JOIN tbl_jackinfo ON tbl_jackinfo.jackCont = tbl_jackpot.jackCont AND tbl_jackinfo.gameCode = tbl_jackpot.gameCode ";
        $sql .= "LEFT JOIN tbl_gamename ON tbl_jackpot.gameCode = tbl_gamename.gameCode UNION SELECT tbl_tempjack.userNick AS userNick, tbl_tempjack.gearNum AS gearNum, tbl_tempjack.gameName AS gameName, tbl_tempjack.jackName AS jackName, ";
        $sql .= "tbl_tempjack.jackAmount AS jackAmount, tbl_tempjack.jackTime AS jackTime FROM tbl_tempjack WHERE jackTime > '". $strtime ."' ORDER BY jackAmount DESC, jackTime LIMIT 14";
        $topjacpat = DB::select($sql);;

        if (count($topjacpat) > 0) {
            // output data of each row
            $topjacpatHTML = "<table style='width: 100%;'>";

            foreach($topjacpat as $row) {
                $date = substr($row->jackTime, 0, 10);
                $topjacpatHTML .= "<tr style='height: 37px;'>";
                $topjacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 30%; text-align: center; font-weight: 900;'>".$date."</td><td style='width:7%'></td>";
                $topjacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 25%; text-align: left; font-weight: 900;'>".$row->userNick."</td>";
                $topjacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 15%; text-align: left; font-weight: 900;'>".$row->gameName."</td>";
                $topjacpatHTML .= "   <td style='padding-top: 7px; vertical-align: top; width: 20%; text-align: right; font-weight: 900;'>".$row->jackAmount."</td>";
                $topjacpatHTML .= "</tr>";
            }

            $topjacpatHTML .= "</table>";
        }

        $result = array();
        $result['topjacpatHTML'] = $topjacpatHTML;
        $result['livejacpatHTML'] = $livejacpatHTML;
        $result['curdate'] = $strtime;
        echo json_encode($result);  
    }
}
