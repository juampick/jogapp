<?php

// ============ API Routes ============
    Route::group(array('prefix' => 'api/v1'), function () {

        # TimeEntry #
        Route::resource('time_entry', 'TimeEntryController', ['only' => ['index', 'store', 'update', 'destroy']]);

        # JWT Authentication #
        Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
        Route::post('authenticate', 'AuthenticateController@authenticate');
        Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
        Route::post('authenticate/signup', 'AuthenticateController@signUp');
    });

// ============ Angular Routing ============
    Route::get('/', function () {
        return File::get(public_path() . '/app/index.html');
    });

//If route is missing: route to angular app for routing
    Route::any('{path?}', function () {
        return File::get(public_path() . '/app/index.html');
    })->where("path", ".+");
