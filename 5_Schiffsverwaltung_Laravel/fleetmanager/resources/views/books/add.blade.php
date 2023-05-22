@extends('layouts.layout')

@section('content')
        <h1>Buch hinzufügen</h1>
        @include('snippets.error')

        {!! Form::open(['url' => 'books/save']) !!}
            {!! Form::text('title', null, ['class'=>'form-control', 'placeholder'=>'Buchtitel...']) !!}
            <br/>
            {!! Form::text('author', null, ['class'=>'form-control', 'placeholder'=>'Autor...']) !!}
            <br/>
            {!! Form::text('pages', null, ['class'=>'form-control', 'placeholder'=>'Seitenzahl...']) !!}
            <br/>
            {!! Form::text('year', null, ['class'=>'form-control', 'placeholder'=>'Erscheinungsjahr...']) !!}
            <br/>
            {!! Form::submit('Speichern', ['class'=>'btn btn-success']) !!}
            <a href="{{url('books')}}" class="btn btn-danger">Abbrechen</a>

        {!! Form::close() !!}
@endsection
