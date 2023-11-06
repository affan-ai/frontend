import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindows";
import axios from "axios";
import { classnames } from "./utils/general";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "./utils/defineTheme";
import useKeyPress from "./utils/useKeyPress";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";

const RDefault = `# Sample R Code
data <- c(23, 45, 56, 34, 67, 89, 12, 78, 54, 32, 65, 90, 43, 76, 21)

# Calculate the mean and standard deviation
mean_value <- mean(data)
sd_value <- sd(data)

# Print the results
cat("Mean:", mean_value, "\n")
cat("Standard Deviation:", sd_value, "\n")

# Create a histogram to visualize the data
hist(data, main="Histogram of Sample Data", xlab="Value", ylab="Frequency", col="lightblue", border="black")

`;

const CodeEditor = () => { 
const [code, setCode] = useState(RDefault);
const [customInput, setCustomInput] = useState("");
const [outputDetails, setOutputDetails] = useState(null);
const [processing, setProcessing] = useState(null);
const [theme, setTheme] = useState("amy");
const language = {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
}

const enterPress = useKeyPress("Enter");
const ctrlPress = useKeyPress("Control");


useEffect(() => {
    if (enterPress && ctrlPress) {
    console.log("enterPress", enterPress);
    console.log("ctrlPress", ctrlPress);
    handleCompile();
    }
}, [ctrlPress, enterPress]);
const onChange = (action, data) => {
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
const handleCompile = () => {
    setProcessing(true);
    const formData = {
    language_id: language.id,
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(customInput),
    };
    const options = {
    method: "POST",
    url: process.env.REACT_APP_RAPID_API_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
    data: formData,
    };

    axios
    .request(options)
    .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
    })
    .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
        console.log("too many requests", status);

        showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
        );
        }
        setProcessing(false);
        console.log("catch block...", error);
    });
};

const checkStatus = async (token) => {
    const options = {
    method: "GET",
    url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
    };
    try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
        checkStatus(token);
        }, 2000);
        return;
    } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
    }
    } catch (err) {
    console.log("err", err);
    setProcessing(false);
    showErrorToast();
    }
};

function handleThemeChange(th) {
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

const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
};
const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
    position: "bottom-right",
    autoClose: timer ? timer : 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
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



    <div className=" items-start">
        <div className=" pb-4 items-end grid grid-cols-2 md:grid-cols-5 gap-4 ">
            <div className="md:col-span-2 md:col-start-3">
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
            <button
            onClick={handleCompile}
            disabled={!code}
            className={classnames(
                "block w-full bg-[#00726B] mt-5 py-2 rounded-lg duration-500 text-white font-semibold md:col-span-1",
                !code ? "opacity-50" : ""
            )}
            >
            {processing ? "Processing..." : "Compile"}
            </button>
            
        </div>
        <div className=" w-full h-full justify-start items-end">
        <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
        />
        </div>

        <div className="  flex flex-shrink-0 w-full md:w-[70%] flex-col">
            <div className="px-4 py-2">
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                Output
            </h1>
            </div>
        <OutputWindow outputDetails={outputDetails} />
        <div className="flex flex-col items-end">
        </div>
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
    </div>
    </>
);
};
export default CodeEditor;
