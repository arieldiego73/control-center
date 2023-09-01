import React, { useState } from "react";
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
import { FormControl, FormLabel, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import HideBtnEmpPositionStyle from "./hide_button_employee_position/HideButtonEmployeePosition.module.css";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export default function EmployeePositionTable() {
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
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          top: -50,
          width: "100%",
        }}
      >
        {/* <div style={{width:'100%', height:'1000px'}}>
				<HideButton/>
				</div> */}

        {/* <Button
					color="primary"
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleClick}
					sx={{ marginBottom: 3, position: "absolute", top: -50 }}
				>
					Add role
				</Button> */}
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

  const [isHidden, setIsHidden] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickBtn = () => {
    setIsHidden(true);
  };

  const handleClose = () => {
    setIsHidden(false);
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
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
          // width: "100%",
          "& .actions": {
			  color: "text.secondary",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 900,
          },
          "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader:focus":
            {
              outline: "none !important",
            },
			"& .textPrimary": {
				color: "text.primary",
			},
        }}
      >
		<div style={{ justifyContent: "flex-end", display: "flex", padding:'1%' }}>
		  {!isHidden ? (
			<Button
			  variant="contained"
			  color="primary"
			  onClick={handleClickBtn}
			  startIcon={<AddIcon />}
			>
			  Add Role
			</Button>
		  ) : (
			<div className={HideBtnEmpPositionStyle.hideButton}>
			  <div
				style={{
				  flexDirection: "row",
				  display: "flex",
				  justifyContent: "center",
				  alignItems: "flex-end",
				  width: "100%",
				  gap: "7vw",
				}}
			  >
				<FormControl>
				  <FormLabel style={{ fontWeight: "bold" }}>Role</FormLabel>
				  <TextField
					style={{ width: "120%" }}
					size="small"
					placeholder="Role"
					InputProps={{
					  startAdornment: (
						<InputAdornment position="start">
						  <SearchIcon />
						</InputAdornment>
					  ),
					}}
				  />
				</FormControl>

				<FormControl>
				  <FormLabel style={{ fontWeight: "bold" }}>
					User Level
				  </FormLabel>
				  <TextField
					style={{ width: "120%" }}
					variant="outlined"
					size="small"
					placeholder="Short Name"
					className={HideBtnEmpPositionStyle.textField}
					InputProps={{
					  startAdornment: (
						<InputAdornment position="start">
						  <SearchIcon />
						</InputAdornment>
					  ),
					}}
				  />
				</FormControl>
				<FormControl>
				  <FormLabel style={{ fontWeight: "bold" }}>
					User Level
				  </FormLabel>
				  <TextField
					style={{ width: "120%" }}
					variant="outlined"
					size="small"
					placeholder="Short Name"
					className={HideBtnEmpPositionStyle.textField}
					InputProps={{
					  startAdornment: (
						<InputAdornment position="start">
						  <SearchIcon />
						</InputAdornment>
					  ),
					}}
				  />
				</FormControl>

				<div>
				  <Button
					variant="contained"
					color="primary"
					startIcon={<SaveIcon />}
					style={{
					  textTransform: "none",
					  marginRight: "10px",
					  height: "50%",
					}}
				  >
					Save and Continue
				  </Button>
				  <Button
					variant="contained"
					color="primary"
					startIcon={<SaveIcon />}
					style={{
					  textTransform: "none",
					  marginRight: "10px",
					  height: "50%",
					}}
				  >
					Save
				  </Button>
				  <Button style={{ height: "50%" }} onClick={handleClose}>
					Close
				  </Button>
				</div>
			  </div>
			</div>
		  )}
		</div>
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
              paginationModel: { page: 0, pageSize: 3 },
            },
          }}
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
