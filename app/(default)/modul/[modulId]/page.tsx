"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Spinner from '@/components/Spinner';
import CodeEditorWindow from "@/components/compiler/CodeEditorWindows";
import { defineTheme } from "@/components/compiler/utils/defineTheme";
import Select from "react-select";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { classnames } from "@/components/compiler/utils/general";
import Markdown from "react-markdown";
import MarkdownPreview from '@uiw/react-markdown-preview';
import config from "@/config.js";

interface ModulData {
  id: number;
  data: {
    namaModul: string;
    codeSampel: string;
    judulModul: string;
    urlShiny: string;
    textData: string;
  };
}

export default function DetailPage() {

  useEffect(() => {
    document.title = "Baca Modul | Rwikistat";
    return () => {
    };
  }, []); 


  const pathname = usePathname();
  const modulId = pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [detailModul, setDetailModul] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState(''); // State untuk URL PDF
  const [theme, setTheme] = useState("amy");
  const router = useRouter();
  const [postContent, setPostContent] = useState("");


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

  const [testData, setTestData] = useState<ModulData[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState('');
  const [response, setResponse] = useState('');
  const defaultCode = detailModul?.data?.codeSampel || ''; // Nilai default untuk properti code
  const [code, setCode] = useState<string>(defaultCode);
  const pdfUrlWithParams = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    if (modulId) {
      // Mendapatkan token dari localStorage atau sumber lainnya
    const storedToken = localStorage.getItem('customToken');

    // Membuat header dengan menyertakan token
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
      // Lakukan permintaan ke API untuk mendapatkan data detail modul berdasarkan ID
      fetch(`${config.API_URL}/api/modul/${modulId}`, { headers })
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

    // Fungsi untuk menangani klik tombol download
    const handleDownloadClick = () => {
      setDownloadClicked(true);
  
      // Lakukan proses download (bisa menggunakan window.open atau metode lain)
      // Misalnya, menggunakan window.open
      window.open(pdfUrlWithParams, '_blank');
    };




  const fetchData = async () => {
    try {
      // Mendapatkan token dari localStorage atau sumber lainnya
      const storedToken = localStorage.getItem('customToken');

      // Membuat header dengan menyertakan token
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };
      const response = await axios.get(`${config.API_URL}/api/modul`, { headers });
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

  const options = testData.map((module) => ({
    label: module.data.namaModul,
    value: module.id,
  }));

  const handleChange = (selectedOption: any) => { 
    router.push(`/modul/${selectedOption.value}`);
  }

  const handleCodeChange = (action: any, data: string) => {
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

  const handleCompile = async () => {
    try {
      // Mendapatkan token dari localStorage atau sumber lainnya
      const storedToken = localStorage.getItem('customToken');

      
      const response = await fetch(`${config.API_URL}/api/compiler/modul/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ code }),
      });

        const data = await response.text();
        setOutputDetails(data);
        setResponse(data);
      
    } catch (error) {
      console.error(error);
      setResponse('Terjadi kesalahan saat mengirim kode.');
    }
  };


  // const file_name = 'test.md';
  // const [post, setPost] = useState('hello');

  // useEffect(() => {
  //   import(`../../../../public/${file_name}`)
  //       .then(res => {
  //           fetch(res.default)
  //               .then(res => res.text())
  //               .then(res => setPost(res))
  //               .catch(err => console.log(err));
  //       })
  //       .catch(err => console.log(err));
  // });

  const [markdown, setMarkdown] = useState("# Markdown Preview");

  return (
    <div className='px-8'>
      {detailModul ? (

        <div className='mt-5'>
          <div className='grid grid-cols-2 gap-7 mb-5 bg-gray-100 px-5 py-3 outline outline-1 rounded-lg outline-gray-300'>
            <h1 className=' font-extrabold text-base md:text-2xl text-[#00726B]'>{detailModul.data.namaModul} : <span className='font-medium'>{detailModul.data.judulModul}</span></h1>
            <div className='grid grid-cols-2 gap-3'>
              <Select
                placeholder="Pilih Modul"
                options={options}
                onChange={handleChange}
              />
                <div>
                  {pdfUrl && !downloadClicked && (
                    <a
                      href={pdfUrlWithParams}
                      download="your-pdf-file.pdf"
                    >
                      <button
                        onClick={handleDownloadClick}
                        className='block w-full bg-[#00726B] py-2 rounded-lg text-white font-semibold md:col-span-1"'
                      >
                        Download PDF
                      </button>
                    </a>
                  )}
                </div>
            </div>
          </div>
          {/* <section className='bg-blue-100 mx-20 px-10 py-10 markdown'>
            <Markdown className="text-bold">{markdown}</Markdown>
          </section> */}
          <article data-color-mode="light" className='px-14 py-7' >
            <MarkdownPreview source={detailModul.data.textData} />
          </article>
          <hr/>
          <div className=' mt-5'>
            <div className='flex p-5 justify-between items-center'>
            <h1 className=' font-bold text-base md:text-2xl text-[#00726B]'>Compiler {detailModul.data.namaModul}</h1>
              <button
              onClick={handleCompile}
              disabled={!code}
              value={code}
              className={classnames(
                  "block w-56 bg-[#00726B] py-2 rounded-lg duration-500 text-white font-semibold md:col-span-1",
                  !code ? "opacity-50" : ""
              )}
              >
              {processing ? "Processing..." : "Compile"}
              </button>
            </div>
            <div>
              <CodeEditorWindow
                code={detailModul.data.codeSampel}
                onChange={handleCodeChange}
                language="r"
                theme="vs-dark"
                defaultValue={undefined}
              />
            </div>
          </div>

          <div className=" flex flex-shrink-0 w-full  flex-col mt-5">
            <h1 className="font-bold text-xl mb-2 text-[#00726B]">
                Output
            </h1>
            <div className='grid grid-cols-2 gap-3 h-96'>
              <iframe
                src={detailModul.data.urlShiny}
                width="100%"
                height="100%"
              />
              <div className="w-full bg-[#1e293b] text-green-500 font-normal text-sm overflow-y-auto">
                <pre className="p-5">{response}</pre>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}



