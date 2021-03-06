import React, { Component } from 'react';

import './app.css';
import AudioKeyboard from './components/audioKeyboard';
import WavyBackground from './components/wavyBackground';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      screenWidth: null,
      screenHeight: null,
    }
  }

  updateDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions()
  }

  render() {
    return (
      <div className="AppContainer">
        <div className="WavyBackground">
          <WavyBackground
            width={this.state.screenWidth}
            height={this.state.screenHeight}
            xSpacing={150}
            amplitude={20}
            wavelength={100}
          />
        </div>

        <AudioKeyboard />

        <p className="OrientationWarning">
          This wee app works best in landscape on a small mobile device.
        </p>
      </div>
    );
  }
}

export default App;
