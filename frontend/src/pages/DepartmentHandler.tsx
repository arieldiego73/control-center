import Department from "../components/department/Department";
import NavigationHandler from "./NavigationHandler";

export default function DepartmentHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<Department />
		</div>
	);
}
