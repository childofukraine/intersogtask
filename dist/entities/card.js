"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    cardId;
    cardName;
    ownerId;
    cardType;
    constructor(cardId, cardName, ownerId, cardType) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.ownerId = ownerId;
        this.cardType = cardType;
    }
}
exports.Card = Card;
