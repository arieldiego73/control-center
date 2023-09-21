import * as React from "react";
import Box from "@mui/material/Box";
import {
	GridRowsProp,
	DataGrid,
	GridColDef,
	GridRowParams,
	GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import { datagridBoxStyle } from "../datagrid_customs/DataGridStyle";
import CustomPagination from "../custom_pagination/pagination";
import { getClientFetch } from "../../redux/state/clientState";

interface SelectClientTableProps {
	setClient: React.Dispatch<
		React.SetStateAction<GridRowParams<any> | undefined>
	>;
}

const AddClientNameTable: React.FC<SelectClientTableProps> = (props) => {
	const dispatch = useDispatch();

	// GET ALL THE ROLES AND STORE THEM TO THE STATE IN REDUX
	React.useEffect(() => {
		dispatch(getClientFetch());
	}, [dispatch]);

	// STORE THE ROLES TO 'data'
	const data = useSelector((state: RootState) => state.clientReducer.clients);
	const [rows, setRows] = React.useState<GridRowsProp>(data);
	const [rowSelectionModel, setRowSelectionModel] =
		React.useState<GridRowSelectionModel>([2]);

	React.useEffect(() => {
		console.log(rowSelectionModel);
	}, [rowSelectionModel]);

	const dataGridSlots = {
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const columns: GridColDef[] = [
		{
			field: "client_name",
			headerName: "Client",
			flex: 1,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "client_sh_name",
			headerName: "Short Name",
			flex: 1,
			headerAlign: "center",
			align: "center",
		},
	];

	return (
		<Box sx={datagridBoxStyle}>
			<DataGrid
				sx={{ width: 500 }}
				rows={rows}
				columns={columns}
				getRowId={(row) => row.client_id}
				keepNonExistentRowsSelected
				disableColumnMenu
				hideFooterSelectedRowCount
				rowSelectionModel={rowSelectionModel}
				onRowSelectionModelChange={(newRowSelectionModel) => {
					setRowSelectionModel(newRowSelectionModel);
				}}
				onRowClick={(params) => props.setClient(params.row)}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				slots={dataGridSlots}
				pageSizeOptions={[10, 25, 50, 100]}
			/>
		</Box>
	);
};

export default AddClientNameTable;
