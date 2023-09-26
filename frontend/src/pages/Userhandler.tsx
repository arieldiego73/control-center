import React from "react";
import NavigationHandler from "./NavigationHandler";
import Userpage from "../components/user/Userpage";
import HomeIcon from '@mui/icons-material/Home';


export default function Userhandler() {

  const pageTitle = "USERS";

  const breadcrumbs = [
    { icon: <HomeIcon style={{height:"20px", marginTop:"5px"}}/>,  to: "/dashboard"  }, // Example breadcrumb data
    { label: "Users", to: "/users" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
      <Userpage />
    </div>
  );
}
 

  
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