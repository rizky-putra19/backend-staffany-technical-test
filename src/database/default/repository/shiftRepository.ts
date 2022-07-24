import {
  getRepository,
  FindOneOptions,
  FindConditions,
  DeleteResult,
  Between,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import Shift from "../entity/shift";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { checkOverlapping, checkPublishWeek } from "../../../shared/helpers/checkingHelpers";
import { HttpError } from "../../../shared/classes/HttpError";
import {
  IFindResponse,
  IFindShift,
} from "../../../shared/interfaces";

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
  const checkPublish = await checkPublishWeek(payload);
  if (checkPublish) {
    throw new HttpError(400, "already publish");
  }
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
  const shift = await findById(id);
  const checkPublish = await checkPublishWeek(shift);
  if (checkPublish) {
    throw new HttpError(400, "already publish");
  }
  await repository.update(id, payload);
  return findById(id);
};

export const deleteById = async (
  id: string
): Promise<DeleteResult> => {
  logger.info("Delete by id");
  const repository = getRepository(Shift);
  const shift = await findById(id);
  const checkPublish = await checkPublishWeek(shift);
  if (checkPublish) {
    throw new HttpError(400, "already publish");
  }
  return await repository.delete(id);
};
