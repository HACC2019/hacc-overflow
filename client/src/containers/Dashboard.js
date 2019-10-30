import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContainer from './CardContainer';
import TopBar from '../components/TopBar';

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
                {/* MAP */}
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
          </Container>
          </Typography>
        </main>
      </div>
  );
}