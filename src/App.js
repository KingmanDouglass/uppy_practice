import React, { Component } from 'react';
import './App.css';
import UppyComp from './UppyComp'
// import OtherOne from './OtherOne'
// import TryThree from './TryThree'
import TryFour from './TryFour'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <UppyComp/> */}
        {/* <OtherOne/> */}
        {/* <TryThree/> */}
        <TryFour/>
      </div>
    );
  }
}

export default App;
