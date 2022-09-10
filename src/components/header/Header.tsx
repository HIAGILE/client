import React  from 'react';
import { Box, Grid, AppBar } from '@mui/material';
import Logo from './Logo';
import Navigation from './Navigation';

function Header() {

  return(
    <Box sx={{ flexGrow: 1}}>
      <AppBar>
        <Grid container>
          <Grid item xs={2}/>
          <Grid item xs={8}>
            <Logo/>
          </Grid>
          <Grid item xs={2}>
            <Navigation/>
          </Grid>
        </Grid>
      </AppBar>
    </Box>

  );
}

export default Header;