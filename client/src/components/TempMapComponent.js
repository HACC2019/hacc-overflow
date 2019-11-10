import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {Marker} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import RoomIcon from '@material-ui/icons/Room';
import Geocoder from "react-map-gl-geocoder";
import { Button } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWF4ZGV5byIsImEiOiJjazJtZHFubnAwNDQxM25xbjg2YTc1dWs5In0.BBhi4RCBqtygGxYqzwFheQ";

class TempMapComponent extends Component {
  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.props.setViewport(
      { ...this.props.viewport, ...viewport }
    );
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };
  RenderMarkers = this.props.markers.map(marker => (
    <Marker latitude={marker.location.latitude} longitude={marker.location.longitude} offsetLeft={-20} offsetTop={-10}>
        <RoomIcon style={marker.inUse == 0 ? {color: '#CD0000'} : (marker.inUse == 1 ? {color: '#FFD300'} : {color: '#008B00'})} onClick={() => this.props.setCardDrawer({singleCard: marker, open: true, isSingleView: true})}/>
    </Marker>
  ));
  render() {

    return (
      <div style={{height:'500px'}}>
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
          <Button onClick={this.props.getUserLocation} style={{position: 'absolute', top:0, right: 0, zIndex: 15}}>
            <MyLocationIcon style={{width: 50, height: 50}}/>
          </Button>
          {this.RenderMarkers}
          {this.props.position.latitude!=null ?
          <Marker latitude={this.props.position.latitude} longitude={this.props.position.longitude} offsetLeft={-20} offsetTop={-10}>
            <PersonPinCircleIcon style={{color:'#3F51B5'}}/>
          </Marker> : <div></div>
          }
        </MapGL>
      </div>
    );
  }
}
export default TempMapComponent;