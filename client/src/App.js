import React from 'react';
import StationsFinder from './containers/StationsFinder';
import TopBar from './components/TopBar';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {

  return (
      <div>
        <CssBaseline />
          <TopBar />
          <StationsFinder />
      </div>
  );

}

export default App;
