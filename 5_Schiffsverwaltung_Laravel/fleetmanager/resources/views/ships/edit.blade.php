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

        <h1>Schiff hinzufügen</h1>
        @include('snippets.error')    
        {!! Form::model($entity, ['url' => 'ships/update/'.$entity->id]) !!}
            {!! Form::text('name', null, ['class'=>'form-control', 'placeholder'=>'Schiffsname...']) !!}
            <br/>    
            {!! Form::text('brt', null, ['class'=>'form-control', 'placeholder'=>'BRT...']) !!}
            <br/>
            {!! Form::text('length', null, ['class'=>'form-control', 'placeholder'=>'Length...']) !!}
            <br/>
            {!! Form::text('width', null, ['class'=>'form-control', 'placeholder'=>'Width...']) !!}
            <br/>
            {!! Form::text('height', null, ['class'=>'form-control', 'placeholder'=>'Height...']) !!}
            <br/>
            {!! Form::text('color', null, ['class'=>'form-control', 'placeholder'=>'Color...']) !!}
            <br/>
            {!! Form::text('seats', null, ['class'=>'form-control', 'placeholder'=>'Seats...']) !!}
            <br/>
            {!! Form::submit('Speichern' ,  ['class'=>'btn btn-success']) !!}
            <a href="{{url('ships')}}" class="btn btn-danger">Abbrechen</a>

         {!! Form::close() !!}
@endsection
