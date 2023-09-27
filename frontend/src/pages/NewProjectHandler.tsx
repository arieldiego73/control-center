import NavigationHandler from "./NavigationHandler";
import NewProj from "../components/project/new_project/NewProj";
import HomeIcon from '@mui/icons-material/Home';

export default function NewProjHandler() {
	const pageTitle = "NEW PROJECT";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Projects", to: "/projects" },
		{ label: "New Project",  to: "/project/add-new-project" },
	];
	return (
		<div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
			
        <NavigationHandler  pageTitle={pageTitle} breadcrumbs={breadcrumbs}/> 
         <NewProj/>
  
		</div>
	);
}
