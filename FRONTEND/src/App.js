import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './PagesDashboard/Login'
import Dashboard from './PagesDashboard/Dashboard'
import TypeRoom from "./PagesDashboard/TypeRoom";
import Room from "./PagesDashboard/Room";
import User from "./PagesDashboard/User";
import HistoryTransaksi from "./PagesDashboard/HistoryTransaksi";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/typeroom" element={<TypeRoom />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/historytransaksi" element={<HistoryTransaksi />}></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
