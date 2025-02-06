<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contract;
use Illuminate\Http\Request;

class ContractListController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::all();

        if ($request->has('client_id') && $request->client_id != '') {
            $contracts = Contract::where('client_id', $request->client_id)->get();
        } else {
            $contracts = Contract::all();
        }

        return response()->json(['clients' => $clients, 'contracts' => $contracts]);
    }
}

