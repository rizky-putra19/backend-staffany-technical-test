import * as publishWeekRepository from "../database/default/repository/publishWeekRepository"
import PublishWeek from "../database/default/entity/publish-week";
import { IPublishWeek } from "../shared/interfaces/publishWeek";


export const create = async (payload: IPublishWeek): Promise<PublishWeek> => {
    const publishWeek = new PublishWeek();
    publishWeek.startDate = payload.startDate;
    publishWeek.endDate = payload.endDate;
  
    return publishWeekRepository.create(publishWeek);
  };

export const checkPublish = async (payload: IPublishWeek): Promise<boolean> => {
    const publishWeek = new PublishWeek();
    publishWeek.startDate = payload.startDate;
    publishWeek.endDate = payload.endDate;
  
    return publishWeekRepository.checkPublish(publishWeek);
  };