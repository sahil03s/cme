import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
import View from './components/view';
import Log from './components/log';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/view' element={<View/>}></Route>
        <Route path='/log' element={<Log/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
