import React, {useEffect, useState} from 'react';
import SingleCard from '../components/SingleCard';
import MultiCardContainer from './MultiCardContainer';
import { getPreciseDistance } from 'geolib';
import CardDrawer from "../components/CardDrawer";
import Map from "../components/Map";
import withStyles from "../components/withStyles";
import useStationsData from "../hooks/useStationsData";
import lookup from "../api/lookup";
import STATION_STATUSES from '../api/constants.js';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const STATION_COLORS = {
    red: '#CD0000',
    yellow: '#FFD300',
    green: '#008B00',
    purple: '#8200cd'
}

/**
 * Wrapper component for all station finder functionality.
 * Contains all the state needed for such functionality.
 * @param {Object}classes - classes used for styling
 */
function StationsFinder({classes}) {
    const [position, setPosition] = useState({});
    const [drawerContent, setDrawerContent] = useState({
        open: false,
        isSingleView: false,
        singleCard: null,
        stations: []
    });

    const [searchResultLayer, setSearchResultLayer] = useState({});
    const [viewport, setViewport] = useState({
        latitude: 21.30694,
        longitude: -157.85833,
        zoom: 10.5,
        width: '100%',
        height: 500
    });

    const stations = useStationsData();

    useEffect(() => {
        setDrawerContent({
            ...drawerContent,
            stations,
        })
    },[stations]);

    const returnStationStatus = (status) => {
        if(status === STATION_STATUSES.DOWN){
            return {
                color: {color: STATION_COLORS.red}, 
                status: 'Station is currently down.'
            };
        }
        else if(status === STATION_STATUSES.OK){
            return {
                color: {color: STATION_COLORS.green}, 
                status: 'Station is currently available.'
            };
        }
        else if(status === STATION_STATUSES.IN_USE){
            return {
                color: {color: STATION_COLORS.yellow}, 
                status: 'Station is currently in use.'
            };
        } else {
            return {
                color: {color: STATION_COLORS.purple}, 
                status: 'Station status is unknown.'
            };
        }
    }
    const returnDistanceInMiles = (end) => {
        if (position.latitude != null) {
            return (((getPreciseDistance(position, end, 1) * 0.000621371).toFixed(2)) + " Miles");
        }
        else return null;
    };
    const returnSortedStations = (arr, loc) => {
        return arr.sort((a, b) => (
            getPreciseDistance(loc, a.location, 1) > getPreciseDistance(loc, b.location, 1)) ? 1 : -1
        );
    };

    const handleSearch = event => {
        lookup(event.result.geometry.coordinates[1], event.result.geometry.coordinates[0])
            .catch(() => console.log("lookup request failed"));
        setPosition({
            latitude: event.result.geometry.coordinates[1],
            longitude: event.result.geometry.coordinates[0]
        });
        setDrawerContent({
            open: true,
            isSingleView: false,
            singleCard: null,
            stations: returnSortedStations(
                stations,
                {
                    latitude: event.result.geometry.coordinates[1],
                    longitude: event.result.geometry.coordinates[0]
                }
            )
        })
    };

    const getUserLocation = () => navigator.geolocation.getCurrentPosition((position) => {
        lookup(position.coords.latitude, position.coords.longitude)
            .catch(() => console.log("lookup request failed"));
        setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10.5
        });
        setDrawerContent({
            open: true,
            isSingleView: false,
            stations: returnSortedStations(stations, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        });
    },
        (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    const renderDrawerContent = drawerContent.isSingleView ?
        () => <SingleCard {...drawerContent.singleCard} returnDistanceInMiles={returnDistanceInMiles} returnStationStatus={returnStationStatus}/>
        :
        () => <MultiCardContainer stations={drawerContent.stations} getDistance={returnDistanceInMiles} returnStationStatus={returnStationStatus}/>;

    return (
        <>
            <Container>
            <Typography variant="h5">The Hawaiian Electric Companies DC Fast Chargers</Typography>
            <Typography variant="body2" gutterBottom>
            To support clean transportation, the Hawaiian Electric Companies received approval from the Hawaii Public Utilities Commission to own and operate publicly accessible DC Fast Chargers across Oahu, Maui County, and Hawaii Island. Below are the locations where electric vehicle owners can quickly charge their vehicles.
            </Typography>
            <CardDrawer
                cardDrawer={drawerContent}
                setCardDrawer={setDrawerContent}
                renderDrawerContent={renderDrawerContent}
            />
            <Map
                position={position}
                setPosition={setPosition}
                markers={stations}
                searchResultLayer={searchResultLayer}
                setSearchResultLayer={setSearchResultLayer}
                classes={classes}
                viewport={viewport}
                setViewport={setViewport}
                cardDrawer={drawerContent}
                setCardDrawer={setDrawerContent}
                getUserLocation={getUserLocation}
                handleSearch={handleSearch}
                returnStationStatus={returnStationStatus}
            />
            </Container>
        </>
    );
}

export default withStyles(StationsFinder);
