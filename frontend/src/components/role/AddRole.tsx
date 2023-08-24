import React, { useState, useEffect } from "react";
import RoleStyle from "./Role.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import RoleTable from "./RoleTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Project() {
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => {searchBarHolder1
  //   setShowModal(showModal=>!showModal);
  // };

  const data = useSelector((state: RootState) => state.userReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  console.log(data);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    // const filtered = data.filter((item) =>
    // 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setFilteredData(filtered);
  };

  return (
    <div className={RoleStyle.mainContainer}>
      <div style={{ width: "97%" }}>
        <h4>
          <FontAwesomeIcon icon={faUser} size="3x" color="black" />
          <span style={{ fontSize: "4vh", color: "black" }}> ROLES AND PERMISSIONS </span>
        </h4>
      </div>

      <div style={{ width: "97%", border: "1px solid-red" }}>
        BreadCrumbs to ha! // Eto din // 3rd breadcrumb
        <div style={{ textAlign: "right", marginBottom: "8px" }}>
          <Link to="/userhandler" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              style={{ textTransform: "none" }}
            >
              Add Role
            </Button>
          </Link>
        </div>
      </div>

      <div className={RoleStyle.contentContainer}>
        <div className={RoleStyle.contentHolder}>
          {/* Start of Header */}
          <div
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
              display: "flex",
              // border: "1px solid black",
              alignSelf: "center",
              justifyContent: "center",
              borderTopRightRadius: " 5px",
              borderTopLeftRadius: "5px",
            }}
          >
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                paddingTop: "1%",
                paddingBottom: "1%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  alignItems: "right",
                }}
              >

                {/* Start of second search bar */}
                <div className={RoleStyle.searchBar1}>
                  <div className={RoleStyle.searchBarHolder1}>
                    <input
                      type="text"
                      placeholder="Role name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: 5,
                        fontSize: 16,
                        backgroundColor: "#dce0e0",
                        borderRadius: "5px",
                        border: "none"
                      }}
                    />
                  </div>

                  <div className={RoleStyle.searchBarHolder2}>
                    <input
                      type="text"
                      placeholder="Short name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: 5,
                        fontSize: 16,
                        backgroundColor: "#dce0e0",
                        borderRadius: "5px",
                        border: "none"
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "8px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  style={{ textTransform: "none" }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Start of Table */}
          <div
            style={{
              backgroundColor: "transparent",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              height:"55vh",
            }}
          >
            <RoleTable />
          </div>
        </div>
      </div>
    </div>
  );
}
