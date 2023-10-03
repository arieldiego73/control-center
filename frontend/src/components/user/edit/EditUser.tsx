import React, { useState } from "react";
import EditUserStyle from "./EditUser.module.css";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getDepartmentFetch } from "../../../redux/state/departmentState";
import { getSectionFetch } from "../../../redux/state/sectionState";
import { getRolesFetch } from "../../../redux/state/roleState";
import { getPositionFetch } from "../../../redux/state/positionState";
import { addUserReset, clearUserInfo } from "../../../redux/state/userState";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import {
  getUserInfo,
  getUserRoles,
  updateUserInfo,
} from "../../../redux/saga/userSaga";
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
  InputLabel,
} from "@mui/material";
import { getEmployeeStatusFetch } from "../../../redux/state/employeeStatusState";

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

export default function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userId = location.state;

  // get the stored state of the user
  const userInfoData = useSelector(
    (state: RootState) => state.userReducer.userInfo
  );
  const [userData, setUserData] = React.useState<typeof userInfoData | null>(
    null
  );

  React.useEffect(() => {
    setUserData(userInfoData);
  }, [userInfoData]);

  React.useEffect(() => {
    dispatch(getUserInfo({ userId }));
    dispatch(getUserRoles({ userId }));
    dispatch(getDepartmentFetch());
    dispatch(getSectionFetch());
    dispatch(getRolesFetch());
    dispatch(getPositionFetch());
    dispatch(getEmployeeStatusFetch());
  }, [dispatch, userId]);

  const userRoles: any[] = useSelector(
    (state: RootState) => state.userReducer.userRoles
  );

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

  const isAddSuccess = useSelector(
    (state: RootState) => state.userReducer.isAddSuccess
  );
  React.useEffect(() => {
    if (isAddSuccess) {
      dispatch(addUserReset());
      setTimeout(() => {
        navigate("/users");
      }, GLOBAL_TIMEOUT);
    }
  });

  React.useEffect(() => {
    if (userData) {
      setAssocID(userData.emp_id);
      setUsername(userData.username);
      setFirstName(userData.fname);
      setMiddleName(userData.mname);
      setLastName(userData.lname);
      setPosition(userData.position_id ? userData.position_id : 0);
      setEmail(userData.email);
      setBusinessUnit(userData.dept_id ? userData.dept_id : 0);
      setDepartment(userData.section_id ? userData.section_id : 0);
      setEmpStatus(userData.status_code);
    }
  }, [userData]);

  React.useEffect(() => {
    const roles = userRoles.map((e) => {
      const values = Object.keys(e);
      return parseInt(values[0]);
    });
    setSelectedRoles(roles);
  }, [userRoles]);

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
    dispatch(clearUserInfo());
    navigate("/users");
  };

  const proceedWithSaving = () => {
    const data = {
      emp_id: assocID,
      username: username,
      fname: firstName.trim(),
      mname: middleName.trim(),
      lname: lastName.trim(),
      position_id: position,
      email: email,
      section_id: department,
      dept_id: businessUnit,
      selectedRoles: selectedRoles,
      status_code: empStatus,
    };
    dispatch(updateUserInfo({ data }));
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
      setDialogTitle("Update the record?");
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
      "Modifications made with the record will be \nlost forever."
    );
    setIsSaving(false);
  };

  return (
    <>
      <div className={EditUserStyle.mainContainer}>
        <div className={EditUserStyle.mainHolder}>
          <div className={EditUserStyle.contentHolder}>
            <div className={EditUserStyle.mainForm}>
              <div className={EditUserStyle.leftFormPlaceHolder}>
                <div className={EditUserStyle.profileHolder}>
                  <div className={EditUserStyle.imgContainer}>
                    <img
                      alt=""
                      src={imgTest}
                      className={EditUserStyle.imgSize}
                    />
                    <div
                      style={{
                        height: "80px",
                        width: "80px",
                        position: "absolute",
                        right: "0",
                        top: "70%",
                        display: "grid",
                        placeItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Button
                        component="label"
                        sx={{
                          overflow: "hidden",
                          borderRadius: "50%",
                          height: "60px",
                          width: "54px",
                          background: "rgba(200, 200, 200, 0.75)",
                          margin: 0,
                          padding: 0,
                          boxShadow:
                            "rgba(60, 64, 67, 0.7) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                          "&:hover": {
                            background: "rgba( 237, 249, 255, 0.75 )",
                            transform: "scale(1.1)",
                          },
                        }}
                        className={EditUserStyle.updateImageButton}
                      >
                        <CameraAltOutlinedIcon
                          sx={{
                            height: "30px",
                            width: "30px",
                            margin: 0,
                            padding: 0,
                          }}
                        />
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={EditUserStyle.formProfileContainer}>
                  {/* Start of Assoc id form */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormControl
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "95%",
                      }}
                    >
                      <TextField
                        label="Associate ID"
                        disabled
                        variant="outlined"
                        size="small"
                        placeholder="Associate ID"
                        className={EditUserStyle.textFieldProfile}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIndOutlinedIcon sx={{color: "rgba(0, 0, 0, 0.38)"}}/>
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
                        display: "flex",
                        justifyContent: "center",
                        width: "95%",
                      }}
                    >
                      <TextField
                        label="Username"
                        variant="outlined"
                        size="small"
                        placeholder="Username"
                        className={EditUserStyle.textFieldProfile}
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
                        display: "flex",
                        justifyContent: "center",
                        width: "95%",
                      }}
                    >
                      <InputLabel id="demo-controlled-open-select-label">
                        Employee Status
                      </InputLabel>
                      <Select
                        label="Employee Status"
                        value={empStatus}
                        size="small"
                        onChange={(e) => setEmpStatus(e.target.value)}
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
                          <MenuItem
                            key={status?.status_code}
                            value={status?.status_code}
                          >
                            {status?.status_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Start of other Form */}
              <div className={EditUserStyle.otherFormContainer}>
                <div className={EditUserStyle.otherFormPlaceholder}>
                  <div className={EditUserStyle.form}>
                    {/* Start of Name Form */}
                    <div className={EditUserStyle.nameForm}>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          size="small"
                          placeholder="First Name"
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

                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Middle Name"
                          variant="outlined"
                          size="small"
                          placeholder="Middle Name"
                          className={EditUserStyle.textField}
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

                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          size="small"
                          placeholder="Last Name"
                          className={EditUserStyle.textField}
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
                    <div className={EditUserStyle.formHolder}>
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "27.5%",
                          "@media (max-width: 850px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <InputLabel id="demo-controlled-open-select-label">
                          Position
                        </InputLabel>
                        <Select
                          label="Position"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={position}
                          onChange={(e) =>
                            setPosition(e.target.value as number)
                          }
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
                        <InputLabel id="demo-controlled-open-select-label">
                          Role
                        </InputLabel>
                        <Select
                          label="Role"
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
                    <div className={EditUserStyle.formHolder}>
                      <FormControl
                        sx={{
                          width: "27.5%",
                          "@media (max-width: 850px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <TextField
                          label="Email"
                          variant="outlined"
                          size="small"
                          placeholder="Email"
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
                    <div className={EditUserStyle.formHolder}>
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "27.5%",
                          "@media (max-width: 850px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <InputLabel id="demo-controlled-open-select-label">
                          Department
                        </InputLabel>
                        <Select
                          label="Department"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={department}
                          onChange={(e) =>
                            setDepartment(e.target.value as number)
                          }
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

                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "27.5%",
                          "@media (max-width: 850px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <InputLabel id="demo-controlled-open-select-label">
                          Business Unit
                        </InputLabel>
                        <Select
                          label="Business Unit"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={businessUnit}
                          onChange={(e) =>
                            setBusinessUnit(e.target.value as number)
                          }
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
                    <div className={EditUserStyle.formHolder}>
                      {/* <FormControl>
                      <FormLabel>Password</FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Password"
                        className={EditUserStyle.textField}
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
                        className={EditUserStyle.textField}
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
                <div className={EditUserStyle.formRow7}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    className={EditUserStyle.saveButton}
                    onClick={handleSave}
                  >
                    Update
                  </Button>

                  <Button
                    variant="text"
                    className={EditUserStyle.cancelButton}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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

//Unang gawa
// import UserDetailStyle from "./EditUser.module.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import {
// 	AlertColor,
// 	Alert,
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
// 	Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	getUserInfo,
// 	getUserRoles,
// 	updateUserInfo,
// } from "../../../redux/saga/userSaga";
// import { RootState } from "../../../redux/store/store";
// import HelpIcon from "@mui/icons-material/Help";
// import { getDepartmentFetch } from "../../../redux/state/departmentState";
// import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// //for breadcrumbs
// import { getSectionFetch } from "../../../redux/state/sectionState";
// import { getRolesFetch } from "../../../redux/state/roleState";
// import { getPositionFetch } from "../../../redux/state/positionState";
// import { Snackbar } from "@material-ui/core";
// import { addUserReset, clearUserInfo } from "../../../redux/state/userState";

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

// export default function EditUser() {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const location = useLocation();

// 	const userId = location.state;

// 	// get the stored state of the user
// 	const userInfoData = useSelector((state: RootState) => state.userReducer.userInfo);
// 	const [userData, setUserData] = React.useState<typeof userInfoData | null>(null);

// 	React.useEffect(() => {
// 		setUserData(userInfoData)
// 	}, [userInfoData])

// 	React.useEffect(() => {
// 		dispatch(getUserInfo({ userId }));
// 		dispatch(getUserRoles({ userId }));
// 		dispatch(getDepartmentFetch());
// 		dispatch(getSectionFetch());
// 		dispatch(getRolesFetch());
// 		dispatch(getPositionFetch());
// 	}, [dispatch, userId]);

// 	const userRoles: any[] = useSelector(
// 		(state: RootState) => state.userReducer.userRoles
// 	);

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

// 	const isAddSuccess = useSelector(
// 		(state: RootState) => state.userReducer.isAddSuccess
// 	);
// 	React.useEffect(() => {
// 		if (isAddSuccess) {
// 			dispatch(addUserReset());
// 			setTimeout(() => {
// 				navigate("/users");
// 			}, GLOBAL_TIMEOUT);
// 		}
// 	});

// 	React.useEffect(() => {
// 		if (userData) {
// 			setAssocID(userData.emp_id);
// 			setUsername(userData.username);
// 			setFirstName(userData.fname);
// 			setMiddleName(userData.mname);
// 			setLastName(userData.lname);
// 			setPosition(userData.position_id ? userData.position_id : 0);
// 			setEmail(userData.email);
// 			setBusinessUnit(userData.dept_id ? userData.dept_id : 0);
// 			setDepartment(userData.section_id ? userData.section_id : 0);
// 		}
// 	}, [userData]);

// 	React.useEffect(() => {
// 		const roles = userRoles.map((e) => {
// 			const values = Object.keys(e);
// 			return parseInt(values[0]);
// 		});
// 		setSelectedRoles(roles);
// 	}, [userRoles]);

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
// 		dispatch(clearUserInfo());
// 		navigate("/users");
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
// 		dispatch(updateUserInfo({ data }));
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
// 			<div className={UserDetailStyle.mainContainer}>
// 				<div className={UserDetailStyle.mainHolder}>
// 					{/* Start of Form */}
// 					<div className={UserDetailStyle.contentHolder}>
// 						<div className={UserDetailStyle.mainForm}>
// 							{/* Start of Username */}
// 							<FormControl>
// 								<FormLabel>Username</FormLabel>
// 								<TextField
// 									variant="outlined"
// 									size="small"
// 									placeholder="Username"
// 									className={UserDetailStyle.textField}
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
// 							<div className={UserDetailStyle.formRow2}>
// 								<FormControl>
// 									<FormLabel>Associate ID</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="Associate ID"
// 										className={UserDetailStyle.textField}
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
// 										className={UserDetailStyle.textField}
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
// 							<div className={UserDetailStyle.formRow3}>
// 								<FormControl>
// 									<FormLabel>First Name</FormLabel>
// 									<TextField
// 										variant="outlined"
// 										size="small"
// 										placeholder="First Name"
// 										className={UserDetailStyle.textField}
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
// 										className={UserDetailStyle.textField}
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
// 										className={UserDetailStyle.textField}
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
// 										className={UserDetailStyle.textField}
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
// 							<div className={UserDetailStyle.formRow5}>
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
// 							<div className={UserDetailStyle.formRow6}>
// 								<FormControl variant="outlined" size="small">
// 									<FormLabel>Department</FormLabel>
// 									<Select
// 										labelId="demo-simple-select-label"
// 										id="demo-simple-select"
// 										value={department} // Bind value to state
// 										onChange={(e) =>
// 											setDepartment(
// 												e.target.value as number
// 											)
// 										}
// 										className={UserDetailStyle.textField}
// 										startAdornment={
// 											<InputAdornment position="start">
// 												<GroupsOutlinedIcon />
// 											</InputAdornment>
// 										}
// 									>
// 										<MenuItem key={0} value={0}>
// 											{"<Select a department>"}
// 										</MenuItem>
// 										{sections.map((sect: any) => (
// 											<MenuItem
// 												key={sect?.section_id}
// 												value={sect?.section_id}
// 											>
// 												{sect?.section_name}
// 											</MenuItem>
// 										))}
// 									</Select>
// 								</FormControl>

// 								<Box>
// 									<FormControl
// 										variant="outlined"
// 										size="small"
// 									>
// 										<FormLabel>Busines Unit</FormLabel>

// 										<Select
// 											labelId="demo-simple-select-label"
// 											id="demo-simple-select"
// 											value={businessUnit} // Bind value to state
// 											onChange={(e) =>
// 												setBusinessUnit(
// 													e.target.value as number
// 												)
// 											}
// 											className={
// 												UserDetailStyle.textField
// 											}
// 											startAdornment={
// 												<InputAdornment position="start">
// 													<GroupsOutlinedIcon />
// 												</InputAdornment>
// 											}
// 										>
// 											<MenuItem key={0} value={0}>
// 												{"<Select a business unit>"}
// 											</MenuItem>
// 											{depts.map((dept: any) => (
// 												<MenuItem
// 													key={dept?.dept_id}
// 													value={dept?.dept_id}
// 												>
// 													{dept?.dept_name}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								</Box>
// 							</div>

// 							{/* Start of Button */}
// 							<div className={UserDetailStyle.formRow7}>
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
// 				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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
