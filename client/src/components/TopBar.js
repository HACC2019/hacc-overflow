import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
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
    display: 'none',
    [theme.breakpoints.up('sm')]:{
      display: 'block',
    }
  },
  grow: {
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
    backgroundColor: '#3B4985'
  },
}));

export default function TopBar() {
  const classes = useStyles();

  return(
    <div>
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography  variant={"h6"} color="inherit">
            HAWAIIAN ELECTRIC
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
      </div>
  );
}
