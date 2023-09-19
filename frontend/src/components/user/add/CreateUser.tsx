import CreateUserStyle from "./CreateUser.module.css";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import HelpIcon from "@mui/icons-material/Help";
import { getDepartmentFetch } from "../../../redux/state/departmentState";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//for breadcrumbs
import { getSectionFetch } from "../../../redux/state/sectionState";
import { getRolesFetch } from "../../../redux/state/roleState";
import { getPositionFetch } from "../../../redux/state/positionState";
import { addUserInfo } from "../../../redux/saga/userSaga";

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

export default function CreateUser() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		dispatch(getDepartmentFetch());
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(getSectionFetch());
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(getRolesFetch());
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(getPositionFetch());
	}, [dispatch]);

	// React.useEffect(() => {
	// 	setAssocID(userData.emp_id);
	// 	setUsername(userData.username);
	// 	setFirstName(userData.fname);
	// 	setMiddleName(userData.mname);
	// 	setLastName(userData.lname);
	// 	setPosition(userData.position_name);
	// 	setEmail(userData.email);
	// 	setSelectedRoles([]); // INSERT HERE THE ROLES OF THE USER
	// 	setBusinessUnit(userData.dept_id);
	// 	setDepartment(userData.section_id);
	// }, [userData, userId]);

	const [assocID, setAssocID] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState(0);
	const [email, setEmail] = useState("");
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

	//FOR POSITION OPTIONS
	const positions = useSelector(
		(state: RootState) => state.positionReducer.position
	);

	const proceedWithCancel = () => {
		navigate("/user");
	};

	const proceedWithSaving = () => {
		const data = {
			emp_id: assocID,
			username: username,
			fname: firstName,
			mname: middleName,
			lname: lastName,
			position_id: position,
			email: email,
			section_id: businessUnit,
			dept_id: department,
		  selectedRoles: selectedRoles
		};
    console.log("data", data)
    dispatch(addUserInfo({data}));
		// navigate("/user");
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
		<div className={CreateUserStyle.mainContainer}>
			<div className={CreateUserStyle.mainHolder}>
				{/* Start of Form */}
				<div className={CreateUserStyle.contentHolder}>
					<div className={CreateUserStyle.mainForm}>
						{/* Start of Username */}
						<FormControl>
							<FormLabel>Username</FormLabel>
							<TextField
								variant="outlined"
								size="small"
								placeholder="Username"
								className={CreateUserStyle.textField}
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
						<div className={CreateUserStyle.formRow2}>
							<FormControl>
								<FormLabel>Associate ID</FormLabel>
								<TextField
									variant="outlined"
									size="small"
									placeholder="Associate ID"
									className={CreateUserStyle.textField}
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

							<FormControl variant="outlined" size="small">
								<FormLabel>Position</FormLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={position} // Bind value to state
									onChange={(e) =>
										setPosition(e.target.value as number)
									}
									className={CreateUserStyle.textField}
									startAdornment={
										<InputAdornment position="start">
											<GroupsOutlinedIcon />
										</InputAdornment>
									}
								>
									<MenuItem key={0} value={0}>
										{"<Select a position>"}
									</MenuItem>
									{positions.map((pos: any) => (
										<MenuItem
											key={pos?.position_id}
											value={pos?.position_id}
										>
											{pos?.position_name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>

						{/* Start of Full Name */}
						<div className={CreateUserStyle.formRow3}>
							<FormControl>
								<FormLabel>First Name</FormLabel>
								<TextField
									variant="outlined"
									size="small"
									placeholder="First Name"
									className={CreateUserStyle.textField}
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
									className={CreateUserStyle.textField}
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
									className={CreateUserStyle.textField}
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
									className={CreateUserStyle.textField}
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
						<div className={CreateUserStyle.formRow5}>
							<FormControl>
								<FormLabel>Role</FormLabel>
								<Select
									labelId="multiple-checkbox-label"
									id="multiple-checkbox"
									multiple
									value={selectedRoles}
									onChange={handleChange}
									renderValue={(selected) => {
										const selectedTitles: string[] =
											selectedRoles.map((roleId) => {
												const matchingRole: any =
													roles.find(
														(role: any) =>
															role.role_id ===
															roleId
													);
												return matchingRole
													? matchingRole.title
													: "";
											});
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
						<div className={CreateUserStyle.formRow6}>
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
									className={CreateUserStyle.textField}
									startAdornment={
										<InputAdornment position="start">
											<GroupsOutlinedIcon />
										</InputAdornment>
									}
								>
                  <MenuItem key={0} value={0}>
										{"<Select a department>"}
									</MenuItem>
									{sections.map((sect: any) => (
										<MenuItem
											key={sect?.section_id}
											value={sect?.section_id}
										>
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
										className={CreateUserStyle.textField}
										startAdornment={
											<InputAdornment position="start">
												<GroupsOutlinedIcon />
											</InputAdornment>
										}
									>
                    <MenuItem key={0} value={0}>
										{"<Select a business unit>"}
									</MenuItem>
										{depts.map((dept: any) => (
											<MenuItem
												key={dept?.dept_id}
												value={dept?.dept_id}
											>
												{dept?.dept_name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</div>

						{/* Start of Button */}
						<div className={CreateUserStyle.formRow7}>
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
