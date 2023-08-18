import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { login } from "../redux/saga/sessionSaga";
import { login } from "../../redux/saga/sessionSaga";
import { RootState } from "../../redux/store/store";
// import { setUser } from "../../redux/state/sessionState";

const LoginPage = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		if (username && password) {
			dispatch(login({ username, password }));
		}
	};

	const loggedUser = useSelector((state: RootState) => {
		return state.sessionReducer.user;
	});

	/* VALIDATE IF A USER IS LOGGED IN */
	if (loggedUser?.username === null || loggedUser?.username === undefined) {
		console.log("NO USER IS LOGGED IN!");
	} else {
		console.log(loggedUser?.username, "IS LOGGED IN!");
	}
	console.log("the logged user => ", loggedUser?.username);

	return (
		<Container
			component="main"
			maxWidth="lg"
			style={{
				minHeight: "100vh",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box sx={{ width: "50%" }}>
				{/* <Grid
					container
					style={{ backgroundColor: "#f00", padding: "5rem" }}
				> */}
				{/* <CssBaseline /> */}

				{/* FOR LOGIN */}
				{/* <Grid
						item
						md={12}
						component={Paper}
						style={{
							boxShadow:
								"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
						}}
						square
					> */}
				<Box
					sx={{
						my: 10,
						mx: 4,
						p: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
					}}
				>
					<Typography
						component="h1"
						variant="h2"
						style={{ fontWeight: "700" }}
					>
						Welcome!
					</Typography>
					<Box
						component="form"
						noValidate
						// onSubmit={handleSubmit}
						onSubmit={handleLogin}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
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
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Log In
						</Button>
					</Box>
				</Box>
				{/* </Grid> */}
				{/* </Grid> */}
			</Box>
		</Container>
	);
};

export default LoginPage;
