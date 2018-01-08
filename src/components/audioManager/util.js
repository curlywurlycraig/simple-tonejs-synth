/**
 * Given an audio routing graph and the json representation of an
 * audio routing graph, update the routing graph in place.
 *
 * TODO: Substantially test the behaviour of this function
 *       when it is known how to use Web Audio in Jest tests
 */
export function updateRoutingGraph(actualGraph, reprGraph) {
  // construct a new output node if one exists
  if (reprGraph.outputNode && Object.keys(reprGraph.outputNode).length !== 0) {
    actualGraph.outputNode = updateNodeToRepresentation(
      actualGraph.outputNode,
      reprGraph.outputNode,
      actualGraph.context
    );

    if (actualGraph.outputNode._node) {
      actualGraph.outputNode._node.connect(actualGraph.context.destination);
    }
  }

  reprGraph.racks.forEach(reprRack => {
    let actualRack = actualGraph.racks.find(actualRackCandidate => {
      return actualRackCandidate.id === reprRack.id;
    });

    if (!actualRack) {
      actualRack = {
        id: reprRack.id,
        units: []
      };
      actualGraph.racks.push(actualRack);
    }

    reprRack.units.forEach((reprUnit, reprUnitIndex) => {
      let actualUnit = actualRack.units.find(actualUnitCandidate => {
        return actualUnitCandidate.id === reprUnit.id;
      });

      if (!actualUnit) {
        actualUnit = {
          id: reprUnit.id,
          nodes: {},
        };
        actualRack.units.push(actualUnit);
      }

      Object.keys(reprUnit.nodes).forEach(reprNodeKey => {
        // TODO: What if the node we want to connect to doesn't exist?
        // Answer: we should construct all the nodes before we perform the connections.

        // TODO: There's a better way to iterate over key/value pairs of an object.
        // I'm sure MDN has something to say about it.
        const reprNode = reprUnit.nodes[reprNodeKey];
        const actualNode = actualUnit.nodes[reprNodeKey];

        let updatedNode;
        if (!actualNode) {
          updatedNode = newNodeFromRepresentation(reprNode)
        } else {
          updatedNode = updateNodeWithParams(actualNode._node, reprNode.params);
        }

        actualUnit.nodes[reprNodeKey] = {
          ...reprNode,
          _node: updatedNode
        };
      })
    })
  });

  actualGraph.racks.forEach(rack => {
    rack.units.forEach((unit, unitIndex) => {
      Object.keys(unit.nodes).forEach(nodeKey => {
        const node = unit.nodes[nodeKey];
        node.connectedTo.forEach(connectId => {
          // TODO: Pull out 'OUTPUT' etc into constants and be consistent.
          // Formulate a model for node names!
          // TODO: Error handling better. Inform the user and such
          if (connectId === 'OUTPUT' && unitIndex === rack.units.length - 1) {
            node._node.connect(actualGraph.outputNode._node);
          } else if (connectId === 'OUTPUT') {
            node._node.connect(rack.units[unitIndex + 1].nodes.INPUT._node);
          } else if (connectId && unit.nodes[connectId]) {
            node._node.connect(unit.nodes[connectId]._node);
          }
        })
      })
    });
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

/**
 * TODO: Consider actually having the constructor as part of the redux state
 *
 * i.e. the nodeRepr could contain:
 * {
 *   nodeConstructor: GainNode
 * }
 *
 * and then this function can simply call nodeRepr.nodeConstructor(context).
 *
 * Probably not worth it though, because this list of nodes won't really grow.
 *
 * Challenge the above though! What about custom node types? Baby steps.
 *
 * @param {*} nodeRepr
 * @param {*} context
 */
function newNodeFromRepresentation(nodeRepr, context) {
  switch (nodeRepr.type) {
    case 'gain':
      return updateNodeWithParams(new GainNode(context), nodeRepr.params);
    case 'oscillator':
      return updateNodeWithParams(new OscillatorNode(context), nodeRepr.params);
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
    racks: [],
    outputNode: {}
  };
}