import ProjectStatus from "../components/project_status/ProjectStatus";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function ProjectStatusHandler() {

	const pageTitle = "PROJECT STATUS";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Project Status", to: "/project-status" },
	];

	return (
		<div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
			<ProjectStatus />
		</div>
	);
}
