const PersonForm = ({
  onAddPerson,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name: <input type="text" value={newName} onChange={onNameChange} />
      </div>
      <div>
        number:{" "}
        <input type="text" value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
