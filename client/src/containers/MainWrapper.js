import React, { useState } from 'react';
import TestHecoStations from '../TestHecoStations';
import Main from './Main';
import { GeoJsonLayer } from "deck.gl";
import SingleCard from '../components/SingleCard';
import CardContainer from '../containers/CardContainer';
import TopBar from "../components/TopBar";
import CardDrawer from "../components/CardDrawer";
import {Button} from "@material-ui/core";
import TempMapComponent from "../components/TempMapComponent";
import Container from "@material-ui/core/Container";

export default function MainWrapper() {
    const [position, setPosition] = useState({});
    const [cardDrawer, setCardDrawer] = useState({
        open: false, 
        isSingleView: false, 
        singleCard: null, 
        cardList: TestHecoStations
    });
    const [searchResultLayer, setSearchResultLayer] = useState({});
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
    }, 
    (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
    {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
    );
    
    const [viewport,setViewport] = useState({
        latitude: 21.30694,
        longitude: -157.85833,
        zoom: 10.5,
        width: '100%',
        height: 500
    });
    
    const renderDrawerContent = cardDrawer.isSingleView ? () => <SingleCard {...cardDrawer.singleCard}/> : () => <CardContainer cardArr={cardDrawer.cardList}/>

    const renderMainContent = (classes) => (
        <div>
            <TopBar />
            <CardDrawer
                cardDrawer={cardDrawer}
                setCardDrawer={setCardDrawer}
                renderDrawerContent={renderDrawerContent}
            />
            <Button onClick={getUserLocation}>Use my Position</Button>
            <TempMapComponent
                position={position}
                setPosition={setPosition}
                markers={TestHecoStations}
                searchResultLayer={searchResultLayer}
                setSearchResultLayer={setSearchResultLayer}
                classes={classes}
                viewport={viewport}
                setViewport={setViewport}
            />
        </div>
    );

    return (
        <Main toRender={renderMainContent}/>
    )
}
