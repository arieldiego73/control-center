import ProjectStatus from "../components/project_status/ProjectStatus";
import { Sidenav } from "../components/sidenav/Sidenav";
import NavigationHandler from "./NavigationHandler";

export default function ProjectStatusHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<ProjectStatus />
		</div>
	);
}
