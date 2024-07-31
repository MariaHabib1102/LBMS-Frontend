import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorsForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const newAuthor = { name, bio };

    axios.post('http://localhost:3000/authors', newAuthor)
      .then(response => {
        console.log(response.data);
        setName('');
        setBio('');
        navigate('/Home')
      })
      .catch(error => {
        console.log("There was an error creating the record: ", error);
      });
  };

  return (
    <div style={{ marginLeft: '35%', marginTop: '5%',  padding: '20px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '500px' , background: 'white' }}>
      <h1>Add a New Author</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '100px' }}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Author
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorsForm;
