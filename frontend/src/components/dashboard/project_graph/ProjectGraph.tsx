import { ResponsiveBar } from "@nivo/bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProjGraphStyle from "./ProjectGraph.module.css";
import { Divider } from "@mui/material";

const data = [
  {
    project: "Upcoming",
    status: 59,
  },
  {
    project: "Active",
    status: 61,
  },
  {
    project: "Overdue",
    status: 2,
  },
  {
    project: "Cancelled",
    status: 78,
  },
  {
    project: "Completed",
    status: 71,
  },
];

export default function ProjectGraph() {
  return (
    <div className={ProjGraphStyle.ProjGraphContainer  }>
      <div
        style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center",}}>

        {/* Main Container */}
        <div className={ProjGraphStyle.card}>
          <div className={ProjGraphStyle.textHolder}>

            {/* Text Title */}
            <text  className={ProjGraphStyle.textTitle}> PROJECT STATUS </text>
            <text className={ProjGraphStyle.textSubtitle}> PROJECT STATUS </text>

            <Divider style={{ padding: "1%" }} variant="middle" />

            {/* Information */}
            <div className={ProjGraphStyle.infoContainer}>
              <AccessTimeIcon
                style={{
                  color: " grey",
                  fontSize: "15px",
                  paddingRight: ".5%",
                }}
              />
              <text className={ProjGraphStyle.textInfo}> Updated 4 mins ago </text>
            </div>
          </div>
        </div>

       {/* Graph */}
        <div className={ProjGraphStyle.graphContainer}>
          <ResponsiveBar
            data={data}
            keys={["status"]}
            indexBy="project"
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
