import * as React from 'react';
import { Sidenav } from '../sidenav/Sidenav';
import UserTable from './Usertable';

export default function Userpage (){
  return (
    <div >
      <Sidenav/>
      <div style={{position: 'absolute', marginBottom: '100z%'}}>
      <UserTable/>
      </div>
      
    </div>  
  );
};




