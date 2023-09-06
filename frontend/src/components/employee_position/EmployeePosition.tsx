import EmployeePositionStyle from "./EmployeePositionTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EmployeePositionTable from "./EmployeePositionTable";
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

export default function EmployeePosition() {
  return (
    <div className={EmployeePositionStyle.mainContainer}>
      <div style={{ width: "97%", paddingBottom: "1%" }}>
        <div className={EmployeePositionStyle.pageTitle}>
          <span>
            <AccountTreeOutlinedIcon fontSize="large" />
          </span>
          <span
            style={{ fontSize: "1.8rem", color: "black", fontWeight: "600" }}
          >
            {" "}
            EMPLOYEE POSITION{" "}
          </span>
        </div>
      </div>

      <div className={EmployeePositionStyle.contentContainer}>
        <div className={EmployeePositionStyle.midContent}>
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
                to="/employeeposition"
                className={`${EmployeePositionStyle["custom-link"]}`}
                style={{ color: "inherit" }}
              >
                Employee Position
              </Link>
            </Breadcrumbs>
          </div>
        </div>

        <div className={EmployeePositionStyle.contentHolder}>
          <div
            style={{
              backgroundColor: "transparent",
              // borderBottomLeftRadius: "8px",
              // borderBottomRightRadius: "8px",
              height: "100%",
            }}
          >
            <EmployeePositionTable />
          </div>
        </div>
      </div>
    </div>
  );
}
