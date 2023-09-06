import React from "react";
import UserStyle from "./User.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import UserTable from "./UserTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, FormLabel, TextField, FormControl } from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

//for breadcrumbs 
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

// Define the type for your row data
interface RowData {
  emp_id: number;
  username: string;
  fname: string;
  lname: string;
  position_sh_name: string;
  email: string;
  section_name: string;
  dept_name: string;
  reg_date: Date;
}

export default function Userpage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  const userData: RowData[] = useSelector(
    (state: RootState) => state.userReducer.users
  );

  const [data, setData] = React.useState(userData);
  const [searchQuery, setSearchQuery] = React.useState({
    name: "",
    businessUnit: "",
    position: "",
    department: "",
  });

  React.useEffect(() => {
    setData(userData);
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const performSearch = () => {
    const filteredData = userData.filter((employee) => {
      const nameMatch =
        employee.fname.toLowerCase().includes(searchQuery.name.toLowerCase()) ||
        employee.lname.toLowerCase().includes(searchQuery.name.toLowerCase()) ||
        employee.fname
          .concat(" " + employee.lname)
          .toLowerCase()
          .includes(searchQuery.name.toLowerCase());

      const businessUnitMatch = employee.section_name
        .toLowerCase()
        .includes(searchQuery.businessUnit.toLowerCase());
      const positionMatch = employee.position_sh_name
        .toLowerCase()
        .includes(searchQuery.position.toLowerCase());
      const departmentMatch = employee.dept_name
        .toLowerCase()
        .includes(searchQuery.department.toLowerCase());

      return nameMatch && businessUnitMatch && positionMatch && departmentMatch;
    });

    // Use the filteredData as needed, such as displaying it in a table
    setData(filteredData);
  };

  const breadcrumbItems = [{ label: "Users", href: "/user" }];

  return (
    <div className={UserStyle.body}>
      <div className={UserStyle.mainContainer}>
        <div style={{ width: "97%", paddingBottom:'1%' }}>
          <div className={UserStyle.pageTitle}>
            <span>
              <AccountTreeOutlinedIcon fontSize="large" />
            </span>
            <span
              style={{ fontSize: "1.8rem", color: "black", fontWeight: "600" }}
            >
              {" "}
              USER{" "}
            </span>
          </div>
        </div>

        <div className={UserStyle.contentContainer}>
          <div className={UserStyle.midContent}>
             {/* for breadcrumbs */}
             <div
              style={{
                // border: "1px solid red",
                paddingBottom: "1%",
                width: "80%",
                height: "75%",
               paddingLeft:'1%',
                position: "relative",
                top: "3%",
                alignSelf: "center",
              }}
              role="presentation"
              onClick={handleClick}
            >
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link
                  to="/User"
                  className={`${UserStyle["custom-link"]}`}
                  style={{ color: "inherit" }}
                >
                  User
                </Link>
              </Breadcrumbs>
            </div>

            <div>
              <Link to="/CreateUser" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  style={{
                    textTransform: "none",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Add User
                </Button>
              </Link>
            </div>
          </div>

          <div className={UserStyle.contentHolder}>
            {/* Start of Header */}
            <Box
              component="form"
              onKeyDown={(e) => {
                if (e.key.match("Enter")) performSearch();
              }}
              className={UserStyle.searchBarContainer}
              autoComplete="off"
              noValidate
            >
              <div className={UserStyle.searchBarCol}>
                {/* Start of first search bar */}
                <Box sx={{ width: "100%" }}>
                  <div className={UserStyle.projStatus}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs>
                        <FormLabel
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                            width: "100%",
                            color: "black",
                            fontWeight: "400",
                          }}
                        >
                          Name :
                        </FormLabel>
                      </Grid>
                      <Grid item xs={7.8}>
                        <TextField
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          className={UserStyle.textField}
                          value={searchQuery.name}
                          onChange={handleInputChange}
                          name="name"
                          inputProps={{
                            autoComplete: "chrome-off"
                          }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Box>
                <FormControl className={UserStyle.projManagerStyle}>
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
                        Business Unit :{" "}
                      </FormLabel>
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        size="small"
                        className={UserStyle.textField}
                        value={searchQuery.businessUnit}
                        onChange={handleInputChange}
                        name="businessUnit"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </div>

              {/* Start of second search bar */}
              <div className={UserStyle.searchBar1}>
                <div className={UserStyle.searchBarCol}>
                  <FormControl className={UserStyle.projClientStyle}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs>
                        <FormLabel
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                            width: "100%",
                            color: "black",
                            fontWeight: "400",
                          }}
                        >
                          Position :{" "}
                        </FormLabel>
                      </Grid>
                      <Grid item>
                        <TextField
                          variant="outlined"
                          size="small"
                          className={UserStyle.textField}
                          value={searchQuery.position}
                          onChange={handleInputChange}
                          name="position"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                  <FormControl className={UserStyle.projClientStyle}>
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
                          Department :{" "}
                        </FormLabel>
                      </Grid>
                      <Grid item>
                        <TextField
                          variant="outlined"
                          size="small"
                          className={UserStyle.textField}
                          value={searchQuery.department}
                          onChange={handleInputChange}
                          name="department"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </div>
              </div>
              <div className={UserStyle.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  style={{
                    textTransform: "none",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  onClick={performSearch}
                >
                  Search
                </Button>
              </div>
            </Box>

            {/* Start of Table */}
            <div className={UserStyle.tableContainer}>
              <UserTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
