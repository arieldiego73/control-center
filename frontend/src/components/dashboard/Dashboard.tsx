import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const navigate = useNavigate();

	/* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
	const loggedUser = useSelector((state: RootState) => {
		return state.sessionReducer.user;
	});

	/* VALIDATE IF A USER IS LOGGED IN */
	useEffect(() => {
		if (loggedUser === null) {
			navigate("/");
		}
	});

	return <div>HELLO</div>;
};
