import Joi from "joi"

export const createPublishWeekDto = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });