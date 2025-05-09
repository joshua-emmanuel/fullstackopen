import { useEffect, useState } from "react";

function useDebouncedQuery(query, delay) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(
    function () {
      const intervalId = setInterval(function () {
        setDebouncedQuery(query);
      }, delay);

      return function () {
        clearInterval(intervalId);
      };
    },
    [query, delay]
  );

  return debouncedQuery;
}

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedQuery(query, 1000);
  const [result, setResult] = useState(null);
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
          const data = await res.json();

          const filteredCountries = data.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(debouncedQuery.toLowerCase())
          );

          if (filteredCountries.length > 10)
            throw new Error("Too many matches, specify another filter");

          if (filteredCountries.length === 0)
            throw new Error(
              `No match found with the query '${debouncedQuery}'`
            );

          if (filteredCountries.length === 1) {
            setResult(filteredCountries);
            return;
          }

          const countryNames = filteredCountries.map(
            (country) => country.name.common
          );
          setResult(countryNames);
        } catch (error) {
          // To ignore signal was aborted without reason error when user types fast and query isn't debounced
          // if (error.name === "AbortError") return;
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length > 0) {
        setResult(null);
        setIsLoading(true);
        setError("");
        findCountry();
      }

      return function () {
        controller.abort();
      };
    },
    [debouncedQuery]
  );

  function showCountry(countryName) {
    setQuery(countryName);
  }

  return (
    <div>
      <div>
        <label htmlFor="search">Find countries</label>{" "}
        <input
          type="text"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && result?.length > 1
          ? result?.map((r) => (
              <div key={r}>
                <span>{r}</span>{" "}
                <button onClick={() => showCountry(r)}>Show</button>
              </div>
            ))
          : result?.length === 1 && (
              <>
                <div>
                  <h2>{result[0].name.common}</h2>
                  <p>capital {result[0].capital}</p>
                  <p>area {result[0].area}</p>

                  <h3>languages:</h3>
                  <ul>
                    {Object.values(result[0]?.languages).map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>

                  <img src={result[0].flags.png} alt={result[0].flags.alt} />
                </div>
              </>
            )}
      </div>
    </div>
  );
}
