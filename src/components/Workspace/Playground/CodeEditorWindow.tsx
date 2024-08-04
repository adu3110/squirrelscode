import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// import CodeMirror from "@uiw/react-codemirror";
interface CodeEditorWindowProps {
  onChange: (key: string, value: string) => void;
  language?: string;
  code?: string;
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ onChange, language, code }) => {
  const [value, setValue] = useState<string>(code || "");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValue(value);
      onChange("code", value);
    }
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme = "vs-dark"
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;