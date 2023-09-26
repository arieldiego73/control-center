import * as React from "react";
import { Box } from "@mui/material";
import { GridColDef, DataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { datagridBoxStyle } from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import CustomPagination from "../custom_pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getProjectMembers } from "../../redux/saga/projectSaga";

interface MembersTableProp {
	projectId: number;
}

const MembersTable: React.FC<MembersTableProp> = (props) => {
	const dispatch = useDispatch();
	const { projectId } = props;

  React.useEffect(() => {
		dispatch(getProjectMembers({ projectId }));
	}, [dispatch, projectId]);

	const projectMembers = useSelector(
		(state: RootState) => state.projectReducer.projectMembers
	);

	React.useEffect(() => {
		setRows(projectMembers);
	}, [projectMembers]);

	const [rows, setRows] =
		React.useState<readonly GridValidRowModel[]>(projectMembers);

	const dataGridSlots = {
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	const columns: GridColDef[] = [
		{
			field: "emp_id",
			headerName: "ID",
			flex: 0.5,
			headerAlign: "left",
			align: "left",
		},
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			headerAlign: "center",
			align: "center",
			valueGetter(params) {
				return params.row.first_name + " " + params.row.last_name;
			},
		},
		{
			field: "position_name",
			headerName: "Position",
			flex: 1,
			headerAlign: "center",
			align: "center",
		},
	];

	return (
		<Box sx={datagridBoxStyle}>
			<DataGrid
				sx={{ width: 600 }}
				rows={rows}
				columns={columns}
				getRowId={(row) => row.emp_id}
				disableColumnMenu
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

export default MembersTable;
