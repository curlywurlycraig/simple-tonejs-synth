/**
 * Given an audio routing graph and the json representation of an
 * audio routing graph, update the routing graph in place.
 *
 * TODO: Substantially test the behaviour of this function
 *       when it is known how to use Web Audio in Jest tests
 */
export function updateRoutingGraph(actualGraph, reprGraph) {
  // construct a new output node if one exists
  if (reprGraph.outputNode !== undefined && Object.keys(reprGraph.outputNode).length !== 0) {
    actualGraph.outputNode = updateNodeToRepresentation(
      actualGraph.outputNode,
      reprGraph.outputNode,
      actualGraph.context
    );

    if (actualGraph.outputNode._node) {
      actualGraph.outputNode._node.connect(actualGraph.context.destination);
    }
  }

  Object.keys(reprGraph.nodes).forEach(reprNodeKey => {
    const reprNode = reprGraph.nodes[reprNodeKey];
    const actualNode = actualGraph.nodes[reprNodeKey];

    let updatedNode;
    if (!actualNode) {
      updatedNode = newNodeFromRepresentation(reprNode, actualGraph.context);
    } else {
      updatedNode = updateNodeWithParams(actualNode._node, reprNode.params);
    }

    actualGraph.nodes[reprNodeKey] = {
      ...reprNode,
      _node: updatedNode
    };
  });

  Object.keys(actualGraph.nodes).forEach(nodeKey => {
    const node = actualGraph.nodes[nodeKey];
    node.connectedTo.forEach(connectId => {
      // TODO: Pull out 'OUTPUT' etc into constants and be consistent.
      // Formulate a model for node names!
      // TODO: Error handling better. Inform the user and such
      if (connectId === 'OUTPUT') {
        node._node.connect(actualGraph.outputNode._node);
      } else if (connectId && actualGraph.nodes[connectId]) {
        node._node.connect(actualGraph.nodes[connectId]._node);
      }
    })
  });
}

function updateNodeToRepresentation(routingGraphNode, nodeRepresentation, context) {
  if (routingGraphNode._node === undefined) {
    const newRoutingGraphNode = {...nodeRepresentation};
    newRoutingGraphNode._node = newNodeFromRepresentation(
      nodeRepresentation,
      context
    );
    return newRoutingGraphNode
  }

  return routingGraphNode;
}

function newNodeFromRepresentation(nodeRepr, context) {
  switch (nodeRepr.type) {
    case 'gain':
      return updateNodeWithParams(new GainNode(context), nodeRepr.params);
    case 'oscillator': {
      const oscillator = new OscillatorNode(context);
      oscillator.type = nodeRepr.waveform;
      updateNodeWithParams(oscillator, nodeRepr.params);
      oscillator.start();
      return oscillator;
    }
    default:
      return null;
  }
}

function updateNodeWithParams(node, params) {
  for (var key in params) {
    node[key].value = params[key];
  }

  return node;
}

/**
 * Creates a routing graph which is ready to accept population from a representation.
 */
export function createInitialRoutingGraph() {
  let context;

  if (!window.audioContextInstance) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if (window.AudioContext) {
      context = new AudioContext();
    } else {
      throw new Error('Web Audio API is not supported');
    }
  }

  return {
    context,
    nodes: {},
    outputNode: {}
  };
}