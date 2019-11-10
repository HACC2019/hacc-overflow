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

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWF4ZGV5byIsImEiOiJjazJtZHFubnAwNDQxM25xbjg2YTc1dWs5In0.BBhi4RCBqtygGxYqzwFheQ";

class TempMapComponent extends Component {
  state = {
    searchResultLayer: null
  };

  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.props.setViewport(
      { ...this.state.viewport, ...viewport }
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

  handleOnResult = event => {
    console.log(event.result);
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
    this.props.setPosition({
      latitude: event.result.geometry.coordinates[1],
      longitude: event.result.geometry.coordinates[0]
    });
    this.props.setCardDrawer({
      open: true,
      isSingleView: false,
      cardList: this.props.returnSortedStations(
        this.props.cardDrawer.cardList,
        {
          latitude: event.result.geometry.coordinates[1],
          longitude: event.result.geometry.coordinates[0]
        }
      )
    })
  };
  RenderMarkers = this.props.markers.map(marker => (
    <Marker latitude={marker.location.latitude} longitude={marker.location.longitude} offsetLeft={-20} offsetTop={-10}>
        <RoomIcon style={marker.inUse ? {color: '#CD0000'} : {color: '#008B00'}} onClick={() => this.props.setCardDrawer({singleCard: marker, open: true, isSingleView: true})}/>
    </Marker>
  ));
  render() {
    const {  searchResultLayer } = this.state;

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
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          <Button onClick={this.props.getUserLocation} style={{position: 'absolute', top:0, right: 0, zIndex: 15}}>
            <MyLocationIcon style={{width: 50, height: 50}}/>
          </Button>
          {this.RenderMarkers}
          {this.props.position.latitude!=null ?
          <Marker latitude={this.props.position.latitude} longitude={this.props.position.longitude} onClick={()=>console.log('My Location')} offsetLeft={-20} offsetTop={-10}>
            <RoomIcon style={{color: '#FF0000'}} onClick={()=>console.log('UserLocation')}/>
          </Marker> : <div></div>
          }
          {/*<DeckGL {...this.props.viewport} layers={[searchResultLayer]} />*/}
        </MapGL>
      </div>
    );
  }
}
export default TempMapComponent;