const users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "Carlos" },
  { id: 3, name: "Marina", email: "marina@email.com" }
];

const userFound = users.find((user) => user.id === 999);

console.log(userFound?.email || "Email não encontrado");