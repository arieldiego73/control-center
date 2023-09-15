import TopNavStyle from "./TopNavStyle.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import SampleUserImage from "../../Assets/userImage/SampleAvatar.png"
import { ReactNode } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

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
                  <div >
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
