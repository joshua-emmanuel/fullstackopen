export default function Country({ countryName, onShowCountry }) {
  return (
    <div>
      <span>{countryName}</span>{" "}
      <button onClick={() => onShowCountry(countryName)}>Show</button>
    </div>
  );
}
