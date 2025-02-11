<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contract;
use App\Models\Client;

class ContractsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have clients before creating contracts
        if (Client::count() === 0) {
            $this->call(ClientsTableSeeder::class);
        }

        // Create 15 contracts using the factory
        Contract::factory()->count(15)->create();
    }
}
