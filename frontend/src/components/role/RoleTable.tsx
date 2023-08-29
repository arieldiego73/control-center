import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface roleProps {
	data: [];
}

interface Column {
	id: string;
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: Date) => string;
	isLink?: boolean;
}

const columns: readonly Column[] = [
	{ id: "title", label: "Role" },
	{ id: "role_sh_name", label: "Short Name" },
];

const RoleTable: React.FC<roleProps> = (props) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<Paper
				sx={{
					width: "98%",
					height: "100%",
					overflow: "hidden",
					backgroundColor: "transparent",
				}}
			>
				<TableContainer sx={{ width: "100%", height: "100%" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead
							sx={{ backgroundColor: "transparent", zIndex: "1" }}
						>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align="center" // Center align the header cells
										style={{
											minWidth: column.minWidth,
											backgroundColor: "#ccf5ff",
											fontWeight: "bolder",
											fontSize: "18px",
											fontFamily: "Montserrat, san-serif",
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{props.data
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									const { role_id } = row;
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={role_id}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align="center" // Center align the cell content
														style={{
															minWidth:
																column.minWidth,
															fontWeight:
																"normal",
														}}
													>
														{value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={props.data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default RoleTable;
