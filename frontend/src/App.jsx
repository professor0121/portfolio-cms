import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contect";

import AdminLayout from "./admin/adminLayout";
import Dashboard from "./admin/dashboard";
import Settings from "./admin/settings";
import Analysis from "./admin/analysis";
import Post from "./admin/post";
import Categories from "./admin/categories";
import Tags from "./admin/tags";
import Media from "./admin/media";

const App = () => {
  return (
    <Router>  
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="settings" element={<Settings />} />
          <Route path="post" element={<Post />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<Tags />} />
          <Route path="media" element={<Media />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
