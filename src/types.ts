import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { Card } from "./entities/card";

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export interface CreateCardResponse {
  message: string;
  card: Card[];
}

export interface CreateCardRequest extends Request {
  body: {
    id: number;
    cardname: string;
    ownerid: number;
    cardtype: string;
  };
}

export interface GetCardsReponse {
  data: Card[];
}

export interface GetCardByIdResponse {
  data: Card[];
}

export interface UpdateCardRequest extends Request {
  body: {
    cardname: string;
    ownerid: number;
    cardtype: string;
  };
}

export interface UpdateCardResponse {
  data: Card[] | null;
}

export interface DeleteCardResponse {
  message: string;
  deletedCard: Card[];
}
