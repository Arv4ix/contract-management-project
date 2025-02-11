<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFooundException;
use Exception;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     */
    public function index(): JsonResponse
    {
        try {
            $clients = Client::all();
            return response()->json($clients);
        } catch (Exception $e) {
            Log::error('Error fetching clients: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to retrieve clients'], 500);
        }
    }

    /**
     * Store a newly created client in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:clients,email',
                'phone' => 'required|string|max:20',
            ]);

            $client = Client::create($validatedData);

            return response()->json(['message' => 'Client created successfully', 'client' => $client], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error creating client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create client'], 500);
        }
    }

    /**
     * Display the specified client.
     */
    public function show($id): JsonResponse
    {
        try {
            $client = Client::findOrFail($id);
            return response()->json($client);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Client not found'], 404);
        } catch (Exception $e) {
            Log::error('Error fetching client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to retrieve client'], 500);
        }
    }

    /**
     * Update the specified client in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $client = Client::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:clients,email,' . $id,
                'phone' => 'sometimes|required|string|max:20',
            ]);

            $client->update($validatedData);

            return response()->json(['message' => 'Client updated successfully', 'client' => $client]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Client not found'], 404);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error updating client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update client'], 500);
        }
    }

    /**
     * Remove the specified client from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $client = Client::findOrFail($id);
            $client->delete();

            return response()->json(['message' => 'Client deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Client not found'], 404);
        } catch (Exception $e) {
            Log::error('Error deleting client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete client'], 500);
        }
    }
}
