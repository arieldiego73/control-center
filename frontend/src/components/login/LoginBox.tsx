
import Box from "@mui/material/Box";
import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import AnimatedSvg from "../../Assets/backgrounds/animatedSvg.svg";
import SplatterSvg from "../../Assets/backgrounds/depth6.jpg"
import LoginCard from "./LoginCard";

const userStyle = makeStyles({
	background: {
		height: "100vh",
		width: "100vw",
		display: "flex !important",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "white",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundImage: `url(${SplatterSvg})`,
		backgroundSize: "cover",
		// backgroundPosition: "center",
		backgroundRepeat: "no-repeat",

	},
	loginCard: {
		/* From https://css.glass */
		// background: "rgba(255, 255, 255, 0.06)",
		borderRadius: '16px',
		boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
		backdropFilter: 'blur(14px)',
		border: '1px solid rgba(255, 255, 255, 1)',
		display: "flex",
		//borderRadius: "20px",
		flexDirection: "column",
		alignItems: "center",
		//boxShadow: "rgba(166, 223, 255, 0.5) 0px 7px 29px 0px"
		//boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
		height: "50%",
		width: "40%",
		padding: "50px",
		backgroundColor: "#fff",
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

	return (
		<Box component="div" className={classes.background}>
			<div style={{height:"100%" , width:"50%",display:"flex", alignItems:"center", justifyContent:"center"}}>
				<div style={{ height: "80%", width: "80%", }}>
					<img src={AnimatedSvg} alt="" height="100%" width="100%" />
				</div>
			</div>
			<div style={{height:"100%" , width:"50%", display:"flex", alignItems:"center", justifyContent:"flex-start", }}>
				{/* <Card className={classes.loginCard}>
					
					<Box component="img" src={logo} className={classes.logo}></Box>
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
				</Card> */}
				<LoginCard />
			</div>

		</Box>
	);
};

export default LoginBox;
