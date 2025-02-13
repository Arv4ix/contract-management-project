<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contract extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'contracts';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'contract_name',
        'client_id',
        'start_date',
        'duration',
        'comments',
    ];

    /**
     * A contract belongs to a client.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
