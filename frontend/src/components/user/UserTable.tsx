import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import UserTableStyle from "./User.module.css";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../custom_pagination/pagination";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import { LinearProgress } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getUsersFetch } from "../../redux/state/userState";
import { deleteUser, deleteUserBatch } from "../../redux/saga/userSaga";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridActionDialog from "../datagrid_customs/DataGridActionDialog";
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


import passwordIcon from "../../Assets/icons/passwordIcon.png";
import passwordIcon64px from "../../Assets/icons/passwordIcon64px.png";
import trashIcon from "../../Assets/icons/trashIcon.png"

import { Image } from "@mui/icons-material";


export interface RowData {
  emp_id: number;
  username: string;
  fname: string;
  lname: string;
  position_sh_name: string;
  email: string;
  section_name: string;
  dept_name: string;
  reg_date: Date;
}

interface UserTableProps {
  data: RowData[];
}

const PasswordIcon = () => (
  <img src={passwordIcon} alt="Password" style={{ height: "20px", width: "20px", color: "red" }} />
);
const PasswordIcon64px = () => (
  <img src={passwordIcon64px} alt="Password" style={{ height: "20px", width: "20px", color: "red" }} />
);
const TrashIcon = () => (
  <img src={trashIcon} alt="Delete" style={{ height: "20px", width: "20px" }} />
);

const UserTable: React.FC<UserTableProps> = (props) => {
  const data = useSelector((state: RootState) => state.userReducer.users);

  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false); // State to control the password change modal
  const [newPassword, setNewPassword] = React.useState(""); // State to store the new password



  // const [changePasswordOpen, setChangePasswordOpen] = React.useState(false); // State to control the password change modal
  // const [newPassword, setNewPassword] = React.useState(""); // State to store the new password


  // const [changePasswordOpen, setChangePasswordOpen] = React.useState(false); // State to control the password change modal
  // const [newPassword, setNewPassword] = React.useState(""); // State to store the new password




  // Function to open the change password modal
  const handleOpenChangePassword = (id: GridRowId) => {
    setChangePasswordOpen(true);
  };

  // Function to close the change password modal
  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
    setNewPassword(""); // Clear the password field
  };

  // Function to handle changing the password
  const handleChangePassword = () => {
    // Implement the logic to change the password here.
    // After changing the password, close the modal.
    handleCloseChangePassword();
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState<GridRowsProp>(data);
  const [ask, setAsk] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [isBatch, setIsBatch] = React.useState<boolean>();
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [selectedId, setSelectedId] = React.useState<Set<GridRowId>>(new Set());

  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContentText, setDialogContentText] = React.useState("");

  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );
  const [isLoading, setIsLoading] = React.useState(loadingState);
  React.useEffect(() => {
    setIsLoading(() => loadingState);
  }, [loadingState]);

  React.useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  const proceedWithDelete = () => {
    dispatch(deleteUser({ user_id: deleteId }));
    setRows(data);
    setAsk(false);
  };

  const proceedWithDeleteBatch = async () => {
    dispatch(deleteUserBatch({ batchId: selectedId }));
    setRows(data); // update rows
    setRowSelectionModel([]); // clear selected rows
    setSelectedId(new Set()); // clear selected IDs
    setAsk(false); // close dialog
    setActions({ ...actions, selecting: false });
  };

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
    () => { }
  );

  const dataGridSlots = {
    toolbar: DatagridToolbar,
    columnUnsortedIcon: UnsortedIcon,
    pagination: CustomPagination,
    loadingOverlay: LinearProgress,
  };

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

  const handleDeleteClick = (id: GridRowId) => () => {
    setSelectedId(new Set([])); // clear set of selectedID to disable the Delete Batch button
    setAsk(true);
    setIsBatch(false);
    setDialogContentText(
      "Be warned that deleting records is irreversible. \nPlease, proceed with caution."
    );
    setDialogTitle("Delete this record?");
    setDeleteId(id as number);
  };

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Tooltip title="View/Edit User Details">
          <span
            onClick={() =>
              params.row.emp_id &&
                params.row.username &&
                params.row.username.length > 0 &&
                params.row.username.trim() !== ""
                ? navigate(`/user/edit-user/${params.row.username}`, {
                  state: params.row.emp_id,
                })
                : undefined
            }
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "blue",
            }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "fname",
      headerName: "First Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lname",
      headerName: "Last Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "position_sh_name",
      headerName: "Position",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dept_name",
      headerName: "Business Unit",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "section_name",
      headerName: "Department",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "reg_date",
      headerName: "Created",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter(params) {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(params.value));
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <>
            <Tooltip title="Delete User">
              <GridActionsCellItem
                icon={<TrashIcon />}
                // style={{ height: "20px", width: "12px" }}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Tooltip title="Change Password">
              <GridActionsCellItem
                icon={<PasswordIcon64px />}
                // style={{ height: "20px", width: "12px" }}
                label="Change Password"
                onClick={() => handleOpenChangePassword(id)}
                color="inherit"
              />
            </Tooltip>
          </>
        ];
      },
    },
  ];

  return (
    <div className={UserTableStyle.tableMainContainer}>
      <Paper className={UserTableStyle.paperTable}>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
              sorting: {
                sortModel: [{ field: "reg_id", sort: "desc" }],
              },
            }}
            rows={props.data}
            getRowId={(row) => row.emp_id}
            columns={columns}
            pagination
            pageSizeOptions={[5, 25, 50, 100]}
            slots={dataGridSlots}
            loading={isLoading}
            checkboxSelection
            onRowSelectionModelChange={(newModel) => {
              setRowSelectionModel(newModel);
              setSelectedId(new Set(newModel));
            }}
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
        </div>
      </Paper>
      {/* Change Password Modal */}
      <Dialog open={changePasswordOpen} onClose={handleCloseChangePassword}>
        <DialogTitle style={{display:"flex", gap:"10px"}}>
          <img src={passwordIcon64px} alt="change password icon" style={{ height:"30px", width:"30px"}} />
          <span>Change Password</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the new password:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
          // value={currentPassword}
          // onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
          // value={confirmNewPassword}
          // onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
          <Button onClick={handleCloseChangePassword} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;

