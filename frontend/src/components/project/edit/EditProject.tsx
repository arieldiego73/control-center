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
	AlertColor,
	Snackbar,
	Alert,
	DialogContentText,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditIcon from "@mui/icons-material/Edit";
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
import HelpIcon from "@mui/icons-material/Help";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClientFetch } from "../../../redux/state/clientState";
import { RootState } from "../../../redux/store/store";
import { getDevPhaseFetch } from "../../../redux/state/devPhaseState";
import AddClientNameTable from "../AddClientNameTable";
import { GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { getUsersFetch } from "../../../redux/state/userState";
import { getTechnologyFetch } from "../../../redux/state/technologyState";
import { getProjectStatusFetch } from "../../../redux/state/projectStatusState";
import dayjs, { Dayjs } from "dayjs";
import {
	Data,
	getProjectInfo,
	updateProject,
} from "../../../redux/saga/projectSaga";
import { getDevTypeFetch } from "../../../redux/state/devTypeState";
import {
	addProjectReset,
	clearProjectInfo,
} from "../../../redux/state/projectState";
import stringAvatar from "../../custom_color/avatar_custom_color";

export interface SnackbarMessage {
	message: string;
	key: number;
}

export interface State {
	open: boolean;
	snackPack: readonly SnackbarMessage[];
	messageInfo?: SnackbarMessage;
}

const GLOBAL_TIMEOUT = 3000;
const DEFAULT_MANAGER_ID = 100;

export default function EditProject() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const PROJECT_ID = location.state;

	React.useEffect(() => {
		if (PROJECT_ID) {
			dispatch(getProjectInfo({ projectId: PROJECT_ID }));
		} else {
			navigate("/project"); // if the location.state is cleared, navigate back to the table
		}

		return () => {
			dispatch(clearProjectInfo());
			setClientName("");
		};
	}, []);

	// FOR SNACKPACK ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	const notice = useSelector(
		(state: RootState) => state.projectReducer.notice
	);
	const isInitialAmount = React.useRef(true);
	React.useEffect(() => {
		if (!isInitialAmount.current) {
			if (notice.message && notice.severity) {
				handleClickSnackpack(
					notice.message,
					notice.severity as AlertColor
				)();
			}
		} else {
			isInitialAmount.current = false;
		}
	}, [notice]);

	const [snackPack, setSnackPack] = React.useState<
		readonly SnackbarMessage[]
	>([]);
	const [severity, setSeverity] = React.useState<AlertColor>("error");
	const [open, setOpen] = React.useState(false);
	const [messageInfo, setMessageInfo] = React.useState<
		SnackbarMessage | undefined
	>(undefined);

	React.useEffect(() => {
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({ ...snackPack[0] });
			setSnackPack((prev) => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(false);
		}
	}, [snackPack, messageInfo, open]);

	const handleClickSnackpack =
		(message: string, severity: AlertColor) => () => {
			setSnackPack((prev) => [
				...prev,
				{ message, key: new Date().getTime() },
			]);
			setSeverity(severity);
		};

	const handleClose = (event: React.SyntheticEvent | Event) => {
		setOpen(false);
	};

	const handleExited = () => {
		setMessageInfo(undefined);
	};
	// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// FOR DIALOG ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	const [ask, setAsk] = React.useState(false);
	const [dialogTitle, setDialogTitle] = React.useState("");
	const [dialogContentText, setDialogContentText] = React.useState("");
	const [isSaving, setIsSaving] = React.useState(false);

	const handleCancelDialog = () => {
		setAsk(true);
		setDialogTitle("Cancel the edit?");
		setDialogContentText(
			"Modifications made with the record will be \nlost forever."
		);
		setIsSaving(false);
	};

	const handleSaveDialog = () => {
		if (
			projectName &&
			projectDescription &&
			selectedStartDate &&
			selectedEndDate &&
			selectedClientId &&
			status &&
			projectMembers &&
			projectDevPhase &&
			projectTechnologies
		) {
			setAsk(true);
			setDialogTitle("Save the record?");
			setDialogContentText(
				"Upon proceeding, the modifications made on the record \nwill be saved."
			);
			setIsSaving(true);
		} else {
			handleClickSnackpack(
				"Only Development Type and managers are optional. Please, fill out all the required fields.",
				"error"
			)();
		}
	};
	// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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

	// PROJECT CLIENT VARIABLES :::::::::::::::::::::::::::::::::::::::::::::::::::::::
	const [projectClient, setProjectClient] = useState<GridRowParams>();
	const [clientName, setClientName] = useState("Select a client");
	const [selectedClientId, setSelectedClientId] = useState<number[]>([]);
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	const [projectDescription, setProjectDescription] = useState("");
	const [projectDevPhase, setProjectDevPhase] = useState<number[]>([]);
	const [projectTechnologies, setProjectTechnologies] = useState<number[]>(
		[]
	);
	const [projectName, setProjectName] = React.useState("");
	const [selectedStartDate, setSelectedStartDate] =
		React.useState<Dayjs | null>(dayjs());
	const [selectedEndDate, setSelectedEndDate] = React.useState<Dayjs | null>(
		dayjs().add(1, "day")
	);
	const [status, setStatus] = useState(0);
	const [devType, setDevType] = useState(0);
	const [projectCode, setProjectCode] = useState("");

	React.useEffect(() => {
		dispatch(getClientFetch());
		dispatch(getDevPhaseFetch());
		dispatch(getUsersFetch()); // to fetch all users for project manager selections
		dispatch(getTechnologyFetch());
		dispatch(getProjectStatusFetch());
		dispatch(getDevTypeFetch());
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
	const devTypes = useSelector(
		(state: RootState) => state.devTypeReducer.devType
	);

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

	const projectInfo = useSelector(
		(state: RootState) => state.projectReducer.projectInfo
	);

	React.useEffect(() => {
		if (projectInfo) {
			const client: any = clientsData.find(
				(client: any) => client.client_id === projectInfo.client_id
			);
			if (client) setClientName(client?.client_name);

			setProjectName(projectInfo.proj_name);
			setProjectDescription(projectInfo.proj_desc);
			setSelectedStartDate(dayjs(projectInfo.start_date));
			setSelectedEndDate(dayjs(projectInfo.end_date));
			setSelectedClientId([projectInfo.client_id]);
			setStatus(projectInfo.status_code);
			setProjectManager(projectInfo.manager_emp_id);
			setProjectMembers(projectInfo.member_emp_id);
			setProjectDevPhase(projectInfo.dev_phase_id);
			setProjectTechnologies(projectInfo.tech_id);
			setDevType(projectInfo.dev_type_id[0]);
			setProjectCode(projectInfo.proj_code);
		}
	}, [clientsData, projectInfo]);

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

	const handleProjectDurationChange = (e: Dayjs | null, type: string) => {
		if (type === "start") {
			if (selectedEndDate && e) {
				if (e.isBefore(selectedEndDate)) {
					setSelectedStartDate(dayjs(e));
				} else {
					handleClickSnackpack(
						"The start date cannot be later than the end. Please, try again.",
						"error"
					)();
					setSelectedStartDate(dayjs());
					setSelectedEndDate(dayjs().add(1, "day"));
				}
			} else {
				setSelectedStartDate(dayjs(e));
			}
		} else {
			if (selectedStartDate && e) {
				if (e.isAfter(selectedStartDate)) {
					setSelectedEndDate(dayjs(e));
				} else {
					handleClickSnackpack(
						"The end date cannot be earlier than the start. Please, try again.",
						"error"
					)();
					setSelectedStartDate(dayjs());
					setSelectedEndDate(dayjs().add(1, "day"));
				}
			} else {
				setSelectedEndDate(dayjs(e));
			}
		}
	};

	const handleSelectDevPhaseChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const id = parseInt(event.target.name);
		const idIndex = projectDevPhase.indexOf(id);

		if (idIndex !== -1) {
			const newProjectDevPhase = [
				...projectDevPhase.slice(0, idIndex),
				...projectDevPhase.slice(idIndex + 1),
			];
			setProjectDevPhase(newProjectDevPhase);
		} else {
			setProjectDevPhase([...projectDevPhase, id]);
		}
	};

	const handleSelectTechnologies = (
		e: SelectChangeEvent<typeof projectTechnologies>
	) => setProjectTechnologies(e.target.value as number[]);

	const handleTechValueRendering = () => {
		const selectedTechs: string[] = [];
		projectTechnologies.forEach((techId) => {
			const matchingTech: any = technologies.find(
				(tech: any) => tech.tech_id === techId
			);
			if (matchingTech) {
				selectedTechs.push(matchingTech.tech_name);
			}
		});
		return (
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 0.5,
				}}
			>
				{projectTechnologies.length > 0 ? (
					selectedTechs.map((value) => (
						<Chip color="success" key={value} label={value} />
					))
				) : (
					<Chip key={0} label="Select technologies..." />
				)}
			</Box>
		);
	};

	const proceedToSaveProject = () => {
		const projectInfo: Data = {
			proj_name: projectName,
			proj_code: projectCode,
			proj_description: projectDescription,
			start_date: dayjs(selectedStartDate),
			end_date: dayjs(selectedEndDate),
			projectStatusId: status,
			devTypeId: devType,
			clientId: selectedClientId,
			selectedManagers: projectManager
				? (projectManager as number[])
				: [DEFAULT_MANAGER_ID],
			selectedMembers: projectMembers as number[],
			selectedDevPhase: projectDevPhase,
			selectedTechnologies: projectTechnologies,
		};
		dispatch(updateProject({ data: projectInfo, projectId: PROJECT_ID }));
		setAsk(false)
	};

	const handleCancel = () => {
		dispatch(clearProjectInfo());
		setClientName("");
		navigate("/project");
	};

	// FOR REDIRECT AFTER SAVING
	const isAddSuccess = useSelector(
		(state: RootState) => state.projectReducer.isAddSuccess
	);
	React.useEffect(() => {
		if (isAddSuccess) {
			dispatch(addProjectReset());
			setTimeout(() => {
				navigate("/project");
			}, GLOBAL_TIMEOUT);
		}
	}, [dispatch, isAddSuccess, navigate]);

	return (
		<>
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
										<List
											sx={{
												width: "100%",
												maxWidth: 400,
											}}
										>
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
														{clientName
															.charAt(0)
															.toLocaleUpperCase()}
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													secondary={"Project Code: " + projectCode}
												>
													<Typography
														variant="h4"
														style={{
															fontWeight: 900,
														}}
													>
														{clientName}
													</Typography>
												</ListItemText>
											</ListItem>
										</List>
										<Button
											variant="contained"
											size="small"
											onClick={() =>
												setOpenClientName(true)
											}
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
									value={projectName}
									onChange={(e) =>
										setProjectName(e.target.value)
									}
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
											reduceAnimations
											onChange={(e) =>
												handleProjectDurationChange(
													e,
													"start"
												)
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
											reduceAnimations
											onChange={(e) =>
												handleProjectDurationChange(
													e,
													"end"
												)
											}
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
														key={manager}
														// style={{ backgroundColor: "#F4B62B" }}
														avatar={
															<Avatar
																{...stringAvatar(
																	manager
																)}
															/>
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
													startIcon={selectedProjectManagers.length !== 0 ? <EditIcon /> : <Add />}
													style={{
														textTransform: "none",
													}}
												>
													{selectedProjectManagers.length !== 0 ? "Edit" : "Add"} Project Manager
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
										value={projectDescription}
										onChange={(e) =>
											setProjectDescription(e)
										}
										modules={modules}
										placeholder="Project description..."
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
													name={String(
														phase.dev_phase_id
													)}
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
											renderValue={
												handleTechValueRendering
											}
											displayEmpty
											sx={{
												width: 560,
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

							{/* DEV TYPE */}
							<div className={EditProjectStyle.formRow8}>
								<div className="projDevType">
									<div className="projDevTypeContent">
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
												{"Development Type (optional)"}
											</FormLabel>
											<Select
												value={devType}
												onChange={(e) =>
													setDevType(
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
												<MenuItem key={0} value={1}>
													{"<None is selected>"}
												</MenuItem>
												{devTypes.map(
													(devType: any) => (
														<MenuItem
															key={
																devType?.dev_type_id
															}
															value={
																devType?.dev_type_id
															}
														>
															{
																devType?.dev_type_name
															}
														</MenuItem>
													)
												)}
											</Select>
										</FormControl>
									</div>
								</div>
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
										<Paper
											elevation={2}
											sx={{ padding: 2 }}
										>
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
															key={member}
															avatar={
																<Avatar
																	{...stringAvatar(
																		member
																	)}
																></Avatar>
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
														startIcon={selectedProjectMembers.length !== 0 ? <EditIcon /> : <Add />}
														style={{
															textTransform:
																"none",
														}}
													>
														{selectedProjectMembers.length !== 0 ? "Edit" : "Add"} Project Member
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
														key={
															status?.proj_status_id
														}
														value={
															status?.proj_status_id
														}
													>
														{
															status?.proj_status_name
														}
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
									selectedClientId={selectedClientId}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={() => setOpenClientName(false)}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									onClick={() => {
										if (projectClient) {
											setClientName(
												projectClient.row?.client_name
											);
											setSelectedClientId(
												projectClient.row?.client_id
											);
										}
										setOpenClientName(false);
									}}
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
								<Button
									onClick={() => setOpenProjManager(false)}
								>
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
								onClick={handleSaveDialog}
							>
								SAVE AND GO BACK
							</Button>
							<Button variant="text" onClick={handleCancelDialog}>
								CANCEL
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Dialog
				open={ask}
				onClose={() => {
					setAsk(false);
				}}
				aria-labelledby="responsive-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="responsive-dialog-title">
					<Typography
						fontWeight={700}
						fontSize={20}
						display={"flex"}
						alignItems={"center"}
						gap={1}
					>
						<HelpIcon
							accentHeight={100}
							color="error"
							fontSize="large"
							alignmentBaseline="middle"
						/>
						{dialogTitle}
					</Typography>
				</DialogTitle>

				<DialogContent>
					<DialogContentText
						whiteSpace={"pre-line"}
						id="alert-dialog-description"
					>
						{dialogContentText}
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button
						variant="contained"
						onClick={
							isSaving ? proceedToSaveProject : handleCancel
						}
						autoFocus
					>
						{isSaving ? "Save" : "Cancel"}
					</Button>

					<Button
						onClick={() => {
							setAsk(false);
						}}
					>
						Continue editing
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				key={messageInfo ? messageInfo.key : undefined}
				open={open}
				autoHideDuration={GLOBAL_TIMEOUT}
				onClose={handleClose}
				TransitionProps={{ onExited: handleExited }}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			>
				<Alert
					onClose={handleClose}
					severity={severity}
					sx={{ width: "100%" }}
					variant="filled"
				>
					{messageInfo ? messageInfo.message : undefined}
				</Alert>
			</Snackbar>
		</>
	);
}
