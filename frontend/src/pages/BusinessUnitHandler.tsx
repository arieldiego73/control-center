import BusinessUnit from "../components/business_unit/BusinessUnit";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function BusinessUnitHandler() {
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
				<BusinessUnit />
			</div>
		</div>
	);
}
