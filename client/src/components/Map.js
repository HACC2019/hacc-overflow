import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL, {Marker, NavigationControl } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
import Geocoder from "react-map-gl-geocoder";
import {Fab, Paper} from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import MapLegend from "./MapLegend";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWF4ZGV5byIsImEiOiJjazJtZHFubnAwNDQxM25xbjg2YTc1dWs5In0.BBhi4RCBqtygGxYqzwFheQ";


class Map extends Component {
  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.props.setViewport(
      { ...this.props.viewport, ...viewport }
    );
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };
  RenderMarkers = this.props.markers.map((marker,index) => (
    <Marker latitude={marker.location.latitude} longitude={marker.location.longitude} offsetLeft={-20} offsetTop={-10} key={index}>
      <RoomIcon
          style={this.props.returnStationStatus(marker.inUse).color}
          fontSize="large"
          onClick={() => {
            this.props.setCardDrawer({ ...this.props.cardDrawer, singleCard: marker, open: true, isSingleView: true })}
          } />
    </Marker>
  ));
  render() {

    return (
      <div style={{ height: '500px' }}>
        <MapGL
          ref={this.mapRef}
          {...this.props.viewport}
          width="100%"
          height="100%"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle='mapbox://styles/mapbox/streets-v11'
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.props.handleSearch}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          <Fab
            color="secondary"
            aria-label="get location"
            onClick={this.props.getUserLocation}
            style={{ position: 'absolute', top: 5, right: 5, zIndex: 15 }}
          >
            <MyLocationIcon />
          </Fab>
          <div style={{position: 'absolute', bottom:40, right: 5}}>
            <NavigationControl />
          </div>
          <MapLegend classes={this.props.classes}/>
          {this.RenderMarkers}
          {this.props.position.latitude != null ?
            <Marker latitude={this.props.position.latitude} longitude={this.props.position.longitude} offsetLeft={-20} offsetTop={-10}>
              <PersonPinCircleIcon style={{ color: '#3F51B5' }} />
            </Marker> : null
          }
        </MapGL>
      </div>
    );
  }
}

export default Map;
