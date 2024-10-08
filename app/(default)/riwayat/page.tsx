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
import ImageHistoryCard from "@/components/ImageHistoryCard"
import { UserAuth} from '@/app/context/authContext';
import { auth } from '@/app/firebase';

  // Buat sebuah jenis yang mencerminkan struktur data dari API
  interface imageData {
    id: number;
    data: {
      url: string;
      fileName: string;
    };
  }

function History() {

  useEffect(() => {
    document.title = "Riwayat | Rwikistat";
    return () => {
    };
  }, []); 


  const {user} = UserAuth();
  // Kemudian gunakan jenis ini untuk menentukan jenis state
  const [testData, setTestData] = useState<imageData[]>([]);
 
  

  const fetchData = async () => {
    try {
      // Mendapatkan token dari localStorage atau sumber lainnya
      const storedToken = localStorage.getItem('customToken');

      // Membuat header dengan menyertakan token
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        
      const response = await axios.get(`${config.API_URL}/api/history/${uid}`, {headers});
      if (response.status === 200) {
        setTestData(response.data);
        console.log('data',response.data)
      } else {
        console.error('Gagal mengambil data:', response.statusText);
      }}
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
      fetchData();
  }, [user]);



  return (
    <div className='px-4 md:px-7'>
        <div className='flex justify-between items-center h-16 mb-5'>
          <h2 className='font-bold text-2xl text-[#00726B] '>Riwayat Gambar</h2>
        </div>

        
        
        <div className='grid grid-cols-1 md:grid-cols-3 mx-auto w-full gap-3 '>
        {testData.map((item) => (
            <ImageHistoryCard
              key={item.id}
              id={item.id}
              imageName={item.data.fileName}
              imageUrl={item.data.url}
            />
            ))}
        </div>
        
    </div>
  );
}

export default History;
