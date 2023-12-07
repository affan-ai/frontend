"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import { UserAuth} from '@/app/context/authContext';
import Pagination from '@/components/Pagination';
import { BiCommentDetail} from "react-icons/bi";
import LikeButton from '@/components/LikeButton';
import Bookmark from '@/components/Bookmark';
import Image from 'next/image'

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;


interface ForumData {
  id: string;
  data: {
    userId: string;
    topics: string;
    title:string;
    images: string[];
    likes: number;
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  };
  user:{
    displayName: string;
    photoURL: string;
  }
  commentCount: number;
}

const ForumComponent: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const {user} = UserAuth();
  const [forumData, setForumData] = useState<ForumData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = async () => {
    setLoading(true);
    const url = `${API_HOST}:${API_PORT}/api/forum/?q=${searchTerm}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      const { forumData, currentPage, totalPages } = response.data;
      console.log(forumData);

      // Set data forum, nomor halaman saat ini, dan jumlah total halaman
      setForumData(forumData);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);

      setLoading(false);
    } else {
      console.error('Gagal mengambil data:', response.statusText);
      setLoading(false);
    }
  };

  // Dapatkan data forum untuk halaman saat ini
  const currentForumData = forumData;


  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    
<div className='w-full md:w-3/4 items-center justify-center mx-auto'>

      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {currentForumData.length > 0 ? (
  <div>
      {currentForumData.map((item) => (
      <div key={item.id} className=" items-start px-4 py-6 my-5 shadow-md rounded-lg outline-1 border" >
      <div className="flex">
        <div className="p-6  rounded-full mr-2">
        <Image
          src={item.user.photoURL}
          alt="Picture of the author"
          width={80}
          height={80}
          className="rounded-full" />
        </div>
        
        <div className="items-center justify-between">
        <p className="text-lg font-semibold text-gray-900 -mt-1">{item.user.displayName}</p>
        <p className="text-gray-700 text-sm">
          {item.data.createdAt._seconds * 1000 > new Date().getTime() - 7 * 24 * 60 * 60 * 1000 ? (
            <TimeAgo date={new Date(item.data.createdAt._seconds * 1000)} />
          ) : (
            <span>{new Date(item.data.createdAt._seconds * 1000).toLocaleDateString()}</span>
          )}
          </p>
        </div>
      </div>
      <Link href={`/forum/${item.id}`}>
        <div className="my-3">
          <p className="text-gray-700 text-xl font-bold">{item.data.title}</p>
          <p className="text-gray-700">{item.data.topics}</p>
        </div>
      </Link>
      <hr />
         <div className=" mt-3 flex items-center">
            <div className="flex 2 text-gray-700 text-sm mr-3">
            <LikeButton itemId={item.id} />
              <span>{item.data.likes}</span>
            </div>
            <div className="flex  text-gray-700 text-sm mr-3">
              <BiCommentDetail
              size='20'
              />
               <span>{item.commentCount}</span>
            </div>
            <div className="flex  text-gray-700 text-sm mr-3">
              <Bookmark itemId={item.id} />
            </div>
         </div>
   </div>
      
    ))}


        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      
      </div>
      ) : null}
    </div>
  );
};

export default ForumComponent;
