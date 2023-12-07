import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="65vh"
        width={`100%`}
        language={language}
        value={value}
        theme={theme}
        defaultValue=""
        onChange={handleEditorChange}
        options={{
          fontSize: 16
        }}
      />
    </div>
  );
};
export default CodeEditorWindow;


