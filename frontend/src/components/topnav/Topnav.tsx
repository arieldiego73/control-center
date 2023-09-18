// import Logo from "../../Assets/logo (white).png";
// import User from "../../Assets/userImage.png";
// import TopnavStyle from "./Topnav.module.css";

// export default function TopNav() {
// 	return (
// 		<div className={TopnavStyle.topNavContainer}>
// 			<div className={TopnavStyle.logoContainer}>
// 				<img alt="" src={Logo} />
// 			</div>

// 			<div className={TopnavStyle.userContainer}>
// 				<div className={TopnavStyle.infoContainer}>
// 					<h2 className={TopnavStyle.Username}>Username</h2>
// 					<h4 className={TopnavStyle.Position}> Design Engineer Trainee </h4>
// 				</div>
// 				<div className={TopnavStyle.imageContainer}>
// 					<img alt="" src={User} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import * as React from "react";
import Logo from "../../Assets/logo (white).png";
import User from "../../Assets/userImage.png";
import TopnavStyle from "./Topnav.module.css";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function TopNav() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleCameraClick() {
    setAnchorEl(null);
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={TopnavStyle.topNavContainer}>
      <div className={TopnavStyle.logoContainer}>
        <img alt="" src={Logo} />
      </div>

      <div className={TopnavStyle.userContainer}>
        <div className={TopnavStyle.infoContainer}>
          <h2 className={TopnavStyle.Username}>Username</h2>
          <h4 className={TopnavStyle.Position}> Design Engineer Trainee </h4>
        </div>

        <React.Fragment>
          <Box className={TopnavStyle.imgOnClick}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <img
                  style={{ width: "3vw", height: "1wv" }}
                  alt=""
                  src={User}
                />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                width: 400,
                height: 180,
                borderRadius: "20px",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div style={{ justifyContent: "center", display: "flex" }}>
              <MenuItem
                disableRipple
                style={{
                  width: "95%",
                  height: "115px",
                  borderRadius: "20px",
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "1%",
                  border:'1px solid white'
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt=""
                    style={{ width: "3vw", height: "3vw", marginRight: "8px" }}
                    src={User}
                    onClick={handleClose}
                  />
                  <div style={{ position: "relative" }}>
                    <IconButton
                      style={{ position: "absolute", top: "6%", right: "0" }}
                      size="small"
                      color="primary"
                      onClick={handleCameraClick}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </div>
                  <text style={{ fontSize: "20px" }}>
                    Charlene Mae V. Espanol
                  </text>
                </div>

                <div style={{ width: "100%", marginLeft: "70%" }}>
                  <Link
                    to="/createuser"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button
                      style={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                      href="#contained-buttons"
                    >
                      <text style={{ color: "black", fontSize: "10px" }}>
                        {" "}
                        Manage your Account
                      </text>
                    </Button>
                  </Link>
                </div>
              </MenuItem>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1%",
              }}
              onClick={handleClose}
            >
              {/* <Link to="/DevelopmentPhase" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem {...itemProps}>Development Phase</MenuItem>
                    </Link> */}
                <MenuItem>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <ListItemIcon>
                    <Logout fontSize="medium" style={{ color: "red" }} />
                  </ListItemIcon>
                  Logout
              </Link>
                </MenuItem>
            </div>
          </Menu>
        </React.Fragment>
      </div>
    </div>
  );
}
