<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    $agent = new \Jenssegers\Agent\Agent;

    if ($agent->isDesktop()) {
        return View::make('user');      
    }
    else {
        return View::make('mobile/user');
    }
});

Route::get('/event', function () {
    return View::make('event');
});

Route::get('/guide', function () {
    return View::make('guide');
});

Route::get('/toc', function () {
    return View::make('toc');
});

Route::get('/login',                           'UserController@login');
Route::get('/logout',                           'UserController@logout');
Route::get('/getLoginDetailList',              'UserController@getLoginDetailList');
Route::get('/register',                        'UserController@register');
