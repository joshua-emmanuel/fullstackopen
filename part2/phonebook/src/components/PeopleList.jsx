import Person from "./Person";

const PeopleList = ({ people, onDeletePerson }) => {
  return (
    <>
      {people.map((person) => (
        <Person
          key={person.name}
          person={person}
          onDeletePerson={onDeletePerson}
        ></Person>
      ))}
    </>
  );
};

export default PeopleList;
