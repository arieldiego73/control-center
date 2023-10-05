import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import UserTableStyle from "./User.module.css";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../custom_pagination/pagination";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import { Divider, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

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

  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );
  const [isLoading, setIsLoading] = React.useState(loadingState);
  React.useEffect(() => {
    setIsLoading(() => loadingState);
  }, [loadingState]);

  const dataGridSlots = {
    columnUnsortedIcon: UnsortedIcon,
    pagination: CustomPagination,
    loadingOverlay: LinearProgress,
  };

  const columns: GridColDef[] = [
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
    // {
		// 	field: "actions",
		// 	type: "actions",
		// 	headerName: "Actions",
		// 	minWidth: 200,
		// 	cellClassName: "actions",
		// 	getActions: ({ id }) => {
		// 		const isInEditMode =
		// 			rowModesModel[id]?.mode === GridRowModes.Edit;

		// 		if (isInEditMode) {
		// 			return [
		// 				<GridActionsCellItem
		// 					icon={<SaveIcon />}
		// 					label="Save"
		// 					sx={{
		// 						color: "primary.main",
		// 					}}
		// 					onClick={handleSaveClick(id)}
		// 				/>,
		// 				<GridActionsCellItem
		// 					icon={<CancelIcon />}
		// 					label="Cancel"
		// 					className="textPrimary"
		// 					onClick={handleCancelClick(id)}
		// 					color="inherit"
		// 				/>,
		// 			];
		// 		}

		// 		return [
		// 			<GridActionsCellItem
		// 				icon={<DeleteIcon />}
		// 				label="Delete"
		// 				onClick={handleDeleteClick(id)}
		// 				color="inherit"
		// 			/>,
		// 		];
		// 	},
		// },
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
            slots={dataGridSlots}
            loading={isLoading}
            checkboxSelection
          />
        </div>
      </Paper>
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
