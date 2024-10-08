"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ChipDelete from '@mui/joy/ChipDelete';
import {BiSolidEditAlt, BiX}  from "react-icons/bi";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import IconButton from '@mui/joy/IconButton';
import { MdVerified } from 'react-icons/md';
import VeriviedCard from '@/components/VeriviedCard';
import AvatarTest from '@/public/avatar-test.png'
import config from "@/config.js";


function Verivied() {
  // Buat sebuah jenis yang mencerminkan struktur data dari API
interface UserData {
  id: number;
  data: {
    photoURL: string;
    displayName: string;
    email: string;
    verified: boolean;
  };
}

useEffect(() => {
  document.title = "Verified | Rwikistat";
  return () => {
  };
}, []); 

  

// Kemudian gunakan jenis ini untuk menentukan jenis state
const [testData, setTestData] = useState<UserData[]>([]);
const [open, setOpen] = React.useState<number | null>(null);

const fetchData = async () => {
  try {
    // Mendapatkan token dari localStorage atau sumber lainnya
    const storedToken = localStorage.getItem('customToken');

    // Membuat header dengan menyertakan token
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
    const response = await axios.get(`${config.API_URL}/api/user/`, {headers});
    if (response.status === 200) {
      setTestData(response.data);
      console.log(response.data)
    } else {
      console.error('Gagal mengambil data:', response.statusText);
    }
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
};

useEffect(() => {
    fetchData();
}, []);



  return (
    <div className='px-4 md:px-7'>
        <div className='flex justify-between items-center h-16 mb-5'>
        <h2 className='font-bold text-2xl text-[#00726B] '>Verified User</h2>
                {/* <form className=" w-3/4 p-4 flex space-x-4" onSubmit={undefined}>
                    <input
                    type="text"
                    name="text"
                    autoComplete="off"
                    className="border rounded-md p-2 flex-1 border-gray-300"
                    placeholder="Cari User...."
                    required
                    />
                    <button type="submit" className="bg-[#00726B] text-white px-4 py-2 rounded-md text-sm">Search</button> 
                </form> */}
        </div>

        

        <div className='grid grid-cols-1 md:grid-cols-3 mx-auto w-full gap-3 '>
        {testData.map((item) => (
            <VeriviedCard
                key={item.id}
                profileImage={item.data.photoURL}
                name={item.data.displayName}
                email={item.data.email}
                verified={item.data.verified}
                link={`userId/${item.id}`}
                id={item.id}
            />
            ))}
        </div>
    </div>
  );
}

export default Verivied;
