import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

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
import { getDevPhaseFetch } from "../../redux/state/devPhaseState";
import { Divider, LinearProgress } from "@mui/material";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import DataGridProps from "../datagrid_customs/DataGridProps";
import {
	datagridBoxStyle,
	datagridStyle, 
} from "../datagrid_customs/DataGridStyle";
import CustomPagination from "../custom_pagination/pagination";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";
import DataGridAddTextField from "../datagrid_customs/DataGridAddInputField";
import {
	addFormContainerStyles,
	addFormStyles,
} from "../datagrid_customs/DataGridAddFormStyles";
import DataGridAddButtons from "../datagrid_customs/DataGridAddButtons";
import {
	addDevPhase,
	deleteDevPhase,
	deleteDevPhaseBatch,
	updateDevPhase,
} from "../../redux/saga/devPhaseSaga";
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
import DataGridActionDialog from "../datagrid_customs/DataGridActionDialog";

import editIconPencil from "../../Assets/icons/editIcon.png"
import trashIcon from "../../Assets/icons/trashIcon.png"

const EditIconPencil = () => (
	<img src={editIconPencil} alt="Edit" style={{ height: "20px", width: "20px", color: "red" }} />
);
const TrashIcon = () => (
	<img src={trashIcon} alt="Delete" style={{ height: "20px", width: "20px" }} />
);



