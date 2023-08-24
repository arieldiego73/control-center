import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link href={item.href} color="inherit">
              {item.label}
            </Link>
          ) : (
            <Typography color="textPrimary">
              {item.label}
            </Typography>
          )}
        </span>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
