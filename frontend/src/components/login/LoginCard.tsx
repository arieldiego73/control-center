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
import AnimatedSvg from "../../Assets/backgrounds/animatedSvg.svg";
import SplatterSvg from "../../Assets/backgrounds/depth6.jpg";
import "./LoginCardStyle.css";


export default function LoginCard() {
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
        <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="mainLoginCard">
                <div style={{  display: "flex", alignItems: "center", justifyContent: "center", marginTop:"30px" }}>
                    <img src={logo} alt="" height="90px" width="80%" />
                </div>
                <div style={{  display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center" , gap:"20px", marginTop:"40px"}}>
				<Box
						component="form"
						noValidate
						onSubmit={handleLogin}
						style={{
							display:"flex",
							flexDirection:"column",
							alignItems:"center",
							justifyContent:"center",
							width:"80%",
							gap:"20px"
							}}
>
						<TextField
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
							sx={{width:"80%"}}
						/>
						<TextField
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
							sx={{width:"80%"}}
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
							variant="contained"
							sx={{
								// mt: 3,
								// mb: 2,
								fontWeight: 700,
								width:"80%"
							}}
						>
							LOG IN
						</Button>
					</Box>
                </div>

                {/* <div style={{  display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontWeight: 700,
                            width: "40%",
                        }}
                    >
                        LOG IN
                    </Button>
                </div> */}

            </div>
        </div>
    );
}