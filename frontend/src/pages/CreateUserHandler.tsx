import CreateUser from "../components/user/add/CreateUser";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function CreateUserHandler (){
    const pageTitle = "CREATE USER";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "User", to: "/user" },
        { label: "Create User", to: "/user/create-user" },

	];
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
         <CreateUser />
    </div>
        
        
       
    )

}


