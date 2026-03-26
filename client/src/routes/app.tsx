import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]); // Bug Fixed for wanting a list of insights, not a single insight

  // 🟢 Added: refresh function so delete/add can reload insights
  const refresh = async () => {
    const res = await fetch("/insights");
    const data = await res.json();
    setInsights(data);
  };

  useEffect(() => {                                         // Bug fixed for insights needing to set on a Promise instead of array
    const load = async () => {
      const res = await fetch("/insights");
      const data = await res.json();
      setInsights(data);
    };
    load();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      {/* Added: pass refresh so Insights can update after delete */}
      <Insights className={styles.insights} insights={insights} refresh={refresh} />
    </main>
  );
};