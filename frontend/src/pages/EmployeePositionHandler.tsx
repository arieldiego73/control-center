import EmployeePosition from "../components/employee_position/EmployeePosition";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';

export default function EmployeePositionHandler() {
	
	const pageTitle = "EMPLOYEE POSITION";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Employee Position", to: "/employee-position" },
	];
	return (
		<div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
				<EmployeePosition />
		</div>
	);
}
