import React from 'react';

import './styles.css';

function MutedToggle(props) {
  const iconClasses = props.muted ?
    "ToggleButtonIcon ToggleButtonIcon__Muted fa fa-volume-off" :
    "ToggleButtonIcon ToggleButtonIcon__Unmuted fa fa-volume-up";

  return (
    <button className="MutedToggleButton" onClick={props.onToggle}>
      <i className={iconClasses}></i>
    </button>
  );
}

export default MutedToggle;