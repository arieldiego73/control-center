import NavigationHandler from "./NavigationHandler";
import Project from "../components/project/Project";
import HomeIcon from '@mui/icons-material/Home';


export default function ProjectHandler() {
	
	const pageTitle = "PROJECTS";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Projects", to: "/projects" },
	];
	return (
		<div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
		<Project/>
	</div>
	);
}
