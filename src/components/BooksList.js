import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Books List</h2>
            <div className="row">
                {books.length > 0 ? (
                    books.map(book => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={book.coverImage} className="card-img-top" alt={book.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{book.name}</h5>
                                    <p className="card-text"><strong>Author:</strong> {book.author}</p>
                                    <p className="card-text"><strong>Published:</strong> {book.publishedDate}</p>
                                    <a href={`/books/${book.id}`} className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No books found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BooksList;
