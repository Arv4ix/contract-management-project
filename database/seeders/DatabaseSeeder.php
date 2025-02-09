<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ClientsTableSeeder;
use Database\Seeders\ContractsTableSeeder;
use App\Models\User;

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

        // Seed a default user if the User model exists
        if (class_exists(User::class)) {
            User::factory()->create([
                'name' => 'Test Users',
                'email' => 'tester@testmail.com',
            ]);
        } else {
            $this->command->warn('User model not found. Skipping user seeding.');
        }
    }
}
