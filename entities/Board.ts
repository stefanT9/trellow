import mongoose, { Schema } from "mongoose";

export interface Board {
  _id: string;
  title: string;
  description: string;
  starred?: boolean;
  categories: string[];
}

const BoardSchema = new mongoose.Schema<Board>({
  title: Schema.Types.String,
  description: Schema.Types.String,
  starred: Schema.Types.Boolean,
  categories: Schema.Types.Array,
});
export default mongoose.models.boards ||
  mongoose.model<Board>("boards", BoardSchema);
