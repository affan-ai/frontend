"use client";
import React, { useEffect, ChangeEvent,useState } from 'react';
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

interface DropdownProps {
  options: string[];
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
  const [portInput, setPortInput] = useState({
    text: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [urlShiny, setUrlShiny] = useState('');
  const [selectedPort, setSelectedPort] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    // Pastikan detailModul dan datanya sudah tersedia
    if (detailModul && detailModul.data) {
      setUrlShiny(detailModul.data.urlShiny);
    }
  }, [detailModul]);


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
          setUrlShiny(data.data.urlShiny)
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

  const optionPort = [
    { value: '4000', label: '4000' },
    { value: '4001', label: '4001' },
    { value: '4002', label: '4002' },
    { value: '4003', label: '4003' },
    { value: '4004', label: '4004' },
    { value: '4005', label: '4005' },
    { value: '4006', label: '4006' },
    { value: '4007', label: '4007' },
    { value: '4008', label: '4008' },
    { value: '4009', label: '4009' },
    { value: '4010', label: '4010' },
    { value: '4011', label: '4011' },
    { value: '4012', label: '4012' },
    { value: '4013', label: '4013' },
    { value: '4014', label: '4014' },
    { value: '4015', label: '4015' },
    { value: '4016', label: '4016' },
    { value: '4017', label: '4017' },
    { value: '4018', label: '4018' },
    { value: '4019', label: '4019' },
    { value: '4020', label: '4020' },
  ];

  const handleChange = (selectedOption: any) => { 
    router.push(`/modul/${selectedOption.value}`);
  }

  const handlePortChange = (selectedOption: any) => {
    setSelectedPort(selectedOption);
  };


  // const handlePortChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setPortInput({
  //     ...portInput,
  //     [name]: value,
  //   });
  // };

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
      
      const port = selectedPort?.value;

      // Mendapatkan token dari localStorage atau sumber lainnya
      const storedToken = localStorage.getItem('customToken');

      const response = await fetch(`${config.API_URL}/api/compiler/check-port/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ port }),
      });

      const responseData = await response.json();
      console.log(responseData);
      console.log(responseData.status);

      const status = responseData.status;

      let shinyPort, shinyUrl;

      if (status === 'false') {
        if (port) {
          // Menunggu 1 detik sebelum mengatur urlShiny
          setTimeout(() => {
            const shinyUrl = `http://rwikistat.usk.ac.id:${port}`;
            setUrlShiny(shinyUrl);
          }, 2000); // Waktu penundaan dalam milidetik (di sini, 1000 milidetik = 1 detik)
        }
        const response = await fetch(`${config.API_URL}/api/compiler/shiny/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ code, port }),
        });
  
        const responseData = await response.json();
  
        const shinyOutput = responseData.shinyOutput.text;
        const originalOutput = responseData.originalOutput;
  
        // Contoh: Set state atau melakukan operasi lainnya
        setOutputDetails(shinyOutput);
        setResponse(originalOutput);
  
      }else if (status === 'true') {
        console.log('Port is already in use');
        setErrorMessage('Port is already in use');
      } else {
        console.log('Unexpected value for responseData.status:', status);
      }

      // Menjalankan kode setelah kondisi status === 'false' tanpa menunggu respon
      
      
    } catch (error) {
      console.error(error);
      setResponse('Terjadi kesalahan saat mengirim kode.');
    }
  };

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
            {/* <input
                type="text"
                name="text"
                autoComplete="off"
                className="border rounded-md p-2 flex-1 border-gray-300"
                placeholder="Tambahkan port"
                value={portInput.text}
                onChange={handlePortChange}
                required
                />
                <div>
                {errorMessage && <p>{errorMessage}</p>}
              </div> */}
            <div className='flex p-5 justify-between items-center'>
            <h1 className=' font-bold text-base md:text-2xl text-[#00726B]'>Compiler {detailModul.data.namaModul}</h1>
              <div className='flex gap-3 items-center'>
                {errorMessage && <p className='text-red-600 text-sm'>{errorMessage}</p>}
                {/* <p className='text-red-600 text-sm'>This Port Already Used</p> */}
                <Select
                  placeholder="Pilih Port"
                  options={optionPort}
                  value={selectedPort}
                  onChange={handlePortChange}
                />
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
            <iframe
                className='w-full h-[700px]'
                src={urlShiny}
                width="100%"
                height="100%"
              />
            {/* <div className='grid grid-cols-2 gap-3 h-96'>
              <iframe
                src={urlShiny}
                width="100%"
                height="100%"
              />
              <div className="w-full bg-[#1e293b] text-green-500 font-normal text-sm overflow-y-auto">
                <pre className="p-5">{response}</pre>
              </div>
            </div> */}
          </div>

        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}



