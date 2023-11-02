import React from 'react';
// import CodeEditor from '@/components/CodeEditor';
import CodeEditorWindow from '@/components/compiler/CodeEditorWindows';

const page = () => {
  return (
    <div className='p-4'>
      <div>
        Compiler Page
      </div>
      <div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          {/* <LanguagesDropdown onSelectChange={onSelectChange} /> */}
        </div>
        <div className="px-4 py-2">
          {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} /> */}
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          {/* <CodeEditorWindow
            code={code}
            onChange={onchange}
            theme={theme.value}
          /> */}
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          {/* <OutputWindow outputDetails={outputDetails} /> */}
          {/* <div className="flex flex-col items-end">
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
        </div>
      </div>
      </div>
    </div>
    
  )
}

export default page