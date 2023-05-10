"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const boom_1 = __importDefault(require("@hapi/boom"));
class CardValidator {
    static cardBody = (req, res, next) => {
        const schema = joi_1.default.object({
            id: joi_1.default.number().optional(),
            cardname: joi_1.default.string().max(32).required(),
            ownerid: joi_1.default.number().required(),
            cardtype: joi_1.default.string()
                .required()
                .valid("Gold", "Silver", "Iron", "Composite"),
        });
        try {
            const value = schema.validate(req.body);
            if (value.error?.message)
                throw boom_1.default.badData(value.error?.message);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
exports.CardValidator = CardValidator;
