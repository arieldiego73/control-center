import { IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import SideNavStyle from "./SideNavStyle.module.css"

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function SideNav() {


    return (
        <div className={SideNavStyle.sidenavContainer}>
            <div className={SideNavStyle.logoContainer}>

            </div>
            <div className={SideNavStyle.linksContainer}>
                <div className={SideNavStyle.link}>
                    <Link to="/dashboard" className={SideNavStyle.linkItem} >
                        <div className={SideNavStyle.linkIcon}>
                            <IconButton sx={{padding:0}}>
                                <DashboardIcon />
                            </IconButton>
                        </div>
                        <div className={SideNavStyle.linkText}>
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </div>
                <div className={SideNavStyle.link}>
                    <Link to="/dashboard" className={SideNavStyle.linkItem} >
                        <div className={SideNavStyle.linkIcon}>
                            <IconButton sx={{padding:0}}>
                                <PersonOutlineIcon />
                            </IconButton>
                        </div>
                        <div className={SideNavStyle.linkText}>
                            <span>Users</span>
                        </div>
                    </Link>
                </div>
                <div className={SideNavStyle.link}>
                    <Link to="/dashboard" className={SideNavStyle.linkItem} >
                        <div className={SideNavStyle.linkIcon}>
                            <IconButton sx={{padding:0}}>
                                <AccountTreeOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className={SideNavStyle.linkText}>
                            <span>Projects</span>
                        </div>
                    </Link>
                </div>
                <div className={SideNavStyle.link}>
                    <Link to="/dashboard" className={SideNavStyle.linkItem} >
                        <div className={SideNavStyle.linkIcon}>
                            <IconButton sx={{padding:0}}>
                                <PersonSearchOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className={SideNavStyle.linkText}>
                            <span>Roles</span>
                        </div>
                    </Link>
                </div>
                <div className={SideNavStyle.link}>
                    <Link to="/dashboard" className={SideNavStyle.linkItem} >
                        <div className={SideNavStyle.linkIcon}>
                            <IconButton sx={{padding:0}}>
                                <MoreHorizIcon />
                            </IconButton>
                        </div>
                        <div className={SideNavStyle.linkText}>
                            <span>Others</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

