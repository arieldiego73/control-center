import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TopNav from '../topnav/Topnav';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SidenavStyle from './Sidenav.module.css'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	iconButton: {
		backgroundColor: 'transparent',
		transition: 'background-color 0.3s ease',
		padding: '10%',
		borderRadius: '50%', // Add border radius here
		'&:hover': {
			backgroundColor: '#2466A2',
			'& svg': {
				color: 'white',
				fontSize: '0.5vw',
			},
			'& ~ div': {
				'& span': {
					fontWeight: 'bold',
					color: '#2466A2',
				},
			},
		},
	},
	boldText: {
		fontWeight: 'normal',
	},
}));

export const Sidenav = () => {
	const classes = useStyles();

	return (
		<div>
			<TopNav />
			<div className={SidenavStyle.sideNavContainer}>
		
				<div className={SidenavStyle.buttonContainer}>
					<Link to="/dashboard" className={classes.iconButton}>
						<IconButton>
						<DashboardIcon style={{ height: '1.25vw', width: '1.25vw' }} />
						</IconButton>
					</Link>
					<div className={SidenavStyle.buttonText}>
						<span className={`${classes.boldText} boldText`}>Dashboard</span>
					</div>
				</div>
				<div className={SidenavStyle.buttonContainer}>
					<Link to="/user" className={classes.iconButton}>
						<IconButton>
						<PersonOutlineIcon style={{ height: '1.25vw', width: '1.25vw' }} />
						</IconButton>
					</Link>
					<div className={SidenavStyle.buttonText}>
						<span className={`${classes.boldText} boldText`}>User</span>
					</div>
				</div>
				<div className={SidenavStyle.buttonContainer}>
					<Link to="/project" className={classes.iconButton}>
						<IconButton>
						<AccountTreeOutlinedIcon style={{ height: '1.25vw', width: '1.25vw' }} />
						</IconButton>
					</Link>
					<div className={SidenavStyle.buttonText}>
						<span className={`${classes.boldText} boldText`}>Project</span>
					</div>
				</div>
				<div className={SidenavStyle.buttonContainer}>
					<Link to="/role" className={classes.iconButton}>
						<IconButton>
						<PersonSearchOutlinedIcon style={{ height: '1.25vw', width: '1.25vw' }} />
						</IconButton>
					</Link>
					<div className={SidenavStyle.buttonText}>
						<span className={`${classes.boldText} boldText`}>Role</span>
					</div>
				</div>
				<div className={SidenavStyle.buttonContainer}>
					<Link to="/dashboard" className={classes.iconButton}>
						<IconButton>
						<MoreHorizIcon style={{ height: '1.25vw', width: '1.25vw' }} />
						</IconButton>
					</Link>
					<div className={SidenavStyle.buttonText}>
						<span className={`${classes.boldText} boldText`}>Others</span>
					</div>
				</div>

			

				
				

				
			</div>


		</div>
		
	);
};

