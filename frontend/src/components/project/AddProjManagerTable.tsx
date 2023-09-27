import * as React from "react";
import Box from "@mui/material/Box";
import {
	GridRowsProp,
	DataGrid,
	GridColDef,
	GridRowParams,
	GridRowSelectionModel,
  GridRowId,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import { datagridBoxStyle } from "../datagrid_customs/DataGridStyle";
import CustomPagination from "../custom_pagination/pagination";
import { getClientFetch } from "../../redux/state/clientState";
import { getUsersFetch } from "../../redux/state/userState";

export interface SelectProjectManagerTableProps {
  data: any[];
  selected: GridRowSelectionModel | undefined;
  temporarySetter: React.Dispatch<React.SetStateAction<GridRowSelectionModel | undefined>>;
}

const AddProjectManagerTable: React.FC<SelectProjectManagerTableProps> = (props) => {
  const { data, selected, temporarySetter } = props;

	const [rows, setRows] = React.useState<GridRowsProp>(data);
	const [rowSelectionModel, setRowSelectionModel] =
		React.useState<GridRowSelectionModel>(selected as GridRowId[]);

	const dataGridSlots = {
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const columns: GridColDef[] = [
		{
			field: "fname",
			headerName: "Name",
			flex: 1,
			headerAlign: "center",
			align: "center",
      valueGetter(params) {
          return params.row.fname + " " + params.row.lname
      },
		},
		{
			field: "position_sh_name",
			headerName: "Position",
			flex: 0.8,
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
				getRowId={(row) => row.emp_id}
				keepNonExistentRowsSelected
				disableColumnMenu
				rowSelectionModel={rowSelectionModel}
        checkboxSelection
				onRowSelectionModelChange={(newRowSelectionModel) => {
					setRowSelectionModel(newRowSelectionModel);
          temporarySetter(newRowSelectionModel)
				}}
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

export default AddProjectManagerTable;
