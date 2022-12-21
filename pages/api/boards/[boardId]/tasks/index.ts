import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDb from "../../../../../lib/mongo";
import TaskModel, { Task } from "../../../../../entities/Task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | Task[]>
) {
  await connectToMongoDb();
  const { boardId } = req.query;

  switch (req.method) {
    case "GET": {
      const tasks = await TaskModel.find({ boardId });
      return res.status(200).json(tasks);
    }
    case "POST": {
      const task = await TaskModel.create({
        ...req.body,
        boardId: boardId,
      });
      return res.status(201).json(task);
    }
    case "PUT": {
    }
    case "DELETE": {
    }
  }
}
