import {useState, useEffect} from "react";
import getStationsData from "../api/stations";
import BaseHecoStations from '../BaseHecoStations';

function normalizeStations(stations) {
    const normalizedStations = {};
    stations.forEach(station => {
        normalizedStations[station.name] = station;
    });
    return normalizedStations;
}
function useStationsData() {
    const [stations, setStations] = useState(BaseHecoStations);
    const [intervalObj, setIntervalObj] = useState({});

    useEffect(() => {
        const intervalObj = setInterval(
            () => {
                getStationsData().then(stationsData => {
                    const normalizedStations = normalizeStations(stations);
                    Object.keys(stationsData).forEach(stationName => {
                       if (normalizedStations[stationName] === undefined) {
                           normalizedStations[stationName] = stationsData[stationName];
                       }
                    });
                    setStations(Object.values(normalizedStations));
                }).catch(() => {});
            },
            5000);
        setIntervalObj(intervalObj);
        return () => {clearInterval(intervalObj)};
    },[]);
    return stations;
}
export default useStationsData;
