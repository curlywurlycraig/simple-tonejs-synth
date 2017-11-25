import React, { Component } from 'react';
import { connect } from 'react-redux';

import Instrument from './components/instrument';
import MutedToggle from './components/mutedToggle';
import AudioManager from './components/audioManager';
import './res/font-awesome/css/font-awesome.min.css';
import './app.css';
import {toggleMuted} from './store/actions';
import {initialiseAudioManager} from './store/thunks';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="AppContainer">
        <AudioManager></AudioManager>

        <div className="AppHeader">
          <MutedToggle
            onToggle={this.props.toggleMuted}
            muted={this.props.muted}
          />
        </div>

        <div className="AppWorkspace">
          <Instrument audioManager={this.props.audioManager} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  muted: state.audio.muted,
  audioManager: state.audio.manager,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMuted: () => dispatch(toggleMuted()),
    initialiseAudioManager: () => dispatch(initialiseAudioManager()),
  }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
