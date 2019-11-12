import {Paper} from "@material-ui/core";
import React from "react";
import {STATION_STATUS_COLORS} from "../constants";

function MapLegend({classes}) {
    const {IN_USE, AVAILABLE, NOT_AVAILABLE, UNKNOWN} = STATION_STATUS_COLORS;
    return (
        <div style={{position: 'absolute', bottom:40, left: 5}}>
            <Paper className={classes.mapLegendWrapper}>
                <h5 className={classes.mapLegendHeader}>Station Availability</h5>
                <span className={classes.mapLegendDot} style={{backgroundColor: AVAILABLE}}/>
                <p className={classes.mapLegendText}>Available</p>
                <br/>
                <span className={classes.mapLegendDot} style={{backgroundColor: IN_USE}}/>
                <p className={classes.mapLegendText}>In Use</p>
                <br/>
                <span className={classes.mapLegendDot} style={{backgroundColor: NOT_AVAILABLE}}/>
                <p className={classes.mapLegendText}>Out of Service</p>
                <br/>
                <span className={classes.mapLegendDot} style={{backgroundColor: UNKNOWN}}/>
                <p className={classes.mapLegendText}>Unknown</p>
                <br/>
            </Paper>
        </div>
    )
}

export default MapLegend;
