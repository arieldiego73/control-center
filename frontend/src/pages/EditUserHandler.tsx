import EditUser from "../components/user/edit/EditUser";
import NavigationHandler from "./NavigationHandler";

export default function EditUserHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
        <NavigationHandler/> 
         <EditUser/>
    </div>
        
       
    )

}
