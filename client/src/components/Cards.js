import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import EvStationIcon from '@material-ui/icons/EvStation';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from "@material-ui/core/ButtonBase";
import googleMapsLogo from './gmaps.png';


const useStyles = makeStyles({
  card: {
    minWidth: 100,
    maxWidth: 350,
  },
  cardButton: {
    display: "block",
    textAlign: "initial",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title:{
    fontSize: 14,
  },
  button: {
    fontSize: 10,
    marginLeft: 45,
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  let stationNum = 1;
  return (
      //Consider a CardAction button here to link to google map navigation
      <Card className={classes.card}>
        <ButtonBase className={classes.cardButton} >
          <CardContent>

            <Grid container spacing={2}>
              <Grid item>
                   <EvStationIcon  style={props.stationColor}/>
              </Grid >

              <Grid item xs={12} sm container direction="row" fixed>
                <Grid item xs container direction="column" spacing={0}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {props.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    # of EV charge stations: {stationNum}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                     {props.address}
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
        </ButtonBase>
        <CardActions>
          <Grid item>
            <Button
                variant="outlined"
                color="primary"
                href={'https://www.google.com/maps/search/?api=1&query=' + props.address}
                className={classes.button}
                size="small"
            >
              Open in Google Maps
            </Button>
          </Grid>
        </CardActions>
      </Card>
  );
}