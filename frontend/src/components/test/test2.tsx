import * as React from 'react';
import testStyle from "./test2.module.css"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from 'react';


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: []}],
    [{ size: []}],
    ["bold", "italic", "underline"],
    [
      { list: "ordered"},
      { list: "bullet"},

    ]
  ]
};


export default function ToggleButtonsMultiple() {

  const [value, setValue] = useState("");

  return (
    <div className={testStyle.container}>
      <div className={testStyle.row}>
        <div className={testStyle.editor}>
          Editor
          <ReactQuill
            theme='snow'
            value={value}
            className={testStyle.editorInput}
            onChange={setValue}
            modules={modules}
          />

        </div>
        <div className={testStyle.preview}>Preview</div>
      </div>
    </div>
  );
}
