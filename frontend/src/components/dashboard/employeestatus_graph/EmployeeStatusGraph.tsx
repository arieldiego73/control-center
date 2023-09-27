import { ResponsiveBar } from "@nivo/bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmpStatGraphStyle from "./EmployeeStatusGraph.module.css";
import { Divider } from "@mui/material";
// import { Serie } from "@nivo/line";
// const data = [
//   {
//     year: "2020",
//     total: 59,
//   },
//   {
//     year: "2021",
//     total: 61,
//   },
//   {
//     year: "2022",
//     total: 2,
//   },
//   {
//     year: "2023", 
//     total: 78,
//   },
// ];

type Datum = {
  empStatus: string;
  [key: string]: number | string;
};


const data: Datum[] = [
  {
    empStatus: "2020",
    // "hot dog": 1,
    // "hot dogColor": "hsl(159, 70%, 50%)",
    Trainee: 58,
    // TraineeColor: "hsl(18, 70%, 50%)",
    Regular: 61,
    // RegularColor: "hsl(66, 70%, 50%)",
    Intern: 82,
    // InternColor: "hsl(11, 70%, 50%)",
    Partners: 175,
    // PartnersColor: "hsl(349, 70%, 50%)",
    // donut: 154,
    // donutColor: "hsl(137, 70%, 50%)"
  },
  {
    empStatus: "2021",
    // "hot dog": 188,
    // "hot dogColor": "hsl(279, 70%, 50%)",
    Trainee: 125,
    // TraineeColor: "hsl(83, 70%, 50%)",
    Regular: 103,
    // RegularColor: "hsl(187, 70%, 50%)",
    Intern: 114,
    // InternColor: "hsl(103, 70%, 50%)",
    Partners: 83,
    // PartnersColor: "hsl(51, 70%, 50%)",
    // donut: 49,
    // donutColor: "hsl(219, 70%, 50%)"
  },
  {
    empStatus: "2022",
    // "hot dog": 106,
    // "hot dogColor": "hsl(279, 70%, 50%)",
    Trainee: 87,
    // TraineeColor: "hsl(83, 70%, 50%)",
    Regular: 91,
    // RegularColor: "hsl(187, 70%, 50%)",
    Intern: 12,
    // InternColor: "hsl(103, 70%, 50%)",
    Partners: 5,
    // PartnersColor: "hsl(51, 70%, 50%)",
    // donut: 22,
    // donutColor: "hsl(219, 70%, 50%)"
  },
  {
    empStatus: "2023",
    // "hot dog": 135,
    // "hot dogColor": "hsl(279, 70%, 50%)",
    Trainee: 73,
    // TraineeColor: "hsl(83, 70%, 50%)",
    Regular: 137,
    // RegularColor: "hsl(187, 70%, 50%)",
    Intern: 154,
    // InternColor: "hsl(103, 70%, 50%)",
    Partners: 73,
    // PartnersColor: "hsl(51, 70%, 50%)",
    // donut: 165,
    // donutColor: "hsl(219, 70%, 50%)"
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
  
export default function EmpStatusGraph() {
  return (
    <div className={EmpStatGraphStyle.EmpStatusGraphContainer}>
      <div className={EmpStatGraphStyle.empGraphHolder}>
        {/* Main Container */}
        <div className={EmpStatGraphStyle.card}>
          <div className={EmpStatGraphStyle.textHolder}>
            {/* Text Title */}
            <text className={EmpStatGraphStyle.textTitle}>
              {" "}
              EMPLOYEE STATUS{" "}
            </text>
            <text className={EmpStatGraphStyle.textSubtitle}>
              {" "}
              +15% increase than last month{" "}
            </text>

            <Divider style={{ padding: "1%" }} variant="middle" />

            {/* Information */}
            <div className={EmpStatGraphStyle.infoContainer}>
              <AccessTimeIcon
                style={{
                  color: " grey",
                  fontSize: "15px",
                  paddingRight: ".5%",
                }}
              />
              <text className={EmpStatGraphStyle.textInfo}>
                {" "}
                Updated 4 mins ago{" "}
              </text>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className={`${EmpStatGraphStyle.graphContainer} "legend-container"`}>

        

        <ResponsiveBar
          data={data}
          keys={[
            "Trainee",
            "Regular",
            "Intern",
            "Partners",
            // "donut",
          ]} 
          indexBy="empStatus"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
            // legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ theme: "background" }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 106,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 2,
              symbolSize: 20,
              itemDirection: "left-to-right",
              effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                        itemTextColor: 'white',
                    }
                }
            ]
            },
            
          ]}
          
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
          theme={customTheme} // Apply the custom theme
        />
      

        
        </div>
      </div>
    </div>
  );
}
