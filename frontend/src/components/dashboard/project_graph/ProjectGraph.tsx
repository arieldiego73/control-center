import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProjGraphStyle from "./ProjectGraph.module.css";
import { Divider } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";


const data = [
	{
		id: "Ongoing",
		label: "Ongoing",
		value: 250,
		color: "hsl(29, 70%, 50%)",
	},
	{
		id: "Close",
		label: "Close",
		value: 345,
		color: "hsl(61, 70%, 50%)",
	},
	{
		id: "Cancelled",
		label: "Cancelled",
		value: 486,
		color: "hsl(56, 70%, 50%)",
	},
	{
		id: "Pending",
		label: "Cancelled",
		value: 400,
		color: "hsl(56, 70%, 50%)",
	},
	{
		id: "Finished",
		label: "Cancelled",
		value: 185,
		color: "hsl(56, 70%, 50%)",
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

export default function ProjectGraph() {
	return (
		<div className={ProjGraphStyle.ProjGraphContainer}>
			<div className={ProjGraphStyle.projGraphHolder}>
				{/* Main Container */}
				<div className={ProjGraphStyle.card}>
					<div className={ProjGraphStyle.textHolder}>
						{/* Text Title */}
						<text className={ProjGraphStyle.textTitle}>
							{" "}
							PROJECT STATUS{" "}
						</text>
						<text className={ProjGraphStyle.textSubtitle}>
						January 1
						</text>


					
					</div>
				</div>

				{/* Graph */}
				<div className={ProjGraphStyle.graphContainer}>
					<ResponsivePie
						data={data}
						margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
						padAngle={1}
						activeOuterRadiusOffset={3}
						colors={{ scheme: "paired" }}
						borderWidth={4}
						borderColor={{ theme: "background" }}
						arcLinkLabelsSkipAngle={1}
						arcLinkLabelsTextOffset={8}
						arcLinkLabelsTextColor="#ffffff"
						arcLinkLabelsOffset={-16}
						arcLinkLabelsDiagonalLength={18}
						arcLinkLabelsStraightLength={9}
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
											itemBackground:
												"rgba(0, 0, 0, .03)",
											itemOpacity: 1,
											itemTextColor: "white",
										},
									},
								],
							},
						]}
						theme={customTheme} // Apply the custom theme
					/>
				</div>
			</div>
		</div>
	);
}
