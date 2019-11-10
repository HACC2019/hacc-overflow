import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EvStationIcon from '@material-ui/icons/EvStation';
import Grid from '@material-ui/core/Grid';
import { propTypes } from 'react-map-gl-geocoder';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title:{
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
      //Consider a CardAction button here to link to google map navigation
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
                <EvStationIcon  />
            </Grid >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {props.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    # of EV charge stations
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {props.address}
                  </Typography>
                </Grid >
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    <a href={'https://www.google.com/maps/search/?api=1&query=' + props.address}>open navigation to google maps</a>
                  </Typography>
                </Grid >
              </Grid >
              <Grid item>
                <Typography variant="subtitle1">
                  {props.distance}
                </Typography >
              </Grid >
            </Grid >
          </Grid >
        </CardContent>
      </Card>
  );
}