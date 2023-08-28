import { Sidenav } from "../components/sidenav/Sidenav";
import NewProj from "../components/project/new_project/NewProj";

export default function NewProjHandler() {
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
				<NewProj />
			</div>

			<Sidenav />
		</div>
	);
}
