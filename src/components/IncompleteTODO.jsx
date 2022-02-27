import React from "react";

export const IncompleteTODO = (props) => {
  const { incompTodo, onClickComp, onClickDel } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {incompTodo.map((todo, index) => {
          return (
            //mapなど差分を取り込む関数には親タグにkeyを設定
            //関数に引数を渡すときはアロー関数を用いないとレンダリング時に実行される
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComp(index)}>完了</button>
              <button onClick={() => onClickDel(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
