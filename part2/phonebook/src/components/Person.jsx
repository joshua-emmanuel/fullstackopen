const Person = ({ person, onDeletePerson }) => {
  return (
    <p>
      <span>
        {person.name} {person.number}
      </span>
      <button onClick={() => onDeletePerson(person.id)}>delete</button>
    </p>
  );
};

export default Person;
