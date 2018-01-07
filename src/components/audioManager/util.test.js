import { updateRoutingGraph } from './util';
import * as webAudioMocks from './webAudioMocks';
/**
 * Tests that a json representation results in the appropriate
 * routing graph
 */
describe('updateRoutingGraph', () => {
  window.AudioContext = webAudioMocks.AudioContext;
  window.GainNode = webAudioMocks.GainNode;
  window.OscillatorNode = webAudioMocks.OscillatorNode;

  const audioContext = new AudioContext();

  it('does nothing when both are empty', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audioState = {
      racks: [],
      outputNode: {}
    };

    updateRoutingGraph(routingGraph, audioState);

    expect(routingGraph).toEqual({
      context: audioContext,
      racks: [],
      outputNode: {}
    });
  });

  it('creates an output node when one does not exist', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audioState = {
      racks: [],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      }
    };

    updateRoutingGraph(routingGraph, audioState);

    expect(routingGraph.racks).toEqual([]);
    expect(routingGraph.outputNode.type).toEqual(audioState.outputNode.type);
    expect(routingGraph.outputNode.params).toEqual(audioState.outputNode.params);
    expect(routingGraph.outputNode._node).toBeInstanceOf(GainNode);
    expect(routingGraph.outputNode._node.gain.value).toEqual(0.5);
  });

  it('connects the outputNode to the context destination', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audioState = {
      racks: [],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      }
    };

    updateRoutingGraph(routingGraph, audioState);

    expect(routingGraph.racks).toEqual([]);
    expect(routingGraph.outputNode._node.connect).toHaveBeenCalledWith(
      audioContext.destination
    );
  });

  it('adds a new oscillator node when a rack contains an oscillator', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audio = {
      racks: [{
        id: 1,
        units: [{
          id: 1,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: [],
            }
          }
        }],
      }],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      },
    };

    updateRoutingGraph(routingGraph, audio);

    expect(routingGraph.racks.length).toEqual(1);
    const newRack = routingGraph.racks[0];
    expect(newRack.id).toEqual(audio.racks[0].id);
    expect(newRack.units.length).toEqual(1);
    const newUnit = newRack.units[0];
    expect(Object.keys(newUnit.nodes).length).toEqual(1);
    expect(newUnit.nodes.INPUT.type).toEqual('oscillator');
    expect(newUnit.nodes.INPUT._node).toBeInstanceOf(OscillatorNode);
    expect(newUnit.nodes.INPUT._node.frequency.value).toEqual(440);
    expect(newUnit.nodes.INPUT._node.detune.value).toEqual(0);
    expect(newUnit.nodes.INPUT._node.type.value).toEqual('triangle');
  });

  it('connects the output node of the last unit to the output node', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audio = {
      racks: [{
        id: 1,
        units: [{
          id: 1,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['OUTPUT']
            }
          }
        }],
      }],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      },
    };

    updateRoutingGraph(routingGraph, audio);

    expect(routingGraph.racks[0].units[0].nodes.INPUT._node.connect)
      .toHaveBeenCalledWith(routingGraph.outputNode._node);
  })

  it('connects the output of prior units to the next unit', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audio = {
      racks: [{
        id: 1,
        units: [{
          id: 1,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['OUTPUT']
            }
          }
        },
        {
          id: 2,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['OUTPUT']
            }
          }
        }]
      }],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      },
    };

    updateRoutingGraph(routingGraph, audio);

    const firstUnit = routingGraph.racks[0].units[0];
    const secondUnit = routingGraph.racks[0].units[1];
    expect(firstUnit.nodes.INPUT._node.connect)
      .toHaveBeenCalledWith(secondUnit.nodes.INPUT._node);
    expect(secondUnit.nodes.INPUT._node.connect)
      .toHaveBeenCalledWith(routingGraph.outputNode._node);
  });

  it('connects nodes to other nodes within the unit', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {}
    };

    const audio = {
      racks: [{
        id: 1,
        units: [{
          id: 1,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['intermediate']
            },
            intermediate: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['OUTPUT']
            }
          }
        },
        {
          id: 2,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['OUTPUT']
            }
          }
        }]
      }],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      },
    };

    updateRoutingGraph(routingGraph, audio);

    const firstUnit = routingGraph.racks[0].units[0];
    const secondUnit = routingGraph.racks[0].units[1];
    expect(firstUnit.nodes.INPUT._node.connect)
      .toHaveBeenCalledWith(firstUnit.nodes.intermediate._node);
    expect(firstUnit.nodes.intermediate._node.connect)
      .toHaveBeenCalledWith(secondUnit.nodes.INPUT._node);
    expect(secondUnit.nodes.INPUT._node.connect)
      .toHaveBeenCalledWith(routingGraph.outputNode._node);
  });

  fit('updates node params when they have changed', () => {
    const routingGraph = {
      context: audioContext,
      racks: [],
      outputNode: {},
    };

    const firstAudio = {
      racks: [{
        id: 1,
        units: [{
          id: 1,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 440,
                detune: 0,
                type: 'triangle'
              },
              connectedTo: ['intermediate']
            }
          }
        }]
      }],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      },
    };

    updateRoutingGraph(routingGraph, firstAudio);

    expect(routingGraph.racks[0].units[0].nodes.INPUT.type).toEqual('oscillator');
    expect(routingGraph.racks[0].units[0].nodes.INPUT.params).toEqual({
      frequency: 440,
      detune: 0,
      type: 'triangle',
    });

    const secondAudio = {
      racks: [{
        id: 1,
        units: [{
          id: 1,
          nodes: {
            INPUT: {
              type: 'oscillator',
              params: {
                frequency: 500,
                detune: 10,
                type: 'triangle'
              },
              connectedTo: ['intermediate']
            }
          }
        }]
      }],
      outputNode: {
        type: 'gain',
        params: {
          gain: 0.5
        }
      },
    }

    updateRoutingGraph(routingGraph, secondAudio);

    expect(routingGraph.racks[0].units[0].nodes.INPUT.params).toEqual({
      frequency: 500,
      detune: 10,
      type: 'triangle',
    });
  })
});
