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
	MenuItem,
	Select,
} from "@mui/material";
import DepartmentModuleStyle from "./DepartmentTable.module.css";
import { getSectionFetch } from "../../redux/state/sectionState";
import {
	addSection,
	deleteSection,
	deleteSectionBatch,
	updateSection,
} from "../../redux/saga/sectionSaga";
import CustomPagination from "../custom_pagination/pagination";
import {
	datagridBoxStyle,
	datagridStyle,
} from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import DataGridProps from "../datagrid_customs/DataGridProps";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";
import { getDepartmentFetch } from "../../redux/state/departmentState";
import {
	addFormContainerStyles,
	addFormStyles,
} from "../datagrid_customs/DataGridAddFormStyles";
import DataGridAddTextField from "../datagrid_customs/DataGridAddInputField";
import DataGridAddButtons from "../datagrid_customs/DataGridAddButtons";

const DepartmentTable: React.FC<DataGridProps> = (props) => {
	const dispatch = useDispatch();

	// GET ALL THE DEPARTMENT AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getSectionFetch());
		dispatch(getDepartmentFetch());
	}, [dispatch]);

	// GET THE STATES
	const sectionData = useSelector(
		(state: RootState) => state.sectionReducer.section
	);
	const businessUnits = useSelector(
		(state: RootState) => state.deptReducer.department
	);

	const [isHidden, setIsHidden] = React.useState(false);
	const [rows, setRows] = React.useState<GridRowsProp>(sectionData);
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
	const [deleteId, setDeleteId] = React.useState(1);

	const dataGridSlots = {
		toolbar: DatagridToolbar,
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	React.useEffect(() => {
		setRows(sectionData);
	}, [sectionData]);

	const [departmentName, setDepartmentName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	const [businessUnit, setBusinessUnit] = React.useState(1);
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
		dispatch(deleteSection({ section_id: deleteId }));
		setAsk(false);
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deleteSectionBatch({ batchId: selectedId }));
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
		setRows(sectionData);
	};

	const processUpdateRow = (data: GridRowModel) => {
		dispatch(updateSection({ sectionData: data }));
	};

	const processAddRow = (data: GridRowModel) => {
		dispatch(addSection({ sectionData: data }));
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
				section_name: departmentName,
				section_sh_name: shortName,
			};
			processAddRow(posData);
			setDepartmentName("");
			setShortName("");
			setBusinessUnit(1);
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
		if (newRow.section_name && newRow.section_sh_name) {
			processUpdateRow(newRow);
		} else {
			const cancel = handleCancelClick(newRow.section_id);
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
			field: "section_name",
			headerName: "Department",
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "section_sh_name",
			headerName: "Short Name",
			width: 300,
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "dept_id",
			headerName: "Department",
			width: 300,
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
			type: "singleSelect",
			getOptionValue: (value: any) => value.dept_id,
			getOptionLabel: (value: any) => value.dept_sh_name,
			valueOptions: [...businessUnits],
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
						<div style={addFormContainerStyles}>
							<div style={addFormStyles}>
								<DataGridAddTextField
									inputLabel="Department"
									inputValue={departmentName}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setDepartmentName(e.target.value)}
									inputRef={departmentNameRef}
									textFieldIcon={<PersonIcon />}
									autoFocus={true}
								/>
								<DataGridAddTextField
									inputLabel="Short Name"
									inputValue={shortName}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setShortName(e.target.value)}
									textFieldIcon={<BadgeIcon />}
								/>
								<FormControl fullWidth>
									<FormLabel
										style={{
											fontWeight: "bold",
										}}
									>
										Business Unit
									</FormLabel>
									<Select
										style={{ width: "100%" }}
										variant="outlined"
										size="small"
										value={businessUnit}
										onChange={(e) => {
											setBusinessUnit(
												e.target.value as number
											);
										}}
									>
										{businessUnits.map((unit: any) => (
											<MenuItem
												key={unit?.dept_id}
												value={unit?.dept_id}
											>
												{unit?.dept_name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>

							<DataGridAddButtons
								handleAdd={handleAdd}
								handleAddContinue={handleAddContinue}
								handleClosing={() => {
									setIsHidden(false);
									setDepartmentName("");
									setShortName("");
									setBusinessUnit(1);
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
				getRowId={(row) => row.section_id}
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

export default DepartmentTable;
