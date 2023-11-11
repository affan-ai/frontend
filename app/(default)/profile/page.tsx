"use client";
import React, { useState, useEffect } from 'react';
import { UserAuth} from '@/app/context/authContext';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import Link from 'next/link';
import UserInfo from '@/components/UserInfo';
import { BiCommentDetail} from "react-icons/bi";
import TimeAgo from 'react-timeago';
import LikeButton from '@/components/LikeButton';
import Bookmark from '@/components/Bookmark';


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

const page = () => {
    const {user} = UserAuth();
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState<ForumData[]>([]);

    useEffect(() => {
        const checkUser = async() => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
        }
        checkUser();
    }, [user])

    useEffect(() => {
        if (user) {
            // Melakukan request ke endpoint `/bookmarks/:userId`
            const getBookmarks = async () => {
                const userId = user.uid;
                const response = await axios.get(`${API_HOST}:${API_PORT}/api/forum/bookmarks/${userId}`);
                if (response.status === 200) {
                    setBookmarks(response.data);
                } else {
                    console.error('Gagal mendapatkan postingan yang dibookmark:', response.statusText);
                }
            }
            getBookmarks();
        }
    }, [user])

  return (
    <div className='p-4'>
        {loading ? (
            <Spinner />
        ) : user ? (
            <div className='w-full md:w-3/4 items-center justify-center mx-auto'>
                <h1>Bookmarked Posts</h1>
                {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className=" items-start px-4 py-6 my-5 shadow-md rounded-lg outline-1 border" >
                <div className="flex">
                    <div className="p-6 bg-slate-500 rounded-full mr-2"></div>
                    <div className="items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900 -mt-1"><UserInfo uid={bookmark.data.userId as string} /></p>
                    <p className="text-gray-700 text-sm"><TimeAgo date={new Date(bookmark.data.createdAt._seconds * 1000)} /></p>
                    </div>
                </div>
                <Link href={`/forum/${bookmark.id}`}>
                    <div className="my-3">
                    <p className="text-gray-700 text-xl font-bold">{bookmark.data.title}</p>
                    <p className="text-gray-700">{bookmark.data.topics}</p>
                    </div>
                </Link>
                <hr />
                    <div className=" mt-3 flex items-center">
                        <div className="flex 2 text-gray-700 text-sm mr-3">
                        <LikeButton itemId={bookmark.id} />
                        <span>{bookmark.data.likes}</span>
                        </div>
                        <div className="flex  text-gray-700 text-sm mr-3">
                        <BiCommentDetail
                        size='20'
                        />
                        <span>{bookmark.commentCount}</span>
                        </div>
                        <div className="flex  text-gray-700 text-sm mr-3">
                        <Bookmark itemId={bookmark.id} />
                        </div>
                    </div>
            </div>
                ))}
            </div>
        ) : (
        <p>Login dulu bang - Protected Route</p>
        )}        
    </div>
  )
}

export default page