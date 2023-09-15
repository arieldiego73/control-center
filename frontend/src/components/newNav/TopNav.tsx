import TopNavStyle from "./TopNavStyle.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import SampleUserImage from "../../Assets/userImage.png"

import LogoutIcon from '@mui/icons-material/Logout';

export interface TopNavProps {
  pageTitle?: string; // Make pageTitle optional with '?'
}

export default function TopNav({ pageTitle }: TopNavProps) {
  // Use pageTitle if provided, otherwise use a default value
  const title = pageTitle || "Default Title";

  return (
    <div className={TopNavStyle.topnavContainer}>
      <div className={TopNavStyle.leftSide}>
        <div className={TopNavStyle.breadCrumbsContainer}>
          <div style={{ paddingLeft: "3%" }}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link
                to="/User"
                className={`${TopNavStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                User
              </Link>
              <Link
                to="/CreateUser"
                className={`${TopNavStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                Create User
              </Link>

              {/* Other breadcrumb links */}
            </Breadcrumbs>
          </div>

        </div>
        <div className={TopNavStyle.titleContainer}>
          <span>{title}</span>
        </div>
      </div>
      <div className={TopNavStyle.rightSide}>

        <div className={TopNavStyle.userInfo}>
          <div className={TopNavStyle.userProfilePic}>
            <img src={SampleUserImage} alt="User image" style={{ height: "100%", width: "100%", }} />
          </div>
          <div className={TopNavStyle.userName}>
            <span>Shernan Jenesis Mateo</span>
          </div>
        </div>

        <div className={TopNavStyle.logout}>
          <div className={TopNavStyle.logoutSpanContainer}>
            <span className={TopNavStyle.logoutIcon}><LogoutIcon style={{ color: "red", height: "20px" }} /></span>
            <span className={TopNavStyle.logoutText}>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
