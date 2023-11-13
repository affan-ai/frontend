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
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import  { BiSolidBookmark } from "react-icons/bi";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ListItemDecorator } from '@mui/joy';
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
    commentCount: number;
  }

const page = () => {
    const {user} = UserAuth();
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState<ForumData[]>([]);
    const [posted, setPosted] = useState<ForumData[]>([]);
    const photoURL = user?.photoURL || '';


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
                    console.log(response.data)
                } else {
                    console.error('Gagal mendapatkan postingan yang dibookmark:', response.statusText);
                }
            }
            getBookmarks();
        }
    }, [user])

    useEffect(() => {
        if (user) {
            const getPosted = async () => {
                const userId = user.uid;
                const response = await axios.get(`${API_HOST}:${API_PORT}/api/forum/posts/${userId}`);
                if (response.status === 200) {
                    setPosted(response.data);
                    console.log(response.data)
                } else {
                    console.error('Gagal mendapatkan postingan yang diposting:', response.statusText);
                }
            
            }
            getPosted();
        }
    }, [user])

  return (
    <div className=''>
        {loading ? (
            <Spinner />
        ) : user ? (
            <div className='w-full -mt-6  items-center justify-center mx-auto bg-white'>
                <main className="flex-1">
                    <section className="h-36 md:h-56 bg-gradient-to-t from-[#00726B] to-[#38B68D] bg-center bg-cover "></section>
                    <section className="container px-4 py-10 mx-auto -mt-28">
                    <div className="flex flex-col items-center">
                        <div className="object-cover w-32 h-32  border-4 border-white rounded-lg shadow-md">
                        <Image src={photoURL} alt="profile" width={128} height={128}  />
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <h3 className="text-xl font-semibold text-center text-gray-800 sm:text-3xl ">{user.displayName}</h3>
                            <h5 className="text-lg text-center text-gray-500 ">{user.email}</h5>          
                            <div className="flex flex-col items-center mt-10 sm:flex-row sm:space-x-6">
                                <p className="text-gray-500 dark:text-gray-400"><span className="font-bold">4</span> Posts in Forum</p>
                                <p className="mt-3 text-center text-gray-500  sm:mt-0">Member Since </p>
                            </div>
                            {/* <div className=" mt-4 flex space-x-3 ">
                            <a href="" className="block px-4 py-2 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg  hover:bg-gray-100  focus:outline-none">
                            <QuestionAnswerRoundedIcon sx={{with: 20, height: 20}}/> My Post
                            </a>
                            <a href="" className="flex items-center justify-center px-4 py-2 space-x-3 text-sm text-gray-600 transition-colors duration-300 transform border active:border-[#00726B] rounded-lg  hover:bg-gray-100  focus:outline-none">
                            <BiSolidBookmark size="20" /> My Bookmark
                            </a>
                            </div> */}
                        </div>
                    </div>
                
                    <div className=" mx-auto h-96 mt-10">
                    <Tabs defaultValue={0} sx={{alignItems: 'center', backgroundColor: 'white'}}>
                    
                    
                        <TabList disableUnderline 
                        sx={{
                        p: 0.5,
                        gap: 0.5,
                        borderRadius: 'xl',
                        bgcolor: 'background.level1',
                        }}>
                            <Tab 
                                variant="plain"
                                color="neutral"
                                disableIndicator
                                indicatorInset>
                            <ListItemDecorator>
                                <QuestionAnswerRoundedIcon sx={{with: 20, height: 20}}/>
                            </ListItemDecorator>
                            My Post
                            </Tab>
                            <Tab 
                                variant="plain"
                                color="neutral"
                                disableIndicator
                                indicatorInset>
                            <ListItemDecorator>
                                <BiSolidBookmark size="20" /> 
                            </ListItemDecorator>
                            My Bookmark
                            </Tab>
                        </TabList>
                        <TabPanel value={0}>
                            {posted.map((post) => (
                            <div key={post.id} className=" items-start px-4 py-6 my-5 shadow-md rounded-lg outline-1 border" >
                            <div className="flex">
                                <div className="p-6 bg-slate-500 rounded-full mr-2"></div>
                                <div className="items-center justify-between">
                                <p className="text-lg font-semibold text-gray-900 -mt-1"><UserInfo uid={post.data.userId as string} /></p>
                                <p className="text-gray-700 text-sm"><TimeAgo date={new Date(post.data.createdAt._seconds * 1000)} /></p>
                                </div>
                            </div>
                            <Link href={`/forum/${post.id}`}>
                                <div className="my-3">
                                <p className="text-gray-700 text-xl font-bold">{post.data.title}</p>
                                <p className="text-gray-700">{post.data.topics}</p>
                                </div>
                            </Link>
                            <hr />
                                <div className=" mt-3 flex items-center">
                                    <div className="flex 2 text-gray-700 text-sm mr-3">
                                    <LikeButton itemId={post.id} />
                                    <span>{post.data.likes}</span>
                                    </div>
                                    <div className="flex  text-gray-700 text-sm mr-3">
                                    <BiCommentDetail
                                    size='20'
                                    />
                                    <span>{post.commentCount}</span>
                                    </div>
                                    <div className="flex  text-gray-700 text-sm mr-3">
                                    <Bookmark itemId={post.id} />
                                    </div>
                                </div>
                            </div>
                            ))}
                        </TabPanel>
                        <TabPanel value={1}>
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
                        </TabPanel>
                    </Tabs>
                    </div>
                        
                    
                    
                    </section>
                </main>


                {/* {bookmarks.map((bookmark) => (
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
                ))} */}
            </div>
        ) : (
        <p>Login dulu bang - Protected Route</p>
        )}        
    </div>
  )
}

export default page