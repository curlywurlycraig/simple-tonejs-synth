import React, { Component } from 'react';
import { connect } from 'react-redux';

import Instrument from './components/instrument/pure';
import MutedToggle from './components/mutedToggle';
import AudioManager from './components/audioManager';
import './res/font-awesome/css/font-awesome.min.css';
import './app.css';
import {toggleMuted, createInstrument, noteOn, noteOff} from './store/actions';
import {initialiseAudioManager} from './store/thunks';
import AddInstrumentButton from './components/addInstrumentButton/pure';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  renderInstruments() {
    return this.props.instruments.map(instrument => {
      return <Instrument
        audioManager={this.props.audioManager}
        instrument={instrument}
        noteOn={note => this.props.noteOn(instrument.id, note)}
        noteOff={note => this.props.noteOff(instrument.id, note)}
      />;
    });
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
        </div>

        <div className="AppInstruments">
          {this.renderInstruments()}
          <AddInstrumentButton
            onAddInstrumentClick={this.props.createInstrument}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  muted: state.audio.muted,
  audioManager: state.audio.manager,
  instruments: state.audio.instruments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMuted: () => dispatch(toggleMuted()),
    initialiseAudioManager: () => dispatch(initialiseAudioManager()),
    createInstrument: () => dispatch(createInstrument()),
    noteOn: (instrumentId, note) => dispatch(noteOn(instrumentId, note)),
    noteOff: (instrumentId, note) => dispatch(noteOn(instrumentId, note)),
  }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
