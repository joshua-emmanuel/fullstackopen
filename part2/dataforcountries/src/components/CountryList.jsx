import { useState, useEffect } from "react";
import Country from "./Country";
import CountryInfo from "./CountryInfo";

export default function CountryList({
  query,
  setQuery,
  selectedCountry,
  setSelectedCountry,
}) {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function findCountry() {
        try {
          const res = await fetch(
            "https://studies.cs.helsinki.fi/restcountries/api/all",
            { signal }
          );
          if (!res.ok)
            throw new Error(
              "Something went wrong with fetching the countries..."
            );
          const data = await res.json();

          const filteredCountries = data.filter((country) =>
            selectedCountry
              ? country.name.common.toLowerCase() ===
                selectedCountry.toLowerCase()
              : country.name.common.toLowerCase().includes(query.toLowerCase())
          );

          if (filteredCountries.length > 10)
            throw new Error("Too many matches, specify another filter");

          if (filteredCountries.length === 0)
            throw new Error(`No match found with the query '${query}'`);

          if (filteredCountries.length === 1) {
            setCountries(filteredCountries);
            return;
          }

          const countryNames = filteredCountries.map(
            (country) => country.name.common
          );
          setCountries(countryNames);
        } catch (error) {
          /**** To ignore signal was aborted without reason error when user types fast and query isn't debounced ****/
          if (error.name === "AbortError") return;
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length > 0 || selectedCountry) {
        setCountries(null);
        setIsLoading(true);
        setError("");
        findCountry();
      }

      return function () {
        controller.abort();
      };
    },
    [query, selectedCountry]
  );

  function showCountry(countryName) {
    setSelectedCountry(countryName);
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>📛 {error}</p>}
      {!isLoading && !error && countries?.length > 1
        ? countries?.map((item) => (
            <Country
              key={item}
              countryName={item}
              onShowCountry={showCountry}
            />
          ))
        : countries?.length === 1 && <CountryInfo country={countries[0]} />}
    </div>
  );
}
