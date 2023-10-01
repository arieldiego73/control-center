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
import AddProjManagerStyle from "./AddProjManagerStyle.module.css"
import { FormControl, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


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
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setSearchQuery((prevQuery) => ({
		  ...prevQuery,
		  [name]: value,
		}));
	  };

	// Define the type for your row data
	interface RowData {
		name: string;
		position: string
	}

	const userData: RowData[] = useSelector(
		(state: RootState) => state.userReducer.users
	);

	const [searchData, setData] = React.useState(userData);

	const [searchQuery, setSearchQuery] = React.useState({
		name: "",
		position: "",
	});
	const performSearch = () => {
		const filteredData = userData.filter((employee) => {
		  const nameMatch = employee.name && employee.name.toLowerCase().includes(searchQuery.name.toLowerCase());
		  const positionMatch = employee.position && employee.position.toLowerCase().includes(searchQuery.position.toLowerCase());
		  return nameMatch || positionMatch;
		});
		setData(filteredData);
	  };
	  
	return (
		<Box sx={datagridBoxStyle}>
			<Box
				component="form"
				onKeyDown={(e) => {
					if (e.key.match("Enter")) performSearch();
				}}
				autoComplete="off"
				noValidate
				sx={{ height:"60px",display:"flex" ,alignItems:"flex-end", marginBottom:"10px"}}
			>
				{/* Start of Seach Bar */}
				<div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
					<div style={{width:"70%",}}>
						<FormControl
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-end",
								flex: 1,
								gap: "10px",
								justifyContent: "flex-end",
								width:"100%",
							}}
						>
							<TextField
								label="Name or Position"
								variant="outlined"
								size="small"
								value={searchQuery.name}
								onChange={handleInputChange}
								name="name"
								sx={{ flex: 1, display: "flex" }}
								inputProps={{
									autoComplete: "chrome-off",
								}}
							/>
						</FormControl>
					</div>
					<div style={{ width:"23%"}}>
						<Button
							variant="contained"
							color="inherit"
							startIcon={<SearchIcon />}
							onClick={performSearch}
							style={{ height: "40px" }}
						>
							Search
						</Button>
					</div>
				</div>
			</Box>

			<DataGrid
				sx={{ width: 500 }}
				// rows={rows}
				rows={searchData}
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
