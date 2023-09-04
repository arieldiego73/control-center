import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CreateUserStyle from "./CreateUser.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, FormLabel, InputAdornment, MenuItem, Select, SelectChangeEvent, } from '@mui/material';
import React from "react";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Breadcrumb from '../../breadcrumbs/breadcrumbs';


export default function CreateUser() {


    //FOR DROPDOWN CONFIG (DEPARTMENT)
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    const breadcrumbItems = [
        { label: 'Users', href: 'user' },
        { label: 'Add new user', href: '/CreateUser' },
    ];

    return (
        <body>

            <div className={CreateUserStyle.mainContainer}>
                <div className={CreateUserStyle.heading}>
                    <FontAwesomeIcon icon={faUser} size="2x" color='black' />
                    <div className={CreateUserStyle.textContainer}>
                        <span style={{ fontSize: "4vh", color: "black" }}> Add New User </span>
                    </div>
                </div>
                <div className={CreateUserStyle.breadCrumbs}>
                    <p> <Breadcrumb items={breadcrumbItems} /></p>
                </div>

                <div className={CreateUserStyle.contentContainer}>
                    <div className={CreateUserStyle.mainForm}>
                        <div className={CreateUserStyle.formRow1}>
                            <FormControl className={CreateUserStyle.formUsername}>
                                <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Username</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Associate ID</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Position</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>First Name</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Middle Name</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Last Name</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Email</FormLabel>
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
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Role</FormLabel>
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
                                style={{ textTransform: "none", fontFamily: "Montserrat, sans-serif"  }}
                            >
                                Add Role
                            </Button>
                        </div>
                        <div className={CreateUserStyle.formRow6}>
                            <FormControl className={CreateUserStyle.email}>
                                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Business Unit</FormLabel>
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
                                         <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif', color:"black", fontWeight:"400" }}>Department</FormLabel>
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
                                style={{ textTransform: "none" , fontFamily: 'Montserrat, sans-serif'}}
                            >
                                SAVE
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<CancelOutlinedIcon />}
                                style={{ textTransform: "none", backgroundColor: "gray" , fontFamily: 'Montserrat, sans-serif'}}
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
