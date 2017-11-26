import React from 'react';

import './styles.css';

const notes = 'CDEFGAB';

class Keyboard extends React.PureComponent {
  render() {
    return (
      <div className="KeyboardContainer">
        {this.displayWhiteKeys()}
        {this.displayBlackKeys()}
      </div>
    )
  }

  displayWhiteKeys() {
    return [...Array(7).keys()].map(keyIndex => {
      return <div className="KeyboardWhiteKey">
        {notes[keyIndex]}
      </div>
    })
  }

  displayBlackKeys() {
    // TODO
    return null;
  }
}

export default Keyboard;