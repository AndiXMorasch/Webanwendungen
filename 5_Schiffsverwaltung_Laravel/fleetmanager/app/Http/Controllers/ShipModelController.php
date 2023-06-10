<?php

namespace App\Http\Controllers;

class ShipModelController extends Controller
{
    protected $className = 'App\Models\Shipmodel';
    protected $entityName = 'shipmodels';
    protected $fields = ['name'];
    protected $validation = [
        //'hersteller_id' => 'required',
        'name' => 'required'
    ];
    //
}