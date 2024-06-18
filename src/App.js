import React from 'react';
 
import  './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
     <Navbar/>
     <h1> Employees List</h1>
    <HomePage/>
    </>
      
  );
}

export default App;

