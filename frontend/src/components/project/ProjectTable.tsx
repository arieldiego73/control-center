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
// import { Link } from 'react-router-dom';


// function createData(
// 	name: string,
// 	calories: number,
// 	fat: number,
// 	carbs: number,
// 	protein: number,
// ) {
// 	return { name, calories, fat, carbs, protein };
// }

// const rows = [
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),

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


// 	return (
// 		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", }}>
// 			<Paper sx={{ width: "98%", height: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
// 				<TableContainer sx={{ width: "100%", height: "100%", }}>
// 					<Table stickyHeader aria-label="sticky table" >
// 						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1", }} >
// 							<TableRow >
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>ID</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Poject Name</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Poject Manager</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Client</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Duration</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Development type</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Development phase</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Technoloies</TableCell>
// 								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Member(s)</TableCell>
// 							</TableRow>
// 						</TableHead>
// 						<TableBody>
// 							{rows.map((row) => (
// 								<TableRow
// 									key={row.name}
// 									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// 								>
// 									<TableCell component="th" scope="row" align="center">
// 										{row.name}
// 									</TableCell>
// 									<TableCell align="center">{row.calories}</TableCell>
// 									<TableCell align="center">{row.fat}</TableCell>
// 									<TableCell align="center">{row.carbs}</TableCell>
// 									<TableCell onClick={handleClickOpen} align="center">{row.protein}</TableCell>
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
// 				>
// 					<DialogTitle>
// 						<FontAwesomeIcon icon={faUser} size="1x" color="black" />
// 						{"Members"}
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


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MembersTable from './MembersTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { TablePagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';



// Define the type for your row data
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

	const handleClickOpen = () => {
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

	//USED TO GET DATA FOR NEXT PAGE (used in edit user's page)
	// const navigate = useNavigate();

	// const handleRowClick = (row: RowData) => {
	// 	navigate(`/Project/${row.members}`, { state: row });
	// };

	// USED TO HIDE CELL
	// const [showData, setShowData] = React.useState(false);

	// const toggleMiddleNameVisibility = () => {
	// 	setShowData(!showData);
	// }

	// const headerCellStyle = {
	// 	textAlign: "center",
	// 	fontWeight: "bolder",
	// 	backgroundColor: "#ccf5ff",
	// 	display: showData ? "table-cell" : "none", (((Control header visibility))) 
	// };

	return (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", }}>
					<Paper sx={{ width: "98%", height: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
						<TableContainer sx={{ width: "100%", height: "100%", }}>
							<Table stickyHeader aria-label="sticky table" >
								<TableHead sx={{ backgroundColor: "transparent", zIndex: "1", }} >
									<TableRow >
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>ID</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Poject Name</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Poject Manager</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Client</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Duration</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Development type</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Development phase</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Technoloies</TableCell>
										<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Member(s)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow
											key={row.id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row" align="center">
												{row.id}
											</TableCell>
											<TableCell align="center">{row.projectName}</TableCell>
											<TableCell align="center">{row.projectManager}</TableCell>
											<TableCell align="center">{row.client}</TableCell>
											<TableCell align="center">{row.duration}</TableCell>
											<TableCell align="center">{row.developmentType}</TableCell>
											<TableCell align="center">{row.developmentPhase}</TableCell>
											<TableCell align="center">{row.technoloies}</TableCell>
											<TableCell onClick={handleClickOpen} align="center" style={{color: "blue", textDecoration:"underline",}}>{row.members}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
		
						{/* Popup */}
						<Dialog
							open={open}
							onClose={handleClose}
							aria-describedby="alert-dialog-slide-description"
						>
							<DialogTitle>
								<FontAwesomeIcon icon={faUser} size="1x" color="black" />
								{"Members"}
							</DialogTitle>
							<DialogContent>
								<MembersTable />
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