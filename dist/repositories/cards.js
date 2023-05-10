"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const { database } = database_1.default;
class CardsRepository {
    static async createCard(newCard) {
        const card = await database.insert(schema_1.cardsTable).values(newCard).returning();
        return card;
    }
    static async getCards() {
        const cards = await database.select().from(schema_1.cardsTable);
        return cards;
    }
    static async getCardById(id) {
        const card = await database
            .select()
            .from(schema_1.cardsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.cardsTable.cardId, id));
        return card;
    }
    static async editCard(cardUpd) {
        const newCard = await database
            .update(schema_1.cardsTable)
            .set({
            cardId: cardUpd.cardId,
            cardName: cardUpd.cardName,
            ownerId: cardUpd.ownerId,
            cardType: cardUpd.cardType,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.cardsTable.cardId, cardUpd.cardId))
            .returning();
        return newCard;
    }
    static async deleteCard(id) {
        const deletedCard = await database
            .delete(schema_1.cardsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.cardsTable.cardId, id))
            .returning();
        return deletedCard;
    }
}
exports.CardsRepository = CardsRepository;
