import React from 'react';

const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/auth/discord';
    };

    return (
        <button onClick={handleLogin}>Se connecter</button>
    );
};

export default LoginButton;
