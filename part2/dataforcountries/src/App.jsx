import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

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
      <CountryList query={debouncedQuery} setQuery={setQuery} />
    </div>
  );
}
