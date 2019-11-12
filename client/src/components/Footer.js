import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#80deea",
    padding: theme.spacing(6),
  }
}));

export default function Footer(){
  const classes = useStyles();

  return(
      <footer className={classes.footer} >
        <Typography variant="h6" align="center" gutterBottom>
          Temporary Simple Footer

        <div>
          <a href={"https://hacc.hawaii.gov/"}>
            Hawai'i Annual Code Challenge 2019.
          </a>
        </div>
        <div>
          <a href={"https://www.hawaiianelectric.com/products-and-services/electric-vehicles"}>
            HECO Electric Vehicles
          </a>
        </div>

        </Typography>

      </footer>
  );
}

