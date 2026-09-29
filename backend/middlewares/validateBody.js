import { RequestError } from "../helpers/index.js";

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(RequestError(400, message));
    }

    req.body = value; 
    next();
  };
};

export default validateBody;
