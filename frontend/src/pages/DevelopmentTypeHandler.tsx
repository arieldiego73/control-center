import DevelopmentType from "../components/development_type/DevelopmentType";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';

export default function DevelopmentTypeHandler (){
    const pageTitle = "DEVELOPMENT TYPE";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, 
		{ label: "Development Type", to: "/devType" },
	];
    
    return(
        <div style={{ flexDirection: "column", display: "flex" }}>
		
        <NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> 
         <DevelopmentType/>
  
		</div>
        
       
    )

}