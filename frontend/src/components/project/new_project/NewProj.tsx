import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import StyleNewProject from "./NewProject.module.css";
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
  Grid,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddMemberTable from "./AddMemberTable";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
//for breadcrumbs
import Breadcrumbs from "@mui/material/Breadcrumbs";

//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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
    { label: "Add new project", href: "/NewProj" },
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
      <div className={StyleNewProject.mainContainer}>
        <div className={StyleNewProject.heading}>
          <div className={StyleNewProject.pageTitle}>
            <span>
              <AccountTreeOutlinedIcon fontSize="large" />
            </span>
            <span
              style={{ fontSize: "1.8rem", color: "black", fontWeight: "600" }}
            >
              {" "}
              ADD NEW PROJECT{" "}
            </span>
          </div>
        </div>
        <div className={StyleNewProject.breadCrumbs}>
          {/* for breadcrumbs */}
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link
                to="/project"
                className={`${StyleNewProject["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                Project
              </Link>
              <Link
                to="/NewProj"
                className={`${StyleNewProject["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                New Project
              </Link>

              {/* Other breadcrumb links */}
            </Breadcrumbs>
          </div>
        </div>

        <div
          className={StyleNewProject.contentContainer}
          style={{ maxHeight: "65vh", overflowY: "auto" }}
        >
          <div className={StyleNewProject.mainForm}>
            <div className={StyleNewProject.formRow1}>
              <FormControl className={StyleNewProject.formUsername}>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Project Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Project Name"
                  className={StyleNewProject.textField}
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
            <div className={StyleNewProject.formRow2}>
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
                <FormControl className={StyleNewProject.assocId}>
                  <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                    Description
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Description"
                    className={StyleNewProject.textField}
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
            <div className={StyleNewProject.formRow3}>
              <FormControl className={StyleNewProject.fname}>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Start Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </FormControl>
              <FormControl className={StyleNewProject.mname}>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  End Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className={StyleNewProject.formRow5}>
              <FormControl className={StyleNewProject.email}>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Project Manager
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Project Manager"
                  className={StyleNewProject.textField}
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
              >
                Add Project Manager
              </Button>
            </div>

            <div className={StyleNewProject.formRow6}>
              <FormControl className={StyleNewProject.email}>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Client Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Client Name"
                  className={StyleNewProject.textField}
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

            <div className={StyleNewProject.formRow6}>
              <FormLabel
                style={{
                  paddingTop: ".5%",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Development Phase
              </FormLabel>
              <FormGroup
                style={{
                  flexDirection: "row",
                  display: "flex",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
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

            <div className={StyleNewProject.formRow5}>
              <FormControl>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Technology
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Technology"
                  className={StyleNewProject.textField}
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
              >
                Add Technology
              </Button>
            </div>

            <div className={StyleNewProject.formRow5}>
              <FormControl>
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Members
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Members"
                  className={StyleNewProject.textField}
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
                style={{
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Add Members
              </Button>
            </div>

            <div>
              <FormControl variant="outlined" size="small">
                <FormLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Status
                </FormLabel>
                {/* <InputLabel htmlFor="demo-simple-select-label">Select Department</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  className={StyleNewProject.textField}
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

            <div className={StyleNewProject.formRow7}>
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
              <Link
                to="/project"
                style={{
                  textDecoration: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
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
            <Button
              onClick={handleClose}
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </body>
  );
}
