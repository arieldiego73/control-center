import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logo from "../../Assets/logo (blue).png";
import bg from "../../Assets/bg4.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../redux/saga/sessionSaga";
import { makeStyles } from "@material-ui/core";
import {
	Container,
	FormHelperText,
	InputAdornment,
	InputAdornmentProps,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { AlternateEmail, Error, Key } from "@mui/icons-material";

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
		border: "1px solid rgba(100, 100, 111, 0.2)",
	},
	logo: {
		width: "90%",
		marginBottom: "30px",
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
	const [isValid, setIsValid] = useState(true);
	const [errorIcon, setErrorIcon] = useState<JSX.Element>();
	const [helperText, setHelperText] = useState("");

	const navigate = useNavigate();

	/* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
	const loggedUser = useSelector((state: RootState) => {
		return state.sessionReducer.user;
	});

	/* VALIDATE IF A USER IS LOGGED IN */
	useEffect(() => {
		if (loggedUser !== null) {
			navigate("/dashboard");
		}
	});

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		if (username && password) {
			dispatch(login({ username, password }));
			if (loggedUser === null) {
				setHelperText("Incorrect username or password.");
				setPassword("");
				setIsValid(false);
				setErrorIcon(
					<InputAdornment position="end">
						<Error sx={{ color: "red" }} />
					</InputAdornment>
				);
			}
		} else {
			setIsValid(false);
			setHelperText("Both fields are required");
			setErrorIcon(
				<InputAdornment position="end">
					<Error sx={{ color: "red" }} />
				</InputAdornment>
			);
		}
	};

	return (
		<Container className={classes.background}>
			<Box className={classes.loginCard}>
				{/* Container of logo */}
				<Box component="img" src={logo} className={classes.logo}></Box>
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
						required
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
						style={{ textAlign: "center" }}
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
