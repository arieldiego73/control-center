import { Sidenav } from "../components/sidenav/Sidenav";
import Project from "../components/project/Project";

export default function ProjectHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			<div
				style={{
					position: "absolute",
					paddingTop: "8%",
					width: "90%",
					paddingLeft: "5%",
					paddingRight: "5%",
				}}
			>
				<Project />
			</div>

			<Sidenav />
		</div>
	);
}