const express = require("express");
const app = express();

app.use(express.json());

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people<\p>`;
  const date = `<p>${new Date().toString()}<\p>`;
  response.send(`${info}${date}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).json({
      error: "person not found",
    });
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const personIndex = persons.findIndex((person) => person.id === id);
  const person = persons[personIndex];
  if (!person) return response.status(404).json({ error: "person not found" });
  persons.splice(personIndex, 1);
  response.json(person);
});

function generateId() {
  return String(Math.floor(Math.random() * 999999));
}

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number)
    return response.status(400).json({ error: "name and number missing" });

  if (!body.name) return response.status(400).json({ error: "name missing" });

  if (!body.number)
    return response.status(400).json({ error: "number missing" });

  const nameInPhonebook = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (nameInPhonebook)
    return response.status(400).json({ error: "name must be unique" });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.push(person);

  response.json(person);
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
