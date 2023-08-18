import React from 'react';
import { Icon, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';

export default function UserTable() {
  return (
    <div style={{backgroundColor: 'white',width: '50%',height: '150px', borderRadius: '20px'}}>
      <div style={{flexDirection: 'row', display:'flex', paddingLeft: '2%', paddingTop: '2%', }}>
        <Icon component={AccountCircleOutlinedIcon} style={{ color: 'black', fontSize: 60, fontWeight: '50' }} />
        <text style={{ fontSize: 40, fontWeight: '100px', paddingTop: '1%'}}> User </text>
      </div>



      <div style={{ flexDirection: 'row', display: 'flex', paddingLeft: '57%'}}>
        <div style={{ flexDirection: 'row', display: 'flex', gap: '5px' }}>
        <TextField
          id="search1"
          label="Name"
          variant="outlined"
          style={{
            marginBottom: '10px',
            width: '150px', 
            height: '30px',
            backgroundColor: '#dce0e0',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          {/* <Button style={{ height: '139%', borderRadius: '20px' }} variant="contained" color="primary">Search</Button> */}
        </div>

        <div style={{ flexDirection: 'row', display: 'flex', gap: '5px', paddingLeft: '10px' }}>
          <TextField
            id="search2"
            label="Position"
            variant="outlined"
            // style={{
            //   marginBottom: '10px',
            //   width: '150px', 
            //   height: '30px',
            //   backgroundColor: '#dce0e0', 
            // }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button style={{ height: '139%', borderRadius: '20px'}} variant="contained" color="primary">Search</Button>
        </div>
      </div>
    </div>
  );
};
