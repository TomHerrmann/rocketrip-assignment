import React from 'react';
import { CURRENCY_HTML_CODES } from '../currencies'

const Country = ({ capital,
  countryByCode,
  countryByContinent,
  currencyCode,
  iso3,
  phone,
  selectedCountryCode }) => {

  const fullName = countryByCode[selectedCountryCode];

  const spaceToUnderscore = (string) => {
    return string.replace(/\s/g, '_')
  }

  return (
    <div className={selectedCountryCode}>
      <h2>{fullName}</h2>
      <div id="country-lists-wrapper">
        <ul>
          <li>Full Name: {fullName}</li>
          <li>Continent: {countryByContinent[selectedCountryCode]}</li>
          <li>ISO Code: {iso3[selectedCountryCode]}</li>
          <li>Capital: {capital[selectedCountryCode]}</li>
          <li>Phone Code: {phone[selectedCountryCode]}</li>
          <li>Currency Code: {currencyCode[selectedCountryCode]}</li>
          <li>Currency Symbol: {CURRENCY_HTML_CODES[currencyCode[selectedCountryCode]] || 'Not Found'}</li>
          <li>Flag: <img src={`https://www.countryflags.io/${selectedCountryCode}/flat/64.png`}></img></li>
          <li><a target="_blank" href={`https://en.wikipedia.org/wiki/${spaceToUnderscore(fullName)}`}>Wikipedia</a></li>
        </ul>
      </div>
    </div >
  )
}

export default Country