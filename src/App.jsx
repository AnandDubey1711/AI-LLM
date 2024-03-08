import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ImagePage from "./pages/ImagePage";
import Swap from "./pages/Swap";
import Sentiment from "./pages/Sentiment";
import SummaryGenerator from "./pages/Summary";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image" element={<ImagePage />} />
        <Route path="/sentiment" element={<Sentiment />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/summary" element={<SummaryGenerator />} />
      </Routes>
    </div>
  );
};

export default App;
