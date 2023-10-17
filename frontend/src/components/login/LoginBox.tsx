import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logo from "../../Assets/logo (blue).png";
import bg from "../../Assets/bg4.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../redux/saga/sessionSaga";
import { Card, makeStyles } from "@material-ui/core";
import { FormHelperText, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { Error, Info } from "@mui/icons-material";
import React from "react";

const userStyle = makeStyles({
	background: {
		height: "100vh",
		width: "100vw",
		display: "flex !important",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `url(${bg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		//media query
		"@media (max-width: 468px)": {
			backgroundImage: "none",
		},
	},
	loginCard: {
		display: "flex",
		//borderRadius: "20px",
		flexDirection: "column",
		alignItems: "center",
		//boxShadow: "rgba(166, 223, 255, 0.5) 0px 7px 29px 0px"
		//boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
		height: "350px",
		width: "250px",
		padding: "50px",
		backgroundColor: "#fff",
		margin: "auto",
		//media query
		"@media (max-width: 380px)": {
			//border: "1px solid red",
			alignItems: "center",
			height: "350px",
			minWidth: "200px",
			backgroundColor: "#fff",
			margin: "auto 50px",
		},
	},
	logo: {
		width: "250px",
		marginBottom: "30px",
		//media query
		"@media (max-width: 380px)": {
			width: "250px",
			marginBottom: "30px",
		},
	},
	loginForm: {
		//height: "320px",
		width: "300px",
		//media query
		"@media (max-width: 380px)": {
			width: "250px",
		},
	},
});
const LoginBox = () => {
	const classes = userStyle();
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [errorIcon, setErrorIcon] = useState<JSX.Element>();
	const [helperText, setHelperText] = useState("");

	const navigate = useNavigate();

	/* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
	const loggedUser = useSelector((state: RootState) => {
		return state.sessionReducer.user;
	});

	let isAuth = localStorage.getItem("isAuthenticated");

	/* THIS LINE IS USED TO FETCHED THE AUTHENTICATION STATUS */
	const isAuthenticated = useSelector((state: RootState) => {
		return state.sessionReducer.isAuthenticated;
	});

	React.useEffect(() => {
		// Remove this entire useEffect block
	  }, []);

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(login({ username, password }));
	};

	// /* VALIDATE IF A USER IS LOGGED IN */
	// useEffect(() => {
	// 	if (loggedUser !== null) {
	// 		navigate("/dashboard");
	// 	}
	// });

	// const handleLogin = (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	if (username && password) {
	// 		dispatch(login({ username, password }));
	// 		if (loggedUser === null) {
	// 			setHelperText("Incorrect username or password.");
	// 			setPassword("");
	// 			setIsValid(false);
	// 			setErrorIcon(
	// 				<InputAdornment position="end">
	// 					<Error sx={{ color: "red" }} />
	// 				</InputAdornment>
	// 			);
	// 		}
	// 	} else {
	// 		setIsValid(false);
	// 		setHelperText("Both fields are required");
	// 		setErrorIcon(
	// 			<InputAdornment position="end">
	// 				<Error sx={{ color: "red" }} />
	// 			</InputAdornment>
	// 		);
	// 	}
	// };

	return (
		<Box component="div" className={classes.background}>
			<Card className={classes.loginCard}>
				{/* Container of logo */}
				<Box component="img" src={logo} className={classes.logo}></Box>
				{/* Container of username, pass, login btn, about us */}
				<Box
					component="form"
					noValidate
					onSubmit={handleLogin}
					className={classes.loginForm}
				>
					<TextField
						margin="normal"
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={!isValid}
						InputProps={{
							endAdornment: errorIcon,
						}}
					/>
					<TextField
						margin="none"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={!isValid}
						InputProps={{
							endAdornment: errorIcon,
						}}
					/>
					<FormHelperText
						style={{
							textAlign: "center",
							fontSize: "13px",
						}}
						error={!isValid}
					>
						{helperText}
					</FormHelperText>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 3,
							mb: 2,
							fontWeight: 700,
						}}
					>
						LOG IN
					</Button>
					<Button
						fullWidth
						variant="text"
						disableTouchRipple
						size="small"
						onMouseOver={(e) => {
							e.currentTarget.style.backgroundColor =
								"transparent";
						}}
						sx={{
							mt: 3,
							mb: 2,
							color: "secondary",
						}}
						startIcon={<Info />}
					>
						About Us
					</Button>
				</Box>
			</Card>
		</Box>
	);
};

export default LoginBox;
