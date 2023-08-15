import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const LoginPage = () => {
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		console.log({
			email: data.get("username"),
			password: data.get("password"),
		});
	};

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
			<Box sx={{ width: "100%" }}>
				{/* FOR BIG IMAGE ON THE LEFT */}
				<Grid container>
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={7}
						sx={{
							backgroundImage:
								"url(https://source.unsplash.com/random)",
							backgroundRepeat: "no-repeat",
							backgroundColor: (t) =>
								t.palette.mode === "light"
									? t.palette.grey[50]
									: t.palette.grey[900],
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					/>

					{/* FOR LOGIN */}
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						style={{
							boxShadow:
								"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
						}}
						square
					>
						<Box
							sx={{
								my: 10,
								mx: 4,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography component="h1" variant="h3">
								Welcome!
							</Typography>
							<Box
								component="form"
								noValidate
								onSubmit={handleSubmit}
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
								/>
								<FormControlLabel
									control={
										<Checkbox
											value="remember"
											color="primary"
										/>
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
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default LoginPage;
