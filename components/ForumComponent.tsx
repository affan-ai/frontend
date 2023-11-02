"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { auth } from '../app/firebase';
import Link from 'next/link';
import UserInfo from './UserInfo';
import Image from 'next/image';
import TimeAgo from 'react-timeago';
import { UserAuth} from '../app/context/authContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';


const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;


interface ForumData {
  id: string;
  data: {
    userId: string;
    topics: string;
    title:string;
    images: string[];
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  };
}

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  // Tambahkan properti pengguna lainnya sesuai kebutuhan
}

interface NewPost {
  topics: string;
  title: string;
  images: File[];
  userId: string,
}

const ForumComponent: React.FC = () => {
  const {user} = UserAuth();
  const [forumData, setForumData] = useState<ForumData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [newPost, setNewPost] = useState<NewPost>({
    topics: "",
    title: "",
    images: [],
    userId: '',
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
      const checkUser = async() => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLoading(false);
      }
      checkUser();
  }, [user])

  const pageSize = 5; 

  const fetchData = async () => {
    try {
      const response = await axios.get<ForumData[]>(`${API_HOST}:${API_PORT}/api/forum`);
      if (response.status === 200) {
        const sortedForumData = response.data.sort((a, b) => {
          // Ubah _seconds dan _nanoseconds menjadi tipe Date
          const dateA = new Date(a.data.createdAt._seconds * 1000 + a.data.createdAt._nanoseconds / 1000000).getTime();
          const dateB = new Date(b.data.createdAt._seconds * 1000 + b.data.createdAt._nanoseconds / 1000000).getTime();
        
          // Urutkan data berdasarkan createdAt dari yang terbaru ke yang terlama
          return dateB - dateA;
        });
        
        const paginatedForumData = sortedForumData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
        setForumData(paginatedForumData);
        setLoading(false);
      } else {
        console.error('Gagal mengambil data:', response.statusText);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<any>, newPage: number) => {
    setCurrentPage(newPage);
    fetchData();
  };

  useEffect(() => {
    // Memanggil fetchData untuk mengambil data awal
    fetchData();
  }, [currentPage]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
      setNewPost({
        ...newPost,
        [name]: value,
      });
    
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewPost({
        ...newPost,
        images: Array.from(event.target.files),
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      const user = auth.currentUser;
      formData.append('topics', newPost.topics);
      formData.append('title', newPost.title);
      if (user) {
      formData.append('userId',user.uid);}
      newPost.images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post(`${API_HOST}:${API_PORT}/api/forum`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Refresh data setelah berhasil menambahkan postingan
        fetchData();
        // Reset formulir setelah berhasil menambahkan postingan
        setNewPost({
          topics: '',
          userId: '',
          images: [],
          title: '',
        });
      }
    } catch (error) {
      console.error('Gagal menambahkan postingan:', error);
    }
  };




  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Data dari API</h1>
      { loading ? <p>Loading...</p> : user ? (<div className="mb-4">
        <h2>Tambah Postingan Baru</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="topics"
              placeholder="Topik"
              value={newPost.topics}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-2">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Tambahkan Postingan
            </button>
          </div>
        </form>
      </div>) : (
      <p>Login dulu bang - Protected Route</p>)}
      
      {/* Tampilkan postingan yang ada */}
    {forumData.map((item) => (
      <Box key={item.id} className="p-4 border border-gray-300 rounded-md shadow-md mb-4">
        <Typography variant="h6" className='font-bold text-lg text-gray-800'><UserInfo uid={item.data.userId as string} /></Typography>
        <Typography variant="subtitle1" className='text-sm text-gray-500'><TimeAgo date={new Date(item.data.createdAt._seconds * 1000)} /></Typography>
        <Typography variant="h4" className='text-3xl text-blue-600'><Link href={`/forum/${item.id}`} >{item.data.title}</Link></Typography>
        <Typography variant="h5" className='text-2xl text-black-600'>{item.data.topics}</Typography>

        {/* Tambahkan elemen lain sesuai kebutuhan */}
      </Box>
    ))}
        {/* Tambahkan pagination */}
        {/* <Pagination
        count={Math.ceil(forumData.length / pageSize)}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
        /> */}
    </div>
  );
};

export default ForumComponent;
