import CreateUser from "../components/user/add/CreateUser";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function CreateUserHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
            <div>
                <Sidenav/> 
            </div>
            <div>
                <CreateUser/>
            </div>
        </div>
        
       
    )

}
