import {convertNoteToFrequency} from '../../utils';

/**
 * Given an audio routing graph and the json representation of an
 * audio routing graph, update the routing graph in place.
 *
 * TODO: Remove old and create new racks, and units.
 * TODO: Substantially test the behaviour of this function
 *       when it is known how to use Web Audio in Jest tests
 */
export function updateRoutingGraph(actualGraph, reprGraph) {
  updateNodeToRepresentation(actualGraph.outputNode, reprGraph.outputNode);

  reprGraph.racks.forEach(reprRack => {
    let actualRack = actualGraph.racks.find(actualRackCandidate => {
      actualRackCandidate.id === reprRack.id;
    });

    if (!actualRack) {
      actualRack = {
        id: reprRack.id,
        units: []
      };
      actualGraph.racks[actualRack.id] = actualRack;
    }

    reprRack.units.forEach(reprUnit => {
      let actualUnit = actualRack.units.find(actualUnitCandidate => {
        actualUnitCandidate.id === reprUnit.id;
      });

      if (!actualUnit) {
        actualUnit = {
          id: reprUnit.id,
          nodes: {},
        };
        actualRack.units[actualUnit.id] = actualUnit;
      }

      Object.keys(reprUnit.nodes).forEach(reprNodeKey => {
        // TODO: What if the node we want to connect to doesn't exist?
        // Answer: we should construct all the nodes before we perform the connections.

        // TODO: There's a better way to iterate over key/value pairs of an object.
        // I'm sure MDN has something to say about it.
        const reprNode = reprUnit.nodes[reprNodeKey];

        if (!actualUnit.nodes[reprNodeKey]) {
          actualUnit.nodes[reprNodeKey] = newNodeFromRepresentation(reprNode);
        }
      })
    })
  });
}

function updateNodeToRepresentation(routingGraphNode, nodeRepresentation) {
  if (routingGraph.outputNode._node === undefined) {
    routingGraph.outputNode = {...audioState.outputNode};
    routingGraph.outputNode._node = newNodeFromRepresentation(
      routingGraph.outputNode,
      routingGraph.context
    );
  }
}

function newNodeFromRepresentation(nodeRepr, context) {
  switch (nodeRepr.type) {
    case 'gain':
      return updateNodeWithParams(new GainNode(context), nodeRepr.params);
    default:
      return null;
  }
}

function updateNodeWithParams(node, params) {
  for (key in params) {
    node[key].value = params[key];
  }

  return node;
}