/*import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React from "react";
import MapGL, {Marker} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import RoomIcon from '@material-ui/icons/Room';
import Geocoder from 'react-map-gl-geocoder';

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWF4ZGV5byIsImEiOiJjazJtZHFubnAwNDQxM25xbjg2YTc1dWs5In0.BBhi4RCBqtygGxYqzwFheQ";

function TempMapComponent (props) {
  

  const mapRef = React.createRef();
  const RenderMarkers = props.markers.map(marker => (
      <Marker latitude={marker.location.latitude} longitude={marker.location.longitude} offsetLeft={-20} offsetTop={-10}>
        <RoomIcon style={{color: '#4B0082'}}/>
      </Marker>
  ));
  console.log(props);
    return (
      <div style={{ height: "100vh" }}>
        <MapGL
          {...props.viewport}
          onViewportChange={props.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={props.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
          {RenderMarkers}
          {
            props.position.longitude!=null ? 
                <Marker latitude={props.position.latitude} longitude={props.position.longitude} offsetLeft={-20} offsetTop={-10}>
                    <RoomIcon style={{color: '#4B0082'}}/>
                </Marker>
                : <div></div>
          }
          <DeckGL {...props.viewport} layers={[props.searchResultLayer]} />
        </MapGL>
      </div>
    );
}
export default TempMapComponent;
*/


import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {Marker} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import RoomIcon from '@material-ui/icons/Room';
import Geocoder from "react-map-gl-geocoder";
import { Button } from '@material-ui/core';

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA";

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
  };
  RenderMarkers = this.props.markers.map(marker => (
    <Marker latitude={marker.location.latitude} longitude={marker.location.longitude} offsetLeft={-20} offsetTop={-10}>
      <RoomIcon style={{color: '#4B0082'}}/>
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
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          {this.RenderMarkers}
          {this.props.position.latitude!=null ?
          <Marker latitude={this.props.position.latitude} longitude={this.props.position.longitude} offsetLeft={-20} offsetTop={-10}>
            <RoomIcon style={{color: '#FF0000'}}/>
          </Marker> : <div></div>
          }
          <DeckGL {...this.props.viewport} layers={[searchResultLayer]} />
        </MapGL>
      </div>
    );
  }
}
export default TempMapComponent;