<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $table = 'contracts'; // Explicit table name (optional)

    protected $fillable = [
        'contract_name',
        'contract_version',
        'client_id',
        'date_signed',
        'start_date',
        'duration',
        'status', // e.g., active, expired, pending
        'comments'
    ];

    protected $casts = [
        'date_signed' => 'date',
        'start_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
