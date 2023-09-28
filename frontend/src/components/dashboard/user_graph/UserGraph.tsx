import UserGraphStyle from "./UserGraph.module.css";
import { ResponsiveLine, Serie } from "@nivo/line";

// [
//   {
//       "user_status": [],
//       "project_status": [],
//       "user_per_year": [
//           {
//               "year_registered": 2023,
//               "data": [
//                   {"month": 1, "users": 100}
//               ]
//           }
//       ]
//   }
// ]

const data: Serie[] = [
  {
    "id": "2020",
    "color": "hsl(133, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 12
      },
      {
        "x": "March",
        "y": 56
      },
      {
        "x": "May",
        "y": 12
      },
      {
        "x": "July",
        "y": 15
      },
      {
        "x": "September",
        "y": 60
      },
      {
        "x": "November",
        "y": 101
      },
    ]
  },
  {
    "id": "2021",
    "color": "hsl(231, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 119
      },
      {
        "x": "March",
        "y": 73
      },
      {
        "x": "May",
        "y": 11
      },
      {
        "x": "July",
        "y": 291
      },
      {
        "x": "September",
        "y": 270
      },
      {
        "x": "November",
        "y": 270
      },
    ]
  },
];

const customTheme = {
  axis: {
    legend: {
      text: {
        fill: "white", // Legend text color
      },
    },
    ticks: {
      text: {
        fill: "white", // Tick text color
      },
    },
  },
  grid: {
    line: {
      stroke: "white", // Grid line color
    },
  },
  tooltip: {
    container: {
      background: "black", // Tooltip background color
      color: "white", // Tooltip text color
    },
  },
  labels: {
    text: {
      fill: "white", // Label text color
    },
  },
  legends: {
    text: {
      fill: "white", // Text anchor color
    },
  },
};



export default function UserGraph() {
  return (

      <div className={UserGraphStyle.userGraphHolder}>

        <div className={UserGraphStyle.graphContainer}>
          <div style={{height:'100%', width:'50%', backgroundColor:'white', borderRadius:'10px', border:'1px solid black', flexDirection:'column', display:'flex'}}>
            <div style={{flexDirection:'row', display:'flex', height:'10%', width:'90%', border:'1px solid red', justifyContent:'center'}}>

            </div>
          </div>





          <div style={{height:'100%', width:'50%', backgroundColor:'white', borderRadius:'10px', border:'1px solid black' }}>
        hello 
          </div>
       
        </div>
      </div>

  );
}








// /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// import UserGraphStyle from "./UserGraph.module.css";
// import { ResponsiveLine, Serie } from "@nivo/line";
// const data: Serie[] = [
//   {
//     "id": "2020",
//     "color": "hsl(133, 70%, 50%)",
//     "data": [
//       {
//         "x": "January",
//         "y": 12
//       },
//       {
//         "x": "March",
//         "y": 56
//       },
//       {
//         "x": "May",
//         "y": 12
//       },
//       {
//         "x": "July",
//         "y": 15
//       },
//       {
//         "x": "September",
//         "y": 60
//       },
//       {
//         "x": "November",
//         "y": 101
//       },
//     ]
//   },
//   {
//     "id": "2021",
//     "color": "hsl(231, 70%, 50%)",
//     "data": [
//       {
//         "x": "January",
//         "y": 119
//       },
//       {
//         "x": "March",
//         "y": 73
//       },
//       {
//         "x": "May",
//         "y": 11
//       },
//       {
//         "x": "July",
//         "y": 291
//       },
//       {
//         "x": "September",
//         "y": 270
//       },
//       {
//         "x": "November",
//         "y": 270
//       },
//     ]
//   },
//   {
//     "id": "2022",
//     "color": "hsl(122, 70%, 50%)",
//     "data": [
//       {
//         "x": "January",
//         "y": 17
//       },
//       {
//         "x": "March",
//         "y": 42
//       },
//       {
//         "x": "May",
//         "y": 71
//       },
//       {
//         "x": "July",
//         "y": 300
//       },
//       {
//         "x": "September",
//         "y": 50
//       },
//       {
//         "x": "November",
//         "y": 15
//       },
//     ]
//   },
//   {
//     "id": "2023",
//     "color": "hsl(4, 70%, 50%)",
//     "data": [
//       {
//         "x": "January",
//         "y": 82
//       },
//       {
//         "x": "March",
//         "y": 30
//       },
//       {
//         "x": "May",
//         "y": 11
//       },
//       {
//         "x": "July",
//         "y": 50
//       },
//       {
//         "x": "September",
//         "y": 90
//       },
//       {
//         "x": "November",
//         "y": 2
//       },
//     ]
//   },
//   {
//     "id": "2024",
//     "color": "hsl(133, 70%, 50%)",
//     "data": [
//       {
//         "x": "January",
//         "y": 119
//       },
//       {
//         "x": "March",
//         "y": 73
//       },
//       {
//         "x": "May",
//         "y": 11
//       },
//       {
//         "x": "July",
//         "y": 291
//       },
//       {
//         "x": "September",
//         "y": 270
//       },
//       {
//         "x": "November",
//         "y": 270
//       },
  
