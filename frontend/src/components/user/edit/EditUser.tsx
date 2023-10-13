import React, { useEffect, useState } from "react";
import EditUserStyle from "./EditUser.module.css";
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
import defaultProfile from "../../../Assets/userImage/MaleDefaultProfile.jpg";

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
  FormHelperText,
  IconButton,
  Backdrop,
} from "@mui/material";
import { getEmployeeStatusFetch } from "../../../redux/state/employeeStatusState";
import { VisibilityOff, Visibility } from "@mui/icons-material";
// import { CircularProgress } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";

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

  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

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
      setPassword(userData.password);
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
  const [email, setEmail] = useState("");
  const [businessUnit, setBusinessUnit] = useState(0);
  const [department, setDepartment] = useState(0);
  const [password, setPassword] = useState("");
  const [imgSrc, setImgSrc] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ask, setAsk] = React.useState(false);
  const [askSave, setAskSave] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogTitleSave, setDialogTitleSave] = React.useState("");
  const [dialogContentText, setDialogContentText] = React.useState("");
  const [dialogContentTextSave, setDialogContentTextSave] = React.useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
  const isEmailValid = emailRegex.test(email);


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
      password: password,
      confirm_password: confirmPassword,
      admin_password: adminPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
      fname: firstName.trim(),
      mname: middleName.trim(),
      lname: lastName.trim(),
      position_id: position,
      email: email,
      section_id: department,
      dept_id: businessUnit,
      selectedRoles: selectedRoles,
      status_code: empStatus,
      img_src: selectedImage
    };
    dispatch(updateUserInfo({ data }));
    setAskSave(false);
    setAsk(false);
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  const handleSave = () => {
    setFormSubmitted(true);
    if (
      !assocID ||
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !position ||
      !email ||
      !department ||
      !businessUnit ||
      !empStatus ||
      selectedRoles.length === 0
    ) {
      handleClickSnackpack("Please fill in the required fields.", "error")();
    } else if (
      assocID &&
      username &&
      password &&
      firstName &&
      lastName &&
      position &&
      email &&
      department &&
      businessUnit &&
      empStatus !== "0" &&
      selectedRoles.length > 0
    ) {
      if (password.length > 5) {
          if (isEmailValid) {
            setAskSave(true);
            setDialogTitleSave("Save the record?");
            setDialogContentTextSave(
              "Upon proceeding, the modifications on the record \nmade will be saved."
            );
          }
          else {
            handleClickSnackpack("Please enter a valid information. 1", "error")();
          }
      }
      else {
        handleClickSnackpack("Please enter a valid information. 3", "error")();
      }
    } else {
      handleClickSnackpack(
        "All fields are required. Please, try again.",
        "error"
      )();
    }
  };


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  }

  const handleCancel = () => {
    setAsk(true);
    setDialogTitle("Cancel the edit?");
    setDialogContentText(
      " The record will be discarded and will not be saved. \nAre you sure you want to leave this page?"
    );
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
                    {/* Display the selected image */}
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className={EditUserStyle.imgSize}
                      />
                    ) : (
                      // Display the user's image if available, otherwise show the default profile
                      userData?.img_src ? (
                        <img
                        src={require(`../../../Assets/userImage/${userData.img_src}`)} // Construct the image source
                          alt="User Profile"
                          className={EditUserStyle.imgSize}
                        />
                      ) : (
                        <img
                          src={defaultProfile}
                          alt="Default Profile"
                          className={EditUserStyle.imgSize}
                        />
                      )
                    )}
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
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageChange}
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
                        error={formSubmitted && assocID === ""}
                        helperText={
                          formSubmitted && assocID === "" ? "Associate ID required" : ""
                        }
                        // disabled
                        variant="outlined"
                        size="small"
                        placeholder="Associate ID"
                        className={EditUserStyle.textFieldProfile}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIndOutlinedIcon sx={{ color: "rgba(0, 0, 0, 0.38)" }} />
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
                        error={formSubmitted && username === ""}
                        helperText={
                          formSubmitted && username === ""
                            ? "Username required"
                            : ""
                        }
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
                      error={formSubmitted && empStatus === "0"}
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
                      {formSubmitted && empStatus === "0" && (
                        <FormHelperText>Employee Status required</FormHelperText>
                      )}
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
                          error={formSubmitted && firstName === ""}
                          helperText={
                            formSubmitted && firstName === ""
                              ? "First Name required"
                              : ""
                          }
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
                          error={formSubmitted && lastName === ""}
                          helperText={
                            formSubmitted && lastName === ""
                              ? "Last Name required"
                              : ""
                          }
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
                        error={formSubmitted && position === 0}
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
                        {formSubmitted && position === 0 && (
                          <FormHelperText>Position required</FormHelperText>
                        )}
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
                        error={formSubmitted && selectedRoles.length === 0}
                      >


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
                        {formSubmitted && selectedRoles.length === 0 && (
                          <FormHelperText>Role required</FormHelperText>
                        )}
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
                          error={formSubmitted && (email === "" || !isEmailValid)}
                          helperText={
                            (formSubmitted && email === "" ? "Email required" : "") ||
                            (formSubmitted && !isEmailValid ? "Please enter a valid email." : "")
                          }
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
                        error={formSubmitted && department === 0}
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
                        {formSubmitted && department === 0 && (
                          <FormHelperText>Department required</FormHelperText>
                        )}
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
                        error={formSubmitted && businessUnit === 0}
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
                        {formSubmitted && businessUnit === 0 && (
                          <FormHelperText>Business Unit required</FormHelperText>
                        )}
                      </FormControl>
                    </div>

                
                 

                  </div>
                </div>

                {/* Start of Button*/}
                <div className={EditUserStyle.formRow7}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    // className={EditUserStyle.saveButton}
                    onClick={handleSave}
                  >
                    Update
                  </Button>

                  <Button
                    variant="text"
                    className={EditUserStyle.cancelButton}
                    onClick={handleCancel}
                    sx={{ backgroundColor: "#e0e0e0", "&:hover": { backgroundColor: "#c0c0c0" } }}
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
                    onClick={proceedWithCancel}
                    autoFocus
                  >
                    Cancel
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

              <Dialog
                open={askSave}
                onClose={() => {
                  setAskSave(false);
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
                    {dialogTitleSave}
                  </Typography>
                </DialogTitle>

                <DialogContent>
                  <DialogContentText
                    whiteSpace={"pre-line"}
                    id="alert-dialog-description"
                  >
                    {dialogContentTextSave}
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={proceedWithSaving}
                    autoFocus
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      setAskSave(false);
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


      
         <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
