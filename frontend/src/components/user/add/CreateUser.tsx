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
    <body>
      <div className={CreateUserStyle.mainContainer}>
        <div style={{ width: "97%", paddingBottom: '1%' }}>
          <div className={CreateUserStyle.pageTitle}>
            <span>
              <AccountTreeOutlinedIcon fontSize="large" />
            </span>
            <span
              style={{ fontSize: "1.8rem", color: "black", fontWeight: "600" }}
            >
              {" "}
              CREATE USER{" "}
            </span>
          </div>
        </div>

        <div className={CreateUserStyle.midContent}>
          {/* for breadcrumbs */}
          <div
            style={{
              // border: "1px solid red",
              paddingBottom: "1%",
              width: "80%",
              height: "75%",
              paddingLeft: '1%',
              marginLeft: '1.5%',
              position: "relative",
              top: "3%",
              alignSelf: "center",
            }}
            role="presentation"
            onClick={handleClick}
          >
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link
                to="/User"
                className={`${CreateUserStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                User
              </Link>
              <Link
                to="/createUser"
                className={`${CreateUserStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                Create User
              </Link>
            </Breadcrumbs>
          </div>
        </div>

        <div className={CreateUserStyle.contentContainer}>
          <div className={CreateUserStyle.mainForm}>
            <div className={CreateUserStyle.formRow1}>
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
            </div>
            <div className={CreateUserStyle.formRow2}>
              <FormControl className={CreateUserStyle.assocId}>
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
              <FormControl className={CreateUserStyle.position}>
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
            <div className={CreateUserStyle.formRow3}>
              <FormControl className={CreateUserStyle.fname}>
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
              <FormControl className={CreateUserStyle.mname}>
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
            <div className={CreateUserStyle.formRow4}>
              <FormControl className={CreateUserStyle.email}>
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
            <div className={CreateUserStyle.formRow5}>
              <FormControl className={CreateUserStyle.email}>
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
              <div>
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
            </div>
            <div className={CreateUserStyle.formRow6}>
              <FormControl className={CreateUserStyle.email}>
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
                <div className={CreateUserStyle.department}>
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
                </div>
              </Box>
            </div>
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
    </body>
  );
}
