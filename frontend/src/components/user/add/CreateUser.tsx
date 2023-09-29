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
  FormHelperText,
  InputLabel,
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
    dispatch(addUserInfo({ data }));
    setAsk(false);
  };
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSave = () => {
    setFormSubmitted(true);
    if (
      !assocID ||
      !username ||
      !firstName ||
      !lastName ||
      !position ||
      !email ||
      !department ||
      !businessUnit ||
      !empStatus ||
      selectedRoles.length === 0
    ) {
      handleClickSnackpack(
        "Associate ID is required. Please, try again.",
        "error"
      )();
    } else if (
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

  // const handleSave = () => {
  //   if (
  //     assocID &&
  //     username &&
  //     firstName &&
  //     lastName &&
  //     position &&
  //     email &&
  //     department &&
  //     businessUnit &&
  //     empStatus !== "0" &&
  //     selectedRoles.length > 0
  //   ) {
  //     setAsk(true);
  //     setDialogTitle("Save the record?");
  //     setDialogContentText(
  //       "Upon proceeding, the modifications on the record \nmade will be saved."
  //     );
  //     setIsSaving(true);
  //   } else {
  //     if (assocID === null) {
  //       // Trigger error for assocID being null
  //       // You can display an error message or handle it as needed.
  //       handleClickSnackpack(
  //         "Associate ID is required. Please, try again.",
  //         "error"
  //       )();
  //     }
  //     handleClickSnackpack(
  //       "All fields are required. Please, try again.",
  //       "error"
  //     )();
  //   }
  // };

  const handleCancel = () => {
    setAsk(true);
    setDialogTitle("Cancel the edit?");
    setDialogContentText("The record will be discarded and will not be saved.");
    setIsSaving(false);
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
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Edit Profile
                      <VisuallyHiddenInput type="file" />
                    </Button>
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
                          formSubmitted && assocID === "" ? "Missing field" : ""
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
                            ? "Missing field"
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
                        {/* <MenuItem key={0} value={"0"}>
                          {"<Select status>"}
                        </MenuItem> */}
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
                        <FormHelperText>Select a status</FormHelperText>
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
                              ? "Missing field"
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
                              ? "Missing field"
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
                          <FormHelperText>Select a status</FormHelperText>
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
                          <FormHelperText>Select a status</FormHelperText>
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
                        error={formSubmitted && email === ""}
                        helperText={
                       formSubmitted && email === ""
                       ? "Missing field"
                       : ""
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
  <FormHelperText>Select a status</FormHelperText>
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
<<<<<<< HEAD
                        {formSubmitted && businessUnit === 0 && (
  <FormHelperText>Select a status</FormHelperText>
  )}
                      </FormControl>
=======
                      </FormControl> 
>>>>>>> fa074b3a5112a064181770bc8e84826b0c184b2b
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
