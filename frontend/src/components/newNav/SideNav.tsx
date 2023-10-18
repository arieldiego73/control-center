import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';import smallLogo from "../../Assets/small logo.png";
import BurgerMenu from "./BurgerMenu";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {
  People,
  Dns,
  PermMedia,
  Public,
  KeyboardArrowDown,
}
  from "@mui/icons-material";
import { useDispatch } from "react-redux"

// for dropdown in others 
const othersDropDownData = [
  { label: "Development Phase", path: "/development-phase" },
  { label: "Project Status", path: "/project-status" },
  { label: "Employee Status", path: "/employee-status" },
  { label: "Employee Position", path: "/employee-position" },
  { label: " Business Units", path: "/business-unit" },
  { label: "Departments", path: "/department" },
  { label: "Technologies", path: "/technology" },
  { label: "Development Type", path: "/development-type" },
  { label: "Clients", path: "/clients" },
];

function DevelopmentPhase() {
  return <div>Authentication Content</div>;
}
function ProjectStatus() {
  return <div>Database Content</div>;
}
function EmployeeStatus() {
  return <div>Storage Content</div>;
}
function EmployeePosition() {
  return <div>Hosting Content</div>;
}
function BusinessUnits() {
  return <div>Hosting Content</div>;
}
function Departments() {
  return <div>Hosting Content</div>;
}
function Technologies() {
  return <div>Hosting Content</div>;
}
function DevelopmentTypeHandler() {
  return <div>Hosting Content</div>;
}
function ClientHandler() {
  return <div>Hosting Content</div>;
}

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 30,
  },
  "& .css-1mttud9": {
    paddingBottom: 0,
  },
});

const AnimatedStyle = styled(List)<{ component?: React.ElementType }>({
  width: "100%",
  "&:hover": {
    backgroundColor: "white",
    "& .MuiListItemText-primary": {
      fontWeight: 600,

      WebkitAnimationName: "pulse",
      animationName: "pulse",
      WebkitAnimationDuration: "1s",
      animationDuration: "1s",
      WebkitAnimationFillMode: "both",
      animationFillMode: "both",
      "@-webkit-keyframes pulse": {
        "0%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
        "50%": {
          WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
          transform: "scale3d(1.05, 1.05, 1.05)",
        },
        "100%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
      },
      "@keyframes pulse": {
        "0%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
        "50%": {
          WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
          transform: "scale3d(1.05, 1.05, 1.05)",
        },
        "100%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
      },
    },
    "& .MuiSvgIcon-root": {
      color: "#ec610b",
      // Add the animation properties here
      WebkitAnimationName: "pulse",
      animationName: "pulse",
      WebkitAnimationDuration: "1s",
      animationDuration: "1s",
      WebkitAnimationFillMode: "both",
      animationFillMode: "both",
      "@-webkit-keyframes pulse": {
        "0%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
        "50%": {
          WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
          transform: "scale3d(1.05, 1.05, 1.05)",
        },
        "100%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
      },
      "@keyframes pulse": {
        "0%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
        "50%": {
          WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
          transform: "scale3d(1.05, 1.05, 1.05)",
        },
        "100%": {
          WebkitTransform: "scale3d(1, 1, 1)",
          transform: "scale3d(1, 1, 1)",
        },
      },
    },
  },
},
);

