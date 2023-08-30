import { Dashboard } from "../components/dashboard/Dashboard";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function DashboardHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
            <div>
                <Sidenav/> 
            </div>
            <div>
                <Dashboard/>
            </div>
        </div>
        
       
    )

}
