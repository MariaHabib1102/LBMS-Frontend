import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/style/RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        axios.post('http://localhost:3000/new_user_registration', {
            user: {
                email,
                password,
                password_confirmation: passwordConfirmation
            }
        })
        .then(response => {
            console.log('Registration successful:', response.data);
            setSuccess('Registration successful. Please log in.');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            navigate('/login');
        })
        .catch(error => {
            console.error('There was an error registering:', error);
            setError('Registration failed');
        });
    };

    return (
        <div className="register-container" style={{ marginTop: "10%" }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
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
                <div className="form-group">
                    <label htmlFor="passwordConfirmation">Confirm Password:</label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
