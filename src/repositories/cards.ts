import { eq } from "drizzle-orm";
import db from "../db/database";
import { Card, cardsTable } from "../db/schema";

const { database } = db;

export class CardsRepository {
  static async createCard(newCard: Card): Promise<Card[]> {
    const card = await database.insert(cardsTable).values(newCard).returning();

    return card;
  }

  static async getCards(): Promise<Card[] | null> {
    const cards = await database.select().from(cardsTable);

    return cards;
  }

  static async getCardById(id: number): Promise<Card[] | null> {
    const card = await database
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.cardId, id));

    return card;
  }

  static async editCard(cardUpd: Card): Promise<Card[] | null> {
    const newCard = await database
      .update(cardsTable)
      .set({
        cardId: cardUpd.cardId,
        cardName: cardUpd.cardName,
        ownerId: cardUpd.ownerId,
        cardType: cardUpd.cardType,
      })
      .where(eq(cardsTable.cardId, cardUpd.cardId))
      .returning();

    return newCard;
  }

  static async deleteCard(id: number): Promise<Card[] | null> {
    const deletedCard = await database
      .delete(cardsTable)
      .where(eq(cardsTable.cardId, id))
      .returning();
    return deletedCard;
  }
}
