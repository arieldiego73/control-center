import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
	GridRowSelectionModel,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import {
	Divider,
	FormControl,
	FormLabel,
	InputAdornment,
	TextField,
} from "@mui/material";
import DepartmentModuleStyle from "./DepartmentTable.module.css";
import { getDepartmentFetch } from "../../redux/state/departmentState";
import {
	addDepartment,
	deleteDepartment,
	deleteDepartmentBatch,
	updateDepartment,
} from "../../redux/saga/departmentSaga";
import CustomPagination from "../custom_pagination/pagination";
import {
	datagridBoxStyle,
	datagridStyle,
} from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import DataGridProps from "../datagrid_customs/DataGridProps";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";

const EmployeeDepartmentTable: React.FC<DataGridProps> = (props) => {
	const dispatch = useDispatch();

	// GET ALL THE DEPARTMENT AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getDepartmentFetch());
	}, [dispatch]);

	// GET THE STATES
	const departmentData = useSelector(
		(state: RootState) => state.deptReducer.department
	);

	const [isHidden, setIsHidden] = React.useState(false);
	const [rows, setRows] = React.useState<GridRowsProp>(departmentData);
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
		toolbar: DatagridToolbar,
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	React.useEffect(() => {
		setRows(departmentData);
	}, [departmentData]);

	const [departmentName, setDepartmentName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	const departmentNameRef = React.useRef<HTMLInputElement | null>(null);

	function DatagridToolbar() {
		return (
			<DataGridEditToolbar
				setAsk={setAsk}
				setIsBatch={setIsBatch}
				setDialogContentText={setDialogContentText}
				setDialogTitle={setDialogTitle}
				selectedId={selectedId}
			/>
		);
	}

	const proceedWithDelete = () => {
		dispatch(deleteDepartment({ dept_id: deleteId }));
		setAsk(false);
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deleteDepartmentBatch({ batchId: selectedId }));
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
		setDialogTitle("Delete this department?");
		setDeleteId(id as number);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		setRows(departmentData);
	};

	const processUpdateRow = (data: GridRowModel) => {
		dispatch(updateDepartment({ departmentData: data }));
	};

	const processAddRow = (data: GridRowModel) => {
		dispatch(addDepartment({ departmentData: data }));
	};

	const handleAdd = () => {
		addRecord(true);
	};

	const handleAddContinue = () => {
		addRecord(false);
	};

	const addRecord = (isAddOnly: boolean) => {
		if (departmentName && shortName) {
			const posData: GridValidRowModel = {
				dept_name: departmentName,
				dept_sh_name: shortName,
			};
			processAddRow(posData);
			setDepartmentName("");
			setShortName("");
			if (isAddOnly) {
				setIsHidden(false);
			} else {
				departmentNameRef.current?.focus();
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
		if (newRow.dept_name && newRow.dept_sh_name) {
			processUpdateRow(newRow);
		} else {
			const cancel = handleCancelClick(newRow.dept_id);
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
			field: "dept_name",
			headerName: "Department",
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "dept_sh_name",
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
						Add Department
					</Button>
				) : (
					<div className={DepartmentModuleStyle.hideButton}>
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
										Department
									</FormLabel>
									<TextField
										style={{ width: "100%" }}
										size="small"
										onChange={(e) =>
											setDepartmentName(e.target.value)
										}
										value={departmentName}
										autoFocus
										inputRef={departmentNameRef}
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
										onChange={(e) =>
											setShortName(e.target.value)
										}
										value={shortName}
										className={
											DepartmentModuleStyle.textField
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
										setDepartmentName("");
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
				getRowId={(row) => row.dept_id}
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
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				slots={dataGridSlots}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
				pageSizeOptions={[10, 25, 50, 100]}
			/>

			<DataGridDialog
				ask={ask}
				setAsk={setAsk}
				dialogTitle={dialogTitle}
				dialogContentText={dialogContentText}
				isBatch={isBatch}
				proceedWithDelete={proceedWithDelete}
				proceedWithDeleteBatch={proceedWithDeleteBatch}
			/>
		</Box>
	);
};

export default EmployeeDepartmentTable;
