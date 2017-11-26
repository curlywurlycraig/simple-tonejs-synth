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
      return <a
        className="KeyboardWhiteKey"
        onMouseDown={() => this.props.onKeyOn(keyIndex)}
        onMouseUp={() => this.props.onKeyOff(keyIndex)}>
        {notes[keyIndex]}
      </a>
    })
  }

  displayBlackKeys() {
    // TODO
    return null;
  }

  onClick(e) {
    console.log('yeah ', e);
  }
}

export default Keyboard;