<?php

namespace App\Http\Controllers;

class ManufacturerController extends Controller
{
    protected $className = 'App\Models\Manufacturer';
    protected $entityName = 'manufacturers';
    protected $fields = ['name'];

    protected $validation = [
        'name' => 'required',
    ];
}