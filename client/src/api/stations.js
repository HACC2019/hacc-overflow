
const URL = '/stations';
const SUCCESS = 'success';

const FETCH_ERR = new Error("Failed to fetch stations data");
const JSON_KEYS = {
    DATA: 'data',
    STATIONS_DATA: 'result',
    STATIC_STATIONS_DATA: 'metric',
    DYNAMIC_STATIONS_DATA: 'value',
    STATION_ID: 'station',
    ADDRESS: 'address',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    STATION_STATUS_INDEX: 0,
    ETA_STATUS_INDEX: 1,
};

async function stations() {
    try {
        const response = await fetch(URL);
        const responseJson = await response.json();

        if (responseJson.status !== SUCCESS) {
            throw new FETCH_ERR;
        }

        const data = responseJson[JSON_KEYS.DATA];
        if (data === undefined) {
            throw new FETCH_ERR;
        }
        const stationsData = data[JSON_KEYS.STATIONS_DATA];
        if (stationsData === undefined) {
            throw new FETCH_ERR;
        }
        return normalizeStationsData(stationsData);
    } catch (e) {
        throw(e);
    }
}

function normalizeStationsData(stationsData) {
    const stations = {};

    stationsData.forEach(station => {
        const id = station[JSON_KEYS.STATION_ID];
        const address = station[JSON_KEYS.ADDRESS];
        const latitude = station[JSON_KEYS.LATITUDE];
        const longitude = station[JSON_KEYS.LONGITUDE];
        const status = station[JSON_KEYS.STATUS][JSON_KEYS.STATION_STATUS_INDEX];
        const eta = station[JSON_KEYS.STATUS][JSON_KEYS.ETA_STATUS_INDEX];

        stations[id] = {
            name: id,
            address,
            latitude,
            longitude,
            status,
            eta,
        };
    });
    return stations;
}

export default stations;
