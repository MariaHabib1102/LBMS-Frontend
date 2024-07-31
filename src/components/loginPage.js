import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/style/LoginPage.css'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/users/sign_in', {
            user: {
                email,
                password
            }
        })
        .then(response => {
            console.log('Login successful:', response.data);
            // Handle successful login (e.g., store token, redirect)
            navigate('/dashboard');
        })
        .catch(error => {
            console.error('There was an error logging in:', error);
            setError('Invalid email or password');
        });
    };

    return (
        <div className="login-container" style={{ marginTop: "10%" }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
