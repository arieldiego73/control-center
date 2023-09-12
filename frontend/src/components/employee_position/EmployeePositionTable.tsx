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
	AlertColor,
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
import PositionModuleStyle from "./EmployeePositionTable.module.css";
import { getPositionFetch } from "../../redux/state/positionState";
import { addPosition, deletePosition, deletePositionBatch, updatePosition } from "../../redux/saga/positionSaga";

interface EditToolbarProps {
	setRowProp: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
	) => void;
}

interface EmployeePositionProps {
	createSnackpack: (message: string, severity: AlertColor) => () => void;
}

const EmployeePositionTable: React.FC<EmployeePositionProps> = (props) => {
	const dispatch = useDispatch();

	// GET ALL THE DEV PHASE AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getPositionFetch());
	}, [dispatch]);

	// GET THE STATES
	const positionData = useSelector((state: RootState) => state.positionReducer.position);
	
	const [isHidden, setIsHidden] = React.useState(false);
	const [rows, setRows] = React.useState<GridRowsProp>(positionData);
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

	function UnsortedIcon() {
		return <SortIcon className="icon" />;
	}

	// FOR CONFIRM DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	// FOR DATA GRID
	React.useEffect(() => {
		setRows(positionData);
	}, [positionData]);

	const [positionName, setPositionName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	// const [userLevel, setUserLevel] = React.useState("");
	const positionNameRef = React.useRef<HTMLInputElement | null>(null);

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
				} position${selectedId.size > 1 ? "s" : ""}?`
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
		dispatch(deletePosition({ position_id: deleteId }));
		setAsk(false);
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deletePositionBatch({ batchId: selectedId }));
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
		setDialogTitle("Delete this position?");
		setDeleteId(id as number);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		setRows(positionData);
	};

	const processUpdateRow = (data: GridRowModel) => {
		dispatch(updatePosition({ positionData: data }));
	};

	const processAddRow = (data: GridRowModel) => {
		dispatch(addPosition({ positionData: data }));
	};

	const handleAdd = () => {
		addRecord(true);
	};

	const handleAddContinue = () => {
		addRecord(false);
	};

	const addRecord = (isAddOnly: boolean) => {
		if (positionName && shortName) {
			const posData: GridValidRowModel = {
				position_name: positionName,
				position_sh_name: shortName,
			};
			processAddRow(posData);
			setPositionName("");
			setShortName("");
			if (isAddOnly) {
				setIsHidden(false);
			} else {
				positionNameRef.current?.focus();
			}
		} else {
			const error = props.createSnackpack(
				"All fields are required! Please, try again.",
				"error"
			);
			error();
		}
	}

	const handleUpdate = (newRow: GridRowModel) => {
		if (newRow.position_name && newRow.position_sh_name) {
			processUpdateRow(newRow)
		} else {
			const cancel = handleCancelClick(newRow.position_id);
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
			field: "position_name",
			headerName: "Position",
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "position_sh_name",
			headerName: "Short Name",
			width: 300,
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
						Add Position
					</Button>
				) : (
					<div className={PositionModuleStyle.hideButton}>
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
										Position
									</FormLabel>
									<TextField
										style={{ width: "100%" }}
										size="small"
										onChange={(e) =>
											setPositionName(e.target.value)
										}
										value={positionName}
										autoFocus
										inputRef={positionNameRef}
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
										onChange={(e) =>
											setShortName(e.target.value)
										}
										value={shortName}
										className={
											PositionModuleStyle.textField
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
										className={PositionModuleStyle.textField}
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
										setPositionName("");
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
				sx={{ height: "67vh", border: "none" }}
				rows={rows}
				columns={columns}
				editMode="row"
				getRowId={(row) => row.position_id}
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

export default EmployeePositionTable;