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
import UserTableStyle from "./User.module.css";

// Define the type for your row data
interface RowData {
	emp_id: number;
	username: string;
	fname: string;
	lname: string;
	position_sh_name: string;
	email: string;
	section_name: string;
	dept_name: string;
	reg_date: Date;
}

interface UserTableProps {
	data: RowData[];
}

const UserTable: React.FC<UserTableProps> = (props) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [rows, setRows] = React.useState<RowData[]>(props.data);

	React.useEffect(() => {
		setRows(props.data);
		setPage(0)
	}, [props.data]);

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
		navigate(`/user/edit-user/${row.username}`, { state: row.emp_id });
	};

	// const FireNav = styled(List)<{ component?: React.ElementType }>({
	// 	'& .MuiListItemButton-root': {
	// 		paddingLeft: 24,
	// 		paddingRight: 24,
	// 	},
	// });

	return (
		<div className={UserTableStyle.tableMainContainer}>
			<Paper className={UserTableStyle.paperTable}>
				<TableContainer className={UserTableStyle.tableContainer}>
					<Table stickyHeader aria-label="sticky table">
						{/*Title Header */}
						<TableHead className={UserTableStyle.tableHead}>
							<TableRow>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Username
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									First name
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Last name
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Position
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Email
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Business Unit
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Department
								</TableCell>
								<TableCell
									align="center"
									style={{
										fontWeight: "bolder",
										backgroundColor: "white",
									}}
								>
									Created
								</TableCell>
							</TableRow>
						</TableHead>

						{/*Data table */}
						<TableBody>
							{rows.slice(startIndex, endIndex).map((row) => (
								<TableRow
									key={row.emp_id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										<span
											onClick={() => handleRowClick(row)}
											style={{
												textDecoration: "underline",
												cursor: "pointer",
												color: "blue",
											}}
										>
											{row.username}
										</span>
									</TableCell>

									<TableCell align="center">
										{row.fname}
									</TableCell>

									<TableCell align="center">
										{row.lname}
									</TableCell>

									<TableCell align="center">
										{row.position_sh_name}
									</TableCell>

									<TableCell align="center">
										{row.email}
									</TableCell>

									<TableCell align="center">
									{row.dept_name}
									</TableCell>

									<TableCell align="center">
										{row.section_name}
									</TableCell>

									<TableCell align="center">
										{new Intl.DateTimeFormat("en-US", {
											year: "numeric",
											month: "short",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
											// second: "2-digit",
											hour12: true,
										}).format(new Date(row.reg_date))}
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
			</Paper>
		</div>
	);
};

export default UserTable;
