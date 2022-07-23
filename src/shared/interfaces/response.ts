import Shift from "../../database/default/entity/shift";

export interface ISuccessResponse {
  statusCode: number;
  message: string;
  results: any;
}

export interface ISuccessListResponse {
  statusCode: number;
  message: string;
  results: any;
  metadata: {
    page: number;
    totalPage: number;
    total: number;
  }
}

export interface IFindResponse {
  data: Shift[];
  metadata: {
    page: number;
    totalPage: number;
    total: number;
  };
}

export interface IErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}
