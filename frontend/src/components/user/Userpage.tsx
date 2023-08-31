

import React, { useState, useEffect } from "react";
import UserStyle from "./User.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import UserTable from "./UserTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';


export default function Userpage() {
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
		<body >
			<div className={UserStyle.mainContainer}>
				<div style={{ width: "97%" }}>
					<h4>
						<FontAwesomeIcon icon={faUser} size="3x" color="black" />
						<span style={{ fontSize: "40px", color: "black" }}> USERS </span>
					</h4>
				</div>

				<div className={UserStyle.contentContainer}>
					<div className={UserStyle.midContent}>
						<div>
							Insert breadcrumbs here
						</div>
						<div style={{ alignContent: "right" }}>
							<Link to="/CreateUser" style={{ textDecoration: "none" }}>
								<Button
									variant="contained"
									color="primary"
									startIcon={<Add />}
									style={{ textTransform: "none", fontFamily: "Montserrat, sans-serif" }}
								>
									Add User
								</Button>
							</Link>
						</div>
					</div>
					<div className={UserStyle.contentHolder}>
            {/* Start of Header */}
            <div className={UserStyle.searchBarContainer}>
              <div className={UserStyle.searchBarCol}>
                {/* Start of first search bar */}
                <div className={UserStyle.searchBarHolder1}>
                  <span>Name</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: "#dce0e0",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  />
                </div>

                <div className={UserStyle.searchBarHolder2}>
                  <span>Department</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: "#dce0e0",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  />
                </div>
              </div>

              {/* Start of second search bar */}
              <div className={UserStyle.searcBar1}>
                <div className={UserStyle.searchBarCol}>
                  <div className={UserStyle.searchBarHolder1}>
                    <span>Position</span>
                    <span>:</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: 5,
                        fontSize: 16,
                        backgroundColor: "#dce0e0",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    />
                  </div>

                  <div className={UserStyle.searchBarHolder2}>
                    <span>Business Unit</span>
                    <span>:</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: 5,
                        fontSize: 16,
                        backgroundColor: "#dce0e0",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={UserStyle.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  style={{ textTransform: "none" , fontFamily: "Montserrat, sans-serif" }}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Start of Table */}
            <div className={UserStyle.tableContainer}>
              <UserTable />
            </div>
          </div>
				</div>

			</div>
		</body>
	);
}




















// import React, { useEffect, useState } from "react";
// import UserTable from "./UserTable";
// import UserStyle from "./User.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getUsersFetch } from "../../redux/state/userState";
// import { RootState } from "../../redux/store/store";
// import { Button } from "@material-ui/core";
// import { Add, AccountCircleOutlined } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function Userpage() {
// 	const data = useSelector((state: RootState) => state.userReducer.users);
// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		dispatch(getUsersFetch());
// 	}, [dispatch]);

// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [filteredData, setFilteredData] = useState(data);

// 	const handleSearch = () => {
// 		// const filtered = data.filter((item) =>
// 		// 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
// 		// );
// 		// setFilteredData(filtered);
// 	};

// 	return (
// 		<div className={UserStyle.mainContainer}>

// 			<div style={{ width: "97%" }}>
// 				<h4>
// 					<FontAwesomeIcon icon={faUser} size="3x" color="black" />
// 					<span style={{ fontSize: "4vh", color: "black" }}> USERS </span>
// 				</h4>
// 			</div>

// 			<div style={{ width: "97%", border: "1px solid-red" }}>
// 				Insert breadcrumbs here
// 				<div style={{ textAlign: "right", marginBottom: "8px" }}>
// 					<Link to="/userhandler" style={{ textDecoration: "none" }}>
// 						<Button
// 							variant="contained"
// 							color="primary"
// 							startIcon={<Add />}
// 							style={{ textTransform: "none" }}
// 						>
// 							Add User
// 						</Button>
// 					</Link>
// 				</div>
// 			</div>
// 			<div className={UserStyle.contentContainer}>
// 				<div className={UserStyle.contentHolder}>

// 					{/* Start of Header */}
// 					<div className={UserStyle.contentHead}>
// 						<div>
// 							<div style={{ display: "flex", flexDirection: "row", gap: "12px", }}>
// 								<div className={UserStyle.searchBar1}>

// 									{/* Start of first search bar */}
// 									<div className={UserStyle.searchBarHolder1}>
// 										<input
// 											type="text"
// 											placeholder="Name"
// 											value={searchQuery}
// 											onChange={(e) =>
// 												setSearchQuery(e.target.value)
// 											}
// 											style={{ padding: 5, fontSize: 16 }}
// 										/>
// 									</div>

// 									<div className={UserStyle.searchBarHolder2}>
// 										<input
// 											type="text"
// 											placeholder="Position"
// 											value={searchQuery}
// 											onChange={(e) =>
// 												setSearchQuery(e.target.value)
// 											}
// 											style={{ padding: 5, fontSize: 16 }}
// 										/>
// 									</div>
// 								</div>

// 								{/* Start of second search bar */}
// 								<div className={UserStyle.searchBar2}>
// 									<div className={UserStyle.searchBarHolder1}>
// 										<input
// 											type="text"
// 											placeholder="Department"
// 											value={searchQuery}
// 											onChange={(e) =>
// 												setSearchQuery(e.target.value)
// 											}
// 											style={{ padding: 5, fontSize: 16 }}
// 										/>
// 									</div>

// 									<div className={UserStyle.searchBarHolder2}>
// 										<input
// 											type="text"
// 											placeholder="Business Unit"
// 											value={searchQuery}
// 											onChange={(e) =>
// 												setSearchQuery(e.target.value)
// 											}
// 											style={{ padding: 5, fontSize: 16 }}
// 										/>
// 									</div>
// 								</div>
// 							</div>

// 							<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
// 								<button
// 									onClick={handleSearch}
// 									style={{
// 										backgroundColor: "#2466A2",
// 										color: "white",
// 										height: "30px",
// 										width: "50%",
// 										padding: "0 32px",
// 									}}
// 								>
// 									Search
// 								</button>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Start of Table */}
// 					<div
// 						style={{
// 							backgroundColor: "transparent",
// 							position: "relative",
// 							top: "5vh",
// 							height: "70%",
// 						}}
// 					>
// 						<UserTable />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
