import { Typography } from "@mui/material";
import UserGraphStyle from "./UserGraph.module.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { GraphsData, RecentProjects } from "../../../redux/state/graphState";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

function createData(
  proj_name: string,
  client_name: string,
  proj_status_name: string
) {
  return {
    proj_name,
    client_name,
    proj_status_name,
  };
}

const theme = createTheme({
  palette: {
    //Finished
    success: {
      main: "#f28500",
      contrastText: "#FFFFFF",
    },
    //Ongoing
    info: {
      main: "#e2725b",
      contrastText: "#FFFFFF",
    },
    //Pending
    primary: {
      main: "#464d77",
      contrastText: "#FFFFFF",
    },
    //Closed
    secondary: {
      main: "#800020",
      contrastText: "#FFFFFF",
    },
  },
});

interface UserGraphProps {
  graphData: GraphsData[];
}

const UserGraph: React.FC<UserGraphProps> = (props) => {
  // const { graphData } = props;
  // const [data, setData] = useState<String>();
  const { graphData } = props;
  const [data, setData] = useState<RecentProjects[]>([]);

  const loadingState = useSelector(
    (state: RootState) => state.graphsData.isLoading
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an asynchronous task that takes 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Update progressValue when the task is complete
        setProgressValue(100);
        setIsLoading(false);
      } catch (error) {
        // Handle errors
        setIsLoading(false);
      }
    };

    // Start the data fetching task
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

  useEffect(() => {
    if (graphData) {
      graphData.map((data) =>
        setData(
          data.recent_projects.map((projStat) =>
            createData(
              projStat.proj_name,
              projStat.client_name,
              projStat.proj_status_name
            )
          )
        )
      );
    }
    console.log("etooooooo", graphData);
  }, [graphData]);

  useEffect(() => {
    console.log("USERRRRRRRRRR", data);
  }, [data]);

  return (
    <div className={UserGraphStyle.userGraphHolder}>
      <div className={UserGraphStyle.graphContainer}>
        <div
          style={{
            height: "20%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {" PROJECTS "}
          </Typography>
        </div>

        <div style={{ height: "80%", width: "100%" }}>
          <Grid container spacing={1}>
            {data.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    margin: "auto",
                    width: "87%",
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12} sm container sx={{}}>
                      <Grid item xs container spacing={2} sx={{}}>
                        <ListItemText
                          secondary={item.client_name}
                          secondaryTypographyProps={{ lineHeight: 1 }}
                          sx={{ paddingLeft: 2 }}
                        >
                          <Typography variant="h6" fontWeight={800}>
                            {item.proj_name}
                          </Typography>
                        </ListItemText>
                      </Grid>
                      <Grid item sx={{}}>
                        <ThemeProvider theme={theme}>
                          <Badge
                            badgeContent={item.proj_status_name}
                            color={
                              item.proj_status_name === "Pending"
                                ? "primary"
                                : item.proj_status_name === "Ongoing"
                                ? "info"
                                : item.proj_status_name === "Finished"
                                ? "success"
                                : item.proj_status_name === "Closed"
                                ? "secondary"
                                : "warning"
                            }
                          />
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress color="error" value={progressValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGraph;
