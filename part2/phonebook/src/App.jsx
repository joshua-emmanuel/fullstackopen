import axios from "axios";
import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import PeopleList from "./components/PeopleList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      alert("Please make sure all fields are filled");
      return;
    }
    const nameInPersons = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    if (nameInPersons) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons((person) => [...person, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        onAddPerson={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <PeopleList people={filteredPeople} />
    </div>
  );
};

export default App;
