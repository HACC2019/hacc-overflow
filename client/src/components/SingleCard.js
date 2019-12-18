import React from 'react';
import {render} from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ChargingStation_ward from './chargingStation_ward.jpg';
import Box from '@material-ui/core/Box';
import EvStationIcon from '@material-ui/icons/EvStation';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 350,
    height: "100%",
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
    marginBottom: 20,
  },
  image: {
    padding: 10,
    width: 300,
    height: 228,
  },
  fonts: {
    fontWeight: "fontWeightBold",
  },
  button: {
    margin: 1,
  },
});

export default function SingleCard(props) {
  const classes = useStyles();
  const addrSample = "820 Ward Avenue, Honolulu, HI 96814";
  const stationName ="Times Square Shopping Center\n";
  var stationNum = 1;
  var availNum = 1;
    return (
        //Consider a CardAction button here to link to google map navigation

        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={2} >
              <Grid item >
                <img className={classes.image} src={ChargingStation_ward} alt="charge station picture" />
                <Divider />
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={4} >
                  <Grid item xs>
                    <Typography className={classes.fonts}  >
                      <Box fontWeight="fontWeightBold" >
                        {props.name}
                      </Box>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom className={classes.pos} >
                      {props.address}
                      </Typography>
                    <Typography variant="body2" >
                      <Box fontWeight="fontWeightMedium" >
                        <EvStationIcon style={props.returnStationStatus(props.inUse).color} />
                        {props.returnStationStatus(props.inUse).status}
                      </Box>
                    </Typography>
                    <Typography variant="body2" >
                      <Box fontWeight="fontWeightMedium" >
                        Stations Available: {stationNum} of {availNum}
                      </Box>
                    </Typography>
                  </Grid>

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
                </Grid>

                <Grid item container direction="column" >
                  <Grid item>
                  <Typography variant="subtitle1">
                    {console.log(props.returnDistanceInMiles(props.location))}
                    {props.returnDistanceInMiles(props.location)}
                  </Typography>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
    );

}