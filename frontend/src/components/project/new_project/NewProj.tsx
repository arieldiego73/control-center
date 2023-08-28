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
} from "@mui/material";

import React, { useState, useEffect } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumb from "../../breadcrumbs/breadcrumbs";
import { styled } from "@mui/material/styles";
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
    { label: "Login Page", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Users", href: "/userhandler" },
  ];

  return (
    <div className={StyleNewProject.mainContainer} > 
      
      <div className={StyleNewProject.heading}>
        <FontAwesomeIcon icon={faUser} size="2x" color="black" />
        <div className={StyleNewProject.textContainer}>
          <span style={{ fontSize: "4vh", color: "black" }}>
            {" "}
            Add New Project{" "}
          </span>
        </div>
      </div>
      <div className={StyleNewProject.breadCrumbs}>
        <p>
          <Breadcrumb items={breadcrumbItems} />
        </p>
      </div>

      <div className={StyleNewProject.contentContainer} style={{ maxHeight: "65vh", overflowY: "auto" }}>
        <div className={StyleNewProject.mainForm}>
          <div className={StyleNewProject.formRow1}>
            <FormControl className={StyleNewProject.formUsername}>
              <FormLabel>Project Name</FormLabel>
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
                <FormLabel>Description</FormLabel>
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
              <FormLabel>Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={StyleNewProject.mname}>
              <FormLabel>End Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </FormControl>
          </div>

          <div className={StyleNewProject.formRow5}>
            <FormControl className={StyleNewProject.email}>
              <FormLabel>Role</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Role"
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
              style={{ textTransform: "none" }}
            >
              Add Role
            </Button>
          </div>
          <div className={StyleNewProject.formRow6}>
            <FormControl className={StyleNewProject.email}>
              <FormLabel>Business Unit</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Business Unit"
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

            <FormControl variant="outlined" size="small">
              <FormLabel>Department</FormLabel>
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


          {/* FOR TESTING SCROLL VIEW ONLY!! */}

          <div className={StyleNewProject.formRow6}>
            <FormControl className={StyleNewProject.email}>
              <FormLabel>Business Unit</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Business Unit"
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

            <FormControl variant="outlined" size="small">
              <FormLabel>Department</FormLabel>
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

          <div className={StyleNewProject.formRow6}>
            <FormControl className={StyleNewProject.email}>
              <FormLabel>Business Unit</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Business Unit"
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

            <FormControl variant="outlined" size="small">
              <FormLabel>Department</FormLabel>
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

          <div className={StyleNewProject.formRow6}>
            <FormControl className={StyleNewProject.email}>
              <FormLabel>Business Unit</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Business Unit"
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

            <FormControl variant="outlined" size="small">
              <FormLabel>Department</FormLabel>
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

          <div className={StyleNewProject.formRow6}>
            <FormControl className={StyleNewProject.email}>
              <FormLabel>Business Unit</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Business Unit"
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

            <FormControl variant="outlined" size="small">
              <FormLabel>Department</FormLabel>
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

          
          <div className={StyleNewProject.formRow7}>
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
  );
}
