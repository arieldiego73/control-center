import Technology from "../components/technology/Technology";
import NavigationHandler from "./NavigationHandler";

export default function TechnologyHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<Technology />
		</div>
	);
}
