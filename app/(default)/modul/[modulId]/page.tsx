"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import Link from 'next/link';
import TextEditor from '@/components/TextEditor';

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 5000;

interface ModulData {
  id: number;
  data: {
    namaModul: string;
    codeSampel: string;
    judulModul: string;
  };
}

export default function DetailPage() {
  const pathname = usePathname();
  const modulId = pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [detailModul, setDetailModul] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState(''); // State untuk URL PDF
  const [testData, setTestData] = useState<ModulData[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState('');
  const [response, setResponse] = useState('');
  const defaultCode = detailModul?.data?.codeSampel || ''; // Nilai default untuk properti code
  const [code, setCode] = useState<string>(defaultCode);
  

  useEffect(() => {
    if (modulId) {
      // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
      fetch(`${API_HOST}:${API_PORT}/api/modul/${modulId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Gagal mengambil data detail modul.');
          }
          return response.json();
        })
        .then((data) => {
          setDetailModul(data); // Menyimpan data detail modul dalam state
          setPdfUrl(data.data.pdfPath); // Set URL PDF
        })
        .catch((error) => {
          console.error('Gagal mengambil data detail modul:', error);
        });
    }
  }, [modulId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_HOST}:${API_PORT}/api/modul`);
      if (response.status === 200) {
        setTestData(response.data);
        console.log(response.data)
      } else {
        console.error('Gagal mengambil data:', response.statusText);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };
  
  useEffect(() => {
      fetchData();
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSubmit = async (code: string) => {
    try {
      const response = await fetch(`${API_HOST}:${API_PORT}/api/compiler/modul/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.status === 200) {
        const data = await response.text();
        setOutputDetails(data);
        setResponse(data);
        console.log(data)
      } else {
        console.error('Gagal mengirim kode:', response.statusText);
        setResponse('Gagal mengirim kode. Status: ' + response.status);
      }

      
    } catch (error) {
      console.error(error);
      setResponse('Terjadi kesalahan saat mengirim kode.');
    }
    // // Lakukan sesuatu dengan nilai code, misalnya kirim ke server atau lakukan operasi tertentu
    // console.log('Code submitted:', code);
  };

  return (
    <div className='p-4'>
      {detailModul ? (
        <div>
        <div>
          <h1>Halaman Detail Modul</h1>
          <h2>Detail Modul {modulId}</h2>
          <p>Nama Modul: {detailModul.data.namaModul}</p>
          <p>code: {detailModul.data.codeSampel}</p>
          {/* Tampilkan data lain sesuai kebutuhan */}
          {pdfUrl && (
            <embed
              type="application/pdf"
              src={pdfUrl}
              width="50%"
              height="1000px"
              title="PDF Viewer"
            />
          )}
            <div>
              <TextEditor 
                code={code} 
                onChange={handleCodeChange} 
                onSubmit={handleSubmit}
                placeholder={detailModul.data.codeSampel}
              />
              <div>
                <h2>Preview:</h2>
                <pre>{response}</pre>
              </div>
            </div>
            <div className='w-full h-full '>
            <iframe
              src="http://127.0.0.1:8888"
              height={1000}
              width={1000}
              />
            <p>tes</p>
            </div>
        </div>
        <div>
          {testData.map((item) => (
            <div key={item.id}>
          <Link href={`/modul/${item.id}`} className=' bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110'>
          <div className="">
            <h1 className=" text-2xl md:text-3xl font-bold text-black">{item.data.namaModul}</h1>
          </div>
          </Link>
          </div>
          ))}
        </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}



