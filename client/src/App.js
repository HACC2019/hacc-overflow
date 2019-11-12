import React from 'react';
import StationsFinder from './containers/StationsFinder';
import TopBar from './components/TopBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/Footer';

function App() {

  return (
      <div style={{backgroundColor: '#EBF3FE'}}>
          <CssBaseline />
          <TopBar />
          <StationsFinder />
          <Footer />
      </div>
  );

}

export default App;
