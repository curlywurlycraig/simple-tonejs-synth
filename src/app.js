import React, { Component } from 'react';

import './app.css';
import AudioManager from './components/audioManager';
import Keyboard from './components/keyboard/pure';
import AudioGraphEditor from './components/audioGraphEditor';
import { createPartialOscillator, createGainNode } from './utils/nodes';
import { getFrequencyFromNoteName } from './utils/frequency';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioGraph: {
        nodes: {},
        outputNode: createGainNode(1),
      },
      synthGraph: {
        // TODO: Generate these based on the graph editor
        oscillators: [
          createPartialOscillator('sawtooth', 12),
          createPartialOscillator('sawtooth', 4),
          createPartialOscillator('sawtooth', 8),
          createPartialOscillator('sawtooth', -7),
          createPartialOscillator('sawtooth', 0),
        ],
      }
    };

    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  noteOn(note) {
    const newNodes = {
      ...this.state.audioGraph.nodes,
    };

    this.state.synthGraph.oscillators.forEach(oscillator => {
      console.log('oscillator id is ', oscillator.id)
      const id = `${oscillator.id}_${note}`;
      newNodes[id] = {
        id,
        ...oscillator,
        params: {
          ...oscillator.params,
          frequency: getFrequencyFromNoteName(note),
        }
      }
    });

    this.setState({
      audioGraph: {
        ...this.state.audioGraph,
        nodes: newNodes,
      }
    }, () => {
      console.log('audio graph nodes are ', this.state.audioGraph.nodes)
    });
  }

  noteOff(note) {
    const removedIds = this.state.synthGraph.oscillators.map(oscillator => {
      return `${oscillator.id}_${note}`;
    });

    console.log('removing ids ', removedIds);
    console.log('existing nodes: ', this.state.audioGraph.nodes);

    const newNodes = {};
    Object.keys(this.state.audioGraph.nodes).forEach(n => {
      console.log('id to check is ', n.id);

      if (!removedIds.includes(n.id)) {
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

        <div className="GraphEditorContainer">
          <AudioGraphEditor />
        </div>

        <div className="KeyboardContainer">
          <Keyboard octaveCount={7} onKeyOn={this.noteOn} onKeyOff={this.noteOff} />
        </div>
      </div>
    );
  }
}

export default App;
