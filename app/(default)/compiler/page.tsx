"use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "@/components/compiler/CodeEditorWindows";
import axios from "axios";
import { classnames } from "@/components/compiler/utils/general";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";
import { defineTheme } from "@/components/compiler/utils/defineTheme";
import useKeyPress from "@/components/compiler/utils/useKeyPress";
// import useAuthMiddleware from '@/app/middleware/authMiddleware';
import Markdown from "react-markdown";
import config from "@/config.js";


const CodeEditor = () => { 

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

  const [response, setResponse] = useState('');
const enterPress = useKeyPress("Enter");
const ctrlPress = useKeyPress("Control");

const options = [
  { value: 'png("out.png", width = 800, height = 600', label: 'Plot Compiler' },
  { value: '#write the code bellow', label: 'String Compiler' },
]

const handleSelectChange = (selectedOption: any) => {
  console.log(`Option selected:`, selectedOption);
  setCode(selectedOption.value);
  console.log(code);
}

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

        // Send the image data to the server for storage
      saveImageToDatabase(blob);
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

  const saveImageToDatabase = async (blob: Blob) => {
    try {
      // Send the image data to your server API for storage in the database
      const formData = new FormData();
      formData.append('image', blob, 'compiled_image.png');
  
      await fetch(`${config.API_URL}/api/history`, {
        method: 'POST',
        body: formData,
      });
  
      console.log('Image saved to database successfully');
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
            <Select
              placeholder={`Select Compiler Type`}
              // options={languageOptions}
              options={options}
              isSearchable={false}
            //   styles={customStyles}
              onChange={handleSelectChange}
            />
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
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language="r"
          theme="vs-dark"
        />
        </div>

        <div className="flex flex-shrink-0 w-full  flex-col mt-5">
            
            <div className="w-full h-96 bg-[#1E1E1E] text-green-500 font-normal text-sm overflow-y-auto">
              <div className="px-4 py-2 flex flex-row justify-between">
                <h1 className="font-bold text-xl mb-2">
                    Output
                </h1>
                <button type="submit" className=" text -[#00726B] py-2 px-8 rounded-lg  bg-white font-semibold mb-2">Simpan</button>
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
