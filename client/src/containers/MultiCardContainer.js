import React, {useState} from 'react';
import Card from '../components/Cards';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

const G_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=';

function MultiCardContainer({stations, getDistance, returnStationStatus}){
  const [showUsedStations, setShowUsedStations] = useState(false);

  const flipSwitch = () => {
    setShowUsedStations(!showUsedStations);
  };

  const shownStations = showUsedStations ? stations : stations.filter(stat => stat.inUse === 1);

  return (
      <Grid container direction="column" justify="center" alignItems="center" >
        <Typography component="div" style={{
          backgroundColor: '#EBF3FE',
          height: '100vh'
        }} >
          <div>
            <Switch
              checked={showUsedStations}
              onChange={flipSwitch}
              value="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <Typography>Display Unavailable Stations?</Typography>
          </div>
          <div>
            {
              shownStations.map((station,index) => (
                <Card
                  name={station.name}
                  address={station.address}
                  distance={getDistance(station.location)}
                  inUse={station.inUse}
                  url={`${G_MAPS_URL}${station.address}`}
                  stationColor={returnStationStatus(station.inUse).color}
                  key={index}
                />
                ))
            }
          </div>
          </Typography>
        </Grid>
  );
}

export default MultiCardContainer;
