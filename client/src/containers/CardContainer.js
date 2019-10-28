import React from 'react';
import Cards from '../components/Cards';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function SimpleContainer() {

  return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
          List of stations by distance(May either move to app bar, or remove appbar).
          Will add visibility filter to only show available
          <div>
            <Cards />
          </div>


        </Typography>
      </Container>
    </React.Fragment>
  );
}
