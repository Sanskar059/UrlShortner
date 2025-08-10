import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/urlshrt");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to URL Shortener</h1>
        <p style={styles.subtitle}>
          Create short links, track clicks, and manage your URLs easily.
        </p>

        <div style={styles.buttonGroup}>
          <button style={styles.buttonPrimary} onClick={handleLogin}>
            Login
          </button>
          <button style={styles.buttonSecondary} onClick={handleSignup}>
            Sign Up
          </button>
          <button style={styles.buttonTertiary} onClick={handleClick}>
            Go to URL Shortener
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '30px',
    color: '#555',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  buttonPrimary: {
    backgroundColor: '#2575fc',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  buttonSecondary: {
    backgroundColor: '#6a11cb',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  buttonTertiary: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Home;
