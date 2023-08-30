import DevelopmentPhase from "../components/development_phase/DevelopmentPhase";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function DevelopmentPhaseHandler() {
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
				<DevelopmentPhase />
			</div>
		</div>
	);
}
