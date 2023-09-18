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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddMemberTable from "../AddMemberTable";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsEthernetOutlinedIcon from "@mui/icons-material/SettingsEthernetOutlined";
import AddProjManagerTable from "../AddProjManagerTable";
import AddTechnologyTable from "../AddTechnologyTable";
import ReactQuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

//for breadcrumbs
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
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

export default function EditProj() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const [age, setAge] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  //for description box (formatting toolbar)
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

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
  const [openProjManager, setOpenProjManager] = React.useState(false);
  const [openTechnology, setOpenTechnology] = React.useState(false);

  const handleClickOpenTechnology = () => {
    setOpenTechnology(true);
  };

  const handleCloseTechnology = () => {
    setOpenTechnology(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenProjManager = () => {
    setOpenProjManager(true);
  };

  const handleCloseProjManager = () => {
    setOpenProjManager(false);
  };

  return (
    <div className={EditProjectStyle.mainContainer}>
      <div className={EditProjectStyle.mainHolder}>
        <div className={EditProjectStyle.contentHolder}>
          <div className={EditProjectStyle.mainForm}>
            <FormControl>
              <FormLabel
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "black",
                  fontWeight: "400",
                }}
              >
                Project Name
              </FormLabel>

              <TextField
                style={{ backgroundColor: "transparent", maxWidth: "570px" }}
                variant="outlined"
                size="small"
                placeholder="Project Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FolderOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <div className={EditProjectStyle.formRow3}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Start Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  End Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </FormControl>
            </div>

            <div className={EditProjectStyle.formRow5}>
              <FormControl
                style={{ flexDirection: "row", display: "flex", gap: "20px" }}
              >
                <div style={{ flexDirection: "column", display: "flex" }}>
                  <FormLabel
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "black",
                      fontWeight: "400",
                    }}
                  >
                    Project Manager
                  </FormLabel>

                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Project Manager"
                    style={{ backgroundColor: "transparent" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermIdentityOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <Button
                  onClick={handleClickOpenProjManager}
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
              </FormControl>
            </div>

            <div className={EditProjectStyle.formRow6}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Client Name
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Client Name"
                  style={{ backgroundColor: "transparent" }}
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

            <div className={EditProjectStyle.col2}>
              <div className={EditProjectStyle.gridContainer}>
                <FormControl className={EditProjectStyle.assocId}>
                  Project Description
                  <ReactQuillEditor
                    theme="snow"
                    value={value}
                    // maxLines={`8`}
                    // scrollOnMaxLines={true}
                    onChange={setValue}
                    modules={modules}
                    placeholder="Project description..."
                    style={{ backgroundColor: "whitesmoke" }}
                  />
                </FormControl>
              </div>
            </div>

            <div className={EditProjectStyle.formRow6}>
              <FormLabel
                style={{
                  paddingTop: ".5%",
                  fontFamily: "Montserrat, sans-serif",
                  color: "black",
                  fontWeight: "400",
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

            <div className={EditProjectStyle.formRow5}>
              <FormControl
                style={{ flexDirection: "row", display: "flex", gap: "20px" }}
              >
                <div style={{ flexDirection: "column", display: "flex" }}>
                  <FormLabel
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "black",
                      fontWeight: "400",
                    }}
                  >
                    Technology
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Technology"
                    style={{ backgroundColor: "transparent" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SettingsEthernetOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Button
                  onClick={handleClickOpenTechnology}
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
              </FormControl>
            </div>

            <div className={EditProjectStyle.formRow5}>
              <FormControl
                style={{ flexDirection: "row", display: "flex", gap: "20px" }}
              >
                <div style={{ flexDirection: "column", display: "flex" }}>
                  <FormLabel
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "black",
                      fontWeight: "400",
                    }}
                  >
                    Members
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Members"
                    style={{ backgroundColor: "transparent" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupsOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

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
              </FormControl>
            </div>

            <div className={EditProjectStyle.formRow8}>
              <div className="projStatus">
                <Grid container alignItems="center" spacing={2}>
                  <div className="projStatusContent">
                    <Grid item>
                      <FormLabel
                        sx={{
                          fontFamily: "Montserrat, sans-serif",
                          width: "100%",
                          color: "black",
                          fontWeight: "400",
                        }}
                      >
                        Status
                      </FormLabel>
                    </Grid>
                    <Grid item xs>
                      <FormControl
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={handleChange}
                          sx={{ width: "200px" }}
                        >
                          <MenuItem value={1}>Open</MenuItem>
                          <MenuItem value={2}>Close</MenuItem>
                          <MenuItem value={3}>Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </div>
                </Grid>
              </div>
            </div>

            <div className={EditProjectStyle.formRow7}>
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

          {/* Popup */}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
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

          <Dialog
            open={openProjManager}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <FontAwesomeIcon icon={faUser} size="1x" color="black" />
              {"Project Manager"}
            </DialogTitle>
            <DialogContent>
              <AddProjManagerTable />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseProjManager}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCloseProjManager}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openTechnology}
            onClose={handleCloseTechnology}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <FontAwesomeIcon icon={faUser} size="1x" color="black" />
              {"Technology"}
            </DialogTitle>
            <DialogContent>
              <AddProjManagerTable />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseTechnology}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCloseTechnology}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
