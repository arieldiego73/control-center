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
	Grid,
	Stack,
	Chip,
	Avatar,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
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
import InputBase from "@mui/material/InputBase";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SettingsEthernetOutlinedIcon from "@mui/icons-material/SettingsEthernetOutlined";
import AddProjManagerTable from "../AddProjManagerTable";
import ReactQuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClientFetch } from "../../../redux/state/clientState";
import { RootState } from "../../../redux/store/store";
import { getDevPhaseFetch } from "../../../redux/state/devPhaseState";
import AddClientNameTable from "../AddClientNameTable";
import { GridRowParams } from "@mui/x-data-grid";

export default function EditProj() {
	const dispatch = useDispatch();

	const [projectName, setProjectName] = React.useState("");
	const [selectedStartDate, setSelectedStartDate] =
		React.useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
		null
	);
	const [projectManager, setProjectManager] = useState("");
	const [client, setClient] = useState<GridRowParams>();
	const [projectDescription, setProjectDescription] = useState("");
	const [devPhase, setDevPhase] = useState("");
	const [member, setMember] = useState("");
	const [status, setStatus] = useState("");

	React.useEffect(() => {
		dispatch(getClientFetch());
		dispatch(getDevPhaseFetch());
	}, [dispatch]);

	const clientsData = useSelector(
		(state: RootState) => state.clientReducer.clients
	);
	const devPhaseData = useSelector(
		(state: RootState) => state.devPhaseReducer.devPhase
	);

	React.useEffect(() => {
		console.log(client);
	}, [client]);

	//for description box (formatting toolbar)
	const [value, setValue] = useState("");

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }],
		],
	};

	const [open, setOpen] = React.useState(false);
	const [openProjManager, setOpenProjManager] = React.useState(false);
	const [openClientName, setOpenClientName] = React.useState(false);
	const [openTechnology, setOpenTechnology] = React.useState(false);

	const handleCloseTechnology = () => {
		setOpenTechnology(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenProjManager = () => {
		setOpenProjManager(true);
	};

	const handleCloseProjManager = () => {
		setOpenProjManager(false);
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
										<Chip
											avatar={<Avatar>M</Avatar>}
											label="Ricky"
										/>
										<Chip
											avatar={<Avatar>M</Avatar>}
											label="Ariel Diego"
										/>
										<Chip
											avatar={<Avatar>M</Avatar>}
											label="Shernan Mateo"
										/>
										<Chip
											avatar={<Avatar>M</Avatar>}
											label="Avatar"
										/>
										<Chip
											avatar={<Avatar>M</Avatar>}
											label="Avatar"
										/>
										<div>
											<Button
												onClick={
													handleClickOpenProjManager
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
										control={<Checkbox />}
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
									<TextField
										variant="outlined"
										size="small"
										placeholder="Technology"
										style={{
											backgroundColor: "transparent",
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SettingsEthernetOutlinedIcon />
												</InputAdornment>
											),
										}}
									/>
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
									<TextField
										variant="outlined"
										size="small"
										placeholder="Members"
										style={{
											backgroundColor: "transparent",
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<GroupsOutlinedIcon />
												</InputAdornment>
											),
										}}
									/>
								</div>

								<Button
									onClick={handleClickOpen}
									variant="contained"
									color="primary"
									startIcon={<Add />}
									style={{
										textTransform: "none",
										fontFamily: "Montserrat, sans-serif",
									}}
								>
									Add Members
								</Button>
							</FormControl>
						</div>

						{/* STATUS */}
						<div className={EditProjectStyle.formRow8}>
							<div className="projStatus">
								<Grid container alignItems="center" spacing={2}>
									<div className="projStatusContent">
										<Grid item>
											<FormLabel
												sx={{
													fontFamily:
														"Montserrat, sans-serif",
													width: "100%",
													color: "black",
													fontWeight: "400",
												}}
											>
												Status
											</FormLabel>
										</Grid>
										<Grid item xs>
											<FormControl
												variant="outlined"
												size="small"
												style={{ width: "100%" }}
											>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													onChange={(event) =>
														setStatus(
															event.target
																.value as string
														)
													}
													sx={{ width: "200px" }}
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
									</div>
								</Grid>
							</div>
						</div>
					</div>

					{/* Popup */}

					<Dialog
						open={openClientName}
						onClose={handleClose}
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
							<AddClientNameTable setClient={setClient} />
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpenClientName(false)}>
								Cancel
							</Button>
							<Button onClick={handleCloseProjManager}>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					<Dialog
						open={open}
						onClose={handleClose}
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
							<AddMemberTable />
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button onClick={handleClose}>Save</Button>
						</DialogActions>
					</Dialog>

					<Dialog
						open={openProjManager}
						onClose={handleClose}
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
							<AddProjManagerTable />
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleCloseProjManager}
								sx={{ fontFamily: "Montserrat, sans-serif" }}
							>
								Cancel
							</Button>
							<Button
								onClick={handleCloseProjManager}
								sx={{ fontFamily: "Montserrat, sans-serif" }}
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					<Dialog
						open={openTechnology}
						onClose={handleCloseTechnology}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle>
							<FontAwesomeIcon
								icon={faUser}
								size="1x"
								color="black"
							/>
							{"Technology"}
						</DialogTitle>
						<DialogContent>
							<AddProjManagerTable />
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleCloseTechnology}
								sx={{ fontFamily: "Montserrat, sans-serif" }}
							>
								Cancel
							</Button>
							<Button
								onClick={handleCloseTechnology}
								sx={{ fontFamily: "Montserrat, sans-serif" }}
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					{/* SAVING BUTTONS */}
					<div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
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
