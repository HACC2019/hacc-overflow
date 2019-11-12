import React from 'react';
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

    fixedHeight: {
        height: 500,
    },
    mainHeader: {
        color: "#37246B",
        paddingTop: "10px",
    },
    secondaryHeader: {
        paddingTop: "20px",
        color: "#3B342D",
    },
    mainBody: {
        paddingTop: "12px",
        paddingBottom: "12px",
    },
    mainWrapper: {
        paddingTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
    },
    mapLegendWrapper: {
        padding: "7px",
    },
    mapLegendDot: {
        height: "12px",
        width: "12px",
        backgroundColor: "green",
        borderRadius: "50%",
        display: "inline-block",
    },
    mapLegendText: {
        display: "inline-block",
        padding: ".5px",
        paddingLeft: "5px",
        margin: "0px",
        fontSize: "12px",
    },
    mapLegendHeader: {
        padding: ".5px",
        margin: "0px",
    },
}));

function withStyles(toRender) {
    return () => {
        const classes = useStyles();
        return (
            <div className={classes.appBarSpacer}>
                <Container maxWidth="lg" className={classes.container}>
                    {toRender({classes})}
                </Container>
            </div>
        )
    }
}

export default withStyles;
