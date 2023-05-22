@extends('layouts.layout')

@section('content')
        <h1>Das Schiff "{{ $entity->name}}"</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>BRT</th>
                    <th>Bearbeiten</th>
                </tr>
            </thead>
            <tbody>
                
                    <tr>
                        <th>{{ $entity->name}}</th>
                        <th>{{ $entity->brt}}</th>
                        <th></th>
                    </tr>   
                
            </tbody>
        </table>
@endsection
