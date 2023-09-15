import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CreateUserStyle from "./CreateUser.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent, 
  DialogTitle,
  FormControl,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Link } from "react-router-dom";
import AddRoleTable from "../AddRoleTable";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";


//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CreateUser() {
  //FOR DROPDOWN CONFIG (DEPARTMENT)
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const breadcrumbItems = [
    { label: "Users", href: "user" },
    { label: "Add new user", href: "/CreateUser" },
  ];


  //for add role popup (dialog)
  const [open, setOpen] = React.useState(false);

  const [openRole, setOpenRole] = React.useState(false); 

  const handleClickOpenRole= () => {
    setOpenRole(true);
  };

  const handleCloseRole = () => {
    setOpenRole(false);
  }; 


  return (
  <div className={CreateUserStyle.mainContainer}>
      <div className={CreateUserStyle.mainHolder}>

        {/* Start of Form */}
        <div className={CreateUserStyle.contentHolder}>
          <div className={CreateUserStyle.mainForm}>

            {/* Start of Username */}
            <FormControl className={CreateUserStyle.formUsername}>
              <FormLabel
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "black",
                  fontWeight: "400",
                }}
              >
                Username
              </FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Username"
                className={CreateUserStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
              
            {/* Start of Associate ID and Position */}
            <div className={CreateUserStyle.formRow2}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Associate ID
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Associate ID"
                  className={CreateUserStyle.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl >
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Position
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Position"
                  className={CreateUserStyle.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonPinOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>

            {/* Start of Full Name */}
            <div className={CreateUserStyle.formRow3}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  First Name
                </FormLabel>
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
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Middle Name
                </FormLabel>
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
                />
              </FormControl>
              <FormControl className={CreateUserStyle.lname}>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Last Name
                </FormLabel>
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
                />
              </FormControl>
            </div>

            {/* Start of Email */}
            <div className={CreateUserStyle.formRow4}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Email
                </FormLabel>
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
                />
              </FormControl>
            </div>

            {/* Start of Role */}
            <div className={CreateUserStyle.formRow5}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Role
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Role"
                  className={CreateUserStyle.textField}
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
                style={{
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
                onClick={handleClickOpenRole}
                >
                Add Role
              </Button>
            </div>

            {/* Start of Business Unit and Department */}
            <div className={CreateUserStyle.formRow6}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Business Unit
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Business Unit"
                  className={CreateUserStyle.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupsOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Box>
                <FormControl variant="outlined" size="small">
                  <FormLabel
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "black",
                      fontWeight: "400",
                    }}
                  >
                    Department
                  </FormLabel>
                  {/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    className={CreateUserStyle.textField}
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
              </Box>
            </div>

            {/* Start of Button */}
            <div className={CreateUserStyle.formRow7}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveOutlinedIcon />}
                style={{
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                SAVE
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelOutlinedIcon />}
                style={{
                  textTransform: "none",
                  backgroundColor: "gray",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                CANCEL
              </Button>
            </div>
          </div>
      

          <Dialog
            open={openRole}
            onClose={handleCloseRole}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="xl"
          >
            <DialogTitle sx={{display: 'flex', gap: '1vw', alignItems:'center', justifyContent:'flex-start'}}>
              <PersonSearchOutlinedIcon/>
              {"Roles"}
            </DialogTitle>
            <DialogContent>
              <AddRoleTable />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRole} sx={{ fontFamily: 'Montserrat, sans-serif' }}>Cancel</Button>
              <Button onClick={handleCloseRole} sx={{ fontFamily: 'Montserrat, sans-serif' }}>Add</Button>
            </DialogActions>
          </Dialog>

        </div>
      </div> 
    </div> 
  );
}
