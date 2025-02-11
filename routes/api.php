<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractController;

// API Routes for Clients
Route::prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index']); // Fetch all clients
    Route::post('/', [ClientController::class, 'store']); // Create new client
    Route::get('{id}', [ClientController::class, 'show']); // Fetch single client
    Route::put('{id}', [ClientController::class, 'update']); // Update client
    Route::delete('{id}', [ClientController::class, 'destroy']); // Delete client
});

// API Routes for Contracts
Route::prefix('contracts')->group(function () {
    Route::get('/', [ContractController::class, 'index']); // Fetch all contracts
    Route::post('/', [ContractController::class, 'store']); // Create new contract
    Route::get('{id}', [ContractController::class, 'show']); // Fetch single contract
    Route::put('{id}', [ContractController::class, 'update']); // Update contract
    Route::delete('{id}', [ContractController::class, 'destroy']); // Delete contract
});
