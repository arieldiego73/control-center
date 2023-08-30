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
					<div style={{flexDirection:'row', display:'flex',}}>
						<div>
							
							{/* dito lalaga graph 1 */}
						</div>
						<div>
							{/* dito lalaga graph 2 */}
						</div>
					</div>
					
					<div>
					<ActivityLogDashboardTable/>
					</div>
					{/* <div className={DashboardStyle.tableContainer}> */}
						
					
					{/* </div>
				 */}

				</div>
			</div>
	
	   
	 
	 
   
		  
		</div>
	);
};
