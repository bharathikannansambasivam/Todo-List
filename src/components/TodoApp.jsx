import React, { useEffect, useState } from "react";
import del from "../assets/DELETE.webp";
import icon from "../assets/TaskTracker.png";
import "./App.css";
const TodoList = () => {
  const [newTodo, SetNewTodo] = useState("");
  const [todos, SetTodos] = useState([]);

  const add = () => {
    if (newTodo.trim() !== "") {
      SetTodos([...todos, newTodo]);
      SetNewTodo("");
    }
  };
  useEffect(() => {
    SetTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);
  const deleteItem = (index) => {
    const TODOITEM = [...todos];
    TODOITEM.splice(index, 1);
    SetTodos(TODOITEM);
  };

  const Enter = (event) => {
    if (event.key === "Enter") {
      add();
    }
  };

  return (
    <div className="back bg-purple-400	 h-screen ">
      <div className=" flex items-center justify-center w-1/4 pt-3">
        {" "}
        <img className="h-24 w-24   " src={icon} alt="" />
      </div>{" "}
      <div className=" back bg-purple-400 	 h-100">
        <h1 className="flex  justify-center items-center text-4xl  pb-10 font-bold">
          TODO LIST
        </h1>

        <div className="flex  justify-center items-center   font-bold gap-3">
          <input
            className=" bg-slate-600 p-3  rounded-lg "
            type="text"
            placeholder="Add Item"
            value={newTodo}
            onKeyPress={Enter}
            onChange={(e) => {
              SetNewTodo(e.target.value);
            }}
          />
          <button
            className="text-white rounded-3xl bg-violet-600 px-8 py-2"
            onClick={add}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col  items-center ">
          {" "}
          <ul className="w-72  mt-10 flex gap-3 flex-wrap flex-col justify-start   grid-rows-2">
            {todos.map((x, index) => (
              <div>
                <li
                  className={`flex items-center p-3 mb-2.5  justify-between min-w-full sm:w-96 rounded-lg ${
                    index % 2 === 0 ? "bg-violet-500" : "bg-violet-400"
                  }`}
                  key={index}
                >
                  <div>
                    <input
                      className=" h-6 w-6 bg-slate-500 m-3 "
                      type="checkbox"
                    />
                  </div>

                  {x}
                  <button
                    className=" flex flex-col justify-center items-center "
                    onClick={() => deleteItem(index)}
                  >
                    <div className="px-5"> </div>
                    <img className=" h-10 w-10 " src={del} />
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
