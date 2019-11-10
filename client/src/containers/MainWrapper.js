import React, { useState } from 'react';
import TestHecoStations from '../TestHecoStations';
import Main from './Main';
import { GeoJsonLayer } from "deck.gl";
import SingleCard from '../components/SingleCard';
import CardContainer from '../containers/CardContainer';
import { getPreciseDistance } from 'geolib';

export default function MainWrapper() {
    const [position, setPosition] = useState({});
    const [cardDrawer, setCardDrawer] = useState({
        open: false,
        isSingleView: false,
        singleCard: null,
        cardList: TestHecoStations
    });
    const [searchResultLayer, setSearchResultLayer] = useState({});
    const returnDistanceInMiles = (end) => {
        if(position.latitude != null){
            return (((getPreciseDistance(position, end, 1) * 0.000621371).toFixed(2)) + " Miles");
        }
        else return null;
    }
    const returnSortedStations = (arr, loc) =>{
        return arr.sort((a, b) => (getPreciseDistance(loc, a.location, 1) > getPreciseDistance(loc, b.location, 1)) ? 1 : -1);
    }
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
            cardList: returnSortedStations(TestHecoStations, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        });
    },
        (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    const [viewport, setViewport] = useState({
        latitude: 21.30694,
        longitude: -157.85833,
        zoom: 10.5,
        width: '100%',
        height: 500
    });

    const mapProps = { position, setPosition, markers: TestHecoStations, searchResultLayer, setSearchResultLayer, viewport, setViewport, cardDrawer, setCardDrawer, returnSortedStations, getUserLocation};
    const buttonProps = { getUserLocation };
    const renderDrawerContent = cardDrawer.isSingleView ? () => <SingleCard {...cardDrawer.singleCard} /> : () => <CardContainer cardArr={cardDrawer.cardList} getDistance={returnDistanceInMiles} />
    const drawerProps = { cardDrawer, setCardDrawer, renderDrawerContent };
    return (
        <Main mapProps={mapProps} buttonProps={buttonProps} drawerProps={drawerProps} />
    )
}