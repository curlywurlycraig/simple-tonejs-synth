import React, { Component } from 'react';
import './styles.css';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick(e) {
    this.props.createInstrument();
  }

  render() {
    return (
      <div className="InstrumentContainer">
        <div className="InstrumentHeader">
          <p>Instrument</p>
        </div>

        <div className="InstrumentBody">
          <button onClick={this.handleClick.bind(this)}>
            Click me.
          </button>
        </div>

      </div>
    );
  }
}

export default Instrument;
