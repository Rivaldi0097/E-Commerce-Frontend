import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './redux/store';
import './App.css';
import RetrieveData from './components/RetrieveData';
import Home from "./pages/Home";
import Login from './pages/Login';


function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<RetrieveData/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
