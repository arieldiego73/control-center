import CreateUser from "../components/user/add/CreateUser";
import NavigationHandler from "./NavigationHandler";

export default function CreateUserHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
        <NavigationHandler/> 
         <CreateUser />
    </div>
        
        
       
    )

}


