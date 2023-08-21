import { useNavigate } from "react-router-dom";
import LoginBox from "../components/login/LoginBox";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { getUsersFetch } from "../redux/state/userState";
// import { RootState } from "../redux/store/store";

const LoginPage = () => {
	/* DON'T DELETE THESE COMMENTS */
	// const users = useSelector((state: RootState) => state.userReducer.users);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getUsersFetch());
	// }, [dispatch]);

	const navigate = useNavigate();

	/* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
	const loggedUser = useSelector((state: RootState) => {
		return state.sessionReducer.user;
	});

	/* VALIDATE IF A USER IS LOGGED IN */
	useEffect(() => {
		if (loggedUser === null) {
			console.log("NO USER IS LOGGED IN!");
		} else {
			console.log(loggedUser);
			console.log(loggedUser, "IS LOGGED IN!");
			navigate("/dashboard");
		}
	});

	return (
		<div>
			<LoginBox />
		</div>
	);
};

export default LoginPage;
