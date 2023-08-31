import React, { useState } from "react";
import Button from "@mui/material/Button";
import HideBtnStyle from "./HideButton.module.css";
import { FormControl, FormLabel, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Add } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";


const HideButton: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setIsHidden(true);
  };

  const handleClose = () => {
    setIsHidden(false); 
  };

  return (
    <div>
      {!isHidden ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          startIcon={<AddIcon />}
        >
          Add Role
        </Button>
      ) : (
      
          <div className={HideBtnStyle.contentHolder}>
            <div style={{flexDirection:'row', display:'flex', }}>
                {/* <FormControl >
                 <FormLabel>Role</FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Role"
                    className={HideBtnStyle.textField}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PermIdentityOutlinedIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                </FormControl>  */}
                <FormControl style={{padding: '1%'}}>
                <FormLabel>Role</FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Role"
                    className={HideBtnStyle.textField}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PermIdentityOutlinedIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                </FormControl>

                <FormControl style={{padding: '1%'}}>
                <FormLabel>User Level</FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Short Name"
                    className={HideBtnStyle.textField}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PermIdentityOutlinedIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                </FormControl>
                <FormControl style={{padding: '1%'}}>
                <FormLabel>User Level</FormLabel>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Short Name"
                    className={HideBtnStyle.textField}
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
                
                <div style={{flexDirection:'row', display:'flex', paddingInlineStart: '80%'}}>
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
            </div>
      )}
    </div>
  );
};

export default HideButton;
