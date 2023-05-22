@extends('layouts.layout')

@section('content')
        <h1>Alle Bücher</h1>
        {{ $entities->links() }}
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Titel</th>
                    <th>AutorIn</th>
                    <th>Seiten</th>
                    <th>Jahr</th>
                    <th>Bearbeiten</th>
                </tr>
            </thead>
            <tbody>
                @foreach($entities as $index=>$book)
                    <tr>
                        <td>{{ $book->title}}</td>
                        <td>{{ $book->author}}</td>
                        <td>{{ $book->pages}}</td>
                        <td>{{ $book->year}}</td>
                        <td>
                            <a href="{{url('books/show/'.$book->id)}}" class="btn btn-success">Show</a>
                            <a href="{{url('books/edit/'.$book->id)}}" class="btn btn-success">Edit</a>
                            <a href="{{url('books/delete/'.$book->id)}}" class="btn btn-danger">Del</a>
                        </td>
                    </tr>   
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <a href="{{url('books/add')}}" class="btn btn-success">Add</a>
                    </td>
                </tr>   
            </tfoot>
        </table>
        {{ $entities->links() }}
@endsection 