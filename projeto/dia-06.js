const users = [
  {
    id: 1,
    name: "Ana",
    profile: {
      address: {
        city: "Rio de Janeiro",
        state: "RJ"
      }
    }
  },
  {
    id: 2,
    name: "Carlos",
    profile: {
      address: null
    }
  },
  {
    id: 3,
    name: "Marina"
  }
];

const userFound = users.find((user) => user.id === 3);

console.log("Cidade:", userFound?.profile?.address?.city || "não informada");