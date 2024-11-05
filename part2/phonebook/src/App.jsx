// import axios from "axios";
import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import PeopleList from "./components/PeopleList";
import phoneBookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    phoneBookService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      alert("Please make sure all fields are filled");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const personInPhoneBook = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (personInPhoneBook) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one`
      );
      if (confirmUpdate) {
        phoneBookService
          .updateEntry(personInPhoneBook.id, newPerson)
          .then((updatedPerson) =>
            setPersons((persons) =>
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            )
          );
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    phoneBookService.createEntry(newPerson).then((person) => {
      setPersons((persons) => persons.concat(person));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}`);
    if (!confirmDelete) return;
    phoneBookService
      .deleteEntry(id)
      .then((deletedPerson) =>
        setPersons((persons) =>
          persons.filter((person) => person.id !== deletedPerson.id)
        )
      );
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
      <PeopleList people={filteredPeople} onDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
