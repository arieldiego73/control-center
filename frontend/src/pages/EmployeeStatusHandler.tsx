import EmployeeStatus from "../components/employee_status/EmployeeStatus";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function EmployeeStatusHandler() {
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
				<EmployeeStatus />
			</div>
		</div>
	);
}
