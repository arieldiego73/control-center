import NavigationHandler from "./NavigationHandler";
import NewProj from "../components/project/new_project/NewProj";
import HomeIcon from '@mui/icons-material/Home';

export default function NewProjHandler() {
	const pageTitle = "NEW PROJECT";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Projects", to: "/project" },
		{ label: "New Project",  to: "project/newproj" },
	];
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			
        <NavigationHandler  pageTitle={pageTitle} breadcrumbs={breadcrumbs}/> 
         <NewProj/>
  
		</div>
	);
}
