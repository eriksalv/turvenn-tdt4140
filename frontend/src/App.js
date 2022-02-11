import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
