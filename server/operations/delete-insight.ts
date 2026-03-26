import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): boolean => {
  console.log(`Deleting insight id=${input.id}`);

  const result = input.db.sql`
    DELETE FROM insights WHERE id = ${input.id}
  `;

  // SQLite returns number of rows changed
  const rowsDeleted = input.db.changes;

  if (rowsDeleted === 0) {
    console.log("No insight found to delete");
    return false;
  }

  console.log("Insight deleted");
  return true;
};