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
          createPartialOscillator('triangle', 12),
          createPartialOscillator('triangle', 4),
          createPartialOscillator('triangle', 8),
          createPartialOscillator('triangle', -7),
          createPartialOscillator('triangle', 0),
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
      const id = `${oscillator.id}_${note}`;
      newNodes[id] = {
        ...oscillator,
        id,
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
    });
  }

  noteOff(note) {
    const removedIds = this.state.synthGraph.oscillators.map(oscillator => {
      return `${oscillator.id}_${note}`;
    });

    const newNodes = {};
    Object.keys(this.state.audioGraph.nodes).forEach(nodeKey => {
      const node = this.state.audioGraph.nodes[nodeKey];

      if (!removedIds.includes(node.id)) {
        newNodes[nodeKey] = node;
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

        {/* <div className="GraphEditorContainer">
          <AudioGraphEditor />
        </div> */}

        <div className="OutsideKeyboardContainer">
          <Keyboard lowestOctave={4} octaveCount={3} onKeyOn={this.noteOn} onKeyOff={this.noteOff} />
        </div>
      </div>
    );
  }
}

export default App;
