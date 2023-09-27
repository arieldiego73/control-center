import DevelopmentType from "../components/development_type/DevelopmentType";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';

export default function DevelopmentTypeHandler (){
    const pageTitle = "DEVELOPMENT TYPE";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, 
		{ label: "Development Type", to: "/development-type" },
	];
    
    return(
        <div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
		
        <NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> 
         <DevelopmentType/>
  
		</div>
        
       
    )

}