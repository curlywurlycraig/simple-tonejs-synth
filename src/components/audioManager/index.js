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
    this.routingGraph = {nodes: []};
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.audioManagerStatus !== 'success') {
      return;
    }

    updateRoutingGraph(this.routingGraph, nextProps.racks)

    // TODO: Could probably encode this into updateRoutingGraph somehow
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
