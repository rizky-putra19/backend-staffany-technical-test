import { Between, getRepository } from "typeorm";
import Shift from "../../database/default/entity/shift";
import moment from "moment";
import PublishWeek from "../../database/default/entity/publish-week";

export const checkOverlapping = async (payload: Shift): Promise<boolean> => {
  const { name, date, startTime, endTime } = payload;
  const repository = getRepository(Shift);
  const checkOverlapping = await repository.findOne({
    where: {
      name,
      date,
      startTime,
      endTime,
    },
  });
  if (checkOverlapping) {
    return true;
  }
  return false;
};

export const checkPublishWeek = async (payload: Shift): Promise<boolean> => {
  let result = false;
  const { date } = payload;
  const repository = getRepository(PublishWeek);
  const isPublish = await repository.find();
  isPublish.forEach((a) => {
    const startDate = new Date(a.startDate);
    const endDate = new Date(a.endDate);
    if (new Date(date) >= startDate && new Date(date) <= endDate) {
      result = true;
    }
  });
  return result;
};
