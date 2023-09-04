import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EditProjectStyle from "./EditProjectStyle.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumb from "../../breadcrumbs/breadcrumbs";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddMemberTable from "../new_project/AddMemberTable";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NewProj() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const [age, setAge] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const breadcrumbItems = [
    { label: "Projects", href: "/project" },
    { label: "Edit project", href: "/editPtoject" },
  ];

  const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

  return (
    <body>
      
    <div className={EditProjectStyle.mainContainer}>
      <div className={EditProjectStyle.heading}>
        <div className={EditProjectStyle.pageTitle}>
            <span><AccountTreeOutlinedIcon fontSize="large"/></span>
            <span style={{ fontSize: "1.8rem", color: "black", fontWeight:"600" }}> EDIT PROJECT DETAILS </span>
          </div>
      </div>
      <div className={EditProjectStyle.breadCrumbs}>
        <p>
          <Breadcrumb items={breadcrumbItems} />
        </p>
      </div>

      <div
        className={EditProjectStyle.contentContainer}
        style={{ maxHeight: "65vh", overflowY: "auto" }}
      >
        <div className={EditProjectStyle.mainForm}>
          <div className={EditProjectStyle.formRow1}>
            <FormControl className={EditProjectStyle.formUsername}>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Project Name</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Project Name"
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
          </div>
          <div className={EditProjectStyle.formRow2}>
            <div style={{ flexDirection: "column", display: "flex" }}>
              <div style={{ width: "38%" }}>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: "wrap",
                  }}
                >
                  <StyledToggleButtonGroup
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="left" aria-label="left aligned">
                      <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                      <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                      <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="justify"
                      aria-label="justified"
                      disabled
                    >
                      <FormatAlignJustifyIcon />
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ mx: 0.5, my: 1 }}
                  />
                  <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                  >
                    <ToggleButton value="bold" aria-label="bold">
                      <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="italic">
                      <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton value="underlined" aria-label="underlined">
                      <FormatUnderlinedIcon />
                    </ToggleButton>
                    <ToggleButton value="color" aria-label="color" disabled>
                      <FormatColorFillIcon />
                      <ArrowDropDownIcon />
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </Paper>
              </div>
              <FormControl className={EditProjectStyle.assocId}>
                <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Description</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Description"
                  className={EditProjectStyle.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
          </div>
          <div className={EditProjectStyle.formRow3}>
            <FormControl className={EditProjectStyle.fname}>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={EditProjectStyle.mname}>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>End Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div className={EditProjectStyle.formRow5}>
            <FormControl className={EditProjectStyle.email}>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Project Manager</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Project Manager"
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
              style={{ textTransform: "none" , fontFamily: 'Montserrat, sans-serif'}}
            >
              Add Project Manager
            </Button>
          </div>

          <div className={EditProjectStyle.formRow6}>
            <FormControl className={EditProjectStyle.email}>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Client Name</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Client Name"
                className={EditProjectStyle.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupsOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>

          {/* FOR TESTING SCROLL VIEW ONLY!! */}

          <div className={EditProjectStyle.formRow6}>
            <FormLabel style={{ paddingTop: ".5%" , fontFamily: 'Montserrat, sans-serif' }}>
              Development Phase
            </FormLabel>
            <FormGroup style={{ flexDirection: "row", display: "flex" , fontFamily: 'Montserrat, sans-serif'}}>
              <FormControlLabel control={<Checkbox />} label="RQS" />
              <FormControlLabel control={<Checkbox />} label="BD" />
              <FormControlLabel control={<Checkbox />} label="DD" />
              <FormControlLabel control={<Checkbox />} label="CD" />
              <FormControlLabel control={<Checkbox />} label="UT" />
              <FormControlLabel control={<Checkbox />} label="CT" />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="UAT"
              />
              <FormControlLabel control={<Checkbox />} label="MAINTENANCE" />
            </FormGroup>
          </div>

          <div className={EditProjectStyle.formRow5}>
            <FormControl>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Technology</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Technology"
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
              style={{ textTransform: "none" , fontFamily: 'Montserrat, sans-serif'}}
            >
              Add Technology
            </Button>
          </div>

          <div className={EditProjectStyle.formRow5}>
            <FormControl>
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Members</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Members"
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
               onClick={handleClickOpen} 
              variant="contained"
              color="primary"
              startIcon={<Add />}
              style={{ textTransform: "none", fontFamily: 'Montserrat, sans-serif'}}
            >
              Add Members
            </Button>
          </div>

          <div>
            <FormControl variant="outlined" size="small">
              <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Status</FormLabel>
              {/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                className={EditProjectStyle.textField}
                startAdornment={
                  <InputAdornment position="start">
                    <GroupsOutlinedIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* START OF BUTTONS  */}

          <div className={EditProjectStyle.formRow7}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveOutlinedIcon />}
              style={{ textTransform: "none" , fontFamily: 'Montserrat, sans-serif'}}
            >
              SAVE
            </Button>
            <Link to="/project" style={{ textDecoration: "none" , fontFamily: 'Montserrat, sans-serif'}}>
            <Button
              variant="contained"
              startIcon={<CancelOutlinedIcon />}
              style={{ textTransform: "none", backgroundColor: "gray" , fontFamily: 'Montserrat, sans-serif'}}
            >
              CANCEL
            </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Popup */}
      
				<Dialog
					open={open}
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
				> 
        {/* <div>
          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
        </div> */}
         
					<DialogTitle>
						<FontAwesomeIcon icon={faUser} size="1x" color="black" />
						{"Members"}
					</DialogTitle>
					<DialogContent>
						<AddMemberTable />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} sx={{fontFamily: 'Montserrat, sans-serif'}}>Cancel</Button>
            <Button onClick={handleClose} sx={{fontFamily: 'Montserrat, sans-serif'}}>Save</Button>
					</DialogActions>
				</Dialog>
    </div>
    </body>

  );
}













// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import EditProjectStyle from "./EditProjectStyle.module.css"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Box, FormControl, FormLabel, InputAdornment, MenuItem, Select, SelectChangeEvent, } from '@mui/material';
// import React, { useState } from "react";
// import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
// import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import { Add } from "@mui/icons-material";
// import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import Breadcrumb from '../../breadcrumbs/breadcrumbs';
// import { useLocation } from "react-router-dom";
// import { idID } from "@mui/material/locale";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";




// export default function EditProject() {

//   const location = useLocation();

//   const row = location.state;

//   const [id, setId] = useState(row.id);
//   const [projectName, setProjectName] = useState(row.projectName);
//   const [projectManager, setProjectManager] = useState(row.projectManager);
//   const [client, setClient] = useState(row.client);
//   const [duration, setDuration] = useState(row.duration);
//   const [developmentType, setDevelopmentType] = useState(row.developmentType);
//   const [developmentPhase, setDevelopmentPhase] = useState(row.developmentPhase);
//   const [technologies, setTechnologies] = useState(row.technoloies);
//   const [members, setMembers] = useState(row.members);
//   const [status, setStatus] = useState(row.status);



//   //FOR DROPDOWN CONFIG (DEPARTMENT)
//   const [age, setAge] = React.useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };


//   const breadcrumbItems = [
//     { label: 'Projects', href: '/project' },
//     { label: 'Edit project details', href: '/editProject/:projectName' },

//   ];



//   return (
//     <body>
//       <div className={EditProjectStyle.mainContainer}>
//         <div className={EditProjectStyle.heading}>
//           <FontAwesomeIcon icon={faUser} size="2x" color='black' />
//           <div className={EditProjectStyle.textContainer}>
//             <span style={{ fontSize: "4vh", color: "black" }}> Edit Project Details </span>
//           </div>
//         </div>
//         <div className={EditProjectStyle.breadCrumbs}>
//           <p><Breadcrumb items={breadcrumbItems} /></p>
//         </div>

//         <div className={EditProjectStyle.contentContainer}>
//           <div className={EditProjectStyle.mainForm}>
//             <div className={EditProjectStyle.formRow1}>
//               <FormControl className={EditProjectStyle.formUsername}>
//                 <FormLabel>Project ID</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="Username"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PermIdentityOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={id} // Bind value to state
//                   onChange={(e) => setId(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//             </div>

