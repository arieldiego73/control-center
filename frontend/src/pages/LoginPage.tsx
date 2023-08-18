
import React, { useEffect } from "react";
import LoginBox from "../components/login/LoginBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsersFetch } from "../redux/state/userState";
import { RootState } from "../redux/store/store";
import LoginBox from "../components/login/LoginBox";


const LoginPage = () => {

	return (
		<div>
			<LoginBox />
		</div>
	);
};

export default LoginPage;
