import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDb from "../../../../../../lib/mongo";
import TaskModel, { Task } from "../../../../../../entities/Task";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  await connectToMongoDb();
  const { taskId } = req.query;

  switch (req.method) {
    case "GET": {
      const board = await TaskModel.findById(taskId);
      return res.status(200).json(board);
    }
    case "POST": {
      const board = await TaskModel.create({ ...req.body });
      return res.status(201).json(board);
    }
    case "PUT": {
      const board = await TaskModel.findByIdAndUpdate(taskId, {
        ...req.body,
      });
      return res.status(200).json(board);
    }
    case "DELETE": {
      const board = await TaskModel.findByIdAndDelete(taskId);
      return res.status(200).json(board);
    }
  }
}
