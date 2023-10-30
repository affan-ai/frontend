"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { usePathname } from 'next/navigation';
import Spinner from '../components/Spinner';
import UserInfo from '../components/UserInfo';
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import TimeAgo from 'react-timeago';
import { UserAuth} from '../context/authContext';

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

export default function DetailPage() {
    const {user} = UserAuth();
    const pathname = usePathname();
    const forumId = pathname.split('/')[2];
    const [loading, setLoading] = useState(true);
    
    const [commentInput, setCommentInput] = useState({
        text: '',
        userId: '', // Tambahkan data pengguna saat ini jika diperlukan
    });
    const [detailForum, setDetailForum] = useState<any>(null); // State untuk data detail modul
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        if (forumId) {
          // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
          fetch(`${API_HOST}:${API_PORT}/api/forum/${forumId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Gagal mengambil data postingan.');
              }
              return response.json();
            })
            .then((data) => {
              setDetailForum(data); // Menyimpan data detail modul dalam state
            })
            .catch((error) => {
              console.error('Gagal mengambil data postingan:', error);
            });
    
            fetch(`${API_HOST}:${API_PORT}/api/forum/${forumId}/comments`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Gagal mengambil komentar.');
              }
              return response.json();
            })
            .then((data) => {
              // Mengurutkan komentar berdasarkan waktu terbaru
              const sortedComments = data.sort((a: { data: { createdAt: { _seconds: number; _nanoseconds: number; }; }; }, b: { data: { createdAt: { _seconds: number; _nanoseconds: number; }; }; }) => {
                const dateA = new Date(a.data.createdAt._seconds * 1000 + a.data.createdAt._nanoseconds / 1000000).getTime();
                const dateB = new Date(b.data.createdAt._seconds * 1000 + b.data.createdAt._nanoseconds / 1000000).getTime();
              
                // Urutkan data berdasarkan createdAt dari yang terbaru ke yang terlama
                return dateB - dateA;
              });
      
              setComments(sortedComments); // Menyimpan data komentar yang telah diurutkan dalam state
            })
            .catch((error) => {
              console.error('Gagal mengambil komentar:', error);
            });
        }
      }, [forumId]);
  
      const handleCommentInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCommentInput({
          ...commentInput,
          [name]: value,
        });
      };
    
      const handleCommentSubmit = async (event: FormEvent, topicId: string) => {
        event.preventDefault();
        try {
          const { text } = commentInput;
        
          // Dapatkan ID pengguna yang aktif (dalam hal ini, kita asumsikan pengguna sudah login)
          const userId = auth.currentUser ? auth.currentUser.uid : null;
        
          if (!userId) {
            // Handle jika pengguna tidak terotentikasi atau belum masuk
            console.error('Pengguna belum terotentikasi atau belum masuk.');
            return;
          }
        
          // Kirim komentar ke endpoint Express dengan ID pengguna yang aktif
          const response = await axios.post(`${API_HOST}:${API_PORT}/api/forum/${topicId}/comments`, { text, userId });
        
          if (response.status === 200) {
            // Clear the comment input after a successful submission
            setCommentInput({
              text: '',
              userId: '',
            });
      
            // Refresh comments data after a successful submission
            fetch(`${API_HOST}:${API_PORT}/api/forum/${topicId}/comments`)
              .then((response) => response.json())
              .then((data) => {
                setComments(data); // Update comments with the latest data
              })
              .catch((error) => {
                console.error('Gagal mengambil komentar:', error);
              });
          }
        } catch (error) {
          console.error('Gagal menambahkan komentar:', error);
        }
      };
      

      return (
        <div className='p-4'>
          {detailForum ? (
            <div className="p-4 border border-gray-300 rounded-md shadow-md mb-4">
              <h1>Halaman Detail Modul</h1>
              <p className='font-bold text-lg text-gray-800'><p><UserInfo uid={detailForum.data.userId as string} /></p></p>
              <p className='text-2xl text-blue-600'>{detailForum.data.title}</p>
              <p className='text-2xl text-black-600'>{detailForum.data.topics}</p>
              <p className='text-2xl text-green-600'>
                {detailForum.data.images.map((image: string | StaticImport, index: React.Key | null | undefined) => (
                <Image key={index} src={image} width={100}
                height={100} alt={`Gambar ${index}`} />
                ))}</p>
              <TimeAgo className='text-sm text-gray-500' date={new Date(detailForum.data.createdAt._seconds * 1000)} />
              {/* Tampilkan data lain sesuai kebutuhan */}
                  { user ? (<form onSubmit={(e) => handleCommentSubmit(e, detailForum.id)}>
                    <input
                    type="text"
                    name="text"
                    placeholder="Tambahkan komentar"
                    value={commentInput.text}
                    onChange={handleCommentInputChange}
                    required
                    />
                    <button type="submit">Kirim Komentar</button>
                </form>):
                (<p>Login dulu bang - Protected Route</p>)}
              {/* Formulir komentar */}
                
            </div>
          ) : (
            <Spinner />
          )}
      
          {comments.length > 0 ? (
            <div>
              <h2>Komentar:</h2>
              {comments.map((comment: any) => (
                <div className="p-4 border border-gray-300 rounded-md shadow-md mb-4" key={comment.id}>
                  <p>{comment.data.text}</p>
                  <p><UserInfo uid={comment.data.userId as string} /></p>
                  <TimeAgo className='text-sm text-gray-500' date={new Date(comment.data.createdAt._seconds * 1000)} />
                  {/* Tampilkan data komentar lain sesuai kebutuhan */}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      );
      
}