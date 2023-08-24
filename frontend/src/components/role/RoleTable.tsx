import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
	id: "role" | "shortName" ;
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "role", label: "Role", minWidth: 170 },
	{ id: "shortName", label: "Short name", minWidth: 100 },

];

interface Data {
	role: string;
	shortName: string;
}

function createData(
	role: string,
	shortName: string,
): Data {
	return { role, shortName };
}

const rows = [
	createData("India", "IN"),
	createData("China", "CN"),
	createData("Italy", "IT"),
	createData("United States", "US"),
	createData("Canada", "CA"),
	createData("Australia", "AU"),
	createData("Germany", "DE"),
	createData("Ireland", "IE"),
	createData("Mexico", "MX"),
	createData("Japan", "JP"),
	createData("France", "FR"),
	createData("United Kingdom", "GB"),
	createData("Russia", "RU"),
	createData("Nigeria", "NG"),
	createData("Brazil", "BR"),
  createData("India", "IN"),
	createData("China", "CN"),
	createData("Italy", "IT"),
	createData("United States", "US"),
	createData("Canada", "CA"),
	createData("Australia", "AU"),
	createData("Germany", "DE"),
	createData("Ireland", "IE"),
	createData("Mexico", "MX"),
	createData("Japan", "JP"),
	createData("France", "FR"),
	createData("United Kingdom", "GB"),
	createData("Russia", "RU"),
	createData("Nigeria", "NG"),
	createData("Brazil", "BR"),
];

export default function RoleTable() {
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
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" ,   }}>
      <Paper sx={{ width: "98%", height:"100%",overflow: "hidden", backgroundColor: "transparent" }}>
        <TableContainer sx={{ width:"100%",  height:"100%", }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: "transparent", zIndex: "1" ,}}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center" // Center align the header cells
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.shortName}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center" // Center align the cell content
                          >
                            {column.format &&
                            typeof value === "number"
                              ? column.format(value)
                              : value}
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
