import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserStyle from "./User.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsersFetch } from "../../redux/state/userState";
import { RootState } from "../../redux/store/store";
import { Button } from "@material-ui/core";
import { Add, AccountCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
		<div className={UserStyle.mainHolder}>
			<div
				style={{
					flexDirection: "row",
					display: "flex",
					paddingLeft: "1%",
				}}
			>
				<div className={UserStyle.iconHolder}>
					<AccountCircleOutlined style={{ fontSize: "60px" }} />
				</div>

				<div
					style={{
						flex: "40",
						marginRight: 5,
						justifyContent: "center",
						alignSelf: "center",
					}}
				>
					<text
						style={{
							fontSize: 45,
							fontWeight: "bold",
							color: "black",
						}}
					>
						User
					</text>
				</div>
			</div>

			<div className={UserStyle.contentHolder}>
				<div style={{ textAlign: "right", marginBottom: "6px" }}>
					<Link to="/createuser" style={{ textDecoration: "none" }}>
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
				{/* Start of Header */}
				<div
					style={{
						flexDirection: "row",
						backgroundColor: "white",
						display: "flex",
						border: "1px solid black",
						alignSelf: "center",
						justifyContent: "center",
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
							}}
						>
							<div className={UserStyle.searchBar1}>
								{/* Start of first search bar */}
								<div className={UserStyle.searchBarHolder1}>
									<input
										type="text"
										placeholder ="Name"
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

						<div style={{ marginTop: "24px" }}>
							<button
								onClick={handleSearch}
								style={{
									backgroundColor: "#2466A2",
									border: "1px solid black",
									color: "white",
									height: "30px",
									width: "100%",
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
						backgroundColor: "white",
						border: "1px solid black",
					}}
				>
					<UserTable data={data as []} />
				</div>
			</div>
		</div>
	);
}
