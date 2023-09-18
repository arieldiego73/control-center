import EmployeePosition from "../components/employee_position/EmployeePosition";
import NavigationHandler from "./NavigationHandler";

export default function EmployeePositionHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<EmployeePosition />
		</div>
	);
}
