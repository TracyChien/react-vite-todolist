import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LogoPng from "../assets/logo_lg.png";
import { Toast } from "./Toast";

const { VITE_APP_HOST } = import.meta.env;

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await axios.post(`${VITE_APP_HOST}/users/sign_out`);
      if (response.data.status) {
        Cookies.remove("token");
        Cookies.remove("nickname");
        Toast.fire({
          icon: "success",
          title: response.data.message,
          timer: 1000,
        }).then(() => navigate("/auth/login"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <img className="h-9" src={LogoPng} alt="logo" />
      <div className="flex gap-5">
        <p className=" hidden md:block font-bold">
          {Cookies.get("nickname")}的待辦
        </p>
        <button type="button" className=" font-thin" onClick={handleSignOut}>
          登出
        </button>
      </div>
    </div>
  );
};

export default Header;
