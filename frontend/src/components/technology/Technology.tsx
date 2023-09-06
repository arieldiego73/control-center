import TechStyle from "./Technology.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TechnologyTable from "./TechnologyTable";
import Typography from "@mui/material/Typography";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

//for breadcrumbs
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Technology() {
  return (
    <div className={TechStyle.mainContainer}>
      <div style={{ width: "97%", paddingBottom: "1%" }}>
        <div className={TechStyle.pageTitle}>
          <span>
            <AccountTreeOutlinedIcon fontSize="large" />
          </span>
          <span
            style={{ fontSize: "1.8rem", color: "black", fontWeight: "600" }}
          >
            {" "}
            TECHNOLOGY{" "}
          </span>
        </div>
      </div>

      <div className={TechStyle.contentContainer}>
		<div className={TechStyle.midContent}> 
   {/* for breadcrumbs */}
   <div
            style={{
              // border: "1px solid red",
              paddingBottom: "1%",
              width: "80%",
              height: "75%",
              paddingLeft: "1%",
              position: "relative",
              top: "3%",
              alignSelf: "center",
            }}
            role="presentation"
            onClick={handleClick}
          >
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link
                to="/technology"
                className={`${TechStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                Technology
              </Link>
            </Breadcrumbs>
          </div>
		</div>
        <div className={TechStyle.contentHolder}>
          <div
            style={{
              backgroundColor: "transparent",
              // borderBottomLeftRadius: "8px",
              // borderBottomRightRadius: "8px",
              height: "100%",
            }}
          >
            <TechnologyTable />
          </div>
        </div>
      </div>
    </div>
  );
}
