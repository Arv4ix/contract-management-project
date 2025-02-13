<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('contract_name', 255); // Increased length for better naming
            $table->foreignId('client_id')->constrained()->onDelete('cascade'); // Foreign key referencing 'clients', cascade on delete
            $table->date('start_date'); // Contract start date 
            $table->string('duration'); // Duration in months, prevents negative values
            $table->text('comments')->nullable(); // Additional comments
            $table->timestamps(); // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
