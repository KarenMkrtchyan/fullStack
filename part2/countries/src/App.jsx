import { useState, useEffect } from "react";
import axios from "axios";
const weatherAPIKey = import.meta.env.VITE_WEATHER_KEY;

const CountryWeather = ({ weather, country }) => {
	if (weather !== null) {
		console.log(weather.weather[0].icon);
		return (
			<div>
				<h2>Weather in {country.capital}</h2>
				<p>Temperature is {weather.main.temp}° Celsius</p>
				<img
					src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
				></img>
				<p>wind {weather.wind.speed}</p>
			</div>
		);
	}
	return <div>Fetching...</div>;
};

const CountryDetail = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const [lat, lon] = country.latlng;

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`
			)
			.then((response) => {
				//console.log(response.data);
				setWeather(response.data);
			});
	}, []);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>
				<p>Capital is {country.capital}</p>
				<p>Area is {country.area} square kilometers</p>
			</div>
			<h2>Languages</h2>
			<ul>
				{Object.entries(country.languages).map(([langKey, langValue]) => {
					return <li key={langKey}>{langValue}</li>;
				})}
			</ul>
			<img src={country.flags.png}></img>
			<CountryWeather country={country.name.common} weather={weather} />
		</div>
	);
};

const CountryList = ({ countries, specificCountry, setSpecificCountry }) => {
	if (countries.length === 0) {
		return <div>No Matches</div>;
	} else if (countries.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	} else if (countries.length === 1) {
		return <CountryDetail country={countries[0]} />;
	} else {
		if (!specificCountry) {
			return (
				<ul>
					{countries.map((country) => {
						return (
							<li key={country.name.common}>
								{country.name.common}{" "}
								<button
									onClick={() => {
										return setSpecificCountry(country);
									}}
								>
									Show More{" "}
								</button>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return <CountryDetail country={specificCountry} />;
		}
	}
};

function App() {
	const [country, setCountry] = useState("");
	const [countryList, setCountryList] = useState([]);
	const [allCountries, setAllCountries] = useState([]);
	const [specificCountry, setSpecificCountry] = useState(null);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				setAllCountries(response.data);
			});
	}, []);

	const handleChange = (event) => {
		setCountry(event.target.value);
		setSpecificCountry(null);
		const list = allCountries.filter((countryF) => {
			return countryF.name.common
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});
		setCountryList(list);
	};
	return (
		<>
			<div>
				<label htmlFor="countryName">Find countries:</label>
				<input
					name="countryName"
					onChange={handleChange}
					value={country}
				></input>
			</div>
			<div>
				<CountryList
					specificCountry={specificCountry}
					countries={countryList}
					setSpecificCountry={setSpecificCountry}
				/>
			</div>
		</>
	);
}

export default App;
