import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import logo512 from '../components/logo512.png';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


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
  title: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
    width: 20,
    height: 20,
  },
  appBar: {
    zIndex: theme.zIndex,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  },

}));

export default function TopBar() {
  const classes = useStyles();

  return(
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard Mockup(normal user)
          </Typography>
          <IconButton color="inherit">
            <Avatar alt="hacc Logo" src={logo512} className={classes.avatar} />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
}