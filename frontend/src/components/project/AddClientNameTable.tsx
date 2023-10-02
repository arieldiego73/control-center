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
import { FormControl, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface SelectClientTableProps {
	setClient: React.Dispatch<
		React.SetStateAction<GridRowParams| undefined>
	>;
  data: any[];
  selectedClientId: number[];
}

const AddClientNameTable: React.FC<SelectClientTableProps> = (props) => {
  const { setClient, data, selectedClientId } = props;

	const [rows, setRows] = React.useState<GridRowsProp>(data);
	const [rowSelectionModel, setRowSelectionModel] =
		React.useState<GridRowSelectionModel>(selectedClientId);

	const dataGridSlots = {
		columnUnsortedIcon: UnsortedIcon,
		pagination: CustomPagination,
	};

	const clientData = useSelector(
		(state: RootState) => state.clientReducer.clients
	  );
	  
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setSearchQuery((prevQuery) => ({
		  ...prevQuery,
		  [name]: value,
		}));
	  };
	
	  const [searchQuery, setSearchQuery] = React.useState({
		name: "",
		// position: "",
	  });
	
	  const performSearch = () => {
		const filteredData = clientData.filter((client: any) => {
		  const clientMatch =
		  client.client_name
			.toLowerCase()
			.includes(searchQuery.name.toLowerCase()) ||
		client.client_sh_name.toLowerCase().includes(searchQuery.name.toLowerCase());
		 
		  return clientMatch;
		});
		setRows(filteredData);
	  };
	

	return (
		<Box sx={datagridBoxStyle}>
			   <Box
        component="form"
        onKeyDown={(e) => {
          if (e.key.match("Enter")) {
			e.preventDefault()
			performSearch()
		  }
        }}
        autoComplete="off"
        noValidate
        sx={{
          height: "60px",
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "10px",
        }}
      >
        {/* Start of Seach Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "70%" }}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                flex: 1,
                gap: "10px",
                justifyContent: "flex-end",
                width: "100%",
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
          <div style={{ width: "23%" }}>
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
				onRowClick={(params) => setClient(params)}
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
