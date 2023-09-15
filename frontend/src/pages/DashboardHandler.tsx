import { Dashboard } from "../components/dashboard/Dashboard";
import NavigationHandler from "./NavigationHandler";
export default function DashboardHandler (){
    return(
        <div style={{display: 'flex', flexDirection:'column'}}>
            <NavigationHandler/> 
            <Dashboard/>
        </div>
        
       
    )

}
   