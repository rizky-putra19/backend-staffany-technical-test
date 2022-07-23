export interface ICreateShift {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface IUpdateShift {
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  weekId? : string;
}

export interface IFindShift {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface IPublishShifts {
  ids?: string[];
}