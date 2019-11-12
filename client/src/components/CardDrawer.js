import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EvStationIcon from '@material-ui/icons/EvStation';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


const drawerWidth = "300";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

}));

function CardDrawer({setCardDrawer, cardDrawer, renderDrawerContent}) {
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setCardDrawer({...cardDrawer, open: true});
  };

  const handleDrawerClose = () => {
    setCardDrawer({...cardDrawer, isSingleView: false, open: false});
  };

  return (
      <div className={classes.root}>
        <CssBaseline />
        <Button
            variant="contained"
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, cardDrawer.open && classes.hide)}
            startIcon={<EvStationIcon />}
        >
          Stations details
        </Button>

        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={cardDrawer.open}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {renderDrawerContent()}
        </Drawer>
      </div>
  );
}

export default CardDrawer;
