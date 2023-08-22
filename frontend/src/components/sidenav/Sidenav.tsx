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
    padding: '10%',
    '&:hover': {
      backgroundColor: '#2466A2',
      '& svg': {
        color: 'white',
        fontSize: '50px',
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
            <div className={Style.iconContainer}>
                <IconButton className={classes.iconButton}>
                <DashboardIcon style={{ height: '1.25vw' , width: '1.25vw', padding: '0.5vw'}} />
              </IconButton>
            </div>
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
        <div className={Style.iconContainer}>
            <IconButton className={classes.iconButton}>
              <PersonOutlineIcon style={{ height: '1.25vw' , width: '1.25vw', padding: '0.5vw'}} />
            </IconButton>
        </div>
            <div className={Style.buttonText}>
              <span className={`${classes.boldText} boldText`}>
                User
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'transparent', width: '100%', marginLeft: '1%' }}>
        <div>
        <div className={Style.buttonContainer}>
        <div className={Style.iconContainer}>
            <IconButton className={classes.iconButton}>
              <AccountTreeOutlinedIcon style={{ height: '1.25vw' , width: '1.25vw', padding: '0.5vw'}} />
            </IconButton>
        </div>
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
        <div className={Style.iconContainer}>
            <IconButton className={classes.iconButton}>
              <PersonSearchOutlinedIcon style={{ height: '1.25vw' , width: '1.25vw', padding: '0.5vw'}} />
            </IconButton>
        </div>
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
        <div className={Style.iconContainer}>
            <IconButton className={classes.iconButton}>
              <MoreHorizIcon style={{ height: '1.25vw' , width: '1.25vw', padding: '0.5vw'}} />
            </IconButton>
        </div>
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





// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import TopNav from '../topnav/Topnav';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
// import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// const useStyles = makeStyles((theme) => ({
//   iconButton: {
//     backgroundColor: 'Transparent',
//     transition: 'background-color 0.3s ease',
//     padding: '20%',
//     '&:hover': {
//       backgroundColor: '#2466A2',
//       padding: '20%',
//       '& .MuiSvgIcon-root': {
//         color: 'white',
//         fontSize: '50px',
//       },
//     },
//   },
//   boldText: {
//     fontWeight: 'normal',
//     '&:hover': {
//         fontWeight: 'bold'
//       },
//   },
//   dashboard: {
//     '&:hover': {
//         '& .iconButton': {
//             backgroundColor: '#2466A2',
//             padding: '20%',
//             '& .MuiSvgIcon-root': {
//               color: 'white',
//               fontSize: '50px',
//             },
//         },
//         '& .boldText': {
//             fontWeight: 'bold'
//           }, 
//     },
    
   
//   },
// }));

// export const Sidenav = () => {
//   const classes = useStyles();
//   const [hoveredIndex, setHoveredIndex] = React.useState(-1);

//   const handleIconHover = (index: React.SetStateAction<number>) => {
//     setHoveredIndex(index);
//   };

//   return (
//     <div>
//       <TopNav />
  
//       <div style={{ backgroundColor: 'transparent', width: '90px', height: '845px' }}>
//         <div>
          
//           <div style={{ paddingTop: '80%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton
//               className={classes.iconButton}
//               onMouseEnter={() => handleIconHover(0)}
//               onMouseLeave={() => handleIconHover(-1)}
//             >
//               <DashboardIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '10%' }}>
//               <text
//                 className={classes.boldText}
//                 style={{ color: '#2466A2' }}
//               >
//                 Dashboard
//               </text>
//             </div>
//           </div>

//           <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>

//             <IconButton
//               className={classes.iconButton}
//               onMouseEnter={() => handleIconHover(0)}
//               onMouseLeave={() => handleIconHover(-1)}
//             >
//               <PersonOutlineIcon style={{ fontSize: '45px' }} />
//             </IconButton>
            
//             <div style={{ paddingLeft: '31%' }}>
//               <text
//                 className={classes.boldText}
//                 style={{ color: '#2466A2' }}
//               >
//                 User
//               </text>
//             </div>
//           </div>

//           <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton
//               className={classes.iconButton}
//               onMouseEnter={() => handleIconHover(0)}
//               onMouseLeave={() => handleIconHover(-1)}
//             >
//               <AccountTreeOutlinedIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '20%' }}>
//               <text
//                 className={classes.boldText}
//                 style={{ color: '#2466A2' }}
//               >
//                 Project
//               </text>
//             </div>
//           </div>

