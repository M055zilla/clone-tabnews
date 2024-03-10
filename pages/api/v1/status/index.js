import database from "infra/database.js";

async function status(req, res) {
  let startTime, endTime;
  let latencies = {}; // Objeto para armazenar a latência de cada consulta

  // Primeira consulta
  startTime = process.hrtime.bigint();
  const result = await database.query("SELECT 1+1 as sum;");
  endTime = process.hrtime.bigint();
  latencies.query1 = Number(endTime - startTime) / 1000000.0; // Convertendo nanossegundos para milissegundos

  const updated_at = new Date().toISOString();

  // Segunda consulta
  startTime = process.hrtime.bigint();
  const versionResult = await database.query("SHOW server_version;");
  endTime = process.hrtime.bigint();
  latencies.query2 = Number(endTime - startTime) / 1000000.0;

  // Terceira consulta
  startTime = process.hrtime.bigint();
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  endTime = process.hrtime.bigint();
  latencies.query3 = Number(endTime - startTime) / 1000000.0;

  // Quarta consulta
  const database_name = process.env.POSTGRES_DB;
  startTime = process.hrtime.bigint();
  const currentConnectionsResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [database_name],
  });
  const current_open_connections_value = currentConnectionsResult.rows[0].count;
  console.log(current_open_connections_value);
  endTime = process.hrtime.bigint();
  latencies.query4 = Number(endTime - startTime) / 1000000.0;

  const data = res.status(200).json({
    status: res.statusCode,
    updated_at: updated_at,
    database: {
      sum: 2, // Ajuste o valor conforme necessário
      postgres_version: versionResult.rows[0].server_version,
      max_connections: parseInt(
        maxConnectionsResult.rows[0].max_connections,
        10,
      ),
      current_connections: current_open_connections_value,
    },
    latency: latencies, // Incluindo o objeto de latências no JSON de resposta
  });
}

const PrettyJson = () => {
  return (
    <div>
      <Head>
        <title>JSON Bonito</title>
        <meta name="description" content="Exibe um JSON de forma bonita" />
      </Head>

      {/* Aplica estilos para melhorar a leitura do JSON */}
      <pre
        style={{ background: "#f4f4f4", padding: "20px", borderRadius: "5px" }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default status;
