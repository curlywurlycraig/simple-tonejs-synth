import {convertNoteToFrequency} from '../../utils';

/**
 * Given an audio routing graph and the json representation of an
 * audio routing graph, update the routing graph in place.
 */
export function updateRoutingGraph(routingGraph, audioState) {
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
    node[key] = params[key];
  }

  return node;
}