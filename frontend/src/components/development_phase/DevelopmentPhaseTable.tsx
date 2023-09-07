import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import SortIcon from "@mui/icons-material/Sort";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonFourIcon from "@mui/icons-material/Person4";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
	GridRowSelectionModel,
	GridToolbar,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getRolesFetch } from "../../redux/state/roleState";
import {
	addRoles,
	deleteRoles,
	deleteRolesBatch,
	updateRoles,
} from "../../redux/saga/roleSaga";
import {
	Alert,
	AlertColor,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormLabel,
	InputAdornment,
	Snackbar,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import DevelopmentPhaseModuleStyle from "./DevelopmentPhase.module.css";
import { getDevPhaseFetch } from "../../redux/state/devPhaseState";
import { addDevPhase, deleteDevPhase, deleteDevPhaseBatch, updateDevPhase } from "../../redux/saga/devPhaseSaga";

export interface SnackbarMessage {
	message: string;
	key: number;
}

export interface State {
	open: boolean;
	snackPack: readonly SnackbarMessage[];
	messageInfo?: SnackbarMessage;
}

interface EditToolbarProps {
	setRowProp: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
	) => void;
}

export default function DevelopmentPhaseTable() {
	const dispatch = useDispatch();

	// GET ALL THE DEV PHASE AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getDevPhaseFetch());
	}, [dispatch]);

	// STORE THE DEV PHASE TO 'data'
	const data = useSelector(
		(state: RootState) => state.devPhaseReducer.devPhase
	);

	const [isHidden, setIsHidden] = React.useState(false);
	const [rows, setRows] = React.useState<GridRowsProp>(data);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
		{}
	);
	const [rowSelectionModel, setRowSelectionModel] =
		React.useState<GridRowSelectionModel>([]);
	const [selectedId, setSelectedId] = React.useState<Set<GridRowId>>(
		new Set()
	);
	const [isBatch, setIsBatch] = React.useState<boolean>();
	const [dialogTitle, setDialogTitle] = React.useState("");
	const [dialogContentText, setDialogContentText] = React.useState("");

	const [ask, setAsk] = React.useState(false);
	const [deleteId, setDeleteId] = React.useState(0);

	const [snackPack, setSnackPack] = React.useState<
		readonly SnackbarMessage[]
	>([]);
	const [severity, setSeverity] = React.useState<AlertColor>("error");
	const [open, setOpen] = React.useState(false);
	const [messageInfo, setMessageInfo] = React.useState<
		SnackbarMessage | undefined
	>(undefined);

	const dataGridSlots = {
		toolbar: EditToolbar,
		columnUnsortedIcon: UnsortedIcon,
	};

	function UnsortedIcon() {
		return <SortIcon className="icon" />;
	}

	// FOR CONFIRM DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	// FOR SNACKPACK
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

	// FOR DATA GRID
	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const [devPhaseName, setDevPhaseName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	// const [userLevel, setUserLevel] = React.useState("");
	const devPhaseNameRef = React.useRef<HTMLInputElement | null>(null);

	function EditToolbar(props: EditToolbarProps) {
		const handleDeleteBatch = () => {
			setAsk(true);
			setIsBatch(true);
			setDialogContentText(
				"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
			);
			setDialogTitle(
				`Delete ${
					selectedId.size > 1 ? `these ${selectedId.size}` : "this"
				} development phase${selectedId.size > 1 ? "s" : ""}?`
			);
		};

		return (
			<GridToolbarContainer
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
				}}
			>
				<Button
					color="error"
					variant="contained"
					startIcon={<DeleteIcon />}
					onClick={handleDeleteBatch}
					hidden={true}
					sx={{
						marginBottom: 3,
						fontFamily: "Montserrat, san-serif",
						visibility: `${
							selectedId.size !== 0 ? "visible" : "hidden"
						}`,
					}}
				>
					DELETE BATCH
				</Button>
				<div>
					<GridToolbar />
				</div>
			</GridToolbarContainer>
		);
	}

	const proceedWithDelete = () => {
		dispatch(deleteDevPhase({ dev_phase_id: deleteId }));
		setRows(data);
		setAsk(false);
		const success = handleClickSnackpack(
			"A development phase is deleted successfully!",
			"success"
		);
		success();
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deleteDevPhaseBatch({ batchId: selectedId }));
		setRows(data); // update rows
		setRowSelectionModel([]); // clear selected rows
		setSelectedId(new Set()); // clear selected IDs
		setAsk(false); // close dialog
		const success = handleClickSnackpack(
			`Deleted ${selectedId.size} development phase/s successfully!`,
			"success"
		);
		success();
	};

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit },
		});
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setAsk(true);
		setIsBatch(false);
		setDialogContentText(
			"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
		);
		setDialogTitle("Delete this role?");
		setDeleteId(id as number);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		setRows(data);
	};

	const processUpdateRow = (devPhaseData: GridRowModel) => {
		dispatch(updateDevPhase({ devPhaseData }));
		const success = handleClickSnackpack(
			"Development Phase is updated successfully",
			"success"
		);
		success();
	};

	const processAddRow = (devPhaseData: GridRowModel) => {
		dispatch(addDevPhase({ devPhaseData }));
		const success = handleClickSnackpack(
			"Development phase is added successfully",
			"success"
		);
		success();
	};

	const handleAdd = () => {
		if (devPhaseName && shortName) {
			const devPhaseData: GridValidRowModel = {
				dev_phase_name: devPhaseName,
				dev_phase_sh_name: shortName,
			};
			processAddRow(devPhaseData);
			setIsHidden(false);
			setDevPhaseName("");
			setShortName("");
		} else {
			const error = handleClickSnackpack(
				"All fields are required! Please, try again.",
				"error"
			);
			error();
		}
	};

	const handleAddContinue = () => {
		if (devPhaseName && shortName) {
			const devPhaseData: GridValidRowModel = {
				dev_phase_name: devPhaseName,
				dev_phase_sh_name: shortName,
			};
			processAddRow(devPhaseData);
			setDevPhaseName("");
			setShortName("");
			devPhaseNameRef.current?.focus();
		} else {
			const error = handleClickSnackpack(
				"All fields are required! Please, try again.",
				"error"
			);
			error();
		}
	};

	const handleUpdateAndAdd = (newRow: GridRowModel) => {
		if (newRow.dev_phase_name && newRow.dev_phase_sh_name) {
			processUpdateRow(newRow);
			setRows(data); // update the rows in the table
		} else {
			const cancel = handleCancelClick(newRow.role_id);
			const error = handleClickSnackpack(
				"All fields are required! Please, try again.",
				"error"
			);
			cancel();
			error();
		}
		return newRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{
			field: "dev_phase_name",
			headerName: "Development Phase",
			width: 300,
			editable: true,
			flex: 12,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "dev_phase_sh_name",
			headerName: "Short Name",
			width: 300,
			editable: true,
			flex: 12,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 200,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode =
					rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .MuiDataGrid-columnHeaderTitle": {
					fontWeight: 800,
					fontFamily: "Montserrat, san-serif",
					padding: "0 24px",
				},
				"& .MuiDataGrid-root .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader:focus":
					{
						outline: "none !important",
					},
				"& .MuiDataGrid-root .MuiInputBase-input": {
					textAlign: "center",
					backgroundColor: "#fff",
				},
				"& .MuiDataGrid-root .MuiDataGrid-editInputCell": {
					padding: "0 0.8vw",
					height: "60%",
				},
				"& .MuiDataGrid-root .MuiDataGrid-row--editing .MuiDataGrid-cell":
					{
						backgroundColor: "#cbbdbd2e",
					},
				"& .textPrimary": {
					color: "text.primary",
				},
				".MuiDataGrid-iconButtonContainer, .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon, .MuiDataGrid-columnHeaders .MuiDataGrid-columnSeparator":
					{
						visibility: "visible",
						width: "auto",
					},
				".MuiDataGrid-sortIcon": {
					opacity: "inherit !important",
				},
				".MuiDataGrid-cellContent": {
					fontWeight: "500",
				},
			}}
		>
			<Box
				component="form"
				onKeyDown={(e) => {
					if (e.key.match("Enter")) handleAddContinue();
				}}
				style={{
					position: "relative",
					display: "flex",
					justifyContent: "flex-end",
					padding: "12px",
				}}
			>
				{!isHidden ? (
					<Button
						variant="contained"
						color="primary"
						sx={{ fontFamily: "Montserrat, san-serif" }}
						onClick={() => setIsHidden(true)}
						startIcon={<AddIcon />}
					>
						Add Role
					</Button>
				) : (
					<div className={DevelopmentPhaseModuleStyle.hideButton}>
						<div
							style={{
								flexDirection: "row",
								display: "flex",
								justifyContent: "space-around",
								alignItems: "center",
								width: "100%",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
									alignItems: "center",
									width: "70%",
									gap: "24px",
								}}
							>
								<FormControl>
									<FormLabel
										style={{
											fontWeight: "bold",
											fontFamily: "Montserrat, san-serif",
										}}
									>
										Development Phase
									</FormLabel>
									<TextField
										style={{ width: "100%" }}
										size="small"
										placeholder="ex: Software Developer"
										onChange={(e) =>
											setDevPhaseName(e.target.value)
										}
										value={devPhaseName}
										autoFocus
										inputRef={devPhaseNameRef}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<PersonIcon />
												</InputAdornment>
											),
										}}
									/>
								</FormControl>
								<FormControl>
									<FormLabel
										style={{
											fontWeight: "bold",
											fontFamily: "Montserrat, san-serif",
										}}
									>
										Short Name
									</FormLabel>
									<TextField
										style={{ width: "100%" }}
										variant="outlined"
										size="small"
										placeholder="ex: SoftDev"
										onChange={(e) =>
											setShortName(e.target.value)
										}
										value={shortName}
										className={
											DevelopmentPhaseModuleStyle.textField
										}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<BadgeIcon />
												</InputAdornment>
											),
										}}
									/>
								</FormControl>
								{/* <FormControl>
									<FormLabel style={{ fontWeight: "bold", fontFamily: "Montserrat, san-serif" }}>
										User Level
									</FormLabel>
									<TextField
										style={{ width: "100%" }}
										variant="outlined"
										size="small"
										type="number"
										placeholder="ex: 1"
										onChange={(e) =>
											setUserLevel(e.target.value)
										}
										value={userLevel}
										className={DevelopmentPhaseModuleStyle.textField}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<PersonFourIcon />
												</InputAdornment>
											),
										}}
									/>
								</FormControl> */}
							</div>

							<div
								style={{
									flexDirection: "row",
									display: "flex",
									alignItems: "flex-end",
									height: "100%",
									gap: "10px",
								}}
							>
								<Button
									variant="contained"
									color="primary"
									startIcon={<SaveIcon />}
									style={{
										textTransform: "none",
										height: "50%",
										fontFamily: "Montserrat, san-serif",
									}}
									onClick={handleAddContinue}
								>
									Save and Continue
								</Button>
								<Button
									variant="contained"
									color="primary"
									startIcon={<SaveIcon />}
									style={{
										textTransform: "none",
										height: "50%",
										fontFamily: "Montserrat, san-serif",
									}}
									onClick={handleAdd}
								>
									Save
								</Button>
								<Button
									style={{
										height: "50%",
										fontFamily: "Montserrat, san-serif",
									}}
									onClick={() => {
										setIsHidden(false);
										setDevPhaseName("");
										setShortName("");
									}}
								>
									Close
								</Button>
							</div>
						</div>
					</div>
				)}
			</Box>

			<DataGrid
				sx={{ height: 650, border: "none" }}
				rows={rows}
				columns={columns}
				editMode="row"
				getRowId={(row) => row.dev_phase_id}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={handleUpdateAndAdd}
				checkboxSelection
				keepNonExistentRowsSelected
				onRowSelectionModelChange={(newRowSelectionModel) => {
					setRowSelectionModel(newRowSelectionModel);
					setSelectedId(new Set(newRowSelectionModel));
				}}
				rowSelectionModel={rowSelectionModel}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 25 },
					},
					sorting: {
						sortModel: [{ field: "reg_id", sort: "desc" }],
					},
				}}
				slots={dataGridSlots}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
				pageSizeOptions={[25, 50, 100]}
			/>
			<Snackbar
				key={messageInfo ? messageInfo.key : undefined}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				TransitionProps={{ onExited: handleExited }}
				// message={messageInfo ? messageInfo.message : undefined}
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
			<Dialog
				fullScreen={fullScreen}
				open={ask}
				onClose={() => {
					setAsk(false);
				}}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<Typography
						fontFamily={"Montserrat, san-serif"}
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
						fontFamily={"Montserrat, san-serif"}
						whiteSpace={"pre-line"}
					>
						{dialogContentText}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={
							isBatch ? proceedWithDeleteBatch : proceedWithDelete
						}
						autoFocus
						sx={{ fontFamily: "Montserrat, san-serif" }}
					>
						Delete
					</Button>

					<Button
						sx={{ fontFamily: "Montserrat, san-serif" }}
						onClick={() => {
							setAsk(false);
						}}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
