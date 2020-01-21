import React from 'react';
import ContinentEnums from '../enums/ContinentEnums';

const AllCountries = ({ continents }) => {
  return (
    <div className="all-continents">
      <div className="continent-wrapper" id="Asia">
        <h2>Asia</h2>
        <ul>
          {continents.AS.map(elem => <li key={elem}>{elem}</li>)}
        </ul>
      </div>
      <div className="continent-wrapper" id="Europe">
        <h2>Europe</h2>
        <ul>
          {continents.EU.map(elem => <li key={elem}>{elem}</li>)}
        </ul>
      </div>
      <div className="continent-wrapper" id="North America">
        <h2>North America</h2>
        <ul>
          {continents.NA.map(elem => <li key={elem}>{elem}</li>)}
        </ul>
      </div>
      <div className="continent-wrapper" id="Oceania">
        <h2>Oceania</h2>
        <ul>
          {continents.OC.map(elem => <li key={elem}>{elem}</li>)}
        </ul>
      </div>
      <div className="continent-wrapper" id="South America">
        <h2>South America</h2>
        <ul>
          {continents.SA.map(elem => <li key={elem}>{elem}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default AllCountries