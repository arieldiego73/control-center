import EditProject from "../components/project/edit/EditProject";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function EditUserHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
            <div>
                <Sidenav/> 
            </div>
            <div>
                <EditProject />
            </div>
        </div>
        
       
    )

}