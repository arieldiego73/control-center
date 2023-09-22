import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { KeyboardArrowDown } from '@mui/icons-material';
import { ListItemButton, Divider, ListItem, ListItemIcon, ListItemText, Box, List, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import smallLogo from "../../Assets/small logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from 'react';
import BurgerMenuStyle from "./BurgerMenuStyle.module.css";

// for dropdown in others 
const othersDropDownData = [
    { label: "Development Phase", path: "/DevelopmentPhase" },
    { label: "Project Status", path: "/projectStatus" },
    { label: "Employee Status", path: "/employeestatus" },
    { label: "Employee Position", path: "/employeeposition" },
    { label: " Business Units", path: "/businessunit" },
    { label: "Departments", path: "/department" },
    { label: "Technologies", path: "/technology" },
    { label: "Development Type", path: "/devType" },
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


export default function MenuPopupState() {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);


    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)} style={{ height: "100%", width: "100%" }}>
                        &#9776;
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <FireNav component="nav" disablePadding>
                            <Link to="/dashboard" style={{ textDecoration: "none" }}>
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

                            <Link to="/dashboard" style={{ textDecoration: "none" }}>
                                <ListItem component="div" disablePadding>
                                    <ListItemButton
                                        sx={{
                                            height: 56,
                                            "&:hover": {
                                                backgroundColor: "white",
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: 900,
                                                    color: "#ec610b",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "#ec610b",
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <DashboardIcon style={{ color: "#ec610b" }} />
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
                                </ListItem>
                            </Link>

                            <Link to="/user" style={{ textDecoration: "none" }}>
                                <ListItem component="div" disablePadding>
                                    <ListItemButton
                                        sx={{
                                            height: 56,
                                            "&:hover": {
                                                backgroundColor: "white",
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: 900,
                                                    color: "#5fb663",
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <PersonIcon style={{ color: "#5fb663" }} />
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
                                </ListItem>
                            </Link>
                            {/* <Divider sx={{ backgroundColor: 'rgb(102, 157, 246)' }} /> */}
                            <Link to="/project" style={{ textDecoration: "none" }}>
                                <ListItem component="div" disablePadding>
                                    <ListItemButton
                                        sx={{
                                            height: 56,
                                            "&:hover": {
                                                backgroundColor: "white",
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: 900,
                                                    color: "#549ccf",
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AccountTreeIcon style={{ color: "#549ccf" }} />
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
                                </ListItem>
                            </Link>
                            {/* <Divider sx={{ backgroundColor: 'rgb(102, 157, 246)' }} /> */}
                            <Link to="/role" style={{ textDecoration: "none" }}>
                                <ListItem component="div" disablePadding>
                                    <ListItemButton
                                        sx={{
                                            height: 56,
                                            "&:hover": {
                                                backgroundColor: "white",
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: 900,
                                                    color: "#5900b3",
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <PersonSearchIcon style={{ color: "#5900b3" }} />
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
                                                "& svg": {
                                                    color: "#595959",
                                                },
                                                backgroundColor: active
                                                    ? "rgba(71, 98, 130, 0.2)"
                                                    : "white",
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: active ? "bold" : "bold",
                                                    color: "#595959",
                                                    border: "0 solid transparent",
                                                },
                                            },
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
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}