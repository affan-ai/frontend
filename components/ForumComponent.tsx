"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { auth } from '../app/firebase';
import Link from 'next/link';
import UserInfo from './UserInfo';
import TimeAgo from 'react-timeago';
import { UserAuth} from '../app/context/authContext';
import Pagination from './Pagination';
import { BiCommentDetail} from "react-icons/bi";
import { Dialog } from "@headlessui/react";
import LikeButton from './LikeButton';
import Bookmark from './Bookmark';

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
  commentCount: number;
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
  const [isOpen, setIsOpen] = useState(false);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
      const checkUser = async() => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLoading(false);
      }
      checkUser();
  }, [user])

  const fetchData = async (page: number | undefined) => {
    try {
      // const userId = "3RKnc9mpecXesi5dPHVYUOBFxfB2";
      // Ubah URL endpoint untuk menambahkan parameter page
      const url = `${API_HOST}:${API_PORT}/api/forum/page?page=${page}`;
      // const url = `${API_HOST}:${API_PORT}/api/forum/bookmarks/${userId}?page=${page}`;

      const response = await axios.get(url);
      if (response.status === 200) {
        const { forumData, currentPage, totalPages } = response.data;
        console.log(forumData);

        // Set data forum, nomor halaman saat ini, dan jumlah total halaman
        setForumData(forumData);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } else {
        console.error('Gagal mengambil data:', response.statusText);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
    // Memanggil fetchData untuk mengambil data awal
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Dapatkan data forum untuk halaman saat ini
  const currentForumData = forumData;



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
        fetchData(currentPage);
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
    <div className='w-full md:w-3/4 items-center justify-center mx-auto'>
      <div className="mb-4">
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
      </div>


          <div className="p-4 md:p-6 shadow-md bg-white rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <div className="p-6 bg-slate-500 rounded-full mr-2"></div>
              </div>
              <div
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <h3 className=" text-gray-500">
                  Tanyakan Sesuatu di Forum Diskusi ini...
                </h3>
              </div>
            </div>
          </div>

          {/* create post dialog  */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-auto inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          {/* dialog overlay  */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
          {/* dialog card  */}
          <div className="relative bg-white w-96 rounded-lg">
            {/* dialog header  */}
            <div className="flex justify-center relative border-b">
              {/* dialog title  */}
              <Dialog.Title className=" py-4 text-xl font-bold">
                Create Post
              </Dialog.Title>
              {/* dialog close icon button  */}
              <div className="absolute right-0 p-2">
                <button
                  className="bg-gray-200 p-2 hover:bg-gray-300 rounded-full text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* dialog body  */}
            <Dialog.Description>
              {/* post author profile */}
              <div className="my-2 px-4 flex items-center space-x-2">
              <div className="p-6 bg-slate-500 rounded-full mr-2"></div>

                <div>
                  <h6 className="font-bold text-sm">Harsh Mangalam</h6>
                </div>
              </div>

              {/* create post interface */}
              <div className="px-4 py-2">
                <div className="mb-4">
                  <textarea
                    className="w-full placeholder-gray-700 text-xl focus:outline-none"
                    // rows="6"
                    placeholder="What`s on your mind Harsh ?"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span>
                      <i
                        className="bg-no-repeat inline-block bg-auto w-6 h-6 "
                        style={{
                          backgroundImage: `url("https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/52gJ5vOc-Eq.png")`,
                          backgroundPosition: "0px -207px",
                        }}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2 px-4">
                <button className="text-center w-full py-2 rounded-lg bg-blue-500 text-white" disabled>
                  Post
                </button>
              </div>
            </Dialog.Description>
          </div>
        </div>
      </Dialog>
      
      {/* Tampilkan postingan yang ada */}
    {currentForumData.map((item) => (
      <div key={item.id} className=" items-start px-4 py-6 my-5 shadow-md rounded-lg outline-1 border" >
      <div className="flex">
        <div className="p-6 bg-slate-500 rounded-full mr-2"></div>
        <div className="items-center justify-between">
        <p className="text-lg font-semibold text-gray-900 -mt-1"><UserInfo uid={item.data.userId as string} /></p>
          <p className="text-gray-700 text-sm"><TimeAgo date={new Date(item.data.createdAt._seconds * 1000)} /></p>
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
  );
};

export default ForumComponent;
