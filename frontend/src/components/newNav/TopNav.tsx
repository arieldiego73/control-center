import TopNavStyle from "./TopNavStyle.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import SampleUserImage from "../../Assets/userImage/SampleAvatar.png";
import { ReactNode } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import defaultProfile from "../../Assets/userImage/MaleDefaultProfile.jpg"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/saga/sessionSaga"; // Import the logout action
import { RootState } from "../../redux/store/store";

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

  // Redux dispatch to trigger logout action
  const dispatch = useDispatch();

  // Handle logout when the button is clicked
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  const user = useSelector((state: RootState) => state.session.user);

  return (
    <div className={TopNavStyle.topnavContainer}>
      <div className={TopNavStyle.leftSide}>
        <div className={TopNavStyle.breadCrumbsContainer}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => (
                <Link
                  key={index}
                  to={breadcrumb.to}
                  className={TopNavStyle.breadCrumbContainer}
                  style={{ color: "gray", textDecoration:"none", fontSize:"15px"}}
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

          <div className={TopNavStyle.userName}>
            <Tooltip
              title="Account settings"
              onClick={handleClick}
              className={TopNavStyle.toolTip}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <div >
                <div className={TopNavStyle.userProfilePic}>
                  {/* <img
                    src={defaultProfile}
                    alt="User"
                    style={{ height: "100%", width: "100%", borderRadius: "100%", }}
                    className={TopNavStyle.mainImage}
                  /> */}
                  {/* Display the selected image */}
                  {user?.img ? (
                      <img
                        src={require(`../../Assets/userImage/${user.img}`)}
                        alt="Selected"
                        style={{ height: "100%", width: "100%", borderRadius: "100%", }}
                          className={TopNavStyle.mainImage}
                      />
                    ) : (
                      // Display the user's image if available, otherwise show the default profile
                      <img
                          src={defaultProfile}
                          alt="Default Profile"
                          style={{ height: "100%", width: "100%", borderRadius: "100%", }}
                          className={TopNavStyle.mainImage}
                        />
                      )}
                </div>
                <div className={TopNavStyle.mainName}>{user ? `${user.fullName}` : ' '}</div>
              </div>
            </Tooltip>

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
                  width: 350,

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
              <div className={TopNavStyle.topNavName}>
                <MenuItem disableRipple 
                  style={{
                    width:"95%",
                    height:"100%",
                    backgroundColor:"white",
                    display:"flex",
                    flexDirection:"column",
                    borderRadius:"20px",
                    justifyContent:"space-around",
                    alignItems:"center",
                    gap: "4vh",
                    padding:"1%",
                    cursor:"default",
                  }}
                >
                  <div className={TopNavStyle.profileInfoHolder}>
                    <div className={TopNavStyle.imageHolder}>
                      {user?.img ? (
                      <img
                        src={require(`../../Assets/userImage/${user.img}`)}
                        alt=""
                        className={TopNavStyle.imgSize}
                      />
                    ) : (
                      // Display the user's image if available, otherwise show the default profile
                      <img
                          src={defaultProfile}
                          alt=""
                          className={TopNavStyle.imgSize}
                        />
                      )}
                    </div>

                    <text style={{ fontSize: "20px", fontWeight: "bold" }}>
                       {user ? `${user.fullName}` : ' '}
                    </text>
                    <text style={{ fontSize: "12px" }}>{user ? user.email : ' '}</text>
                  </div>

                  <div className={TopNavStyle.manageButtonContainer}>
                    <Link
                      to="/user/edit-user/"
                      className={TopNavStyle.manageAccButton}
                    >
                      <div className={TopNavStyle.holder}>
                        <text style={{ color: "black", fontSize: "15px" }}>
                          Manage your Account
                        </text>
                      </div>
                    </Link>

                    <button className={TopNavStyle.logout} onClick={handleLogout}>
                      <div className={TopNavStyle.logoutSpanContainer}>
                        <span className={TopNavStyle.logoutIcon}>
                          <LogoutIcon />
                        </span>
                        <span className={TopNavStyle.logoutText}>Log out</span>
                      </div>
                    </button>
                  </div>
                </MenuItem>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
