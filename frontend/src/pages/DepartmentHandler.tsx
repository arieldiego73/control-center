import Department from "../components/department/Department";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function DepartmentHandler() {
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
				<Department />
			</div>
		</div>
	);
}