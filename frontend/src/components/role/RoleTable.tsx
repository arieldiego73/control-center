import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
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
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getRolesFetch } from "../../redux/state/roleState";
import { addRoles, deleteRoles, updateRoles } from "../../redux/saga/roleSaga";
import {
	Alert,
	AlertColor,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

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
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
	) => void;
}

export default function RoleTable() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getRolesFetch());
	}, [dispatch]);

	const data = useSelector((state: RootState) => state.roleReducer.roles);

	const [rows, setRows] = React.useState<GridRowsProp>(data);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
		{}
	);

	// FOR CONFIRM DIALOG
	const [ask, setAsk] = React.useState(false);
	const [deleteId, setDeleteId] = React.useState(0);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const proceedWithDelete = () => {
		dispatch(deleteRoles({ role_id: deleteId }));
		setRows(data);
		setAsk(false);
		const success = handleClickSnackpack(
			"A role is deleted successfully!",
			"success"
		);
		success();
	};

	const handleCloseConfirm = () => {
		setAsk(false);
	};

	// FOR SNACKPACK
	const [snackPack, setSnackPack] = React.useState<
		readonly SnackbarMessage[]
	>([]);
	const [open, setOpen] = React.useState(false);
	const [messageInfo, setMessageInfo] = React.useState<
		SnackbarMessage | undefined
	>(undefined);
	const [severity, setSeverity] = React.useState<AlertColor>("error");

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

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	// FOR DATA GRID
	function EditToolbar(props: EditToolbarProps) {
		const { setRows, setRowModesModel } = props;

		const handleClick = () => {
			let role_id = rows.reduce((maxId, row) => {
				return row.role_id > maxId ? row.role_id : maxId;
			}, -1);
			role_id++; // add 1 for the new id

			setRows((oldRows) => [
				...oldRows,
				{
					role_id,
					title: "",
					role_sh_name: "",
					role_user_level: 1,
					reg_id: "1",
					update_id: "1",
					isNew: true,
				},
			]);
			setRowModesModel((oldModel) => ({
				...oldModel,
				[role_id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
			}));
		};

		return (
			<GridToolbarContainer
				sx={{ display: "flex", justifyContent: "flex-end" }}
			>
				<Button
					color="primary"
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleClick}
					sx={{
						marginBottom: 3,
						position: "absolute",
						top: -50,
						fontFamily: "Montserrat, san-serif",
					}}
				>
					Add role
				</Button>
			</GridToolbarContainer>
		);
	}

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
		setDeleteId(id as number);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.role_id === id);
		console.log("edited row: ", editedRow);
		if (editedRow!.isNew) {
			setRows(rows.filter((row) => row.role_id !== id));
		}

		console.log("rowModesModel", rowModesModel);
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };

		if (newRow.title && newRow.role_sh_name && newRow.role_user_level) {
			// determines whether it is update or add new
			if (data.length === rows.length) {
				dispatch(
					updateRoles({
						role_id: newRow.role_id,
						title: newRow.title,
						role_sh_name: newRow.role_sh_name,
						role_user_level: newRow.role_user_level,
					})
				);
				const success = handleClickSnackpack(
					"Role is edited successfully",
					"success"
				);
				success();
			} else {
				dispatch(
					addRoles({
						title: newRow.title,
						role_sh_name: newRow.role_sh_name,
						role_user_level: newRow.role_user_level,
						reg_id: newRow.reg_id,
						update_id: newRow.update_id,
					})
				);
				const success = handleClickSnackpack(
					"Role is added successfully",
					"success"
				);
				success();
			}

			setRows(data);
		} else {
			const cancel = handleCancelClick(newRow.role_id);
			const error = handleClickSnackpack(
				"All fields are required! Please, try again.",
				"error"
			);
			cancel();
			error();
		}

		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{
			field: "title",
			headerName: "Role",
			width: 300,
			editable: true,
			flex: 12,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "role_sh_name",
			headerName: "Short Name",
			width: 300,
			editable: true,
			flex: 12,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "role_user_level",
			headerName: "User Level",
			type: "number",
			width: 200,
			editable: true,
			headerAlign: "center",
			align: "center",
			flex: 12,
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
				},
				"& .MuiDataGrid-root .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader:focus":
					{
						outline: "none !important",
					},
				"& .MuiDataGrid-root .MuiInputBase-input": {
					textAlign: "center",
					fontFamily: "Ubuntu, san-serif",
					border: "1px solid rgb(193 173 173 / 37%)",
					borderRadius: "4px",
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
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				getRowId={(row) => row.role_id}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				hideFooterSelectedRowCount
				isRowSelectable={() => false}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 25 },
					},
				}}
				slots={{
					toolbar: EditToolbar,
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
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
				onClose={handleCloseConfirm}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<Typography
						fontFamily={"Montserrat, san-serif"}
						fontWeight={700}
						fontSize={24}
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
						{"Delete this role?"}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText fontFamily={"Montserrat, san-serif"}>
						Be warned that deleting a record is irreversible. <br />
						Please, proceed with caution.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={proceedWithDelete}
						autoFocus
						sx={{ fontFamily: "Montserrat, san-serif" }}
					>
						Delete
					</Button>

					<Button
						sx={{ fontFamily: "Montserrat, san-serif" }}
						onClick={handleCloseConfirm}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
