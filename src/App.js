import React, { Component } from 'react';
import Audio from './Audio.js';
import Instrument from './components/Instrument.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio();
  }

  render() {
    return (
      <div className="AppContainer">
        <Instrument context={this.audio.context}>
        </Instrument>
      </div>
    );
  }
}

export default App;
