import React from 'react';
import { connect } from 'react-redux';

import {createInitialRoutingGraph, updateRoutingGraph} from './util';

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
    // not using this.state because I don't want to trigger shouldComponentUpdate
    // twice every time the props change.
    this.routingGraph = createInitialRoutingGraph();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.audioManagerStatus !== 'success') {
      return;
    }

    updateRoutingGraph(this.routingGraph, nextProps.reprGraph);

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
  reprGraph: state.audio,
});

const ConnectedAudioManager = connect(mapStateToProps)(AudioManager);
export default ConnectedAudioManager;
