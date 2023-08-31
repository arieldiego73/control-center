
import * as React from 'react';
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
} from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { TablePagination } from '@mui/material';
import MembersTable from './MembersTable';
import { Link, useNavigate } from 'react-router-dom';

interface RowData {
  id: number;
  projectName: string;
  projectManager: string;
  client: string;
  duration: string;
  developmentType: string;
  developmentPhase: string;
  technoloies: string;
  members: number;
}

const rows: RowData[] = [
  { id: 1, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 2, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'McDo', duration: '07/01/23 - 10/30/23', developmentType: 'Waterfall', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 3, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Mang Inasal', duration: '07/01/23 - 10/30/23', developmentType: 'Scrum', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 4, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Chowking', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 5, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'KFC', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 6, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 7, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 8, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 9, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 10, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 11, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 12, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 13, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 14, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 15, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 16, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 17, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  { id: 18, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
];

export default function ProjectTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedMembers, setSelectedMembers] = React.useState<number | null>(null); // Use number | null


  const handleClickOpen = (members: number) => {
    setSelectedMembers(members);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "space-around", height: "100%",}}>
      <Paper sx={{ width: "98%", height: "90%", backgroundColor: "transparent" }}>
        <TableContainer sx={{ width: "100%", height: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: "transparent", zIndex: "1" }}>
              <TableRow>
                {['ID', 'Project Name', 'Project Manager', 'Client', 'Duration', 'Development Type', 'Development Phase', 'Technologies', 'Member(s)'].map((header, index) => (
                  <TableCell key={index} align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , borderBottom:"1px solid black", borderTop:"1px solid black", fontFamily:"Montserrat, sans-serif"}}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 , fontFamily:"Montserrat, sans-serif"} }}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.projectName}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.projectManager}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.client}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.duration}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.developmentType}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.developmentPhase}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>{row.technoloies}</TableCell>
                  <TableCell align="center" style={{fontFamily:"Montserrat, sans-serif"}}>
                    <span
                      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" , fontFamily:"Montserrat, sans-serif" }}
                      onClick={() => handleClickOpen(row.members)}
                    >
                      {row.members}
                    </span>
                  </TableCell>            
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="xl"
        >
          <DialogTitle>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "1vw" , fontFamily:"Montserrat, sans-serif"}}>
              <div>
                <FontAwesomeIcon icon={faUser} size="2x" color="black" />
              </div>
              <div style={{ fontSize: "3vh", fontWeight: "900" , fontFamily:"Montserrat, sans-serif"}}>
                {"Member(s)"}
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            {/* Pass selectedMembers to MembersTable */}
            <MembersTable members={selectedMembers} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
    </div>
  );
}









































  // import * as React from 'react';
  // import Table from '@mui/material/Table';
  // import TableBody from '@mui/material/TableBody';
  // import TableCell from '@mui/material/TableCell';
  // import TableContainer from '@mui/material/TableContainer';
  // import TableHead from '@mui/material/TableHead';
  // import TableRow from '@mui/material/TableRow';
  // import Paper from '@mui/material/Paper';
  // import Button from '@mui/material/Button';
  // import Dialog from '@mui/material/Dialog';
  // import DialogActions from '@mui/material/DialogActions';
  // import DialogContent from '@mui/material/DialogContent';
  // import DialogContentText from '@mui/material/DialogContentText';
  // import DialogTitle from '@mui/material/DialogTitle';
  // import Slide from '@mui/material/Slide';
  // import MembersTable from './MembersTable';
  // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  // import { faUser } from "@fortawesome/free-solid-svg-icons";
  // import { TablePagination } from '@mui/material';
  // import { Link, useNavigate } from 'react-router-dom';



  // // Define the type for your row data
  // interface RowData {
  // 	id: number;
  // 	projectName: string;
  // 	projectManager: string;
  // 	client: string;
  // 	duration: string;
  // 	developmentType: string;
  // 	developmentPhase: string;
  // 	technoloies: string;
  // 	members: number;

  // }


  // const rows: RowData[] = [
  // 	{ id: 1, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 2, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'McDo', duration: '07/01/23 - 10/30/23', developmentType: 'Waterfall', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 3, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Mang Inasal', duration: '07/01/23 - 10/30/23', developmentType: 'Scrum', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 4, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Chowking', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 5, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'KFC', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 6, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 7, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 8, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 9, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 10, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 11, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 12, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 13, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 14, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 15, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 16, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 17, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // 	{ id: 18, projectName: 'firstProj', projectManager: 'Mr. Bean', client: 'Jollibee', duration: '07/01/23 - 10/30/23', developmentType: 'Agile', developmentPhase: 'Design Phase', technoloies: 'Java, React, MySQL', members: 6 },
  // ];



  // export default function ProjectTable() {


  // 	const [page, setPage] = React.useState(0);
  // 	const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // 	const [open, setOpen] = React.useState(false);

  // 	const handleClickOpen = () => {
  // 		setOpen(true);
  // 	};

  // 	const handleClose = () => {
  // 		setOpen(false);
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

  // 	//USED TO GET DATA FOR NEXT PAGE (used in edit user's page)
  // 	// const navigate = useNavigate();

  // 	// const handleRowClick = (row: RowData) => {
  // 	// 	navigate(`/Project/${row.members}`, { state: row });
  // 	// };

  // 	// USED TO HIDE CELL
  // 	// const [showData, setShowData] = React.useState(false);

  // 	// const toggleMiddleNameVisibility = () => {
  // 	// 	setShowData(!showData);
  // 	// }

  // 	// const headerCellStyle = {
  // 	// 	textAlign: "center",
  // 	// 	fontWeight: "bolder",
  // 	// 	backgroundColor: "#ccf5ff",
  // 	// 	display: showData ? "table-cell" : "none", (((Control header visibility)))
  // 	// };

  // 	return (
  // 		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", }}>
  // 			<Paper sx={{ width: "98%", height: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
  // 				<TableContainer sx={{ width: "100%", height: "100%", }}>
  // 					<Table stickyHeader aria-label="sticky table" >
  // 						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1", }} >
  // 							<TableRow >
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>ID</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Poject Name</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Poject Manager</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Client</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Duration</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Development type</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Development phase</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Technoloies</TableCell>
  // 								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>Member(s)</TableCell>
  // 							</TableRow>
  // 						</TableHead>
  // 						<TableBody>
  // 							{rows.map((row) => (
  // 								<TableRow
  // 									key={row.id}
  // 									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  // 								>
  // 									<TableCell component="th" scope="row" align="center">
  // 										{row.id}
  // 									</TableCell>
  // 									<TableCell align="center">{row.projectName}</TableCell>
  // 									<TableCell align="center">{row.projectManager}</TableCell>
  // 									<TableCell align="center">{row.client}</TableCell>
  // 									<TableCell align="center">{row.duration}</TableCell>
  // 									<TableCell align="center">{row.developmentType}</TableCell>
  // 									<TableCell align="center">{row.developmentPhase}</TableCell>
  // 									<TableCell align="center">{row.technoloies}</TableCell>
  // 									<TableCell onClick={handleClickOpen} align="center" style={{ color: "blue", textDecoration: "underline", }}>{row.members}</TableCell>
  // 								</TableRow>
  // 							))}
  // 						</TableBody>
  // 					</Table>
  // 				</TableContainer>

  // 				{/* Popup */}
  // 				<Dialog
  // 					open={open}
  // 					onClose={handleClose}
  // 					aria-describedby="alert-dialog-slide-description"
  // 					maxWidth="xl"
  // 				>
  // 					<DialogTitle>
  // 						<div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center" , gap:"1vw"}}>
  // 							<div>
  // 								<FontAwesomeIcon icon={faUser} size="1x" color="black" />
  // 							</div>
  // 							<div style={{fontSize:"3vh", fontWeight:"900"}}>
  // 								{"Member(s)"}
  // 							</div>
  // 						</div>
  // 					</DialogTitle>
  // 					<DialogContent>
  // 						<MembersTable />
  // 					</DialogContent>
  // 					<DialogActions>
  // 						<Button onClick={handleClose}>Close</Button>
  // 					</DialogActions>
  // 				</Dialog>
  // 				<TablePagination
  // 					rowsPerPageOptions={[10, 25, 100]}
  // 					component="div"
  // 					count={rows.length}
  // 					rowsPerPage={rowsPerPage}
  // 					page={page}
  // 					onPageChange={handleChangePage}
  // 					onRowsPerPageChange={handleChangeRowsPerPage}
  // 				/>
  // 			</Paper>
  // 		</div>
  // 	);
  // }