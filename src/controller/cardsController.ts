import { RequestHandler } from "express";
import { badRequest, notFound } from "@hapi/boom";
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

      // check if there is a card with the same id, if it already exists throw an error
      const cardExist = await CardsRepository.getCardById(id);

      if (cardExist.length) throw badRequest();

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

      res.json({ message: "Your cards", data: cards });
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

      res.json({ message: "Your card", data: card });
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

    let idBody: number;

    const { cardname, ownerid, cardtype } = req.body;

    // check if the id is present in the body of the request
    if (req.body.id) {
      idBody = req.body.id!; // if it exists, take it from body
    } else {
      idBody = Number(req.params.id); // if it is not in body, we take it from the request parameters
    }

    try {
      // check if there is a card with this id in the database
      if (req.body.id) {
        const cardExist = await CardsRepository.getCardById(idBody);

        if (cardExist.length) throw badRequest();
      }

      const card = new Card(+id, cardname, ownerid, cardtype);

      const newCard = await CardsRepository.editCard(idBody, card);

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
