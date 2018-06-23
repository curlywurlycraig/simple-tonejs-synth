import React, { Component } from 'react';

import './app.css';
import AudioManager from './components/audioManager';
import Keyboard from './components/keyboard/pure';
import AudioGraphEditor from './components/audioGraphEditor';
import { createSineOscillator, createGainNode } from './utils/nodes';
import { getFrequencyFromNoteName } from './utils/frequency';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioGraph: {
        nodes: {},
        outputNode: createGainNode(1),
      },
    };

    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  noteOn(note) {
    const newNodes = {
      ...this.state.audioGraph.nodes,
      [note]: createSineOscillator(getFrequencyFromNoteName(note)),
    }

    this.setState({
      audioGraph: {
        ...this.state.audioGraph,
        nodes: newNodes,
      }
    });
  }

  noteOff(note) {
    const newNodes = {};
    Object.keys(this.state.audioGraph.nodes).forEach(n => {
      if (n !== note) {
        newNodes[n] = this.state.audioGraph.nodes[n];
      }
    });

    this.setState({
      audioGraph: {
        ...this.state.audioGraph,
        nodes: newNodes,
      }
    });
  }

  render() {
    return (
      <div className="AppContainer">
        <AudioManager audioGraph={this.state.audioGraph}></AudioManager>

        <AudioGraphEditor />
        <Keyboard octaveCount={5} onKeyOn={this.noteOn} onKeyOff={this.noteOff} />
      </div>
    );
  }
}

export default App;
