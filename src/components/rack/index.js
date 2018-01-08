import React from 'react';

import AddUnitButton from '../addUnitButton';
import Unit from '../unit';
import './styles.css';

function Rack(props) {
  const units = props.rack.units.map(unit => (
    <Unit unit={unit} />
  ));

  return (
    <div className='RackContainer'>
      { units }
      <AddUnitButton onClick={() => props.onAddUnitClick(unit.id, )} />
    </div>
  )
}

export default Rack;