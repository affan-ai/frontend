"use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "@/components/compiler/CodeEditorWindows";
import axios from "axios";
import { classnames } from "@/components/compiler/utils/general";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "@/components/compiler/utils/defineTheme";
import useKeyPress from "@/components/compiler/utils/useKeyPress";
import ThemeDropdown from "@/components/compiler/ThemeDropdown";



const CodeEditor = () => { 
const [code, setCode] = useState('#Write Your R Code Here');
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
  const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
  const API_PORT = 5000;

const enterPress = useKeyPress("Enter");
const ctrlPress = useKeyPress("Control");

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
      const response = await fetch(`${API_HOST}:${API_PORT}/api/compiler/test/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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



    <div className=" items-start">
        <div className=" pb-4 items-end grid grid-cols-2 md:grid-cols-5 gap-4 ">
            <div className="md:col-span-2 md:col-start-3">
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
            <button
            onClick={handleCompile}
            disabled={!code}
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
            language={language?.value}
            theme={theme.value}
        />
        </div>

        <div className="  flex flex-shrink-0 w-full  flex-col">
            <div className="px-4 py-2">
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                Output
            </h1>
            </div>
            <div className="w-full h-56 bg-[#1e293b] text-green-500 font-normal text-sm overflow-y-auto">
                {/* Conditional rendering based on content type */}
                {imageUrl ? (
                    <img src={imageUrl} alt="Output" className="w-full h-full" />
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
