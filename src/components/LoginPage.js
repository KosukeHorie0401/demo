import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Attempting to log in with:', { username, password });
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password
            });
            console.log('Login successful:', response.data);
            if (response.data) {
                console.log('Navigating to /mypage');
                navigate('/mypage');
            } else {
                console.log('Login response data is empty');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;