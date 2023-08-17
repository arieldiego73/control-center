import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
import logo from "../../Assets/Logo1.png";
import bg from "../../Assets/bg2.png";
//import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { login } from "../redux/saga/sessionSaga";
import { login } from "../../redux/saga/sessionSaga";
import { RootState } from "../../redux/store/store";

const LoginPage = () => {
	// const handleSubmit = (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget as HTMLFormElement);
	// 	console.log({
	// 		email: data.get("username"),
	// 		password: data.get("password"),
	// 	});
	// };

	useSelector((state: RootState) => {
		// console.log("Is logged in? =>", state.sessionReducer.user !== null);
		console.log("the logged user => ", state.sessionReducer.user);
	});

	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(login({ username, password }));
	};


	return (
		<Box
			component="main"
			maxWidth="lg"
			style={{
				minHeight: "100vh",
				minWidth: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
     			backgroundRepeat: "no-repeat",
			}}
		>
			{/* <Box sx={{ 
				width: "35%",
				border: "1px solid black"
				}}
				
			> */}
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
				{/* Login box with shadow*/}
				<Box
					// style={{
					// 	maxHeight: "300px",
					// 	paddingTop: "10%"
					// }}
					sx={{
						my: 10,
						mx: 4,
						p: 6,
						display: "flex",
						borderRadius: '20px',
						flexDirection: "column",
						alignItems: "center",
						//boxShadow: "rgba(166, 223, 255, 0.5) 0px 7px 29px 0px"
						boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
						height: "400px", 
						width: "15%",
						border: "1px solid red"
					}}
				>
					{/* Container of logo */}
					<Box
						component='img'
						src ={logo}
						sx={{ 
							height: "100px", 
							width: "90%",
							border: "1px solid blue",
							// '@media (width: 720px)': {
							// 	maxWidth: "50%",
							// },
							// '@media (width: 520px)': {
							// 	maxWidth: "50%",
							// }
						}}
					>
					</Box>
					{/* Container of username, pass, login btn, about us */}
					<Box
						component="form"
						noValidate
						// onSubmit={handleSubmit}
						onSubmit={handleLogin}
						sx={{ 
							mt: 1,
							height: "320px", 
							width: "120%",
							border: "1px solid pink"
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
								mb: 2
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
								e.currentTarget.style.backgroundColor = 'transparent';
							}}
							sx={{ 
								mt: "15%"
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

export default LoginPage;
