import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SidenavStyle from "./Sidenav.module.css";
import classes from "./YourStyles.module.css";
import { makeStyles } from "@material-ui/core/styles";
import TopNav from "../topnav/Topnav";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import Menu, { menuClasses } from "@mui/joy/Menu";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Apps from "@mui/icons-material/Apps";
import Settings from "@mui/icons-material/Settings";
import Person from "@mui/icons-material/Person";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  menu: React.ReactElement;
  open: boolean;
  onOpen: (
    event?:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  onLeaveMenu: (callback: () => boolean) => void;
  label: string;
}

const modifiers = [
  {
    name: "offset",
    options: {
      offset: ({ placement }: any) => {
        if (placement.includes("end")) {
          return [8, 20];
        }
        return [-8, 20];
      },
    },
  },
];

function NavMenuButton({
  children,
  menu,
  open,
  onOpen,
  onLeaveMenu,
  label,
  ...props
}: Omit<MenuButtonProps, "color">) {
  const isOnButton = React.useRef(false);
  const internalOpen = React.useRef(open);

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    internalOpen.current = open;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      onOpen(event);
    }
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={(_, isOpen) => {
        if (isOpen) {
          onOpen?.();
        }
      }}
    >
      <MenuButton
        {...props}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
        onMouseDown={() => {
          internalOpen.current = open;
        }}
        onClick={() => {
          if (!internalOpen.current) {
            onOpen();
          }
        }}
        onMouseEnter={() => {
          onOpen();
          isOnButton.current = true;
        }}
        onMouseLeave={() => {
          isOnButton.current = false;
        }}
        onKeyDown={handleButtonKeyDown}
        sx={{
          bgcolor: open ? "neutral.plainHoverBg" : undefined,
          "&:focus-visible": {
            bgcolor: "neutral.plainHoverBg",
          },
        }}
      >
        {children}
      </MenuButton>
      {React.cloneElement(menu, {
        onMouseLeave: () => {
          onLeaveMenu(() => isOnButton.current);
        },
        modifiers,
        slotProps: {
          listbox: {
            id: `nav-example-menu-${label}`,
            "aria-label": label,
          },
        },
        placement: "right-start",
        sx: {
          width: 288,
          [`& .${menuClasses.listbox}`]: {
            "--List-padding": "var(--ListDivider-gap)",
          },
        },
      })}
    </Dropdown>
  );
}

const useStyles = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: "transparent",
    transition: "background-color 0.3s ease",
    padding: "10%",
    borderRadius: "50%", // Add border radius here
    "&:hover": {
      backgroundColor: "#2466A2",
      "& svg": {
        color: "white",
        fontSize: "0.5vw",
      },
      "& ~ div": {
        "& span": {
          fontWeight: "bold",
          color: "#2466A2",
        },
      },
    },
  },
  boldText: {
    fontWeight: "normal",
  },
}));

export const Sidenav = () => {
  const classes = useStyles();
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
  const itemProps = {
    onClick: () => setMenuIndex(null),
  };
  const createHandleLeaveMenu =
    (index: number) => (getIsOnButton: () => boolean) => {
      setTimeout(() => {
        const isOnButton = getIsOnButton();
        if (!isOnButton) {
          setMenuIndex((latestIndex: null | number) => {
            if (index === latestIndex) {
              return null;
            }
            return latestIndex;
          });
        }
      }, 200);
    };

  return (
    <div>
      <TopNav />
      <div className={SidenavStyle.sideNavContainer}>

        <div className={SidenavStyle.buttonContainer}>
          <Link to="/dashboard" className={classes.iconButton}>
            <IconButton>
              <DashboardIcon style={{ height: "1.25vw", width: "1.25vw" }} />
            </IconButton>
          </Link>
          <div className={SidenavStyle.buttonText}>
            <span className={`${classes.boldText} boldText`}>Dashboard</span>
          </div>
        </div>

        <div className={SidenavStyle.buttonContainer}>
          <Link to="/user" className={classes.iconButton}>
            <IconButton>
              <PersonOutlineIcon
                style={{ height: "1.25vw", width: "1.25vw" }}
              />
            </IconButton>
          </Link>
          <div className={SidenavStyle.buttonText}>
            <span className={`${classes.boldText} boldText`}>User</span>
          </div>
        </div>
        
        <div className={SidenavStyle.buttonContainer}>
          <Link to="/project" className={classes.iconButton}>
            <IconButton>
              <AccountTreeOutlinedIcon
                style={{ height: "1.25vw", width: "1.25vw" }}
              />
            </IconButton>
          </Link>
          <div className={SidenavStyle.buttonText}>
            <span className={`${classes.boldText} boldText`}>Project</span>
          </div>
        </div>
        <div className={SidenavStyle.buttonContainer}>
          <Link to="/role" className={classes.iconButton}>
            <IconButton>
              <PersonSearchOutlinedIcon
                style={{ height: "1.25vw", width: "1.25vw" }}
              />
            </IconButton>
          </Link>
          <div className={SidenavStyle.buttonText}>
            <span className={`${classes.boldText} boldText`}>Role</span>
          </div>
        </div>
        <div className={SidenavStyle.buttonContainer}>
          <div className={classes.iconButton}>
            <NavMenuButton
              label="Settings"
              open={menuIndex === 1}
              onOpen={() => setMenuIndex(1)}
              onLeaveMenu={createHandleLeaveMenu(1)}
              menu={
                <Menu onClose={() => setMenuIndex(null)}>
                  <Link to="/DevelopmentPhase" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem {...itemProps}>Development Phase</MenuItem>
                    </Link>
                  <Link to="/projectStatus" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem {...itemProps}>Project Status</MenuItem>
                    </Link>
                  <Link to="/employeestatus" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem {...itemProps}>Employee Status</MenuItem>
                    </Link>
                  <Link to="/employeeposition" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem {...itemProps}>Employee Position</MenuItem>
                    </Link>
                  <Link to="/businessunit" style={{textDecoration:'none', color:'black'}}>
                            <MenuItem {...itemProps}>Business Unit</MenuItem>
                    </Link>
                  <Link to="/department" style={{textDecoration:'none', color:'black'}} >
                            <MenuItem {...itemProps}>Department</MenuItem>
                    </Link>
                  <Link to="/technology" style={{textDecoration:'none', color:'black'}} >
                          <MenuItem {...itemProps}>Technology</MenuItem>
                  </Link>
                </Menu>
              }
            >
            	<MoreHorizIcon style={{ height: "1.25vw", width: "1.25vw" }} />
            </NavMenuButton>
          </div>
          <div className={SidenavStyle.buttonText}>
            <span className={`${classes.boldText} boldText`}>Others</span>
          </div>
        </div>
      </div>
    </div>
  );
};
