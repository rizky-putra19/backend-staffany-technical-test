import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
  DeleteResult,
  Between,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import Shift from "../entity/shift";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import {
  checkOverlapping,
  checkPublish,
} from "../../../shared/helpers/checkingHelpers";
import { HttpError } from "../../../shared/classes/HttpError";
import { IFindResponse, IFindShift, IPublishShifts } from "../../../shared/interfaces";

const logger = moduleLogger("shiftRepository");

export const find = async (opts?: IFindShift): Promise<IFindResponse> => {
  logger.info("Find");
  let { page = opts.page || 0, limit = opts.limit || 10 } = opts;
  const repository = getRepository(Shift);
  const list = opts.startDate
    ? await repository.findAndCount({
        where: {
          date: Between(
            new Date(`${opts.startDate}`),
            new Date(`${opts.endDate}`)
          ),
        },
        skip: page * limit,
        take: limit,
      })
    : await repository.findAndCount({
        skip: page * limit,
        take: limit,
      });
  const [data, count] = list;
  const pagination = {
    page: Number(page) + 1,
    totalPage: Math.ceil(count / limit),
    total: count,
  };
  return {
    data,
    metadata: pagination,
  };
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  logger.info("Find by id");
  const repository = getRepository(Shift);
  const data = await repository.findOne(id, opts);
  return data;
};

export const findOne = async (
  where?: FindConditions<Shift>,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  logger.info("Find one");
  const repository = getRepository(Shift);
  const data = await repository.findOne(where, opts);
  return data;
};

export const create = async (payload: Shift): Promise<Shift> => {
  logger.info("Create");
  const repository = getRepository(Shift);
  const check = await checkOverlapping(payload);
  if (check) {
    throw new HttpError(400, "shift is overlapping");
  }
  const newdata = await repository.save(payload);
  return newdata;
};

export const updateById = async (
  id: string,
  payload: QueryDeepPartialEntity<Shift>
): Promise<Shift> => {
  logger.info("Update by id");
  const repository = getRepository(Shift);
  const check = await checkPublish(id);
  if (check) {
    throw new HttpError(400, "cannot update already published");
  }
  await repository.update(id, payload);
  return findById(id);
};

export const deleteById = async (
  id: string | string[]
): Promise<DeleteResult> => {
  logger.info("Delete by id");
  const repository = getRepository(Shift);
  const check = await checkPublish(id);
  if (check) {
    throw new HttpError(400, "cannot delete already published");
  }
  return await repository.delete(id);
};

export const publishShifts = async (payload: IPublishShifts): Promise<Shift[]> => {
  logger.info("publish shift");
  const results:Shift[] = [];
  const publish = await Promise.all(
    payload.ids.map(async (shift) => {
      const check = await checkPublish(shift);
      if (check) {
        throw new HttpError(400, "cannot update already published");
      }
      await updateById(shift, {publish: true})
      return results.push(await findById(shift));
    })
  );
  return results;
};
