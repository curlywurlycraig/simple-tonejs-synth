import React, { Component } from 'react';
import { connect } from 'react-redux';

import './res/font-awesome/css/font-awesome.min.css';
import './app.css';
import AudioManager from './components/audioManager';
import AddRackButton from './components/addRackButton';
import Rack from './components/rack';
import { addRack } from './store/actions';

class App extends Component {
  renderRacks() {
    return Object.values(this.props.racks).map(rack => {
      return <Rack
        rack={rack}
      />;
    });
  }

  render() {
    return (
      <div className="AppContainer">
        <AudioManager></AudioManager>

        <div className="AppRacks">
          {this.renderRacks()}
          <AddRackButton
            onAddRackClick={this.props.addRack}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  audio: state.audio,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addRack: () => dispatch(addRack()),
  }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
