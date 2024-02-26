import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../app/firebase';
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import config from "@/config.js";


const Bookmark: React.FC<{ itemId: string }> = ({ itemId }) => {
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Periksa apakah pengguna telah menyukai postingan
    handleIsBookmarked(itemId);
  }, [itemId]);

  const handleIsBookmarked= async (itemId: string) => {
    try {
      const user = auth.currentUser;
      const userId = user?.uid; // Get the user ID from the authentication object
  
      if (userId) {
        // Kirim permintaan API untuk mengambil data like
        const response = await axios.get(`${config.API_URL}/api/forum/bookmark/${itemId}/is-bookmarked`, {
          params: {
            userId: userId,
          },
        });
  
        if (response.status === 200) {
            setIsBookmarked(response.data.isBookmarked);
            // console.log(response.data.isLiked);
            setIsLoading(false); 
        }
      } else {
        // Pengguna belum masuk, jangan lakukan apa-apa
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Gagal mengambil bookmark:', error);
      setIsLoading(false);
    }
  }

  const handleBookmark = async (itemId: string) => {
    try {
      const user = auth.currentUser;
      const userId = user?.uid; // Get the user ID from the authentication object

      if (userId) {
        // Kirim permintaan API untuk menyukai postingan
        const response = await axios.post(`${config.API_URL}/api/forum/bookmark/${itemId}`, {
          userId: userId,
        });

        if (response.status === 200) {
            // Set state dan simpan status like di sesi penyimpanan lokal
            setIsBookmarked(true);
            sessionStorage.setItem(`bookmarked_${itemId}`, 'true');
        }
      } else {
        // Pengguna belum masuk, jangan lakukan apa-apa
      }
    } catch (error) {
      console.error('Gagal bookmark postingan:', error);
    }
  };

  const handleUnbookmark = async (itemId: string) => {
    try {
      const user = auth.currentUser;
      const userId = user?.uid; // Get the user ID from the authentication object

      if (userId) {
        // Kirim permintaan API untuk membatalkan like postingan
        const response = await axios.post(`${config.API_URL}/api/forum/unbookmark/${itemId}`, {
          userId: userId,
        });

        if (response.status === 200) {
            // Set state dan simpan status unlike di sesi penyimpanan lokal
            setIsBookmarked(false);
            sessionStorage.setItem(`bookmarked_${itemId}`, 'false');
        }
      } else {
        // Pengguna belum masuk, jangan lakukan apa-apa
      }
    } catch (error) {
      console.error('Gagal membatalkan bookmark postingan:', error);
    }
  };

  return (
    <>
      {isBookmarked ? (
        <BiSolidBookmark id={itemId} onClick={() => handleUnbookmark(itemId)} size='20' />
      ) : (
        <BiBookmark  id={itemId} onClick={() => handleBookmark(itemId)} size='20' />
      )}
    </>
  );
};

export default Bookmark;
