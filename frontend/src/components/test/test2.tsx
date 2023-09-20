import React, { useState } from "react";
import TestStyle from "./test2.module.css";
import imgTest from "../../Assets/imgtest2.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HelpIcon from "@mui/icons-material/Help";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getDepartmentFetch } from "../../redux/state/departmentState";
import { getSectionFetch } from "../../redux/state/sectionState";
import { getRolesFetch } from "../../redux/state/roleState";
import { getPositionFetch } from "../../redux/state/positionState";
import { addUserInfo } from "../../redux/saga/userSaga";
import { addUserReset, clearUserInfo} from "../../redux/state/userState";
import { getUserInfo, getUserRoles, updateUserInfo, } from "../../redux/saga/userSaga";
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
    const userInfoData = useSelector((state: RootState) => state.userReducer.userInfo);
    const [userData, setUserData] = React.useState<typeof userInfoData | null>(null);
  
    React.useEffect(() => {
      setUserData(userInfoData)
    }, [userInfoData])
  
    React.useEffect(() => {
      dispatch(getUserInfo({ userId }));
      dispatch(getUserRoles({ userId }));
      dispatch(getDepartmentFetch());
      dispatch(getSectionFetch());
      dispatch(getRolesFetch());
      dispatch(getPositionFetch());
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
          handleClickSnackpack(
            notice.message,
            notice.severity as AlertColor
          )();
        }
      } else {
        isInitialAmount.current = false;
      }
    }, [notice]);
  
    const [snackPack, setSnackPack] = React.useState<
      readonly SnackbarMessage[]
    >([]);
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
        setSnackPack((prev) => [
          ...prev,
          { message, key: new Date().getTime() },
        ]);
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
          navigate("/user");
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
    const [empStatus, setEmpStatus] = useState("");
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
      dispatch(clearUserInfo());
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
      };
      dispatch(updateUserInfo({ data }));
      setAsk(false);
    };
  
    const handleSave = () => {
      if (
        assocID &&
        username &&
        firstName &&
        middleName &&
        lastName &&
        position &&
        email &&
        department &&
        businessUnit &&
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
        "Modifications made with the record will be \nlost forever."
      );
      setIsSaving(false);
    };

  return (
    <>
      <div className={TestStyle.mainContainer}>
        <div className={TestStyle.mainHolder}>
          {/* Start of Form */}
          <div className={TestStyle.contentHolder}>
            <div className={TestStyle.mainForm}>

              {/* Start of Left Form */}
              <div className={TestStyle.leftFormPlaceHolder}>
                
                {/* Start of Profile */}
                <div className={TestStyle.profileHolder}>
                  <div className={TestStyle.imgContainer}>
                    <img
                      alt=""
                      src={imgTest}
                      className={TestStyle.imgSize}
                    />
                  </div>

                  <div className={TestStyle.toolTip}>
                    <Button
                      className={TestStyle.buttonProfile}
                      component="label"
                      startIcon={<CloudUploadIcon />}
                    >
                      Edit Profile
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </div>
                </div>

                {/* Start of Form of Profile*/}
                <div className={TestStyle.formProfileContainer}>
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
                        className={TestStyle.textFieldProfile}
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
                        className={TestStyle.textFieldProfile}
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
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Employee Status"
                        className={TestStyle.textFieldProfile}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIndOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={empStatus}
                        onChange={(e) => setEmpStatus(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Start of other Form */}
              <div className={TestStyle.otherFormContainer}>
                <div  className={TestStyle.otherFormPlaceholder}>
                  <div className={TestStyle.form}>

                    {/* Start of Name Form */}
                    <div className={TestStyle.nameForm}>
                      <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder="First Name"
                          className={TestStyle.textField}
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
                          className={TestStyle.textField}
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
                          className={TestStyle.textField}
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
                    <div className={TestStyle.formHolder}>
                      <FormControl variant="outlined" size="small">
                        <FormLabel>Position</FormLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={position}
                          onChange={(e) =>
                            setPosition(e.target.value as number)
                          }
                          className={TestStyle.textField}
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
                    <div className={TestStyle.formHolder}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder="Email"
                          className={TestStyle.textField}
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
                    <div className={TestStyle.formHolder}>
                      <FormControl variant="outlined" size="small">
                        <FormLabel>Department</FormLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={department}
                          onChange={(e) =>
                            setDepartment(e.target.value as number)
                          }
                          className={TestStyle.textField}
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
                          className={TestStyle.textField}
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
                    <div className={TestStyle.formHolder}>
                      {/* <FormControl>
                      <FormLabel>Password</FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Password"
                        className={TestStyle.textField}
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
                        className={TestStyle.textField}
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
                <div className={TestStyle.formRow7}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    className={TestStyle.saveButton}
                    onClick={handleSave}
                  >
                    SAVE
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<CancelOutlinedIcon />}
                    className={TestStyle.cancelButton}
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
