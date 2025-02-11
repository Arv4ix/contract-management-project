<?php

namespace Database\Factories;

use App\Models\Contract;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contract>
 */
class ContractFactory extends Factory
{
    protected $model = Contract::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'contract_name' => $this->faker->sentence(3),
            'client_id' => Client::factory(), // Ensures a client exists before creating a contract
            'start_date' => $this->faker->date(),
            'duration' => $this->faker->numberBetween(6, 36) . ' months',
            'comments' => $this->faker->sentence(10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
