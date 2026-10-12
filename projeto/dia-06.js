const users = [
  { id: 1, name: "Ana", email: "ana@email.com", active: true },
  { id: 2, name: "Carlos", email: "carlos@email.com", active: false },
  { id: 3, name: "Marina", email: "marina@email.com", active: true },
  { id: 4, name: "João", email: "joao@email.com", active: true }
];

const userEmails = users.map((user) => user.email);
console.log(userEmails);