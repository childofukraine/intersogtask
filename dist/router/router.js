"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cardsController_1 = require("../controller/cardsController");
const cardsValidator_1 = require("../validators/cardsValidator");
exports.router = (0, express_1.default)();
exports.router.post("/cards", cardsValidator_1.CardValidator.cardBody, cardsController_1.CardsController.createCard);
exports.router.get("/cards", cardsController_1.CardsController.getCards);
exports.router.get("/cards/:id", cardsController_1.CardsController.getCardById);
exports.router.patch("/cards/:id", cardsValidator_1.CardValidator.cardBody, cardsController_1.CardsController.updateCard);
exports.router.delete("/cards/:id", cardsController_1.CardsController.deleteCard);
