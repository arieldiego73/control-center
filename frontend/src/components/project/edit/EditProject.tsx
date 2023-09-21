import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EditProjectStyle from "./EditProjectStyle.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
	FormControl,
	FormLabel,
	InputAdornment,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Chip,
	Avatar,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	OutlinedInput,
	Box,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddMemberTable from "../AddMemberTable";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AddProjManagerTable from "../AddProjManagerTable";
import ReactQuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClientFetch } from "../../../redux/state/clientState";
import { RootState } from "../../../redux/store/store";
import { getDevPhaseFetch } from "../../../redux/state/devPhaseState";
import AddClientNameTable from "../AddClientNameTable";
import { GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { getUsersFetch } from "../../../redux/state/userState";
import { getTechnologyFetch } from "../../../redux/state/technologyState";
import { getProjectStatusFetch } from "../../../redux/state/projectStatusState";

export default function EditProj() {
	const dispatch = useDispatch();

	const [projectName, setProjectName] = React.useState("");
	const [selectedStartDate, setSelectedStartDate] =
		React.useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
		null
	);

	// PROJECT MANAGER VARIABLES ::::::::::::::::::::::::::::::::::::::::::::::::::::::
	const [projectManager, setProjectManager] =
		useState<GridRowSelectionModel>(); // Will hold the current project managers of the current project
	const [selectedProjectManagers, setSelectedProjectManagers] = useState<
		string[]
	>([]); // Variable that holds the selected project managers
	const [temporaryManagers, setTemporaryManagers] =
		useState<GridRowSelectionModel>(); // for temporary selected managers
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// PROJECT MEMBERS VARIABLES ::::::::::::::::::::::::::::::::::::::::::::::::::::::
	const [projectMembers, setProjectMembers] =
		useState<GridRowSelectionModel>();
	const [selectedProjectMembers, setSelectedProjectMembers] = useState<
		string[]
	>([]); // Variable that holds the selected project members
	const [temporaryMembers, setTemporaryMembers] =
		useState<GridRowSelectionModel>(); // for temporary selected members
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	const [projectClient, setProjectClient] = useState<GridRowParams>();
	const [projectDescription, setProjectDescription] = useState("");
	const [projectDevPhase, setProjectDevPhase] = useState<number[]>([]);
	const [projectTechnologies, setProjectTechnologies] = useState<number[]>(
		[]
	);
	const [status, setStatus] = useState(0);

	React.useEffect(() => {
		dispatch(getClientFetch());
		dispatch(getDevPhaseFetch());
		dispatch(getUsersFetch()); // to fetch all users for project manager selections
		dispatch(getTechnologyFetch());
		dispatch(getProjectStatusFetch());
	}, [dispatch]);

	const clientsData = useSelector(
		(state: RootState) => state.clientReducer.clients
	);
	const devPhaseData = useSelector(
		(state: RootState) => state.devPhaseReducer.devPhase
	);
	const usersData = useSelector(
		(state: RootState) => state.userReducer.users
	);
	const technologies = useSelector(
		(state: RootState) => state.techReducer.technology
	);
	const statuses = useSelector(
		(state: RootState) => state.projectStatusReducer.projectStatus
	);

	//for description box (formatting toolbar)
	const [value, setValue] = useState("");

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }],
		],
	};

	const [openMembers, setOpenMembers] = React.useState(false);
	const [openProjManager, setOpenProjManager] = React.useState(false);
	const [openClientName, setOpenClientName] = React.useState(false);

	React.useEffect(() => {
		setSelectedProjectManagers(() => {
			return usersData
				.filter((user: any) => projectManager?.includes(user?.emp_id))
				.map((user: any) => `${user?.fname} ${user?.lname}`)
				.sort();
		});
	}, [projectManager, usersData]);
	// this will trigger re-render of the chips of project members when the dependencies has changed

	React.useEffect(() => {
		setSelectedProjectMembers(() => {
			return usersData
				.filter((user: any) => projectMembers?.includes(user?.emp_id))
				.map((user: any) => `${user?.fname} ${user?.lname}`)
				.sort();
		});
	}, [projectMembers, usersData]);
	// this will trigger re-render of the chips of project members when dependencies has changed

	const handleSelectDevPhaseChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => setProjectDevPhase([...projectDevPhase, parseInt(event.target.name)]);

	const handleSelectTechnologies = (
		e: SelectChangeEvent<typeof projectTechnologies>
	) => setProjectTechnologies(e.target.value as number[]);

	const handleTechValueRendering = () => {
		const selectedTechs: string[] = projectTechnologies.map((techId) => {
			const matchingTech: any = technologies.find(
				(tech: any) => tech.tech_id === techId
			);
			return matchingTech ? matchingTech.tech_name : "";
		});
		return (
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 0.5,
				}}
			>
				{selectedTechs.map((value) => (
					<Chip key={value} label={value} />
				))}
			</Box>
		);
	};

	return (
		<div className={EditProjectStyle.mainContainer}>
			<div className={EditProjectStyle.mainHolder}>
				<div className={EditProjectStyle.contentHolder}>
					<div className={EditProjectStyle.mainForm}>
						{/* CLIENT NAME */}
						<div className={EditProjectStyle.formRow6}>
							<FormControl
								style={{
									flexDirection: "row",
									display: "flex",
									gap: "20px",
									alignItems: "flex-end",
								}}
							>
								<div
									style={{
										flexDirection: "column",
										display: "flex",
									}}
								>
									{/* <FormLabel
										sx={{
											color: "black",
											fontWeight: "400",
										}}
									>
										Client Name
									</FormLabel> */}

									{/* <TextField
										variant="outlined"
										size="small"
										placeholder="Client Name"
										style={{
											backgroundColor: "transparent",
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<PermIdentityOutlinedIcon />
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            /> */}
									<List sx={{ width: "100%", maxWidth: 400 }}>
										<ListItem>
											<ListItemAvatar>
												<Avatar
													sx={{
														backgroundColor:
															"background.secondary",
														width: 84,
														height: 84,
														marginRight: "12px",
														overflow: "visible",
													}}
												>
													F
												</Avatar>
											</ListItemAvatar>
											<ListItemText secondary="Client name">
												<Typography
													variant="h4"
													style={{ fontWeight: 900 }}
												>
													Facebook
												</Typography>
											</ListItemText>
										</ListItem>
									</List>
									<Button
										variant="contained"
										size="small"
										onClick={() => setOpenClientName(true)}
										color="success"
										startIcon={<EditIcon />}
									>
										Change
									</Button>
								</div>
							</FormControl>
						</div>

						{/* PROJECT NAME */}
						<FormControl>
							<FormLabel
								sx={{
									color: "black",
									fontWeight: "400",
								}}
							>
								Project Name
							</FormLabel>

							<TextField
								style={{
									backgroundColor: "transparent",
									width: "570px",
									minWidth: "200px",
								}}
								variant="outlined"
								size="small"
								placeholder="Project Name"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FolderOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</FormControl>

						{/* DATES */}
						<div className={EditProjectStyle.formRow3}>
							<FormControl>
								<FormLabel
									sx={{
										color: "black",
										fontWeight: "400",
									}}
								>
									Start Date
								</FormLabel>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DatePicker
										value={selectedStartDate}
										onChange={(e) =>
											setSelectedStartDate(e)
										}
									/>
								</LocalizationProvider>
							</FormControl>

							<FormControl>
								<FormLabel
									sx={{
										color: "black",
										fontWeight: "400",
									}}
								>
									End Date
								</FormLabel>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DatePicker
										value={selectedEndDate}
										onChange={(e) => setSelectedEndDate(e)}
									/>
								</LocalizationProvider>
							</FormControl>
						</div>

						{/* PROJECT MANAGERS */}
						<div className={EditProjectStyle.formRow5}>
							<FormControl
								style={{
									flexDirection: "column",
									display: "flex",
									// gap: "20px",
								}}
							>
								<FormLabel
									sx={{
										color: "black",
										fontWeight: "400",
									}}
								>
									Project Manager
								</FormLabel>
								<Paper elevation={2} sx={{ padding: 2 }}>
									<Stack
										direction="row"
										spacing={1}
										width={530}
										useFlexGap
										flexWrap="wrap"
									>
										{selectedProjectManagers.map(
											(manager) => (
												<Chip
													avatar={
														<Avatar>
															{manager
																.charAt(0)
																.toLocaleUpperCase()}
														</Avatar>
													}
													label={manager}
												/>
											)
										)}
										<div>
											<Button
												onClick={() =>
													setOpenProjManager(true)
												}
												variant="contained"
												color="primary"
												startIcon={<Add />}
												style={{
													textTransform: "none",
												}}
											>
												Add Project Manager
											</Button>
										</div>
									</Stack>
								</Paper>
								{/* <div
									style={{
										flexDirection: "column",
										display: "flex",
									}}
								>

									<TextField
										variant="outlined"
										size="small"
										placeholder="Project Manager"
										style={{
											backgroundColor: "transparent",
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<PermIdentityOutlinedIcon />
												</InputAdornment>
											),
										}}
									/>
								</div> */}
							</FormControl>
						</div>

						{/* PROJECT DESCRIPTION */}
						<div className={EditProjectStyle.col2}>
							<div className={EditProjectStyle.gridContainer}>
								Project Description
								<ReactQuillEditor
									className={EditProjectStyle.qlContainer}
									theme="snow"
									value={value}
									// maxLines={`8`}
									// scrollOnMaxLines={true}
									onChange={setValue}
									modules={modules}
									placeholder="Project description..."
									// style={{ backgroundColor: "whitesmoke" }}
								/>
							</div>
						</div>

						{/* DEVELOPMENT PHASE */}
						<div className={EditProjectStyle.formRow6}>
							<FormLabel
								style={{
									paddingTop: ".5%",
									color: "black",
									fontWeight: "400",
								}}
							>
								Development Phase
							</FormLabel>
							<FormGroup
								style={{
									flexDirection: "row",
									display: "flex",
								}}
							>
								{devPhaseData.map((phase: any) => (
									<FormControlLabel
										key={phase.dev_phase_id}
										control={
											<Checkbox
												name={String(phase.dev_phase_id)}
												checked={projectDevPhase.includes(
													phase.dev_phase_id
												)}
												onChange={
													handleSelectDevPhaseChange
												}
											/>
										}
										label={phase.dev_phase_sh_name}
									/>
								))}
							</FormGroup>
						</div>

						{/* TECHNOLOGY */}
						<div className={EditProjectStyle.formRow5}>
							<FormControl
								style={{
									flexDirection: "row",
									display: "flex",
									gap: "20px",
								}}
							>
								<div
									style={{
										flexDirection: "column",
										display: "flex",
									}}
								>
									<FormLabel
										sx={{
											color: "black",
											fontWeight: "400",
										}}
									>
										Technology
									</FormLabel>
									<Select
										size="small"
										multiple
										value={projectTechnologies}
										onChange={handleSelectTechnologies}
										input={<OutlinedInput />}
										renderValue={handleTechValueRendering}
										sx={{
											minWidth: 250,
											maxWidth: 560,
										}}
									>
										{technologies.map((tech: any) => (
											<MenuItem
												key={tech.tech_id}
												value={tech.tech_id}
											>
												<Checkbox
													checked={
														projectTechnologies.indexOf(
															tech.tech_id as never
														) > -1
													}
												/>
												<ListItemText
													primary={tech.tech_name}
												/>
											</MenuItem>
										))}
									</Select>
								</div>
							</FormControl>
						</div>

						{/* MEMBERS */}
						<div className={EditProjectStyle.formRow5}>
							<FormControl
								style={{
									flexDirection: "row",
									display: "flex",
									gap: "20px",
								}}
							>
								<div
									style={{
										flexDirection: "column",
										display: "flex",
									}}
								>
									<FormLabel
										sx={{
											color: "black",
											fontWeight: "400",
										}}
									>
										Members
									</FormLabel>
									<Paper elevation={2} sx={{ padding: 2 }}>
										<Stack
											direction="row"
											spacing={1}
											width={530}
											useFlexGap
											flexWrap="wrap"
										>
											{selectedProjectMembers.map(
												(member) => (
													<Chip
														avatar={
															<Avatar>
																{member
																	.charAt(0)
																	.toLocaleUpperCase()}
															</Avatar>
														}
														label={member}
													/>
												)
											)}
											<div>
												<Button
													onClick={() =>
														setOpenMembers(true)
													}
													variant="contained"
													color="primary"
													startIcon={<Add />}
													style={{
														textTransform: "none",
													}}
												>
													Add Project Member
												</Button>
											</div>
										</Stack>
									</Paper>
								</div>
							</FormControl>
						</div>

						{/* STATUS */}
						<div className={EditProjectStyle.formRow8}>
							<div className="projStatus">
								<div className="projStatusContent">
									<FormControl
										variant="outlined"
										size="small"
									>
										<FormLabel
											sx={{
												color: "black",
												fontWeight: "400",
											}}
										>
											Status
										</FormLabel>
										<Select
											value={status}
											onChange={(e) =>
												setStatus(
													e.target.value as number
												)
											}
											startAdornment={
												<InputAdornment position="start">
													<GroupsOutlinedIcon />
												</InputAdornment>
											}
											sx={{
												minWidth: 250,
												maxWidth: 560,
											}}
										>
											<MenuItem key={0} value={0}>
												{"<Select a status>"}
											</MenuItem>
											{statuses.map((status: any) => (
												<MenuItem
													key={status?.proj_status_id}
													value={
														status?.proj_status_id
													}
												>
													{status?.proj_status_name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						</div>
					</div>

					{/* POPUPS */}

					{/* Clients */}
					<Dialog
						open={openClientName}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle>
							<FontAwesomeIcon
								icon={faUser}
								size="1x"
								color="black"
							/>
							{"Project Manager"}
						</DialogTitle>
						<DialogContent>
							<AddClientNameTable
								setClient={setProjectClient}
								data={clientsData}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpenClientName(false)}>
								Cancel
							</Button>
							<Button
								variant="contained"
								onClick={() => setOpenClientName(false)}
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					{/* Project Manager */}
					<Dialog
						open={openProjManager}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle>
							<FontAwesomeIcon
								icon={faUser}
								size="1x"
								color="black"
							/>
							{"Project Manager"}
						</DialogTitle>
						<DialogContent>
							<AddProjManagerTable
								selected={projectManager}
								data={usersData}
								temporarySetter={setTemporaryManagers}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpenProjManager(false)}>
								Cancel
							</Button>
							<Button
								variant="contained"
								onClick={() => {
									setProjectManager(temporaryManagers);
									setOpenProjManager(false);
								}}
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					{/* Members */}
					<Dialog
						open={openMembers}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle>
							<FontAwesomeIcon
								icon={faUser}
								size="1x"
								color="black"
							/>
							{"Members"}
						</DialogTitle>
						<DialogContent>
							<AddMemberTable
								data={usersData}
								selected={projectMembers}
								temporarySetter={setTemporaryMembers}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpenMembers(false)}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									setProjectMembers(temporaryMembers);
									setOpenMembers(false);
								}}
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					{/* SAVING BUTTONS */}
					<div
						style={{
							display: "flex",
							gap: "8px",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="contained"
							color="primary"
							startIcon={<SaveOutlinedIcon />}
							style={{
								textTransform: "none",
							}}
						>
							SAVE
						</Button>
						<Link
							to="/project"
							style={{
								textDecoration: "none",
							}}
						>
							<Button
								variant="contained"
								startIcon={<CancelOutlinedIcon />}
								style={{
									textTransform: "none",
									backgroundColor: "gray",
								}}
							>
								CANCEL
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
