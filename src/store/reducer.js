import {
  CREATE_INSTRUMENT,
  INIT_AUDIO_MANAGER_PENDING,
  INIT_AUDIO_MANAGER_SUCCESS,
  TOGGLE_MUTED,
  NOTE_ON,
  NOTE_OFF,
  SET_WAVEFORM,
  ADD_RACK,
  REMOVE_RACK,
  ADD_UNIT,
  ADD_NODE,
} from './constants';

const defaultState = {
  audio: {
    racks: [],
    outputNode: {},
  },
};

export default function reducer(prevState = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MUTED:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          muted: !prevState.audio.muted,
        }
      };
    case ADD_RACK:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          racks: [
            ...prevState.audio.racks,
            {
              units: [],
            }
          ]
        }
      };
    case REMOVE_RACK: {
      const newRacks = prevState.audio.racks.filter((rack, index) => {
        if (index === action.index) {
          return false;
        }

        return true;
      });

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          racks: newRacks,
        },
      };
    }
    case ADD_UNIT: {
      const newRacks = prevState.audio.racks.map((rack, index) => {
        if (index === action.rackIndex) {
          return {
            ...rack,
            units: [
              ...rack.units,
              action.unit,
            ]
          };
        }

        return rack;
      });

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          racks: newRacks,
        }
      };
    }
    case ADD_NODE:
      const newRacks = prevState.audio.racks.map((rack, rackIndex) => {
        if (rackIndex !== action.rackIndex) {
          return rack;
        }

        const newUnits = rack.units.map((unit, unitIndex) => {
          if (unitIndex !== action.unitIndex) {
            return unit;
          }

          return {
            ...unit,
            nodes: {
              ...unit.nodes,
              ...action.node,
            }
          };
        });

        return {
          ...rack,
          units: newUnits,
        };
      });

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          racks: newRacks,
        }
      };
    case INIT_AUDIO_MANAGER_PENDING:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          state: 'pending',
        }
      };
    case INIT_AUDIO_MANAGER_SUCCESS:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          state: 'success',
          manager: action.audioManager,
        },
      };
    default:
      return prevState;
  }
}