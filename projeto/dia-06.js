const bugs = [
  { id: 301, title: "Erro no login", severity: "high", status: "open" },
  { id: 302, title: "Layout quebrado", severity: "low", status: "open" },
  { id: 303, title: "Timeout no checkout", severity: "critical", status: "closed" },
  { id: 304, title: "Erro no pagamento", severity: "critical", status: "open" },
  { id: 305, title: "Campo obrigatório ignorado", severity: "medium", status: "closed" }
];

const criticalOpenBugs = bugs.filter((bug) => bug.severity === "critical" && bug.status === "open").map((bug) => bug.title);
console.log(criticalOpenBugs.length > 0 ? criticalOpenBugs : "Nenhum bug crítico aberto encontrado");
console.log(`Total de bugs críticos abertos:`, criticalOpenBugs.length);