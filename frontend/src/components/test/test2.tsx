import * as React from 'react';
import testStyle from "./test2.module.css"

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from 'react';



const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
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
    <div className={testStyle.descriptionContainer}>
      <div className={testStyle.toolbar}>
        <div className={testStyle.editor}>
          Editor
          <ReactQuill
            theme='snow'
            value={value}
            className={testStyle.editorInput}
            onChange={setValue}
            onKeyPress={() => console.log(value)}
            modules={modules}
          />

        </div>
      </div>
    </div>
  );
}
