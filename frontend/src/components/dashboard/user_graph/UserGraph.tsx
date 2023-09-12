import { ResponsiveBar } from "@nivo/bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserGraphStyle from "./UserGraph.module.css";
import { Divider } from "@mui/material";

const data = [
  {
    status: "Upcoming",
    month: 59,
  },
  {
    status: "Active", 
    month: 61,
  },
  {
    status: "Overdue",
    month: 2,
  },
  {
    status: "Cancelled",
    month: 78,
  },
  {
    status: "Completed",
    month: 71,
  },
];

export default function UserGraph() {
  return (
    <div className={UserGraphStyle.userGraphContainer  }>
      <div
        style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>

        {/* Main Container */}
        <div className={UserGraphStyle.card}>
          <div className={UserGraphStyle.textHolder}>

            {/* Text Title */}
            <text  className={UserGraphStyle.textTitle}> PROJECT STATUS </text>
            <text className={UserGraphStyle.textSubtitle}> PROJECT STATUS </text>

            <Divider style={{ padding: "1%" }} variant="middle" />

            {/* Information */}
            <div className={UserGraphStyle.infoContainer}>
              <text className={UserGraphStyle.textInfoUpdate}> +3%</text>
              <text className={UserGraphStyle.textInfo}>  than last month </text>
            </div>
          </div>
        </div>

       {/* Graph */}
        <div className={UserGraphStyle.graphContainer}>
          <ResponsiveBar
            data={data}
            keys={["month"]}
            indexBy="status"
            margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
            padding={0.4}
            valueScale={{ type: "linear" }}
            colors="white"
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: "white",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

// import * as React from 'react';
// import testStyle from "./test2.module.css"

// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useState } from 'react';

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline"],
//     [
//       { list: "ordered"},
//       { list: "bullet"},

//     ]
//   ]
// };

// export default function ToggleButtonsMultiple() {

//   const [value, setValue] = useState("");

//   return (
//     <div className={testStyle.descriptionContainer}>
//       <div className={testStyle.toolbar}>
//         <div className={testStyle.editor}>
//           Editor
//           <ReactQuill
//             theme='snow'
//             value={value}
//             className={testStyle.editorInput}
//             onChange={setValue}
//             onKeyPress={() => console.log(value)}
//             modules={modules}
//           />

//         </div>
//       </div>
//     </div>
//   );
// }
