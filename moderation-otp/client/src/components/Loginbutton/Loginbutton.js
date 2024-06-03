import React from "react";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "https://moderation-otp.fr/auth/discord";
  };

  return <button onClick={handleLogin}>Se connecter</button>;
};

export default LoginButton;