const BusinessUnitTable: React.FC<DataGridProps> = (props) => {
	const dispatch = useDispatch();

	const loadingState = useSelector(
		(state: RootState) => state.devPhaseReducer.isLoading
	);
	const [isLoading, setIsLoading] = React.useState(loadingState);
	React.useEffect(() => {
		setIsLoading(() => loadingState);
	}, [loadingState]);

	// GET ALL THE ROLES AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getDevPhaseFetch());
	}, [dispatch]);

	// STORE THE ROLES TO 'data'
	const data = useSelector((state: RootState) => state.devPhaseReducer.devPhase);

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
		loadingOverlay: LinearProgress,
	};

	const proceedWithDelete = () => {
		dispatch(deleteDevPhase({ dev_phase_id: deleteId }));
		setRows(data);
		setAsk(false);
	};

	const proceedWithDeleteBatch = async () => {
		dispatch(deleteDevPhaseBatch({ batchId: selectedId }));
		setRows(data); // update rows
		setRowSelectionModel([]); // clear selected rows
		setSelectedId(new Set()); // clear selected IDs
		setAsk(false); // close dialog
		setActions({ ...actions, selecting: false });
	};

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const [devPhaseName, setDevPhaseName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	const devPhaseRef = React.useRef<HTMLInputElement | null>(null);

	const [confirmAction, setConfirmAction] = React.useState(false);
	const [actions, setActions] = React.useState<{
		editing: boolean;
		selecting: boolean;
		adding: boolean;
		editingId: GridRowId;
	}>({
		editing: false,
		selecting: false,
		adding: false,
		editingId: 0,
	});
	const [proceedAction, setProceedAction] = React.useState<() => void>(
		() => {}
	);

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

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		if (
			params.reason === GridRowEditStopReasons.rowFocusOut ||
			params.reason === GridRowEditStopReasons.escapeKeyDown
		) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel(() => {
			for (const obj in rowModesModel) {
				if (rowModesModel.hasOwnProperty(obj)) {
					return {
						[obj]: {
							mode: GridRowModes.View,
							ignoreModifications: true,
						}, // change mode from EDIT to VIEW
						[id]: { mode: GridRowModes.Edit }, // add the row that is to be edited
					};
				} else {
					return {
						[id]: { mode: GridRowModes.Edit },
					};
				}
			}

			return { [id]: { mode: GridRowModes.Edit } }; // return this if the rowModesModel is empty
		});
		setConfirmAction(false);
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({
			// ...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		verifyAction("delete", id);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			// ...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		setRows(data);
		setActions({ ...actions, editing: false });
	};

	const processUpdateRow = (devPhaseData: GridRowModel) => {
		dispatch(updateDevPhase({ devPhaseData }));
	};

	const processAddRow = (devPhaseData: GridRowModel) => {
		dispatch(addDevPhase({ devPhaseData }));
	};

	const handleAdd = () => {
		addRecord(true);
	};

	const handleAddContinue = () => {
		addRecord(false);
	};

	const addRecord = (isAddOnly: boolean) => {
		if (devPhaseName && shortName) {
			const devPhaseData: GridValidRowModel = {
				dev_phase_name: devPhaseName,
				dev_phase_sh_name: shortName,
			};
			processAddRow(devPhaseData);
			setDevPhaseName("");
			setShortName("");
			if (isAddOnly) {
				setIsHidden(false);
				setActions({ ...actions, adding: false });
			} else {
				devPhaseRef.current?.focus();
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
		setActions({ ...actions, editing: false });
		return newRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{
			field: "dev_phase_name",
			headerName: "Name",
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
					<>
						<Tooltip title="Edit">
							<GridActionsCellItem
								icon={<EditIconPencil />}
								label="Edit"
								className="textPrimary"
								onClick={handleEditButtonClick(id)}
								color="inherit"
							/>
						</Tooltip>

						<Divider orientation="vertical" variant="middle" flexItem />

						<Tooltip title="Delete">
							<GridActionsCellItem
								icon={<TrashIcon />}
								label="Delete"
								onClick={handleDeleteClick(id)}
								color="inherit"
							/>
						</Tooltip>
					</>
				];
			},
		},
	];

	const handleEditButtonClick = (id: GridRowId) => () => {
		verifyAction("edit", id);
	};

	const verifyAction = (
		action: string,
		id?: GridRowId,
		newSelectionModel?: GridRowSelectionModel
	) => {
		if (actions.editing || actions.selecting || actions.adding) {
			switch (action) {
				case "edit":
					if (actions.editing) {
						setDialogTitle("Cancel edit and move?");
						setDialogContentText(
							"Are you sure you want to cancel editing this row \nand move to another row?"
						);
						setConfirmAction(true);
						setProceedAction(() =>
							handleEditClick(id as GridRowId)
						); // to trigger edit in the table
						setActions({ ...actions, editingId: id as GridRowId }); // store the new id in the object
					} else if (actions.selecting) {
						setDialogTitle("Discard the selection?");
						setDialogContentText(
							"Upon proceeding, the selection will be discarded \nand you will go on editing record/s."
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setConfirmAction(false);
							setRowSelectionModel([]); // clear selection in the datagrid
							setSelectedId(new Set([])); // clear set of selectedID to disable the Delete Batch button
							handleEditClick(id as GridRowId)();
							setActions({
								...actions,
								selecting: false,
								editing: true,
								editingId: id as GridRowId,
							});
						});
					} else {
						if (devPhaseName || shortName) {
							setDialogTitle("Close the form?");
							setDialogContentText(
								"Are you sure you want to discard your inputs?"
							);
							setConfirmAction(true);
							setProceedAction(() => () => {
								setIsHidden(false);
								handleEditClick(id as GridRowId)();
								setDevPhaseName("");
								setShortName("");
								setActions({
									...actions,
									adding: false,
									editing: true,
									editingId: id as GridRowId,
								});
							});
						} else {
							setIsHidden(false); // if the fields in the add form are empty, just close it
							handleEditClick(id as GridRowId)(); // then proceed to edit
							setActions({ ...actions, adding: false, editing: true, editingId: id as GridRowId });
						}
					}
					break;
				case "add":
					if (actions.editing) {
						setDialogTitle("Cancel edit?");
						setDialogContentText(
							"Are you sure you want to cancel?"
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setIsHidden(true);
							setConfirmAction(false);
							setActions({
								...actions,
								editing: false,
								adding: true,
							});
							setRowModesModel({
								[actions.editingId]: {
									mode: GridRowModes.View,
									ignoreModifications: true,
								},
							});
						});
					} else if (actions.selecting) {
						setDialogTitle("Discard the selection?");
						setDialogContentText(
							"Upon proceeding, the selection will be discarded \nand you will go on adding record/s."
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setIsHidden(true);
							setConfirmAction(false);
							setRowSelectionModel([]);
							setSelectedId(new Set([]));
							setActions({
								...actions,
								selecting: false,
								adding: true,
							});
						});
					} // no else because the add button is hidden so there is no way you could press Add button twice
					break;
				case "delete":
					if (actions.editing) {
						setDialogTitle("Cancel edit?");
						setDialogContentText(
							"Are you sure you want to cancel edit and proceed \nwith deleting a record?"
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setIsHidden(true);
							setConfirmAction(false);
							setActions({
								...actions,
								editing: false,
							});
							setRowModesModel({
								[actions.editingId]: {
									mode: GridRowModes.View,
									ignoreModifications: true,
								},
							});

							setAsk(true);
							setIsBatch(false);
							setDialogContentText(
								"Are you sure you want to delete this record? \nPlease, proceed with caution."
							);
							setDialogTitle("Delete this record?");
							setDeleteId(id as number);
						});
					} else if (actions.selecting) {
						setDialogTitle("Discard the selection?");
						setDialogContentText(
							"Upon proceeding, the selection will be discarded \nand you will go on deleting a record."
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setConfirmAction(false);
							setRowSelectionModel([]);
							setSelectedId(new Set([]));
							setActions({
								...actions,
								selecting: false,
							});

							setAsk(true);
							setIsBatch(false);
							setDialogContentText(
								"Are you sure you want to delete this record? \nPlease, proceed with caution."
							);
							setDialogTitle("Delete this record?");
							setDeleteId(id as number);
						});
					} else {
						setDialogTitle("Cancel adding a record?");
						setDialogContentText(
							"The add form will be closed and no record will be saved."
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setIsHidden(false);
							setConfirmAction(false);
							setActions({
								...actions,
								adding: false,
							});

							setAsk(true);
							setIsBatch(false);
							setDialogContentText(
								"Are you sure you want to delete this record? \nPlease, proceed with caution."
							);
							setDialogTitle("Delete this record?");
							setDeleteId(id as number);
						});
					}
					break;
				default: // case "select"
					if (actions.editing) {
						setDialogTitle("Cancel edit?");
						setDialogContentText(
							"Are you sure you want to cancel editing \nand proceed with selection?"
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setConfirmAction(false);
							setRowSelectionModel(
								newSelectionModel as GridRowSelectionModel
							);
							setSelectedId(
								new Set(
									newSelectionModel as GridRowSelectionModel
								)
							);
							setRowModesModel({
								[actions.editingId]: {
									mode: GridRowModes.View,
									ignoreModifications: true,
								},
							});
							setActions({
								...actions,
								selecting: true,
								editing: false,
							});
						});
					} else if (actions.adding) {
						setDialogTitle("Cancel adding a record?");
						setDialogContentText(
							"The add form will be closed and no record will be saved."
						);
						setConfirmAction(true);
						setProceedAction(() => () => {
							setIsHidden(false);
							setConfirmAction(false);
							setRowSelectionModel(
								newSelectionModel as GridRowSelectionModel
							);
							setSelectedId(
								new Set(
									newSelectionModel as GridRowSelectionModel
								)
							);
							setActions({
								...actions,
								selecting: true,
								adding: false,
							});
						});
					} else {
						setRowSelectionModel(
							newSelectionModel as GridRowSelectionModel
						);
						setSelectedId(
							new Set(newSelectionModel as GridRowSelectionModel)
						);
						newSelectionModel?.length === 0
							? setActions({ ...actions, selecting: false })
							: setActions({ ...actions, selecting: true });
					}
					break;
			}
		} else {
			switch (action) {
				case "edit":
					setActions({
						...actions,
						editing: true,
						editingId: id as GridRowId,
					});
					handleEditClick(id as GridRowId)();
					break;
				case "add":
					setActions({ ...actions, adding: true });
					setIsHidden(true);
					break;
				case "delete":
					setAsk(true);
					setIsBatch(false);
					setDialogContentText(
						"Are you sure you want to delete this record? \nPlease, proceed with caution."
						);
					setDialogTitle("Delete this record?");
					setDeleteId(id as number);
					break;
				default:
					setRowSelectionModel(
						newSelectionModel as GridRowSelectionModel
					);
					setSelectedId(
						new Set(newSelectionModel as GridRowSelectionModel)
					);
					newSelectionModel?.length === 0
						? setActions({ ...actions, selecting: false })
						: setActions({ ...actions, selecting: true });
					break;
			}
		}
	};

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
						onClick={() => verifyAction("add")}
						startIcon={<AddIcon />}
					>
						Add Development Phase
					</Button>
				) : (
					<div className="hideButton">
						<div style={addFormContainerStyles}>
							<div style={addFormStyles}>
								<DataGridAddTextField
									inputLabel="Name"
									inputValue={devPhaseName}
									inputValueSetter={(
										e: React.ChangeEvent<
											| HTMLInputElement
											| HTMLTextAreaElement
										>
									) => setDevPhaseName(e.target.value)}
									inputRef={devPhaseRef}
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
							</div>

							<DataGridAddButtons
								handleAdd={handleAdd}
								handleAddContinue={handleAddContinue}
								handleClosing={() => {
									if (devPhaseName || shortName) {
										setDialogTitle("Close the form?");
										setDialogContentText(
											"Are you sure you want to discard your inputs?"
										);
										setConfirmAction(true);
										setProceedAction(() => () => {
											setIsHidden(false);
											setDevPhaseName("");
											setShortName("");
											setActions({
												...actions,
												adding: false,
											});
											setConfirmAction(false);
										});
									} else {
										setIsHidden(false);
										setDevPhaseName("");
										setShortName("");
										setActions({
											...actions,
											adding: false,
										});
									}
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
				getRowId={(row) => row.dev_phase_id}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				onCellDoubleClick={(params, event) =>
					(event.defaultMuiPrevented = true)
				}
				onRowDoubleClick={(params, event) =>
					(event.defaultMuiPrevented = true)
				}
				processRowUpdate={handleUpdate}
				checkboxSelection
				keepNonExistentRowsSelected
				disableRowSelectionOnClick
				onRowSelectionModelChange={(newRowSelectionModel) => {
					verifyAction("select", 0, newRowSelectionModel);
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
				loading={isLoading}
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
			<DataGridActionDialog
				open={confirmAction}
				handleClose={setConfirmAction}
				dialogTitle={dialogTitle}
				dialogContentText={dialogContentText}
				confirmAction={proceedAction}
			/>
		</Box>
	);
};

export default BusinessUnitTable;
