import * as publishWeekRepository from "../database/default/repository/publishWeekRepository"
import PublishWeek from "../database/default/entity/publish-week";
import { ICreatePublishWeek } from "../shared/interfaces/publishWeek";


export const create = async (payload: ICreatePublishWeek): Promise<PublishWeek> => {
    const publishWeek = new PublishWeek();
    publishWeek.startDate = payload.startDate;
    publishWeek.endDate = payload.endDate;
  
    return publishWeekRepository.create(publishWeek);
  };