
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TopNav from '../topnav/Topnav';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: 'Transparent',
    transition: 'background-color 0.3s ease',
    padding: '20%',
    '&:hover': {
      backgroundColor: '#2466A2',
      padding: '20%',
      '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '50px',
      },
    },
  },
  boldText: {
    fontWeight: 'normal',
    '&:hover': {
        fontWeight: 'bold'
      },
  },
  dashboard: {
    '&:hover': {
        '& .iconButton': {
            backgroundColor: '#2466A2',
            padding: '20%',
            '& .MuiSvgIcon-root': {
              color: 'white',
              fontSize: '50px',
            },
        },
        '& .boldText': {
            fontWeight: 'bold'
          }, 
    },
    
   
  },
}));

export const Sidenav = () => {
  const classes = useStyles();
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);

  const handleIconHover = (index: React.SetStateAction<number>) => {
    setHoveredIndex(index);
  };

  return (
    <div>
      <TopNav />
      <div style={{ backgroundColor: 'transparent', width: '90px', height: '100%' }}>
        <div>
          <div className={classes.dashboard} style={{ paddingTop: '80%', flexDirection: 'column', display: 'flex' }}>
            <IconButton
              className={classes.iconButton}
              onMouseEnter={() => handleIconHover(0)}
              onMouseLeave={() => handleIconHover(-1)}
            >
              <DashboardIcon style={{ fontSize: '45px' }} />
            </IconButton>
            <div style={{ paddingLeft: '10%' }}>
              <text
                className={classes.boldText}
                style={{ color: '#2466A2' }}
              >
                Dashboard
              </text>
            </div>
          </div>

          <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
            <IconButton
              className={classes.iconButton}
              onMouseEnter={() => handleIconHover(0)}
              onMouseLeave={() => handleIconHover(-1)}
            >
              <PersonOutlineIcon style={{ fontSize: '45px' }} />
            </IconButton>
            <div style={{ paddingLeft: '31%' }}>
              <text
                className={classes.boldText}
                style={{ color: '#2466A2' }}
              >
                User
              </text>
            </div>
          </div>

          <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
            <IconButton
              className={classes.iconButton}
              onMouseEnter={() => handleIconHover(0)}
              onMouseLeave={() => handleIconHover(-1)}
            >
              <AccountTreeOutlinedIcon style={{ fontSize: '45px' }} />
            </IconButton>
            <div style={{ paddingLeft: '20%' }}>
              <text
                className={classes.boldText}
                style={{ color: '#2466A2' }}
              >
                Project
              </text>
            </div>
          </div>

          <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
            <IconButton
              className={classes.iconButton}
              onMouseEnter={() => handleIconHover(0)}
              onMouseLeave={() => handleIconHover(-1)}
            >
              <PersonSearchOutlinedIcon style={{ fontSize: '45px' }} />
            </IconButton>
            <div style={{ paddingLeft: '30%' }}>
              <text
                className={classes.boldText}
                style={{ color: '#2466A2' }}
              >
                Role
              </text>
            </div>
          </div>

          <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
            <IconButton
              className={classes.iconButton}
              onMouseEnter={() => handleIconHover(0)}
              onMouseLeave={() => handleIconHover(-1)}
            >
              <MoreHorizIcon style={{ fontSize: '45px' }} />
            </IconButton>
            <div style={{ paddingLeft: '28%' }}>
              <text
                className={classes.boldText}
                style={{ color: '#2466A2' }}
              >
                Other
              </text>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

