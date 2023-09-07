import EmployeeStatusStyle from "./EmployeeStatusTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EmployeeStatusTable from "./EmployeeStatusTable";
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

export default function EmployeeStatus() {
  return (
    <div className={EmployeeStatusStyle.mainContainer}>
      <div style={{ width: "97%", paddingBottom: "1%" }}>
        <div className={EmployeeStatusStyle.pageTitle}>
          <span>
            <AccountTreeOutlinedIcon fontSize="large" />
          </span>
          <span
            style={{ fontSize: "1.8rem", color: "black", fontWeight: "600" }}
          >
            {" "}
            EMPLOYEE STATUS{" "}
          </span>
        </div>
      </div>

      <div className={EmployeeStatusStyle.contentContainer}>
        <div className={EmployeeStatusStyle.midContent}>
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
                to="/employeestatus"
                className={`${EmployeeStatusStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
               Employee Status
              </Link>
            </Breadcrumbs>
          </div>
        </div>
        <div className={EmployeeStatusStyle.contentHolder}>
          <div
            style={{
              backgroundColor: "transparent",
              // borderBottomLeftRadius: "8px",
              // borderBottomRightRadius: "8px",
              height: "100%",
            }}
          >
            <EmployeeStatusTable />
          </div>
        </div>
      </div>
    </div>
  );
}
