import ProjectStatus from "../components/project_status/ProjectStatus";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function ProjectStatusHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			<div>
				<Sidenav />
			</div>
			<div
				style={{
					position: "absolute",
					paddingTop: "8%",
					width: "90%",
					paddingLeft: "5%",
					paddingRight: "5%",
				}}
			>
				<ProjectStatus />
			</div>
		</div>
	);
}
