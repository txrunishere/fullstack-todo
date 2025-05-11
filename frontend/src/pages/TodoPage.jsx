import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
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
      console.log("Data", data);
    } catch (error) {
      console.log("Err", error);
    }
    window.location.reload()
  };

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
      <div className="w-[400px] h-[300px] flex flex-wrap flex-col gap-3 p-4 border overflow-x-hidden overflow-scroll ">
        {isLoading ? <Spinner /> : null}
        {todos.map((todo) => (
          <div key={todo._id} className="flex justify-between mx-3">
            <p>{todo.todo}</p>
            <div className="flex gap-2">
              <button className="cursor-pointer rounded-2xl border px-4 py-1">
                Delete
              </button>
              <button className="cursor-pointer rounded-2xl border px-4 py-1">
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
