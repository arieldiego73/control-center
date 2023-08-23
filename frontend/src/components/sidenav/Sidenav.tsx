import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TopNav from '../topnav/Topnav';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Style from './Sidenav.module.css'

const useStyles = makeStyles((theme) => ({
	iconButton: {
		backgroundColor: 'transparent',
		transition: 'background-color 0.3s ease',
		padding: '20%',
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
		<body>
			<div>
				<TopNav />

				
				{/* DIV CONTAINER OF BUTTONS */}
				<div className={Style.sideNavContainer}>

					{/* BUTTONS */}
					<div>
						<div>
							<div className={Style.buttonContainer}>
								<IconButton className={classes.iconButton}>
									<DashboardIcon style={{ height: "1.25vw", width: "1.25vw",  }} />
								</IconButton>
								<div className={Style.buttonText}>
									<span className={`${classes.boldText} boldText`}>
										Dashboard
									</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div>
							<div className={Style.buttonContainer}>
								<IconButton className={classes.iconButton}>
									<PersonOutlineIcon style={{ height: "1.25vw", width: "1.25vw",  }} />
								</IconButton>
								<div className={Style.buttonText}>
									<span className={`${classes.boldText} boldText`}>
										User
									</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div>
							<div className={Style.buttonContainer}>
								<IconButton className={classes.iconButton}>
									<AccountTreeOutlinedIcon style={{ height: "1.25vw", width: "1.25vw",  }} />
								</IconButton>
								<div className={Style.buttonText}>
									<span className={`${classes.boldText} boldText`}>
										Project
									</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div>
							<div className={Style.buttonContainer}>
								<IconButton className={classes.iconButton}>
									<PersonSearchOutlinedIcon style={{ height: "1.25vw", width: "1.25vw",  }} />
								</IconButton>
								<div className={Style.buttonText}>
									<span className={`${classes.boldText} boldText`}>
										Role
									</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div>
							<div className={Style.buttonContainer}>
								<IconButton className={classes.iconButton}>
									<MoreHorizIcon style={{ height: "1.25vw", width: "1.25vw",  }} />
								</IconButton>
								<div className={Style.buttonText}>
									<span className={`${classes.boldText} boldText`}>
										Other
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</body>
	);
};

