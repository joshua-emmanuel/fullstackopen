import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

function useDebouncedQuery(query, delay) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(
    function () {
      const timeoutId = setTimeout(function () {
        setDebouncedQuery(query);
      }, delay);

      return function () {
        clearTimeout(timeoutId);
      };
    },
    [query, delay]
  );

  return debouncedQuery;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const debouncedQuery = useDebouncedQuery(query, 1000);

  function handleInputChange(e) {
    setSelectedCountry(null);
    setQuery(e.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor="search">Find countries</label>{" "}
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <CountryList
        query={debouncedQuery}
        setQuery={setQuery}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}
