<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Ship extends Model
{
    public function shipmodel()
    {
        return $this->belongsTo(Shipmodel::class);
    }
}