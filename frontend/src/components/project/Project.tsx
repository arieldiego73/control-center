import React, { useState } from "react";
import ProjectStyle from "./Project.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ProjectTable from "./ProjectTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import {
	FormControl,
	FormLabel,
	TextField,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent,
	Box,
} from "@mui/material";
import { getProjectsFetch } from "../../redux/state/projectState";

export default function Project() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getProjectsFetch());
	}, [dispatch]);

	const data = useSelector(
		(state: RootState) => state.projectReducer.projects
	);

	const [projectData, setProjectData] = useState(data);
	const [searchQuery, setSearchQuery] = React.useState({
		projName: "",
		client: "",
		status: "",
	});

	React.useEffect(() => {
		setProjectData(data);
	}, [data]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setSearchQuery((prevQuery) => ({
			...prevQuery,
			[name]: value,
		}));
	};

	const handleSelectInputChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setSearchQuery((prevQuery) => ({
			...prevQuery,
			[name]: value,
		}));
	};

	const performSearch = () => {
		const filteredData = data.filter((project: any) => {
			const projNameMatch = project.proj_name
				.toLowerCase()
				.includes(searchQuery.projName.toLowerCase());
			const clientMatch = project.client_name
				.toLowerCase()
				.includes(searchQuery.client.toLowerCase());
			const statusMatch = project.proj_status_name
				.toLowerCase()
				.includes(searchQuery.client.toLowerCase());
			return projNameMatch && clientMatch && statusMatch;
		});

		setProjectData(filteredData);
		console.log("FILTERED DATA:", projectData);
	};

	return (
		<div>
			<div className={ProjectStyle.addButton}>
				<Link
					to="/NewProj"
					style={{ textDecoration: "none", color: "black" }}
				>
					<Button
						variant="contained"
						color="primary"
						startIcon={<Add />}
						className={ProjectStyle.button}
						// onClick={performSearch}
					>
						Add Project
					</Button>
				</Link>
			</div>
			<div className={ProjectStyle.mainContainer}>
				<div className={ProjectStyle.mainHolder}>
					<div className={ProjectStyle.contentHolder}>
						<Box
							component="form"
							onKeyDown={(e) => {
								if (e.key.match("Enter")) performSearch();
							}}
							autoComplete="off"
							noValidate
							className={ProjectStyle.searchBarContainer}
						>
							{/* Start of first search bar */}
							<div className={ProjectStyle.searchBarCol}>
								{/* Start of Project Name Search */}
								<FormControl>
									<Grid
										container
										alignItems="center"
										spacing={2}
									>
										<Grid item>
											<FormLabel
												sx={{
													width: "100%",
													color: "black",
													fontWeight: "400",
												}}
											>
												Project name :
											</FormLabel>
										</Grid>
										<Grid item>
											<TextField
												variant="outlined"
												size="small"
												name="projName"
												value={searchQuery.projName}
												onChange={handleInputChange}
												className={
													ProjectStyle.textField
												}
											/>
										</Grid>
									</Grid>
								</FormControl>

								{/* Start of Client Search */}
								<FormControl>
									<Grid
										container
										alignItems="center"
										spacing={2}
									>
										<Grid item>
											<FormLabel
												sx={{
													width: "100%",
													color: "black",
													fontWeight: "400",
												}}
											>
												Client :{" "}
											</FormLabel>
										</Grid>
										<Grid item>
											<TextField
												variant="outlined"
												size="small"
												name="client"
												value={searchQuery.client}
												onChange={handleInputChange}
												className={
													ProjectStyle.textField
												}
											/>
										</Grid>
									</Grid>
								</FormControl>

								{/* Start of Status Dropdown */}
								<FormControl>
									<Grid
										style={{
											justifyContent: "center",
											display: "flex",
										}}
									>
										<Grid container alignItems="center">
											<Grid item>
												<FormLabel
													sx={{
														width: "100%",
														color: "black",
														fontWeight: "400",
														// marginRight: "2%",
													}}
												>
													Status :
												</FormLabel>
											</Grid>

											<Grid>
												<FormControl
													variant="outlined"
													size="small"
													sx={{
														width: 200,
														minWidth: 150,
													}}
												>
													<Select
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														name="status"
														value={
															searchQuery.status
														}
														onChange={
															handleSelectInputChange
														}
														className={
															ProjectStyle.projStatus
														}
														// sx={{ width: "100%" }}
														inputProps={{
															classes: {
																root: ProjectStyle.projSelectRoot,
																outlined:
																	ProjectStyle.projSelectOutlined,
															},
														}}
													>
														<MenuItem value={1}>
															Open
														</MenuItem>
														<MenuItem value={2}>
															Close
														</MenuItem>
														<MenuItem value={3}>
															Cancelled
														</MenuItem>
													</Select>
												</FormControl>
											</Grid>
										</Grid>
									</Grid>
								</FormControl>

								<Button
									variant="contained"
									color="primary"
									startIcon={<SearchIcon />}
									onClick={performSearch}
									style={{ height: "40px" }}
								>
									Search
								</Button>
							</div>
						</Box>

						{/* Start of Table */}
						<div className={ProjectStyle.tableContainer}>
							<ProjectTable projectData={projectData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
