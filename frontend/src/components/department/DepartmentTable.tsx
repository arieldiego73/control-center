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
import { Description } from "@mui/icons-material";
import {
	Divider,
	FormControl,
	FormLabel,
	LinearProgress,
	MenuItem,
	Select,
} from "@mui/material";
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

const DepartmentTable: React.FC<DataGridProps> = (props) => {
	const dispatch = useDispatch();

	const loadingState = useSelector(
		(state: RootState) => state.sectionReducer.isLoading
	);
	const [isLoading, setIsLoading] = React.useState(loadingState);
	React.useEffect(() => {
		setIsLoading(() => loadingState);
	}, [loadingState]);

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
		loadingOverlay: LinearProgress,
	};

	React.useEffect(() => {
		setRows(sectionData);
	}, [sectionData]);

	const [departmentName, setDepartmentName] = React.useState("");
	const [shortName, setShortName] = React.useState("");
	const [businessUnit, setBusinessUnit] = React.useState(0);
	const [description, setDescription] = React.useState("");
	const departmentNameRef = React.useRef<HTMLInputElement | null>(null);

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

	const proceedWithDelete = () => {
		dispatch(deleteSection({ section_id: deleteId }));
		setAsk(false);
	};

	const proceedWithDeleteBatch = () => {
		dispatch(deleteSectionBatch({ batchId: selectedId }));
		setRowSelectionModel([]); // clear selected rows
		setSelectedId(new Set()); // clear selected IDs
		setAsk(false); // close dialog
		setActions({ ...actions, selecting: false });
	};

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
		setRows(sectionData);
		setActions({ ...actions, editing: false });
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
		if (departmentName && shortName && businessUnit !== 0 && description) {
			const posData: GridValidRowModel = {
				section_name: departmentName,
				section_sh_name: shortName,
				dept_id: businessUnit,
				section_desc: description,
			};
			processAddRow(posData);
			setDepartmentName("");
			setShortName("");
			setBusinessUnit(0);
			setDescription("");
			if (isAddOnly) {
				setIsHidden(false);
				setActions({ ...actions, adding: false });
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
		if (
			newRow.section_name &&
			newRow.section_sh_name &&
			newRow.dept_id !== 0 &&
			newRow.section_desc
		) {
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
		setActions({ ...actions, editing: false });
		return newRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{
			field: "section_name",
			headerName: "Name",
			minWidth: 300,
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "section_sh_name",
			headerName: "Short Name",
			minWidth: 300,
			flex: 0.5,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "dept_id",
			headerName: "Business Unit",
			minWidth: 300,
			flex: 0.5,
			editable: true,
			headerAlign: "center",
			align: "center",
			type: "singleSelect",
			getOptionValue: (value: any) => value.dept_id,
			getOptionLabel: (value: any) => value.dept_sh_name,
			valueOptions: [...businessUnits],
		},
		{
			field: "section_desc",
			headerName: "Description",
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
						onClick={handleEditButtonClick(id)}
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
						if (departmentName || shortName || businessUnit || description) {
							setDialogTitle("Close the form?");
							setDialogContentText(
								"Are you sure you want to discard your inputs?"
							);
							setConfirmAction(true);
							setProceedAction(() => () => {
								setIsHidden(false);
								handleEditClick(id as GridRowId)();
								setDepartmentName("");
								setShortName("");
								setBusinessUnit(0);
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
								"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
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
								"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
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
								"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
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
						"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
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
						Add Department
					</Button>
				) : (
					<div className="hideButton">
						<div style={addFormContainerStyles}>
							<div style={addFormStyles}>
								<DataGridAddTextField
									inputLabel="Name"
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
									setDepartmentName("");
									setShortName("");
									setBusinessUnit(1);
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
				getRowId={(row) => row.section_id}
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

export default DepartmentTable;
