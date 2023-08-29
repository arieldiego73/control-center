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
	name: string;
	calories: number;
	fat: number;
	carbs: number;
	protein: number;
}


const rows: RowData[] = [
	{ name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
	{ name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
	// Add other rows here...
  ];
  

export default function UserTable() {
	const navigate = useNavigate();

	const handleRowClick = (row: RowData) => {
		navigate(`/User/${row.name}`, { state: row });
	  };

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
			<Paper sx={{ width: "98%", height: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
				<TableContainer sx={{ width: "100%", height: "100%" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead sx={{ backgroundColor: "transparent", zIndex: "1" }}>
							<TableRow>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									Dessert (100g serving)
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									Calories
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									Carbs&nbsp;(g)
								</TableCell>
								<TableCell align="center" style={{ fontWeight: "bolder", backgroundColor: "#ccf5ff" }}>
									Protein&nbsp;(g)
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										<span
											onClick={() => handleRowClick(row)}
											style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
										>
											{row.name}
										</span>
									</TableCell>
									<TableCell align="center">{row.calories}</TableCell>
									<TableCell align="center">{row.fat}</TableCell>
									<TableCell align="center">{row.carbs}</TableCell>
									<TableCell align="center">{row.protein}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
