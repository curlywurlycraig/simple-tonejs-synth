import React from 'react';

import './styles.css';

function AddInstrumentButton(props) {
  return (
    <div className="AddInstrumentButtonContainer">
      <div
        onClick={props.onAddInstrumentClick}
        className="AddInstrumentButtonBorder">
        <a
          className="AddInstrumentButtonText"
        >
          +
        </a>
      </div>
    </div>
  );
}

export default AddInstrumentButton;