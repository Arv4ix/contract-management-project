<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Log;

class ContractController extends Controller
{
    /**
     * Display a listing of the contracts.
     */
    public function index(): JsonResponse
    {
        $contracts = Contract::with('client')->get();
        return response()->json($contracts);
    }

    /**
     * Store a newly created contract in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'contract_name' => 'required|string|max:255',
                'client_id' => 'required|exists:clients,id',
                'start_date' => 'required|date',
                'duration' => 'required|integer|min:1',
                'comments' => 'nullable|string|max:500',
            ]);

            $contract = Contract::create($validatedData);

            return response()->json($contract, 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Display the specified contract.
     */
    public function show($id): JsonResponse
    {
        $contract = Contract::with('client')->find($id);
        
        if (!$contract) {
            return response()->json(['error' => 'Contract not found'], 404);
        }

        return response()->json($contract);
    }

    /**
     * Update the specified contract in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'client_id' => 'sometimes|exists:clients,id',
                'start_date' => 'sometimes|date',
                'duration' => 'sometimes|integer|min:1',
                'comment' => 'nullable|string|max:500',
            ]);

            $contract = Contract::find($id);
            if (!$contract) {
                return response()->json(['error' => 'Contract not found'], 404);
            }

            $contract->update($validatedData);

            return response()->json($contract);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Remove the specified contract from storage.
     */
    public function destroy($id): JsonResponse
    {
        $contract = Contract::find($id);
        if (!$contract) {
            return response()->json(['error' => 'Contract not found'], 404);
        }

        $contract->delete();
        return response()->json(['message' => 'Contract deleted successfully']);
    }
}
