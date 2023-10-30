"use client";
import React, { useState } from 'react';
import { UserAuth } from '../context/authContext';

import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const LoginForm = () => {
    const {user, googleSignIn, emailSignIn} = UserAuth();
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleNimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNim(e.target.value);
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const email = `${nim}@example.com`;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Menghentikan perilaku bawaan form
    try {
      await emailSignIn(email, password);
    } catch (error) {
      console.error(error);
    }
  };
  


  const handleGoogleSignIn = async() => {
    try {
        await googleSignIn();
    } catch (error) {
        console.log(error);
    }
}
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleEmailSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Nim / Nip"
            name="nim"
            autoComplete="nim"
            autoFocus
            value={nim}
            onChange={handleNimChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            Sign In
          </Button>
          <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn} // Tambahkan fungsi ini
        >
          Sign In with Google
        </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
