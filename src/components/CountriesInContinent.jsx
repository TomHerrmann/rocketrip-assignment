import React from 'react';
import ContinentEnums from '../enums/ContinentEnums';

const CountriesInContinent = ({ continents, selectedContinent }) => {
  return (
    <div className="all-continents">
      <div className="continent-wrapper" id={ContinentEnums[selectedContinent]}>
        <h2>{ContinentEnums[selectedContinent]}</h2>
        <ul>
          {continents[selectedContinent].map(country => <li>{country}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default CountriesInContinent