import { Server } from "@hapi/hapi";
import createShiftRoutes from "./shifts";
import createPublishWeekRoutes from "./publish-week";

export default function (server: Server, basePath: string) {
  createShiftRoutes(server, basePath + "/shifts");
  createPublishWeekRoutes(server, basePath + "/publish-week");
}
