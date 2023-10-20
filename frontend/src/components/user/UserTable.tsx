import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
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
import {
  Backdrop,
  CircularProgress, 
  LinearProgress,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getUsersFetch } from "../../redux/state/userState";
import {
  changePassword,
  deleteUser,
  deleteUserBatch,
} from "../../redux/saga/userSaga";
import DataGridEditToolbar from "../datagrid_customs/DataGridToolbar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DataGridDialog from "../datagrid_customs/DataGridDialog";
import DataGridActionDialog from "../datagrid_customs/DataGridActionDialog";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import HelpIcon from "@mui/icons-material/Help";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  datagridBoxStyle,
  userDataGridStyle,
} from "../datagrid_customs/DataGridStyle";
import Box from "@mui/material/Box";
import passwordIcon from "../../Assets/icons/passwordIcon.png";
import passwordIcon64px from "../../Assets/icons/passwordIcon64px.png";
import trashIcon from "../../Assets/icons/trashIcon.png";

import { Image } from "@mui/icons-material";
import { setError, clearError } from "../../redux/state/userState";
import { setSaved } from "../../redux/state/userState";

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
  <img
    src={passwordIcon}
    alt="Password"
    style={{ height: "20px", width: "20px", color: "red" }}
  />
);
const PasswordIcon64px = () => (
  <img
    src={passwordIcon64px}
    alt="Password"
    style={{ height: "20px", width: "20px", color: "red" }}
  />
);
const TrashIcon = () => (
  <img src={trashIcon} alt="Delete" style={{ height: "20px", width: "20px" }} />
);

const UserTable: React.FC<UserTableProps> = (props) => {
  const data = useSelector((state: RootState) => state.userReducer.users);
  const saved = useSelector((state: RootState) => state.userReducer.saved);
  const errorMessage = useSelector(
    (state: RootState) => state.userReducer.error
  );
  const [error, setErrorMsg] = React.useState<string | undefined>("");
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false); // State to control the password change modal
  const [changePassId, setChangePassId] = React.useState(0);
  const [adminPass, setAdminPass] = React.useState("");
  const [newPass, setNewPass] = React.useState(""); // State to store the new password
  const [confirmNewPass, setConfirmNewPass] = React.useState(""); // State to store the new password
  const [isClosable, setIsClosable] = React.useState(true);
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
  const [username, setUsername] = React.useState("");
  // const [confirmCancelDialogOpen, setConfirmCancelDialogOpen] = React.useState(false);
  const [passwordSave, setPasswordSave] = React.useState(false);
  const [passwordDialog, setPasswordDialog] = React.useState("");
  const [passwordContent, setPasswordContent] = React.useState("");

  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );
  const [isLoading, setIsLoading] = React.useState(loadingState);

  React.useEffect(() => {
    setIsLoading(() => loadingState);
  }, [loadingState]);

  const loadingStateDialog = useSelector(
    (state: RootState) => state.userReducer.isLoadingDialog
  );
  const [isLoadingDialog, setIsLoadingDialog] =
    React.useState(loadingStateDialog);

  React.useEffect(() => {
    setIsLoadingDialog(loadingStateDialog);
  }, [loadingStateDialog]);

  React.useEffect(() => {
    if (changePasswordOpen && errorMessage === "") {
      setErrorMsg("");
      setIsClosable(true);
      dispatch(clearError());
    } else {
      setErrorMsg(errorMessage);
      setIsClosable(false);
    }
  }, [dispatch, errorMessage, isClosable, changePasswordOpen]);

  React.useEffect(() => {
    if (isClosable && changePasswordOpen && saved) {
      dispatch(clearError());
      setAdminPass("");
      setNewPass("");
      setConfirmNewPass("");
      setChangePasswordOpen(false);
      navigate("/users");
      dispatch(setSaved(false));
    }
  }, [changePasswordOpen, dispatch, isClosable, navigate, saved]);

  React.useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);


  const handleOpenChangePassword = (id: GridRowId, username: string) => {
    setChangePasswordOpen(true);
    setChangePassId(id as number);
    const newUrl = `/user/password-change/${id}`;
    window.history.pushState(null, "", newUrl);
    setUsername(username);
    console.log(saved, '1');
    
  };

  const handleChangePassword = () => {
    dispatch(
      changePassword({
        data: { adminPass, newPass, confirmNewPass, assocId: changePassId },
      })
    );
    console.log(saved, '2');
  };

  const handleCloseChangePassword = () => {
    dispatch(clearError());
    setAdminPass("");
    setNewPass("");
    setConfirmNewPass("");
    navigate("/users");
    setChangePasswordOpen(false);
    console.log(saved, '3');
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
    () => {}
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
                onClick={() =>
                  handleOpenChangePassword(params.id, params.row?.username)
                }
                color="inherit"
              />
            </Tooltip>
          </>,
        ];
      },
    },
  ];

  return (
    <Box sx={userDataGridStyle}>
      <div className={UserTableStyle.tableMainContainer}>
        <Paper className={UserTableStyle.paperTable}>
          <div style={{ height: "100%", width: "100%", }}>
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
            <img
              src={passwordIcon64px}
              alt="change password icon"
              style={{ height: "30px", width: "30px" }}
            />
            <span>Change Password of {username} </span>
          </DialogTitle>
          <DialogContent>
            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
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
            <LoadingButton loading={isLoadingDialog} onClick={handleChangePassword} color="primary" loadingPosition="start"
        startIcon={<SaveIcon />} variant="contained">
              Change Password
            </LoadingButton>
            <Button onClick={handleCloseChangePassword} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>


  
      </div>
    </Box>
  );
};

export default UserTable;
