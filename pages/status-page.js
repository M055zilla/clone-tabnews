import React, { useState, useEffect } from "react";
import styles from "./PrettyJson.module.css";

const PrettyJson = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch("/api/v1/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data fetched successfully:", data);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch status data:", error);
      }
    };

    fetchStatusData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.prettyJsonContainer}>
      <h2 className={styles.prettyJsonTitle}>Status-Page</h2>
      <pre className={styles.prettyJsonPre}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default PrettyJson;
