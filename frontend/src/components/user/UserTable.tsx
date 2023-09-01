import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "@mui/material";



// Define the type for your row data
interface RowData {
	assocID: number;
	username: string;
	firstName: string;
	middleName: string;
	lastName: string;
	position: string;
	email: string;
	businessUnit: string;
	department: number;
	created: string;
}


const rows: RowData[] = [
	{ assocID: 1, username: 'smateo1', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 1, created: '08-29-23' },
	{ assocID: 2, username: 'smateo2', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 2, created: '08-29-23' },
	{ assocID: 3, username: 'smateo3', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 3, created: '08-29-23' },
	{ assocID: 4, username: 'smateo4', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 5, username: 'smateo5', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 6, username: 'smateo6', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 7, username: 'smateo7', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 8, username: 'smateo8', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 9, username: 'smateo9', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 10, username: 'smateo10', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 11, username: 'smateo11', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 12, username: 'smateo12', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 13, username: 'smateo13', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 14, username: 'smateo14', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 15, username: 'smateo15', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 16, username: 'smateo16', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 17, username: 'smateo17', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 18, username: 'smateo18', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 19, username: 'smateo19', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 20, username: 'smateo20', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
	{ assocID: 21, username: 'smateo21', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'myEmail@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },


];


export default function UserTable() {

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

	const startIndex = page * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;

	const navigate = useNavigate();

	const handleRowClick = (row: RowData) => {
		navigate(`/editUser/${row.username}`, { state: row });
	};


	const [showData, setShowData] = React.useState(false);

	const toggleMiddleNameVisibility = () => {
		setShowData(!showData);
	}

	const headerCellStyle = {
		textAlign: "center",
		fontWeight: "bolder",
		display: showData ? "table-cell" : "none", // Control header visibility
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "space-around", height: "100%", }}>
			<Paper sx={{ width: "98%", height: "90%", backgroundColor: "transparent" }}>
				<TableContainer sx={{ width: "100%", height: "100%" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1" }}>
							<TableRow>
								<TableCell align="center" sx={headerCellStyle} >
									associate id
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff", fontFamily: "Montserrat, sans-serif" }}>
									Username
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									First name
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									Last name
								</TableCell>
								<TableCell align="center" sx={headerCellStyle} >
									Middle name
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									Position
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									Email
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									Business unit
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									Department
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" , fontFamily: "Montserrat, sans-serif" }}>
									Created
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(startIndex, endIndex).map((row) => (
								<TableRow
									key={row.assocID} // Assuming assocID is unique
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										<span
											onClick={() => handleRowClick(row)}
											style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
										>
											{row.username}
										</span>
									</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}} >{row.firstName}</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}}>{row.position}</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}}>{row.email}</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}}>{row.lastName}</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}}>{row.businessUnit}</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}}>{row.department}</TableCell>
									<TableCell align="center" style={{ fontFamily: "Montserrat, sans-serif"}}>{row.created}</TableCell>
									{showData ? (
										<TableCell align="center">{row.middleName}</TableCell>
									) : null}
									{showData ? (
										<TableCell align="center">{row.assocID}</TableCell>
									) : null}
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
			</Paper>
		</div>
	);
}
