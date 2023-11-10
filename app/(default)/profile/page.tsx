"use client";
import React, { useState, useEffect } from 'react';
import { UserAuth} from '@/app/context/authContext';
import Spinner from '@/components/Spinner';

const page = () => {
    const {user} = UserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async() => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
        }
        checkUser();
    }, [user])

  return (
    <div className='p-4'>
        {loading ? (
            <Spinner />
        ) : user ? (


            
            <p>welcome, {user.displayName} You Are Logged in to the Profile Page - a protected route aswww</p>
        ) : (
        <p>Login dulu bang - Protected Route</p>
        )}        
    </div>
  )
}

export default page