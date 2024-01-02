"use client";
import React, { useEffect, useState } from 'react'
import profile from '@/assets/images/profile.png'
import { usePathname } from 'next/navigation';
import Image from 'next/image'


export default function page() {
    const pathname = usePathname();
    const userId = pathname.split('/')[2];
    const [detailUser, setDetailUser] = useState<any>(null);

    useEffect(() => {
        if (userId) {
          // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
          fetch(`http://localhost:8080/api/user/${userId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Gagal mengambil data detail user.');
              }
              console.log(response);
              return response.json();
            })
            .then((data) => {
              setDetailUser(data); 
            })
            .catch((error) => {
              console.error('Gagal mengambil data detail user:', error);
            });
        }
      }, [userId]);
    return (
        <div className='w-full -mt-6  items-center justify-center mx-auto bg-white'>
                <main className="flex-1">
                    <section className="h-36 md:h-56 bg-gradient-to-t from-[#00726B] to-[#38B68D] bg-center bg-cover "></section>
                    <section className="container px-4 py-10 mx-auto -mt-28">
                    {detailUser ? (
                    <div className="flex flex-col items-center">
                        <div className="object-cover w-32 h-32 bg-red-300  border-4 border-white rounded-lg shadow-md">
                        {/* <Image src={detailUser.user.photoURL} alt="profile" width={128} height={128}  /> */}
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <h3 className="text-xl font-semibold text-center text-gray-800 sm:text-3xl ">{detailUser.user.displayName}</h3>
                            <h5 className="text-lg text-center text-gray-500 ">{detailUser.user.email}</h5>          
                            <div className="flex flex-col items-center mt-10 sm:flex-row sm:space-x-6">
                                <p className="text-gray-500 dark:text-gray-400"><span className="font-bold">5</span> Posts in Forum </p>
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
                    ) : (
                       null
                      )}
                                         
                    
                    
                    </section>
                </main>
            </div>
    )
}