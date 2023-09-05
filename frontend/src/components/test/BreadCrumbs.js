// BreadCrumbs.js
import React from 'react';
import { Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <MuiLink component={Link} to="/" color="inherit">
        Home
      </MuiLink>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <MuiLink component={Link} to={to} color="inherit" key={to}>
            {value}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
