import { ResponsiveBar } from "@nivo/bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmpStatGraphStyle from "./EmployeeStatusGraph.module.css";
import { Divider } from "@mui/material";

const data = [
  {
    employee: "Regular",
    status: 50,
  },
  {
    employee: "Trainee",
    status: 26,
  },
  {
    employee: "Intern",
    status: 2,
  },
  {
    employee: "Business Partner",
    status: 20,
  },
];

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
        <div className={EmpStatGraphStyle.graphContainer}>
          <ResponsiveBar
            data={data}
            keys={["status"]}
            indexBy="employee"
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
