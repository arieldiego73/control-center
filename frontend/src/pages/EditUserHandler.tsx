import EditUser from "../components/user/edit/EditUser";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function EditUserHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
            <div>
                <Sidenav/> 
            </div>
            <div>
                <EditUser />
            </div>
        </div>
        
       
    )

}
