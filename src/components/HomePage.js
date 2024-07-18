import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
}

export default HomePage;
