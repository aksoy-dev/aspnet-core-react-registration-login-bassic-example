import "./App.css";
import Register from "./componets/Register";
import Home from "./componets/Home";
import Login from "./componets/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/sign-up" element={<Register />} exact />
        <Route path="/sign-in" element={<Login />} exact />
      </Routes>
    </>
  );
}

export default App;
