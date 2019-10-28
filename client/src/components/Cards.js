import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



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

export default function SimpleCard() {
  const classes = useStyles();

  return (
      //Consider a CardAction button here to link to google map navigation
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            1. Name of ChargeStation location
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom component="p">
            Will update with grid to include distance, address, and maybe icon/image

          </Typography>
        </CardContent>
      </Card>
  );
}