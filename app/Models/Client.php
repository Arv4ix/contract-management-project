<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'clients';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    /**
     * A client can have many contracts.
     */
    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }
}
