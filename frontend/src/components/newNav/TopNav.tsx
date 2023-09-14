import TopNavStyle from "./TopNavStyle.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

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

        </div>
        <div className={TopNavStyle.titleContainer}>
          {title}
        </div>
      </div>
      <div className={TopNavStyle.rightSide}>
        
      </div>
    </div>
  );
}
