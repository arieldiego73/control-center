import { Dashboard } from "../components/dashboard/Dashboard";
import { Sidenav } from "../components/sidenav/Sidenav";

export default function DashboardHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
           
                <Sidenav/> 
         
       
                <Dashboard/>
          
        </div>
        
       
    )

}
