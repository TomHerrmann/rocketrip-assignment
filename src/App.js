import React, { Component } from 'react';
import './App.css';
import AllCountries from './components/AllCountries'
import CountriesInContinent from './components/CountriesInContinent'
import Country from './components/Country'

class App extends Component {
  constructor() {
    super();
    this.state = {
      capital: null,
      countryByCode: null,
      countryByContinent: null,
      currencyCode: null,
      displayContent: 'AllCountries',
      iso3: null,
      phone: null,
      selectedCountryCode: null,
      selectedContinent: null,
    };
    this.fetchCountryData = this.fetchCountryData.bind(this);
    this.displayAll = this.displayAll.bind(this)
    this.continentDropDownHandler = this.continentDropDownHandler.bind(this);
    this.countryDropDownHandler = this.countryDropDownHandler.bind(this)
  }

  async fetchCountryCodes() {
      const countryByCode = await fetch('api/names')
      const result = await countryByCode.json()
      this.setState({ countryByCode: result })
  }

  async fetchCountryByContinent() {
    const countryByContinent = await fetch('api/continent')
    const result = await countryByContinent.json()
    this.setState({ countryByContinent: result })
  }

  async fetchCountryData(country) {
    const iso3Promise = await fetch('api/iso3')
    const iso3 = await iso3Promise.json()

    const capitalPromise = await fetch('api/capital')
    const capital = await capitalPromise.json()

    const phonePromise = await fetch('api/phone')
    const phone = await phonePromise.json()

    const currencyPromise = await fetch('api/currency')
    const currencyCode = await currencyPromise.json();

    this.setState({ selectedCountryCode: country, displayContent: 'Country', iso3, capital, phone, currencyCode })
  }

  displayAll() {
    this.setState({ displayContent: 'AllCountries' })
  }

  continentDropDownHandler(event) {
    const selectedContinent = event.target.value

    if (selectedContinent === '') return this.displayAll()

    this.setState({ selectedContinent, displayContent: 'Continent' })
  }

  countryDropDownHandler(event) {
    const selectedCountryCode = event.target.value

    if (selectedCountryCode === '') return this.displayAll()

    this.fetchCountryData(selectedCountryCode)
  }

  componentDidMount() {
    this.fetchCountryCodes();
    this.fetchCountryByContinent();
  }

  render() {

    const {
      capital,
      countryByCode,
      countryByContinent,
      currencyCode,
      iso3,
      displayContent,
      phone,
      selectedCountryCode,
      selectedContinent
    } = this.state

    const continents = {
      AF: [],
      AS: [],
      EU: [],
      NA: [],
      OC: [],
      SA: [],
    }

    if (countryByCode && countryByContinent) {
      for (let code in countryByContinent) {
        switch (countryByContinent[code]) {
          case 'AF':
            continents.AF.push(countryByCode[code])
            break;
          case 'AS':
            continents.AS.push(countryByCode[code])
            break;
          case 'EU':
            continents.EU.push(countryByCode[code])
            break;
          case 'NA':
            continents.NA.push(countryByCode[code])
            break;
          case 'OC':
            continents.OC.push(countryByCode[code])
            break;
          case 'SA':
            continents.SA.push(countryByCode[code])
            break;
          default:
            break;
        }
      }
    }


    let currentDisplay

    switch (displayContent) {
      case 'AllCountries':
        currentDisplay = <AllCountries
          continents={continents}
        />
        break;
      case 'Continent':
        currentDisplay = <CountriesInContinent
          selectedContinent={selectedContinent}
          continents={continents}
        />
        break;
      case 'Country':
        currentDisplay = <Country
          selectedCountryCode={selectedCountryCode}
          countryByCode={countryByCode}
          countryByContinent={countryByContinent}
          iso3={iso3}
          capital={capital}
          phone={phone}
          currencyCode={currencyCode}
        />
        break;
      default:
        currentDisplay = <AllCountries
          continents={continents}
        />
        break;
    }

    return (
      <div className="App">
        <h1> Country Data </h1>
        <div id="region-selectors-wrapper">
          <label htmlFor="continet">Select a Continent</label>
          <select id="continent" className="dropdown" onChange={this.continentDropDownHandler}>
            <option value="">(All)</option>
            <option value="AF">Africa</option>
            <option value="AS">Asia</option>
            <option value="EU">Europe</option>
            <option value="NA">North America</option>
            <option value="OC">Oceania</option>
            <option value="SA">South America</option>
          </select>
          <label htmlFor="country">Select a Country</label>
          <select id="country" className="dropdown" onChange={this.countryDropDownHandler}>
            <option value="">(All)</option>
            {countryByCode ? Object.keys(countryByCode).map(code => {
              return <option value={code} key={code}>{countryByCode[code]}</option>
            }) : null}
          </select>
        </div>
        <div id="app-display">
          {currentDisplay}
        </div>
      </div>
    );
  }
}

export default App;
