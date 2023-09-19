import DevelopmentType from "../components/development_type/DevelopmentType";
import NavigationHandler from "./NavigationHandler";

export default function DevelopmentTypeHandler (){
    return(
        <div style={{ flexDirection: "column", display: "flex" }}>
		
        <NavigationHandler/> 
         <DevelopmentType/>
  
		</div>
        
       
    )

}