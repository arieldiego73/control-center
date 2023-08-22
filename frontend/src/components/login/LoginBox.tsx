import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logo from "../../Assets/logo (blue).png";
import bg from "../../Assets/bg4.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/saga/sessionSaga";
import { makeStyles } from "@material-ui/core";
import { Checkbox, Container, FormControlLabel, Grid, Link, Typography } from "@mui/material";
// import { setUser } from "../../redux/state/sessionState";

const userStyle = makeStyles({
	background: {
		height: "100vh",
		minWidth: "100vw",
		display: "flex !important",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `url(${bg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		//border: "1px solid rgba(100, 100, 111, 0.2)"
	},
	loginCard: {
		display: "flex",
		//borderRadius: "20px",
		flexDirection: "column",
		alignItems: "center",
		//boxShadow: "rgba(166, 223, 255, 0.5) 0px 7px 29px 0px"
		//boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
		height: "400px",
		width: "20%",
		padding: "50px",
		backgroundColor: "#fff",
		margin: "auto",
		border: "1px solid rgba(100, 100, 111, 0.2)"
	},
	logo: {
		width: "90%",
		marginBottom: "30px"
		//border: "1px solid blue"
	},
	loginForm: {
		mt: 1,
		height: "320px",
		width: "100%",
		//border: "1px solid pink"
	},
});
const LoginBox = () => {
	const classes = userStyle();
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
		<Container
			className={classes.background}
		>
			<Box
				className={classes.loginCard}
			>
				{/* Container of logo */}
				<Box
					component="img"
					src={logo}
					className={classes.logo}
				></Box>
				{/* Container of username, pass, login btn, about us */}
				<Box
					component="form"
					noValidate
					onSubmit={handleLogin}
					className={classes.loginForm}
					sx={{ mt: 1 }}
				>
					<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={username}
						onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin="normal"
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
						fullWidth
						variant="text"
						disableTouchRipple
						onMouseOver={(e) => {
							e.currentTarget.style.backgroundColor =
								"transparent";
						}}
						sx={{ mt: 3, mb: 2 }}
					>
						About Us
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginBox;
