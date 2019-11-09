import React from 'react';
import MainWrapper from './containers/MainWrapper';
import TopBar from './components/TopBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import SingleCard from './components/SingleCard';

function App() {

  return (
      <div>
        {/*<CssBaseline />
        <MainWrapper />*/}
        <SingleCard />
      </div>
  );

}

export default App;
