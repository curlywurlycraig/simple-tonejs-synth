import { updateRoutingGraph } from './util';
import * as webAudioMocks from './webAudioMocks';
/**
 * Tests that a json representation results in the appropriate
 * routing graph
 */
describe('updateRoutingGraph', () => {
  const audioContext = null;

  beforeEach(() => {
    window.AudioContext = jest.fn();

    window.GainNode = webAudioMocks.GainNode;
    window.OscillatorNode = webAudioMocks.OscillatorNode
  })

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
  })

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
              }
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

  it('connects the output node of the last unit to the master gain node', () => {
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
              connectedTo: 'OUTPUT'
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

  xit('only connects the output of the last unit to the outputNode', () => {

  });

  xit('connects the outputNode to the context destination', () => {

  });

  xit('connects nodes to other nodes within the unit', () => {

  });
});
