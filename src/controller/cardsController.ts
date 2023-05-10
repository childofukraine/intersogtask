import { RequestHandler } from "express";
import { notFound } from "@hapi/boom";
import {
  CreateCardRequest,
  CreateCardResponse,
  DeleteCardResponse,
  GetCardByIdResponse,
  GetCardsReponse,
  TypedResponse,
  UpdateCardRequest,
  UpdateCardResponse,
} from "../types";
import { Card } from "../entities/card";
import { CardsRepository } from "../repositories/cards";

export class CardsController {
  static createCard: RequestHandler = async (
    req: CreateCardRequest,
    res: TypedResponse<CreateCardResponse>,
    next
  ) => {
    try {
      const { id, cardname, ownerid, cardtype } = req.body;

      const newCard = new Card(id, cardname, ownerid, cardtype);

      const card = await CardsRepository.createCard(newCard);

      if (!card) throw notFound();

      res.status(200).json({ message: "Card is created.", card });
    } catch (err) {
      next(err);
    }
  };

  static getCards: RequestHandler = async (
    _req,
    res: TypedResponse<GetCardsReponse>,
    next
  ) => {
    try {
      const cards = await CardsRepository.getCards();

      if (!cards) throw notFound();

      res.json({ data: cards });
    } catch (err) {
      next(err);
    }
  };

  static getCardById: RequestHandler = async (
    req,
    res: TypedResponse<GetCardByIdResponse>,
    next
  ) => {
    const { id } = req.params;
    try {
      const card = await CardsRepository.getCardById(+id);

      if (!card) throw notFound();

      res.json({ data: card });
    } catch (err) {
      next(err);
    }
  };

  static updateCard: RequestHandler = async (
    req: UpdateCardRequest,
    res: TypedResponse<UpdateCardResponse>,
    next
  ) => {
    const { id } = req.params;
    const { cardname, ownerid, cardtype } = req.body;

    try {
      const card = new Card(+id, cardname, ownerid, cardtype);

      const newCard = await CardsRepository.editCard(card);

      if (!card) throw notFound();

      res.json({ data: newCard });
    } catch (err) {
      next(err);
    }
  };

  static deleteCard: RequestHandler = async (
    req,
    res: TypedResponse<DeleteCardResponse>,
    next
  ) => {
    const { id } = req.params;
    try {
      const deletedCard = await CardsRepository.deleteCard(+id);

      if (!deletedCard) throw notFound();

      res.json({ message: "Card deleted!", deletedCard });
    } catch (err) {
      next(err);
    }
  };
}
