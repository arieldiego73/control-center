import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import {datagridStyle} from "../datagrid_customs/DataGridStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ProjectTableStyle from "./Project.module.css";
import MembersTable from "./MembersTable";
import CustomPagination from "../custom_pagination/pagination";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import { Divider, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface ProjectTableProps {
	projectData: any[];
}

const ProjectTable: React.FC<ProjectTableProps> = (props) => {

  const loadingState = useSelector(
		(state: RootState) => state.projectReducer.isLoading
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

  const { projectData } = props;

  const [rows, setRows] = React.useState(projectData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openMembers, setOpenMembers] = React.useState(false); 
  const [projectId, setProjectId] = React.useState<number>(0);

  React.useEffect(() => {
    setRows(projectData);
  }, [projectData]);

  React.useEffect(() => {
    console.log(rows)
  }, [rows]);

  const handleClickOpenMembers = (id: number) => {
    setProjectId(id);
    setOpenMembers(true); 
  };

  const handleCloseMembers = () => {
    setOpenMembers(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

	const handleRowClick = (row: any) => {
		console.log(row);
		navigate(`/project/edit-project/${row.proj_name}`, { state: row.proj_id });
	};

  const durationDateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  
	// function DatagridToolbar() {
	// 	return (
	// 		<DataGridEditToolbar
	// 			setAsk={setAsk}
	// 			setIsBatch={setIsBatch}
	// 			setDialogContentText={setDialogContentText}
	// 			setDialogTitle={setDialogTitle}
	// 			selectedId={selectedId}
	// 		/>
	// 	);
	// }


  const columns: GridColDef[] = [
    { field: "proj_id", headerName: "No.", headerAlign: "center",
    align: "center", flex:1, },
    {
      field: "proj_name",
      headerName: "Project Name",
      headerAlign: "center",
      align: "center",
      flex:2,
      renderCell: (params: GridCellParams) => (
        <span
          onClick={() => handleRowClick(params.row)}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "blue",
          }}
        >
         {params.value as React.ReactNode}
        </span>
      ),
    },
    { field: "client_name", headerName: "Client", headerAlign: "center",
    align: "center", flex:2,},
    {
      field: "duration",
      headerName: "Duration",
      headerAlign: "center",
      align: "center",
      flex:2,
      valueGetter: (params: GridValueGetterParams) =>
        `${durationDateFormatter.format(
          new Date(params.row.start_date)
        )} - ${durationDateFormatter.format(new Date(params.row.end_date))}`,
    },
    { field: "dev_type_name", headerName: "Development Type", headerAlign: "center",
    align: "center", flex:2, },
    {
      field: "members",
      headerName: "Member(s)",
      headerAlign: "center",
      align: "center",
      flex:1,
      renderCell: (params: GridCellParams) => (
        <span
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => handleClickOpenMembers(params.row.proj_id)}
        >
          {params.value as React.ReactNode}
        </span>
      ),
    },
    
    { field: "proj_status_name", headerName: "Status", headerAlign: "center",
    align: "center", flex:1,},


  ];
  return (
    <div className={ProjectTableStyle.tableMainContainer}>
      <Paper className={ProjectTableStyle.paperTable}>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
          sx={datagridStyle}
            rows={rows} 
            getRowId={(row) => row.proj_id} 
            columns={columns}
            pagination
            pageSizeOptions={[5, 25, 50, 100]}
            slots={dataGridSlots}
            loading={isLoading}
          />
        </div>

        <Dialog
					open={openMembers}
					onClose={handleCloseMembers}
					aria-describedby="alert-dialog-slide-description"
					maxWidth="xl"
				>
					<DialogTitle>
						<div
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-start",
								gap: "1vw",
							}}
						>
							<div>
								<FontAwesomeIcon
									icon={faUser}
									size="1x"
									color="black"
								/>
							</div>
							<div
								style={{
									fontSize: "2vh",
									fontWeight: "600",
								}}
							>
								{"Member(s)"}
							</div>
						</div>
					</DialogTitle>
					<DialogContent>
						<MembersTable projectId={projectId} />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMembers}>Close</Button>
					</DialogActions>
				</Dialog>
       
      </Paper>
    </div>
  );
};
function handleRowClick(
  params: GridCellParams<
    any,
    unknown,
    unknown,
    import("@mui/x-data-grid").GridTreeNode
  >
): void {
  throw new Error("Function not implemented.");
}

export default ProjectTable;


// import * as React from "react";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableHead,
// 	TableRow,
// 	Paper,
// 	Button,
// 	Dialog,
// 	DialogActions,
// 	DialogContent,
// 	DialogTitle,
// } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { TablePagination } from "@mui/material";
// import MembersTable from "./MembersTable";
// import { useNavigate } from "react-router-dom";
// import ProjectTableStyle from "./Project.module.css";

// export interface RowData {
// 	id: number;
// 	projectName: string;
// 	projectManager: string;
// 	client: string;
// 	duration: string;
// 	developmentType: string;
// 	developmentPhase: string;
// 	technoloies: string;
// 	members: number;
// 	status: string;
// }

// interface ProjectTableProps {
// 	projectData: any[];
// }

// const ProjectTable: React.FC<ProjectTableProps> = (props) => {
// 	const { projectData } = props;

// 	const [rows, setRows] = React.useState(projectData);
// 	const [page, setPage] = React.useState(0);
// 	const [rowsPerPage, setRowsPerPage] = React.useState(10);

// 	const [openMembers, setOpenMembers] = React.useState(false); 
// 	const [projectId, setProjectId] = React.useState<number>(0);

