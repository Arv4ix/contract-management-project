<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContractList extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'contracts'; // Uses contracts table as the base

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * A contract list entry belongs to a client.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
