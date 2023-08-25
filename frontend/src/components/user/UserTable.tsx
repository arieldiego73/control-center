import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

interface userTableProps {
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
	{ id: "username", label: "Username", isLink: true },
	{ id: "fname", label: "First Name" },
	{ id: "lname", label: "Last Name" },
	{ id: "position_sh_name", label: "Position" },
	{ id: "email", label: "Email" },
	{ id: "section_name", label: "Business Unit" },
	{ id: "dept_name", label: "Department" },
	{
		id: "reg_date",
		label: "Created",
		minWidth: 100,
		format: (value: Date) =>
			new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "short",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}).format(new Date(value)),
	},
];

const UserTable: React.FC<userTableProps> = (props) => {
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
		<Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "0" }}>
			<TableContainer sx={{ maxHeight: 410 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth,
										backgroundColor: "#bcbcbc",
										color: "#000",
										fontWeight: "800",
										textTransform: "uppercase",
										fontFamily: "Ubuntu, sans serif",
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
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row["emp_id"]}
									>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.isLink ? (
														<Link
															to={`/createuser/${row["emp_id"]}`}
														>
															{value}
														</Link>
													) : column.format ? (
														column.format(value)
													) : (
														value
													)}
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
	);
};

export default UserTable;
