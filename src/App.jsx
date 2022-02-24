import { useState } from "react";
import "./styles.css";

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
    //sploce(a, b)→配列のa番目からb個削除
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
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodo.map((todo, index) => {
            return (
              //mapなど差分を取り込む関数には親タグにkeyを設定
              //関数に引数を渡すときはアロー関数を用いないとレンダリング時に実行される
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodo.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
