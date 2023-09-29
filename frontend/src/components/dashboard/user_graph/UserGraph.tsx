import { Typography } from "@mui/material";
import UserGraphStyle from "./UserGraph.module.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";



export default function UserGraph() {
  return (
    <div className={UserGraphStyle.userGraphHolder}>
      <div className={UserGraphStyle.graphContainer}>
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            borderRadius: "10px",
            flexDirection: "column",
            display: "flex",
            alignItems: "flex-start",
            padding: "24px",
          }}
        >
          <div>
            <Typography variant="h5" fontWeight={600}>
              {" "}
              PROJECTS{" "}
            </Typography>
          </div>

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              maxHeight: 24,
              flexGrow: 1,

              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container spacing={2}>
                  <ListItemText
                    secondary="Tsukiden"
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    sx={{ paddingLeft: 2 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={800}
                    >
                      Seat Plan Management
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <Badge badgeContent="Ongoing" color="success"></Badge>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              maxHeight: 24,
              flexGrow: 1,

              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container spacing={2}>
                  <ListItemText
                    secondary="Code Mechanics"
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    sx={{ paddingLeft: 2 }}
                  >
                    <Typography
                      // gutterBottom
                      variant="h6"
                      // component="div"
                      fontWeight={800}
                      // paddingLeft={1}
                    >
                      Konka Charity
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <Badge badgeContent="Close" color="error"></Badge>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              maxHeight: 24,
              flexGrow: 1,

              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container spacing={2}>
                  <ListItemText
                    secondary="Code Mechanics"
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    sx={{ paddingLeft: 2 }}
                  >
                    <Typography
                      // gutterBottom
                      variant="h6"
                      // component="div"
                      fontWeight={800}
                      // paddingLeft={1}
                    >
                      Konka Charity
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <Badge badgeContent="Close" color="error"></Badge>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            borderRadius: "10px",
            flexDirection: "column",
            display: "flex",
            alignItems: "flex-start",
            padding: "24px",
          }}
        >
          <div style={{ width: "100%", textDecoration: "none" }}>
            <Link
              to="/projects"
              style={{
                textDecoration: "none",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined"> View more</Button>
            </Link>
          </div>

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              maxHeight: 24,
              flexGrow: 1,

              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container spacing={2}>
                  <ListItemText
                    secondary="NRI"
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    sx={{ paddingLeft: 2 }}
                  >
                    <Typography variant="h6" fontWeight={800}>
                      Control Center
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <Badge badgeContent="Finished" color="secondary"></Badge>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              maxHeight: 24,
              flexGrow: 1,

              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container spacing={2}>
                  <ListItemText
                    secondary="Tsukiden"
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    sx={{ paddingLeft: 2 }}
                  >
                    <Typography variant="h6" fontWeight={800}>
                      Seat Plan Management
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <Badge badgeContent="Ongoing" color="success"></Badge>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              maxHeight: 24,
              flexGrow: 1,

              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container spacing={2}>
                  <ListItemText
                    secondary="Code Mechanics"
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    sx={{ paddingLeft: 2 }}
                  >
                    <Typography variant="h6" fontWeight={800}>
                      Konka Charity
                    </Typography>
                  </ListItemText>
                </Grid>
                <Grid item>
                  <Badge badgeContent="Close" color="error"></Badge>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    </div>
  );
}
