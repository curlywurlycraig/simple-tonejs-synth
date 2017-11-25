import React, { Component } from 'react';
import { connect } from 'react-redux';

import Instrument from './components/instrument';
import MuteUnmute from './components/mutedToggle';
import './res/font-awesome/css/font-awesome.min.css';
import './app.css';
import {toggleMuted} from './store/actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AppContainer">
        <div className="AppHeader">
          <MuteUnmute
            onToggle={this.props.toggleMuted}
            muted={this.props.muted}
          />
        </div>

        <div className="AppWorkspace">
          <Instrument audio={this.props.audio} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  muted: state.muted,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMuted: () => dispatch(toggleMuted())
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
