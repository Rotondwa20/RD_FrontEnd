// src/Authentication/pages/Login.js
import React, { useState } from 'react';
import '../pagescss/Login.css'; // Import CSS
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, db } from '../../Firebase/Firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      let role = userSnap.exists() ? userSnap.data().role || 'renter' : 'renter';

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email,
          role,
          createdAt: new Date().toISOString(),
        });
      }

      redirectUserByRole(role);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      let role;
      if (!userSnap.exists()) {
        const input = prompt('Enter your role: renter, owner, or admin', 'renter');
        const validRoles = ['renter', 'owner', 'admin'];
        const selected = input?.toLowerCase().trim();
        role = validRoles.includes(selected) ? selected : 'renter';

        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email,
          role,
          createdAt: new Date().toISOString(),
        });
      } else {
        role = userSnap.data().role || 'renter';
      }

      redirectUserByRole(role);
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google sign-in failed');
    }
  };

  const redirectUserByRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/AdminDashboard'); // Replace with actual admin route
        break;
      case 'owner':
        navigate('/OwnerHome');
        break;
      default:
        navigate('/ViewCars');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Login</button>

          <button
            type="button"
            className="google-login-button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="google-icon" />
            Sign in with Google
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <div className="login-links">
          <p className="login-link">
            Don’t have an account? <Link className="register-link" to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
