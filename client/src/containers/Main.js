import React from 'react';
import TempMapComponent from '../components/TempMapComponent';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({

    appBarSpacer: theme.mixins.toolbar,
    content: {
        display: 'flex',
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
        height: 500,
    },
}));

export default function MainWrapper(props) {
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
                <Button onClick={props.buttonProps.getUserLocation}>Use my Position</Button>
                <TempMapComponent {...props.mapProps} classes={classes} />
            </Container>
        </div>
    )
}