import React from "react";
import Logo from "../../Assets/Logo1.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TopNav (){
    return(
        <div style={{background:"linear-gradient(to bottom, #2a7ebb, #579ed1)", height: '90px'}}> 
            <div style={{  display:'flex', flexDirection:'row'}}>   

                <div>
                    <img alt="" style={{paddingBottom: '10px'}} src={Logo} width={280} height={100} />
                </div>
        
                <div style={{flexDirection:'column', display:'flex', position: 'absolute', right: '30px'}}>
                    <div style={{flexDirection:'row', display:'flex',}}>
                        <div style={{flexDirection:'column', display:'flex',alignItems: 'center', paddingTop: '25px' }}> 
                            <text style={{color:"white"}}> Username</text>
                            <text style={{color:"white"}}> Design Engineer Trainee </text>
                        </div>

                        <div  style={{alignItems: 'center', paddingTop: '7%'}}>
                            <AccountCircleIcon style={{ fontSize: 60, color: 'white' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


 /* <img alt="" style={{ paddingBottom: '10px', paddingLeft: '70%'}} src={User} width={280} height={100} /> */