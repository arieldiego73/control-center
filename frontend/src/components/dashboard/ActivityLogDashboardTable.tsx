// ActivityLogDashboardTable

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(
	page: string,
	action: String,
	user: string,
	time: string,
	
) {
	return { page, action, user, time,  };
}

const rows = [
	createData('User Page', 'Add new User', 'Admin', '9:59 PM'),
    createData('Project', 'Added Proj_Name', 'Charlene Valdez', '9:59 AM'),
    createData('Role', 'Edit Short Name', 'Ariel Diego', '11:00 AM'),
    createData('Project', 'Added Project', 'Shernan Mate0', '11:11 AM'),
    createData('Project', 'Added Project', 'Allona Fabre', '11:11 PM'),
    createData('Project', 'Added Project', 'Ricky Galpo', '09:00 AM'),
    
];


export default function ActivityLogDashboardTable() {
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


	return (
		<div style={{width:'90%', display:'flex', justifyContent:'center', alignContent:'center'}}>
			<Paper sx={{ width: "86%",  overflow: "hidden", backgroundColor: "transparent",justifyContent: "center", alignItems: "center", display:'flex', paddingTop:'2%'}}>
				<TableContainer sx={{ width: "90%", justifyContent: "center", alignItems: "center", display:'flex',}}>
					<Table stickyHeader aria-label="sticky table" >
						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1", }} >
							<TableRow >
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Page</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Action</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>User</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Time</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.page}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										{row.page}
									</TableCell>
									<TableCell align="center">{row.action}</TableCell>
									<TableCell align="center">{row.user}</TableCell>
									<TableCell align="center">{row.time}</TableCell>
									{/* <TableCell onClick={handleClickOpen} align="center">{row.protein}</TableCell> */}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

			</Paper>
		</div>
	);
}
