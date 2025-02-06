<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\Contract;

class ContractsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        Contract::truncate();

        // Fetch clients dynamically
        $clients = Client::pluck('id')->toArray();

        // Ensure there are clients before inserting contracts
        if (empty($clients)) {
            $this->command->warn('No clients found! Run ClientsTableSeeder first.');
            return;
        }

        // Sample contracts data
        $contracts = [
            [
                'client_id' => $clients[0] ?? null,
                'contract_name' => 'Contract 1',
                'contract_number' => 'C-1001',
                'start_date' => '2025-01-01',
                'duration' => 12,
                'comments' => 'Initial contract for project A',
            ],
            [
                'client_id' => $clients[0] ?? null,
                'contract_name' => 'Contract 2',
                'contract_number' => 'C-1002',
                'start_date' => '2025-02-01',
                'duration' => 6,
                'comments' => 'Short-term contract for project B',
            ],
            [
                'client_id' => $clients[1] ?? null,
                'contract_name' => 'Contract 3',
                'contract_number' => 'C-1003',
                'start_date' => '2025-03-01',
                'duration' => 24,
                'comments' => 'Long-term contract for project C',
            ],
            [
                'client_id' => $clients[1] ?? null,
                'contract_name' => 'Contract 4',
                'contract_number' => 'C-1004',
                'start_date' => '2025-04-01',
                'duration' => 18,
                'comments' => 'Mid-term contract for project D',
            ],
            [
                'client_id' => $clients[2] ?? null,
                'contract_name' => 'Contract 5',
                'contract_number' => 'C-1005',
                'start_date' => '2025-05-01',
                'duration' => 36,
                'comments' => 'Extended contract for project E',
            ],
            [
                'client_id' => $clients[3] ?? null,
                'contract_name' => 'Contract 6',
                'contract_number' => 'C-1006',
                'start_date' => '2025-06-01',
                'duration' => 6,
                'comments' => 'Short-term contract for project F',
            ],
        ];

        // Insert data using Eloquent
        foreach ($contracts as $contract) {
            if ($contract['client_id']) {
                Contract::create($contract);
            }
        }
    }
}
