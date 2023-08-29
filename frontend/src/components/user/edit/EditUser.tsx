import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserDetailStyle from "./EditUser.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, FormLabel, InputAdornment, MenuItem, Select, SelectChangeEvent, } from '@mui/material';
import React, { useState } from "react";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Breadcrumb from '../../breadcrumbs/breadcrumbs';
import { useLocation } from "react-router-dom";




export default function EditUser() {

  const location = useLocation();
  const row = location.state;

  const [assocID, setAssocID] = useState(row.assocID);
  const [username, setUsername] = useState(row.username);
  const [firstName, setFirstName] = useState(row.firstName);
  const [middleName, setMiddleName] = useState(row.middleName);
  const [lastName, setLastName] = useState(row.lastName);
  const [position, setPosition] = useState(row.position);
  const [email, setEmail] = useState(row.email);
  const [department, setDepartment] = useState(row.department);
  const [businessUnit, setBusinessUnit] = useState(row.businessUnit);


  //FOR DROPDOWN CONFIG (DEPARTMENT)
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  const breadcrumbItems = [
    { label: 'Login Page', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/userhandler' },
  ];



  return (

    <div className={UserDetailStyle.mainContainer}>
      <div className={UserDetailStyle.heading}>
        <FontAwesomeIcon icon={faUser} size="2x" color='black' />
        <div className={UserDetailStyle.textContainer}>
          <span style={{ fontSize: "4vh", color: "black" }}> Edit User Details </span>
        </div>
      </div>
      <div className={UserDetailStyle.breadCrumbs}>
        <p>SAMPLE BREADCRUMBS <Breadcrumb items={breadcrumbItems} /></p>
      </div>

      <div className={UserDetailStyle.contentContainer}>
        <div className={UserDetailStyle.mainForm}>
          <div className={UserDetailStyle.formRow1}>
            <FormControl className={UserDetailStyle.formUsername}>
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
          </div>

          {/* <div>
            <h2>User Details</h2>
            <p>Name: {row.name}</p>
            <p>Calories: {row.calories}</p>
            <p>Fat: {row.fat}</p>
          </div> */}

          <div className={UserDetailStyle.formRow2}>
            <FormControl className={UserDetailStyle.assocId}>
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
            <FormControl className={UserDetailStyle.position}>
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
          <div className={UserDetailStyle.formRow3}>
            <FormControl className={UserDetailStyle.fname}>
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
            <FormControl className={UserDetailStyle.mname}>
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
            <FormControl className={UserDetailStyle.lname}>
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
          <div className={UserDetailStyle.formRow4}>
            <FormControl className={UserDetailStyle.email}>
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
          <div className={UserDetailStyle.formRow5}>
            <FormControl className={UserDetailStyle.role}>
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
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              style={{ textTransform: "none" }}
            >
              Add Role
            </Button>
          </div>
          <div className={UserDetailStyle.formRow6}>
            <FormControl className={UserDetailStyle.email}>
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


    


              <div className={UserDetailStyle.department}>
                <FormControl variant="outlined" size="small">
                  <FormLabel>Department</FormLabel>
                  {/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
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
                    <MenuItem value={1}>department I</MenuItem>
                    <MenuItem value={2}>department II</MenuItem>
                    <MenuItem value={3}>department III</MenuItem>
                    <MenuItem value={4}>department IV</MenuItem>

                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
          <div className={UserDetailStyle.formRow7}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveOutlinedIcon />}
              style={{ textTransform: "none" }}
            >
              SAVE
            </Button>
            <Button
              variant="contained"
              startIcon={<CancelOutlinedIcon />}
              style={{ textTransform: "none", backgroundColor: "gray" }}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
