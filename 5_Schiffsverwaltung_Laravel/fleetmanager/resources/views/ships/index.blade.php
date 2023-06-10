@extends('layouts.layout')

@section('content')

        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        </head>

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="{{url('ships')}}">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="{{url('ships')}}">Schiffe</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{url('shipmodels')}}">Modelle</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{url('manufacturers')}}">Hersteller</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <h1>Alle Schiffe</h1>
        {{ $entities->links() }}
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>BRT</th>
                    <th>Länge</th>
                    <th>Breite</th>
                    <th>Höhe</th>
                    <th>Farbe</th>
                    <th>Plätze</th>
                    <th>Bearbeiten</th>
                </tr>
            </thead>
            <tbody>
                @foreach($entities as $index=>$ship)
                    <tr>
                        <td>{{ $ship->name}}</td>
                        <td>{{ $ship->brt}}</td>
                        <td>{{ $ship->length}}</td>
                        <td>{{ $ship->width}}</td>
                        <td>{{ $ship->height}}</td>
                        <td>{{ $ship->color}}</td>
                        <td>{{ $ship->seats}}</td>
                        <td>
                            <a href="{{url('ships/show/'.$ship->id)}}" class="btn btn-success">Show</a>
                            <a href="{{url('ships/edit/'.$ship->id)}}" class="btn btn-success">Edit</a>
                            <a href="{{url('ships/delete/'.$ship->id)}}" class="btn btn-danger">Del</a>
                        </td>
                    </tr>   
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <a href="{{url('ships/add')}}" class="btn btn-success">Add</a>
                    </td>
                </tr>   
            </tfoot>
        </table>
        {{ $entities->links() }}
@endsection 