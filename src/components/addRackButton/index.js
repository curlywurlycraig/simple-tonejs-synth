import React from 'react';

import './styles.css';

function AddRackButton(props) {
  return (
    <div className="AddRackButtonContainer">
      <div
        onClick={props.onAddRackClick}
        className="AddRackButtonBorder">
        <a
          className="AddRackButtonText"
        >
          +
        </a>
      </div>
    </div>
  );
}

export default AddRackButton;