const users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "Carlos" },
  { id: 3, name: "Marina", email: "marina@email.com" },
  { id: 4, name: "João", email: null }
];

const userFound = users.find((user) => user.id === 2);
if (userFound.email) {
    console.log(`Email: ${userFound.email}`);
} else {
    console.log("Email não informado");
}

const usersWithEmail = users.filter((user) => user.email !== undefined && user.email !== null);
console.log(usersWithEmail);