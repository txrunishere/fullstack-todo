import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Todo = model("Todo", todoSchema)
