import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CardContainer from './CardContainer';
import logo192 from '../components/logo192.png';
import MapComponent from '../components/MapComponent.js';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
      ...theme.mixins.toolbar,
  },
    appBar: {
  zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
},
appBarShift: {
  marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
},
menuButton: {
  marginRight: 36,
},
menuButtonHidden: {
  display: 'none',
},
title: {
  flexGrow: 1,
},
drawerPaper: {
  position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
},
drawerPaperClose: {
  overflowX: 'hidden',
      transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
    width: theme.spacing(9),
  },
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
avatar: {
  margin: 10,
  width: 20,
  height: 20,
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
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Use your location'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{ <AddLocationIcon /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Search by location'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{ <LocationSearchingIcon /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
  );

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Dashboard Mockup(normal user)
              </Typography>
            <IconButton color="inherit">
              <Avatar alt="hacc Logo" src={logo192} className={classes.avatar} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {drawer}


        </Drawer>
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