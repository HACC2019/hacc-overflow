import React from 'react';
import MainWrapper from './containers/MainWrapper';
import TopBar from './components/TopBar';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  return (
      <div>
        <CssBaseline />
        <TopBar />
        <MainWrapper />
      </div>
  );

}

export default App;
