"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const boom_1 = require("@hapi/boom");
const card_1 = require("../entities/card");
const cards_1 = require("../repositories/cards");
class CardsController {
    static createCard = async (req, res, next) => {
        try {
            const { id, cardname, ownerid, cardtype } = req.body;
            // проверяем есть ли карточка с таким id, если уже существуем выкидываем ошибку
            const cardExist = await cards_1.CardsRepository.getCardById(id);
            if (cardExist.length)
                throw (0, boom_1.badRequest)();
            const newCard = new card_1.Card(id, cardname, ownerid, cardtype);
            const card = await cards_1.CardsRepository.createCard(newCard);
            if (!card)
                throw (0, boom_1.notFound)();
            res.status(200).json({ message: "Card is created.", card });
        }
        catch (err) {
            next(err);
        }
    };
    static getCards = async (_req, res, next) => {
        try {
            const cards = await cards_1.CardsRepository.getCards();
            if (!cards)
                throw (0, boom_1.notFound)();
            res.json({ message: "Your cards", data: cards });
        }
        catch (err) {
            next(err);
        }
    };
    static getCardById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const card = await cards_1.CardsRepository.getCardById(+id);
            if (!card)
                throw (0, boom_1.notFound)();
            res.json({ message: "Your card", data: card });
        }
        catch (err) {
            next(err);
        }
    };
    static updateCard = async (req, res, next) => {
        const { id } = req.params;
        let idBody;
        const { cardname, ownerid, cardtype } = req.body;
        // проверяем наличие id в body запроса
        if (req.body.id) {
            idBody = req.body.id; // если он есть, берем его оттуда
        }
        else {
            idBody = Number(req.params.id); // если его нет, берем из параметров запроса
        }
        try {
            // проверяем,нет ли в бд,карточки с таким id
            if (req.body.id) {
                const cardExist = await cards_1.CardsRepository.getCardById(idBody);
                if (cardExist.length)
                    throw (0, boom_1.badRequest)();
            }
            const card = new card_1.Card(+id, cardname, ownerid, cardtype);
            const newCard = await cards_1.CardsRepository.editCard(idBody, card);
            if (!card)
                throw (0, boom_1.notFound)();
            res.json({ data: newCard });
        }
        catch (err) {
            next(err);
        }
    };
    static deleteCard = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedCard = await cards_1.CardsRepository.deleteCard(+id);
            if (!deletedCard)
                throw (0, boom_1.notFound)();
            res.json({ message: "Card deleted!", deletedCard });
        }
        catch (err) {
            next(err);
        }
    };
}
exports.CardsController = CardsController;
