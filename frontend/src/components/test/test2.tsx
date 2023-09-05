/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import test2Style from './test2.module.css'
import { Link } from 'react-router-dom'; 
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function test2() {
  return (
    <div role="presentation" onClick={handleClick}>
    <Breadcrumbs maxItems={2} aria-label="breadcrumb">
      <Link to="/User" className={`${test2Style['custom-link']}`} style={{ color: 'inherit' }}>
        Home
      </Link>
      <Link to="/User" className={`${test2Style['custom-link']}`} style={{ color: 'inherit' }}>
        Home
      </Link>
      <Link to="/User" className={`${test2Style['custom-link']}`} style={{ color: 'inherit' }}>
        Home
      </Link>
      {/* Other breadcrumb links */}
    </Breadcrumbs>
  </div>
  );
}