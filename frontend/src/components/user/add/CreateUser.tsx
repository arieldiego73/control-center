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
        { label: 'Login Page', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Users', href: '/userhandler' },
    ];

    return (

        <div className={CreateUserStyle.mainContainer}>
                <div className={CreateUserStyle.heading}>
                    <FontAwesomeIcon icon={faUser} size="2x" color='black' />
                    <div className={CreateUserStyle.textContainer}>
                        <span style={{ fontSize: "4vh", color: "black" }}> Add New User </span>
                    </div>
                </div>
                <div className={CreateUserStyle.breadCrumbs}>
                     <p>SAMPLE BREADCRUMBS <Breadcrumb items={breadcrumbItems} /></p>
                </div>

                <div className={CreateUserStyle.contentContainer}>
                    <div className={CreateUserStyle.mainForm}>
                        <div className={CreateUserStyle.formRow1}>
                            <FormControl className={CreateUserStyle.formUsername}>
                                <FormLabel>Username</FormLabel>
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
                                <FormLabel>Associate ID</FormLabel>
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
                                <FormLabel>Position</FormLabel>
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
                                <FormLabel>First Name</FormLabel>
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
                                <FormLabel>Middle Name</FormLabel>
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
                                <FormLabel>Last Name</FormLabel>
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
                                <FormLabel>Email</FormLabel>
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
                                <FormLabel>Role</FormLabel>
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
                                style={{ textTransform: "none" }}
                            >
                                Add Role
                            </Button>
                        </div>
                        <div className={CreateUserStyle.formRow6}>
                            <FormControl className={CreateUserStyle.email}>
                                <FormLabel>Business Unit</FormLabel>
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
                                        <FormLabel>Department</FormLabel>
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
