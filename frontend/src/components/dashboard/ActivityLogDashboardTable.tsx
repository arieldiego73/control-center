import * as React from "react";
import ActLogStyle from "./Dashboard.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  date: string,
  page: string,
  action: String,
  user: string,
  time: string
) {
  return { date, page, action, user, time };
}

const rows = [
  createData(
    "Today",
    "User Page",
    "Add new user to User page",
    "Admin",
    "9:59 PM"
  ),
  createData(
    " ",
    "Project",
    "Added Project named TestingProj in Project Page",
    "Charlene Valdez",
    "9:59 AM"
  ),

  createData(
    " ",
    "Role",
    "Edit Short Name of System Admin in Role Page",
    "Ariel Diego",
    "11:00 AM"
  ),
  createData(
    "Yesteday",
    "Project",
    "Added Project named Control Center in Project Page",
    "Shernan Mate0",
    "11:11 AM"
  ),
  createData(
    " ",
    "Project",
    "Added new Role name Testing short name Test in Role Page",
    "Allona Fabre",
    "11:11 PM"
  ),
  createData(
    " 11/23/1999",
    "Project",
    "Added new Development Phase and Short Name in Development Phase Page",
    "Ricky Galpo",
    "09:00 AM"
  ),
  createData(
    " ",
    "Project",
    "Added new Development Phase and Short Name in Development Phase Page",
    "Ricky Galpo",
    "09:00 AM"
  ),
  createData(
    " ",
    "Project",
    "Added new Development Phase and Short Name in Development Phase Page",
    "Ricky Galpo",
    "09:00 AM"
  ),

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
    <div className={ActLogStyle.activityLogContainer}>
      <Paper className={ActLogStyle.paper}>
        <TableContainer className={ActLogStyle.actLogTable}>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.page}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    {row.date}
                  </TableCell>
                  <TableCell align="left">{row.time}</TableCell>

                  <TableCell align="left">
                    {row.user} - {row.action}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
