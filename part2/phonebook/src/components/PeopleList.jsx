import Person from "./Person";

const PeopleList = ({ people }) => {
  return (
    <>
      {people.map((person) => (
        <Person key={person.name} person={person}></Person>
      ))}
    </>
  );
};

export default PeopleList;
