"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Spinner from '@/components/Spinner';
import CodeEditorWindow from "@/components/compiler/CodeEditorWindows";
import { defineTheme } from "@/components/compiler/utils/defineTheme";
import Select from "react-select";


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

  const [code, setCode] = useState('#Write Your R Code Here...');
  const [theme, setTheme] = useState("amy");


  const language = {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const onChange = (action: any, data: string) => {
    switch (action) {
    case "code": {
        setCode(data);
        break;
    }
    default: {
        console.warn("case not handled!", action, data);
    }
    }
  };

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


  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme...", theme);

    if (["vs-dark", "vs-dark"].includes(theme.value)) {
    setTheme(theme);
    } else {
    defineTheme(theme.value).then((_) => setTheme(theme));
    }
}
  useEffect(() => {
      defineTheme("monoindustrial").then((_) =>
      setTheme({ value: "monoindustrial", label: "monoindustrial" })
      );
  }, []);


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


    
    <div className='px-4'>
      {detailModul ? (

        <div className=''>
          <div className='grid grid-cols-2 gap-7 mb-5 bg-gray-100 px-4 py-3 outline outline-1 rounded-lg outline-gray-300'>
            <h1 className=' font-extrabold text-base md:text-2xl text-[#00726B]'>{detailModul.data.namaModul} : <span className='font-medium'>{detailModul.data.judulModul}</span></h1>
            <Select
              placeholder="Pilih Modul"
              options={options}
              onChange={undefined}

            />
            {/* <p>code: {detailModul.data.codeSampel}</p> */}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div>
              {pdfUrl && (
                <embed
                  type="application/pdf"
                  src={pdfUrl}
                  width="100%"
                  height="100%"
                  title="PDF Viewer"
                
                />
              )}

            </div>
            <div>
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </div>      

          </div>

          <div className="  flex flex-shrink-0 w-full  flex-col">
            <div className="px-4 py-2">
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                Output
            </h1>
            </div>
            <div className="w-full h-56 bg-[#1e293b] text-green-500 font-normal text-sm overflow-y-auto">

                {/* {imageUrl ? (
                    <img src={imageUrl} alt="Output" className="w-full h-full" />
                ) : (
                    <pre className="p-5">{response}</pre>
                )} */}
                </div>
            </div>

        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}



