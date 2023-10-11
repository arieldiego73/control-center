import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
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
import { changePassword, deleteUser, deleteUserBatch } from "../../redux/saga/userSaga";
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
import {
  datagridBoxStyle, userDataGridStyle,
} from "../datagrid_customs/DataGridStyle";
import Box from "@mui/material/Box";
import passwordIcon from "../../Assets/icons/passwordIcon.png";
import passwordIcon64px from "../../Assets/icons/passwordIcon64px.png";
import trashIcon from "../../Assets/icons/trashIcon.png"

import { Image } from "@mui/icons-material";
import { setError, clearError } from '../../redux/state/userState';


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
  const saved = useSelector((state: RootState) => state.userReducer.saved);
  const errorMessage = useSelector((state: RootState) => state.userReducer.error);
  const [error, setErrorMsg] = React.useState<string | undefined>('');
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false); // State to control the password change modal
  const [changePassId, setChangePassId] = React.useState(0);
  const [adminPass, setAdminPass] = React.useState("");
  const [newPass, setNewPass] = React.useState(""); // State to store the new password
  const [confirmNewPass, setConfirmNewPass] = React.useState(""); // State to store the new password
  const [isClosable, setIsClosable] = React.useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState<GridRowsProp>(data);
  const [ask, setAsk] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [isBatch, setIsBatch] = React.useState<boolean>();
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const [selectedId, setSelectedId] = React.useState<Set<GridRowId>>(new Set());
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContentText, setDialogContentText] = React.useState("");
  const [username, setUsername] = React.useState("");
  // const [confirmCancelDialogOpen, setConfirmCancelDialogOpen] = React.useState(false);


  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );
  const [isLoading, setIsLoading] = React.useState(loadingState);

  React.useEffect(() => {
    setIsLoading(() => loadingState);
  }, [loadingState]);

  React.useEffect(() => {
    if (errorMessage === "") {
      setErrorMsg("");
      setIsClosable(true);
      dispatch(clearError());
    }
    else {
      setErrorMsg(errorMessage)
      setIsClosable(false);
    }
  }, [dispatch, errorMessage, isClosable, adminPass])

  React.useEffect(() => {
    if (isClosable && saved) {
      dispatch(clearError());
      setAdminPass('');
      setNewPass('');
      setConfirmNewPass('');
      setChangePasswordOpen(false);
      navigate("/users");
    }
  }, [dispatch, isClosable, navigate, saved])

  React.useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  // React.useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     const target = e.target as HTMLElement; // Cast e.target to HTMLElement
  //     if (changePasswordOpen && target && !target.closest('.dialog-container')) {
  //       setConfirmCancelDialogOpen(true);
  //     }
  //   };    
  
  //   if (changePasswordOpen) {
  //     document.addEventListener('mousedown', handleOutsideClick);
  //   } else {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   }
  
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [changePasswordOpen]);
  

  const handleOpenChangePassword = (id: GridRowId, username: string) => {
    setChangePasswordOpen(true);
    setChangePassId(id as number);
    const newUrl = `/user/password-change/${id}`;
    window.history.pushState(null, '', newUrl);
    setUsername(username);
  };

  const handleChangePassword = () => {
    dispatch(changePassword({
      data: { adminPass, newPass, confirmNewPass, assocId: changePassId }
    }));
  };

  const handleCloseChangePassword = () => {
    dispatch(clearError());
    // Clear the input fields
    setAdminPass('');
    setNewPass('');
    setConfirmNewPass('');
    // Close the dialog
    navigate("/users");
    setChangePasswordOpen(false);

  };

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
      "are you sure you want to delete this record? \nPlease, proceed with caution."
    );
    setDialogTitle("Delete this record?");
    setDeleteId(id as number);
  };

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
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
      flex: 0.5,
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
      // minWidth: 200,
      cellClassName: "actions",
      getActions: (params: GridRowParams<any>) => {
        return [
          <>
            <Tooltip title="Delete User">
              <GridActionsCellItem
                icon={<TrashIcon />}
                // style={{ height: "20px", width: "12px" }}
                label="Delete"
                onClick={handleDeleteClick(params.id)}
                color="inherit"
              />
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Tooltip title="Change Password">
              <GridActionsCellItem
                icon={<PasswordIcon64px />}
                // style={{ height: "20px", width: "12px" }}
                label="Change Password"
                onClick={() => handleOpenChangePassword(params.id, params.row?.username)}
                color="inherit"
              />
            </Tooltip>
          </>
        ];
      },
    },
  ];

  return (
    <Box sx={userDataGridStyle}>
      <div className={UserTableStyle.tableMainContainer}>
        <Paper className={UserTableStyle.paperTable}>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                sorting: {
                  sortModel: [{ field: "reg_id", sort: "desc" }],
                },
              }}
              rows={props.data}
              getRowId={(row) => row.emp_id}
              columns={columns}
              pagination
              pageSizeOptions={[10, 25, 50, 100]}
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
          <DialogTitle style={{ display: "flex", gap: "10px" }}>
            <img src={passwordIcon64px} alt="change password icon" style={{ height: "30px", width: "30px" }} />
            <span>Change Password of {username} </span>
          </DialogTitle>
          <DialogContent>
            {error && (
              <div style={{ color: 'red', marginBottom: "10px" }}>
                {error}
              </div>
            )}
            <TextField
              margin="dense"
              id="adminPassword"
              label="Admin Password"
              type="password"
              fullWidth
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
            />

            <Divider sx={{ margin: "10px 0 8px 0" }} />

            <TextField
              margin="dense"
              id="newPassword"
              label="New Password"
              type="password"
              fullWidth
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <TextField
              margin="dense"
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmNewPass}
              onChange={(e) => setConfirmNewPass(e.target.value)}
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

        {/* Confirmation Dialog */}
        {/* <Dialog open={confirmCancelDialogOpen}>
          <DialogTitle>Do you really want to cancel/discard your changes?</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmCancelDialogOpen(false)}>No</Button>
            <Button onClick={() => {
              setConfirmCancelDialogOpen(false);
              // Handle cancel action here
            }}>
              Yes
            </Button>
          </DialogActions>
        </Dialog> */}

      </div>
    </Box>
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
