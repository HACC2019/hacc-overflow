import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContainer from './CardContainer';
import logo512 from '../components/logo512.png';
import MapComponent from '../components/MapComponent.js';
import TopBar from '../components/TopBar';

const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

appBarSpacer: theme.mixins.toolbar,
    content: {
  flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
},
container: {
  paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
},
paper: {
  padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
},
fixedHeight: {
  height: 240,
},
}));

const hecoStationLocations = [
  {
      location: {latitude: 21.407750, longitude: -157.949610}, 
      address: '98-1268 Kaahumanu St Pearl City, HI 96782'
  }, 
  {
      location: {latitude: 21.318000, longitude: -157.869290},
      address: '801 Dillingham Building Honolulu, HI 96817'
  },
  {
      location: {latitude: 21.293830, longitude: -157.710410},
      address: '515 Pepeekeo St Honolulu, HI 96825'
  },
  {
      location: {latitude: 21.436700, longitude: -157.826360},
      address: '47-388 Hui Iwa Street Kaneohe, HI 96744'
  },
  {
      location: {latitude: 21.525810, longitude: -158.037780},
      address: '64-1550 Kamehameha Hwy Wahiawa, HI 96786'
  },
  {
      location: {latitude: 21.589030, longitude: -158.103660},
      address: '66-145 Kamehameha Highway Haleiwa, HI 96712'
  }
];

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography component="div" style={{ backgroundColor: '#ebf3fe', height: '100vh' }}>
          <Container maxWidth="lg" className={classes.container}>
          
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    Temporary placeholder for map component
                  </Paper>
                </Grid>
                {/* CardContainer*/}
                <Grid item xs={12} lg={9} >
                  <Paper className={fixedHeightPaper}>
                    <CardContainer />
                  </Paper>
                </Grid>
              </Grid>
              <div>
                <MapComponent markers={hecoStationLocations} userLocation={{latitude: 21.407750, longitude: -157.949610}}/>
              </div>
          </Container>
          </Typography>
        </main>
      </div>
  );
}