//             {/* <div>
//             <h2>User Details</h2>
//             <p>Name: {row.name}</p>
//             <p>Calories: {row.calories}</p>
//             <p>Fat: {row.fat}</p>
//           </div> */}

//             <div className={EditProjectStyle.formRow2}>
//               <FormControl className={EditProjectStyle.assocId}>
//                 <FormLabel>Project Name</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="Associate ID"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <AssignmentIndOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={projectName} // Bind value to state
//                   onChange={(e) => setProjectName(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//               <FormControl className={EditProjectStyle.fname}>
//                 <FormLabel>Client Name</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="First Name"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PermIdentityOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={client} // Bind value to state
//                   onChange={(e) => setClient(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//               <FormControl className={EditProjectStyle.position}>
//                 <FormLabel>Project Manager</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PermIdentityOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={projectManager} // Bind value to state
//                   onChange={(e) => setProjectManager(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//             </div>
//             <div className={EditProjectStyle.formRow3}>
//               <FormControl className={EditProjectStyle.sDate}>
//                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Start Date</FormLabel>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker />
//                 </LocalizationProvider>
//               </FormControl>
//               <FormControl className={EditProjectStyle.eDate}>
//                 <FormLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>End Date</FormLabel>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker />
//                 </LocalizationProvider>
//               </FormControl>
//             </div>

//             <div className={EditProjectStyle.formRow4}>
//               <FormControl className={EditProjectStyle.members}>
//                 <FormLabel>Member(s)</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PermIdentityOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </FormControl>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<Add />}
//                 style={{ textTransform: "none" }}
//               >
//                 Add Member
//               </Button>
//             </div>


//             <div className={EditProjectStyle.formRow5}>
//               <FormControl className={EditProjectStyle.email}>
//                 <FormLabel>Development Phase</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="Email"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <EmailOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={developmentPhase} // Bind value to state
//                   onChange={(e) => setDevelopmentPhase(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//               <FormControl className={EditProjectStyle.lname}>
//                 <FormLabel>Development Type</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="Last Name"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PermIdentityOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={developmentType} // Bind value to state
//                   onChange={(e) => setDevelopmentPhase(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//               <FormControl className={EditProjectStyle.email}>
//                 <FormLabel>Technologies</FormLabel>
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="Business Unit"
//                   className={EditProjectStyle.textField}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <GroupsOutlinedIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={technologies} // Bind value to state
//                   onChange={(e) => setTechnologies(e.target.value)} // Update state on change
//                 />
//               </FormControl>
//             </div>
//             {/* <div className={EditProjectStyle.formRow5}>
//             <FormControl className={EditProjectStyle.role}>
//               <FormLabel>Role</FormLabel>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 placeholder="Role"
//                 className={EditProjectStyle.textField}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PermIdentityOutlinedIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </FormControl>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<Add />}
//               style={{ textTransform: "none" }}
//             >
//               Add Role
//             </Button>
//           </div> */}
//             <div className={EditProjectStyle.formRow6}>
//               <Box>
//                 <div className={EditProjectStyle.department}>
//                   <FormControl variant="outlined" size="small">
//                     <FormLabel>Status</FormLabel>
//                     {/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       value={status} // Bind value to state
//                       onChange={(e) => setStatus(e.target.value)}
//                       className={EditProjectStyle.textField}
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <GroupsOutlinedIcon />
//                         </InputAdornment>
//                       }
//                     >
//                       <MenuItem value={1}>in progress</MenuItem>
//                       <MenuItem value={2}>done</MenuItem>
//                       <MenuItem value={3}>to do</MenuItem>

//                     </Select>
//                   </FormControl>
//                 </div>
//               </Box>
//             </div>
//             <div className={EditProjectStyle.formRow7}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SaveOutlinedIcon />}
//                 style={{ textTransform: "none" }}
//               >
//                 SAVE
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<CancelOutlinedIcon />}
//                 style={{ textTransform: "none", backgroundColor: "gray" }}
//               >
//                 CANCEL
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </body>
//   )
// }
