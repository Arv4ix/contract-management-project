<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Client;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index()
    {
        $contracts = Contract::with('client')->get();
        return response()->json($contracts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'contract_name' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'start_date' => 'required|date',
            'duration' => 'required|integer',
            'comment' => 'nullable|string',
        ]);

        $contract = Contract::create($request->all());
        return response()->json(['success' => 'Contract created successfully.', 'contract' => $contract], 201);
    }

    public function show(Contract $contract)
    {
        return response()->json($contract);
    }

    public function update(Request $request, Contract $contract)
    {
        $request->validate([
            'contract_name' => 'sometimes|required|string|max:255',
            'client_id' => 'sometimes|required|exists:clients,id',
            'start_date' => 'sometimes|required|date',
            'duration' => 'sometimes|required|integer',
            'comment' => 'nullable|string',
        ]);

        $contract->update($request->all());
        return response()->json(['success' => 'Contract updated successfully.', 'contract' => $contract]);
    }

    public function destroy(Contract $contract)
    {
        $contract->delete();
        return response()->json(['success' => 'Contract deleted successfully.']);
    }
}
