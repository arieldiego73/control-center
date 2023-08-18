import Logo from "../../Assets/Logo1.png";
import User from '../../Assets/userImage.png'

export default function TopNav (){
    return(
        <div style={{background:"linear-gradient(to bottom, #2a7ebb, #579ed1)", height: '90px'}}> 
            <div style={{  display:'flex', flexDirection:'row'}}>   

                <div>
                    <img alt="" style={{paddingBottom: '10px'}} src={Logo} width={280} height={100} />
                </div>
        
                <div style={{flexDirection:'row', display:'flex', paddingLeft: '72%', paddingTop: '1%'}}>
                    <div style={{flexDirection:'column', display:'flex',alignItems: 'center', }}> 
                        <text style={{color: 'white'}}> Username</text>
                        <text style={{color: 'white'}}> Design Engineer Trainee </text>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px'}}>
                        <img alt="" style={{ }} src={User} width={50} height={50} />
                    </div>
                </div>   
            </div>
           
          
        </div>

    );
}
