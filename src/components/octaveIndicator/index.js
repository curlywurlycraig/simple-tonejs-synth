import React from "react";
import classnames from "classnames";
import "./styles.css";

class OctaveIndicator extends React.Component {
  renderIndicators = () => {
    const indicators = [];
    for (var i=this.props.maxOctave; i>=this.props.minOctave; i--) {
      const immutableI = i;
      indicators.push(
        <button key={immutableI} onClick={() => this.props.onOctaveClick(immutableI)} className="OctaveIndicator__Container">
          <div className={classnames("OctaveIndicator", {
            "OctaveIndicator__Active": immutableI === this.props.currentOctave
          })}>
          </div>
        </button>
      )
    }

    return indicators;
  };

  render() {
    return (
      <div className="OctaveIndicator__OuterContainer">
        <p className="OctaveIndicator__LabelTop">]</p>
        {this.renderIndicators()}
        <p className="OctaveIndicator__LabelBottom">[</p>
      </div>
    );
  }
}

export default OctaveIndicator;
