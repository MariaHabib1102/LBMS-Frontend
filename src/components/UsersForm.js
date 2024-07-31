import React, {useState} from "react";
import axios from "axios";


const UsersForm = () =>
{
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (event) =>{
        event.preventDefault();
        const newUser ={
            name,
            email,
        };

        axios.post ('http://localhost:3000/users', newUser)
        .then(response => {console.log(response.data);
            setName('');
            setEmail('');
        })
        .catch(error => {
            console.log(" There was an error creating the record , ",  error)
        })
    }

    return(
        <div>
        <h1>Add a New User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>email:</label>
            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
        
    )
}
export default UsersForm;