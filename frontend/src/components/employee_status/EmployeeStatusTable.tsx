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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Divider,} from "@mui/material";
import { datagridBoxStyle, datagridStyle,} from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import DataGridProps from "../datagrid_customs/DataGridProps";
import CustomPagination from "../custom_pagination/pagination";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";
import { getEmployeeStatusFetch } from "../../redux/state/employeeStatusState";
import { addFormContainerStyles, addFormStyles } from "../datagrid_customs/DataGridAddFormStyles";
import DataGridAddTextField from "../datagrid_customs/DataGridAddInputField";
import DataGridAddButtons from "../datagrid_customs/DataGridAddButtons";
import {
	addEmployeeStatus,
	deleteEmployeeStatus,
	deleteEmployeeStatusBatch,
	updateEmployeeStatus,
} from "../../redux/saga/employeeStatusSaga";
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

const EmployeeStatusTable: React.FC<DataGridProps> = (props) => {
	const dispatch = useDispatch();

	// GET ALL THE PROJECT STATUS AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getEmployeeStatusFetch());
	}, [dispatch]);

	// GET THE STATES
	const data = useSelector(
		(state: RootState) => state.employeeStatusReducer.employeeStatus
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
		toolbar: DatagridToolbar,
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const [employeeStatusCode, setEmployeeStatusCode] = React.useState("");
	const [employeeStatusName, setEmployeeStatusName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const employeeStatusCodeRef = React.useRef<HTMLInputElement | null>(null);

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
		dispatch(deleteEmployeeStatus({ status_code: deleteId.toString() }));
		setRows(data);
		setAsk(false);
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deleteEmployeeStatusBatch({ batchId: selectedId }));
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
		setDialogTitle("Delete this status?");
		setDeleteId(id as number);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		setRows(data);
	};

	const processUpdateRow = (employeeStatusData: GridRowModel) => {
		dispatch(updateEmployeeStatus({ employeeStatusData }));
		setRows(data); // update rows
	};

	const processAddRow = (employeeStatusData: GridRowModel) => {
		dispatch(addEmployeeStatus({ employeeStatusData }));
		setRows(data); // update rows
	};

	const handleAdd = () => {
		addRecord(true);
	};

	const handleAddContinue = () => {
		addRecord(false);
	};

	const addRecord = (isAddOnly: boolean) => {
		if (employeeStatusCode && employeeStatusName && description) {
			const employeeStatusData: GridValidRowModel = {
				status_code: employeeStatusCode,
				status_name: employeeStatusName,
				status_desc: description,
			};
			processAddRow(employeeStatusData);
			setEmployeeStatusCode("");
			setEmployeeStatusName("");
			setDescription("");
			if (isAddOnly) {
				setIsHidden(false);
			} else {
				employeeStatusCodeRef.current?.focus();
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
		if (newRow.status_name && newRow.status_desc) {
			processUpdateRow(newRow);
		} else {
			const cancel = handleCancelClick(newRow.status_code);
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
			field: "status_name",
			headerName: "Employee Status",
			minWidth: 300,
			flex: 1,
			editable: true,
			type: "string",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "status_desc",
			headerName: "Description",
			minWidth: 300,
			flex: 1,
			editable: true,
			type: "string",
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
						Add Status
					</Button>
				) : (
					<div className="hideButton">
						<div style={addFormContainerStyles}>
							<div style={addFormStyles}>
								<DataGridAddTextField
									inputLabel="Employee Status Code"
									inputValue={employeeStatusCode}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setEmployeeStatusCode(e.target.value)}
									inputRef={employeeStatusCodeRef}
									textFieldIcon={<PersonIcon />}
									autoFocus={true}
								/>
								<DataGridAddTextField
									inputLabel="Employee Status"
									inputValue={employeeStatusName}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setEmployeeStatusName(e.target.value)}
									textFieldIcon={<PersonIcon />}
								/>
								<DataGridAddTextField
									inputLabel="Description"
									inputValue={description}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setDescription(e.target.value)}
									textFieldIcon={<BadgeIcon />}
								/>
							</div>

							<DataGridAddButtons
								handleAdd={handleAdd}
								handleAddContinue={handleAddContinue}
								handleClosing={() => {
									setIsHidden(false);
									setEmployeeStatusCode("");
									setEmployeeStatusName("");
									setDescription("");
								}}
							 />
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
				getRowId={(row) => row.status_code}
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

export default EmployeeStatusTable;
