/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmptyPng from "../assets/empty.png";
import { Toast } from "../components/Toast";
import Header from "../components/Header";
import TodoArea from "../components/TodoArea";

const { VITE_APP_HOST } = import.meta.env;

const Home = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [curTab, setCurTab] = useState("all");
  const tabList = [
    {
      id: 1,
      name: "全部項目",
      status: "all",
    },
    {
      id: 2,
      name: "已完成項目",
      status: "check",
    },
    {
      id: 3,
      name: "未完成項目",
      status: "uncheck",
    },
  ];

  useEffect(() => {
    const cookieValue = Cookies.get("token");
    // 預設 axios 的表頭
    axios.defaults.headers.common["Authorization"] = cookieValue;

    // 驗證登入
    axios
      .get(`${VITE_APP_HOST}/users/checkout`)
      .then(() => {
        // console.log(res);
        getTodoList();
      })
      .catch((err) => {
        console.log("登入失敗啦", err);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      });
  }, []);

  const getTodoList = async () => {
    try {
      const response = await axios.get(`${VITE_APP_HOST}/todos/`);
      // console.log(response.data);
      setTodoList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(`${VITE_APP_HOST}/todos/`, {
        content: todo,
      });
      if (response.data.status) {
        Toast.fire({
          icon: "success",
          title: "新增成功",
        });
        setTodo("");
        getTodoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative pt-4 px-8 h-screen md:min-h-[85vh] bg-main-1 md:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.44%,#FFFFFF_53.45%,#FFFFFF_94.32%)]">
      <Header />
      <div className="mx-auto md:w-1/2 pt-4 md:pt-10">
        <div className="relative mb-3">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="新增待辦事項"
            onChange={(e) => setTodo(e.target.value.trim())}
            value={todo}
            required
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 bg-black-1 font-medium rounded-lg text-sm px-4 py-2"
            onClick={handleAddTodo}
          >
            +
          </button>
        </div>
        {todoList.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <p className="pt-6 pb-3">目前尚無待辦事項</p>
            <img className=" w-3/4 md:w-1/3" src={EmptyPng} alt="left png" />
          </div>
        ) : (
          <>
            <div className="flex justify-between rounded-t-lg shadow-lg bg-white">
              {tabList.map((tab) => {
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`flex-1 py-4 border-b-2 font-bold ${
                      curTab === tab.status
                        ? "border-black"
                        : "border-gray-300 text-gray-400 "
                    }`}
                    onClick={() => setCurTab(tab.status)}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
            <TodoArea
              todoList={todoList}
              getTodoList={getTodoList}
              curTab={curTab}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
