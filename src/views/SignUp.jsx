import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [userInfoError, setUserInfoError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setUserInfoError({ ...userInfoError, [e.target.name]: false });
    }
  };

  const handleSignUp = async () => {
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
    if (userInfo.nickname === "") {
      setUserInfoError((prevState) => {
        return { ...prevState, nickname: true };
      });
      error = true;
    }
    if (userInfo.confirmPassword === "") {
      setUserInfoError((prevState) => {
        return { ...prevState, confirmPassword: true };
      });
      error = true;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      setUserInfoError((prevState) => {
        return { ...prevState, confirmPassword: true };
      });
      error = true;
    }
    if (error) {
      return;
    }

    try {
      const response = await axios.post(`${VITE_APP_HOST}/users/sign_up`, {
        email: userInfo.email,
        password: userInfo.password,
        nickname: userInfo.nickname,
      });
      console.log(response.data.token);
      navigate("/auth/login");
    } catch (error) {
      setMessage("註冊失敗: " + error.message.toString());
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-2xl font-bold mb-12 -mt-7">註冊帳號</h2>
      <form action="">
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            className="block input-default"
            type="email"
            placeholder="請輸入Email"
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
        <div className="mb-2">
          <label htmlFor="nickname">您的暱稱</label>
          <input
            className="block input-default"
            type="text"
            placeholder="請輸入您的暱稱"
            name="nickname"
            id="nickname"
            onChange={handleChange}
          />
          <p
            className={`text-sub-1 font-bold text-sm ${
              userInfoError.nickname ? "visible" : "invisible"
            }`}
          >
            此欄位不可為空
          </p>
        </div>

        <div className="mb-2">
          <label htmlFor="password">密碼</label>
          <input
            className="block input-default"
            type="password"
            placeholder="請輸入密碼"
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
        <div className="mb-5">
          <label htmlFor="confirmPassword">再次輸入密碼</label>
          <input
            className="block input-default"
            type="password"
            placeholder="請再次輸入密碼"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
          />
          <p
            className={`text-sub-1 font-bold text-sm ${
              userInfoError.confirmPassword ? "visible" : "invisible"
            }`}
          >
            此欄位不可為空/密碼不一致
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            className="block bg-slate-800 py-3 px-12 text-white rounded-xl"
            // disabled={isLoading}
            onClick={() => {
              handleSignUp();
            }}
          >
            註冊帳號
          </button>
          <button
            type="button"
            className="font-bold"
            onClick={() => navigate("/auth/login")}
          >
            登入
          </button>
        </div>
        <p className=" text-sub-1">{message}</p>
      </form>
    </div>
  );
};

export default SignUp;
