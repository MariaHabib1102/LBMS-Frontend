import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/authors')
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.log("There was an error fetching the records:", error);
            });
    }, []);

    return (
        <div>
            <h1>Authors</h1>
            <ul>
                {authors.length > 0 ? (
                    authors.map(author => (
                        <li key={author.id}>{author.name}</li>
                    ))
                ) : (
                    <li>No authors found</li>
                )}
            </ul>
        </div>
    );
}

export default AuthorsList;
