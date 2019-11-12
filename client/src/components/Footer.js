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
        </Typography>
      </footer>
  );
}

