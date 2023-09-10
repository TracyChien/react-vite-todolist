/* eslint-disable react/prop-types */
import axios from "axios";
import { Toast } from "../components/Toast";
import MainCheckPng from "../assets/main_check.png";
import ClosePng from "../assets/close.png";

const { VITE_APP_HOST } = import.meta.env;

const TodoArea = ({ todoList, getTodoList, curTab }) => {
  const handleToggleTodo = async (targetID) => {
    try {
      const response = await axios.patch(
        `${VITE_APP_HOST}/todos/${targetID}/toggle`
      );
      if (response.data.status) {
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        getTodoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTodo = async (targetID) => {
    try {
      const response = await axios.delete(`${VITE_APP_HOST}/todos/${targetID}`);
      if (response.data.status) {
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        getTodoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (targetID) => {
    try {
      await axios.delete(`${VITE_APP_HOST}/todos/${targetID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoverAllCheck = async () => {
    try {
      const promises = todoList
        .filter((v) => v.status === true)
        .map((item) => handleRemove(item.id));
      Promise.all(promises).then(() => {
        Toast.fire({
          icon: "success",
          title: "已清除完成項目",
        });
        getTodoList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col rounded-b-lg shadow-lg bg-white overflow-hidden p-2 divide-y divide-solid divide-gray-400">
      {todoList
        .filter((v) => {
          if (curTab === "check") {
            return v.status === true;
          } else if (curTab === "uncheck") {
            return v.status === false;
          } else {
            return v;
          }
        })
        .map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center p-4"
            >
              <div className="flex items-center gap-2">
                {item.status ? (
                  <button type="button">
                    <img
                      src={MainCheckPng}
                      alt="check"
                      onClick={() => handleToggleTodo(item.id)}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-5 h-5 bg-white border-gray-400 shadow border rounded"
                    onClick={() => handleToggleTodo(item.id)}
                  ></button>
                )}
                <p
                  className={`${
                    item.status
                      ? "line-through text-gray-500"
                      : "no-underline text-black"
                  }`}
                >
                  {item.content}
                </p>
              </div>
              <button type="button" onClick={() => handleRemoveTodo(item.id)}>
                <img src={ClosePng} alt="close" />
              </button>
            </div>
          );
        })}
      {curTab === "check" ? (
        <div className="py-6 px-4">
          <p>
            {todoList.filter((v) => v.status === true).length}
            個已完成項目
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center py-6 px-4">
          <p>
            {todoList.filter((v) => v.status === false).length}
            個待完成項目
          </p>
          {curTab === "all" && (
            <button
              type="button"
              className="px-3 py-1 rounded-lg text-gray-400 disabled:text-gray-300 hover:bg-slate-200 disabled:bg-white"
              onClick={handleRemoverAllCheck}
              disabled={todoList.filter((v) => v.status === true).length === 0}
            >
              清除已完成項目
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoArea;
