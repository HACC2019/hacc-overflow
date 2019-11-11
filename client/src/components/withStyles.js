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
