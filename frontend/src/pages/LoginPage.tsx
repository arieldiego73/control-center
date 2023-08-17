// import React, { useEffect } from "react";
import LoginBox from "../components/LoginBox";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { getUsersFetch } from "../redux/state/userState";
// import { RootState } from "../redux/store/store";

const LoginPage = () => {
	// const users = useSelector((state: RootState) => state.userReducer.users);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getUsersFetch());
	// }, [dispatch]);

	// console.log(users);

	return (
		<div>
			<LoginBox />
		</div>
	);
};

export default LoginPage;
