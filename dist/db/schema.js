"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// To generate schema snapshot run in CLI :
// npx drizzle-kit generate:pg --out migrations-folder --schema src/db/schema.ts
exports.cardsTable = (0, pg_core_1.pgTable)("cards", {
    cardId: (0, pg_core_1.serial)("card_id").primaryKey(),
    cardName: (0, pg_core_1.varchar)("card_name", { length: 32 }).notNull(),
    ownerId: (0, pg_core_1.integer)("owner_id").notNull(),
    cardType: (0, pg_core_1.varchar)("card_type", { length: 10 }).notNull(),
});
