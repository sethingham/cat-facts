<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('count/{facts}', function ($facts) {

    //returns facts as an integer if valid, otherwise return 1
    $facts = (is_numeric($facts) && $facts > 0) ? (int) $facts : 1;
    
    $response = Http::get('https://catfact.ninja/facts?limit='.$facts);
    return $response->json();

});
