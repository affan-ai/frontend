 "use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "@/components/compiler/CodeEditorWindows";
import axios from "axios";
import { classnames } from "@/components/compiler/utils/general";
import { UserAuth} from '@/app/context/authContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from '@/app/firebase';
import Select from "react-select";
import { defineTheme } from "@/components/compiler/utils/defineTheme";
import useKeyPress from "@/components/compiler/utils/useKeyPress";
// import useAuthMiddleware from '@/app/middleware/authMiddleware';
import Markdown from "react-markdown";
import config from "@/config.js";
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Head from 'next/head';


const CodeEditor = () => { 

  useEffect(() => {
    document.title = "Compiler | Rwikistat";
    return () => {
    };
  }, []); 

  // const { user } = useAuthMiddleware();
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState('');
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("amy");
  const language = {
      id: 80,
      name: "R (4.0.0)",
      label: "R (4.0.0)",
      value: "r",
  }
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageData, setImageData] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState('')
  const {user} = UserAuth();
  const [response, setResponse] = useState('');
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const [defaultValue, setDefaultValue] = useState('');
  const [option, setOption] = useState("string");
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = useState(false);


useEffect(() => {
    if (enterPress && ctrlPress) {
    console.log("enterPress", enterPress);
    console.log("ctrlPress", ctrlPress);
    handleCompile();
    }
}, [ctrlPress, enterPress]);

  // Use useEffect to clean up the image element when imageUrl changes
  useEffect(() => {
    return () => {
      // Clean up the image element
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

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



const handleCompile = async () => {
    try {
      // Mendapatkan token dari localStorage atau sumber lainnya
      const storedToken = localStorage.getItem('customToken');
      console.log(storedToken);

      
      const response = await fetch(`${config.API_URL}/api/compiler/test/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ code }),
      });
  
    // Reset imageUrl to null before processing new response
    setImageUrl(null);

      // Check if the response is an image
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('image/png')) {
        // If it's an image, set the response as an image source
        const blob = await response.blob();
        const newImageUrl = URL.createObjectURL(blob);
        setImageUrl(newImageUrl);
        setImageData(blob)

        // Send the image data to the server for storage
      // saveImageToDatabase(blob);
      } else {
        // If it's not an image, set the response as text
        const data = await response.text();
        setOutputDetails(data);
        setResponse(data);
      }
    } catch (error) {
      console.error(error);
      setResponse('Terjadi kesalahan saat mengirim kode.');
    }
  };

  const imageName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
};

  const handelSimpan = async () => {
    if (imageData) {
      saveImageToDatabase(imageData);
      
    }
  }

  const saveImageToDatabase = async (blob: Blob) => {
    try {
      // Send the image data to your server API for storage in the database
      const storedToken = localStorage.getItem('customToken');

      const formData = new FormData();
      const user = auth.currentUser;
      formData.append('fileName',fileName);
      if (user) {
        formData.append('uid',user?.uid);
        }
      formData.append('image', blob, 'compiled_image.png');
      setLoading(true);
  
      const response = await fetch(`${config.API_URL}/api/history`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (response.status === 200) {
        const responseData = await response.json();
        console.log('Success:', responseData.message);
        // Display success message to the user
      } else {
        console.error('Error:', response.statusText);
        // Display error message to the user using the status text
      }
  
      console.log('Image saved to database successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error saving image to database:', error);
    }
  };


return (
  
    <>
          
    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />



    <div className=" items-start px-5">
        <div className=" pb-4 items-end grid grid-cols-2 md:grid-cols-5 gap-4 px-3">
            <div className="md:col-span-2 md:col-start-3">
            {/* <Select
              placeholder={`Select Compiler Type`}
              options={options}
              isSearchable={false}
              onChange={handleSelectChange}
            /> */}
            <select className=" w-full text-[#00726B] font-semibold outline-white rounded-md" name="option" id="pilihan" onChange={(e)=>{setOption(e.target.value)}}>
              <option className="text-center" value="string">String Compiler</option>
              <option className="text-center" value="graph">Graph Compiler</option> 
            </select> 
            </div>
            <button
            onClick={handleCompile}
            disabled={!code }
            value={code}
            className={classnames(
                "block w-full bg-[#00726B] mt-5 py-2 rounded-lg duration-500 text-white font-semibold md:col-span-1",
                !code ? "opacity-50" : ""
            )}
            >
            {processing ? "Processing..." : "Compile"}
            </button>
            
        </div>
        <div className=" w-full justify-start items-end">
          {option === "string" && (
            <CodeEditorWindow
            code={code}
            onChange={onChange}
            language="r"
            theme="vs-dark"
            defaultValue=""
          />
          )}
          {option === "graph" && (
            <CodeEditorWindow
            code={code}
            onChange={onChange}
            language="r"
            theme="vs-dark"
            defaultValue={`png("out.png", width = 800, height = 600)`}
          />
          )}
        
        </div>

        <div className="flex flex-shrink-0 w-full  flex-col mt-5">
            
            <div className="w-full h-96 bg-[#1E1E1E] text-green-500 font-normal text-sm overflow-y-auto">
              <div className="px-4 py-2 flex flex-row justify-between">
                <h1 className="font-bold text-xl mb-2">
                    Output
                </h1>
                {option === "graph" && (
                  <button type="submit" className=" text -[#00726B] py-2 px-8 rounded-lg  bg-white font-semibold mb-2" onClick={() => setOpen(true)}>Simpan</button>
                )}
                <React.Fragment>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999999, p: 2}}
                    >
                    <Sheet
                        variant="plain"
                        sx={{
                        width: 700,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        }}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} onClick={() => setOpen(false)} />
                        <div className="px-4 py-2 mt-10  mx-auto">
                        <div className="">
                          <label
                            className=" block text-base font-medium text-black"
                          >
                            Simpan Gambar Graph
                          </label>
                          <label
                            className="block text-xs font-medium text-gray-400"
                          >
                            Masukan Nama yang ingin kamu simpan
                          </label>
                          {loading ? (<p className="text-green-400">Gambar Berhasil disimpan</p>):("")}
                          <input
                            type="text"
                            name="title"
                            value={fileName}
                            onChange={imageName}
                            required
                            placeholder="contoh : gambar-plot-01"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white  p-3 text-sm text-gray-800 outline-none "
                          />
                          <button type="submit" onClick={handelSimpan} className=" mt-2 bg-[#00726B] py-2 px-8 rounded-lg  text-white font-semibold mb-2">Simpan</button>
                        </div>
                            <div className="flex flex-row gap-3 items-end">
                            </div>
                        </div>
                    </Sheet>
                    </Modal>
                </React.Fragment>
              </div>
                {/* Conditional rendering based on content type */}
                {imageUrl ? (
                    <img src={imageUrl} alt="Output" className="h-full p-5" />
                    // <p> {imageUrl}</p>
                ) : (
                    <pre className="p-5">{response}</pre>
                )}
                </div>

        <div className="flex flex-col items-end">
        </div>
        
        </div>
    </div>
    
    </>
);
};
export default CodeEditor;





