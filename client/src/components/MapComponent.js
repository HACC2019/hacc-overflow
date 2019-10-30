import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const mapCenter = [21.30694, -157.85833];
const zoomLevel = 10.5;

var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
export default class MapComponent extends Component {
    render() {
        //Map array of markers passed by props
        const LeafletMarkers = this.props.markers.map(marker => (
            <Marker position={ {lat: marker.location.latitude, lng: marker.location.longitude}} key={`marker_${marker.address}`}>
              <Popup>
                <span>{marker.address}</span>
              </Popup>
            </Marker>
          ));
        return (
            <div>
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                    style={{height: '500px', width: '100%'}}
                >
                    <TileLayer
                        url='http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
                    />
                    {LeafletMarkers}
                    <Marker position={{lat: this.props.userLocation.latitude, lng: this.props.userLocation.longitude}} icon={redIcon}>
                        <Popup>
                            <span>Your position</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}