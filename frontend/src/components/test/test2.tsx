import { ResponsiveBar } from "@nivo/bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmpStatGraphStyle from "./test2.module.css";
import { Divider } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const data = [
  {
    employee: "Regular",
    status: 0,
  },
  {
    employee: "Trainee",
    status: 500,
  },
  {
    employee: "Intern",
    status: 20,
  },
  {
    employee: "Business Partner",
    status: 30,
  },
];

export default function EmpStatusGraph() {
  return (
    <div className={EmpStatGraphStyle.EmpStatusGraphContainer}>
      <div className={EmpStatGraphStyle.empGraphHolder}>
        {/* Main Container */}
        <div className={EmpStatGraphStyle.card}>
          <div className={EmpStatGraphStyle.textHolder}>
            {/* Text Title */}
            <text className={EmpStatGraphStyle.textTitle}>
              {" "}
              EMPLOYEE STATUS{" "}
            </text>
            <text className={EmpStatGraphStyle.textSubtitle}>
              {" "}
              +15% increase than last month{" "}
            </text>

            <Divider style={{ padding: "1%" }} variant="middle" />

            {/* Information */}
            <div className={EmpStatGraphStyle.infoContainer}>
              <AccessTimeIcon
                style={{
                  color: " grey",
                  fontSize: "15px",
                  paddingRight: ".5%",
                }}
              />
              <text className={EmpStatGraphStyle.textInfo}>
                {" "}
                Updated 4 mins ago{" "}
              </text>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className={EmpStatGraphStyle.graphContainer}>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
          {/* <ResponsiveBar
            data={data}
            keys={["status"]}
            indexBy="employee"
            margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
            padding={0.4}
            valueScale={{ type: "point" }}
            colors="white"
            animate={true}
            enableLabel={false}
            axisTop={null} 
            axisRight={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: "white",
                  },
                },
              },
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import StyleNewProject from "./test2.module.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import {
//   Box,
//   FormControl,
//   FormLabel,
//   InputAdornment,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import imgTest from "../../Assets/imgtest2.png";

// import { styled, alpha } from "@mui/material/styles";
// import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
// import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
// import { Add } from "@mui/icons-material";
// import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
// import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
// import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import Divider from "@mui/material/Divider";
// import Paper from "@mui/material/Paper";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import InputBase from "@mui/material/InputBase";
// import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import SettingsEthernetOutlinedIcon from "@mui/icons-material/SettingsEthernetOutlined";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import ReactQuillEditor from "react-quill";

// //for breadcrumbs
// import { Link } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

// //for breadcrumbs
// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// export default function NewProj() {
//   const [alignment, setAlignment] = React.useState("left");
//   const [formats, setFormats] = React.useState(() => ["italic"]);
//   const [age, setAge] = React.useState("");
//   const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };

//   const handleFormat = (
//     event: React.MouseEvent<HTMLElement>,
//     newFormats: string[]
//   ) => {
//     setFormats(newFormats);
//   };

//   const handleAlignment = (
//     event: React.MouseEvent<HTMLElement>,
//     newAlignment: string
//   ) => {
//     setAlignment(newAlignment);
//   };

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

//   const breadcrumbItems = [
//     { label: "Projects", href: "/project" },
//     { label: "Add new project", href: "/NewProj" },
//   ];

//   const [open, setOpen] = React.useState(false);
//   const [openProjManager, setOpenProjManager] = React.useState(false);
//   const [openTechnology, setOpenTechnology] = React.useState(false);

//   const handleClickOpenTechnology = () => {
//     setOpenTechnology(true);
//   };

//   const handleCloseTechnology = () => {
//     setOpenTechnology(false);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleClickOpenProjManager = () => {
//     setOpenProjManager(true);
//   };

//   const handleCloseProjManager = () => {
//     setOpenProjManager(false);
//   };

//   //for description box (formatting toolbar)
//   const [value, setValue] = useState("");

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//     ],
//   };

//   return (
//     <div className={StyleNewProject.mainContainer}>
//       {/* <div className={StyleNewProject.mainHolder}> */}
//       {/* Start of Form */}
//       {/* <div className={StyleNewProject.contentHolder}> */}
//       <div className={StyleNewProject.mainForm}>
//         {/* Start of Left Form */}
//         <div className={StyleNewProject.leftFormPlaceHolder}>
//            <div className={StyleNewProject.profileHolder}>
//               <div className={StyleNewProject.imgContainer}>
//                 <img alt="" src={imgTest} className={StyleNewProject.imgSize} />
//               </div>

//               <div className={StyleNewProject.formProfileContainer}>
//                 {/* Start of username form */}
//                 <div style={{height:"100%", width:'100%', display: "flex", justifyContent: "center", flexDirection:"column"}} >
//                     <div style={{ display: "flex", justifyContent: "center"  }}>
//                   <FormControl>
//                     <FormLabel> Client Name </FormLabel>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Username"
//                       className={StyleNewProject.textFieldProfile1}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <GroupsOutlinedIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>
//                 </div>

//                 {/* Start of Assoc id form */}
//                 <div style={{ display: "flex", justifyContent: "center", paddingTop:"5%"}}>
//                   <FormControl style={{width:'84%'}}>
//                     <FormLabel> Client Name </FormLabel>
//                     <Grid className={StyleNewProject.textFieldProfile}>
//                       <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         onChange={handleChange}
//                         sx={{ width: "250%" }}
//                       >
//                         <MenuItem value={1}>Open</MenuItem>
//                         <MenuItem value={2}>Close</MenuItem>
//                         <MenuItem value={3}>Cancelled</MenuItem>
//                       </Select>
//                     </Grid>
//                   </FormControl>
//                 </div>
//                 </div>

//               </div>
//           </div>
//         </div>

//         <div className={StyleNewProject.otherFormContainer} >
//           <div style={{height:"100%", backgroundColor:'white', borderRadius: '10px',  }}>
//             <div className={StyleNewProject.otherFormPlaceholder}>
//               <div className={StyleNewProject.form}>
//                 <div className={StyleNewProject.formHolder}>
//                   <FormControl>
//                     <FormLabel>Project Name</FormLabel>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Email"
//                       className={StyleNewProject.projNametextField}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <FolderOutlinedIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>
//                 </div>

//                 <div className={StyleNewProject.formHolder}>
//                   <FormControl>
//                     <FormLabel>Project Manager</FormLabel>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Email"
//                       className={StyleNewProject.textField}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <FolderOutlinedIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>
//                 </div>

//                 <div className={StyleNewProject.formHolder}>
//                   <FormControl
//                     style={{ flexDirection: "row", display: "flex", gap: "2%" }}
//                   >
//                     <div style={{ flexDirection: "column", display: "flex" }}>
//                       <FormLabel>Start Date</FormLabel>
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker />
//                       </LocalizationProvider>
//                     </div>

//                     <div style={{ flexDirection: "column", display: "flex" }}>
//                       <FormLabel>End Date</FormLabel>
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker />
//                       </LocalizationProvider>
//                     </div>
//                   </FormControl>
//                 </div>

//                 <div className={StyleNewProject.formHolder}>
//                   <div className={StyleNewProject.gridContainer}>
//                     <FormLabel> Project Description</FormLabel>
//                     <ReactQuillEditor
//                       className={StyleNewProject.qlContainer}
//                       theme="snow"
//                       value={value}
//                       // maxLines={`8`}
//                       // scrollOnMaxLines={true}
//                       onChange={setValue}
//                       modules={modules}
//                       placeholder="Project description..."
//                       style={{
//                         backgroundColor: "transparent",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div className={StyleNewProject.formHolderMembers}>
//                   <FormControl>
//                     <FormLabel>Members</FormLabel>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Email"
//                       className={StyleNewProject.textField}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <GroupsOutlinedIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>
//                 </div>

//                 <div className={StyleNewProject.formHolder}>
//                   <FormControl>
//                     <FormLabel>Development Type</FormLabel>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Email"
//                       className={StyleNewProject.textField}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <GroupsOutlinedIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>

//                 </div>

//                 <div className={StyleNewProject.formHolder}>
//                   <FormControl>
//                     <FormLabel>Development Phase</FormLabel>
//                     <FormGroup
//                       style={{
//                         flexDirection: "row",
//                         display: "flex",
//                         fontFamily: "Montserrat, sans-serif",
//                       }}
//                     >
//                       <FormControlLabel control={<Checkbox />} label="RQS" />
//                       <FormControlLabel control={<Checkbox />} label="BD" />
//                       <FormControlLabel control={<Checkbox />} label="DD" />
//                       <FormControlLabel control={<Checkbox />} label="CD" />
//                       <FormControlLabel control={<Checkbox />} label="UT" />
//                       <FormControlLabel control={<Checkbox />} label="CT" />
//                       <FormControlLabel
//                         control={<Checkbox defaultChecked />}
//                         label="UAT"
//                       />
//                       <FormControlLabel control={<Checkbox />} label="MAINTENANCE" />
//                     </FormGroup>
//                   </FormControl>

//                 </div>

//                 <div className={StyleNewProject.formHolderTechnology}>
//                   <FormControl>
//                     <FormLabel>Technology</FormLabel>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Email"
//                       className={StyleNewProject.textField}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <GroupsOutlinedIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>

//                 </div>
//               </div>
//             </div>

//             {/* Start of Button*/}
//             <div className={StyleNewProject.formRow7}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SaveOutlinedIcon />}
//                 className={StyleNewProject.saveButton}

//               >
//                 SAVE
//               </Button>

//               <Button
//                 variant="contained"
//                 startIcon={<CancelOutlinedIcon />}
//                 className={StyleNewProject.cancelButton}

//               >
//                 CANCEL
//               </Button>
//             </div>
//           </div>
//         </div>

//       </div>
//       {/* </div> */}

//     </div>
//   );
// }
