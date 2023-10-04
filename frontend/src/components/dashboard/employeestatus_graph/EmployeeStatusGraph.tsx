// import { ResponsiveBar } from "@nivo/bar";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EmpStatGraphStyle from "./EmployeeStatusGraph.module.css";
// import { Backdrop, CircularProgress, Divider } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store/store";
// import React from "react";
// import { GraphsData, getGraphsDataFetch } from "../../../redux/state/graphState";

// type Datum = {
// 	[key: string]: number | string;
// };

// function createData(status_name: string, total: number): Datum {
//   return { empStatus: status_name, [status_name]: total }
// }

// const customTheme = {
// 	axis: {
// 		legend: {
// 			text: {
// 				fill: "white",
// 			},
// 		},
// 		ticks: {
// 			text: {
// 				fill: "white",
// 			},
// 		},
// 	},
// 	grid: {
// 		line: {
// 			stroke: "white",
// 		},
// 	},
// 	tooltip: {
// 		container: {
//       fontSize: "12px",
// 			background: "black",
// 			color: "white",
// 		},
// 	},
// 	labels: {
// 		text: {
// 			fill: "white",
// 		},
// 	},
// 	legends: {
// 		text: {
// 			fill: "white",
// 		},
// 	},
// };

// interface EmpStatusGraphProps {
//   graphData: GraphsData[];
// }

// const EmpStatusGraph: React.FC<EmpStatusGraphProps> = (props) => {
//   const { graphData } = props;
//   const [data, setData] = React.useState<Datum[]>()
//   const [keys, setKeys] = React.useState<string[]>([])

//   const loadingState = useSelector((state: RootState) => state.graphsData.isLoading)
//   const [isLoading, setIsLoading] = React.useState(false)
//   React.useEffect(() => {
//     setIsLoading(loadingState)
//   }, [loadingState])

//   React.useEffect(() => {
//     if (graphData) {
//       graphData.forEach((data) => {
//         setData(data.user_status.map((userStat) => createData(userStat.status_name, userStat.total)))
//         setKeys(data.user_status.map((userStat) => userStat.status_name))
//       })
//     }
//     console.log("graph data", graphData);
//   }, [graphData])

//   React.useEffect(() => {
//     console.log("data", data);
//   }, [data])

// 	return (
// 		<div className={EmpStatGraphStyle.EmpStatusGraphContainer}>
// 			<div className={EmpStatGraphStyle.empGraphHolder}>

// 				<div className={EmpStatGraphStyle.card}>
// 					<div className={EmpStatGraphStyle.textHolder}>

// 						<text className={EmpStatGraphStyle.textTitle}>
// 							{"EMPLOYEE STATUS"}
// 						</text>
// 						<text className={EmpStatGraphStyle.textSubtitle}>
// 							{"+15% increase than last month"}
// 						</text>

// 					</div>
// 				</div>

//         <div className={`${EmpStatGraphStyle.graphContainer} "legend-container"`}>

//         {
//           data ?
//           <ResponsiveBar
//             data={data as Datum[]}
//             keys={keys}
//             indexBy="empStatus"
//             margin={{ top: 30, right: 50, bottom: 80, left: 80 }}
//             padding={0.3}
//             innerPadding={2}
//             valueScale={{ type: "linear" }}
//             indexScale={{ type: "band", round: true }}
//             colors={{ scheme: "blues" }}
//             defs={[
//               {
//                 id: "dots",
//                 type: "patternDots",
//                 background: "inherit",
//                 color: "#38bcb2",
//                 size: 4,
//                 padding: 1,
//                 stagger: true,
//               },
//               {
//                 id: "lines",
//                 type: "patternLines",
//                 background: "inherit",
//                 color: "#eed312",
//                 rotation: -45,
//                 lineWidth: 6,
//                 spacing: 10,
//               },
//             ]}

//             borderColor="black"
//             axisTop={null}
//             axisRight={null}
//             axisBottom={{
//               tickSize: 5,
//               tickPadding: 5,
//               tickRotation: 0,
//               legend: "country",
//               legendPosition: "middle",
//               legendOffset: 50,
//             }}
//             axisLeft={{
//               tickSize: 5,
//               tickPadding: 5,
//               tickRotation: 0,
//               legend: "Monthly Data",
//               legendPosition: "middle",
//               legendOffset: -45,

//             }}
//             labelSkipWidth={12}
//             labelSkipHeight={12}
//             labelTextColor={{ theme: "background" }}

//             role="application"
//             ariaLabel="Nivo bar chart demo"
//             barAriaLabel={(e) =>
//               e.id + ": " + e.formattedValue + " in country: " + e.indexValue
//             }
//             theme={customTheme}
//           /> :
//           <p>No data</p>
//         }

//         </div>
//       </div>
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={isLoading}
//       >
//         <CircularProgress color="inherit"  />
//       </Backdrop>
//     </div>
//   );
// }

// export default EmpStatusGraph;

import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ResponsiveBar } from "@nivo/bar";
import EmpStatGraphStyle from "./EmployeeStatusGraph.module.css";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import { GraphsData } from "../../../redux/state/graphState";

type Datum = {
  [key: string]: number | string;
};

function createData(status_name: string, total: number): Datum {
  return { empStatus: status_name, [status_name]: total };
}

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
      fontSize: "12px",
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

interface EmpStatusGraphProps {
  graphData: GraphsData[];
}

const EmpStatusGraph: React.FC<EmpStatusGraphProps> = (props) => {
  const { graphData } = props;
  const [data, setData] = useState<Datum[]>();
  const [keys, setKeys] = useState<string[]>([]);

  const loadingState = useSelector(
    (state: RootState) => state.graphsData.isLoading
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        // Simulate an asynchronous task that takes 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Update progressValue when the task is complete
        setProgressValue(100);
        setIsLoading(false); 
      } catch (error) {
        // Handle errors
        setIsLoading(false);
      }
    };

    // Start the data fetching task
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

  useEffect(() => {
    if (graphData) {
      graphData.forEach((data) => {
        setData(
          data.user_status.map((userStat) =>
            createData(userStat.status_name, userStat.total)
          )
        );
        setKeys(data.user_status.map((userStat) => userStat.status_name));
      });
    }
  }, [graphData]);

  return (
    <div className={EmpStatGraphStyle.EmpStatusGraphContainer}>
      <div className={EmpStatGraphStyle.empGraphHolder}>
        {/* Main Container */}
        <div className={EmpStatGraphStyle.card}>
          <div className={EmpStatGraphStyle.textHolder}>
            {/* Text Title */}
            <text className={EmpStatGraphStyle.textTitle}>
              {"EMPLOYEE STATUS"}
            </text>
            <text className={EmpStatGraphStyle.textSubtitle}>
              {"+15% increase than last month"}
            </text>
          </div>
        </div>

        {/* Graph */}

        <div
          className={`${EmpStatGraphStyle.graphContainer} "legend-container"`}
        >
          {data ? (
            <ResponsiveBar
              data={data as Datum[]}
              keys={keys}
              indexBy="empStatus"
              margin={{ top: 30, right: 50, bottom: 80, left: 80 }}
              padding={0.3}
              innerPadding={2}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "blues" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              borderColor="black"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "country",
                legendPosition: "middle",
                legendOffset: 50,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Monthly Data",
                legendPosition: "middle",
                legendOffset: -45,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ theme: "background" }}
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={(e) =>
                e.id + ": " + e.formattedValue + " in country: " + e.indexValue
              }
              theme={customTheme} // Apply the custom theme
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress color="success" value={progressValue} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpStatusGraph;
