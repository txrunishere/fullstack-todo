import asyncHandler from "express-async-handler";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

const handleTodo = asyncHandler(async (req, res) => {
  try {
    const todo = req.body.todo;

    if (!todo) {
      return res.status(400).json({
        error: "Enter a Todo",
      });
    }

    const createTodo = await Todo.create({
      todo: todo,
    });

    if (!req.user?._id) {
      return res.status(400).json({
        error: "User ID is required",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { todo: createTodo._id } },
      { new: true }
    )

    if (createTodo && updateUser) {
      return res.status(201).json({
        message: "Todo created successfully",
      });
    }
  } catch (error) {
    return res.json({
      E: error,
    });
  }
});

const handleCompleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res.status(400).json({
      error: "Todo ID is required",
    });
  }

  const todo = await Todo.findByIdAndUpdate(todoId, {
    isCompleted: true,
  });

  if (todo) {
    return res.status(200).json({
      message: "Todo marked as completed successfully",
    });
  } else {
    return res.status(404).json({
      error: "Todo not found",
    });
  }
});

const handleDeleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res.status(400).json({
      error: "Todo ID is required",
    });
  }

  const todo = await Todo.findByIdAndDelete(todoId);
  const user = await User.findByIdAndUpdate(req.user?._id, {
    $pull: {
      todo: todo._id,
    },
  });

  if (todo && user) {
    return res.status(200).json({
      message: "Todo deleted successfully",
    });
  } else {
    return res.status(500).json({
      error: "Failed to delete todo",
    });
  }
});

export { handleTodo, handleCompleteTodo, handleDeleteTodo };
