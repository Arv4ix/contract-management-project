<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        \Log::info('Test log entry');
        $clients = Client::all();
        \Log::info('Clients data:', $clients->toArray());
        
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'phone' => 'required|string|max:20',
        ]);

        $client = Client::create($request->all());
        return response()->json(['success' => 'Client created successfully.', 'client' => $client], 201);
    }

    public function show(Client $client)
    {
        return response()->json($client);
    }

    public function update(Request $request, Client $client)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:clients,email,' . $client->id,
            'phone' => 'sometimes|required|string|max:20',
        ]);

        $client->update($request->all());
        return response()->json(['success' => 'Client updated successfully.', 'client' => $client]);
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['success' => 'Client deleted successfully.']);
    }
}
