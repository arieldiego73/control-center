import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Visibility } from '@mui/icons-material';
import FormControlLabel from "@mui/material/FormControlLabel";
import StyleNewProject from "./NewProject.module.css";
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
import TextField from "@mui/material/TextField";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Add } from "@mui/icons-material";

const HideButton: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setIsHidden(true);
  };

  const handleClose = () => {
    setIsHidden(false); // Reset isHidden to false to show the "Hide Me" button
  };

  return (
    <div>
      {!isHidden ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          startIcon={<Visibility />}
        >
          Hide Me
        </Button>
      ) : (
        <div >
          <FormControl className={StyleNewProject.email}>
            <FormLabel>Project Manager</FormLabel>
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
            style={{ textTransform: "none" }}
          >
            Add Role
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default HideButton;
