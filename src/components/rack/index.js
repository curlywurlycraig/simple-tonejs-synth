import React from 'react';

import AddUnitButton from '../addUnitButton';
import Unit from '../unit';
import './styles.css';

function Rack(props) {
  const units = props.units.map(unit => (
    <Unit unit={unit} />
  ));

  return (
    <div className='RackContainer'>
      { units }
      <AddUnitButton />
    </div>
  )
}

export default Rack;