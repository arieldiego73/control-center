import Client from "../components/client_table/Client";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';

export default function ClientHandler (){
    const pageTitle = "CLIENT";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, 
		{ label: "Client", to: "/clients" },
	];
    
    return(
        <div style={{ flexDirection: "column", display: "flex" }}>
		
        <NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> 
         <Client />
  
		</div>
        
       
    )

}