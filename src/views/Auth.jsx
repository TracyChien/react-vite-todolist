import { Outlet } from "react-router-dom";
import LeftPng from "../assets/left.png";

const Auth = () => {
  return (
    <div className=" bg-main-1">
      <div className=" container h-screen py-44 md:px-28 flex justify-center gap-20">
        <img className=" hidden md:block flex-1" src={LeftPng} alt="left png" />
        {/* 指定渲染位置 */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
