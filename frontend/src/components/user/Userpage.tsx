import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserStyle from "./User.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsersFetch } from "../../redux/state/userState";
import { RootState } from "../../redux/store/store";
import { Button } from "@material-ui/core";
import { Add, AccountCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Userpage() {
	const data = useSelector((state: RootState) => state.userReducer.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersFetch());
	}, [dispatch]);

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	const handleSearch = () => {
		// const filtered = data.filter((item) =>
		// 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
		// );
		// setFilteredData(filtered);
	};

	return (
		<div className={UserStyle.mainContainer}>

			<div style={{ width: "97%" }}>
				<h4>
					<FontAwesomeIcon icon={faUser} size="3x" color="black" />
					<span style={{ fontSize: "4vh", color: "black" }}> USERS </span>
				</h4>
			</div>

			<div style={{ width: "97%", border: "1px solid-red" }}>
				Insert breadcrumbs here
				<div style={{ textAlign: "right", marginBottom: "8px" }}>
					<Link to="/userhandler" style={{ textDecoration: "none" }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<Add />}
							style={{ textTransform: "none" }}
						>
							Add User
						</Button>
					</Link>
				</div>
			</div>
			<div className={UserStyle.contentContainer}>
			<div className={UserStyle.contentHolder}>

				{/* Start of Header */}
				<div className={UserStyle.contentHead}>
					<div>
						<div style={{display: "flex",flexDirection: "row",gap: "12px",}}>
							<div className={UserStyle.searchBar1}>

								{/* Start of first search bar */}
								<div className={UserStyle.searchBarHolder1}>
									<input
										type="text"
										placeholder="Name"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16 }}
									/>
								</div>

								<div className={UserStyle.searchBarHolder2}>
									<input
										type="text"
										placeholder="Position"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16 }}
									/>
								</div>
							</div>

							{/* Start of second search bar */}
							<div className={UserStyle.searchBar2}>
								<div className={UserStyle.searchBarHolder1}>
									<input
										type="text"
										placeholder="Department"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16 }}
									/>
								</div>

								<div className={UserStyle.searchBarHolder2}>
									<input
										type="text"
										placeholder="Business Unit"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16 }}
									/>
								</div>
							</div>
						</div>

						<div style={{ display: "flex", alignItems: "center", justifyContent:"center"}}>
							<button
								onClick={handleSearch}
								style={{
									backgroundColor: "#2466A2",
									color: "white",
									height: "30px",
									width: "50%",
									padding: "0 32px",
								}}
							>
								Search
							</button>
						</div>
					</div>
				</div>

				{/* Start of Table */}
				<div
					style={{
						backgroundColor: "transparent",
						position: "relative",
						top: "5vh",
						height: "70%",
					}}
				>
					<UserTable/>
				</div>
			</div>
			</div>
		</div>
	);
}
