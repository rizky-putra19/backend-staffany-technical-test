import { getRepository } from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import PublishWeek from "../entity/publish-week";


const logger = moduleLogger("publishWeekrepository");

export const create = async (payload: PublishWeek): Promise<PublishWeek> => {
    logger.info("create publish week")
    const repository = getRepository(PublishWeek);
    const publish = await repository.save(payload);
    return publish;
}