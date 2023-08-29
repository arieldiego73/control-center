// import React, { useState, useEffect } from "react";
// import RoleStyle from "./Role.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import RoleTable from "./RoleTable";
// import Button from "@mui/material/Button";
// import { Add } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { getRolesFetch } from "../../redux/state/roleState";

// export default function Role() {
// 	const data = useSelector((state: RootState) => state.roleReducer.roles);
// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		dispatch(getRolesFetch());
// 	}, [dispatch]);

// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [filteredData, setFilteredData] = useState(data);

// 	const handleSearch = () => {
// 		// const filtered = data.filter((item) =>
// 		// 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
// 		// );
// 		// setFilteredData(filtered);
// 	};

// 	return (
// 		<div className={RoleStyle.mainContainer}>
// 			<div style={{ width: "97%" }}>
// 				<h4>
// 					<FontAwesomeIcon icon={faUser} size="3x" color="black" />
// 					<span
// 						style={{
// 							fontSize: "4vh",
// 							color: "black",
// 							fontFamily: "Montserrat, san-serif",
// 						}}
// 					>
// 						{" "}
// 						ROLES AND PERMISSIONS
// 					</span>
// 				</h4>
// 			</div>

// 			<div style={{ width: "97%", border: "1px solid-red" }}>
// 				BreadCrumbs to ha! // Eto din // 3rd breadcrumb
// 				<div style={{ textAlign: "right", marginBottom: "8px" }}>
// 					<Link to="/userhandler" style={{ textDecoration: "none" }}>
// 						<Button
// 							variant="contained"
// 							color="primary"
// 							startIcon={<Add />}
// 							style={{ textTransform: "none" }}
// 						>
// 							Add Role
// 						</Button>
// 					</Link>
// 				</div>
// 			</div>

// 			<div className={RoleStyle.contentContainer}>
// 				<div className={RoleStyle.contentHolder}>
// 					{/* Start of Header */}
// 					<div
// 						style={{
// 							flexDirection: "row",
// 							backgroundColor: "transparent",
// 							display: "flex",

// 							alignSelf: "center",
// 							justifyContent: "center",
// 							borderTopRightRadius: " 5px",
// 							borderTopLeftRadius: "5px",
// 						}}
// 					>
// 						<div
// 							style={{
// 								flexDirection: "column",
// 								display: "flex",
// 								paddingTop: "1%",
// 								paddingBottom: "1%",
// 								alignItems: "center",
// 								justifyContent: "center",
// 							}}
// 						>
// 							<div
// 								style={{
// 									display: "flex",
// 									flexDirection: "row",
// 									gap: "12px",
// 									alignItems: "right",
// 								}}
// 							>
// 								{/* Start of second search bar */}
// 								{/* <div className={RoleStyle.searchBar1}>
//                   <div className={RoleStyle.searchBarHolder1}>
//                     <input
//                       type="text"
//                       placeholder="Role name"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       style={{
//                         padding: 5,
//                         fontSize: 16,
//                         backgroundColor: "#dce0e0",
//                         borderRadius: "5px",
//                         border: "none"
//                       }}
//                     />
//                   </div>

//                   <div className={RoleStyle.searchBarHolder2}>
//                     <input
//                       type="text"
//                       placeholder="Short name"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       style={{
//                         padding: 5,
//                         fontSize: 16,
//                         backgroundColor: "#dce0e0",
//                         borderRadius: "5px",
//                         border: "none"
//                       }}
//                     />
//                   </div>
//                 </div> */}
// 							</div>

// 							{/* <div style={{ marginTop: "8px" }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<SearchIcon />}
//                   style={{ textTransform: "none" }}
//                 >
//                   Search
//                 </Button>
//               </div> */}
// 						</div>
// 					</div>

// 					{/* Start of Table */}
// 					<div
// 						style={{
// 							backgroundColor: "transparent",
// 							borderBottomLeftRadius: "8px",
// 							borderBottomRightRadius: "8px",
// 							height: "90%",
// 						}}
// 					>
// 						<RoleTable data={data as []} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
	) => void;
}

export default function FullFeaturedCrudGrid() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getRolesFetch());
	}, [dispatch]);

	const data = useSelector((state: RootState) => state.roleReducer.roles);

	const [rows, setRows] = React.useState<GridRowsProp>(data);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
		{}
	);

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	React.useEffect(() => {
		console.log("THE ROW NOW:", rows);
	});

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
			<GridToolbarContainer>
				<Button
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleClick}
				>
					Add record
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
		setRows(rows.filter((row) => row.role_id !== id));
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
		const accompRows = rows.map((row) =>
			row.role_id === newRow.role_id ? updatedRow : row
		);
		setRows(accompRows);
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
			align: "center",
			headerAlign: "center",
		},
		{
			field: "role_sh_name",
			headerName: "Short Name",
			width: 300,
			editable: true,
		},
		{
			field: "role_user_level",
			headerName: "User Level",
			type: "number",
			width: 200,
			editable: true,
			align: "left",
			headerAlign: "left",
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
				height: 500,
				width: "100%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .MuiDataGrid-columnHeaderTitle": {
					fontWeight: 900,
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
				slots={{
					toolbar: EditToolbar,
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
			/>
		</Box>
	);
}