// 	React.useEffect(() => {
// 		setRows(projectData);
// 	}, [projectData]);

// 	const handleClickOpenMembers = (id: number) => {
// 		setProjectId(id);
// 		setOpenMembers(true); 
// 	};

// 	const handleCloseMembers = () => {
// 		setOpenMembers(false); 
// 	};

// 	const handleChangePage = (event: unknown, newPage: number) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		setRowsPerPage(+event.target.value);
// 		setPage(0);
// 	};

// 	const navigate = useNavigate();

// 	const handleRowClick = (row: any) => {
// 		console.log(row);
// 		navigate(`/project/edit-project/${row.proj_name}`, { state: row.proj_id });
// 	};

// 	const durationDateFormatter = new Intl.DateTimeFormat("en-US", {
// 		year: "numeric",
// 		month: "short",
// 		day: "2-digit",
// 	});

// 	return (
// 		<div className={ProjectTableStyle.tableMainContainer}>
// 			<Paper className={ProjectTableStyle.paperTable}>
// 				<TableContainer className={ProjectTableStyle.tableContainer}>
// 					<Table stickyHeader aria-label="sticky table">
					
// 						<TableHead className={ProjectTableStyle.tableHead}>
// 							<TableRow>
// 								{[
// 									"ID",
// 									"Project Name",
// 									"Client",
// 									"Duration",
// 									"Development Type",
// 									"Member(s)",
// 									"Status",
// 								].map((header, index) => (
// 									<TableCell
// 										key={index}
// 										align="center"
// 										style={{
// 											fontWeight: "bolder",
// 											backgroundColor: "white",
// 										}}
// 									>
// 										{header}
// 									</TableCell>
// 								))}
// 							</TableRow>
// 						</TableHead>

// 						<TableBody>
// 							{rows
// 								.slice(
// 									page * rowsPerPage,
// 									page * rowsPerPage + rowsPerPage
// 								)
// 								.map((row: any) => (
// 									<TableRow
// 										key={row.proj_id}
// 										sx={{
// 											"&:last-child td, &:last-child th":
// 												{
// 													border: 0,
// 												},
// 										}}
// 									>
// 										<TableCell
// 											component="th"
// 											scope="row"
// 											align="center"
// 										>
// 											{row.proj_id}
// 										</TableCell>
// 										<TableCell
// 											component="th"
// 											scope="row"
// 											align="center"
// 										>
// 											<span
// 												onClick={() =>
// 													handleRowClick(row)
// 												}
// 												style={{
// 													textDecoration: "underline",
// 													cursor: "pointer",
// 													color: "blue",
// 												}}
// 											>
// 												{row.proj_name}
// 											</span>
// 										</TableCell>

// 										<TableCell
// 											align="center"
// 											style={{
// 												color: "black",
// 											}}
// 										>
// 											{row.client_name}
// 										</TableCell>
// 										<TableCell
// 											align="center"
// 											style={{
// 												color: "black",
// 											}}
// 										>
// 											{durationDateFormatter.format(
// 												new Date(row.start_date)
// 											)}{" - "}
// 											{durationDateFormatter.format(
// 												new Date(row.end_date)
// 											)}
// 										</TableCell>
// 										<TableCell
// 											align="center"
// 											style={{
// 												color: "black",
// 											}}
// 										>
// 											{row.dev_type_name}
// 										</TableCell>
// 										<TableCell
// 											align="center"
// 											style={{
// 												color: "black",
// 											}}
// 										>
// 											<span
// 												style={{
// 													color: "blue",
// 													textDecoration: "underline",
// 													cursor: "pointer",
// 												}}
// 												onClick={() =>
// 													handleClickOpenMembers(
// 														row.proj_id
// 													)
// 												}
// 											>
// 												{row.members}
// 											</span>
// 										</TableCell>
// 										<TableCell
// 											align="center"
// 											style={{
// 												color: "black",
// 											}}
// 										>
// 											{row.proj_status_name}
// 										</TableCell>
// 									</TableRow>
// 								))}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 				<TablePagination
// 					rowsPerPageOptions={[10, 25, 100]}
// 					component="div"
// 					count={rows.length}
// 					rowsPerPage={rowsPerPage}
// 					page={page}
// 					onPageChange={handleChangePage}
// 					onRowsPerPageChange={handleChangeRowsPerPage}
// 				/>

// 				<Dialog
// 					open={openMembers}
// 					onClose={handleCloseMembers}
// 					aria-describedby="alert-dialog-slide-description"
// 					maxWidth="xl"
// 				>
// 					<DialogTitle>
// 						<div
// 							style={{
// 								width: "100%",
// 								display: "flex",
// 								alignItems: "center",
// 								justifyContent: "flex-start",
// 								gap: "1vw",
// 							}}
// 						>
// 							<div>
// 								<FontAwesomeIcon
// 									icon={faUser}
// 									size="1x"
// 									color="black"
// 								/>
// 							</div>
// 							<div
// 								style={{
// 									fontSize: "2vh",
// 									fontWeight: "600",
// 								}}
// 							>
// 								{"Member(s)"}
// 							</div>
// 						</div>
// 					</DialogTitle>
// 					<DialogContent>
// 						{/* Pass selectedMembers to MembersTable */}
// 						<MembersTable projectId={projectId} />
// 					</DialogContent>
// 					<DialogActions>
// 						<Button onClick={handleCloseMembers}>Close</Button>
// 					</DialogActions>
// 				</Dialog>
// 			</Paper>
// 		</div>
// 	);
// };

// export default ProjectTable;
