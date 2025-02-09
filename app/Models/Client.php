<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients'; // Explicit table name (optional)

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'company_name',
        'address',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}
