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
import { Divider, } from "@mui/material";
import PositionModuleStyle from "./EmployeePositionTable.module.css";
import { getPositionFetch } from "../../redux/state/positionState";
import CustomPagination from "../custom_pagination/pagination";
import {datagridBoxStyle, datagridStyle,} from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import DataGridProps from "../datagrid_customs/DataGridProps";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";
import { addFormContainerStyles, addFormStyles } from "../datagrid_customs/DataGridAddFormStyles";
import DataGridAddTextField from "../datagrid_customs/DataGridAddInputField";
import DataGridAddButtons from "../datagrid_customs/DataGridAddButtons";
import { Description } from "@mui/icons-material";
import {
	addPosition,
	deletePosition,
	deletePositionBatch,
	updatePosition,
} from "../../redux/saga/positionSaga";
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

const EmployeePositionTable: React.FC<DataGridProps> = (props) => {
	const dispatch = useDispatch();

	// GET ALL THE POSITION AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getPositionFetch());
	}, [dispatch]);

	// GET THE STATES
	const positionData = useSelector(
		(state: RootState) => state.positionReducer.position
	);

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
		toolbar: DatagridToolbar,
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	React.useEffect(() => {
		setRows(positionData);
	}, [positionData]);

	const [positionName, setPositionName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const positionNameRef = React.useRef<HTMLInputElement | null>(null);

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
		if (positionName && shortName && description) {
			const posData: GridValidRowModel = {
				position_name: positionName,
				position_sh_name: shortName,
				position_desc: description,
			};
			processAddRow(posData);
			setPositionName("");
			setShortName("");
			setDescription("");
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
	};

	const handleUpdate = (newRow: GridRowModel) => {
		if (newRow.position_name && newRow.position_sh_name && newRow.position_desc) {
			processUpdateRow(newRow);
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
			field: "position_desc",
			headerName: "Description",
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
						Add Position
					</Button>
				) : (
					<div className={PositionModuleStyle.hideButton}>
						<div style={addFormContainerStyles}>
							<div style={addFormStyles}>
								<DataGridAddTextField
									inputLabel="Position"
									inputValue={positionName}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setPositionName(e.target.value)}
									inputRef={positionNameRef}
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
								<DataGridAddTextField
									inputLabel="Description"
									inputValue={description}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setDescription(e.target.value)}
									textFieldIcon={<Description />}
								/>
							</div>

							<DataGridAddButtons
								handleAdd={handleAdd}
								handleAddContinue={handleAddContinue}
								handleClosing={() => {
									setIsHidden(false);
									setPositionName("");
									setShortName("");
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

export default EmployeePositionTable;
