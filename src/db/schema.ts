import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

// To generate schema snapshot run in CLI :
// npx drizzle-kit generate:pg --out migrations-folder --schema src/db/schema.ts

export const cardsTable = pgTable("cards", {
  cardId: serial("card_id").primaryKey(),
  cardName: varchar("card_name", { length: 32 }).notNull(),
  ownerId: integer("owner_id").notNull(),
  cardType: varchar("card_type", { length: 10 }).notNull(),
});

export type Card = InferModel<typeof cardsTable>;
