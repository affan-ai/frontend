"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Spinner from '@/components/Spinner';
import CodeEditorWindow from "@/components/compiler/CodeEditorWindows";
import { defineTheme } from "@/components/compiler/utils/defineTheme";

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 3001;

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

  return (


    
    <div className='px-4'>
      {detailModul ? (
        <div className=''>
          <div className='items-center text-center mb-5'>
            <h1 className='font-extrabold text-3xl md:text-5xl text-[#00726B]'>{detailModul.data.namaModul}</h1>
            <h1 className='font-semibold text-xl text-[#00726B]'>{detailModul.data.judulModul}</h1>
            <p>code: {detailModul.data.codeSampel}</p>
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


