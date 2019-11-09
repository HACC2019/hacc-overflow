import React from 'react';
import Cards from '../components/Cards';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import Container from '@material-ui/core/Container';

export default function SimpleContainer() {

  return (
      <React.Fragment>
      <CssBaseline />
      {/* <Container maxWidth="lg"> */}
      <Grid container direction="column" justify="center" alignItems="center" >
        <Typography component="div" style={{
          backgroundColor: '#cfe8fc',
          height: '100vh'
        }} >
          List of stations by distance(May either move to app bar, or remove appbar).
          Will add visibility filter to only show available
          <div>
            <Switch
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <span>Display Stations in Use?</span>
          </div>
          <div>
            {
              props.cardArr.map(i => (
                (state.checkedA === false && i.inUse) ? (<div></div>) : (
                <Cards 
                  name='Name' 
                  address={i.address} 
                  distance={(props.userLocation.latitude!=null)?((getPreciseDistance(props.userLocation, i.location, 1) * 0.00062137).toFixed(2)):'Distance not available'}
                  inUse={i.inUse}
                  url={'https://www.google.com/maps/search/?api=1&query=' + i.address}
                />
                )
              ))
            }
          </div>


        </Typography>
      </Grid>
    {/*</Container> */}
    </React.Fragment>
  );
}
SimpleContainer.defaultProps = {
  userLocation: {
    latitude: null,
    longitude: null,
},
};