import DevStyle from "./DevelopmentPhase.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DevelopmentPhaseTable from "./DevelopmentPhaseTable";
import Typography from "@mui/material/Typography";
//for breadcrumbs
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function DevelopmentPhase() {
  return (
    <div className={DevStyle.mainContainer}>
      <div style={{ width: "97%" }}>
        <h4>
          <FontAwesomeIcon icon={faUser} size="3x" color="black" />
          <span
            style={{
              fontSize: "4vh",
              color: "black",
              fontFamily: "Montserrat, san-serif",
            }}
          >
            {" "}
            DEVELOPMENT PHASE
          </span>
        </h4>
      </div>

      {/* for breadcrumbs */}
      <div
        style={{
          //   border: "1px solid red",
          paddingBottom: "1%",
          width: "97%",
          height: "75%",
          position: "relative",
          top: "3%",
          alignSelf: "center",
        }}
        role="presentation"
        onClick={handleClick}
      >
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link
            to="/developmentphase"
            className={`${DevStyle["custom-link"]}`}
            style={{ color: "inherit" }}
          >
            Development Phase
          </Link>
        </Breadcrumbs>
      </div>

      <div className={DevStyle.contentContainer}>
        <div className={DevStyle.contentHolder}>
          <div
            style={{
              backgroundColor: "transparent",
              // borderBottomLeftRadius: "8px",
              // borderBottomRightRadius: "8px",
              height: "100%",
            }}
          >
            <DevelopmentPhaseTable />
          </div>
        </div>
      </div>
    </div>
  );
}
