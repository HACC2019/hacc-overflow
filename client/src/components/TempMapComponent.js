import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React from "react";
import MapGL, {Marker} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import RoomIcon from '@material-ui/icons/Room';

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
    return (
      <div style={{ height: "100vh" }}>
        <MapGL
          {...props.viewport}
          onViewportChange={props.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
        </MapGL>
      </div>
    );
}
export default TempMapComponent;