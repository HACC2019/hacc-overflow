import {STATION_STATUSES} from "./constants";

export default [
  {
    name: 'Times Square Shopping Center',
    location: { latitude: 21.407750, longitude: -157.949610 },
    address: '98-1268 Kaahumanu St Pearl City, HI 96782',
    inUse: STATION_STATUSES.AVAILABLE
  },
  {
    name: 'Iwilei Costco Parking Lot',
    location: { latitude: 21.318000, longitude: -157.869290 },
    address: '801 Dillingham Building Honolulu, HI 96817',
    inUse: STATION_STATUSES.IN_USE
  },
  {
    name: 'Hawaii Kai 7-Eleven',
    location: { latitude: 21.293830, longitude: -157.710410 },
    address: '515 Pepeekeo St Honolulu, HI 96825',
    inUse: STATION_STATUSES.AVAILABLE
  },
  {
    name: 'Koolau Center',
    location: { latitude: 21.436700, longitude: -157.826360 },
    address: '47-388 Hui Iwa Street Kaneohe, HI 96744',
    inUse: STATION_STATUSES.IN_USE
  },
  {
    name: 'Dole Plantation',
    location: { latitude: 21.525810, longitude: -158.037780 },
    address: '64-1550 Kamehameha Hwy Wahiawa, HI 96786',
    inUse: STATION_STATUSES.NOT_AVAILABLE
  },
  {
    name: 'Haleiwa Town Center',
    location: { latitude: 21.589030, longitude: -158.103660 },
    address: '66-145 Kamehameha Highway Haleiwa, HI 96712',
    inUse: STATION_STATUSES.AVAILABLE
  }
]
