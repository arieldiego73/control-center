import * as React from "react";
import { Box } from "@mui/material";
import { GridColDef, DataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { datagridBoxStyle } from "../datagrid_customs/DataGridStyle";
import UnsortedIcon from "../datagrid_customs/UnsortedIcon";
import CustomPagination from "../custom_pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getProjectMembers } from "../../redux/saga/projectSaga";
import { FormControl, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface MembersTableProp {
  projectId: number;
}

 // Define the type for your row data
 interface RowData {
    emp_id: number;
    first_name: string;
    last_name: string;
    position_name: string;
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

  const [rows, setRows] = React.useState(projectMembers)

  React.useEffect(() => {
    setRows(projectMembers);
  }, [projectMembers]);

  React.useEffect(() => {
    console.log("rows", rows)
  }, [rows]);

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
    const filteredData = projectMembers.filter((member) => {
      const match =
	  member.first_name.toLowerCase().includes(searchQuery.name.toLowerCase()) ||
	  member.last_name.toLowerCase().includes(searchQuery.name.toLowerCase()) ||
	  member.first_name
		.concat(" " + member.last_name)
		.toLowerCase()
		.includes(searchQuery.name.toLowerCase()) ||
	member.position_name
		.toLowerCase()
		.includes(searchQuery.name.toLowerCase());

      return match;
    });
	console.log("filtered data:", filteredData);
	
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
        sx={{ width: 600 }}
        // rows={searchData}
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
