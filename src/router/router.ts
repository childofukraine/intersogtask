import Router from "express";
import { CardsController } from "../controller/cardsController";
import { CardValidator } from "../validators/cardsValidator";

export const router = Router();

router.post("/cards", CardValidator.cardBody, CardsController.createCard);
router.get("/cards", CardsController.getCards);
router.get("/cards/:id", CardsController.getCardById);
router.patch("/cards/:id", CardValidator.cardBody, CardsController.updateCard);
router.delete("/cards/:id", CardsController.deleteCard);
