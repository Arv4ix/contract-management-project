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
        Schema::create('clients', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name', 255); // Increased length for full names
            $table->string('company_name')->nullable(); // If clients are businesses
            $table->string('email')->index(); //  email with index
            $table->string('phone')->nullable(); // Optional phone number
            $table->text('address')->nullable(); // Optional address field
            $table->timestamps(); // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
