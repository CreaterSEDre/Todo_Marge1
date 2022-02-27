import { useState } from "react";
import "./styles.css";
//InputTODOクラスのInputTODOメソッドを参照
//ファイル名は大文字
import { InputTODO } from "./components/InputTODO";
import { IncompleteTODO } from "./components/IncompleteTODO";
import { CompleteTODO } from "./components/CompleteTODO";

export const App = () => {
  //初期値は必ず配列で渡す
  const [todoText, setTodoText] = useState("");
  const [incompleteTodo, setIncompleteTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);

  //「event.target.value」に入力値が入る
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = [...incompleteTodo, todoText];
    setIncompleteTodo(newTodo);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodo = [...incompleteTodo];
    //splice(a, b)→配列のa番目からb個削除
    newTodo.splice(index, 1);
    setIncompleteTodo(newTodo);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodo = [...incompleteTodo];
    newIncompleteTodo.splice(index, 1);
    //配列の要素は[]で囲う
    const newCompleteTodo = [...completeTodo, incompleteTodo[index]];

    setIncompleteTodo(newIncompleteTodo);
    setCompleteTodo(newCompleteTodo);
  };

  const onClickBack = (index) => {
    const newCompTodo = [...completeTodo];
    newCompTodo.splice(index, 1);

    const newIncompTodo = [...incompleteTodo, completeTodo[index]];
    setIncompleteTodo(newIncompTodo);
    setCompleteTodo(newCompTodo);
  };

  return (
    <>
      <InputTODO
        todoText={todoText}
        onChange={onChangeTodoText}
        clickAdd={onClickAdd}
        disabled={incompleteTodo.length >= 5}
      />
      {incompleteTodo.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです</p>
      )}

      <IncompleteTODO
        incompTodo={incompleteTodo}
        onClickComp={onClickComplete}
        onClickDel={onClickDelete}
      />
      <CompleteTODO compTodo={completeTodo} onClickBack={onClickBack} />
    </>
  );
};
