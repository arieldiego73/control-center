import NavigationHandler from "./NavigationHandler";
import Userpage from "../components/user/Userpage";

export default function Userhandler() {
	return (
		 <div style={{display: 'flex', flexDirection:'column'}}>
            <NavigationHandler/> 
             <Userpage/>
        </div>
        
		// <div style={{ flexDirection: "column", display: "flex" }}>
		// 	<div
		// 		style={{
		// 			position: "absolute",
		// 			paddingTop: "8%",
		// 			width: "90%",
		// 			paddingLeft: "5%",
		// 			paddingRight: "5%",
		// 		}}    
		// 	>
		// 		<Userpage />
		// 	</div>

		// 	<Sidenav />
		// </div>
	);
}
