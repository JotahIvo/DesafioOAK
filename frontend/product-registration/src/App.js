import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductRegistration from './ProductRegistration';
import ProductList from './ProductsList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<ProductRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
