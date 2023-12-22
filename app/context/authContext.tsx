"use client";
import React,{ useContext, createContext, useEffect, useState, ReactNode } from 'react';
import { signInWithPopup, signOut, signInWithEmailAndPassword,UserCredential, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

interface UserData {
  email: string;
  role: string;
  displayName: string;
  photoURL: string;
}

const API_HOST = 'https://rest-api-zzvthujxxq-as.a.run.app'; // Ganti dengan host Anda jika berbeda
const API_PORT = 8080;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AUTO_LOGOUT_TIME = 6 * 60 * 60 * 1000; 
// const AUTO_LOGOUT_TIME = 6 * 60 * 60 * 1000; // 6 jam dalam milidetik

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
  
      // Set data yang ingin Anda kirimkan ke server
      const userData = {
        email: signedInUser.email || '',
        role: 'user', // Ganti ini dengan cara Anda menentukan peran (role) pengguna
        uid: signedInUser.uid,
        displayName: signedInUser.displayName || '',
        photoURL: signedInUser.photoURL || '',
      };
  
      // Kirim data pengguna ke endpoint REST API
      await sendUserDataToServer(userData);
  
      // Set pengguna di aplikasi Anda, jika diperlukan
      setUser(signedInUser);
      window.location.href = '/compiler';
    } catch (error) {
      const authError = error as Error;
      console.error('Gagal masuk dengan Google:', authError.message);
    }
  };
  
  const sendUserDataToServer = async (userData: UserData) => {
    try {
      const response = await fetch(`${API_HOST}:${API_PORT}/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('Data pengguna berhasil disimpan di server.');
      } else {
        console.error('Gagal mengirim data pengguna ke server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  const emailSignIn = async (email: string, password: string) => {
    try {
      const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = result.user;
      setUser(signedInUser);
      console.log('Login Sukses');
      // Panggil handleLoginSuccess di sini jika perlu
      handleLoginSuccess(email, password);

      window.location.href = '/compiler';
    } catch (error) {
      const authError = error as Error;
      console.error('Gagal masuk dengan email dan password:', authError.message);
    }
  };

  

  const handleLoginSuccess = async (email: string, password: string) => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };
      
  
      // Kirim permintaan ke endpoint di server
      const response = await fetch(`${API_HOST}:${API_PORT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Menggunakan UID pengguna yang sudah login
      });
  
      if (response.ok) {
        // Tangani respons dari server
        const data = await response.json();
        const customToken = data.customToken;
        console.log('Custom Token:', customToken);
      } else {
        // Tangani kesalahan jika ada
      }
    } catch (error) {
      console.error('Error:', error);
      // Tangani kesalahan jaringan jika diperlukan
    }
  };


  

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = '/signin';
    } catch (error) {
      const authError = error as Error;
      console.error('Gagal keluar:', authError.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Fungsi untuk logout otomatis setelah waktu tertentu
    const autoLogoutTimeout = setTimeout(() => {
      logOut(); // Panggil fungsi logout
    }, AUTO_LOGOUT_TIME);

    return () => {
      unsubscribe();
      clearTimeout(autoLogoutTimeout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, emailSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
