import Technology from "../components/technology/Technology";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function TechnologyHandler() {

	const pageTitle = "TECHNOLOGIES";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Technologies", to: "/technology" },
	];

	return (
		<div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
				<Technology />
		</div>
	);
}
