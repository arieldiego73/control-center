import EditProj from "../components/project/edit/EditProject";
import NavigationHandler from "./NavigationHandler";

export default function EditUserHandler (){
    return(
        <div style={{ flexDirection: "column", display: "flex" }}>
		
        <NavigationHandler/> 
         <EditProj/>
  
		</div>
        
       
    )

}