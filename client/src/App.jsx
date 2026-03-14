import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
