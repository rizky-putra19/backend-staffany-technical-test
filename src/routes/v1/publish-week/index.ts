import { Server } from "@hapi/hapi";
import * as publishWeekController from "./publishWeekController"
import { createPublishWeekDto } from "../../../shared/dtos/publishWeek";

export default function (server: Server, basePath: string) {
    server.route({
        method: "POST",
        path: basePath,
        handler: publishWeekController.create,
        options: {
          description: "Create shift",
          notes: "Create shift",
          tags: ["api", "shift"],
          validate: {
            payload: createPublishWeekDto
          },
        },
      });
}