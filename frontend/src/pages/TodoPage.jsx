import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify'
import axios from "axios";

const TodoPage = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const getTodos = await axios.get("/server/user/get-todos", {
          responseType: "json",
        });
        setTodos(getTodos.data.todos || []);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const data = await axios.post("/server/todo/create-todo", {
        todo: todoValue,
      });
    } catch (error) {
      console.log("Err", error);
    }
    window.location.reload()
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(`/server/todo/delete/${todoId}`)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting todo")
    }
    window.location.reload()
  }

  const handleTodoCompleted = async (todoId) => {
    try {
      const res = await axios.patch(`/server/todo/complete/${todoId}`)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message || "Something went wrong while mark todo as completed")
    }
    window.location.reload()
  }

  return (
    <div>
      <div className="flex items-center justify-center mb-[1rem]">
        <input
          type="text"
          id="todo_input"
          name="todo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          placeholder="Enter Todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-1"
        >
          Add
        </button>
      </div>
      <div className="w-[400px] h-[300px] flex flex-col gap-3 p-4 border overflow-x-hidden overflow-scroll ">
        {isLoading ? <Spinner /> : null}
        {todos.map((todo) => (
          <div key={todo._id} className="flex justify-between mx-3">
            <p className={`${todo.isCompleted ? "line-through" : ''}`}>{todo.todo}</p>
            <div className="flex gap-2">
              <button
                className="cursor-pointer rounded-2xl border px-4 py-1"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
              <button
                onClick={() => handleTodoCompleted(todo._id)}
                className={`cursor-pointer rounded-2xl border px-4 py-1 ${todo.isCompleted ? "hidden": "inline"}`}>
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
