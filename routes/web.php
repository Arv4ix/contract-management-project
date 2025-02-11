<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

// Serve the React app for all routes except API
Route::view('/{path}', 'app')->where('path', '^(?!api).*');
