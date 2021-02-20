<?php

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

// Route::get('/', function () {
//     return view('welcome');
// });
Route::view('/{path?}', 'welcome')
     ->where('path', '.*')
     ->name('react');
// Route::get('{reactRoutes}', function () {
// return view('welcome'); // your start view
// })->where('reactRoutes', '^((?!api).)*$'); // except 'api' word
// Route::view('/{path?}/{path?}', 'welcome')
//      ->where('path', '.*')
//      ->name('react');