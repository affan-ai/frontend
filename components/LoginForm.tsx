"use client";
import React, { useState } from 'react';
import { UserAuth } from '@/app/context/authContext';
import { generateCSRFToken } from '@/app/utils/csrf'; 

const LoginForm = () => {
  const {user, googleSignIn, emailSignIn} = UserAuth();
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const csrfToken: string = generateCSRFToken();

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
    <div className="h-screen flex bg-[#00726B]">
        <div className="absolute inset-0 h-screen md:mt-24 lg:mt-0 bg-protectorange-200 pointer-events-none" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1512 775" fill="none">
          <path d="M-112 59.3717C59.8828 61.3647 465.166 59.3718 465.166 592.305C465.166 940.497 952.473 526.668 1165.37 230.373C1246.84 116.982 1456.35 -24.4945 1626 96.0433" stroke="url(#paint0_linear_170_7762)" strokeWidth="100" className="svg-elem-1"></path>
          <defs>
            <linearGradient id="paint0_linear_170_7762" x1="757" y1="-253.55" x2="757" y2="815.366" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
        </div>

          <div className="flex w-full lg:w-1/2 justify-center items-center mx-auto space-y-8 z-10">
            <div className="w-full px-8 md:px-32 lg:px-24 ">
              <div className='rounded-md shadow-2xl p-7 md:p-14 bg-white'>
              <form onSubmit={handleEmailSignIn} className=" ">
                <h1 className="text-[#00726B] font-bold text-3xl md:text-5xl  ">Selamat Datang Statistikawan</h1>
                <p className="text-base md:text-xl font-light text-gray-400 mb-8">Hallo 👋 ayo semangat belajar!</p>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input type="hidden" name="_csrf" value={csrfToken} />
                  <input
                  id="email"
                  name="nim"
                  autoComplete="nim"
                  placeholder="Masukan NIM/NIP"
                  onChange={handleNimChange}
                  value={nim}
                  className=" pl-2 w-full outline-none border-none" />
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Masukan Password" 
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className=" pl-2 w-full outline-none border-none" />
                </div>
                <button type="submit" className="block w-full bg-[#00726B] mt-5 py-2 rounded-lg hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Masuk</button>
                <p className='text-center my-7 font-light text-gray-400 '>Bukan Mahasiswa USK?</p>
              </form>
              <button onClick={handleGoogleSignIn} className="text-gray-400 block w-full bg-[#F1F6F7] mt-5 py-2 rounded-lg hover:-translate-y-1 transition-all duration-500 font-semibold mb-2">Masuk dengan Google</button>
              </div>
            </div>
            
          </div>
      </div>

      
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div>
    //     <Typography component="h1" variant="h5">
    //       Login
    //     </Typography>
    //     <form onSubmit={handleEmailSignIn}>
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Nim / Nip"
    //         name="nim"
    //         autoComplete="nim"
    //         autoFocus
    //         value={nim}
    //         onChange={handleNimChange}
    //       />
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //         value={password}
    //         onChange={handlePasswordChange}
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="secondary"
    //       >
    //         Sign In
    //       </Button>
    //       <Button
    //       fullWidth
    //       variant="contained"
    //       color="primary"
    //       onClick={handleGoogleSignIn} // Tambahkan fungsi ini
    //     >
    //       Sign In with Google
    //     </Button>
    //     </form>
    //   </div>
    // </Container>
  );
};

export default LoginForm;
