import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EditProjectStyle from "./EditProjectStyle.module.css"
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
import { idID } from "@mui/material/locale";




export default function EditProject() {

  const location = useLocation();

  const row = location.state;

  const [id, setId] = useState(row.id);
  const [projectName, setProjectName] = useState(row.projectName);
  const [projectManager, setProjectManager] = useState(row.projectManager);
  const [client, setClient] = useState(row.client);
  const [duration, setDuration] = useState(row.duration);
  const [developmentType, setDevelopmentType] = useState(row.developmentType);
  const [developmentPhase, setDevelopmentPhase] = useState(row.developmentPhase);
  const [technologies, setTechnologies] = useState(row.technoloies);
  const [members, setMembers] = useState(row.members);
  const [status, setStatus] = useState(row.status);



  //FOR DROPDOWN CONFIG (DEPARTMENT)
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  const breadcrumbItems = [
    { label: 'Projects', href: '/project' },
    { label: 'Edit project details', href: '/editProject/:projectName' },

  ];



  return (
<body>
    <div className={EditProjectStyle.mainContainer}>
      <div className={EditProjectStyle.heading}>
        <FontAwesomeIcon icon={faUser} size="2x" color='black' />
        <div className={EditProjectStyle.textContainer}>
          <span style={{ fontSize: "4vh", color: "black" }}> Edit Project Details </span>
        </div>
      </div>
      <div className={EditProjectStyle.breadCrumbs}>
        <p><Breadcrumb items={breadcrumbItems} /></p>
      </div>

      <div className={EditProjectStyle.contentContainer}>
        <div className={EditProjectStyle.mainForm}>
          <div className={EditProjectStyle.formRow1}>
            <FormControl className={EditProjectStyle.formUsername}>
              <FormLabel>Project ID</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Username"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={id} // Bind value to state
                onChange={(e) => setId(e.target.value)} // Update state on change
              />
            </FormControl>
          </div>

          {/* <div>
            <h2>User Details</h2>
            <p>Name: {row.name}</p>
            <p>Calories: {row.calories}</p>
            <p>Fat: {row.fat}</p>
          </div> */}

          <div className={EditProjectStyle.formRow2}>
            <FormControl className={EditProjectStyle.assocId}>
              <FormLabel>Project Name</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Associate ID"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={projectName} // Bind value to state
                onChange={(e) => setProjectName(e.target.value)} // Update state on change
              />
            </FormControl>
            <FormControl className={EditProjectStyle.position}>
              <FormLabel>Project Manager</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={projectManager} // Bind value to state
                onChange={(e) => setProjectManager(e.target.value)} // Update state on change
              />
            </FormControl>
          </div>
          <div className={EditProjectStyle.formRow3}>
            <FormControl className={EditProjectStyle.fname}>
              <FormLabel>Client Name</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="First Name"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={client} // Bind value to state
                onChange={(e) => setClient(e.target.value)} // Update state on change
              />
            </FormControl>
            <FormControl className={EditProjectStyle.mname}>
              <FormLabel>Duration</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Middle Name"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={duration} // Bind value to state
                onChange={(e) => setDuration(e.target.value)} // Update state on change
              />
            </FormControl>
            <FormControl className={EditProjectStyle.lname}>
              <FormLabel>Development Type</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Last Name"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={developmentType} // Bind value to state
                onChange={(e) => setDevelopmentPhase(e.target.value)} // Update state on change
              />
            </FormControl>
          </div>
          <div className={EditProjectStyle.formRow4}>
            <FormControl className={EditProjectStyle.email}>
              <FormLabel>Development Phase</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Email"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={developmentPhase} // Bind value to state
                onChange={(e) => setDevelopmentPhase(e.target.value)} // Update state on change
              />
            </FormControl>
          </div>
          {/* <div className={EditProjectStyle.formRow5}>
            <FormControl className={EditProjectStyle.role}>
              <FormLabel>Role</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Role"
                className={EditProjectStyle.textField}
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
          </div> */}
          <div className={EditProjectStyle.formRow6}>
            <FormControl className={EditProjectStyle.email}>
              <FormLabel>Technologies</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Business Unit"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupsOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                value={technologies} // Bind value to state
                onChange={(e) => setTechnologies(e.target.value)} // Update state on change
              />
            </FormControl>
            <Box>
              <div className={EditProjectStyle.department}>
                <FormControl variant="outlined" size="small">
                  <FormLabel>Status</FormLabel>
                  {/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status} // Bind value to state
                    onChange={(e) => setStatus(e.target.value)}
                    className={EditProjectStyle.textField}
                    startAdornment={
                      <InputAdornment position="start">
                        <GroupsOutlinedIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value={1}>in progress</MenuItem>
                    <MenuItem value={2}>done</MenuItem>
                    <MenuItem value={3}>to do</MenuItem>

                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
          <div className={EditProjectStyle.formRow7}>
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
    </body>
  )
}
