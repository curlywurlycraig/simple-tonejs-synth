import React from 'react';
import { connect } from 'react-redux';

import {createInitialRoutingGraph, updateRoutingGraph} from './util';

/**
 * Outputs audio according to an audio graph object.
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
    updateRoutingGraph(this.routingGraph, nextProps.audioGraph);
    return false; // we never actually want to render this
  }

  /**
   * Nothing should go here.
   */
  render() {
    return null;
  }
}

export default AudioManager;
