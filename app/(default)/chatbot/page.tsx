"use client";
import React, { useState, useEffect, FormEvent, useRef } from "react";
import axios from "axios";
import { auth } from '@/app/firebase';
import { UserAuth} from '@/app/context/authContext';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import config from "@/config.js";

interface ChatData {
  id: string;
    userId: string;
    message: string;
    response: string;
    timestamp: {
      _seconds: number;
      _nanoseconds: number;
    };

}

const ChatBot = () => {

  useEffect(() => {
    document.title = "Chat Bot | Rwikistat";
    return () => {
    };
  }, []); 


  const {user} = UserAuth();
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatData, setChatData] = useState<ChatData[]>([]);

 // Panggil fungsi fetchChatData setiap kali komponen dimuat
    // useEffect(() => {
    //   fetchChatData();
    // }, [user]);
 
    const fetchChatData = async () => {
      try {
        const storedToken = localStorage.getItem('customToken');
        if (user) {
        const userId = user.uid;
        console.log(user)
        // Fetch data dari endpoint berdasarkan userId
        const response = await fetch(`${config.API_URL}/api/chatbot/chats/${userId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });
  
        const chatData = await response.json();
        console.log(chatData)

        // // Urutkan data berdasarkan timestamp (dari yang terbaru ke yang terlama)
        // const sortedChatData = chatData.sort((a: { timestamp: number; }, b: { timestamp: number; }) => b.timestamp - a.timestamp);

        const sortedChatData = chatData.sort((a: { timestamp: { _seconds: number; _nanoseconds: number; };  }, b:  { timestamp: { _seconds: number; _nanoseconds: number; };  }) => {
          const dateA = new Date(a.timestamp._seconds * 1000 + a.timestamp._nanoseconds / 1000000).getTime();
          const dateB = new Date(b.timestamp._seconds * 1000 + b.timestamp._nanoseconds / 1000000).getTime();
        
          // Urutkan data berdasarkan createdAt dari yang terbaru ke yang terlama
          return dateB + dateA;
        });

        // // Simpan data chat yang sudah diurutkan ke state
        setChatData(sortedChatData);
  
        // Simpan data chat ke state
        // setChatData(chatData);
        // console.log('data',chatData);
  
      }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    const refreshChatbotData = async () => {
      await fetchChatData();
      setChatData((prevChatbotData) => [...prevChatbotData]);
    };

  const handleChatSubmit = async () => {
    setLoading(true);
    console.log("Submitting chat...");
    const storedToken = localStorage.getItem('customToken');
    // Dapatkan ID user
    const user = auth.currentUser;
    const userId = user?.uid;
    console.log(userId)
    
    // Panggil API untuk menyimpan pertanyaan dan respons
    const response = await fetch(`${config.API_URL}/api/chatbot/chat`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ userId, userMessage }),
    });

    const data = await response.json();
    console.log(data);

    // Refresh data chatbot setelah submit berhasil
    await refreshChatbotData();
    setLoading(false);
  };

  useEffect(() => {
    fetchChatData();
  }, [user]);



 



  return (
  <div className="flex flex-col justify-between items-center h-screen overflow-hidden ">

  <div className="flex flex-col overflow-y-auto p-4 w-full md:px-28">
    
      <div className="flex flex-col gap-7">
      {chatData.map((chat) => (
          <div key={chat.id} className="mb-10">
            <div className="flex justify-end mb-3">
                <div className="bg-gray-400 text-white font-medium px-8 py-3 rounded-l-2xl  text-end">
                {chat.message}
                </div>
            </div>
            
            <div className="flex">
                <div className="bg-[#00726B] text-white  px-8 py-3 rounded-r-2xl  ">
                <p>{chat.response}</p>
                </div>
            </div>
            
          </div>
         ))}
      </div>
    
  </div>
  
  <div className=" w-full bottom-0 bg-gray-50">
    <form className="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center" onSubmit={handleChatSubmit}>
      <input
      value={userMessage} 
      onChange={(e) => setUserMessage(e.target.value)}
      type="text"
      autoComplete="off"
      className="border rounded-md p-2 flex-1 border-gray-300"
      // x-model="newMessage"
      placeholder="Masukkan pesan Anda..."
      />
      <button className="bg-gray-800 text-white px-4 py-2 rounded-md" type="submit" disabled={loading}>
        {loading ? ("Sending...") : ("Send")}
      </button>
    </form>
  </div>

</div>

  );
};


export default ChatBot;
