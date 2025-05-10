import asyncHandler from "express-async-handler";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

const handleTodo = asyncHandler(async (req, res) => {
  const todo = req.body.todo;

  if (!todo) {
    return res.status(400).json({
      error: "Enter a Todo",
    });
  }

  const createTodo = await Todo.create({
    todo: todo,
  });

  const updateUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $push: {
        todo: createTodo,
      },
    },
    {
      new: true,
    }
  );

  if (createTodo && updateUser) {
    return res.status(201).json({
      message: "Todo created successfully",
    });
  } else {
    return res.status(500).json({
      error: "Failed to create todo",
    });
  }
});

export { handleTodo };
