import {convertNoteToFrequency} from '../../utils';

function createNewOscillators(routingGraph, racks) {
  const knownInstrumentIds = Object.keys(this.knownInstruments);

  Object.values(nextProps.instruments).forEach(instrument => {
    const isNewInstrument = !knownInstrumentIds[instrument.id];

    if (isNewInstrument) {
      const oscillator = nextProps.audioManager.context.createOscillator();
      oscillator.type = instrument.waveform;

      // we only start here, connection happens later
      oscillator.start();

      this.knownInstruments[instrument.id] = {
        oscillator: oscillator,
        representation: {...instrument}
      };
    }
  });
}

/**
  * TODO This could absolutely be generalised
  * @param nextProps
  */
function updateExistingOscillators(routingGraph, racks) {
  Object.values(racks.instruments).forEach(instrument => {
    const knownInstrument = this.knownInstruments[instrument.id];

    // waveform changes
    if (knownInstrument.representation.waveform !== instrument.waveform) {
      knownInstrument.oscillator.type = instrument.waveform;
      knownInstrument.representation.waveform = instrument.waveform;
    }

    // note changes
    if (instrument.note !== null && knownInstrument.representation.note === null) {
      knownInstrument.oscillator.frequency.value = convertNoteToFrequency(instrument.note);
      knownInstrument.oscillator.connect(nextProps.audioManager.masterGainNode);
    } else if (instrument.note === null && knownInstrument.representation.note !== null) {
      knownInstrument.oscillator.disconnect(nextProps.audioManager.masterGainNode);
    }

    knownInstrument.representation.note = instrument.note;
  });
}

/**
 * Given an audio routing graph and the json representation of an
 * audio routing graph, update the routing graph in place.
 */
export function updateRoutingGraph(graph, racks) {

}
