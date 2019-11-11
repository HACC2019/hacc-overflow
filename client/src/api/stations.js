
const URL = 'https://hacc.aparcar.org/stations';
const SUCCESS = 'success';

const FETCH_ERR = new Error("Failed to fetch stations data");
const JSON_KEYS = {
    DATA: 'data',
    STATIONS_DATA: 'result',
    STATIC_STATIONS_DATA: 'metric',
    DYNAMIC_STATIONS_DATA: 'value',
    NAME: 'station',
    ADDRESS: 'address',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    STATION_STATUS_INDEX: 0,
    ETA_STATUS_INDEX: 1,
};

/**
 * Returns object containing stations indexed by
 * the a given station's name.
 *
 * Station is normalized based on BaseHecoStations.js
 *
 * @returns {Promise<void>}
 */
async function stations() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new FETCH_ERR;
        }
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

/**
 * Normalizes stations data to be formatted nicely.
 * @param {Object} stationsData
 */
function normalizeStationsData(stationsData) {
    const stations = {};

    stationsData.forEach(station => {
        const name = station[JSON_KEYS.NAME];
        const address = station[JSON_KEYS.ADDRESS];
        const latitude = station[JSON_KEYS.LATITUDE];
        const longitude = station[JSON_KEYS.LONGITUDE];
        const status_code = parseInt(station[JSON_KEYS.DYNAMIC_STATIONS_DATA][JSON_KEYS.STATION_STATUS_INDEX]);
        const eta = station[JSON_KEYS.DYNAMIC_STATIONS_DATA][JSON_KEYS.ETA_STATUS_INDEX];

        stations[name] = {
            name,
            address,
            location: {latitude, longitude},
            status: status_code === STATION_STATUSES.UP && eta === 0 ? STATION_STATUSES.IN_USE : status_code,
            eta, //todo: convert this into nice time format
        };
    });

    return stations;
}

export default stations;
