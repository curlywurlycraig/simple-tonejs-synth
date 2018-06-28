import React, { Component } from 'react';

import './app.css';
import AudioManager from './components/audioManager';
import Keyboard from './components/keyboard/pure';
import { createPartialOscillator, createGainNode } from './utils/nodes';
import { getFrequencyFromNoteName, qwertyToKeyMap } from './utils/frequency';
import WavyBackground from './components/wavyBackground';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOctave: 4,
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
      },
      currentlyPlayingNotes: [],
    };

    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.keyPressed.bind(this));
    document.addEventListener("keyup", this.keyReleased.bind(this));
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
      },
      currentlyPlayingNotes: [
        ...this.state.currentlyPlayingNotes,
        note,
      ]
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
      },
      currentlyPlayingNotes: this.state.currentlyPlayingNotes.filter(n => {
        return n !== note;
      }),
    });
  }

  keyPressed(e) {
    if (!qwertyToKeyMap[e.key]) return;
    const note = `${qwertyToKeyMap[e.key]}${this.state.currentOctave}`;

    this.noteOn(note);
  }

  keyReleased(e) {
    if (!qwertyToKeyMap[e.key]) return;
    const note = `${qwertyToKeyMap[e.key]}${this.state.currentOctave}`;

    this.noteOff(note);
  }

  render() {
    return (
      <div className="AppContainer" onKeyDown={this.keyPressed}>
        <AudioManager audioGraph={this.state.audioGraph}></AudioManager>

        <div className="WavyBackground">
          <WavyBackground
            width={800}
            height={1000}
            xSpacing={5}
            amplitude={5}
            wavelength={25}
          />
        </div>

        <div className="OutsideKeyboardContainer">
          <Keyboard
            lowestOctave={this.state.currentOctave}
            octaveCount={3}
            onKeyOn={this.noteOn}
            onKeyOff={this.noteOff}
            currentlyPlayingNotes={this.state.currentlyPlayingNotes}
          />
        </div>
      </div>
    );
  }
}

export default App;
