@extends('layouts.layout')

@section('content')
        <h1>Schiff hinzufügen</h1>
        @include('snippets.error')
        {!! Form::model($entity, ['url' => 'ships/update/'.$entity->id]) !!}
            {!! Form::text('name', null, ['class'=>'form-control', 'placeholder'=>'Schiffsname...']) !!}
            <br/>
            {!! Form::text('brt', null, ['class'=>'form-control', 'placeholder'=>'BRT...']) !!}
            <br/>
            {!! Form::submit('Speichern', ['class'=>'btn btn-success']) !!}
            <a href="{{url('ships')}}" class="btn btn-danger">Abbrechen</a>

        {!! Form::close() !!}
@endsection
