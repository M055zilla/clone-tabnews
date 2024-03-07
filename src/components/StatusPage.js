import React, { useEffect, useState } from "react";

function StatusPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/status")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="status-container">
      <h1>Status Page</h1>
      <div>Status: {data.status}</div>
      <div>Updated at: {data.updated_at}</div>
      <div>
        <h2>Database</h2>
        <p>Sum: {data.database.sum}</p>
        <p>Postgres Version: {data.database.postgres_version}</p>
        <p>Max Connections: {data.database.max_connections}</p>
        <p>Current Connections: {data.database.current_connections}</p>
      </div>
      <div>
        <h2>Latency</h2>
        <p>Query 1: {data.latency.query1}</p>
        <p>Query 2: {data.latency.query2}</p>
        <p>Query 3: {data.latency.query3}</p>
        <p>Query 4: {data.latency.query4}</p>
      </div>
    </div>
  );
}

export default StatusPage;
