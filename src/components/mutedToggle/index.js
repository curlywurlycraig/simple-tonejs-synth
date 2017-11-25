import React, { Component } from 'react';

import './styles.css';

class MutedToggle extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const iconClasses = this.props.muted ?
      "ToggleButtonIcon ToggleButtonIcon__Muted fa fa-volume-off" :
      "ToggleButtonIcon ToggleButtonIcon__Unmuted fa fa-volume-up";

    return (
      <button className="MutedToggleButton" onClick={this.props.onToggle}>
        <i className={iconClasses}></i>
      </button>
    );
  }
}

export default MutedToggle;