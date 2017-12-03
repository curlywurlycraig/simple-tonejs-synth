import React from 'react';
import { connect } from 'react-redux';

import {initialiseAudioManager} from '../../store/thunks';
import {convertNoteToFrequency} from '../../utils';

/**
 * Doesn't render anything. The job of this component is to act as a controlled component wrapper around the
 * audio manager. Basically, it makes sure that the actual instance of the AudioContext is up-to-date with
 * the state coming from redux.
 *
 * Also I feel justified not making a pure component file for this one because it doesn't render anything.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
 */
class AudioManager extends React.Component {
  componentDidMount() {
    this.props.initialiseAudioManager();

    // not using this.state because I don't want to trigger shouldComponentUpdate
    // twice every time the props change.
    this.knownInstruments = {};
  }

  /**
   * Compares prevProps and nextProps and adds new oscillators if there have been any changes
   *
   * @param prevProps The props we had
   * @param nextProps The props we have received and will update to
   */
  createNewOscillators(nextProps) {
    const knownInstrumentIds = Object.keys(this.knownInstruments);

    Object.values(nextProps.instruments).forEach(instrument => {
      // TODO: Distinguish between oscillators and instruments. Instruments will have multiple oscillators.
      // Need to think about how these should be structured internally. I think we should basically track all known
      // instruments as a list of objects which themselves have a defined structure of oscillators. Basically
      // a mirror representation of the final oscillator structure.
      const isNewInstrument = !knownInstrumentIds[instrument.id];

      if (isNewInstrument) {
        // TODO: Create the oscillator according to some attributes
        const oscillator = nextProps.audioManager.context.createOscillator();
        oscillator.type = instrument.waveform;

        // TODO: Don't set the frequency here, set it when there is a note update
        oscillator.frequency.value = 300 + 10 * knownInstrumentIds.length;
        oscillator.start();

        this.knownInstruments[instrument.id] = {
          oscillator: oscillator,
          representation: {...instrument},
        };
      }
    });
  }

  /**
   * TODO This could absolutely be generalised
   * @param nextProps
   */
  updateExistingOscillators(nextProps) {
    Object.values(nextProps.instruments).forEach(instrument => {
      const knownInstrument = this.knownInstruments[instrument.id];

      // waveform changes
      if (knownInstrument.representation.waveform !== instrument.waveform) {
        knownInstrument.oscillator.type = instrument.waveform;
        knownInstrument.representation.waveform = instrument.waveform;
      }

      // note changes
      if (instrument.note !== null && knownInstrument.representation.note === null) {
        // TODO Set the frequency here. Will need to write a util to convert a note to a frequency
        knownInstrument.oscillator.frequency.value = convertNoteToFrequency(instrument.note);
        knownInstrument.oscillator.connect(nextProps.audioManager.masterGainNode);
      } else if (instrument.note === null && knownInstrument.representation.note !== null) {
        knownInstrument.oscillator.disconnect(nextProps.audioManager.masterGainNode);
      }

      knownInstrument.representation.note = instrument.note;
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.audioManagerStatus !== 'success') {
      return;
    }

    this.createNewOscillators(nextProps);
    this.updateExistingOscillators(nextProps);

    if (nextProps.isMuted) {
      nextProps.audioManager.masterGainNode.gain.value = 0;
    } else {
      nextProps.audioManager.masterGainNode.gain.value = 1;
    }

    return false; // we never actually want to render this
  }

  /**
   * Nothing should go here.
   */
  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  isMuted: state.audio.muted,
  audioManager: state.audio.manager,
  audioManagerStatus: state.audio.state,
  instruments: state.audio.instruments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    initialiseAudioManager: () => dispatch(initialiseAudioManager())
  }
};

const ConnectedAudioManager = connect(mapStateToProps, mapDispatchToProps)(AudioManager);
export default ConnectedAudioManager;