import ProjGraphStyle from "./ProjectGraph.module.css";
import { MayHaveLabel, ResponsivePie } from "@nivo/pie";
import { GraphsData, ProjectStatus } from "../../../redux/state/graphState";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import CircularProgress from "@mui/material/CircularProgress";

function createData(id: string, label: string, value: number, color: String) {
  return {
    id,
    label,
    value,
    color,
  };
}

const customColor = ["#464d77", "#e2725b", "#f28500", "#800020"];
//pending - "#464d77",
//ongoing - "#e2725b",
//finished  - "#f28500",
//closed - "#800020"



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

interface ProjectGraphProps {
  graphData: GraphsData[];
}

const ProjectGraph: React.FC<ProjectGraphProps> = (props) => {
  const { graphData } = props;
  const [data, setData] = useState<MayHaveLabel[]>([]);

  const loadingState = useSelector(
    (state: RootState) => state.graphsData.isLoading
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
	const fetchData = async () => {
	try {
        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          
          setProgressValue(100);
        }
      } catch (error) {

	} finally {
        setIsLoading(false); 
      }
	};
	fetchData();
  }, []);


  useEffect(() => {
	setIsLoading(loadingState);
  }, [loadingState]);

useEffect(() => {
	if (graphData) {
	  graphData.map((data) =>
		setData(
		  data.project_status.map((projCount) =>
			createData(
			  projCount.status_name,
			  projCount.status_name,
			  projCount.total,
			  "dfd"
			)
		  )
		)
	  );
	}
  }, [graphData]);
  
  return (
    <div className={ProjGraphStyle.ProjGraphContainer}>
      <div className={ProjGraphStyle.projGraphHolder}>
        {/* Main Container */}
        <div className={ProjGraphStyle.card}>
          <div className={ProjGraphStyle.textHolder}>
            {/* Text Title */}
            <text className={ProjGraphStyle.textTitle}> PROJECT STATUS </text>
            <text className={ProjGraphStyle.textSubtitle}>January 1</text>
          </div>
        </div>

        {/* Graph */}
        <div className={ProjGraphStyle.graphContainer}>
		{isLoading && (
        <div
          style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
          }}
        >
          <CircularProgress color="primary" value={progressValue} />
        </div>
      )}
	
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            // padAngle={1}
            activeInnerRadiusOffset={50}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            colors={customColor}
            borderColor={{ theme: "background" }}
            arcLinkLabelsSkipAngle={1}
            arcLinkLabelsTextOffset={10}
            arcLinkLabelsTextColor="#ffffff"
            arcLinkLabelsOffset={-10}
            arcLinkLabelsDiagonalLength={20}
            arcLinkLabelsStraightLength={14}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color", modifiers: [] }}
            arcLabelsRadiusOffset={0.75}
            arcLabelsSkipAngle={5}
            arcLabelsTextColor="#ffffff"
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: -20,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "white",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                      itemTextColor: "white",
                    },
                  },
                ],
              },
            ]}
            theme={customTheme} 
          />
		 

	
        </div>
      </div>
    </div>
  );
};
export default ProjectGraph;
