import { assertEquals } from "@std/assert";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";
import deleteInsight from "./delete-insight.ts";
import listInsights from "./list-insights.ts";

Deno.test("deleteInsight removes a row", () =>
  withDB((fixture) => {
    const created = createInsight({
      db: fixture.db,
      brand: 1,
      text: "To be deleted",
    });

    const success = deleteInsight({ db: fixture.db, id: created.id });
    assertEquals(success, true);

    const all = listInsights({ db: fixture.db });
    assertEquals(all.length, 0);
  })
);

Deno.test("deleteInsight returns false for missing id", () =>
  withDB((fixture) => {
    const success = deleteInsight({ db: fixture.db, id: 999 });
    assertEquals(success, false);
  })
);