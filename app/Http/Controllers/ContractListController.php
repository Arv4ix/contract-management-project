<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
use App\Models\Client;

class ContractListController extends Controller
{
    /**
     * Display a listing of contracts with filtering options.
     */
    public function index(Request $request)
    {
        $query = Contract::with('client');

        // Filtering based on query parameters
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        if ($request->has('start_date')) {
            $query->where('start_date', '>=', $request->start_date);
        }

        if ($request->has('duration')) {
            $query->where('duration', $request->duration);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $contracts = $query->orderBy('start_date', 'desc')->paginate(10);

        return response()->json($contracts);
    }

    /**
     * Display the specified contract details.
     */
    public function show($id)
    {
        $contract = Contract::with('client')->findOrFail($id);
        return response()->json($contract);
    }
}
