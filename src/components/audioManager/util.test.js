import { updateRoutingGraph } from './util';

/**
 * Tests that a json representation results in the appropriate
 * routing graph
 */
describe('updateRoutingGraph', () => {
  let audioContext;
  beforeEach(() => {
    audioContext = new window.AudioContext();
  });

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
      nodes: []
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

  xit('adds a new oscillator node when a rack contains an oscillator', () => {
    const routingGraph = {
      context: audioContext,
      nodes: []
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
        gain: 0.5,
      },
    };

    updateRoutingGraph(routingGraph, audio);

    expect(routingGraph.nodes.length).toEqual(1);
    expect(routingGraph.nodes[0]).toBeInstanceOf(OscillatorNode);
    expect(routingGraph.nodes[0].frequency).toEqual(440);
    expect(routingGraph.nodes[0].detune).toEqual(0);
    expect(routingGraph.nodes[0].type).toEqual('triangle');
  });
});
