import React, { useEffect, useState } from "react";
import InputTodo from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { supabase } from "./supabase";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  useEffect(() => {
    fetchDate();
  }, []);

  async function fetchDate() {
    let { data: tasks, error } = await supabase.from("todo").select("*");
    setIncompleteTodos(tasks);
    console.log(tasks);
  }

  async function insertDate(title) {
    const { data, error } = await supabase
      .from("todo")
      .insert({ title: title });
    if (!error) {
      fetchDate();
    }
  }

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onclickAdd = async () => {
    if (todoText === "") return;

    await insertDate(todoText);

    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = async (index) => {
    const taskToDelete = incompleteTodos[index];

    if (taskToDelete && taskToDelete.id) {
      const taskIdToDelete = taskToDelete.id;

      console.log("Deleting task with ID:", taskIdToDelete);

      const { error } = await supabase
        .from("todo")
        .delete()
        .eq("id", taskIdToDelete);

      if (error) {
        console.error("エラー", error.message);
      } else {
        const newIncompleteTodos = [...incompleteTodos];
        newIncompleteTodos.splice(index, 1);
        setIncompleteTodos(newIncompleteTodos);
      }
    } else {
      console.error("エラー ");
    }
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onclickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
