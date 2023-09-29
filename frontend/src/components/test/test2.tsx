import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import UserTableStyle from "./test2.module.css";
import { useNavigate } from "react-router-dom";

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

const UserTable: React.FC<UserTableProps> = (props) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "emp_id",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      renderCell: (params) => (
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
      ),
    },
    {
      field: "fname",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lname",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "position_sh_name",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "dept_name",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "section_name",
      headerName: "Section",
      flex: 1,
    },
    {
      field: "reg_date",
      headerName: "Created",
      flex: 1,
    },
  ];

  return (
    <div className={UserTableStyle.tableMainContainer}>
      <Paper className={UserTableStyle.paperTable}>
        <div style={{ height: 400, width: "100%" }}>
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
          />
        </div>
      </Paper>
    </div>
  );
};

export default UserTable;
