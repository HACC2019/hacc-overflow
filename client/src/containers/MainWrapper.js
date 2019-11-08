import React, { useState } from 'react';
import TestHecoStations from '../TestHecoStations';
import Main from './Main';
import { GeoJsonLayer } from "deck.gl";

export default function MainWrapper() {
    const [position, setPosition] = useState({});
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
    });
    
      // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    
    const [viewport,setViewport] = useState({
        latitude: 21.30694,
        longitude: -157.85833,
        zoom: 10.5,
        width: '100%',
        height: 500
    });
    const [searchResultLayer, setSearchResultLayer] = useState({});
    const mapProps = {position, setPosition, markers: TestHecoStations, searchResultLayer, setSearchResultLayer, viewport, setViewport};
    const buttonProps = {getUserLocation};
    return (
        <Main mapProps={mapProps} buttonProps={buttonProps} />
    )
}