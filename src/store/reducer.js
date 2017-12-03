import {
  CREATE_INSTRUMENT,
  INIT_AUDIO_MANAGER_PENDING,
  INIT_AUDIO_MANAGER_SUCCESS,
  TOGGLE_MUTED,
  NOTE_ON,
  NOTE_OFF,
} from './constants';

const defaultState = {
  audio: {
    muted: false,
    manager: null,
    state: null,
    instruments: [],
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
    case CREATE_INSTRUMENT:
      const highestId = prevState.audio.instruments.reduce((accumulator, instrument) => {
        return Math.max(accumulator, instrument.id);
      }, -1);

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          instruments: [
            ...prevState.audio.instruments,
            {
              id: highestId + 1,
              note: null,
            }
          ]
        }
      };
    case NOTE_ON: {
      const newInstrumentsArray = prevState.audio.instruments.map(instrument => {
        if (instrument.id === action.instrumentId) {
          return {
            ...instrument,
            note: action.note,
          };
        }
      });

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          instruments: newInstrumentsArray,
        }
      };
    }
    case NOTE_OFF: {
      const newInstrumentsArray = prevState.audio.instruments.map(instrument => {
        if (instrument.id === action.instrumentId) {
          return {
            ...instrument,
            note: null,
          };
        }
      });

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          instruments: newInstrumentsArray,
        }
      };
    }
    default:
      return prevState;
  }
}