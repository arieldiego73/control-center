import EditUser from "../components/user/edit/EditUser";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function EditUserHandler (){
    const pageTitle = "EDIT USER";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "User", to: "/users" },
        { label: "Edit User", to: "/user/edit-user/row.username" },

	];
    return(
		<div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
         <EditUser/>
    </div>
        
       
    )

}
