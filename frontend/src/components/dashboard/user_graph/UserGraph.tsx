import { ResponsiveBar } from "@nivo/bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserGraphStyle from "./UserGraph.module.css";
import { Divider } from "@mui/material";

const data = [
  {
    year: "2020",
    total: 59,
  },
  {
    year: "2021", 
    total: 61,
  },
  {
    year: "2022",
    total: 2,
  },
  {
    year: "2023",
    total: 78,
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
            <text  className={UserGraphStyle.textTitle}> USER STATUS </text>
            <text className={UserGraphStyle.textSubtitle}> +2% than last year </text>

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
            keys={["total"]}
            indexBy="year"
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
