import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { TablePagination } from "@mui/material";
import MembersTable from "./MembersTable";
import ViewProjectDetails from "./ViewProjectDetails";
import { Link, useNavigate } from "react-router-dom";
import { FontFamily } from "@mui/joy/styles";
import ProjectTableStyle from "./Project.module.css";

export interface RowData {
  id: number;
  projectName: string;
  projectManager: string;
  client: string;
  duration: string;
  developmentType: string;
  developmentPhase: string;
  technoloies: string;
  members: number;
  status: string;
}

const rows: RowData[] = [
  {
    id: 1,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "McDo",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Waterfall",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 2,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 3,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Mang Inasal",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Scrum",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 4,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Chowking",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 5,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "KFC",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 6,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 7,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 8,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 9,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 10,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 11,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 12,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 13,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 14,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 15,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 16,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 17,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
  {
    id: 18,
    projectName: "firstProj",
    projectManager: "John Doe",
    client: "Jollibee",
    duration: "07/01/23 - 10/30/23",
    developmentType: "Agile",
    developmentPhase: "Design Phase",
    technoloies: "Java, React, MySQL",
    members: 6,
    status: "in progress",
  },
];

export default function ProjectTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openMembers, setOpenMembers] = React.useState(false); // Separate state for members dialog
  const [openProjectDetails, setOpenProjectDetails] = React.useState(false); // Separate state for project details dialog

  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null
  );
  const [selectedMembers, setSelectedMembers] = React.useState<number | null>(
    null
  );

  const handleClickOpenMembers = (members: number) => {
    setSelectedMembers(members);
    setOpenMembers(true); // Open the members dialog
  };

  const handleClickOpenProjectDetails = (projectName: string) => {
    setSelectedProject(projectName);
    setOpenProjectDetails(true); // Open the project details dialog
  };

  const handleCloseMembers = () => {
    setOpenMembers(false); // Close the members dialog
  };

  const handleCloseProjectDetails = () => {
    setOpenProjectDetails(false); // Close the project details dialog
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (members: number) => {
    setSelectedMembers(members);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const navigate = useNavigate();

  const handleRowClick = (row: RowData) => {
    navigate(`/editProject/${row.projectName}`, { state: row });
  };

  const [showData, setShowData] = React.useState(false);

  const toggleMiddleNameVisibility = () => {
    setShowData(!showData);
  };

  const font = "Montserrat, sans-serif";

  return (
    <div className={ProjectTableStyle.tableMainContainer}>
      <Paper className={ProjectTableStyle.paperTable}>
        <TableContainer className={ProjectTableStyle.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            {/*Title Header */}
            <TableHead className={ProjectTableStyle.tableHead}>
              <TableRow>
                {[
                  "ID",
                  "Project Name",
                  "Client",
                  "Duration",
                  "Development Type",
                  "Member(s)",
                  "Status",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{
                      fontWeight: "bolder",
                      backgroundColor: "white",
                      fontFamily: `${font}`,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/*Data table */}
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        fontFamily: `${font}`,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <span
                        onClick={() => handleRowClick(row)}
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: "blue",
                        }}
                      >
                        {row.projectName}
                      </span>
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {row.client}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {row.duration}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {row.developmentType}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        onClick={() => handleClickOpenMembers(row.members)}
                      >
                        {row.members}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
         <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

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
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <div>
                <FontAwesomeIcon icon={faUser} size="1x" color="black" />
              </div>
              <div
                style={{
                  fontSize: "2vh",
                  fontWeight: "600",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {"Member(s)"}
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            {/* Pass selectedMembers to MembersTable */}
            <MembersTable members={selectedMembers} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMembers}>Close</Button>
          </DialogActions>
        </Dialog>

       
      </Paper>
    </div>
  );
}
