
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';


interface MembersTableProps {
  members: number | null;
}


function createData(
  firstName: string,
  lastName: string,
  position: string,
  role: string,
) {
  return { firstName, lastName, position, role };
}

const rows = [
  createData('Shernan Jenesis', 'Mateo','Design Engineer Trainee', 'Frontend developer'),
  createData('Shernan Jenesis', 'Mateo','Design Engineer Trainee', 'Backend developer'),
  createData('Shernan Jenesis', 'Mateo','Design Engineer Trainee', 'Designer, Frontend developer, Backend Developer'),
  createData('Shernan Jenesis', 'Mateo','Design Engineer Trainee', 'Frontend developer'),
  createData('Shernan Jenesis', 'Mateo','Design Engineer Trainee', 'Backend developer'),
  createData('Shernan Jenesis', 'Mateo','Design Engineer Trainee', 'Designer, Frontend developer, Backend Developer'),
  
];

export default function MembersTable({ members }: MembersTableProps)  {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TableContainer component={Paper} style={{ width: '100%', maxHeight: '70vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: "rgb(243, 243, 243)", padding: "2vh 5vw", fontWeight: "600" }}>First name</TableCell>
              <TableCell align="center" sx={{ backgroundColor: "rgb(243, 243, 243)", padding: "2vh 5vw", fontWeight: "600" }}>Last name</TableCell>
              <TableCell align="center" sx={{ backgroundColor: "rgb(243, 243, 243)", padding: "2vh 5vw", fontWeight: "600" }}>Position</TableCell>
              <TableCell align="center" sx={{ backgroundColor: "rgb(243, 243, 243)", padding: "2vh 5vw", fontWeight: "600" }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.firstName}>
                <TableCell align="center" sx={{ padding: "2vh 2vw" }}>{row.firstName}</TableCell>
                <TableCell align="center" sx={{ padding: "2vh 5vw" }}>{row.lastName}</TableCell>
                <TableCell align="center" sx={{ padding: "2vh 5vw" }}>{row.position}</TableCell>
                <TableCell align="center" sx={{ padding: "2vh 5vw" }}>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}







