import React from 'react';

import './styles.css';

function AddUnitButton(props) {
  return (
    <div className="AddUnitButtonContainer">
      <div
        onClick={props.onClick}
        className="AddUnitButtonBorder">
        <a
          className="AddUnitButtonText"
        >
          +
        </a>
      </div>
    </div>
  );
}

export default AddUnitButton;