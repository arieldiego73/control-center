import TestStyle from "./test2.module.css";
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
import { RootState } from "../../redux/store/store";
import HelpIcon from "@mui/icons-material/Help";
import { getDepartmentFetch } from "../../redux/state/departmentState";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//for breadcrumbs
import { getSectionFetch } from "../../redux/state/sectionState";
import { getRolesFetch } from "../../redux/state/roleState";
import { getPositionFetch } from "../../redux/state/positionState";
import { addUserInfo } from "../../redux/saga/userSaga";
import user from "../../Assets/userImage.png";

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

export default function Test() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRoles, setSelectedRoles] = React.useState<number[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
    const {
      target: { value },
    } = event;
    setSelectedRoles(event.target.value as number[]);
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
  const [empStatus, setEmpStatus] = useState("");
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
      selectedRoles: selectedRoles,
    };
    console.log("data", data);
    dispatch(addUserInfo({ data }));
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
    <div className={TestStyle.mainContainer}>
      <div className={TestStyle.mainHolder}>
        {/* Start of Form */}
        <div className={TestStyle.contentHolder}>
          <div className={TestStyle.mainForm}>
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                width: "19.68%",
                height: "600px",
              }}
            >
              {/* Start of Profile */}
              <div
                style={{
                  width: "15vw",
                  height: "15vw",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  alt=""
                  src={user}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              {/* Start of Form */}
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                 {/* Start of username form */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormControl
                    style={{
                      paddingTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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

            <div style={{  width: "80%", height: "600px",}}>
              <div style={{justifyContent:'center', display:"flex", width:'100%', height:'90%',  }}>
              
                <div style={{padding:'1%', height:'80%', width:'95%', display:'flex', flexDirection:'column', gap: "5%"}}>
                  {/* Start of Name Form */}
                  <div  style={{display: "flex", justifyContent: "flex-start", gap: '5vw',}}>
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
                  <div  style={{display: "flex", justifyContent: "flex-start", gap: '5vw', paddingTop:'1%'}}>
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

                  {/* Start of Email Form */}
                  <div  style={{display: "flex", justifyContent: "flex-start", gap: '5vw', paddingTop:'1%'}}>
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
                  <div  style={{display: "flex", justifyContent: "flex-start", gap: '5vw', paddingTop:'1%'}}>
                    <FormControl variant="outlined" size="small">
                      <FormLabel>Department</FormLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={businessUnit}
                        onChange={(e) =>
                          setBusinessUnit(
                            e.target.value as number
                          )
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
                        value={department} 
                        onChange={(e) =>
                          setDepartment(
                            e.target.value as number
                          )
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
                          <MenuItem
                            key={dept?.dept_id}
                            value={dept?.dept_id}
                          >
                            {dept?.dept_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>   

                   {/* Start of Password and Confirm Password Form */}
                   <div  style={{display: "flex", justifyContent: "flex-start", gap: '5vw', paddingTop:'1%'}}>
                    <FormControl variant="outlined" size="small">
                      <FormLabel>Department</FormLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={businessUnit}
                        onChange={(e) =>
                          setBusinessUnit(
                            e.target.value as number
                          )
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
                        value={department} 
                        onChange={(e) =>
                          setDepartment(
                            e.target.value as number
                          )
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
                          <MenuItem
                            key={dept?.dept_id}
                            value={dept?.dept_id}
                          >
                            {dept?.dept_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>   
                </div>
              </div>
            

              <div className={TestStyle.formRow7}>
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
  );
}

{
  /* <div className={TestStyle.mainContainer}>
<div className={TestStyle.mainHolder}>
 
  <div className={TestStyle.contentHolder}>
    <div className={TestStyle.mainForm}>
     

      <div className={TestStyle.formRow6}>


        <Box>
          
        </Box>
      </div>

  
     

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
</div> */
}
