import Logo from "../../Assets/Logo1.png";
import User from '../../Assets/userImage.png'
import { Sidenav } from "../components/sidenav/Sidenav";
import Userpage from "../components/user/Userpage";

export default function Userhandler (){
    return(
        <div style={{flexDirection:'column', display: 'flex'}}>
            <div>
                <Sidenav/>
            </div>
            <div style={{position: 'absolute', paddingTop: '8%', width: '90%', paddingLeft: '5%', paddingRight: '5%'}}>
                <Userpage/>
            </div>
          
          
           
        </div>
        
       
    )

}