//     ]
//   }
// ];

// const customTheme = {
//   axis: {
//     legend: {
//       text: {
//         fill: "white", 
//       },
//     },
//     ticks: {
//       text: {
//         fill: "white", 
//       },
//     },
//   },
//   grid: {
//     line: {
//       stroke: "white", 
//     },
//   },
//   tooltip: {
//     container: {
//       background: "black", 
//       color: "white", 
//     },
//   },
//   labels: {
//     text: {
//       fill: "white",
//     },
//   },
//   legends: {
//     text: {
//       fill: "white", 
//     },
//   },
// };



// export default function UserGraph() {
//   return (
//     <div className={UserGraphStyle.userGraphContainer}>
//       <div className={UserGraphStyle.userGraphHolder}>

//         <div className={UserGraphStyle.card}>
//           <div className={UserGraphStyle.textHolder}>
          
//             <text className={UserGraphStyle.textTitle}> USER STATUS </text>
//             <text className={UserGraphStyle.textSubtitle}>
//               {" "} 
//               +2% than last year{" "}
//             </text>
//           </div>
//         </div>

//         <div className={UserGraphStyle.graphContainer}>
//         <ResponsiveLine
//         data={data}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: 'point' }}
//         yScale={{
//             type: 'linear',
//             min: 'auto',
//             max: 'auto',
//             stacked: true,
//             reverse: false
//         }}
//         yFormat=" >-.2f"
//         curve="basis"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legendOffset: 36,
//             legendPosition: 'middle'
//         }}
//         axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'count',
//             legendOffset: -40,
//             legendPosition: 'middle'
//         }}
//         enableGridX={false}
//         colors={{ scheme: 'paired' }}
//         pointSize={3}
//         pointColor={{ from: 'color', modifiers: [] }}
//         pointBorderWidth={2}
//         pointBorderColor="#ffffff"
//         pointLabelYOffset={-12}
//         enableArea={true}
//         areaBlendMode="color-burn"
//         areaOpacity={0}
//         useMesh={true}
//         legends={[
//             {
//                 anchor: 'bottom-right',
//                 direction: 'column',
//                 justify: false,
//                 translateX: 87,
//                 translateY: 2,
//                 itemsSpacing: 0,
//                 itemTextColor: 'white',
//                 itemDirection: 'left-to-right',
//                 itemWidth: 81,
//                 itemHeight: 21,
//                 itemOpacity: 0.75,
//                 symbolSize: 12,
//                 symbolShape: 'circle',
//                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                 effects: [
//                     {
//                         on: 'hover',
//                         style: {
//                             itemBackground: 'rgba(0, 0, 0, .03)',
//                             itemOpacity: 1,
//                             itemTextColor: 'white',
//                         }
//                     }
//                 ]
//             }
//         ]}
//         theme={customTheme}
//     />
//         </div>
//       </div>
//     </div>
//   );
// }
