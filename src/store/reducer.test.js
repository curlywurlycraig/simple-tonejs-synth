import reducer from './reducer';
import {toggleMuted, addRack, removeRack, addUnit, addNode} from './actions';

describe('mute action', () => {
  it('sets the audio to muted when unmuted', () => {
    const prevState = {
      audio: {
        muted: false,
      },
    };
    
    const state = reducer(prevState, toggleMuted());
    
    expect(state).toEqual({
      audio: {
        muted: true,
      }
    });
  });

  it('sets the audio to unmuted when muted', () => {
    const prevState = {
      audio: {
        muted: true,
      },
    };

    const state = reducer(prevState, toggleMuted());

    expect(state).toEqual({
      audio: {
        muted: false,
      },
    });
  })
});

describe('add rack action', () => {
  it('adds a new rack to the racks', () => {
    const prevState = {
      audio: {
        racks: [],
      },
    };

    const state = reducer(prevState, addRack());

    expect(state).toEqual({
      audio: {
        racks: [{
          units: [],
        }],
      },
    });
  });
});

describe('remove rack action', () => {
  it('removes the rack at the given index', () => {
    const prevState = {
      audio: {
        racks: [{
          units: [],
        }, {
          units: [],
        }],
      },
    };

    const state = reducer(prevState, removeRack(1));

    expect(state).toEqual({
      audio: {
        racks: [{
          units: [],
        }],
      },
    });
  })
});

describe('add unit to rack action', () => {
  it('appends a new unit to the rack', () => {
    const prevState = {
      audio: {
        racks: [{
          units: [],
        }]
      }
    };

    const newUnit = {
      nodes: {
        gain: {
          type: 'gain',
          props: {
            gain: 0.5,
          },
        },
      },
    };

    const state = reducer(prevState, addUnit(0, newUnit));

    expect(state).toEqual({
      audio: {
        racks: [{
          units: [newUnit,]
        }]
      }
    });
  });
});

describe('add node to unit rack action', () => {
  it('adds the node to the appropriate unit in the appropriate rack', () => {
    const prevState = {
      audio: {
        racks: [{
          units: [{
            nodes: {},
          }]
        }]
      }
    };

    const newNode = {
      gain: {
        type: 'gain',
        props: {
          gain: 0.5
        }
      }
    };

    const state = reducer(prevState, addNode(0, 0, newNode));

    expect(state).toEqual({
      audio: {
        racks: [{
          units: [{
            nodes: {
              gain: {
                type: 'gain',
                props: {
                  gain: 0.5
                }
              }
            }
          }]
        }]
      }
    });
  })
});