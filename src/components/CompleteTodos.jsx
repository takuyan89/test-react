import React from "react";

export const CompleteTodos = (props) => {
  const { todos, onClickBack } = props;
  return (
    <div className="flex justify-center ">
      <div>
        <p className="text-xl font-bold mb-5">Completed Todo</p>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={todo.id} className="flex">
                <p className="w-[80px] ">{todo.title}</p>
                <button
                  onClick={() => onClickBack(index)}
                  className="border-2 bg-slate-400"
                >
                  Back
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