export default function SideNav() {

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // Add an event listener to update the screenWidth state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const isScreenLessThan1200 = screenWidth <= 1200;
  const isScreenLessThan750 = screenWidth <= 750;

  const sidenavContainerStyle: React.CSSProperties = {
    height: isScreenLessThan1200 ? "50px" : "100%",
    width: isScreenLessThan1200 ? "50px" : "100%",
    display: "flex", // Display as flex
    flexDirection: "column", // Stack items vertically
    alignItems: isScreenLessThan1200 ? "center" : "stretch", // Center items if small screen, otherwise stretch
    justifyContent: isScreenLessThan1200 ? "center" : "stretch", // Center items if small screen, otherwise stretch
    borderRadius: "10px",
    overflow: "hidden",
    gap: "2%",
    background: "rgba( 237, 249, 255, 0.35 )",
    // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    // backdropFilter: "blur( 25px )",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
    position: isScreenLessThan1200 ? "fixed" : "relative",
    top: isScreenLessThan750 ? "" : isScreenLessThan1200 ? "20px" : "",
  };

  const dispatch = useDispatch();

  return (

    <div style={sidenavContainerStyle}>
      {/* Conditionally render the burgerMenuContainer */}
      {isScreenLessThan1200 && (
        <div style={{ display: "flex", height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
          <BurgerMenu />
        </div>
      )}
      {!isScreenLessThan1200 && (
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiListItemButton: {
                  defaultProps: {
                    disableTouchRipple: true,
                  },
                },
              },
              palette: {
                mode: "dark",
                primary: { main: "rgb(102, 157, 246)" },
                background: { paper: "rgba(237, 249, 255, 0.35)" }, // Updated background color
              },
            })}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
            >
              {/* Updated styles */}
              <FireNav component="nav" disablePadding>
                <Link onClick={() => dispatch({ type: 'NAVIGATE' })} to="/dashboard" style={{ textDecoration: "none" }}>
                  <ListItemButton style={{ height: "65px" }}>
                    <img
                      src={smallLogo}
                      alt="Small Logo"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </ListItemButton>
                </Link>
                <Divider
                  sx={{
                    backgroundColor: "rgb(102, 157, 246)",
                    marginBottom: "20px",
                  }}
                />

                <Link to="/dashboard" style={{ textDecoration: "none" }} >
                  <ListItem component="div" disablePadding>
                    <AnimatedStyle>
                      <ListItemButton
                        sx={{
                          height: 56,
                          "&:hover": {
                            backgroundColor: "white",
                            "& .MuiListItemText-primary": {
                              fontWeight: 600,
                              color: "#ec610b",
                            }
                          }
                        }}>
                        <ListItemIcon>
                          <DashboardOutlinedIcon style={{ color: "#ec610b" }} />
                        </ListItemIcon>

                        <ListItemText
                          primary="Dashboard"
                          primaryTypographyProps={{
                            color: "black",
                            fontWeight: "medium",
                            variant: "body2",
                          }}
                        />
                      </ListItemButton>
                    </AnimatedStyle>
                  </ListItem>
                </Link>

                <Link to="/users" style={{ textDecoration: "none" }}>
                  <ListItem component="div" disablePadding>
                    <AnimatedStyle>
                      <ListItemButton
                        sx={{
                          height: 56,
                          "&:hover": {
                            backgroundColor: "white",
                            "& .MuiListItemText-primary": {
                              fontWeight: 600,
                              color: "#5fb663",
                            }
                          }
                        }}>
                        <ListItemIcon>
                          <PersonOutlineOutlinedIcon style={{ color: "#5fb663" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="User"
                          primaryTypographyProps={{
                            color: "black",
                            fontWeight: "medium",
                            variant: "body2",
                          }}
                        />
                      </ListItemButton>
                    </AnimatedStyle>
                  </ListItem>
                </Link>

                {/* <Divider sx={{ backgroundColor: 'rgb(102, 157, 246)' }} /> */}
                <Link to="/projects" style={{ textDecoration: "none" }}>
                  <ListItem component="div" disablePadding>
                    <AnimatedStyle>
                      <ListItemButton
                        sx={{
                          height: 56,
                          "&:hover": {
                            backgroundColor: "white",
                            "& .MuiListItemText-primary": {
                              fontWeight: 600,
                              color: "#549ccf",
                            }
                          }
                        }}>
                        <ListItemIcon>
                          <AccountTreeOutlinedIcon style={{ color: "#549ccf" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Project"
                          primaryTypographyProps={{
                            color: "black",
                            fontWeight: "medium",
                            variant: "body2",
                          }}
                        />
                      </ListItemButton>
                    </AnimatedStyle>
                  </ListItem>
                </Link>
                {/* <Divider sx={{ backgroundColor: 'rgb(102, 157, 246)' }} /> */}
                <Link to="/roles" style={{ textDecoration: "none" }}>
                  <ListItem component="div" disablePadding>
                    <AnimatedStyle>
                      <ListItemButton
                        sx={{
                          height: 56,
                          "&:hover": {
                            backgroundColor: "white",
                            "& .MuiListItemText-primary": {
                              fontWeight: 600,
                              color: "#5900b3",
                            }
                          }
                        }}>
                        <ListItemIcon>
                          <PersonSearchOutlinedIcon style={{ color: "#5900b3" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Role"
                          primaryTypographyProps={{
                            color: "black",
                            fontWeight: "medium",
                            variant: "body2",
                          }}
                        />
                      </ListItemButton>
                    </AnimatedStyle>
                  </ListItem>
                </Link>
                {/* <Divider sx={{ backgroundColor: 'rgb(102, 157, 246)' }} /> */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // Stack the containers vertically
                  }}
                >

                  <Box
                    sx={{
                      bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                      pb: open ? 2 : 0,
                    }}
                  >
                    <ListItemButton
                      alignItems="flex-start"
                      onClick={() => {
                        setOpen(!open);
                        setActive(!active);
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 3,
                        pt: 2.5,
                        pb: 2.5, // Keep consistent padding for both active and inactive states

                        "&:hover": {
                          backgroundColor: "white",
                          "& .MuiListItemText-primary": {
                            fontWeight: 600,

                            WebkitAnimationName: "pulse",
                            animationName: "pulse",
                            WebkitAnimationDuration: "1s",
                            animationDuration: "1s",
                            WebkitAnimationFillMode: "both",
                            animationFillMode: "both",
                            "@-webkit-keyframes pulse": {
                              "0%": {
                                WebkitTransform: "scale3d(1, 1, 1)",
                                transform: "scale3d(1, 1, 1)",
                              },
                              "50%": {
                                WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
                                transform: "scale3d(1.05, 1.05, 1.05)",
                              },
                              "100%": {
                                WebkitTransform: "scale3d(1, 1, 1)",
                                transform: "scale3d(1, 1, 1)",
                              },
                            },
                            "@keyframes pulse": {
                              "0%": {
                                WebkitTransform: "scale3d(1, 1, 1)",
                                transform: "scale3d(1, 1, 1)",
                              },
                              "50%": {
                                WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
                                transform: "scale3d(1.05, 1.05, 1.05)",
                              },
                              "100%": {
                                WebkitTransform: "scale3d(1, 1, 1)",
                                transform: "scale3d(1, 1, 1)",
                              },
                            },
                          },
                        }
                      }}
                    >
                      <ListItemIcon style={{ margin: "0" }}>
                        <MoreHorizIcon style={{ color: "black" }} />
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          paddingLeft: "12px",
                        }}
                        primary="Others"
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight: "medium",
                          lineHeight: "20px",
                          mb: "2px",
                          color: "black",
                        }}
                      />
                      <KeyboardArrowDown
                        sx={{
                          mr: -1,
                          opacity: 1, // Make sure the arrow is initially visible
                          transform: open ? "rotate(-180deg)" : "rotate(0)",
                          transition: "0.2s",
                          color: "#595959", // Set the initial color to the desired color
                        }}
                      />
                    </ListItemButton>
                  </Box>

                  {open && (
                    <Box>
                      {othersDropDownData.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemButton
                            sx={{
                              py: 0,
                              minHeight: 32,
                              color: "rgba(255,255,255,.8)",
                              marginTop: "5px",
                              "&:hover": {
                                backgroundColor: "white",
                                "& .MuiListItemText-primary": {
                                  fontWeight: 900,
                                  color: "#595959",
                                },
                                WebkitAnimationName: "pulse",
                                animationName: "pulse",
                                WebkitAnimationDuration: "1s",
                                animationDuration: "1s",
                                WebkitAnimationFillMode: "both",
                                animationFillMode: "both",
                                "@-webkit-keyframes pulse": {
                                  "0%": {
                                    WebkitTransform: "scale3d(1, 1, 1)",
                                    transform: "scale3d(1, 1, 1)",
                                  },
                                  "50%": {
                                    WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
                                    transform: "scale3d(1.05, 1.05, 1.05)",
                                  },
                                  "100%": {
                                    WebkitTransform: "scale3d(1, 1, 1)",
                                    transform: "scale3d(1, 1, 1)",
                                  },
                                },
                                "@keyframes pulse": {
                                  "0%": {
                                    WebkitTransform: "scale3d(1, 1, 1)",
                                    transform: "scale3d(1, 1, 1)",
                                  },
                                  "50%": {
                                    WebkitTransform: "scale3d(1.05, 1.05, 1.05)",
                                    transform: "scale3d(1.05, 1.05, 1.05)",
                                  },
                                  "100%": {
                                    WebkitTransform: "scale3d(1, 1, 1)",
                                    transform: "scale3d(1, 1, 1)",
                                  },
                                },
                              },
                            }}
                          >
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: "medium",
                                color: "primary",
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      ))}
                    </Box>
                  )}
                </Box>
              </FireNav>
            </Paper>
          </ThemeProvider>
        </div>
      )
      }
      <Routes>
        <Route path="/DevelopmentPhase" element={<DevelopmentPhase />} />
        <Route path="/projectStatus" element={<ProjectStatus />} />
        <Route path="/employeestatus" element={<EmployeeStatus />} />
        <Route path="/employeeposition" element={<EmployeePosition />} />
        <Route path="/businessunit" element={<BusinessUnits />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/technology" element={<Technologies />} />
        <Route path="/devType" element={<DevelopmentTypeHandler />} />
        <Route path="/client" element={<ClientHandler />} />

      </Routes>
    </div >


  );
}