import Technology from "../components/technology/Technology";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function TechnologyHandler() {
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
				<Technology />
			</div>
		</div>
	);
}
