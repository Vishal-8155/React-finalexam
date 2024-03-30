import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeForm from "./components/RecipeForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/recipe-form" element={<RecipeForm />} />
        {/* Add more routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
