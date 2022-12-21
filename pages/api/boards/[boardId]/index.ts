import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDb from "../../../../lib/mongo";
import BoardModel, { Board } from "../../../../entities/Board";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Board>
) {
  await connectToMongoDb();
  const { boardId } = req.query;

  switch (req.method) {
    case "GET": {
      const board = await BoardModel.findById(boardId);
      return res.status(200).json(board);
    }
    case "POST": {
      const board = await BoardModel.create({ ...req.body });
      return res.status(201).json(board);
    }
    case "PUT": {
      const board = await BoardModel.findByIdAndUpdate(boardId, {
        ...req.body,
      });
      return res.status(200).json(board);
    }
    case "DELETE": {
      const board = await BoardModel.findByIdAndDelete(boardId);
      return res.status(200).json(board);
    }
  }
}
