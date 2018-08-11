import React, { Component } from 'react';

import './app.css';
import AudioKeyboard from './components/audioKeyboard';
import WavyBackground from './components/wavyBackground';

class App extends Component {

  render() {
    return (
      <div className="AppContainer" onKeyDown={this.keyPressed}>
        <div className="WavyBackground">
          <WavyBackground
            width={800}
            height={1000}
            xSpacing={80}
            amplitude={5}
            wavelength={10}
          />
        </div>

        <AudioKeyboard />
      </div>
    );
  }
}

export default App;
