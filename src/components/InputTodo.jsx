import React from "react";

export const InputTodo = (props) => {
  const { todoText, onChange, onClick } = props;
  return (
    <div className="justify-center flex items-center mt-10 mb-5">
      <input
        placeholder="Enter Todo"
        value={todoText}
        onChange={onChange}
        className="border
      "
      />
      <button onClick={onClick} className="border-2 bg-slate-400">
        Add
      </button>
    </div>
  );
};

export default InputTodo;
