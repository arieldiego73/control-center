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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ProjectTableStyle from "./test2.module.css";
import MembersTable from "../project/MembersTable";

interface ProjectTableProps {
	projectData: any[];
}

const ProjectTable: React.FC<ProjectTableProps> = (props) => {
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

  const columns: GridColDef[] = [
    { field: "proj_id", headerName: "ID", width: 100, headerAlign: "center",
    align: "center", },
    {
      field: "proj_name",
      headerName: "Project Name",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridCellParams) => (
        <span
          onClick={() => handleRowClick(params)}
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
    { field: "client_name", headerName: "Client", width: 150, headerAlign: "center",
    align: "center",},
    {
      field: "duration",
      headerName: "Duration",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueGetter: (params: GridValueGetterParams) =>
        `${durationDateFormatter.format(
          new Date(params.row.start_date)
        )} - ${durationDateFormatter.format(new Date(params.row.end_date))}`,
    },
    { field: "dev_type_name", headerName: "Development Type", width: 180, headerAlign: "center",
    align: "center", },
    {
      field: "members",
      headerName: "Member(s)",
      width: 100,
      headerAlign: "center",
      align: "center",
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
    
    { field: "proj_status_name", headerName: "Status", width: 150, headerAlign: "center",
    align: "center", },
  ];
  return (
    <div className={ProjectTableStyle.tableMainContainer}>
      <Paper className={ProjectTableStyle.paperTable}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows} 
            getRowId={(row) => row.proj_id} 
            columns={columns}
            pagination
            pageSizeOptions={[5, 25, 50, 100]}
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
