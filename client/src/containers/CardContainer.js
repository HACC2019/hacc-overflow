import React, {useState} from 'react';
import Cards from '../components/Cards';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { getPreciseDistance } from 'geolib';
//import Container from '@material-ui/core/Container';

export default function SimpleContainer(props){
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
      <React.Fragment>
      <CssBaseline />
      {/* <Container maxWidth="lg"> */}
      <Grid container direction="column" juhstify="center" alignItems="center" >
        <Typography component="div" style={{
          backgroundColor: '#cfe8fc',
          height: '100vh'
        }} >
          <span>List of stations by distance(May either move to app bar, or remove appbar).
          Will add visibility filter to only show available</span><br/>
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
                  distance={(getPreciseDistance(props.userLocation, i.location, 1) * 0.00062137).toFixed(2)}
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
