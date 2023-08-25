import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { Sidenav } from "../sidenav/Sidenav";

export const Dashboard = () => {
	const navigate = useNavigate();

	/* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
	const loggedUser = useSelector((state: RootState) => {
		return state.sessionReducer.user;
	});

	/* VALIDATE IF A USER IS LOGGED IN */
	// useEffect(() => {
	// 	if (loggedUser === null) {
	// 		navigate("/");
	// 	}
	// });

	return (
		<div>
			<Sidenav />
			<center>
				<h1>Hello, {loggedUser?.username}</h1>
			</center>
		</div>
	);
};
