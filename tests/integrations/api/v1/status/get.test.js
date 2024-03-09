test("GET /api/v1/status should return 200 and validate response structure", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseJson = await response.json();
  console.log(responseJson);

  // Verifica se o campo updated_at está definido
  expect(responseJson.updated_at).toBeDefined();

  // Valida o formato de updated_at
  const parsedUpdatedAt = new Date(responseJson.updated_at).toISOString();
  expect(parsedUpdatedAt).toBe(responseJson.updated_at);

  // Verifica se os dados adicionais do banco de dados estão presentes e são válidos
  expect(responseJson.database).toBeDefined();

  // Valida a versão do PostgreSQL
  expect(responseJson.database.postgres_version).toBeDefined();
  expect(typeof responseJson.database.postgres_version).toBe("string");

  // Valida o número máximo de conexões
  expect(responseJson.database.max_connections).toBeDefined();
  expect(Number.isInteger(responseJson.database.max_connections)).toBeTruthy();

  // Valida o número atual de conexões
  expect(responseJson.database.current_connections).toBe(1);

  // Valida a estrutura e valores da latência de cada consulta
  expect(responseJson.latency).toBeDefined();
  expect(typeof responseJson.latency).toBe("object");

  // Valida a latência de cada consulta individualmente
  expect(responseJson.latency.query1).toBeDefined();
  expect(typeof responseJson.latency.query1).toBe("number");

  expect(responseJson.latency.query2).toBeDefined();
  expect(typeof responseJson.latency.query2).toBe("number");

  expect(responseJson.latency.query3).toBeDefined();
  expect(typeof responseJson.latency.query3).toBe("number");

  expect(responseJson.latency.query4).toBeDefined();
  expect(typeof responseJson.latency.query4).toBe("number");
});
