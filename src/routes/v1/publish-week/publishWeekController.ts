import { Request, ResponseToolkit } from "@hapi/hapi";
import { errorHandler } from "../../../shared/functions/error";
import moduleLogger from "../../../shared/functions/logger";
import { ICreatePublishWeek } from "../../../shared/interfaces/publishWeek";
import { ISuccessResponse } from "../../../shared/interfaces/response";
import * as publishWeekUsecase from "../../../usecases/publishWeekUsecase"


const logger = moduleLogger("publishWeekController");

export const create = async (req: Request, h: ResponseToolkit) => {
    logger.info("Create publish week");
    try {
      const body = req.payload as ICreatePublishWeek;
      const data = await publishWeekUsecase.create(body);
      const res: ISuccessResponse = {
        statusCode: 200,
        message: "Create shift successful",
        results: data,
      };
      return res;
    } catch (error) {
      logger.error(error.message)
      return errorHandler(h, error);
    }
  };