//           <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton
//               className={classes.iconButton}
//               onMouseEnter={() => handleIconHover(0)}
//               onMouseLeave={() => handleIconHover(-1)}
//             >
//               <PersonSearchOutlinedIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '30%' }}>
//               <text
//                 className={classes.boldText}
//                 style={{ color: '#2466A2' }}
//               >
//                 Role
//               </text>
//             </div>
//           </div>

//           <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton
//               className={classes.iconButton}
//               onMouseEnter={() => handleIconHover(0)}
//               onMouseLeave={() => handleIconHover(-1)}
//             >
//               <MoreHorizIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '28%' }}>
//               <text
//                 className={classes.boldText}
//                 style={{ color: '#2466A2' }}
//               >
//                 Other
//               </text>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };



// const useStyles = makeStyles((theme) => ({
//   iconButton: {
//     backgroundColor: 'transparent',
//     transition: 'background-color 0.3s ease',
//     padding: '20%',
//   },
//   boldText: {
//     fontWeight: 'normal',
//   },
//   dashboard: {
//     '&:hover': {
//       '& $iconButton': {
//         backgroundColor: '#2466A2',
//         padding: '20%',
//         '& svg': {
//           color: 'white',
//           fontSize: '50px',
//         },
//       },
//       '& $boldText': {
//         fontWeight: 'bold',
//       },
//     },
//   },
// }));

// export const Sidenav = () => {
//   const classes = useStyles();

//   return (
//     <div>
//       <TopNav />

//       {/* DASHBOARD */}
//       <div style={{ backgroundColor: 'yellow', width: '90px', marginBottom: '10%' }}>
//         <div className={classes.dashboard}>
//           <div style={{ marginTop: '40%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton className={`${classes.iconButton} ${classes.dashboard}`} >
//               <DashboardIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '10%' }}>
//               <span className={`${classes.boldText} ${classes.dashboard}`} style={{ color: '#2466A2' }}>
//                 Dashboard
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{ backgroundColor: 'red', width: '90px', height: '100%', marginBottom: '10%' }}>
//         <div className={classes.dashboard}>
//           <div style={{ paddingTop: '20%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton className={`${classes.iconButton} ${classes.dashboard}`} >
//               <DashboardIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '10%' }}>
//               <span className={`${classes.boldText} ${classes.dashboard}`} style={{ color: '#2466A2' }}>
//                 Dashboarddddd
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>





//     </div>
//   );
// };


//NOTHING IS HAPPENING IN THE TEXT BUT GOOD IN IN THE ICON
// const useStyles = makeStyles((theme) => ({
//   iconButton: {
//     backgroundColor: 'transparent',
//     transition: 'background-color 0.3s ease',
//     padding: '20%',
//     '&:hover': {
//       backgroundColor: '#2466A2',
//       padding: '20%',
//       '& svg': {
//         color: 'white',
//         fontSize: '50px',
//       },
//       '& $boldText': {
//         fontWeight: 'bold',
//         color: 'red',
//       },
//     },
//   },
//   boldText: {
//     fontWeight: 'normal',
//   },
// }));

// export const Sidenav = () => {
//   const classes = useStyles();

//   return (
//     <div>
//       {/* Your TopNav component here */}
  
//       <div style={{ backgroundColor: 'transparent', width: '90px', height: '845px' }}>
//         <div>
//           <div style={{ paddingTop: '80%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton className={classes.iconButton}>
//               <DashboardIcon style={{ fontSize: '45px' }} />
//             </IconButton>
//             <div style={{ paddingLeft: '10%' }}>
//               <span className={classes.boldText} style={{ color: '#2466A2' }}>
//                 Dashboard
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// const useStyles = makeStyles((theme) => ({
//   iconButton: {
//     backgroundColor: 'transparent',
//     transition: 'background-color 0.3s ease',
//     padding: '20%',
//     '&:hover': {
//       backgroundColor: '#2466A2',
//       padding: '20%',
//       '& svg': {
//         color: 'white',
//         fontSize: '50px',
//       },
//       '& $boldText': {
//         fontWeight: 'bold',
//       },
//     },
//   },
//   boldText: {
//     fontWeight: 'normal',
//     transition: 'font-weight 0.3s ease',
//   },
// }));

// export const Sidenav = () => {
//   const classes = useStyles();

//   return (
//     <div>
//       {/* Your TopNav component here */}
  
//       <div style={{ backgroundColor: 'transparent', width: '90px', height: '845px' }}>
//         <div>
//           <div style={{ paddingTop: '80%', flexDirection: 'column', display: 'flex' }}>
//             <IconButton className={classes.iconButton}>
//               <DashboardIcon style={{ fontSize: '45px' }} />
//               <span className={classes.boldText} style={{ color: '#2466A2' }}>
//                 Dashboard
//               </span>
//             </IconButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