// import * as React from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import UserTableStyle from "./User.module.css";
// import { useNavigate } from "react-router-dom";
// import CustomPagination from "../custom_pagination/pagination";
// import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
// import { Divider, LinearProgress } from "@mui/material";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";

// export interface RowData {
//   emp_id: number;
//   username: string;
//   fname: string;
//   lname: string;
//   position_sh_name: string;
//   email: string;
//   section_name: string;
//   dept_name: string;
//   reg_date: Date;
// }

// interface UserTableProps {
//   data: RowData[];
// }

// const UserTable: React.FC<UserTableProps> = (props) => {
//   const navigate = useNavigate();

//   const loadingState = useSelector(
// 		(state: RootState) => state.userReducer.isLoading
// 	);
// 	const [isLoading, setIsLoading] = React.useState(loadingState);
// 	React.useEffect(() => {
// 		setIsLoading(() => loadingState);
// 	}, [loadingState]);

//   const dataGridSlots = {
// 		columnUnsortedIcon: UnsortedIcon,
// 		pagination: CustomPagination,
// 		loadingOverlay: LinearProgress,
// 	};

//   const columns: GridColDef[] = [
//     {
//       field: "username",
//       headerName: "Username",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (params) => (
//         <span
//           onClick={() =>
//             params.row.emp_id &&
//             params.row.username &&
//             params.row.username.length > 0 &&
//             params.row.username.trim() !== ""
//               ? navigate(`/user/edit-user/${params.row.username}`, {
//                   state: params.row.emp_id,
//                 })
//               : undefined
//           }
//           style={{
//             textDecoration: "underline",
//             cursor: "pointer",
//             color: "blue",
//           }}
//         >
//           {params.value}
//         </span>
//       ),
//     },
//     {
//       field: "fname",
//       headerName: "First Name",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "lname",
//       headerName: "Last Name",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "position_sh_name",
//       headerName: "Position",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "dept_name",
//       headerName: "Business Unit",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "section_name",
//       headerName: "Department",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "reg_date",
//       headerName: "Created",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       valueFormatter(params) {
//         return new Intl.DateTimeFormat("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }).format(new Date(params.value));
//       },
//     },
//   ];

//   return (
//     <div className={UserTableStyle.tableMainContainer}>
//       <Paper className={UserTableStyle.paperTable}>
//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 5 },
//               },
//               sorting: {
//                 sortModel: [{ field: "reg_id", sort: "desc" }],
//               },
//             }}
//             rows={props.data}
//             getRowId={(row) => row.emp_id}
//             columns={columns}
//             pagination
//             pageSizeOptions={[5, 25, 50, 100]}
//             slots={dataGridSlots}
//             loading={isLoading}
//           />
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default UserTable;
