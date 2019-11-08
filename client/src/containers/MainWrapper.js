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
        })
    });
    const handleViewportChange = newViewport => {
        setViewport(
          { ...viewport, ...newViewport }
        );
      };
    
      // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = newViewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
        return this.handleViewportChange({
          ...newViewport,
          ...geocoderDefaultOverrides
        });
      };
    
    const handleOnResult = event => {
        console.log(event.result);
        setSearchResultLayer(
          new GeoJsonLayer({
            id: "search-result",
            data: event.result.geometry,
            getFillColor: [255, 0, 0, 128],
            getRadius: 1000,
            pointRadiusMinPixels: 10,
            pointRadiusMaxPixels: 10
          }),
        );
        setPosition({
                latitude: event.result.geometry.latitude,
                longitude: event.result.geometry.longitude
            }
        )
    };
    const [viewport,setViewport] = useState({
        latitude: 21.30694,
        longitude: -157.85833,
        zoom: 10.5,
        width: '100%',
        height: 500
    });
    const [searchResultLayer, setSearchResultLayer] = useState({});
    const mapProps = {position, setPosition, markers: TestHecoStations, handleViewportChange, handleGeocoderViewportChange, handleOnResult, searchResultLayer, setSearchResultLayer, viewport, setViewport};
    const buttonProps = {getUserLocation};
    return (
        <Main mapProps={mapProps} buttonProps={buttonProps} />
    )
}