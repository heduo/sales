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

// index page, default page is Dashboard
Route::get('/', function () {
    return view('pages.index');
});

Route::get('/sales', 'SaleController@salesChart');

Route::get('/datagrid', 'SaleController@dataGrid');

