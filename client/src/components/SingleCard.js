import React from 'react';
import {render} from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ChargingStation_ward from './chargingStation_ward.jpg';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 350,
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
  image: {
    padding: 10,
    width: 300,
    height: 228,
},
});

export default function SingleCard(props) {
  const classes = useStyles();
  const addrSample = "820 Ward Avenue\nHonolulu, HI 96814";
  const stationName ="Times Square Shopping Center\n";
  const stationNum = 1;
    return (
        //Consider a CardAction button here to link to google map navigation

        <Card className={classes.card}>
          <CardContent>
            <Grid container  >

                <Grid item xs container direction="column" spacing={2}>
                  <Grid item >
                    <img className={classes.image} src={ChargingStation_ward} alt="charge station picture"  />
                  </Grid>
                  <Divider />
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {stationName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {addrSample}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      stationNum;
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      open navigation to google maps
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      0.00 miles
                    </Typography>
                  </Grid>
                </Grid>


            </Grid>
          </CardContent>
        </Card>
    );

}