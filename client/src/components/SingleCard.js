import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ChargingStation_ward from './chargingStation_ward.jpg';
import Box from '@material-ui/core/Box';
import EvStationIcon from '@material-ui/icons/EvStation';
import googleMapsLogo from "./gmaps.png";
import ReportForm from './ReportForm.js';

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
    marginBottom: 12,
  },
  image: {
    padding: 10,
    width: 300,
    height: 228,
  },
  fonts: {
    fontWeight: "fontWeightBold",

  }
});

export default function SingleCard(props) {
  const classes = useStyles();
  const stationNum = 1;
  const availNum = 1;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        //Consider a CardAction button here to link to google map navigation

        <Card className={classes.card}>
          <CardContent>
            <Grid container  >

                <Grid item xs container direction="column" spacing={2}>
                  <Grid item >
                    <img className={classes.image} src={ChargingStation_ward} alt="charge station picture" />
                  </Grid>

                  <Divider />

                  <Grid item xs>
                    <Typography className={classes.fonts} >
                      <Box fontWeight="fontWeightBold" >
                      {props.name}
                      </Box>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {props.address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <Box fontWeight="fontWeightMedium" >
                        <EvStationIcon style={props.returnStationStatus(props.inUse).color} />
                        {props.returnStationStatus(props.inUse).status}
                      </Box>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <Box fontWeight="fontWeightMedium" >
                      Stations Available: {stationNum} of {availNum}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item>
                    <a href={'https://www.google.com/maps/search/?api=1&query=' + props.address}>
                      <img
                          src={googleMapsLogo}
                          alt={"To Google Maps"}
                          style={{width: "30px", float: "right"}}
                          title={"To Google Maps"}
                      />
                    </a>
                  </Grid >


                  <Grid item>
                    <Typography variant="subtitle1">
                      {console.log(props.returnDistanceInMiles(props.location))}
                      {props.returnDistanceInMiles(props.location)}
                    </Typography>
                  </Grid>
                </Grid>


            </Grid>
            <ReportForm name={props.name}/>
          </CardContent>
        </Card>
    );

}
