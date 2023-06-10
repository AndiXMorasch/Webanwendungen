@extends('layouts.layout')

@section('content')

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="{{url('ships')}}">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="{{url('ships')}}">Schiffe</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{url('shipmodels')}}">Modelle</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="{{url('manufacturers')}}">Hersteller</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <h1>Der Hersteller "{{ $entity->name}}"</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Bearbeiten</th>
                </tr>
            </thead>
            <tbody>
                
                    <tr>
                        <th>{{ $entity->name}}</th>
                        <th></th>
                    </tr>   
                
            </tbody>
        </table>
@endsection