import mongoose, { Schema } from "mongoose";

export interface Task {
  _id: string;
  title: string;
  description: string;
  boardId: string;
  status: string;
}

const TaskSchema = new mongoose.Schema<Task>({
  title: Schema.Types.String,
  description: Schema.Types.String,
  boardId: Schema.Types.String,
  status: Schema.Types.String,
});

export default mongoose.models.tasks ||
  mongoose.model<Task>("tasks", TaskSchema);
