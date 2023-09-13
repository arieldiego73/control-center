import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
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
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControl,
	FormLabel,
	InputAdornment,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import DevelopmentPhaseModuleStyle from "./DevelopmentPhase.module.css";
import { getDevPhaseFetch } from "../../redux/state/devPhaseState";
import {
	addDevPhase,
	deleteDevPhase,
	deleteDevPhaseBatch,
	updateDevPhase,
} from "../../redux/saga/devPhaseSaga";
import { datagridBoxStyle, datagridStyle } from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import EditToolbarProps from "../datagrid_customs/EditToolbarProps";
import DataGridProps from "../datagrid_customs/DataGridProps";

const DevelopmentPhaseTable: React.FC<DataGridProps> = (props) => {
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

	const dataGridSlots = {
		toolbar: EditToolbar,
		columnUnsortedIcon: UnsortedIcon,
	};

	// FOR CONFIRM DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
						marginLeft: 1.5,
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
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deleteDevPhaseBatch({ batchId: selectedId }));
		setRows(data); // update rows
		setRowSelectionModel([]); // clear selected rows
		setSelectedId(new Set()); // clear selected IDs
		setAsk(false); // close dialog
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
		setRows(data); // update rows
	};

	const processAddRow = (devPhaseData: GridRowModel) => {
		dispatch(addDevPhase({ devPhaseData }));
		setRows(data); // update rows
	};

	const handleAdd = () => {
		addRecord(true);
	};

	const handleAddContinue = () => {
		addRecord(false);
	};

	const addRecord = (isAddOnly: boolean) => {
		if (devPhaseName && shortName) {
			const posData: GridValidRowModel = {
				dev_phase_name: devPhaseName,
				dev_phase_sh_name: shortName,
			};
			processAddRow(posData);
			setDevPhaseName("");
			setShortName("");
			if (isAddOnly) {
				setIsHidden(false);
			} else {
				devPhaseNameRef.current?.focus();
			}
		} else {
			const error = props.createSnackpack(
				"All fields are required! Please, try again.",
				"error"
			);
			error();
		}
	};

	const handleUpdate = (newRow: GridRowModel) => {
		if (newRow.dev_phase_name && newRow.dev_phase_sh_name) {
			processUpdateRow(newRow);
		} else {
			const cancel = handleCancelClick(newRow.dev_phase_id);
			const error = props.createSnackpack(
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
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "dev_phase_sh_name",
			headerName: "Short Name",
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			minWidth: 200,
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
		<Box sx={datagridBoxStyle}>
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
						onClick={() => setIsHidden(true)}
						startIcon={<AddIcon />}
					>
						Add Phase
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
									<FormLabel style={{ fontWeight: "bold" }}>
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
									alignItems: "center",
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
									}}
									onClick={handleAdd}
								>
									Save
								</Button>
								<Button
									style={{
										height: "50%",
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

			<Divider variant="middle" />

			<DataGrid
				sx={datagridStyle}
				rows={rows}
				columns={columns}
				editMode="row"
				getRowId={(row) => row.dev_phase_id}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={handleUpdate}
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
				}}
				slots={dataGridSlots}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
				pageSizeOptions={[25, 50, 100]}
			/>
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
					<DialogContentText whiteSpace={"pre-line"}>
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
					>
						Delete
					</Button>

					<Button
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
};

export default DevelopmentPhaseTable;
