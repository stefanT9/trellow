import { read } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import BoardModel, { Board } from "../../../entities/Board";
import connectToMongoDb from "../../../lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Board[] | Board>
) {
  await connectToMongoDb();
  switch (req.method) {
    case "GET": {
      const boards = await BoardModel.find();
      return res.status(200).json(boards);
    }
    case "POST": {
      const board = await BoardModel.create({ ...req.body });
      return res.status(201).json(board);
    }
    case "PUT": {
    }
    case "DELETE": {
    }
  }
}
