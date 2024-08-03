import mongoose, { Schema, Document } from 'mongoose';

interface Task extends Document {
  title: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  status?: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' }
});

const TaskModel = mongoose.model<Task>('Task', TaskSchema);

export default TaskModel;
