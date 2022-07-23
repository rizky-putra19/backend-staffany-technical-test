import { getRepository } from "typeorm";
import Shift from "../../database/default/entity/shift";

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

export const checkPublish = async (id: string | string[]): Promise<boolean> => {
  const repository = getRepository(Shift);
  const check = await repository.findOne({
    where: {
      id,
    },
  });
  if (check.publish) {
    return true;
  }
  return false;
};
