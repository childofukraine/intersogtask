import Joi from "joi";
import Boom from "@hapi/boom";
import { RequestHandler } from "express";

export class CardValidator {
  static cardBody: RequestHandler = (req, res, next) => {
    const schema = Joi.object({
      cardname: Joi.string().max(32).required(),
      ownerid: Joi.number().required(),
      cardtype: Joi.string()
        .required()
        .valid("Gold", "Silver", "Iron", "Composite"),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };
}
