import { connect } from 'react-redux';

import Instrument from './pure.js';
import { createInstrument } from '../../store/actions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    createInstrument: () => dispatch(createInstrument())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Instrument);