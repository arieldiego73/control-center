import UserDetailStyle from "./EditUser.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
	Box,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormLabel,
	InputAdornment,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/saga/userSaga";
import { RootState } from "../../../redux/store/store";
import HelpIcon from "@mui/icons-material/Help";
import { getDepartmentFetch } from "../../../redux/state/departmentState";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//for breadcrumbs
import { getSectionFetch } from "../../../redux/state/sectionState";
import { getRolesFetch } from "../../../redux/state/roleState";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export default function EditUser() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const userId = location.state;

	const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
	const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
		const {
			target: { value },
		} = event;
		setSelectedRoles(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	React.useEffect(() => {
		dispatch(getUserInfo({ userId }));
	}, [dispatch, userId]);

	React.useEffect(() => {
		dispatch(getDepartmentFetch());
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(getSectionFetch());
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(getRolesFetch());
	}, [dispatch]);

	// get the stored state of the user
	let userData: any | null = useSelector(
		(state: RootState) => state.userReducer.userInfo
	);

	React.useEffect(() => {
		setAssocID(userData.emp_id);
		setUsername(userData.username);
		setFirstName(userData.fname);
		setMiddleName(userData.mname);
		setLastName(userData.lname);
		setPosition(userData.position_name);
		setEmail(userData.email);
		setSelectedRoles([]); // INSERT HERE THE ROLES OF THE USER
		setBusinessUnit(userData.dept_id);
		setDepartment(userData.section_id);
	}, [userData, userId]);

	const [assocID, setAssocID] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState("");
	const [email, setEmail] = useState("");
	// const [role, setRole] = useState("");
	const [businessUnit, setBusinessUnit] = useState(0);
	const [department, setDepartment] = useState(0);

	const [ask, setAsk] = React.useState(false);
	const [dialogTitle, setDialogTitle] = React.useState("");
	const [dialogContentText, setDialogContentText] = React.useState("");
	const [isSaving, setIsSaving] = React.useState(false);

	//FOR DROPDOWN CONFIG (BUSINESS UNIT)
	const depts = useSelector(
		(state: RootState) => state.deptReducer.department
	);

	//FOR DROPDOWN CONFIG (DEPARTMENT)
	const sections = useSelector(
		(state: RootState) => state.sectionReducer.section
	);

	//FOR ROLES OPTIONS
	const roles = useSelector((state: RootState) => state.roleReducer.roles);

	const proceedWithCancel = () => {
		userData = null;
		navigate("/user");
	};

	const proceedWithSaving = () => {
		// SAVE THE INFO HERE
		navigate("/user");
	};

	const handleSave = () => {
		setAsk(true);
		setDialogTitle("Save the record?");
		setDialogContentText(
			"Upon proceeding, the modifications on the record \nmade will be saved."
		);
		setIsSaving(true);
	};

	const handleCancel = () => {
		setAsk(true);
		setDialogTitle("Cancel the edit?");
		setDialogContentText(
			"Modifications made with the record will be \nlost forever."
		);
		setIsSaving(false);
	};

	return (
		<div className={UserDetailStyle.mainContainer}>
			<div className={UserDetailStyle.mainHolder}>
				{/* Start of Form */}
				<div className={UserDetailStyle.contentHolder}>
					<div className={UserDetailStyle.mainForm}>
						{/* Start of Username */}
						<FormControl>
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

						{/* Start of Associate ID and Position */}
						<div className={UserDetailStyle.formRow2}>
							<FormControl>
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

							<FormControl>
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
									onChange={(e) =>
										setPosition(e.target.value)
									} // Update state on change
								/>
							</FormControl>
						</div>

						{/* Start of Full Name */}
						<div className={UserDetailStyle.formRow3}>
							<FormControl>
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
									onChange={(e) =>
										setFirstName(e.target.value)
									} // Update state on change
								/>
							</FormControl>

							<FormControl>
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
									onChange={(e) =>
										setMiddleName(e.target.value)
									} // Update state on change
								/>
							</FormControl>

							<FormControl>
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
									onChange={(e) =>
										setLastName(e.target.value)
									} // Update state on change
								/>
							</FormControl>
						</div>

						{/* Start of Email */}
						<div>
							<FormControl>
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

						{/* Start of Role */}
						<div className={UserDetailStyle.formRow5}>
							<FormControl>
								<FormLabel>Role</FormLabel>
								<Select
									labelId="multiple-checkbox-label"
									id="multiple-checkbox"
									multiple
									value={selectedRoles}
									onChange={handleChange}
									renderValue={(selected) => {
										const selectedTitles: string[] = selectedRoles.map((roleId) => {
											const matchingRole: any = roles.find((role: any) => role.role_id === roleId);
											return matchingRole ? matchingRole.title : '';
										  })
										return selectedTitles.join(", ");
									}}
									MenuProps={MenuProps}
									size="small"
									sx={{ width: "500px", maxWidth: "300px" }}
								>
									{roles.map((role: any) => (
										<MenuItem
											key={role.role_id}
											value={role.role_id}
										>
											<Checkbox
												checked={
													selectedRoles.indexOf(
														role.role_id as never
													) > -1
												}
											/>
											<ListItemText
												primary={role.title}
											/>
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>

						{/* Start of Business Unit and Department */}
						<div className={UserDetailStyle.formRow6}>
							<FormControl variant="outlined" size="small">
								<FormLabel>Department</FormLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={businessUnit} // Bind value to state
									onChange={(e) =>
										setBusinessUnit(
											e.target.value as number
										)
									}
									className={UserDetailStyle.textField}
									startAdornment={
										<InputAdornment position="start">
											<GroupsOutlinedIcon />
										</InputAdornment>
									}
								>
									{sections.map((sect: any) => (
										<MenuItem value={sect?.section_id}>
											{sect?.section_name}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<Box>
								<FormControl variant="outlined" size="small">
									<FormLabel>Busines Unit</FormLabel>

									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={department} // Bind value to state
										onChange={(e) =>
											setDepartment(
												e.target.value as number
											)
										}
										className={UserDetailStyle.textField}
										startAdornment={
											<InputAdornment position="start">
												<GroupsOutlinedIcon />
											</InputAdornment>
										}
									>
										{depts.map((dept: any) => (
											<MenuItem value={dept?.dept_id}>
												{dept?.dept_name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</div>

						{/* Start of Button */}
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

					{/*Dialog of Edit Confirmation */}
					<Dialog
						open={ask}
						onClose={() => {
							setAsk(false);
						}}
						aria-labelledby="responsive-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="responsive-dialog-title">
							<Typography
								fontWeight={700}
								fontSize={20}
								display={"flex"}
								alignItems={"center"}
								gap={1}
							>
								<HelpIcon
									accentHeight={100}
									color="disabled"
									fontSize="large"
									alignmentBaseline="middle"
								/>
								{dialogTitle}
							</Typography>
						</DialogTitle>

						<DialogContent>
							<DialogContentText
								whiteSpace={"pre-line"}
								id="alert-dialog-description"
							>
								{dialogContentText}
							</DialogContentText>
						</DialogContent>

						<DialogActions>
							<Button
								variant="contained"
								onClick={
									isSaving
										? proceedWithSaving
										: proceedWithCancel
								}
								autoFocus
							>
								{isSaving ? "Save" : "Cancel"}
							</Button>

							<Button
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
		</div>
	);
}
