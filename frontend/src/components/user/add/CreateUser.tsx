import React, { useEffect, useState } from "react";
import CreateUserStyle from "./CreateUser.module.css";
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
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import defaultProfile from "../../../Assets/userImage/MaleDefaultProfile.jpg";
import { ChangeEvent } from 'react';

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

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
  FormHelperText,
  InputLabel,
  Backdrop,
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

  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

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
        navigate("/users");
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
  const [email, setEmail] = useState("");
  const [businessUnit, setBusinessUnit] = useState(0);
  const [department, setDepartment] = useState(0);
  const [password, setPassword] = useState("");
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
  //REGEX explanation
  // ^ asserts the start of the string.
  // [A-Za-z0-9._%+-]+ matches one or more characters that are either letters, digits, or any of the following special characters: ._%+-.
  // @ matches the @ symbol.
  // [A-Za-z0-9.-]+ matches one or more characters that are either letters, digits, or a hyphen -.
  // \. matches a period . character.
  // [A-Za-z]{2,} matches two or more characters that are letters.
  // $ asserts the end of the string.
  // The /i at the end of the regex makes it case-insensitive. Therefore, it will match email addresses regardless of whether they are in uppercase or lowercase.


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
    dispatch(addUserInfo({ data }));
    setAskSave(false);
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
      !confirmPassword ||
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
        if (password === confirmPassword) {
          // setAsk(true);
          // setDialogTitle("Save the record?");
          // setDialogContentText(
          //   "Upon proceeding, the modifications on the record \nmade will be saved."
          // );
          if (isEmailValid) {
            setAskSave(true);
            setDialogTitleSave("Save the record?");
            setDialogContentTextSave(
              "Upon proceeding, the modifications on the record \nmade will be saved."
            );
          }
          else {
            handleClickSnackpack("Please enter a valid information.", "error")();
          }
        }
        else {
          handleClickSnackpack("Please enter a valid information.", "error")();
        }
      }
      else {
        handleClickSnackpack("Please enter a valid information.", "error")();
      }
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
    setDialogContentText("The record will be discarded and will not be saved. \n Are you sure you want to leave this page?");
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <>
      <div className={CreateUserStyle.mainContainer}>
        <div className={CreateUserStyle.mainHolder}>
          <div className={CreateUserStyle.contentHolder}>
            <div className={CreateUserStyle.mainForm}>
              <div className={CreateUserStyle.leftFormPlaceHolder}>
                <div className={CreateUserStyle.profileHolder}>
                  <div className={CreateUserStyle.imgContainer}>
                    {/* Display the selected image */}
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className={CreateUserStyle.imgSize}
                      />
                    ) : (
                      <img
                        src={defaultProfile}
                        alt="Placeholder"
                        className={CreateUserStyle.imgSize}
                      />
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
                        className={CreateUserStyle.updateImageButton}
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
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={CreateUserStyle.formProfileContainer}>
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
                          formSubmitted && assocID === ""
                            ? "Associate ID required"
                            : ""
                        }
                        variant="outlined"
                        size="small"
                        // placeholder="Associate ID"
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
                        // placeholder="Username"
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
                        <FormHelperText>
                          Employee Status required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                </div>
              </div>
              {/* Start of other Form */}
              <div className={CreateUserStyle.otherFormContainer}>
                <div className={CreateUserStyle.otherFormPlaceholder}>
                  <div className={CreateUserStyle.form}>
                    {/* Start of Name Form  */}
                    <div className={CreateUserStyle.nameForm}>
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
                          // placeholder="First Name"
                          sx={{ flex: 1, display: "flex", width: "100%" }}
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
                          // placeholder="Middle Name"
                          sx={{ flex: 1, display: "flex", width: "100%" }}
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
                          // placeholder="Last Name"
                          sx={{ flex: 1, display: "flex", width: "100%" }}
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
                          sx={{ width: "100%" }}
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
                            {"<Select position>"}
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
                          sx={{ width: "100%" }}
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
                          startAdornment={
                            <InputAdornment position="start">
                              <GroupsOutlinedIcon />
                            </InputAdornment>
                          }
                        >
                          {/* <MenuItem key={0} value={0}>
                            {"<Select a role>"}
                          </MenuItem> */}
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
                    <div className={CreateUserStyle.formHolder}>
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
                          // error={
                          //   (formSubmitted && email === "") 
                          //   // || 
                          //   // (formSubmitted && !isEmailValid)
                          // }
                          error={formSubmitted && (email === "" || !isEmailValid)}
                          helperText={
                            (formSubmitted && email === "" ? "Email required" : "") ||
                            (formSubmitted && !isEmailValid ? "Please enter a valid email 2" : "")
                          }
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1, display: "flex", width: "100%" }}
                          // placeholder="Email"
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
                          sx={{ width: "100%" }}
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
                            {"<Select department>"}
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
                          sx={{ width: "100%" }}
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
                          <FormHelperText>
                            Business Unit required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>

                    {/* Start of Password Form */}
                    <div className={CreateUserStyle.formHolder}>
                      <FormControl
                        sx={{
                          width: "27.5%",
                          "@media (max-width: 850px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <TextField
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          error={
                            (formSubmitted && password === "") ||
                            (formSubmitted && password.toString().length < 6) ||
                            (formSubmitted && password !== confirmPassword)
                          }
                          helperText={
                            (formSubmitted && password === ""
                              ? "Password required"
                              : "") ||
                            (formSubmitted && password.toString().length < 6
                              ? "Password should be 6 or more characters"
                              : "") ||
                            (formSubmitted && password !== confirmPassword
                              ? "Password fields do not match"
                              : "")
                          }
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1, display: "flex", width: "100%" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormControl>

                      <FormControl
                        sx={{
                          width: "27.5%",
                          "@media (max-width: 850px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <TextField
                          label="Confirm password"
                          type={showConfirmPassword ? "text" : "password"}
                          error={
                            (formSubmitted && confirmPassword === "") ||
                            (formSubmitted && password.toString().length < 6) ||
                            (formSubmitted && password !== confirmPassword)
                          }
                          helperText={
                            (formSubmitted && confirmPassword === ""
                              ? "Password confirmation required"
                              : "") ||
                            (formSubmitted && password.toString().length < 6
                              ? "Password should be 6 or more characters"
                              : "") ||
                            (formSubmitted && password !== confirmPassword
                              ? "Password fields do not match"
                              : "")
                          }
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1, display: "flex", width: "100%" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownConfirmPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </FormControl>

                      {/* <FormControl
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
                        <TextField
                          label="Confirm Password"
                          type={showPassword ? 'text' : 'password'}
                          error={formSubmitted && assocID === ""}
                          helperText={
                            formSubmitted && assocID === "" ? "Password is required" : ""
                          }
                          variant="outlined"
                          size="small"
                          className={CreateUserStyle.textFieldProfile}
                          InputProps={{
                            sx: { height: 40 },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                    onClick={handleSave}
                  >
                    SAVE
                  </Button>

                  <Button
                    variant="text"
                    className={CreateUserStyle.cancelButton}
                    onClick={handleCancel}
                    sx={{
                      backgroundColor: "#e0e0e0",
                      "&:hover": { backgroundColor: "#c0c0c0" },
                    }}
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
              <div>
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
                      Leave this page
                    </Button>
                    <Button
                      onClick={() => {
                        setAsk(false);
                      }}
                    >
                      Cancel
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
                      Continue Editing
                    </Button>
                  </DialogActions>

                </Dialog>
              </div>
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
