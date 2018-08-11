import React from "react";
import classnames from "classnames"
import "./styles.css";

class OctaveIndicator extends React.Component {
  renderIndicators() {
    const indicators = [];
    for (var i=this.props.maxOctave; i>=this.props.minOctave; i--) {
      indicators.push(
        <div className="OctaveIndicator__Container">
          <div className={classnames("OctaveIndicator", {
            "OctaveIndicator__Active": i === this.props.currentOctave
          })}>
          </div>
        </div>
      )
    }

    return indicators;
  }

  render() {
    return (
      <div className="OctaveIndicator__OuterContainer">
        {this.renderIndicators()}
      </div>
    );
  }
}

export default OctaveIndicator;