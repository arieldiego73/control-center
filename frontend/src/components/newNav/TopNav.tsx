import TopNavStyle from "./TopNavStyle.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import SampleUserImage from "../../Assets/userImage/SampleAvatar.png";
import { ReactNode } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export interface TopNavProps {
  pageTitle?: string; // Make pageTitle optional with '?'
  breadcrumbs?: Breadcrumb[]; // Add breadcrumbs prop
}

export interface Breadcrumb {
  label?: string;
  icon?: ReactNode; // Use ReactNode for icons
  to: string;
}

export default function TopNav({ pageTitle, breadcrumbs }: TopNavProps) {
  // Use pageTitle if provided, otherwise use a default value
  const title = pageTitle || "Default Title";

  //for clicking the main user name
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
    <div className={TopNavStyle.topnavContainer}>
      <div className={TopNavStyle.leftSide}>
        <div className={TopNavStyle.breadCrumbsContainer}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => (
                <Link
                  key={index}
                  to={breadcrumb.to}
                  className={TopNavStyle["custom-link"]}
                  style={{ color: "inherit" }}
                >
                  <div>
                    {breadcrumb.icon} {/* Render the icon here */}
                  </div>
                  <div>
                    {breadcrumb.label} {/* Render the label here */}
                  </div>
                </Link>
              ))}
            </Breadcrumbs>
          )}
        </div>

        <div className={TopNavStyle.titleContainer}>
          <span>{title}</span>
        </div>
      </div>
      <div className={TopNavStyle.rightSide}>
        <div className={TopNavStyle.userInfo}>
          <div className={TopNavStyle.userProfilePic}>
            <img
              src={SampleUserImage}
              alt="User"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className={TopNavStyle.userName}>

            <Tooltip title="Account settings"
              onClick={handleClick}
              style={{ border: "1px solid green", marginLeft:"0.5vw", marginRight:"2vw" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <span className={TopNavStyle.spanUserName}>
                Shernan Jenesis Mateo
              </span>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  border:'1px solid red',
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
                    backgroundColor: "#daf1ff",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "1%",
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
                      style={{
                        width: "3vw",
                        height: "3vw",
                        marginRight: "8px",
                      }}
                      src={SampleUserImage}
                      onClick={handleClose}
                    />
                    <div style={{ position: "relative" }}>
                      <IconButton
                        style={{
                          position: "absolute",
                          top: "6%",
                          right: "0",
                        }}
                        size="small"
                        color="primary"
                        onClick={handleCameraClick}
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </div>
                    <text style={{ fontSize: "20px" }}>
                      Shernan Jenesis Mateo
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
              ></div>
            </Menu>
          </div>
          <div className={TopNavStyle.logout}>
            <div className={TopNavStyle.logoutSpanContainer}>
              <span className={TopNavStyle.logoutIcon}>
                <LogoutIcon style={{ color: "red", height: "20px" }} />
              </span>
              <span className={TopNavStyle.logoutText}>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
