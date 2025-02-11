<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ClientsTableSeeder;
use Database\Seeders\ContractsTableSeeder;
use App\Models\Client;
use App\Models\Contract;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed clients and contracts in correct order
        $this->call([
            ClientsTableSeeder::class,
            ContractsTableSeeder::class,
        ]);
    }
}
