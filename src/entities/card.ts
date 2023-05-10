export class Card {
  cardId: number;

  cardName: string;

  ownerId: number;

  cardType: string;

  constructor(
    cardId: number,
    cardName: string,
    ownerId: number,
    cardType: string
  ) {
    this.cardId = cardId;
    this.cardName = cardName;
    this.ownerId = ownerId;
    this.cardType = cardType;
  }
}
