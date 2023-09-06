import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

interface Row {
    id: number;
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
): Row {
    return { name, calories, fat, carbs, protein, id: Date.now() };
}

const dessertRows: Row[] = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function AddTechnologyTable(){
    const [selected, setSelected] = useState<number[]>([]);

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        event.stopPropagation(); // Prevent event propagation
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];
 
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

	
  return (
    <div>
            <TableContainer sx={{ maxHeight: 310 ,  fontFamily: 'Montserrat, sans-serif' }}  >
                <Table  stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dessertRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } , fontFamily: 'Montserrat, sans-serif' }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">
                                    {row.protein}
                                    <Checkbox
                                        checked={selected.indexOf(row.id) !== -1}
                                        onChange={(event) => handleCheckboxClick(event, row.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
  );
};



/* <Checkbox
checked={selected.indexOf(row.id) !== -1}
onClick={() => handleCheckboxClick(row.id)}
/> */
