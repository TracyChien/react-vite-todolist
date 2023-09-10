import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [userInfoError, setUserInfoError] = useState({
    email: false,
    password: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setUserInfoError({ ...userInfoError, [e.target.name]: false });
    }
  };

  const handleLogin = async () => {
    // e.preventdefault();
    let error = false;
    if (userInfo.email === "") {
      setUserInfoError((prevState) => {
        return { ...prevState, email: true };
      });
      error = true;
    }
    if (userInfo.password === "") {
      setUserInfoError((prevState) => {
        return { ...prevState, password: true };
      });
      error = true;
    }
    if (error) {
      return;
    }

    try {
      const response = await axios.post(`${VITE_APP_HOST}/users/sign_in`, {
        email: userInfo.email,
        password: userInfo.password,
      });
      const res = response.data;
      Cookies.set("token", res.token, { expires: res.exp });
      Cookies.set("nickname", res.nickname, { expires: res.exp });
      // console.log(res.token);
      navigate("/");
    } catch (error) {
      setMessage("登入失敗: " + error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-2xl font-bold mb-12 md:my-12">
        最實用的線上代辦事項服務
      </h2>
      <form action="">
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            className="block input-default"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <p
            className={`text-sub-1 font-bold text-sm ${
              userInfoError.email ? "visible" : "invisible"
            }`}
          >
            此欄位不可為空
          </p>
        </div>
        <div className="mb-5">
          <label htmlFor="password">Password</label>
          <input
            className="block input-default"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <p
            className={`text-sub-1 font-bold text-sm ${
              userInfoError.password ? "visible" : "invisible"
            }`}
          >
            此欄位不可為空
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            className="block bg-slate-800 py-3 px-12 text-white rounded-xl"
            // disabled={isLoading}
            onClick={() => {
              handleLogin();
            }}
          >
            登入
          </button>
          <button
            type="button"
            className="font-bold"
            onClick={() => navigate("/auth/sign_up")}
          >
            註冊帳號
          </button>
        </div>
        <p className=" text-sub-1">{message}</p>
      </form>
    </div>
  );
};

export default Login;
