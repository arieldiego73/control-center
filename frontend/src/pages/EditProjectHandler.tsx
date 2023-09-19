import EditProj from "../components/project/edit/EditProject";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';
export default function EditUserHandler (){
    const pageTitle = "EDIT PROJECT";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Projects", to: "/project" },
		{ label: "Edit Project",  to: "project/editProject/:projectName" },
	];
    return(
        <div style={{ flexDirection: "column", display: "flex" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
 
         <EditProj/>
  
		</div>
        
       
    )

}