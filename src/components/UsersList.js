import React , {useState , useEffect} from "react";
import axios from "axios";

const UsersList = () =>
{
    const [users, setUsers] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(response => { setUsers(response.data);
        })
        .catch(error => {
            console.log(" There was an error fetching the record , ",  error)
        })
    },[]);

    return(
        <div>
            <h1> Users </h1>
            <ul>
            {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))
                ) : (
                    <li>No user found</li>
                )}

            </ul>
        </div>
    )
}
export default UsersList;