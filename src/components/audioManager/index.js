import React from 'react';
import { connect } from 'react-redux';

import {initialiseAudioManager} from '../../store/thunks';

/**
 * Doesn't render anything. The job of this component is to act as a controlled component wrapper around the
 * audio manager.
 */
class AudioManager extends React.Component {
  componentDidMount() {
    this.props.initialiseAudioManager();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.audioManagerStatus !== 'success') {
      return;
    }

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
});

const mapDispatchToProps = (dispatch) => {
  return {
    initialiseAudioManager: () => dispatch(initialiseAudioManager())
  }
};

const ConnectedAudioManager = connect(mapStateToProps, mapDispatchToProps)(AudioManager);
export default ConnectedAudioManager;