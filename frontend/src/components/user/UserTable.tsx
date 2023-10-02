import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import UserTableStyle from "./User.module.css";
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
    // {
    //   field: "emp_id",
    //   headerName: "Employee ID",
    //   flex: 1,
    // },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "center",
      align: "center",
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

// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useNavigate } from "react-router-dom";
// import { TablePagination } from "@mui/material";
// import UserTableStyle from "./User.module.css";

// interface RowData {
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
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [rows, setRows] = React.useState<RowData[]>(props.data);

//   React.useEffect(() => {
//     setRows(props.data);
//     setPage(0);
//   }, [props.data]);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;

//   const navigate = useNavigate();

//   const handleRowClick = (row: RowData) => {
//     navigate(`/user/edit-user/${row.username}`, { state: row.emp_id });
//   };

//   return (
//     <div className={UserTableStyle.tableMainContainer}>
//       <Paper className={UserTableStyle.paperTable}>
//         <TableContainer className={UserTableStyle.tableContainer}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead className={UserTableStyle.tableHead}>
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Username
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   First name
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Last name
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Position
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Email
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Business Unit
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Department
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   style={{
//                     fontWeight: "bolder",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   Created
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows.slice(startIndex, endIndex).map((row) => (
//                 <TableRow
//                   key={row.emp_id}
//                   sx={{
//                     "&:last-child td, &:last-child th": {
//                       border: 0,
//                     },
//                   }}
//                 >
//                   <TableCell component="th" scope="row" align="center">
//                     <span
//                       onClick={() => handleRowClick(row)}
//                       style={{
//                         textDecoration: "underline",
//                         cursor: "pointer",
//                         color: "blue",
//                       }}
//                     >
//                       {row.username}
//                     </span>
//                   </TableCell>

//                   <TableCell align="center">{row.fname}</TableCell>

//                   <TableCell align="center">{row.lname}</TableCell>

//                   <TableCell align="center">{row.position_sh_name}</TableCell>

//                   <TableCell align="center">{row.email}</TableCell>

//                   <TableCell align="center">{row.dept_name}</TableCell>

//                   <TableCell align="center">{row.section_name}</TableCell>

//                   <TableCell align="center">
//                     {new Intl.DateTimeFormat("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "2-digit",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     }).format(new Date(row.reg_date))}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// };

// export default UserTable;
