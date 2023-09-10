import { Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="sign_up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
