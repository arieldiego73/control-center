import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logo from "../../Assets/Logo1.png";
import bg from "../../Assets/bg3.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/saga/sessionSaga";
import { RootState } from "../../redux/store/store";
import { makeStyles } from '@material-ui/core';
// import { setUser } from "../../redux/state/sessionState";

const userStyle = makeStyles ({
	background : {
		minHeight: "100vh",
		minWidth: "100vw",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `url(${bg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
			
	},
	loginCard : {
		my: 10,
		mx: 4,
		p: 6,
		display: "flex",
		//borderRadius: "20px",
		flexDirection: "column",
		alignItems: "center",
		//boxShadow: "rgba(166, 223, 255, 0.5) 0px 7px 29px 0px"
		//boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
		height: "400px",
		width: "20%",
		padding: "50px",
		border: "1px solid rgba(100, 100, 111, 0.2)"
	},
	logo : {
		height: "90px",
		width: "90%",
		//border: "1px solid blue"
	},
	loginForm : {
		mt: 1,
		height: "320px",
		width: "100%",
		//border: "1px solid pink"
	}

});
const LoginBox = () => {
	useSelector((state: RootState) => {
		// console.log("Is logged in? =>", state.sessionReducer.user !== null);
		console.log("the logged user => ", state.sessionReducer.user);
	});
	const classes = userStyle()
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		if (username && password) {
			dispatch(login({ username, password }));
		}
	};

	return (
		<Box
			component="main"
			maxWidth="lg"
			className={classes.background}
		>
			<Box
				className={classes.loginCard}
				// style={{
				// 	maxHeight: "300px",
				// 	paddingTop: "10%"
				// }}
				sx={{
					my: 10,
					mx: 4,
					p: 6,
					display: "flex",
					borderRadius: "20px",
					flexDirection: "column",
					alignItems: "center",
					//boxShadow: "rgba(166, 223, 255, 0.5) 0px 7px 29px 0px"
					boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
					height: "400px",
					width: "15%",
					// border: "1px solid red",
				}}
			>
				{/* Container of logo */}
				<Box
					component="img"
					src={logo}
					className={classes.logo}
					sx={{
						height: "100px",
						width: "90%",
						//border: "1px solid blue",
						// '@media (width: 720px)': {
						// 	maxWidth: "50%",
						// },
						// '@media (width: 520px)': {
						// 	maxWidth: "50%",
						// }
					}}
				></Box>
				{/* Container of username, pass, login btn, about us */}
				<Box
					component="form"
					noValidate
					// onSubmit={handleSubmit}
					onSubmit={handleLogin}
					className={classes.loginForm}
					sx={{
						mt: 1,
						height: "320px",
						width: "120%",
						//border: "1px solid pink",
					}}
				>
					<TextField
						margin="dense"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						margin="dense"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 3,
							mb: 2,
						}}
					>
						LOG IN
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="text"
						disableTouchRipple
						onMouseOver={(e) => {
							e.currentTarget.style.backgroundColor =
								"transparent";
						}}
						sx={{
							mt: "15%",
						}}
					>
						About Us
					</Button>
				</Box>
			</Box>
			{/* </Grid> */}
			{/* </Grid> */}
			{/* </Box> */}
		</Box>
	);
};

export default LoginBox;
