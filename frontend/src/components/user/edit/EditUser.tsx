import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserDetailStyle from "./EditUser.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormLabel,
	InputAdornment,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/saga/userSaga";
import { RootState } from "../../../redux/store/store";
import HelpIcon from "@mui/icons-material/Help";
import { getDepartmentsFetch } from "../../../redux/state/departmentState";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//for breadcrumbs
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

export default function EditUser() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const userId = location.state;

	React.useEffect(() => {
		dispatch(getUserInfo({ userId }));
	}, [dispatch, userId]);

	React.useEffect(() => {
		dispatch(getDepartmentsFetch());
	}, [dispatch]);

	// get the stored state of the user
	let userData: any | null = useSelector(
		(state: RootState) => state.userReducer.userInfo
	);

	React.useEffect(() => {
		if (userId === userData.emp_id) {
			setAssocID(userData.emp_id);
			setUsername(userData.username);
			setFirstName(userData.fname);
			setMiddleName(userData.mname);
			setLastName(userData.lname);
			setPosition(userData.position_name);
			setEmail(userData.email);
			setRole(userData.title);
			setBusinessUnit(userData.section_name);
			setDepartment(userData.dept_name);
		}
	}, [userData, userId]);

	const [assocID, setAssocID] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [businessUnit, setBusinessUnit] = useState("");
	const [department, setDepartment] = useState("");

	const [ask, setAsk] = React.useState(false);
	const [dialogTitle, setDialogTitle] = React.useState("");
	const [dialogContentText, setDialogContentText] = React.useState("");
	const [isSaving, setIsSaving] = React.useState(false);

	// const breadcrumbItems = [
	// 	{ label: "Users", href: "/user" },
	// 	{ label: "Edit user details", href: "/editUser" },
	// ];

	//FOR DROPDOWN CONFIG (DEPARTMENT)
	const depts = useSelector(
		(state: RootState) => state.deptReducer.departments
	);

	const proceedWithCancel = () => {
		userData = null;
		navigate("/user");
	};

	const proceedWithSaving = () => {
		userData = null;
		navigate("/user");
	};

	const handleSave = () => {
		setAsk(true);
		setDialogTitle("Save the record?");
		setDialogContentText(
			"Upon proceeding, the modifications made will be saved."
		);
		setIsSaving(true);
	};

	const handleCancel = () => {
		setAsk(true);
		setDialogTitle("Cancel the edit?");
		setDialogContentText("");
		setIsSaving(false);
	};

  return (
	<div className={UserDetailStyle.body}>
      <div className={UserDetailStyle.mainContainer}>
        <div className={UserDetailStyle.heading}>
          <FontAwesomeIcon icon={faUser} size="2x" color="black" />
          <div className={UserDetailStyle.textContainer}>
            <span style={{ fontSize: "4vh", color: "black" }}>
              {" "}
              Edit User Details{" "}
            </span>
          </div>
        </div>
        <div className={UserDetailStyle.breadCrumbs}>
        {/* for breadcrumbs */}
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link
              to="/User"
              className={`${UserDetailStyle["custom-link"]}`}
              style={{ color: "inherit" }}
            >
              User
            </Link>
            <Link
              to="/CreateUser"
              className={`${UserDetailStyle["custom-link"]}`}
              style={{ color: "inherit" }}
            >
              Create User
            </Link>

            {/* Other breadcrumb links */}
          </Breadcrumbs>
        </div>

			<div className={UserDetailStyle.contentContainer}>
				<div className={UserDetailStyle.mainForm}>
					<div className={UserDetailStyle.formRow1}>
						<FormControl className={UserDetailStyle.formUsername}>
							<FormLabel>Username</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Username"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentityOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={username} // Bind value to state
								onChange={(e) => setUsername(e.target.value)} // Update state on change
							/>
						</FormControl>
					</div>

					<div className={UserDetailStyle.formRow2}>
						<FormControl className={UserDetailStyle.assocId}>
							<FormLabel>Associate ID</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Associate ID"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AssignmentIndOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={assocID} // Bind value to state
								onChange={(e) => setAssocID(e.target.value)} // Update state on change
							/>
						</FormControl>
						<FormControl className={UserDetailStyle.position}>
							<FormLabel>Position</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentityOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={position} // Bind value to state
								onChange={(e) => setPosition(e.target.value)} // Update state on change
							/>
						</FormControl>
					</div>
					<div className={UserDetailStyle.formRow3}>
						<FormControl className={UserDetailStyle.fname}>
							<FormLabel>First Name</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="First Name"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentityOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={firstName} // Bind value to state
								onChange={(e) => setFirstName(e.target.value)} // Update state on change
							/>
						</FormControl>
						<FormControl className={UserDetailStyle.mname}>
							<FormLabel>Middle Name</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Middle Name"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentityOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={middleName} // Bind value to state
								onChange={(e) => setMiddleName(e.target.value)} // Update state on change
							/>
						</FormControl>
						<FormControl className={UserDetailStyle.lname}>
							<FormLabel>Last Name</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Last Name"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentityOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={lastName} // Bind value to state
								onChange={(e) => setLastName(e.target.value)} // Update state on change
							/>
						</FormControl>
					</div>
					<div className={UserDetailStyle.formRow4}>
						<FormControl className={UserDetailStyle.email}>
							<FormLabel>Email</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Email"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<EmailOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={email} // Bind value to state
								onChange={(e) => setEmail(e.target.value)} // Update state on change
							/>
						</FormControl>
					</div>
					<div className={UserDetailStyle.formRow5}>
						<FormControl className={UserDetailStyle.role}>
							<FormLabel>Role</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Role"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentityOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={role}
								onChange={(e) => setRole(e.target.value)}
							/>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							startIcon={<Add />}
							style={{ textTransform: "none" }}
						>
							Add Role
						</Button>
					</div>
					<div className={UserDetailStyle.formRow6}>
						<FormControl className={UserDetailStyle.email}>
							<FormLabel>Business Unit</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Business Unit"
								className={UserDetailStyle.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<GroupsOutlinedIcon />
										</InputAdornment>
									),
								}}
								value={businessUnit} // Bind value to state
								onChange={(e) =>
									setBusinessUnit(e.target.value)
								} // Update state on change
							/>
						</FormControl>
						<Box>
							<div className={UserDetailStyle.department}>
								<FormControl variant="outlined" size="small">
									<FormLabel>Department</FormLabel>
									{/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={department} // Bind value to state
										onChange={(e) =>
											setDepartment(e.target.value)
										}
										className={UserDetailStyle.textField}
										startAdornment={
											<InputAdornment position="start">
												<GroupsOutlinedIcon />
											</InputAdornment>
										}
									>
										{depts.map((dept) => (
											<MenuItem value={dept.dept_name}>
												{dept.dept_name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</Box>
					</div>
					<div className={UserDetailStyle.formRow7}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<SaveOutlinedIcon />}
							style={{ textTransform: "none" }}
							onClick={handleSave}
						>
							SAVE
						</Button>
						<Button
							variant="contained"
							startIcon={<CancelOutlinedIcon />}
							style={{
								textTransform: "none",
								backgroundColor: "gray",
							}}
							onClick={handleCancel}
						>
							CANCEL
						</Button>
					</div>
				</div>
			</div>

			<Dialog
				open={ask}
				onClose={() => {
					setAsk(false);
				}}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<Typography
						fontFamily={"Montserrat, san-serif"}
						fontWeight={700}
						fontSize={24}
						display={"flex"}
						alignItems={"center"}
						gap={1}
					>
						<HelpIcon
							accentHeight={100}
							color="error"
							fontSize="large"
							alignmentBaseline="middle"
						/>
						{dialogTitle}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						fontFamily={"Montserrat, san-serif"}
						whiteSpace={"pre-line"}
					>
						{dialogContentText}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={
							isSaving ? proceedWithSaving : proceedWithCancel
						}
						autoFocus
						sx={{ fontFamily: "Montserrat, san-serif" }}
					>
						{isSaving ? "Save" : "Cancel"}
					</Button>

					<Button
						sx={{ fontFamily: "Montserrat, san-serif" }}
						onClick={() => {
							setAsk(false);
						}}
					>
						Continue editing
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	</div>
	);
}
