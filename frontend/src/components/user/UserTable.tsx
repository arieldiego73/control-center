import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";



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
	{ assocID: 1, username: 'smateo1', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'pookiechips@yahoo.com', businessUnit: 'BU III', department: 1, created: '08-29-23' },
	{ assocID: 2, username: 'smateo2', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'pookiechips@yahoo.com', businessUnit: 'BU III', department: 2, created: '08-29-23' },
	{ assocID: 3, username: 'smateo3', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'pookiechips@yahoo.com', businessUnit: 'BU III', department: 3, created: '08-29-23' },
	{ assocID: 4, username: 'smateo4', firstName: 'shernan jenesis', middleName: 'badilles', lastName: 'mateo', position: 'trainee', email: 'pookiechips@yahoo.com', businessUnit: 'BU III', department: 4, created: '08-29-23' },
];


export default function UserTable() {
	const navigate = useNavigate();

	const handleRowClick = (row: RowData) => {
		navigate(`/User/${row.username}`, { state: row });
	};


		const [showData, setShowData] = React.useState(false); 
	
		const toggleMiddleNameVisibility = () => {
		  setShowData(!showData);
		}

		const headerCellStyle = {
			textAlign: "center",
			fontWeight: "bolder",
			backgroundColor: "#ccf5ff",
			display: showData ? "table-cell" : "none", // Control header visibility
		  };

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
			<Paper sx={{ width: "98%", height: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
				<TableContainer sx={{ width: "100%", height: "100%" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1" }}>
							<TableRow>
								<TableCell align="center" sx={headerCellStyle} >
									associate id
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									username
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									firstName
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									lastName
								</TableCell>
								<TableCell align="center" sx={headerCellStyle} >
									middleName
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									position
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									email
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									businessUnit
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									department
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									created
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.username}
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
									<TableCell align="center">{row.firstName}</TableCell>
									<TableCell align="center">{row.lastName}</TableCell>
									<TableCell align="center">{row.position}</TableCell>
									<TableCell align="center">{row.email}</TableCell>
									<TableCell align="center">{row.businessUnit}</TableCell>
									<TableCell align="center">{row.department}</TableCell>
									<TableCell align="center">{row.created}</TableCell>
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
			</Paper>
		</div>
	);
}
