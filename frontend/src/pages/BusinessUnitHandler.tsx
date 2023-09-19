import BusinessUnit from "../components/business_unit/BusinessUnit";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function BusinessUnitHandler() {

	const pageTitle = "BUSINESS UNIT";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Business Unit", to: "/businessunit" },
	];

	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
				<BusinessUnit />
		</div>
	);
}
