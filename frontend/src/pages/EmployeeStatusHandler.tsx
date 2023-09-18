import EmployeeStatus from "../components/employee_status/EmployeeStatus";
import NavigationHandler from "./NavigationHandler";

export default function EmployeeStatusHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<EmployeeStatus />
		</div>
	);
}
