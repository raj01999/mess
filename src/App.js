import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Members from "./pages/Members";
import Suport from "./pages/Support";
import { StateProvider } from "./context/StateProvider";
import initialState from "./context/initialState";
import reducer from "./context/reducer";
import Messages from "./pages/Messages";

function App() {
  return (
    <>
      <BrowserRouter>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/products" element={<Products />} />
            <Route path="/members" element={<Members />} />
            <Route path="/support" element={<Suport />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </StateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
