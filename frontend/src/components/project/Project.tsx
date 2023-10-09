import React, { useState } from "react";
import ProjectStyle from "./Project.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ProjectTable from "./ProjectTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  TextField,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  InputLabel,
} from "@mui/material";
import {
  addProjectReset,
  getProjectsFetch,
} from "../../redux/state/projectState";
import { getProjectStatusFetch } from "../../redux/state/projectStatusState";

export default function Project() {
  const dispatch = useDispatch();

  const isAddSuccess = useSelector(
    (state: RootState) => state.projectReducer.isAddSuccess
  );
  React.useEffect(() => {
    if (isAddSuccess) dispatch(addProjectReset());
  }, [isAddSuccess]);

  React.useEffect(() => {
    dispatch(getProjectsFetch());
    dispatch(getProjectStatusFetch());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.projectReducer.projects);
  const statuses = useSelector(
    (state: RootState) => state.projectStatusReducer.projectStatus
  );

  const [projectData, setProjectData] = useState(data);
  const [searchQuery, setSearchQuery] = React.useState({
    proj_name: "",
    client_name: "",
    proj_status_name: "",
  });

  React.useEffect(() => {
    setProjectData(data);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleSelectInputChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const performSearch = () => {
    const filteredData = data.filter((project: any) => {
      const projNameMatch = project.proj_name
        .toLowerCase()
        .includes(searchQuery.proj_name.toLowerCase());
      const clientMatch = project.client_name
        .toLowerCase()
        .includes(searchQuery.client_name.toLowerCase());
      const statusMatch = project.proj_status_name
        .toLowerCase()
        .includes(searchQuery.proj_status_name.toLowerCase());
      return projNameMatch && clientMatch && statusMatch;
    });

    setProjectData(filteredData);
  };

  return (
    <div className={ProjectStyle.outermost}>
      <div className={ProjectStyle.addButton}>
        <Link
          to="/project/add-new-project"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            className={ProjectStyle.button}
            // onClick={performSearch}
          >
            Add Project
          </Button>
        </Link>
      </div>
      <div className={ProjectStyle.mainContainer}>
        <div className={ProjectStyle.mainHolder}>
          <div className={ProjectStyle.contentHolder}>
            <Box
              component="form"
              onKeyDown={(e) => {
                if (e.key.match("Enter")) performSearch();
              }}
              autoComplete="off"
              noValidate
              className={ProjectStyle.searchBarContainer}
            >
              {/* Start of first search bar */}
              <div className={ProjectStyle.searchBarCol}>
                {/* Start of Project Name Search */}
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="Project Name"
                    variant="outlined"
                    size="small"
                    name="proj_name"
                    value={searchQuery.proj_name}
                    onChange={handleInputChange}
                    sx={{ flex: 1, display: "flex" }}
                    inputProps={{
                      autoComplete: "chrome-off",
                    }}
                  />
                </FormControl>

                {/* Start of Client Search */}
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    label="Client"
                    variant="outlined"
                    size="small"
                    name="client_name"
                    value={searchQuery.client_name}
                    onChange={handleInputChange}
                    sx={{ flex: 1, display: "flex" }}
                    inputProps={{
                      autoComplete: "chrome-off",
                    }}
                  />
                </FormControl>

                {/* Start of Status Dropdown */}
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Status
                  </InputLabel>
                  <Select
                    label="Status"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="proj_status_name"
                    value={searchQuery.proj_status_name}
                    onChange={handleSelectInputChange}
                    className={ProjectStyle.projStatus}
                    size="small"
                    inputProps={{
                      classes: {
                        root: ProjectStyle.projSelectRoot,
                        outlined: ProjectStyle.projSelectOutlined,
                      },
                    }}
                  >
                    {statuses.map((status: any) => (
                      <MenuItem
                        key={status.proj_status_id}
                        value={status.proj_status_name}
                      >
                        {status.proj_status_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
            </Box>

            {/* Start of Table */}
            <div className={ProjectStyle.tableContainer}>
              <ProjectTable projectData={projectData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
