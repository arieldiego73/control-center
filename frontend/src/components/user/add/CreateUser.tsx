import React, { useState } from "react";
import CreateUserStyle from "./CreateUser.module.css";
import imgTest from "../../../Assets/imgtest2.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HelpIcon from "@mui/icons-material/Help";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getDepartmentFetch } from "../../../redux/state/departmentState";
import { getSectionFetch } from "../../../redux/state/sectionState";
import { getRolesFetch } from "../../../redux/state/roleState";
import { getPositionFetch } from "../../../redux/state/positionState";
import { addUserInfo } from "../../../redux/saga/userSaga";
import { addUserReset } from "../../../redux/state/userState";
import {
  Alert,
  AlertColor,
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
  Snackbar,
  Typography,
} from "@mui/material";
import { getEmployeeStatusFetch } from "../../../redux/state/employeeStatusState";

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
const GLOBAL_TIMEOUT = 2000;

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

export default function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRoles, setSelectedRoles] = React.useState<number[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
    setSelectedRoles(event.target.value as number[]);
  };

  const notice = useSelector((state: RootState) => state.userReducer.notice);
  const isInitialAmount = React.useRef(true);
  React.useEffect(() => {
    if (!isInitialAmount.current) {
      if (notice.message && notice.severity) {
        handleClickSnackpack(notice.message, notice.severity as AlertColor)();
      }
    } else {
      isInitialAmount.current = false;
    }
  }, [notice]);

  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>(
    []
  );
  const [severity, setSeverity] = React.useState<AlertColor>("error");
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClickSnackpack =
    (message: string, severity: AlertColor) => () => {
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
      setSeverity(severity);
    };

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  React.useEffect(() => {
    dispatch(getDepartmentFetch());
    dispatch(getSectionFetch());
    dispatch(getRolesFetch());
    dispatch(getPositionFetch());
    dispatch(getEmployeeStatusFetch());
  }, [dispatch]);

  const isAddSuccess = useSelector(
    (state: RootState) => state.userReducer.isAddSuccess
  );
  React.useEffect(() => {
    if (isAddSuccess) {
      dispatch(addUserReset());
      setTimeout(() => {
        navigate("/user");
      }, GLOBAL_TIMEOUT);
    }
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [username, setUsername] = useState("");
  const [assocID, setAssocID] = useState("");
  const [empStatus, setEmpStatus] = useState("0");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState(0);
  // for role
  const [email, setEmail] = useState("");
  const [businessUnit, setBusinessUnit] = useState(0);
  const [department, setDepartment] = useState(0);
  // const [password, setPassword] = useState(0);
  // const [confirmPassword, setConfirmPassword] = useState(0);
  const [ask, setAsk] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContentText, setDialogContentText] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  //FOR DROPDOWN CONFIG (BUSINESS UNIT)
  const depts = useSelector((state: RootState) => state.deptReducer.department);

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

  //FOR STATUS OPTIONS
  const statuses = useSelector(
    (state: RootState) => state.employeeStatusReducer.employeeStatus
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
      section_id: department,
      dept_id: businessUnit,
      selectedRoles: selectedRoles,
      status_code: empStatus,
    };
    dispatch(addUserInfo({ data }));
    setAsk(false);
  };

  const handleSave = () => {
    if (
      assocID &&
      username &&
      firstName &&
      lastName &&
      position &&
      email &&
      department &&
      businessUnit &&
      empStatus !== "0" &&
      selectedRoles.length > 0
    ) {
      setAsk(true);
      setDialogTitle("Save the record?");
      setDialogContentText(
        "Upon proceeding, the modifications on the record \nmade will be saved."
      );
      setIsSaving(true);
    } else {
      handleClickSnackpack(
        "All fields are required. Please, try again.",
        "error"
      )();
    }
  };

  const handleCancel = () => {
    setAsk(true);
    setDialogTitle("Cancel the edit?");
    setDialogContentText(
      "The record will be discarded and will not be saved."
    );
    setIsSaving(false);
  };

  return (
    <>
      <div className={CreateUserStyle.mainContainer}>
        <div className={CreateUserStyle.mainHolder}>
          {/* Start of Form */}
          <div className={CreateUserStyle.contentHolder}>
            <div className={CreateUserStyle.mainForm}>

              {/* Start of Left Form */}
              <div className={CreateUserStyle.leftFormPlaceHolder}>
                
                {/* Start of Profile */}
                <div className={CreateUserStyle.profileHolder}>
                  <div className={CreateUserStyle.imgContainer}>
                    <img
                      alt=""
                      src={imgTest}
                      className={CreateUserStyle.imgSize}
                    />
                  </div>

                  <div className={CreateUserStyle.toolTip}>
                    <Button
                      className={CreateUserStyle.buttonProfile}
                      component="label"
                      startIcon={<CloudUploadIcon />}
                    >
                      Edit Profile
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </div>
                </div>

                {/* Start of Form of Profile*/}
                <div className={CreateUserStyle.formProfileContainer}>
                  {/* Start of Assoc id form */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormControl
                      style={{
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    > 
                      <FormLabel> Associate ID </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Associate ID"
                        className={CreateUserStyle.textFieldProfile}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIndOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={assocID}
                        onChange={(e) => setAssocID(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  
                  {/* Start of username form */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormControl
                      style={{
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    > 
                      <FormLabel> Username </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Username"
                        className={CreateUserStyle.textFieldProfile}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PermIdentityOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  {/* Start of Emp Status form */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormControl
                      style={{
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <FormLabel> Employee Status </FormLabel>
                      <Select
                          value={empStatus}
                          size="small"
                          onChange={(e) => setEmpStatus(e.target.value)}
                          className={CreateUserStyle.textField}
                          startAdornment={
                            <InputAdornment position="start">
                              <GroupsOutlinedIcon />
                            </InputAdornment>
                          }
                        >
                          <MenuItem key={0} value={"0"}>
                            {"<Select status>"}
                          </MenuItem>
                          {statuses.map((status: any) => (
                            <MenuItem key={status?.status_code} value={status?.status_code}>
                              {status?.status_name}
                            </MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Start of other Form */}
              <div className={CreateUserStyle.otherFormContainer}>
                <div  className={CreateUserStyle.otherFormPlaceholder}>
                  <div className={CreateUserStyle.form}>

                    {/* Start of Name Form */}
                    <div className={CreateUserStyle.nameForm}>
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
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
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
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
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
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    {/* Start of Position and Role Form */}
                    <div className={CreateUserStyle.formHolder}>
                      <FormControl variant="outlined" size="small">
                        <FormLabel>Position</FormLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={position}
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

                      <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Select
                          labelId="multiple-checkbox-label"
                          id="multiple-checkbox"
                          multiple
                          value={selectedRoles}
                          onChange={handleChange}
                          renderValue={(selected) => {
                            const selectedTitles: string[] = selectedRoles.map(
                              (roleId) => {
                                const matchingRole: any = roles.find(
                                  (role: any) => role.role_id === roleId
                                );
                                return matchingRole ? matchingRole.title : "";
                              }
                            );
                            return selectedTitles.join(", ");
                          }}
                          MenuProps={MenuProps}
                          size="small"
                          sx={{ width: "500px", maxWidth: "300px" }}
                        >
                          {roles.map((role: any) => (
                            <MenuItem key={role.role_id} value={role.role_id}>
                              <Checkbox
                                checked={
                                  selectedRoles.indexOf(role.role_id as never) >
                                  -1
                                }
                              />
                              <ListItemText primary={role.title} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Start of Email Form */}
                    <div className={CreateUserStyle.formHolder}>
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    {/* Start of Department and Business Unit Form */}
                    <div className={CreateUserStyle.formHolder}>
                      <FormControl variant="outlined" size="small">
                        <FormLabel>Department</FormLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={department}
                          onChange={(e) =>
                            setDepartment(e.target.value as number)
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

                      <FormControl variant="outlined" size="small">
                        <FormLabel>Busines Unit</FormLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={businessUnit}
                          onChange={(e) =>
                            setBusinessUnit(e.target.value as number)
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
                            <MenuItem key={dept?.dept_id} value={dept?.dept_id}>
                              {dept?.dept_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Start of Password and Confirm Password Form */}
                    <div className={CreateUserStyle.formHolder}>
                      {/* <FormControl>
                      <FormLabel>Password</FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Password"
                        className={CreateUserStyle.textField}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PermIdentityOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Confirm Password"
                        className={CreateUserStyle.textField}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PermIdentityOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                       
                      />
                    </FormControl> */}
                    </div>
                  </div>
                </div>

                {/* Start of Button*/}
                <div className={CreateUserStyle.formRow7}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    className={CreateUserStyle.saveButton}
                    onClick={handleSave}
                  >
                    SAVE
                  </Button>

                  <Button
                    variant="text"
                    // startIcon={<CancelOutlinedIcon />}
                    className={CreateUserStyle.cancelButton}
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
                      color="error"
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
                    onClick={isSaving ? proceedWithSaving : proceedWithCancel}
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
      </div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={GLOBAL_TIMEOUT}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </>
  );
}


// UNANG GAWA
// import CreateUserStyle from "./CreateUser.module.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import {
// 	Alert,
// 	AlertColor,
// 	Box,
// 	Checkbox, 
// 	Dialog,
// 	DialogActions,
// 	DialogContent,
// 	DialogContentText,
// 	DialogTitle,
// 	FormControl,
// 	FormLabel,
// 	InputAdornment,
// 	ListItemText,
// 	MenuItem,
// 	Select,
// 	SelectChangeEvent,
// 	Snackbar,
// 	Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store/store";
// import HelpIcon from "@mui/icons-material/Help";
// import { getDepartmentFetch } from "../../../redux/state/departmentState";
// import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// //for breadcrumbs
// import { getSectionFetch } from "../../../redux/state/sectionState";
// import { getRolesFetch } from "../../../redux/state/roleState";
// import { getPositionFetch } from "../../../redux/state/positionState";
// import { addUserInfo } from "../../../redux/saga/userSaga";
// import { addUserReset } from "../../../redux/state/userState";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250,
// 		},
// 	},
// };
// const GLOBAL_TIMEOUT = 2000;

// export interface SnackbarMessage {
// 	message: string;
// 	key: number;
// }

// export interface State {
// 	open: boolean;
// 	snackPack: readonly SnackbarMessage[];
// 	messageInfo?: SnackbarMessage;
// }

// export default function CreateUser() {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	const [selectedRoles, setSelectedRoles] = React.useState<number[]>([]);
// 	const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
// 		setSelectedRoles(event.target.value as number[]);
// 	};

// 	const notice = useSelector((state: RootState) => state.userReducer.notice);
// 	const isInitialAmount = React.useRef(true);
// 	React.useEffect(() => {
// 		if (!isInitialAmount.current) {
// 			if (notice.message && notice.severity) {
// 				handleClickSnackpack(
// 					notice.message,
// 					notice.severity as AlertColor
// 				)();
// 			}
// 		} else {
// 			isInitialAmount.current = false;
// 		}
// 	}, [notice]);

// 	const [snackPack, setSnackPack] = React.useState<
// 		readonly SnackbarMessage[]
// 	>([]);
// 	const [severity, setSeverity] = React.useState<AlertColor>("error");
// 	const [open, setOpen] = React.useState(false);
// 	const [messageInfo, setMessageInfo] = React.useState<
// 		SnackbarMessage | undefined
// 	>(undefined);

// 	React.useEffect(() => {
// 		if (snackPack.length && !messageInfo) {
// 			// Set a new snack when we don't have an active one
// 			setMessageInfo({ ...snackPack[0] });
// 			setSnackPack((prev) => prev.slice(1));
// 			setOpen(true);
// 		} else if (snackPack.length && messageInfo && open) {
// 			// Close an active snack when a new one is added
// 			setOpen(false);
// 		}
// 	}, [snackPack, messageInfo, open]);

// 	const handleClickSnackpack =
// 		(message: string, severity: AlertColor) => () => {
// 			setSnackPack((prev) => [
// 				...prev,
// 				{ message, key: new Date().getTime() },
// 			]);
// 			setSeverity(severity);
// 		};

// 	const handleClose = (event: React.SyntheticEvent | Event) => {
// 		setOpen(false);
// 	};

// 	const handleExited = () => {
// 		setMessageInfo(undefined);
// 	};

// 	React.useEffect(() => {
// 		dispatch(getDepartmentFetch());
// 		dispatch(getSectionFetch());
// 		dispatch(getRolesFetch());
// 		dispatch(getPositionFetch());
// 	}, [dispatch]);

// 	const isAddSuccess = useSelector(
// 		(state: RootState) => state.userReducer.isAddSuccess
// 	);
// 	React.useEffect(() => {
// 		if (isAddSuccess) {
// 			dispatch(addUserReset());
// 			setTimeout(() => {
// 				navigate("/user");
// 			}, GLOBAL_TIMEOUT);
// 		}
// 	});

// 	const [assocID, setAssocID] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [firstName, setFirstName] = useState("");
// 	const [middleName, setMiddleName] = useState("");
// 	const [lastName, setLastName] = useState("");
// 	const [position, setPosition] = useState(0);
// 	const [email, setEmail] = useState("");
// 	const [businessUnit, setBusinessUnit] = useState(0);
// 	const [department, setDepartment] = useState(0);

// 	const [ask, setAsk] = React.useState(false);
// 	const [dialogTitle, setDialogTitle] = React.useState("");
// 	const [dialogContentText, setDialogContentText] = React.useState("");
// 	const [isSaving, setIsSaving] = React.useState(false);

// 	//FOR DROPDOWN CONFIG (BUSINESS UNIT)
// 	const depts = useSelector(
// 		(state: RootState) => state.deptReducer.department
// 	);

// 	//FOR DROPDOWN CONFIG (DEPARTMENT)
// 	const sections = useSelector(
// 		(state: RootState) => state.sectionReducer.section
// 	);

// 	//FOR ROLES OPTIONS
// 	const roles = useSelector((state: RootState) => state.roleReducer.roles);

// 	//FOR POSITION OPTIONS
// 	const positions = useSelector(
// 		(state: RootState) => state.positionReducer.position
// 	);

// 	const proceedWithCancel = () => {
// 		navigate("/user");
// 	};

// 	const proceedWithSaving = () => {
// 		const data = {
// 			emp_id: assocID,
// 			username: username,
// 			fname: firstName,
// 			mname: middleName,
// 			lname: lastName,
// 			position_id: position,
// 			email: email,
// 			section_id: department,
// 			dept_id: businessUnit,
// 			selectedRoles: selectedRoles,
// 		};
// 		dispatch(addUserInfo({ data }));
// 		setAsk(false);
// 	};

// 	const handleSave = () => {
// 		if (
// 			assocID &&
// 			username &&
// 			firstName &&
// 			middleName &&
// 			lastName &&
// 			position &&
// 			email &&
// 			department &&
// 			businessUnit &&
// 			selectedRoles.length > 0
// 		) {
// 			setAsk(true);
// 			setDialogTitle("Save the record?");
// 			setDialogContentText(
// 				"Upon proceeding, the modifications on the record \nmade will be saved."
// 			);
// 			setIsSaving(true);
// 		} else {
// 			handleClickSnackpack(
// 				"All fields are required. Please, try again.",
// 				"error"
// 			)();
// 		}
// 	};

// 	const handleCancel = () => {
// 		setAsk(true);
// 		setDialogTitle("Cancel the edit?");
// 		setDialogContentText(
// 			"Modifications made with the record will be \nlost forever."
// 		);
// 		setIsSaving(false);
// 	};

// 	return (
// 		<>
// 			<div className={CreateUserStyle.mainContainer}>
// 				<div className={CreateUserStyle.mainHolder}>
// 					{/* Start of Form */}
// 					<div className={CreateUserStyle.contentHolder}>
// 						<div className={CreateUserStyle.mainForm}>
// 							{/* Start of Username */}
// 							<FormControl>
// 								<FormLabel>Username</FormLabel>
// 								<TextField
// 									variant="outlined"
// 									size="small"
// 									placeholder="Username"
// 									className={CreateUserStyle.textField}
// 									InputProps={{
// 										startAdornment: (
// 											<InputAdornment position="start">
// 												<PermIdentityOutlinedIcon />
// 											</InputAdornment>
// 										),
// 									}}
// 									value={username} // Bind value to state
// 									onChange={(e) =>
// 										setUsername(e.target.value)
// 									} // Update state on change
// 								/>
// 							</FormControl>

// 							{/* Start of Associate ID and Position */}
// 							<div className={CreateUserStyle.formRow2}>
// 								<FormControl>
// 									<FormLabel>Associate ID</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="Associate ID"
// 										className={CreateUserStyle.textField}
// 										InputProps={{
// 											startAdornment: (
// 												<InputAdornment position="start">
// 													<AssignmentIndOutlinedIcon />
// 												</InputAdornment>
// 											),
// 										}}
// 										value={assocID} // Bind value to state
// 										onChange={(e) =>
// 											setAssocID(e.target.value)
// 										} // Update state on change
// 									/>
// 								</FormControl>

// 								<FormControl variant="outlined" size="small">
// 									<FormLabel>Position</FormLabel>
// 									<Select
// 										labelId="demo-simple-select-label"
// 										id="demo-simple-select"
// 										value={position} // Bind value to state
// 										onChange={(e) =>
// 											setPosition(
// 												e.target.value as number
// 											)
// 										}
// 										className={CreateUserStyle.textField}
// 										startAdornment={
// 											<InputAdornment position="start">
// 												<GroupsOutlinedIcon />
// 											</InputAdornment>
// 										}
// 									>
// 										<MenuItem key={0} value={0}>
// 											{"<Select a position>"}
// 										</MenuItem>
// 										{positions.map((pos: any) => (
// 											<MenuItem
// 												key={pos?.position_id}
// 												value={pos?.position_id}
// 											>
// 												{pos?.position_name}
// 											</MenuItem>
// 										))}
// 									</Select>
// 								</FormControl>
// 							</div>

// 							{/* Start of Full Name */}
// 							<div className={CreateUserStyle.formRow3}>
// 								<FormControl>
// 									<FormLabel>First Name</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="First Name"
// 										className={CreateUserStyle.textField}
// 										InputProps={{
// 											startAdornment: (
// 												<InputAdornment position="start">
// 													<PermIdentityOutlinedIcon />
// 												</InputAdornment>
// 											),
// 										}}
// 										value={firstName} // Bind value to state
// 										onChange={(e) =>
// 											setFirstName(e.target.value)
// 										} // Update state on change
// 									/>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel>Middle Name</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="Middle Name"
// 										className={CreateUserStyle.textField}
// 										InputProps={{
// 											startAdornment: (
// 												<InputAdornment position="start">
// 													<PermIdentityOutlinedIcon />
// 												</InputAdornment>
// 											),
// 										}}
// 										value={middleName} // Bind value to state
// 										onChange={(e) =>
// 											setMiddleName(e.target.value)
// 										} // Update state on change
// 									/>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel>Last Name</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="Last Name"
// 										className={CreateUserStyle.textField}
// 										InputProps={{
// 											startAdornment: (
// 												<InputAdornment position="start">
// 													<PermIdentityOutlinedIcon />
// 												</InputAdornment>
// 											),
// 										}}
// 										value={lastName} // Bind value to state
// 										onChange={(e) =>
// 											setLastName(e.target.value)
// 										} // Update state on change
// 									/>
// 								</FormControl>
// 							</div>

// 							{/* Start of Email */}
// 							<div>
// 								<FormControl>
// 									<FormLabel>Email</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="Email"
// 										className={CreateUserStyle.textField}
// 										InputProps={{
// 											startAdornment: (
// 												<InputAdornment position="start">
// 													<EmailOutlinedIcon />
// 												</InputAdornment>
// 											),
// 										}}
// 										value={email} // Bind value to state
// 										onChange={(e) =>
// 											setEmail(e.target.value)
// 										} // Update state on change
// 									/>
// 								</FormControl>
// 							</div>

// 							{/* Start of Role */}
// 							<div className={CreateUserStyle.formRow5}>
// 								<FormControl>
// 									<FormLabel>Role</FormLabel>
// 									<Select
// 										labelId="multiple-checkbox-label"
// 										id="multiple-checkbox"
// 										multiple
// 										value={selectedRoles}
// 										onChange={handleChange}
// 										renderValue={(selected) => {
// 											const selectedTitles: string[] =
// 												selectedRoles.map((roleId) => {
// 													const matchingRole: any =
// 														roles.find(
// 															(role: any) =>
// 																role.role_id ===
// 																roleId
// 														);
// 													return matchingRole
// 														? matchingRole.title
// 														: "";
// 												});
// 											return selectedTitles.join(", ");
// 										}}
// 										MenuProps={MenuProps}
// 										size="small"
// 										sx={{
// 											width: "500px",
// 											maxWidth: "300px",
// 										}}
// 									>
// 										{roles.map((role: any) => (
// 											<MenuItem
// 												key={role.role_id}
// 												value={role.role_id}
// 											>
// 												<Checkbox
// 													checked={
// 														selectedRoles.indexOf(
// 															role.role_id as never
// 														) > -1
// 													}
// 												/>
// 												<ListItemText
// 													primary={role.title}
// 												/>
// 											</MenuItem>
// 										))}
// 									</Select>
// 								</FormControl>
// 							</div>

// 							{/* Start of Business Unit and Department */}
// 							<div className={CreateUserStyle.formRow6}>
// 								<FormControl variant="outlined" size="small">
// 									<FormLabel>Business Unit</FormLabel>
// 									<Select
// 										labelId="demo-simple-select-label"
// 										id="demo-simple-select"
// 										value={businessUnit} // Bind value to state
// 										onChange={(e) =>
// 											setBusinessUnit(
// 												e.target.value as number
// 											)
// 										}
// 										className={CreateUserStyle.textField}
// 										startAdornment={
// 											<InputAdornment position="start">
// 												<GroupsOutlinedIcon />
// 											</InputAdornment>
// 										}
// 									>
// 										<MenuItem key={0} value={0}>
// 											{"<Select a business unit>"}
// 										</MenuItem>
// 										{depts.map((dept: any) => (
// 											<MenuItem
// 												key={dept?.dept_id}
// 												value={dept?.dept_id}
// 											>
// 												{dept?.dept_name}
// 											</MenuItem>
// 										))}
// 									</Select>
// 								</FormControl>

// 								<Box>
// 									<FormControl
// 										variant="outlined"
// 										size="small"
// 									>
// 										<FormLabel>Department</FormLabel>

// 										<Select
// 											labelId="demo-simple-select-label"
// 											id="demo-simple-select"
// 											value={department} // Bind value to state
// 											onChange={(e) =>
// 												setDepartment(
// 													e.target.value as number
// 												)
// 											}
// 											className={
// 												CreateUserStyle.textField
// 											}
// 											startAdornment={
// 												<InputAdornment position="start">
// 													<GroupsOutlinedIcon />
// 												</InputAdornment>
// 											}
// 										>
// 											<MenuItem key={0} value={0}>
// 												{"<Select a department>"}
// 											</MenuItem>
// 											{sections.map((sect: any) => (
// 												<MenuItem
// 													key={sect?.section_id}
// 													value={sect?.section_id}
// 												>
// 													{sect?.section_name}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								</Box>
// 							</div>

// 							{/* Start of Button */}
// 							<div className={CreateUserStyle.formRow7}>
// 								<Button
// 									variant="contained"
// 									color="primary"
// 									startIcon={<SaveOutlinedIcon />}
// 									style={{ textTransform: "none" }}
// 									onClick={handleSave}
// 								>
// 									SAVE
// 								</Button>

// 								<Button
// 									variant="contained"
// 									startIcon={<CancelOutlinedIcon />}
// 									style={{
// 										textTransform: "none",
// 										backgroundColor: "gray",
// 									}}
// 									onClick={handleCancel}
// 								>
// 									CANCEL
// 								</Button>
// 							</div>
// 						</div>

// 						{/*Dialog of Edit Confirmation */}
// 						<Dialog
// 							open={ask}
// 							onClose={() => {
// 								setAsk(false);
// 							}}
// 							aria-labelledby="responsive-dialog-title"
// 							aria-describedby="alert-dialog-description"
// 						>
// 							<DialogTitle id="responsive-dialog-title">
// 								<Typography
// 									fontWeight={700}
// 									fontSize={20}
// 									display={"flex"}
// 									alignItems={"center"}
// 									gap={1}
// 								>
// 									<HelpIcon
// 										accentHeight={100}
// 										color="error"
// 										fontSize="large"
// 										alignmentBaseline="middle"
// 									/>
// 									{dialogTitle}
// 								</Typography>
// 							</DialogTitle>

// 							<DialogContent>
// 								<DialogContentText
// 									whiteSpace={"pre-line"}
// 									id="alert-dialog-description"
// 								>
// 									{dialogContentText}
// 								</DialogContentText>
// 							</DialogContent>

// 							<DialogActions>
// 								<Button
// 									variant="contained"
// 									onClick={
// 										isSaving
// 											? proceedWithSaving
// 											: proceedWithCancel
// 									}
// 									autoFocus
// 								>
// 									{isSaving ? "Save" : "Cancel"}
// 								</Button>

// 								<Button
// 									onClick={() => {
// 										setAsk(false);
// 									}}
// 								>
// 									Continue editing
// 								</Button>
// 							</DialogActions>
// 						</Dialog>
// 					</div>
// 				</div>
// 			</div>
// 			<Snackbar
// 				key={messageInfo ? messageInfo.key : undefined}
// 				open={open}
// 				autoHideDuration={GLOBAL_TIMEOUT}
// 				onClose={handleClose}
// 				TransitionProps={{ onExited: handleExited }}
// 			>
// 				<Alert
// 					onClose={handleClose}
// 					severity={severity}
// 					sx={{ width: "100%" }}
// 					variant="filled"
// 				>
// 					{messageInfo ? messageInfo.message : undefined}
// 				</Alert>
// 			</Snackbar>
// 		</>
// 	);
// }
