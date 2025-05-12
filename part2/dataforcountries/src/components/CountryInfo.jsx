import Weather from "./Weather";

export default function CountryInfo({ country }) {
  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <span>Capital {country.capital}</span>
        <br />
        <span>Area {country.area}</span>

        <h3>Languages</h3>
        <ul>
          {Object.values(country?.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt} />
      </div>

      <Weather city={country.capital} />
    </div>
  );
}
