"use client";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { auth } from '../firebase';
import { UserAuth} from '../context/authContext';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';

const API_HOST = "http://localhost"; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

interface ChatData {
  id: string;
  data: {
    author: string;
    content: string;
    response:string;
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  };
}

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    // Konversi header userId ke cookie
    config.headers.cookie = {
      userId: config.headers["userId"],
    };

    return config;
  },
  (error) => {
    // Handle error
    return error;
  },
);

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<ChatData[]>([]);
  const {user} = UserAuth();

  useEffect(() => {
    // Memuat data obrolan saat komponen pertama kali dimuat
    loadChatbotData();

    

  }, [user]);

  const loadChatbotData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Dapatkan ID user yang sedang login
      const user = auth.currentUser;
      const userId = user?.uid;

      if (!userId) {
        setLoading(false);
        return;
      }
      const response = await axiosInstance.get(`${API_HOST}:${API_PORT}/api/chatbot/`);
      if (response.status === 200) {
        const data = response.data;
        // Saring data berdasarkan ID user yang sedang login
        const userChats = data.filter((chat: { data: { author: string; }; }) => chat.data.author === userId);

        // Urutkan data berdasarkan createdAt
        userChats.sort((a: { data: { createdAt: number; }; }, b: { data: { createdAt: number; }; }) => b.data.createdAt - a.data.createdAt);

        setChats(userChats);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch chats");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  const refreshChatbotData = async () => {
    await loadChatbotData();
    setChats((prevChatbotData) => [...prevChatbotData]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    // Dapatkan ID user
    const user = auth.currentUser;
    const userId = user?.uid;
  
    // Kirim permintaan ke endpoint chatbot
    const response = await axios.post(`${API_HOST}:${API_PORT}/api/chatbot/`, {
      instances: [
        {
          context: "Kamu adalah Seorang Yang ahli di bidang statistika dan pemrograman R, nama kamu adalah R bot.",
          examples: [
            {
              input: {
                author: "user",
                content: "siapa kamu?",
              },
              output: {
                author: "bot",
                content: "saya adalah Rbot.",
              },
            },
          ],
          messages: [
            {
              author: userId,
              content: message,
            },
          ],
        },
      ],
      parameters: {
        candidateCount: 1,
        maxOutputTokens: 1024,
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
      },
    });
  
    // Periksa respons
    if (response.status === 200) {
      // reset jika berhasil
      setMessage("");
      
    } else {
      // Tangani kesalahan
      throw new Error("Failed to get response");
    }

    // Refresh data chatbot setelah submit berhasil
    await refreshChatbotData();
    
  };

  useEffect(() => {
    loadChatbotData();
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen rounded overflow-hidden shadow-lg">
  <div className="flex flex-col overflow-y-auto p-4">
    {loading ? <p className="text-center">Loading...</p> : (
      <ul className="flex flex-col">
        {chats.map((chat, index) => (
          <li key={index} className="flex items-center p-2 mb-2">
            <div className="flex-1">
              <p className="text-sm p-2">{chat.data.content}</p>
              <p className="bg-gray-200 text-xs px-3 py-3">{chat.data.response}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  <form className="flex items-center justify-between p-4" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Masukkan pesan Anda"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      className="flex-1 border border-gray-300 rounded-full p-2"
    />
    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
    <SendIcon/>
    </button>
  </form>
</div>

  );
};


export default ChatBot;
