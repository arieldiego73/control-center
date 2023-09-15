import React, { useState, useEffect } from "react";
import ProjectStyle from "./Project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ProjectTable from "./ProjectTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  Grid,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

//for breadcrumbs
import Breadcrumbs from "@mui/material/Breadcrumbs";

//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Project() {
  const data = useSelector((state: RootState) => state.userReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  console.log(data);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    // const filtered = data.filter((item) =>
    // 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setFilteredData(filtered);
  };

  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const breadcrumbItems = [{ label: "Projects", href: "/project" }];

  return (
    <div className={ProjectStyle.mainContainer}>
      <div className={ProjectStyle.mainHolder}>
        <div className={ProjectStyle.addButton}>
          <Link
            to="/createuser"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              className={ProjectStyle.button}
              // onClick={performSearch}
            >
              Add User
            </Button>
          </Link>
        </div>

        <div className={ProjectStyle.contentHolder}>
          <div className={ProjectStyle.searchBarContainer}>
            {/* Start of first search bar */}
            <div className={ProjectStyle.searchBarCol}>
              <FormControl>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <FormLabel
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        width: "100%",
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      Project name :
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      className={ProjectStyle.textField}
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <FormLabel
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        width: "100%",
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      Project manager :{" "}
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      className={ProjectStyle.textField}
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <FormLabel
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        width: "100%",
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      Client :{" "}
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      className={ProjectStyle.textField}
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <FormLabel
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        width: "100%",
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      Status :
                    </FormLabel>
                  </Grid>
                  <Grid item xs>
                    {" "}
                    {/* Let this Grid item take up remaining space */}
                    <FormControl
                      variant="outlined"
                      size="small"
                      style={{ width: "100%", border: "1px solid red" }}
                      className={ProjectStyle.projFormControl}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        onChange={handleChange}
                        className={ProjectStyle.projStatus}
                        sx={{ width: "100%" }}
                        inputProps={{
                          classes: {
                            root: ProjectStyle.projSelectRoot,
                            outlined: ProjectStyle.projSelectOutlined,
                          },
                        }}
                      >
                        <MenuItem value={1}>Open</MenuItem>
                        <MenuItem value={2}>Close</MenuItem>
                        <MenuItem value={3}>Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormControl>
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                style={{
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Search
              </Button>
            </div>

            {/* Start of Search Button */}
          </div>

          {/* Start of Table */}
          <div className={ProjectStyle.tableContainer}>
            <ProjectTable />
          </div>
        </div>
      </div>
    </div>
  );
}
