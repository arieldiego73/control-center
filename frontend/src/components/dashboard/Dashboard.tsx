import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import DashboardStyle from './Dashboard.module.css'
import ActivityLogDashboardTable from "./ActivityLogDashboardTable";
import MembersTable from "../project/MembersTable";
import ProjectGraph from "./project_graph/ProjectGraph";
import UserGraph  from "./user_graph/UserGraph";

export const Dashboard = () => {
	// const navigate = useNavigate();

	/* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
	// const loggedUser = useSelector((state: RootState) => {
	// 	return state.sessionReducer.user;
	// });

	/* VALIDATE IF A USER IS LOGGED IN */
	// useEffect(() => {
	// 	if (loggedUser === null) {
	// 		navigate("/");
	// 	}
	// });

	return (
		<div className={DashboardStyle.mainContainer}>
			<div className={DashboardStyle.contentContainer}>
				<div className={DashboardStyle.contentHolder}>
				
			
							<div style={{flexDirection:'row', display:'flex', justifyContent:'center', alignItems:'center'}}>
								<ProjectGraph/>
								<UserGraph	/>
								<ProjectGraph/>
							</div>
							
			
						
				
					<ActivityLogDashboardTable/>
					
				</div>
			</div>
	
	   
	 
	 
   
		  
		</div>
	);
};
