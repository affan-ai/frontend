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


const API_HOST = 'https://rest-api-zzvthujxxq-as.a.run.app'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

function Verivied() {
  // Buat sebuah jenis yang mencerminkan struktur data dari API
interface ModulData {
  id: number;
  data: {
    namaModul: string;
    codeSampel: string;
    judulModul: string;
  };
}
  

// Kemudian gunakan jenis ini untuk menentukan jenis state
const [testData, setTestData] = useState<ModulData[]>([]);
const [open, setOpen] = React.useState<number | null>(null);

const fetchData = async () => {
  try {
    const response = await axios.get('https://rest-api-zzvthujxxq-as.a.run.app/api/modul');
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

  const handleOpen = (id:number) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleDelete = (id: number) => {
    // Panggil endpoint dengan menggunakan ID modul
    axios.delete(`${API_HOST}:${API_PORT}/api/modul/${id}`)
      .then(response => {
        console.log(id)
        setOpen(null);
        fetchData();
      })
      .catch(error => {
        console.error('Gagal menghapus data:', error);
        // Handle error secara sesuai kebutuhan Anda
      });
  };

  return (
    <div className='px-4 md:px-7'>
        <div className='flex justify-between items-center h-16 mb-5'>
        <h2 className='font-bold text-2xl text-[#00726B] '>Verivied User</h2>
                <form className=" w-3/4 p-4 flex space-x-4" onSubmit={undefined}>
                    <input
                    type="text"
                    name="text"
                    autoComplete="off"
                    className="border rounded-md p-2 flex-1 border-gray-300"
                    placeholder="Cari User...."
                    required
                    />
                    {/* <button type="submit" className="bg-[#00726B] text-white px-4 py-2 rounded-md text-sm">Search</button> */}
                </form>
        </div>

        

        <div className='grid grid-cols-1 md:grid-cols-3 mx-auto w-full gap-3 '>
            <VeriviedCard
                profileImage={AvatarTest}
                name={'Mahlil Ikramuddin'}
                email={'mahmil@gmail.com'}
                verified={true}
                link='/userId'
            />
            <VeriviedCard
                profileImage={AvatarTest}
                name={'Mahlil Ikramuddin'}
                email={'mahmil@gmail.com'}
                verified={false}
                link='/userId'
            />
            <VeriviedCard
                profileImage={AvatarTest}
                name={'Mahlil Ikramuddin'}
                email={'mahmil@gmail.com'}
                verified={false}
                link='/userId'
            />
            <VeriviedCard
                profileImage={AvatarTest}
                name={'Mahlil Ikramuddin'}
                email={'mahmil@gmail.com'}
                verified={true}
                link='/userId'
            />
            <VeriviedCard
                profileImage={AvatarTest}
                name={'Mahlil Ikramuddin'}
                email={'mahmil@gmail.com'}
                verified={true}
                link='/userId'
            />
            <VeriviedCard
                profileImage={AvatarTest}
                name={'Mahlil Ikramuddin'}
                email={'mahmil@gmail.com'}
                verified={false}
                link='/userId'
            />
        </div>
    </div>
  );
}

export default Verivied;
