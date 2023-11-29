import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="flex justify-center mb-5">
      <div>
        <p className="mb-5 font-bold text-xl text-center">Incompleted Todo</p>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index} className="flex">
                <p className="w-[80px]">{todo.title}</p>
                <button
                  onClick={() => onClickComplete(index)}
                  className="border-2 mx-2 bg-slate-400"
                >
                  Complete
                </button>
                <button
                  onClick={() => onClickDelete(index)}
                  className="border-2 bg-slate-400"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
