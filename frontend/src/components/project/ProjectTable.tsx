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

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),

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


	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", }}>
			<Paper sx={{ width: "98%", height: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
				<TableContainer sx={{ width: "100%", height: "100%", }}>
					<Table stickyHeader aria-label="sticky table" >
						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1", }} >
							<TableRow >
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Dessert (100g serving)</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Calories</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Fat&nbsp;(g)</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Carbs&nbsp;(g)</TableCell>
								<TableCell align="center" style={{fontWeight:"bolder", backgroundColor: "#ccf5ff"}}>Protein&nbsp;(g)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										{row.name}
									</TableCell>
									<TableCell align="center">{row.calories}</TableCell>
									<TableCell align="center">{row.fat}</TableCell>
									<TableCell align="center">{row.carbs}</TableCell>
									<TableCell onClick={handleClickOpen} align="center">{row.protein}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

<<<<<<< HEAD
			{/* Popup */}
=======
				{/* Popup */}
>>>>>>> bdd4e71149d91910e4171a5119125fb098b7604a
				<Dialog
					open={open}
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
				>
<<<<<<< HEAD
					<DialogTitle><FontAwesomeIcon style={{paddingRight:'1%'}} icon={faUser} size="1x" color="black"  />{"Members"}</DialogTitle>
					<DialogContent>
								<MembersTable />
					</DialogContent>
					<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
		
	}
=======
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
>>>>>>> bdd4e71149d91910e4171a5119125fb098b7604a
