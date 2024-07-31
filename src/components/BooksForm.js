import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null); // File input for cover image
    const [coverImageURL, setCoverImageURL] = useState(''); // To store the image URL after upload
    const [publishedDate, setPublishedDate] = useState('');
    const [genre, setGenre] = useState('');
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/authors')
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the authors:", error);
            });
    }, []);

    const handleFileChange = (event) => {
        setCoverImageFile(event.target.files[0]); // Set the selected file
    };

    const handleUpload = async () => {
        if (coverImageFile) {
            const formData = new FormData();
            formData.append('cover_image', coverImageFile);

            try {
                const response = await axios.post('http://localhost:3000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCoverImageURL(response.data.url); // Assuming the backend returns the URL
            } catch (error) {
                console.error("There was an error uploading the file:", error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await handleUpload(); 
        const newBook = {
            title,
            description,
            author_id: authorId,
            cover_image: coverImageURL, // Use the uploaded image URL
            published_date: publishedDate,
            genre,
        };

        axios.post('http://localhost:3000/books', { book: newBook })
            .then(response => {
                console.log(response.data);
                setTitle('');
                setDescription('');
                setAuthorId('');
                setCoverImageFile(null);
                setCoverImageURL('');
                setPublishedDate('');
                setGenre('');
            })
            .catch(error => {
                console.error("There was an error creating the book:", error);
            });
    };

    return (
        <div style={{ marginLeft: '35%', marginTop: '5%',  padding: '20px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '500px' , background: 'white' }}>>

            <h1 className="mb-4 mt-10" center>Add a New Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coverImage">Cover Image:</label>
                    <input
                        type="file"
                        id="coverImage"
                        className="form-control-file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publishedDate">Published Date:</label>
                    <input
                        type="date"
                        id="publishedDate"
                        className="form-control"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        className="form-control"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <select
                        id="author"
                        className="form-control"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                    >
                        <option value="">Select an author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
}

export default BooksForm;
