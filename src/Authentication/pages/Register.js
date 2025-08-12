import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagescss/Register.css';
import { auth, db } from '../../Firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('renter');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create new user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user info to Firestore database
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        surname,
        email,
        phone,
        idNumber,
        address,
        role, // default role fallback
        createdAt: serverTimestamp(),
      });

      alert('Registration successful!');
      navigate('/'); // Redirect to login or home after registration
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    }
    
  };

  return (
    <div className="App">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label className="register-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">Surname</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter your surname"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">ID/License Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="Enter your ID or license number"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">User Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="register-input"
          >
            <option value="renter">Car Renter</option>
            <option value="owner">Car Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label className="register-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label className="register-label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="register-input"
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
