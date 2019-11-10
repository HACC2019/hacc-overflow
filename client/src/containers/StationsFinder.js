import React, { useState } from 'react';
import TestHecoStations from '../TestHecoStations';
import Main from './StationsFinder';
import { GeoJsonLayer } from "deck.gl";
import SingleCard from '../components/SingleCard';
import MultiCardContainer from './MultiCardContainer';
import { getPreciseDistance } from 'geolib';
import TopBar from "../components/TopBar";
import CardDrawer from "../components/CardDrawer";
import { Button } from "@material-ui/core";
import Map from "../components/Map";
import withStyles from "../components/withStyles";


/**
 * Wrapper component for all station finder functionality.
 * Contains all the state needed for such functionality.
 * @param {Object}classes - classes used for styling
 */
function StationsFinder({classes}) {
    const [position, setPosition] = useState({});
    const [cardDrawer, setCardDrawer] = useState({
        open: false,
        isSingleView: false,
        singleCard: null,
        stations: TestHecoStations
    });
    const [searchResultLayer, setSearchResultLayer] = useState({});
    const [viewport, setViewport] = useState({
        latitude: 21.30694,
        longitude: -157.85833,
        zoom: 10.5,
        width: '100%',
        height: 500
    });
    const returnDistanceInMiles = (end) => {
        if (position.latitude != null) {
            return (((getPreciseDistance(position, end, 1) * 0.000621371).toFixed(2)) + " Miles");
        }
        else return null;
    };
    const returnSortedStations = (arr, loc) => {
        return arr.sort((a, b) => (getPreciseDistance(loc, a.location, 1) > getPreciseDistance(loc, b.location, 1)) ? 1 : -1);
    };
    const handleSearch = event => {
        setPosition({
            latitude: event.result.geometry.coordinates[1],
            longitude: event.result.geometry.coordinates[0]
        });
        setCardDrawer({
            open: true,
            isSingleView: false,
            stations: returnSortedStations(
                cardDrawer.stations,
                {
                    latitude: event.result.geometry.coordinates[1],
                    longitude: event.result.geometry.coordinates[0]
                }
            )
        })
    };
    const getUserLocation = () => navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10.5
        });
        setCardDrawer({
            open: true,
            isSingleView: false,
            stations: returnSortedStations(TestHecoStations, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        });
    },
        (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    const renderDrawerContent = cardDrawer.isSingleView ?
        () => <SingleCard {...cardDrawer.singleCard} returnDistanceInMiles={returnDistanceInMiles}/>
        :
        () => <MultiCardContainer stations={cardDrawer.stations} getDistance={returnDistanceInMiles} />;

    return (
        <>
            <CardDrawer
                cardDrawer={cardDrawer}
                setCardDrawer={setCardDrawer}
                renderDrawerContent={renderDrawerContent}
            />
            <Button onClick={getUserLocation}>Use my Position</Button>
            <Map
                position={position}
                setPosition={setPosition}
                markers={TestHecoStations}
                searchResultLayer={searchResultLayer}
                setSearchResultLayer={setSearchResultLayer}
                classes={classes}
                viewport={viewport}
                setViewport={setViewport}
                cardDrawer={cardDrawer}
                setCardDrawer={setCardDrawer}
                getUserLocation={getUserLocation}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default withStyles(StationsFinder);
