import { assertEquals } from "@std/assert";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";
import listInsights from "./list-insights.ts";

Deno.test("createInsight inserts a new row", () =>
  withDB((fixture) => {
    const result = createInsight({
      db: fixture.db,
      brand: 5,
      text: "Test insight",
    });

    // Returned object should match expected fields
    assertEquals(result.brand, 5);
    assertEquals(result.text, "Test insight");
    assertEquals(result.id, 1);
    assertEquals(result.createdAt instanceof Date, true);

    // DB should contain the row
    const all = listInsights({ db: fixture.db });
    assertEquals(all.length, 1);
    assertEquals(all[0].text, "Test insight");
  })
);