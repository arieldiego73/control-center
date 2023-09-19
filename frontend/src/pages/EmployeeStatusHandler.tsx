import EmployeeStatus from "../components/employee_status/EmployeeStatus";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function EmployeeStatusHandler() {
	
	const pageTitle = "EMPLOYEE STATUS";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Employee Status", to: "/employeestatus" },
	];

	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
				<EmployeeStatus />
		</div>
	);
}
