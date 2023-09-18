import BusinessUnit from "../components/business_unit/BusinessUnit";
import NavigationHandler from "./NavigationHandler";

export default function BusinessUnitHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<BusinessUnit />
		</div>
	);
}
