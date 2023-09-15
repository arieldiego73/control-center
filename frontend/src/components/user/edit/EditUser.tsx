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
import { getDepartmentFetch } from "../../../redux/state/departmentState";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//for breadcrumbs
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import AddRoleTable from "../AddRoleTable";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";

export default function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userId = location.state;

  React.useEffect(() => {
    dispatch(getUserInfo({ userId }));
  }, [dispatch, userId]);

  React.useEffect(() => {
    dispatch(getDepartmentFetch());
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
  const depts = useSelector((state: RootState) => state.deptReducer.department);

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

  //for popup (dialog)
  const [open, setOpen] = React.useState(false);

  const [openTechnology, setOpenTechnology] = React.useState(false);

  const handleClickOpenTechnology = () => {
    setOpenTechnology(true);
  };

  const handleCloseTechnology = () => {
    setOpenTechnology(false);
  };

  //for add role popup (dialog)
  const [openRole, setOpenRole] = React.useState(false);
  const handleClickOpenRole = () => {
    setOpenRole(true);
  };
  const handleCloseRole = () => {
    setOpenRole(false);
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
						onChange={(e) => setPosition(e.target.value)} // Update state on change
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
						onChange={(e) => setFirstName(e.target.value)} // Update state on change
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
						onChange={(e) => setMiddleName(e.target.value)} // Update state on change
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
						onChange={(e) => setLastName(e.target.value)} // Update state on change
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
						onClick={handleClickOpenRole}
					>
						Add Role
					</Button>
				</div>
				
				{/* Start of Business Unit and Department */}
				<div className={UserDetailStyle.formRow6}>
					<FormControl>
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
						onChange={(e) => setBusinessUnit(e.target.value)} // Update state on change
						/>
					</FormControl>

					<Box>
						<FormControl variant="outlined" size="small">
							<FormLabel>Department</FormLabel>

							<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={department} // Bind value to state
							onChange={(e) => setDepartment(e.target.value)}
							className={UserDetailStyle.textField}
							startAdornment={
								<InputAdornment position="start">
								<GroupsOutlinedIcon />
								</InputAdornment>
							}
							>
							{depts.map((dept: any) => (
								<MenuItem value={dept?.dept_name}>
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
						fontFamily={"Montserrat, san-serif"}
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
						fontFamily={"Montserrat, san-serif"}
						whiteSpace={"pre-line"}
						id="alert-dialog-description"
					>
						{dialogContentText}
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button
						variant="contained"
						onClick={isSaving ? proceedWithSaving : proceedWithCancel}
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

			{/* <Dialog
				open={openTechnology}
				onClose={handleCloseTechnology}
				aria-describedby="alert-dialog-slide-description"
				maxWidth="xl"
			>
				<DialogTitle>
					<FontAwesomeIcon icon={faUser} size="1x" color="black" />
					{"Technology"}
				</DialogTitle>

				<DialogContent>
					<AddRoleTable />
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleCloseTechnology}
						sx={{ fontFamily: "Montserrat, sans-serif" }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleCloseTechnology}
						sx={{ fontFamily: "Montserrat, sans-serif" }}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog> */}
			
			{/*Dialog of Add Role */}
			<Dialog
				open={openRole}
				onClose={handleCloseRole}
				aria-describedby="alert-dialog-slide-description"
				maxWidth="xl"
			>
				<DialogTitle
					sx={{
						display: "flex",
						gap: "1vw",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
					>
					<PersonSearchOutlinedIcon />
					{"Roles"}
				</DialogTitle>

				<DialogContent>
					<AddRoleTable />
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleCloseRole}
						sx={{ fontFamily: "Montserrat, sans-serif" }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleCloseRole}
						sx={{ fontFamily: "Montserrat, sans-serif" }}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
        </div>
      </div>
    </div>
  );
}
