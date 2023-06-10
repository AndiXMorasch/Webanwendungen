<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ship;

class ShipController extends Controller
{
    protected $className = 'App\Models\Ship';
    protected $entityName = 'ships';
    protected $fields = ['name', 'brt', 'length', 'width', 'height', 'color', 'seats'];
    protected $validation = [
        'name' => 'required',
        'brt' => 'required|numeric',
        'length' => 'required|numeric',
        'width' => 'required|numeric',
        'color' => 'required',
        'seats' => 'required'
    ];
    //
}