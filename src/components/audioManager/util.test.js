import { updateRoutingGraph } from './util';

/**
 * Tests that a json representation results in the appropriate
 * routing graph
 */
describe('updateRoutingGraph', function() {
  it('does nothing when both are empty', function() {
    const routingGraph = {
      nodes: []
    };

    const racks = [];

    updateRoutingGraph(routingGraph, racks);

    expect(routingGraph).toEqual({
      nodes: []
    });
  });

  it('adds a new oscillator node when a rack contains an oscillator', function() {
    const routingGraph = {
      nodes: []
    };

    const racks = [{
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
      }]
    }];

    updateRoutingGraph(routingGraph, racks);

    expect(routingGraph.nodes.length).toEqual(1);
    expect(routingGraph.nodes[0]).toBeInstanceOf(OscillatorNode);
    expect(routingGraph.nodes[0].frequency).toEqual(440);
    expect(routingGraph.nodes[0].detune).toEqual(0);
    expect(routingGraph.nodes[0].type).toEqual('triangle');
  });
});
