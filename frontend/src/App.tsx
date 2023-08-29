import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './redux/store';
import './App.css';
import RetrieveData from './components/RetrieveData';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<RetrieveData/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
