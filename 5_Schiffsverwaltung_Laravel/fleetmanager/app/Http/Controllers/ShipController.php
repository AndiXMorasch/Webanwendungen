<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ship;

class ShipController extends Controller
{   
    protected $className = 'App\Models\Ship';
    protected $entityName = 'ships';
    protected $fields = ['name', 'brt'];
    protected $validation = [
        'name' => 'required',
        'brt' => 'required|numeric'
    ];
    //
}
