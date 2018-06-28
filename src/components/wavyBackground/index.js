import React from "react";

function createWavyD(width, height, xSpacing, wavelength, amplitude) {
  let d = '';

  const columnCount = Math.ceil(width / (xSpacing + amplitude));
  console.log('column count is ', columnCount);

  for (let column = 0; column < columnCount; column++) {
    const xPos = column * (xSpacing + amplitude);
    let columnD = `M ${xPos},0
      q ${amplitude},${wavelength/4} 0,${wavelength/2}
    `;

    for (let yPos = wavelength/4; yPos <= height; yPos += wavelength/4) {
      columnD += `
        t 0,${wavelength/2}
      `;
    }

    d += columnD;
  }

  return d;
}

function wavyBackground(props) {
  const {
    width,
    height,
    dashLength,
    xSpacing,
    wavelength,
    amplitude
  } = props;

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>

      <path
        fill="none"
        stroke="rebeccapurple"
        dashArray="4"
        d={createWavyD(width, height, xSpacing, wavelength, amplitude)}
      />
    </svg>
  );
}

export default wavyBackground;